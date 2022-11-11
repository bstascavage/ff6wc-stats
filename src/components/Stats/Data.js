export class Data {
  constructor(runData, filters, charList, abilityList) {
    this.unfilteredRunData = runData;
    this.runData = runData;
    this.flagsetFilter = filters.flagsetFilter.value;
    this.raceFilter = filters.raceFilter.value;
    this.charList = charList;
    this.abilityList = abilityList;

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
      i in times
        ? freqOfDeadcheck.push({
            name: i,
            data: times[i].length,
            time: Math.round(average(times[i])),
            runs: times[i].length,
          })
        : freqOfDeadcheck.push({
            name: i,
            time: 0,
            runs: 0,
          });
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

  startingAbilities() {
    let times = {};
    for (let i = 0; i < this.runData.length; i++) {
      for (
        let ability = 0;
        ability < this.runData[i].abilities.length;
        ability++
      ) {
        if (!(this.runData[i].abilities[ability] in times)) {
          times[this.runData[i].abilities[ability]] = [
            this.runData[i].runTimeRaw,
          ];
        } else {
          times[this.runData[i].abilities[ability]].push(
            this.runData[i].runTimeRaw
          );
        }
      }
    }

    let timesPerAbility = [];
    const average = (array) => array.reduce((a, b) => a + b, 0) / array.length;

    //Sort ability based on enum order
    for (let i = 0; i < this.abilityList.length; i++) {
      if (this.abilityList[i] in times) {
        // Logic to get display name from id name
        // IE: `foo_bar` will be translated to `foo bar`
        let abilityDisplayName = this.abilityList[i];
        if (this.abilityList[i].includes("_"))
          abilityDisplayName = this.abilityList[i]
            .replace(/__/g, " - ")
            .replace(/_/g, " ");

        const averageTime = Math.round(average(times[this.abilityList[i]]));
        timesPerAbility.push({
          name: abilityDisplayName,
          data: averageTime,
          time: averageTime,
          runs: times[this.abilityList[i]].length,
        });
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
      // Logic to get display name from id name
      // IE: `foo_bar` will be translated to `foo bar`
      let elemDisplayName = uniqueFlagsets[i];
      if (uniqueFlagsets[i].includes("_"))
        elemDisplayName = uniqueFlagsets[i]
          .replace(/__/g, " - ")
          .replace(/_/g, " ");
      flagsets.push({
        name: uniqueFlagsets[i],
        displayName: elemDisplayName,
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
        // Logic to get display name from id name
        // IE: `foo_bar` will be translated to `foo bar`
        let elemDisplayName = uniqueRaces[i];
        if (uniqueRaces[i].includes("_"))
          elemDisplayName = uniqueRaces[i]
            .replace(/__/g, " - ")
            .replace(/_/g, " ");
        races.push({ name: uniqueRaces[i], displayName: elemDisplayName });
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

  averageCharsSkip() {
    const skipChars = this.averageChars(this.skipData());

    return isNaN(skipChars) ? "-" : skipChars;
  }

  averageEspersSkip() {
    const skipEspers = this.averageEspers(this.skipData());

    return isNaN(skipEspers) ? "-" : skipEspers;
  }
}
