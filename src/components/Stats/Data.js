export class Data {
  constructor(runData, filters) {
    this.globalRunData = runData;
    this.flagsetFilter = filters.flagsetFilter;
    this.raceFilter = filters.raceFilter;

    if (this.flagsetFilter === "All") {
      this.runData = runData;
    } else {
      this.runData = runData.filter(
        (data) => data.flagset === this.flagsetFilter
      );
    }

    if (this.raceFilter === "All") {
      this.runData = this.runData;
    } else {
      this.runData = this.runData.filter(
        (data) => data.race === this.raceFilter
      );
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
      new Set(this.globalRunData.map(({ flagset }) => flagset))
    );
    let flagsets = [{ name: "All", display_name: "All" }];

    for (let i = 0; i < uniqueFlagsets.length; i++) {
      let elem_display_name = uniqueFlagsets[i];
      if (uniqueFlagsets[i].includes("_"))
        elem_display_name = uniqueFlagsets[i]
          .replace(/__/g, " - ")
          .replace(/_/g, " ");
      flagsets.push({
        name: uniqueFlagsets[i],
        display_name: elem_display_name,
      });
    }
    return flagsets;
  }

  races() {
    let uniqueRaces = Array.from(new Set(this.runData.map(({ race }) => race)));
    let races = [{ name: "All", display_name: "All" }];

    if (this.flagsetFilter !== "All") {
      for (let i = 0; i < uniqueRaces.length; i++) {
        let elem_display_name = uniqueRaces[i];
        if (uniqueRaces[i].includes("_"))
          elem_display_name = uniqueRaces[i]
            .replace(/__/g, " - ")
            .replace(/_/g, " ");
        races.push({ name: uniqueRaces[i], display_name: elem_display_name });
      }
    }
    return races;
  }
}
