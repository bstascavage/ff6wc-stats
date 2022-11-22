/* Amplify Params - DO NOT EDIT
  API_FF6WCSTATS_GRAPHQLAPIENDPOINTOUTPUT
  API_FF6WCSTATS_GRAPHQLAPIIDOUTPUT
  API_FF6WCSTATS_GRAPHQLAPIKEYOUTPUT
  ENV
  REGION
Amplify Params - DO NOT EDIT */

// While lambda supports ES6, Amplify's local mock does not.  Therefore we are forced to use `require` and commonjs if we want to run locally
// Would love to use the aws-amplify library but it takes too long to load.  Therefore we'll make due with fetch
const validate = require("./validation.js");
const graphql = require("./graphql.js");

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let validationResults = {
    validation: await validate(event.arguments),
  };

  // If data is validated, submit the run
  if (validationResults.validation.validationStatus) {
    const createStatus = await createRun(event.arguments);
    validationResults = { ...validationResults, creation: createStatus };
  } else {
    console.log(
      "Run submission data validation failed.  Validation results: ",
      validationResults.validation.validationDetails
    );
    validationResults = {
      ...validationResults,
      creation: {
        createStatus: false,
        createError: "Data validation failed, did not publish run",
        createBackendError: null,
      },
    };
  }

  return JSON.stringify(validationResults);
};

async function createRun(run) {
  let attemptNum = await getAttempt(run);
  if (attemptNum === false)
    return {
      createStatus: false,
      createError:
        "Error retrieving last attempt number.  Please contact the administrator",
      createBackendError: null,
    };

  Object.keys(run).forEach((key, index) => {
    // If element isn't provided, set it to null before writing to DB
    if (run[key].length === 0 && !Array.isArray(run[key])) {
      run[key] = null;
    }
  });

  const variables = {
    input: {
      userId: run.userId,
      runDate: new Date(run.runDate).toString(), // Yes this is weird, converting a string to a date and then back to a string, but this is a relic of how runDate was originally set.
      attempt: attemptNum,
      runTime: run.runTime,
      runTimeRaw: new Date("1970-01-01 " + run.runTime).getTime(),
      ktStartTime: run.ktStartTime,
      ktStartTimeRaw: new Date("1970-01-01 " + run.ktStartTime).getTime(),
      kefkaTime: run.kefkaTime,
      kefkaTimeRaw: new Date("1970-01-01 " + run.kefkaTime).getTime(),
      flagset: run.flagset,
      otherFlagset: run.otherFlagset,
      chars: run.chars,
      abilities: run.abilities,
      numOfChars: parseInt(run.numOfChars),
      numOfEspers: parseInt(run.numOfEspers),
      numOfChecks: parseInt(run.numOfChecks),
      numOfPeekedChecks: parseInt(run.numOfPeekedChecks),
      numOfBosses: parseInt(run.numOfBosses),
      numOfDeadchecks:
        parseInt(run.numOfChecks) -
        (parseInt(run.numOfChars) -
          run.chars.length +
          parseInt(run.numOfEspers) +
          run.dragons.length),
      skip: run.skip,
      dragons: run.dragons,
      finalBattle: run.finalBattle,
      highestLevel: parseInt(run.highestLevel),
      superBalls: run.superBalls,
      egg: run.egg,
      coliseum: run.coliseum,
      auction: run.auction,
      thiefPeek: run.thiefPeek,
      thiefReward: run.thiefReward,
      race: run.race,
      raceId: run.raceId,
      mood: run.mood,
      seed: run.seed,
    },
  };
  const query = /* GraphQL */ `
    mutation CREATE_RUN($input: CreateRunInput!) {
      createRun(input: $input) {
        id
      }
    }
  `;

  let submitResults = await graphql.queryGraphql(
    JSON.stringify({ query, variables })
  );

  if (submitResults.errors) {
    console.log("Issue submitting run to graphql");
    console.log(queryResults.error);
    return {
      createStatus: false,
      createError: "Error saving run data.  Please contact the administrator",
      createBackendError: submitResults.errors,
    };
  } else {
    console.log(
      `Successfully created new run. id: ${submitResults.data.createRun.id}`
    );
    return { createStatus: true };
  }
}

async function getAttempt(run) {
  const query = /* GraphQL */ `
    query RUNS_BY_ATTEMPT {
      RunsByAttempt(limit: 1, userId: "${run.userId}", sortDirection: DESC) {
        items {
          runTime
          attempt
        }
      }
    }
  `;

  let queryResults = await graphql.queryGraphql(JSON.stringify({ query }));

  if (queryResults.errors) {
    console.log(`Issue retrieving last run attemp`);
    console.log(queryResults.error);
    return false;
  } else {
    let attemptNum;
    if (queryResults.data.RunsByAttempt.items.length === 0) {
      attemptNum = 1;
    } else {
      attemptNum = queryResults.data.RunsByAttempt.items[0].attempt + 1;
    }
    return attemptNum;
  }
}
