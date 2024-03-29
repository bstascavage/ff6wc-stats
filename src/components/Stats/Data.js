export class Data {
  constructor(runData, filters, charList, abilityList, dragonList) {
    this.unfilteredRunData = runData;
    this.runData = runData;
    this.flagsetFilter = filters.flagsetFilter.value;
    this.raceFilter = filters.raceFilter.value;
    this.charList = charList;
    this.abilityList = abilityList;
    this.dragonList = dragonList;

    if (this.flagsetFilter === "All") {
      this.runData = runData;
    } else {
      // Filter by flagset
      this.runData = this.runData.filter(
        (data) => data.flagset === this.flagsetFilter,
      );
      if (this.raceFilter !== "All") {
        // Then filter by race
        this.runData = this.runData.filter(
          (data) => data.race === this.raceFilter,
        );
      }
    }
  }

  attempt() {
    return this.runData.length;
  }

  skipData(skip = true) {
    return this.runData.filter((data) => data.skip === skip);
  }

  skipAttempt() {
    return this.skipData().length;
  }

  skipPercent() {
    return `${Math.floor((this.skipAttempt() / this.attempt()) * 100)}%`;
  }

  averageSkip(skip = true) {
    const skipTime = this.averageTimeRaw(this.skipData(skip));

    if (isNaN(skipTime)) {
      return "00:00:00";
    } else {
      return this.convertRawToTime(
        Math.floor(Math.round(skipTime) / 1000) * 1000,
      );
    }
  }

  bestTime() {
    return this.bestRun().runTime;
  }

  lastTime() {
    return this.lastRun().runTime;
  }

  bestRun() {
    return this.sortByTime()[0];
  }

  lastRun() {
    return this.sortByDate()[this.runData.length - 1];
  }

  deltaBestTime() {
    return this.convertDeltaTime(
      this.averageTimeRaw() - this.bestRun().runTimeRaw,
    );
  }

  deltaLastTime() {
    return this.convertDeltaTime(
      this.averageTimeRaw() - this.lastRun().runTimeRaw,
    );
  }

  deltaSkipTime(skip = true) {
    const data = this.skipData(skip);
    return this.convertDeltaTime(
      this.averageTimeRaw() - this.averageTimeRaw(data),
    );
  }

  standardDeviation() {
    const mean = this.averageTimeRaw();
    let runs = this.sortByDate().map((a) => a.runTimeRaw);

    runs = runs.map((k) => {
      return (k - mean) ** 2;
    });
    const sum = runs.reduce((acc, curr) => acc + curr, 0);

    return this.convertRawToTime(
      Math.floor(Math.round(Math.sqrt(sum / runs.length)) / 1000) * 1000,
    );
  }

  runTimes() {
    let times = [];
    const sortedTimes = this.sortByDate();

    for (let i = 0; i < sortedTimes.length; i++) {
      times.push({
        attempt: sortedTimes[i].attempt,
        time: sortedTimes[i].runTimeRaw,
        date: sortedTimes[i].runDate,
        skip: sortedTimes[i].skip,
        name: Date.parse(sortedTimes[i].runDate),
      });
    }
    return times;
  }

  averageTimeRaw(data = this.runData) {
    const average = (array) =>
      array.reduce((a, b) => a + b.runTimeRaw, 0) / array.length; // Average of millaseconds
    return average(data);
  }

  averageTime(numOfRuns = 0) {
    // Average time of the last `numOfRuns` runs.  If not set, average time of all runs
    let runs =
      numOfRuns > 0
        ? this.sortByDate().slice(0 - numOfRuns)
        : this.sortByDate();

    return this.convertRawToTime(
      Math.floor(Math.round(this.averageTimeRaw(runs)) / 1000) * 1000,
    ); // Convert to hh:mm:ss, while rounding to the nearest second
  }

  deltaRunTime(numOfRuns = 0) {
    // Delta of the mean the last run did for the ladt `numOfRuns` runs
    let runs = this.sortByDate();
    let delta =
      numOfRuns === 0
        ? this.averageTimeRaw(runs.slice(0, -1)) - this.averageTimeRaw(runs)
        : this.averageTimeRaw(runs.slice(runs.length - numOfRuns - 1, -1)) -
          this.averageTimeRaw(runs.slice(0 - numOfRuns));

    return this.convertDeltaTime(delta);
  }

  convertDeltaTime(delta) {
    // Converts a positive or negative millisecond value to hh:mm:ss
    if (isNaN(delta)) {
      delta = 0;
    }
    let negative = false;

    if (delta < 0) {
      negative = true;
      delta = Math.abs(delta);
    }
    return {
      time: this.convertRawToTime(Math.floor(Math.round(delta) / 1000) * 1000),
      negative: negative,
    };
  }

  deadChecks() {
    let times = {};
    for (let i = 0; i < this.runData.length; i++) {
      if (!(this.runData[i].numOfDeadchecks in times)) {
        times[this.runData[i].numOfDeadchecks] = [this.runData[i].runTimeRaw];
      } else {
        times[this.runData[i].numOfDeadchecks].push(this.runData[i].runTimeRaw);
      }
    }

    return times;
  }

  numOfDeadchecks(dataType = "time") {
    /**
     * Find average time and total runs for each possible amount of dead checks that can be found in a run.
     * @param {String} dataType The data field to be the primary `data` field;
     *    this is what will be displayed on the y-Axis in StatsBarChart.
     * @return {Array} Array of the total runs and average time for each amount of dragons, formatted
     *    to be used with StatsBarChart.
     */
    let data = [];

    for (let run = 0; run < this.runData.length; run++) {
      data = this.generateStatsBarChartDataPoint(
        this.runData[run].numOfDeadchecks,
        this.runData[run],
        data,
        dataType,
      );
    }

    // If dead check is not in the data, add it with default vaules
    for (let i = 0; i < 12; i++) {
      const name = i;
      data = this.createDefaultDataPoint(name, data);
    }
    return data.sort((a, b) => a.name - b.name);
  }

  mostUsedCharacter(reverse = false) {
    /**
     * Returns the starting character that appears in the most amount of runs.
     * @param {Boolean} reverse If set to `true`, the least-used character will be returned instead.
     * @return {Object} The average time, number of runs and times per run for the most used character.
     */
    return reverse
      ? this.getStatsBarChartData("chars", this.charList).sort(
          (a, b) => a.runs - b.runs,
        )[0]
      : this.getStatsBarChartData("chars", this.charList).sort(
          (a, b) => b.runs - a.runs,
        )[0];
  }

  fastestCharacter() {
    /**
     * Returns the starting character with the lowest average run time.
     * @return {Object} The average time, number of runs and times per run for the fastest character.
     */
    let char = this.getStatsBarChartData("chars").sort(
      (a, b) => a.time - b.time,
    )[0];
    char.time = this.convertRawToTime(char.time);

    return char;
  }

  mostUsedAbility(reverse = false) {
    /**
     * Returns the starting ability that appears in the most amount of runs.
     * @param {Boolean} reverse If set to `true`, the least-used ability will be returned instead.
     * @return {Object} The average time, number of runs and times per run for the most used ability.
     */
    return reverse
      ? this.getStatsBarChartData("abilities").sort(
          (a, b) => a.runs - b.runs,
        )[0]
      : this.getStatsBarChartData("abilities").sort(
          (a, b) => b.runs - a.runs,
        )[0];
  }

  fastestAbility() {
    /**
     * Returns the starting ability with the lowest average run time.
     * @return {Object} The average time, number of runs and times per run for the fastest ability.
     */
    let ability = this.getStatsBarChartData("abilities").sort(
      (a, b) => a.time - b.time,
    )[0];
    ability.time = this.convertRawToTime(ability.time);

    return ability;
  }

  favoriteDragon(reverse = false) {
    /**
     * Returns the dragon that appears in the most amount of runs.
     * @param {Boolean} reverse If set to `true`, the least-used dragon will be returned instead.
     * @return {Object} The average time, number of runs and times per run for the most fought dragon.
     */
    return reverse
      ? this.getStatsBarChartData("dragons", this.dragonList).sort(
          (a, b) => a.runs - b.runs,
        )[0]
      : this.getStatsBarChartData("dragons", this.dragonList).sort(
          (a, b) => b.runs - a.runs,
        )[0];
  }

  numOfDragons(dataType = "time") {
    /**
     * Find average time and total runs for each possible amount of dragons that can be fought in a run.
     * @param {String} dataType The data field to be the primary `data` field;
     *    this is what will be displayed on the y-Axis in StatsBarChart.
     * @return {Array} Array of the total runs and average time for each amount of dragons, formatted
     *    to be used with StatsBarChart.
     */
    let data = [];

    for (let run = 0; run < this.runData.length; run++) {
      data = this.generateStatsBarChartDataPoint(
        this.runData[run].dragons.length,
        this.runData[run],
        data,
        dataType,
      );
    }

    for (let i = 0; i < 9; i++) {
      const name = i;
      data = this.createDefaultDataPoint(name, data);
    }

    return data.sort((a, b) => a.name - b.name);
  }

  getFriendlyDragonList() {
    /**
     * Returns a list of all dragons, in human-readable form,
     * replacing `_` with ` ` and `__` with `-`
     * @return {Array} An array with human-readable dragon names
     */

    return this.getFriendlyEnumList(this.dragonList);
  }

  getFriendlyEnumList(enumList) {
    /**
     * Helper function that takes an enum list and returns a human-readable version,
     * replacing `_` with ` ` and `__` with `-`
     * @param {Array} enumList The enumList to parse
     * @return {Array} An array with human-readable names
     */

    let parsedList = [];
    for (let i = 0; i < enumList.length; i++) {
      parsedList.push(this.removeSpaces(enumList[i]));
    }

    return parsedList;
  }

  dragonHeatMap() {
    /**
     * Creates a frequency map of each dragon vs the total number of dragons in a run
     * @return {Object} A frequency map of every dragon+numOfDragons combinations.
     *  Each entry contains `dragonName` (an INT referencing the dragon's location in `dragonList`),
     *  `numOfDragons (an INT for the number of dragons fought in a run),
     *  and `numOfRuns` (an INT for the number of runs with this combination of `dragonName` and `numOfDragons`)
     */
    let data = { dragons: [], interval: 0 };

    // Populate the initial list of 64 combinations
    for (
      let dragonName = 0;
      dragonName <= this.dragonList.length;
      dragonName++
    ) {
      for (
        let numOfDragons = 0;
        numOfDragons < this.dragonList.length;
        numOfDragons++
      ) {
        data.dragons.push({
          dragon: dragonName,
          dragonName: this.getFriendlyDragonList()[dragonName],
          numOfDragons: numOfDragons + 1,
          numOfRuns: 0,
        });
      }
    }

    // Iterate over every run and every dragon in the run,
    // incrementing `numOfRuns` for a given combination of dragon + `numOfDragons`
    for (let run = 0; run < this.runData.length; run++) {
      for (
        let dragon = 0;
        dragon < this.runData[run].dragons.length;
        dragon++
      ) {
        let dragonIndex = this.dragonList.indexOf(
          this.runData[run].dragons[dragon],
        );

        let numOfDragons = this.runData[run].dragons.length;
        data.dragons[dragonIndex * 8 + (numOfDragons - 1)].numOfRuns++;

        // Setting the heatmap interval to the highest runs per dragon
        if (
          data.dragons[dragonIndex * 8 + (numOfDragons - 1)].numOfRuns >
          data.interval
        ) {
          data.interval =
            data.dragons[dragonIndex * 8 + (numOfDragons - 1)].numOfRuns;
        }
      }
    }

    return data;
  }

  sortByTime() {
    return this.runData.sort((a, b) => a.runTimeRaw - b.runTimeRaw);
  }

  sortByAttempt() {
    return this.runData.sort((a, b) => a.attempt - b.attempt);
  }

  sortByDate() {
    let runsWithEpoch = [];
    for (let i = 0; i < this.runData.length; i++) {
      runsWithEpoch.push({
        ...this.runData[i],
        dateEpoch: Date.parse(this.runData[i].runDate),
      });
    }
    return runsWithEpoch.sort((a, b) => a.dateEpoch - b.dateEpoch);
  }

  flagsets() {
    let uniqueFlagsets = Array.from(
      new Set(this.unfilteredRunData.map(({ flagset }) => flagset)),
    );
    let flagsets = [{ name: "All", displayName: "All" }];

    for (let i = 0; i < uniqueFlagsets.length; i++) {
      flagsets.push({
        name: uniqueFlagsets[i],
        displayName: this.removeSpaces(uniqueFlagsets[i]),
      });
    }
    return flagsets;
  }

  races() {
    let races = [{ name: "All", displayName: "All" }];

    if (this.flagsetFilter !== "All") {
      // First we get all the flagsets from the global, unfiltered data
      // Then we filter for our current flagset
      const flagsetData = this.unfilteredRunData.filter(
        (data) => data.flagset === this.flagsetFilter,
      );
      let uniqueRaces = Array.from(
        new Set(flagsetData.map(({ race }) => race)),
      );

      for (let i = 0; i < uniqueRaces.length; i++) {
        races.push({
          name: uniqueRaces[i],
          displayName: this.removeSpaces(uniqueRaces[i]),
        });
      }
    }
    return races;
  }

  convertRawToTime(rawRunTime) {
    // 1- Convert to seconds:
    let seconds = rawRunTime / 1000;
    // 2- Extract hours:
    const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = Math.round(seconds % 60);
    return (
      hours +
      ":" +
      (minutes < 10 ? `0${minutes}` : minutes) +
      ":" +
      (seconds < 10 ? `0${seconds}` : seconds)
    );
  }

  getStatsBarChartData(field, enumList = null, dataType = "time") {
    /**
     * For a given array in `runData`, calculate the average time and runs in a format to be used by StatsBarChart.
     * @param {String} field The run field to generate a chart for, ie `dragons`.
     * @param {Array} enumList (Optional) An array of Enums from graphql for the given field.  If provided, any missing Enums
     *    will be added to the result, but with zeroed out data.
     * @param {String} dataType Set the data field to be the primary `data` field;
     *    this is what will be displayed on the y-Axis in StatsBarChart.
     * @return {Array} Array of datapoints to work with StatsBarChart.  Each point contains a `name`, `time`, the number of runs and the times per run.
     */
    let data = [];

    for (let run = 0; run < this.runData.length; run++) {
      for (let i = 0; i < this.runData[run][field].length; i++) {
        data = this.generateStatsBarChartDataPoint(
          this.removeSpaces(this.runData[run][field][i]),
          this.runData[run],
          data,
        );
      }
    }

    // If a list of Enums is presented, add each element to the dataset
    // with default values, if it doesn't already exist
    if (enumList) {
      for (let i = 0; i < enumList.length; i++) {
        const name = this.removeSpaces(enumList[i]);
        data = this.createDefaultDataPoint(name, data);
      }
    }

    // In the event that no data is found, set some defaults.
    data =
      data.length === 0 ? [{ name: "N/A", data: 0, time: 0, runs: 0 }] : data;

    // If enumList was provided, sort data by enumList order
    if (enumList != null) {
      data = enumList.map((i) =>
        data.find((j) => j.name === this.removeSpaces(i)),
      );
    }
    return data;
  }

  generateStatsBarChartDataPoint(name, run, currentData, dataType = "time") {
    /**
     * Creates or updates a StatsBarChart data point with new run data.  If data already exists for a given name, it will be updated with the run's time.
     * @param {String} name The value of the `name` field in the current data you want to add or update.
     * @param {Object} run A `run` object.
     * @param {Array} currentData The StatsBarChart data to update.
     * @param {String} dataType The data field to be the primary `data` field;
     *    this is what will be displayed on the y-Axis in StatsBarChart.
     * @return {Array} An updated StatsBarChart data set.
     */
    const index = currentData.findIndex((object) => {
      return object.name === name;
    });

    // If index < 0 then it hasn't been added yet, so default runTimes to an empty array
    let runTimes = index >= 0 ? currentData[index].runTimes : [];
    runTimes.push(run.runTimeRaw);

    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;
    const time = Math.round(average(runTimes));

    const payload = {
      name: name,
      data: dataType === "runs" ? runTimes.length : time,
      time: time,
      runs: runTimes.length,
      runTimes: runTimes,
    };

    // If data point is already added, update it.  Otherwise, push it as a new element
    if (index >= 0) {
      currentData[index] = payload;
    } else {
      currentData.push(payload);
    }
    return currentData;
  }

  averageCharsSkip() {
    const skipChars = this.averageChars(this.skipData());

    return isNaN(skipChars) ? "-" : skipChars;
  }

  averageEspersSkip() {
    const skipEspers = this.averageEspers(this.skipData());

    return isNaN(skipEspers) ? "-" : skipEspers;
  }

  averageNum(field, data = this.runData) {
    /**
     * Finds the average of a field across all runs.  Field must be an `int`.
     * @param {String} field Field to average.
     * @param {Array} data Opional: Data to average.  Defaults to all runs.
     * @returns {Int} Average result.
     */
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b[field], 0) / array.length) * 100,
      ) / 100;
    return average(data);
  }

  averageDragons(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.dragons.length, 0) / array.length) * 100,
      ) / 100;

    return average(data);
  }

  removeSpaces(name) {
    // Logic to get display name from id name
    // IE: `foo_bar` will be translated to `foo bar`
    let displayName = name;
    if (name.includes("_"))
      displayName = name.replace(/__/g, " - ").replace(/_/g, " ");
    return displayName;
  }

  createDefaultDataPoint(name, data, dataType) {
    /**
     * Populates a default data point.  Used to fill in missing data in static lists.
     * If datapoint already exists in data, nothing happens.
     * @param {String} name The name of the datapoint to generate
     * @param {Array} data The collection of data points
     * @return {Array} The collection of data points with new default data point added
     */

    const index = data.findIndex((object) => {
      return object.name === name;
    });

    if (index < 0) {
      const runTimes = [];
      const payload = {
        name: name,
        data: null,
        time: null,
        runs: runTimes.length,
        runTimes: runTimes,
      };

      data.push(payload);
    }

    return data;
  }
}
