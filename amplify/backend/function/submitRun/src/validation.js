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
          // eslint-disable-next-line no-eval
          [`validate_${key}`]: await eval("validate_" + key)(data),
        },
      };
    }
  }

  validationResults = {
    ...validationResults,
    validationStatus: Object.values(validationResults.validationDetails).every(
      (item) => item.result,
    ),
  };

  return validationResults;
}

// eslint-disable-next-line no-unused-vars
function validate_numOfChecks(runData) {
  return runData.numOfChecks <
    parseInt(runData.numOfChars) -
      runData.chars.length +
      parseInt(runData.numOfEspers) +
      parseInt(runData.dragons.length)
    ? {
        result: false,
        reason:
          "Total checks completed cannot be lower than characters+espers+dragons.",
      }
    : checkNumberRange(runData.numOfChecks, 0, 61);
}

// eslint-disable-next-line no-unused-vars
function validate_numOfPeekedChecks(runData) {
  return checkNumberRange(runData.numOfPeekedChecks, 0, 61);
}

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
function validate_runDate(runData) {
  return !isNaN(new Date(runData.runDate).getDate())
    ? { result: true }
    : { result: false, reason: "Run Date is not a valid date." };
}

// eslint-disable-next-line no-unused-vars
function validate_ktStartTime(runData) {
  // Validates that the submitted time is in the format hh:mm:ss
  if (runData.ktStartTime.length === 0) {
    return runData.kefkaTime.length === 0
      ? { result: true }
      : {
          result: false,
          reason: 'Cannot be blank if "Kefka Start Time" is entered.',
        };
  } else if (checkTime(runData.ktStartTime)) {
    let runTimeDate = new Date("1970-01-01 " + runData.runTime);
    let ktStartTimeDate = new Date("1970-01-01 " + runData.ktStartTime);

    return ktStartTimeDate.getTime() > runTimeDate.getTime()
      ? {
          result: false,
          reason: 'Time cannot be higher than the "Total Time"',
        }
      : { result: true };
  } else {
    return { result: false, reason: "Time not in proper hh:mm:ss format." };
  }
}

// eslint-disable-next-line no-unused-vars
function validate_kefkaTime(runData) {
  // Validates that the submitted time is in the format hh:mm:ss
  if (runData.kefkaTime.length === 0) {
    return runData.ktStartTime.length === 0
      ? { result: true }
      : {
          result: false,
          reason: 'Cannot be blank if "KT Start Time" is entered.',
        };
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
// eslint-disable-next-line no-unused-vars
function validate_numOfChests(runData) {
  return {
    result: true,
  };
}

// eslint-disable-next-line no-unused-vars
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
              if (
                runData.numOfBosses >=
                config.flagsetRules[runData.flagset].skip.reqs.bosses
              )
                skipChecks.push(true);
              break;
            case "espers":
              if (
                runData.numOfEspers >=
                config.flagsetRules[runData.flagset].skip.reqs.espers
              )
                skipChecks.push(true);
              break;
            case "chars":
              if (
                runData.numOfChars >=
                config.flagsetRules[runData.flagset].skip.reqs.chars
              )
                skipChecks.push(true);
              break;
            case "checks":
              if (
                runData.numOfChecks >=
                config.flagsetRules[runData.flagset].skip.reqs.checks
              )
                skipChecks.push(true);
              break;
            default:
              skipChecks.push(false);
              break;
          }
        },
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

// eslint-disable-next-line no-unused-vars
async function validate_chars(runData) {
  // Validates that 1-4 characters were submitted and that all characters are valid
  let characters = runData.chars;
  const requiredChars = config.flagsetRules[runData.flagset].requiredChars
    ? config.flagsetRules[runData.flagset].requiredChars
    : [];

  if (characters.length === 0) {
    return { result: false, reason: "No starting characters selected." };
  } else if (characters.length > 4) {
    return {
      result: false,
      reason: "More than 4 starting characters selected.",
    };
  } else if (config.flagsetRules[runData.flagset].startingChars === 0) {
    return {
      result: true,
    };
  } else if (
    characters.length !== config.flagsetRules[runData.flagset].startingChars
  ) {
    return {
      result: false,
      reason: `Must select ${
        config.flagsetRules[runData.flagset].startingChars
      } characters, per your flagset settings.`,
    };
  } else if (!requiredChars.every((char) => characters.includes(char))) {
    // Check to see if all of the `requiredChars` are included, if `requiredChars` is set.
    const reason =
      requiredChars.length === 1
        ? `Missing required character: ${requiredChars}`
        : `Missing required one of the required characters for the flagset: ${requiredChars}`;
    return {
      result: false,
      reason: reason,
    };
  } else {
    return compareToBackendEnum("Character", characters);
  }
}

// eslint-disable-next-line no-unused-vars
async function validate_dragons(runData) {
  let dragons = runData.dragons;

  return dragons.length > 8
    ? {
        result: false,
        reason: "More than 8 dragons submitted.  Contact administrator.",
      }
    : compareToBackendEnum("Dragon", dragons);
}

// eslint-disable-next-line no-unused-vars
async function validate_abilities(runData) {
  let abilities = runData.abilities;
  let numOfAbilities = runData.chars.length;

  // If the flagset has `permitAbilityCheckOverride1 enabled,
  // Check to see the value of `disableAbilitCheck`
  if (runData.disableAbilityCheck === true) {
    return config.flagsetRules[runData.flagset].permitAbilityCheckOverride ===
      true
      ? {
          result: true,
        }
      : {
          result: false,
          reason: "Flagset not elgible to disable ability verification.",
        };
  }

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
          abilities[i],
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

// eslint-disable-next-line no-unused-vars
async function validate_disableAbilityCheck(runData) {
  return typeof runData.disableAbilityCheck == "boolean"
    ? {
        result: true,
      }
    : {
        result: false,
        reason: "Value must be true or false.  Please contact administrator.",
      };
}

// eslint-disable-next-line no-unused-vars
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
    finalBattleTraits.length !== 1
  ) {
    return {
      result: false,
      reason: 'Cannot select other options with "Did not record".',
    };
  } else {
    return compareToBackendEnum("FinalBattleTrait", finalBattleTraits);
  }
}

// eslint-disable-next-line no-unused-vars
async function validate_thiefPeek(runData) {
  return compareToBackendEnum("ThiefPeek", [runData.thiefPeek]);
}

// eslint-disable-next-line no-unused-vars
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
  if (peek === "Did_not_check") {
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
    if (peek !== "Not_recorded") {
      return {
        result: false,
        reason: "Must select thief reward.",
      };
    }
  }
  return compareToBackendEnum("ThiefReward", [reward]);
}

// eslint-disable-next-line no-unused-vars
function validate_auction(runData) {
  return compareToBackendEnum("Auction", [runData.auction]);
}

// eslint-disable-next-line no-unused-vars
function validate_coliseum(runData) {
  return compareToBackendEnum("Coliseum", [runData.coliseum]);
}

// eslint-disable-next-line no-unused-vars
function validate_superBalls(runData) {
  return compareToBackendEnum("Superballs", [runData.superBalls]);
}

// eslint-disable-next-line no-unused-vars
function validate_egg(runData) {
  return compareToBackendEnum("Egg", [runData.egg]);
}

// eslint-disable-next-line no-unused-vars
async function validate_flagset(runData) {
  return compareToBackendEnum("Flagset", [runData.flagset]);
}

// eslint-disable-next-line no-unused-vars
async function validate_race(runData) {
  return compareToBackendEnum("Race", [runData.race]);
}

// eslint-disable-next-line no-unused-vars
async function validate_mood(runData) {
  return compareToBackendEnum("Mood", [runData.mood]);
}

// eslint-disable-next-line no-unused-vars
function validate_otherFlagset(runData) {
  if (runData.otherFlagset.length !== 0 && runData.flagset !== "Other") {
    return {
      result: false,
      reason: 'Cannot set name unless "Other" is selected for "Flagset".',
    };
  } else if (runData.otherFlagset.length === 0 && runData.flagset === "Other") {
    return {
      result: false,
      reason: 'Must provide a flagset name is "Other" is selected.',
    };
  } else if (typeof runData.otherFlagset !== "string") {
    return {
      result: false,
      reason: "Flagset name is not a valid string.",
    };
  } else {
    return { result: true };
  }
}

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
function validate_numOfBosses(runData) {
  return checkNumberRange(runData.numOfBosses, 1, 40);
}

// eslint-disable-next-line no-unused-vars
function validate_highestLevel(runData) {
  return checkNumberRange(runData.highestLevel, 0, 99);
}

// eslint-disable-next-line no-unused-vars
function validate_seed(runData) {
  let seed = runData.seed;

  if (seed.length !== 12 && seed.length !== 0) {
    return {
      result: false,
      reason: "ID must be 12 characters",
    };
  } else if (/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(seed)) {
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

// eslint-disable-next-line no-unused-vars
function validate_raceId(runData) {
  let raceId = runData.raceId;

  if (raceId.length !== 6 && raceId.length !== 0) {
    return {
      result: false,
      reason: "ID must be 6 characters",
    };
  } else if (/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/g.test(raceId)) {
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

// eslint-disable-next-line no-unused-vars
async function validate_statsCompanionUpload(runData) {
  // Validates that statsCompanionUpload is a boolean
  return typeof runData.statsCompanionUpload == "boolean"
    ? {
        result: true,
      }
    : {
        result: false,
        reason:
          "Value must be true or false.  Users should never see this message. Please contact administrator.",
      };
}

// eslint-disable-next-line no-unused-vars
async function validate_statsCompanionRaw(runData) {
  // If no StatsCompanion file is uploaded, skip this check
  if (!runData.statsCompanionUpload) {
    return { result: true };
  }

  // Validates that statsCompanionRaw is a valid JSON
  try {
    var parsedJSON = JSON.parse(JSON.stringify(runData.statsCompanionRaw));

    // Handle non-exception-throwing cases:
    // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
    // but... JSON.parse(null) returns null, and typeof null === "object",
    // so we must check for that, too. Thankfully, null is falsey, so this suffices:
    if (parsedJSON && typeof parsedJSON === "object") {
      return { result: true };
    } else {
      return {
        result: false,
        reason: "StatsCompanion file is not a valid JSON.",
      };
    }
  } catch (e) {
    console.error(e);
    return {
      result: false,
      reason: e,
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
    /^([0-9]?[0-9]):([0-5][0-9]):([0-5][0-9])$/.test(value) &&
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
