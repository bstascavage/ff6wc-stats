const graphql = require("./graphql.js");
const config = require("./config.js").config;

async function validate(data) {
  // Main validate class
  let validationResults = {};

  for (const key in data) {
    // Loops through each field and calls `validate_<field>` to determine data verification
    if (key !== "userId") {
      validationResults = {
        ...validationResults,
        validationDetails: {
          ...validationResults.validationDetails,
          [`validate_${key}`]: await eval("validate_" + key)(data),
        },
      };
    }
  }

  validationResults = {
    ...validationResults,
    validationStatus: Object.values(validationResults.validationDetails).every(
      (item) => item.result
    ),
  };

  return validationResults;
}

function validate_numOfChecks(runData) {
  if (
    runData.numOfChecks <
    parseInt(runData.numOfChars) +
      parseInt(runData.numOfEspers) +
      parseInt(runData.dragons.length)
  ) {
    return {
      result: false,
      reason:
        "Total checks completed cannot be lower than characters+espers+dragons.",
    };
  }
  return checkNumberRange(runData.numOfChecks, 0, 61);
}

function validate_numOfPeekedChecks(runData) {
  return checkNumberRange(runData.numOfPeekedChecks, 0, 61);
}

function validate_runTime(runData) {
  // Validates that the submitted time is in the format hh:mm:ss
  if (runData.runTime.length === 0) {
    return { result: false, reason: "No run time submitted." };
  } else if (checkTime(runData.runTime)) {
    return { result: true };
  } else {
    return { result: false, reason: "Time not in proper hh:mm:ss format." };
  }
}

function validate_ktStartTime(runData) {
  // Validates that the submitted time is in the format hh:mm:ss
  if (runData.ktStartTime.length === 0) {
    if (runData.kefkaTime.length === 0) {
      return { result: true };
    } else {
      return {
        result: false,
        reason: 'Cannot be blank if "Kefka Start Time" is entered.',
      };
    }
  } else if (checkTime(runData.ktStartTime)) {
    let runTimeDate = new Date("1970-01-01 " + runData.runTime);
    let ktStartTimeDate = new Date("1970-01-01 " + runData.ktStartTime);

    if (ktStartTimeDate.getTime() > runTimeDate.getTime()) {
      return {
        result: false,
        reason: 'Time cannot be higher than the "Total Time"',
      };
    } else {
      return { result: true };
    }
  } else {
    return { result: false, reason: "Time not in proper hh:mm:ss format." };
  }
}

function validate_kefkaTime(runData) {
  // Validates that the submitted time is in the format hh:mm:ss
  if (runData.kefkaTime.length === 0) {
    if (runData.ktStartTime.length === 0) {
      return { result: true };
    } else {
      return {
        result: false,
        reason: 'Cannot be blank if "KT Start Time" is entered.',
      };
    }
  } else if (checkTime(runData.kefkaTime)) {
    let runTimeDate = new Date("1970-01-01 " + runData.runTime);
    let ktStartTimeDate = new Date("1970-01-01 " + runData.ktStartTime);
    let kefkaTimeDate = new Date("1970-01-01 " + runData.kefkaTime);

    if (kefkaTimeDate.getTime() > runTimeDate.getTime()) {
      return {
        result: false,
        reason: 'Time cannot be higher than the "Total Time"',
      };
    } else if (kefkaTimeDate.getTime() < ktStartTimeDate.getTime()) {
      return {
        result: false,
        reason: 'Time cannot be lower than the "KT Start Time"',
      };
    } else {
      return { result: true };
    }
  } else {
    return { result: false, reason: "Time not in proper hh:mm:ss format." };
  }
}

// TODO: Placeholder in till I figure out non-required fields
function validate_numOfChests(runData) {
  return {
    result: true,
  };
}

function validate_skip(runData) {
  if (typeof runData.skip == "boolean") {
    if (runData.skip) {
      if (config.flagsetRules[runData.flagset].skip.no_verify) {
        return {
          result: true,
        };
      }
      let skipChecks = [];
      Object.keys(config.flagsetRules[runData.flagset].skip.reqs).forEach(
        function (key) {
          switch (key) {
            case "bosses":
              runData.numOfBosses >=
              config.flagsetRules[runData.flagset].skip.reqs.bosses
                ? skipChecks.push(true)
                : null;
              break;
            case "espers":
              runData.numOfEspers >=
              config.flagsetRules[runData.flagset].skip.reqs.espers
                ? skipChecks.push(true)
                : null;
              break;
            case "chars":
              runData.numOfChars >=
              config.flagsetRules[runData.flagset].skip.reqs.chars
                ? skipChecks.push(true)
                : null;
              break;
            default:
              skipChecks.push(false);
              break;
          }
        }
      );

      const skipResult =
        skipChecks.length <
        config.flagsetRules[runData.flagset].skip.conditionsMet
          ? {
              result: false,
              reason: "Skip reqs not met.",
            }
          : {
              result: true,
            };
      return skipResult;
    }
    return {
      result: true,
    };
  } else {
    return {
      result: false,
      reason: "Value must be true or false.  Please contact administrator.",
    };
  }
}

async function validate_chars(runData) {
  // Validates that 1-4 characters were submitted and that all characters are valid
  let characters = runData.chars;

  if (characters.length === 0) {
    return { result: false, reason: "No starting characters selected." };
  } else if (characters.length > 4) {
    return {
      result: false,
      reason: "More than 4 starting characters selected.",
    };
  } else if (
    characters.length != config.flagsetRules[runData.flagset].startingChars
  ) {
    return {
      result: false,
      reason: `Must select ${
        config.flagsetRules[runData.flagset].startingChars
      } characters, per your flagset settings.`,
    };
  } else {
    return compareToBackendEnum("Character", characters);
  }
}

async function validate_dragons(runData) {
  let dragons = runData.dragons;

  if (dragons.length > 8) {
    return {
      result: false,
      reason: "More than 8 dragons submitted.  Contact administrator.",
    };
  } else {
    return compareToBackendEnum("Dragon", dragons);
  }
}

async function validate_abilities(runData) {
  let abilities = runData.abilities;
  let numOfAbilities = runData.chars.length;

  // To determine the number of abilities to check for:
  // numOfAbilities = runData.chars.length
  // If Gau, numOfAbilities+1
  // If Gogo or Umaro, numOfAbilities-1 for each
  if (runData.chars.includes("Gau")) ++numOfAbilities;
  if (runData.chars.includes("Gogo")) --numOfAbilities;
  if (runData.chars.includes("Umaro")) --numOfAbilities;

  if (abilities.length !== numOfAbilities) {
    return {
      result: false,
      reason: "Number of abilities submitted does not match party composition.",
    };
  } else {
    for (let i = 0; i < abilities.length; i++) {
      // Check to see if an ability is in the exclude list for its flagset
      if (
        config.flagsetRules[runData.flagset].excludedAbilities.includes(
          abilities[i]
        )
      ) {
        return {
          result: false,
          reason: "Ability not valid for your flagset.",
        };
      }
    }
    return compareToBackendEnum("Ability", abilities);
  }
}

async function validate_finalBattle(runData) {
  let finalBattleTraits = runData.finalBattle;

  if (finalBattleTraits.length > 4) {
    return {
      result: false,
      reason:
        "More than 4 final battle traits submitted.  Contact administrator.",
    };
  } else if (
    finalBattleTraits.includes("Did_not_record") &&
    finalBattleTraits.length != 1
  ) {
    return {
      result: false,
      reason: 'Cannot select other options with "Did not record".',
    };
  } else {
    return compareToBackendEnum("FinalBattleTrait", finalBattleTraits);
  }
}

async function validate_thiefPeek(runData) {
  return compareToBackendEnum("ThiefPeek", [runData.thiefPeek]);
}

async function validate_thiefReward(runData) {
  let reward = runData.thiefReward;
  let peek = runData.thiefPeek;

  if (peek === "Not_recorded") {
    if (reward !== "Not_recorded") {
      return {
        result: false,
        reason: "Cannot select reward if thief check was not done.",
      };
    }
  }
  if (peek == "Did_not_check") {
    if (reward !== "Did_not_buy__Unknown") {
      return {
        result: false,
        reason:
          "If you did not check the thief, select 'Did not buy - Unknown'",
      };
    }
  }
  if (peek === "Checked_WOR_only") {
    if (reward === "Did_not_buy__Esper" || reward === "Did_not_buy__Item") {
      return {
        result: false,
        reason:
          "Cannot know the reward was an esper/item if you only checked WOR.",
      };
    }
  }
  if (peek === "Checked_WOB_only" || peek === "Checked_both") {
    if (reward === "Did_not_buy__Unknown") {
      return {
        result: false,
        reason: "If you checked WOB, reward cannot be Unknown",
      };
    }
  }
  if (reward === "Not_recorded") {
    if (peek != "Not_recorded") {
      return {
        result: false,
        reason: "Must select thief reward.",
      };
    }
  }
  return compareToBackendEnum("ThiefReward", [reward]);
}

function validate_auction(runData) {
  return compareToBackendEnum("Auction", [runData.auction]);
}

function validate_coliseum(runData) {
  return compareToBackendEnum("Coliseum", [runData.coliseum]);
}

function validate_superBalls(runData) {
  return compareToBackendEnum("Superballs", [runData.superBalls]);
}

function validate_egg(runData) {
  return compareToBackendEnum("Egg", [runData.egg]);
}

async function validate_flagset(runData) {
  return compareToBackendEnum("Flagset", [runData.flagset]);
}

async function validate_race(runData) {
  return compareToBackendEnum("Race", [runData.race]);
}

async function validate_mood(runData) {
  return compareToBackendEnum("Mood", [runData.mood]);
}

function validate_numOfChars(runData) {
  let numValidation = checkNumberRange(runData.numOfChars, 1, 14);
  if (numValidation.result) {
    if (parseInt(runData.numOfChars) < runData.chars.length) {
      return {
        result: false,
        reason: "Number cannot be less than the number of starting characters.",
      };
    } else if (
      runData.numOfChars < config.flagsetRules[runData.flagset].minChars
    ) {
      return {
        result: false,
        reason:
          "Number is less than the required characters per your flagset settings.",
      };
    }
  }

  return numValidation;
}

function validate_numOfEspers(runData) {
  let esperValidation = checkNumberRange(runData.numOfEspers, 0, 27);
  if (esperValidation.result) {
    if (runData.numOfEspers < config.flagsetRules[runData.flagset].minEspers) {
      return {
        result: false,
        reason:
          "Number is less than the required espers per your flagset settings.",
      };
    }
  }

  return esperValidation;
}

function validate_numOfBosses(runData) {
  return checkNumberRange(runData.numOfBosses, 1, 39);
}

function validate_highestLevel(runData) {
  return checkNumberRange(runData.highestLevel, 0, 99);
}

function validate_seed(runData) {
  let seed = runData.seed;

  if (seed.length != 12 && seed.length != 0) {
    return {
      result: false,
      reason: "ID must be 12 characters",
    };
  } else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(seed)) {
    return {
      result: false,
      reason: "ID cannot contain special character",
    };
  } else {
    return {
      result: true,
    };
  }
}

function validate_raceId(runData) {
  let raceId = runData.raceId;

  if (raceId.length != 6 && raceId.length != 0) {
    return {
      result: false,
      reason: "ID must be 6 characters",
    };
  } else if (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(raceId)) {
    return {
      result: false,
      reason: "ID cannot contain special character",
    };
  } else if (raceId.length > 0 && runData.race === "No_Race") {
    return {
      result: false,
      reason: 'Cannot enter ID if "Race" is set to "No Race"',
    };
  } else {
    return {
      result: true,
    };
  }
}

function checkNumberRange(value, min, max) {
  if (value.length === 0) {
    return { result: false, reason: "No number submitted." };
  } else if (!checkInt(value)) {
    return { result: false, reason: "Not a valid number." };
  } else if (parseInt(value) < min || parseInt(value) > max) {
    return {
      result: false,
      reason: `Number must be between ${min} and ${max}.`,
    };
  } else {
    return { result: true };
  }
}

function checkInt(value) {
  return /^\+?(0|[1-9]\d*)$/.test(value);
}

function checkTime(value) {
  const date = new Date("1970-01-01 " + value);
  return (
    /^([0-9]):([0-5][0-9]):([0-5][0-9])$/.test(value) &&
    date instanceof Date &&
    !isNaN(date)
  );
}

async function compareToBackendEnum(enumName, submitData) {
  const enumList = await graphql.getEnumValues(enumName);

  let returnResult = {
    result: submitData.every((val) => enumList.includes(val)),
  }; // Verify that the enum value is valid according to graphql

  if (!returnResult.result) {
    returnResult = {
      ...returnResult,
      reason: `Invalid ${enumName} submitted. Please contact administrator.`,
    };
  }
  return returnResult;
}

module.exports = validate;
