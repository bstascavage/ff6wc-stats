const { HttpRequest } = require("@aws-sdk/protocol-http");
const fetch = require("node-fetch");

const { Request } = fetch;
const GRAPHQL_ENDPOINT = process.env.API_FF6WCSTATS_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_FF6WCSTATS_GRAPHQLAPIKEYOUTPUT;

async function getEnumValues(enumName) {
  const query = /* GraphQL */ `
      query LIST_CHARACTERS {
        __type(name: "${enumName}") {
          name
          enumValues {
            name
          }
        }
      }
    `;
  let queryResults = await queryGraphql(JSON.stringify({ query }));

  if (queryResults.errors) {
    console.log(`Issue retrieving enum ${enumName} from graphql`, enumName);
    console.log(queryResults.errors);
    return [];
  } else {
    let elems = [];
    for (let i = 0; i < queryResults.data.__type.enumValues.length; i++) {
      elems.push(queryResults.data.__type.enumValues[i].name);
    }
    return elems;
  }
}

async function queryGraphql(query) {
  const endpoint = new URL(GRAPHQL_ENDPOINT);

  const requestToBeSigned = new HttpRequest({
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: endpoint.host,
      "x-api-key": GRAPHQL_API_KEY,
    },
    hostname: endpoint.host,
    body: query,
    path: endpoint.pathname,
  });

  const request = new Request(endpoint, requestToBeSigned);

  let body;
  let response;

  try {
    response = await fetch(request);
    body = await response.json();

    return body.errors ? body.errors : body;
  } catch (error) {
    return {
      errors: [
        {
          message: error.message,
        },
      ],
    };
  }
}

module.exports = { getEnumValues, queryGraphql };
