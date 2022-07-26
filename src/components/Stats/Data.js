export class Data {
  constructor(runData, filters) {
    this.unfilteredRunData = runData;
    this.runData = runData;
    this.flagsetFilter = filters.flagsetFilter.value;
    this.raceFilter = filters.raceFilter.value;

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

  bestTime() {
    return this.runData.sort(
      (a, b) =>
        new Date("1970-01-01 " + a.runTime).getTime() -
        new Date("1970-01-01 " + b.runTime).getTime()
    )[0].runTime; // sort by attempt, desc, to get latest attempt
  }

  lastTime() {
    return this.runData.sort((a, b) => b.attempt - a.attempt)[0].runTime; // sort by attempt, desc, to get latest attempt
  }

  standardDeviation() {
    return "9:59:59";
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
}
