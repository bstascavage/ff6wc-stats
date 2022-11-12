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
        (data) => data.flagset === this.flagsetFilter
      );
      if (this.raceFilter !== "All") {
        // Then filter by race
        this.runData = this.runData.filter(
          (data) => data.race === this.raceFilter
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
        Math.floor(Math.round(skipTime) / 1000) * 1000
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
      this.averageTimeRaw() - this.bestRun().runTimeRaw
    );
  }

  deltaLastTime() {
    return this.convertDeltaTime(
      this.averageTimeRaw() - this.lastRun().runTimeRaw
    );
  }

  deltaSkipTime(skip = true) {
    const data = this.skipData(skip);
    return this.convertDeltaTime(
      this.averageTimeRaw() - this.averageTimeRaw(data)
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
      Math.floor(Math.round(Math.sqrt(sum / runs.length)) / 1000) * 1000
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
      Math.floor(Math.round(this.averageTimeRaw(runs)) / 1000) * 1000
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

  deadChecksByTime() {
    const times = this.deadChecks();

    let timesPerDeadcheck = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    //Sort based on deadcheck order
    for (let i = 0; i < 12; i++) {
      if (i in times) {
        const averageTime = Math.round(average(times[i]));
        timesPerDeadcheck.push({
          name: i,
          data: averageTime,
          time: averageTime,
          runs: times[i].length,
        });
      }
    }

    return timesPerDeadcheck;
  }

  deadChecksByFreq() {
    const times = this.deadChecks();

    let freqOfDeadcheck = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    for (let i = 0; i < 12; i++) {
      if (i in times) {
        freqOfDeadcheck.push({
          name: i,
          data: times[i].length,
          time: Math.round(average(times[i])),
          runs: times[i].length,
        });
      }
    }

    return freqOfDeadcheck;
  }

  startingCharacters() {
    let times = {};
    for (let i = 0; i < this.runData.length; i++) {
      for (let char = 0; char < this.runData[i].chars.length; char++) {
        if (!(this.runData[i].chars[char] in times)) {
          times[this.runData[i].chars[char]] = [this.runData[i].runTimeRaw];
        } else {
          times[this.runData[i].chars[char]].push(this.runData[i].runTimeRaw);
        }
      }
    }

    let timesPerChar = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    //Sort chars based on enum order
    for (let i = 0; i < this.charList.length; i++) {
      if (this.charList[i] in times) {
        const averageTime = Math.round(average(times[this.charList[i]]));

        timesPerChar.push({
          name: this.charList[i],
          data: averageTime,
          time: averageTime,
          runs: times[this.charList[i]].length,
        });
      }
    }

    return timesPerChar;
  }

  mostUsedCharacter() {
    return this.startingCharacters().sort((a, b) => b.runs - a.runs)[0];
  }

  fastestCharacter() {
    let char = this.startingCharacters().sort((a, b) => a.data - b.data)[0];
    char.time = this.convertRawToTime(char.data);

    return char;
  }

  mostUsedAbility() {
    return this.startingAbilities().sort((a, b) => b.runs - a.runs)[0];
  }

  fastestAbility() {
    let ability = this.startingAbilities().sort((a, b) => a.data - b.data)[0];
    ability.time = this.convertRawToTime(ability.data);

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
          (a, b) => a.runs - b.runs
        )[0]
      : this.getStatsBarChartData("dragons", this.dragonList).sort(
          (a, b) => b.runs - a.runs
        )[0];
  }

  numOfDragons(dataType = "time") {
    /**
     * Find average time and total runs for each possible amount of dragons that can be fought in a run.
     * @param {String} dataType Set the data field to be the primary `data` field;
     *    this is what will be displayed on the y-Axis in StatsBarChart.
     * @return {Array} Array of the total runs and average time for each amount of dragons, formatted
     *    to be used with StatsBarChart.
     */
    let numOfDragons = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    for (let i = 0; i < this.runData.length; i++) {
      let runTimes =
        this.runData[i].dragons.length in numOfDragons
          ? numOfDragons[this.runData[i].dragons.length].runTimes
          : [];
      runTimes.push(this.runData[i].runTimeRaw);

      const time = Math.round(average(runTimes));

      numOfDragons[this.runData[i].dragons.length] = {
        name: this.runData[i].dragons.length,
        data: dataType === "runs" ? runTimes.length : time,
        time: time,
        runs: runTimes.length,
        runTimes: runTimes,
      };
    }

    return numOfDragons;
  }

  startingAbilities() {
    /**
     * Find average time and total runs for each starting ability.
     * @return {Array} Array of the total runs and average time for each starting ability, formatted
     *    to be used with StatsBarChart.
     */
    let timesPerAbility = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    for (let i = 0; i < this.runData.length; i++) {
      for (
        let ability = 0;
        ability < this.runData[i].abilities.length;
        ability++
      ) {
        const name = this.removeSpaces(this.runData[i].abilities[ability]);
        const index = timesPerAbility.findIndex((object) => {
          return object.name === name;
        });

        // If index < 0 then it hasn't been added yet, so default runTimes to an empty array
        let runTimes = index >= 0 ? timesPerAbility[index].runTimes : [];

        runTimes.push(this.runData[i].runTimeRaw);

        const time = Math.round(average(runTimes));
        const abilityPayload = {
          name: name,
          data: time,
          time: time,
          runs: runTimes.length,
          runTimes: runTimes,
        };

        // If ability is already added, update it.  Otherwise, push it as a new element
        if (index >= 0) {
          timesPerAbility[index] = abilityPayload;
        } else {
          timesPerAbility.push(abilityPayload);
        }
      }
    }

    return timesPerAbility;
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
      new Set(this.unfilteredRunData.map(({ flagset }) => flagset))
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
        (data) => data.flagset === this.flagsetFilter
      );
      let uniqueRaces = Array.from(
        new Set(flagsetData.map(({ race }) => race))
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

  getStatsBarChartData(field, enumList = null) {
    /**
     * For a given array in `runData`, calculate the average time and runs in a format to be used by StatsBarChart.
     * @param {String} field The run field to generate a chart for, ie `dragons`.
     * @param {Array} enumList (Optional) An array of Enums from graphql for the given field.  If provided, any missing Enums
     *    will be added to the result, but with zeroed out data.
     * @return {Array} Array of datapoints to work with StatsBarChart.  Each point contains a `name`, `time`, the number of runs and the times per run.
     */
    let data = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    for (let run = 0; run < this.runData.length; run++) {
      for (let i = 0; i < this.runData[run][field].length; i++) {
        const name = this.removeSpaces(this.runData[run][field][i]);
        const index = data.findIndex((object) => {
          return object.name === name;
        });

        // If index < 0 then it hasn't been added yet, so default runTimes to an empty array
        let runTimes = index >= 0 ? data[index].runTimes : [];

        runTimes.push(this.runData[run].runTimeRaw);

        const time = Math.round(average(runTimes));
        const payload = {
          name: name,
          data: time,
          time: time,
          runs: runTimes.length,
          runTimes: runTimes,
        };

        // If data point is already added, update it.  Otherwise, push it as a new element
        if (index >= 0) {
          data[index] = payload;
        } else {
          data.push(payload);
        }
      }
    }

    // If a list of Enums is presented, add each element to the dataset if it doesn't already exist,
    // filling it out with 0ed out data.
    if (enumList) {
      for (let i = 0; i < enumList.length; i++) {
        const name = this.removeSpaces(enumList[i]);
        const index = data.findIndex((object) => {
          return object.name === name;
        });

        if (index < 0) {
          const time = 0;
          const runTimes = [];
          const payload = {
            name: name,
            data: time,
            time: time,
            runs: runTimes.length,
            runTimes: runTimes,
          };

          data.push(payload);
        }
      }
    }

    return data;
  }

  averageChars(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.numOfChars, 0) / array.length) * 100
      ) / 100;
    return average(data);
  }

  averageEspers(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.numOfEspers, 0) / array.length) * 100
      ) / 100;
    return average(data);
  }

  averageBosses(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.numOfBosses, 0) / array.length) * 100
      ) / 100;
    return average(data);
  }

  averageDeadChecks(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.numOfDeadchecks, 0) / array.length) * 100
      ) / 100;
    return average(data);
  }

  averageDragons(data = this.runData) {
    const average = (array) =>
      Math.floor(
        (array.reduce((a, b) => a + b.dragons.length, 0) / array.length) * 100
      ) / 100;

    return average(data);
  }

  averageCharsSkip() {
    const skipChars = this.averageChars(this.skipData());

    return isNaN(skipChars) ? "-" : skipChars;
  }

  averageEspersSkip() {
    const skipEspers = this.averageEspers(this.skipData());

    return isNaN(skipEspers) ? "-" : skipEspers;
  }

  removeSpaces(name) {
    // Logic to get display name from id name
    // IE: `foo_bar` will be translated to `foo bar`
    let displayName = name;
    if (name.includes("_"))
      displayName = name.replace(/__/g, " - ").replace(/_/g, " ");
    return displayName;
  }
}
