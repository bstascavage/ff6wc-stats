const CONFIG = {
  submit: {
    runTime: {
      type: "textInput",
      title: "Total Time",
      id: "runTime",
      required: true,
      placeholder: "1:30:00",
      help: "Time when you see the flash/hear the crack after killing Kefka.",
    },
    ktStartTime: {
      type: "textInput",
      title: "KT Start Time",
      id: "ktStartTime",
      required: false,
      placeholder: "1:00:00",
      help: "Time after you pick your party to enter Kefka's Tower.",
    },
    kefkaTime: {
      type: "textInput",
      title: "Kefka Start Time",
      id: "kefkaTime",
      required: false,
      placeholder: "1:20:00",
      help: "Time when your final party steps on the final switch.",
    },
    flagset: {
      type: "dropdown",
      title: "Flagset",
      id: "flagset",
      required: false,
      enumName: "Flagset",
      help: "What flagset did you run?",
    },
    chars: {
      type: "checkbox",
      title: "Characters",
      id: "chars",
      required: true,
      enumName: "Character",
    },
    abilities: {
      type: "checkbox",
      title: "Abilities",
      id: "abilities",
      required: true,
      enumName: "Ability",
    },
    numOfChars: {
      type: "slider",
      title: "Characters Found",
      id: "numOfChars",
      required: true,
      min: "1",
      max: "14",
      step: "1",
      startingValue: "3",
      help: "Final number of characters, found in the Track->Progress screen.",
    },
    numOfEspers: {
      type: "slider",
      title: "Espers Found",
      id: "numOfEspers",
      required: true,
      min: "0",
      max: "27",
      step: "1",
      startingValue: "0",
      help: "Final number of espers, found in the Track->Progress screen.",
    },
    numOfChecks: {
      type: "slider",
      title: "Checks Complete",
      id: "numOfChecks",
      required: true,
      min: "0",
      max: "61",
      step: "1",
      startingValue: "0",
      help: "Total amount of checks, found in the Track->Progress screen.",
    },
    numOfPeekedChecks: {
      type: "slider",
      title: "Checks Peeked/Canceled",
      id: "numOfPeekedChecks",
      required: false,
      min: "0",
      max: "61",
      step: "1",
      startingValue: "0",
      help: "Number of checks that added to time but were not captured above.  This includes any checks that were peeked at, warped or reset out of.",
    },
    numOfBosses: {
      type: "slider",
      title: "Bosses Defeated",
      id: "numOfBosses",
      required: true,
      min: "0",
      max: "39",
      step: "1",
      startingValue: "0",
      help: "Total amount of bosses defeated, found in the Track->Progress screen.",
    },
    numOfChests: {
      type: "slider",
      title: "Number of Chests",
      id: "numOfChests",
      required: false,
      min: "0",
      max: "255",
      step: "1",
      startingValue: "0",
      help: "Entering 0 chests indicates that you did not record this datapoint.",
    },
    skip: {
      type: "toggle",
      title: "Skip",
      id: "skip",
      required: true,
      help: "Whether you skipped straight to the statues in Kefka's Tower.",
    },
    dragons: {
      type: "checkbox",
      title: "Dragons Defeated",
      id: "dragons",
      required: true,
      subtitleText: "Where you fought a dragon",
      help: "Selecting none indicates that you took 0 dragon fights.",
      enumName: "Dragon",
    },
    finalBattle: {
      type: "checkbox",
      title: "Final Battle Preparation",
      id: "finalBattle",
      required: false,
      help: "Selecting none indicates no special prep for the final battle.",
      enumName: "FinalBattleTrait",
    },
    highestLevel: {
      type: "slider",
      title: "Highest Level",
      id: "highestLevel",
      required: false,
      min: "0",
      max: "99",
      step: "1",
      startingValue: "0",
      help: "Highest level character.  Selecting '0' to opt out of this metric.",
    },
    superBalls: {
      type: "dropdown",
      title: "Superballs",
      id: "superBalls",
      required: false,
      enumName: "Superballs",
      help: "Whether you bought Superballs.",
    },
    egg: {
      type: "dropdown",
      title: "Exp. Egg",
      id: "egg",
      required: false,
      enumName: "Egg",
      help: "Did you find an Exp. Egg and get value out of it?",
    },
    coliseum: {
      type: "dropdown",
      title: "Coliseum",
      id: "coliseum",
      required: false,
      enumName: "Coliseum",
      help: "If you went to the coliseum.",
    },
    thiefPeek: {
      type: "dropdown",
      title: "Tzen Thief",
      id: "thiefPeek",
      required: false,
      enumName: "ThiefPeek",
      help: "Did you do the Tzen Thief check?",
    },
    thiefReward: {
      type: "dropdown",
      title: "Tzen Thief - Reward",
      id: "thiefReward",
      required: false,
      enumName: "ThiefReward",
      help: "What was the thief's reward?",
    },
    auction: {
      type: "dropdown",
      title: "Auction House",
      id: "auction",
      required: false,
      enumName: "Auction",
      help: "Number of espers bought at the Auction House.",
    },
    race: {
      type: "dropdown",
      title: "Race",
      id: "race",
      required: false,
      enumName: "Race",
      help: 'Whether this run was a race or not.  Note that "Practice" indicates a sync or async race, not individual practice.',
    },
    mood: {
      type: "dropdown",
      title: "Run Mood",
      id: "mood",
      required: false,
      enumName: "Mood",
      help: "On a scale of 1-5, how you felt about your run (5 being the best).",
    },
    seed: {
      type: "textInput",
      title: "Seed",
      id: "seed",
      required: false,
      placeholder: "abcd1234ef56",
      help: "Unique ID generated for your seed.",
    },
    raceId: {
      type: "textInput",
      title: "Race ID",
      id: "raceId",
      required: false,
      placeholder: "abc123",
      help: "Race room ID for Discord-based race.",
    },
  },
  submitFormat: {
    // This is the format of panels on the submission page.  The children of the colums are the cards
    // and their children are the fields in those cards.
    columnLeft: {
      runTime: {
        title: "Run Time",
        children: [
          "runTime",
          "ktStartTime",
          "kefkaTime",
          "flagset",
          "seed",
          "race",
          "raceId",
          "mood",
        ],
      },
      startingParty: {
        title: "Starting Party",
        children: ["chars", "abilities"],
      },
    },
    columnRight: {
      progress: {
        title: "Progress",
        children: [
          "numOfChars",
          "numOfEspers",
          "numOfChecks",
          "numOfPeekedChecks",
          "dragons",
          "skip",
        ],
      },
      offense: {
        title: "Offense",
        children: [
          "finalBattle",
          "highestLevel",
          "superBalls",
          "egg",
          "coliseum",
        ],
      },
      checks: {
        title: "Misc",
        children: [
          "numOfBosses",
          "numOfChests",
          "auction",
          "thiefPeek",
          "thiefReward",
        ],
      },
    },
  },
  about: {
    questions: [
      {
        question: "What is this thing?",
        answer:
          "<b>Stats Collide</b> is a stats collecting tool to help Final Fantasy VI: Worlds Collide runners track their speedrunning progress.  Users can submit data for their runs and track their over times and other metrics via a dashboard.  This allows the runner to notice trends with their play-styles, identify strengths and weaknesses, and generally get a better picture of their progress across multiple runs.",
      },
      {
        //TODO: Add nested answer section, to allow a list here
        question: "What kind of data do I need to submit?",
        answer:
          // eslint-disable-next-line
          "While there is a lot of data on the submissions page, most of it is optional.  The philosophy of the tool is to only require data that can be found in the in-game <i>Track</i> menu and by loading a fresh save (plus final run time).  This way any runner can submit a run without additional tools or rewatching VODs.  The following data is required for every run: \
          <ul> \
          \n<li>Total Time</li> \
          <li>Characters Found</li> \
          <li>Espers Found</li> \
          <li>Checks Complete</li> \
          <li>Dragons Defeated</li> \
          <li>Skip?</li> \
          <li>Starting Characters</li> \
          <li>Starting Abilities</li> \
          <li>Bosses Defeated</li> \
          </ul> ",
      },
      {
        question:
          "If some data is optional, won't that make some charts and graphs inconsistent?",
        answer:
          "It is difficult to account for every type of data that may or may not be submitted without making too many be mandatory.  Therefore it is up to each runner to be consistent with the data they submit or to understand that some charts might not be reflective of every run submitted.",
      },
      {
        question:
          "How do I find the 'Number of Chests' stat?  I don't see it in the in-game menu.",
        answer:
          'Currently this can only be found via third-party tools.  I highly suggest checking out <a href="https://tracker.kielbasiago.com/?characterTag=true&font=DEFAULT&mode=AUTO&background=TRANSPARENT&themeMode=dark&showHeader=true&layoutType=3x2">Kielbasiago\'s Autotracker</a>, which compliments this tool nicely. Setup instructions can be found <a href="https://github.com/kielbasiago/guides/blob/master/ff6wc/gated-tracker.md">here</a>.',
      },
      {
        question:
          "How do I determine the 'KT Start Time' and 'Kefka Start Time' times?",
        answer:
          "These numbers are not captured by the in-game tracker nor external trackers.  It is recommended to use Livesplit or some other timer to capture this information.",
      },
      {
        question: "What does 'Run Mood' mean?",
        answer:
          "This indicates how good you felt overall about your run.  In the future it can be used to correlate mood with other metrics, such as run time.",
      },
      {
        question:
          "Not all run stats appear in my stats dashboard.  What gives?",
        answer:
          "More and more graphs and charts will be added over the coming weeks/months; a small selection of charts were identified for the initial release.  It's better to record this data now so that you have complete data when the associated charts are implemented.",
      },
      {
        question:
          "The site could look better/is really ugly and I have an idea on how to improve it.",
        answer:
          'I am not a frontend developer/UI designer and this is my first big project in that regard.  If you have suggestions feel free to DM me, and if you know CSS, HTML or react and see something that can be improved, feel free to submit a PR.  The site is open source and can be found <a href="https://github.com/bstascavage/ff6wc-stats">here</a>.',
      },
      {
        question:
          "It's cool that you are collecting everyone's stats.  Can we see a global dashboard of all run data?",
        answer: "A global dashboard is planned as a future feature.",
      },
    ],
  },
};

export default CONFIG;
