import React, { useReducer, useEffect, useState } from "react";
import { Button, Card, CardHeader, Col, Row, Container } from "reactstrap";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import "./scss/main.scss";

import { Data } from "./Data";
import FilterWrapper from "./FilterWrapper";
import StatsCard from "./StatsCard";
import FilterDropdown from "./FilterDropdown";
import StatsLineChart from "./StatsLineChart";
import StatsBarChart from "./StatsBarChart";
import { runsForUser } from "../../graphql/queries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareNodes,
  faBars,
  faMedal,
  faStopwatch,
  faCalculator,
  faStar,
  faStarHalfStroke,
  faPerson,
  faFlagCheckered,
  faBook,
  faGauge,
  faSignal,
  faPercent,
  faPlaneDeparture,
  faPlaneArrival,
} from "@fortawesome/free-solid-svg-icons";

const defaultFlagset = {
  flagsetFilter: { name: "Flagset", value: "All" },
  raceFilter: { name: "Race", value: "All" },
};

function userIdReducer(state, action) {
  switch (action.type) {
    case "set_id":
      return {
        ...state,
        id: action.id,
      };
    case "copied": {
      return {
        ...state,
        copied: true,
      };
    }
    case "reset_copy": {
      return {
        ...state,
        copied: false,
      };
    }
    default:
      return state;
  }
}
function statsStateReducer(state, action) {
  switch (action.type) {
    case "data_retrieved":
      return {
        ...state,
        hide_page: false,
        has_data: action.data.length !== 0,
        data: action.data,
      };
    case "no_data":
      return {
        ...state,
        hide_page: false,
        has_data: false,
      };
    case "set_filter":
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.filter.type]: {
            ...state.filters[action.filter.type],
            name: action.filter.name,
            value: action.filter.value,
          },
        },
      };
    case "reset_filters":
      return {
        ...state,
        filters: defaultFlagset,
      };
    default:
      return state;
  }
}

function Stats(props) {
  const navigate = useNavigate();
  const [statsState, setStatsState] = useReducer(statsStateReducer, {
    hide_page: true,
    has_data: false,
    filters: defaultFlagset,
    data: [],
  });
  const [charList, setCharList] = useState([]);
  const [abilityList, setAbilityList] = useState([]);

  // Logic for displaying another user's stats and for getting the "Share" link.
  // If a user's ID is found in the URL, get data for that user.  Else, get data for the current user.
  const [userId, setUserId] = useReducer(userIdReducer, {
    id: "",
    copied: false,
  });
  const shareURLText = userId.copied
    ? "Copied to Clipboard!"
    : "Share Dashboard";
  useEffect(() => {
    const userIdFromUrl = getUserFromURL();
    userIdFromUrl
      ? setUserId({ type: "set_id", id: userIdFromUrl })
      : setUserId({ type: "set_id", id: props.discordUserdata.userdata.id });
  }, []);

  useEffect(() => {
    if (userId.id) getRunsForUser(userId.id, setStatsState);
    getEnum("Character", setCharList);
    getEnum("Ability", setAbilityList);
  }, [userId]);

  const data = new Data(
    statsState.data,
    statsState.filters,
    charList,
    abilityList,
  );
  let page, body;

  if (statsState.hide_page) {
    page = <div></div>;
  } else {
    if (statsState.has_data) {
      body = (
        <React.Fragment>
          <Container fluid>
            <FilterWrapper title="Filters">
              <Button
                color="secondary"
                className="dropdown-filter share-button"
                onClick={(e) => {
                  copyURLToClipboard(e, userId, setUserId);
                }}
              >
                <FontAwesomeIcon
                  icon={faShareNodes}
                  size="lg"
                  color="bg-white"
                  style={{ marginRight: "15px" }}
                />
                {shareURLText}
              </Button>
              <FilterDropdown
                title="Flagset"
                id="flagsetFilter"
                choices={data.flagsets()}
                resetOthers={true}
                statsState={statsState}
                setStatsState={setStatsState}
              />
              <FilterDropdown
                title="Race"
                id="raceFilter"
                choices={data.races()}
                statsState={statsState}
                setStatsState={setStatsState}
              />
            </FilterWrapper>
            <Card
              className="card-stats card-section mt-4 mb-4 mb-xl-0"
              style={{ height: props.height, width: "100%" }}
            >
              <CardHeader
                tag="h5"
                className="header has-text-align-center has-text-color"
              >
                Time Overview
              </CardHeader>
              <Row className="pt-4 pb-4 stats-row">
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="totalRuns"
                    title="Total Runs"
                    stat={data.attempt()}
                    icon={faBars}
                    iconColor="bg-primary"
                    fontSize="3.5rem"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="bestTime"
                    title="Best Time"
                    stat={data.bestTime()}
                    icon={faMedal}
                    iconColor="bg-success"
                    delta={data.deltaBestTime()}
                    subText="compared to mean"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="lastTime"
                    title="Last Time"
                    stat={data.lastTime()}
                    icon={faStopwatch}
                    iconColor="bg-secondary"
                    delta={data.deltaLastTime()}
                    subText="compared to mean"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="stdDeviation"
                    title="Std Deviation"
                    stat={data.standardDeviation()}
                    icon={faCalculator}
                    iconColor="bg-info"
                  />
                </Col>
              </Row>

              <Row className="stats-row">
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="8"
                  style={{ height: "400px" }}
                >
                  <StatsLineChart
                    heading="Overview"
                    title="Run Times"
                    data={data.runTimes()}
                    height={400}
                  />
                </Col>
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="4"
                  style={{
                    display: "flex",
                    height: "400px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <StatsCard
                    key="meanTime"
                    title="Average Time"
                    stat={data.averageTime()}
                    icon={faStar}
                    iconColor="bg-success"
                    height="47%"
                    fontSize="3rem"
                    delta={data.deltaRunTime()}
                    subText="since last run"
                  />
                  <StatsCard
                    key="meanLastFive"
                    title="Average - Last 5"
                    stat={data.averageTime(5)}
                    icon={faStarHalfStroke}
                    iconColor="bg-primary"
                    height="47%"
                    fontSize="3em"
                    delta={data.deltaRunTime(5)}
                    subText="since last run"
                  />
                </Col>
              </Row>
              <Row className="pt-4 pb-4 stats-row">
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="totalSkips"
                    title="Total Skips"
                    stat={data.skipAttempt()}
                    icon={faSignal}
                    iconColor="bg-primary"
                    fontSize="4rem"
                    height="160px"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="skipPercent"
                    title="Skip Percentage"
                    stat={data.skipPercent()}
                    icon={faPercent}
                    iconColor="bg-secondary"
                    fontSize="3rem"
                    height="160px"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="averageSkip"
                    title="Average Time - Skip"
                    stat={data.averageSkip()}
                    icon={faPlaneDeparture}
                    iconColor="bg-success"
                    delta={data.deltaSkipTime()}
                    subText="compared to mean"
                    height="160px"
                  />
                </Col>
                <Col lg="6" xl="3" className="col-padding">
                  <StatsCard
                    key="averageNoSkip"
                    title="Average Time - No Skip"
                    stat={data.averageSkip(false)}
                    icon={faPlaneArrival}
                    iconColor="bg-danger"
                    delta={data.deltaSkipTime(false)}
                    subText="compared to mean"
                    height="160px"
                  />
                </Col>
              </Row>
            </Card>
            <Card
              className="card-stats card-section mt-4 mb-4 mb-xl-0"
              style={{ height: props.height, width: "100%" }}
            >
              <CardHeader
                tag="h5"
                className="header has-text-align-center has-text-color"
              >
                Party Breakdown
              </CardHeader>
              <Row className="pt-4 stats-row">
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="4"
                  style={{
                    display: "flex",
                    height: "400px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <StatsCard
                    key="mostUsedChar"
                    title="Most Used Starting Character"
                    stat={data.mostUsedCharacter().name}
                    icon={faPerson}
                    iconColor="bg-secondary"
                    height="47%"
                    fontSize="2.5em"
                    subText="Total Runs:"
                    subStat={data.mostUsedCharacter().runs}
                  />
                  <StatsCard
                    key="fastestChar"
                    title="Fastest Starting Character"
                    stat={data.fastestCharacter().name}
                    icon={faFlagCheckered}
                    iconColor="bg-success"
                    height="47%"
                    fontSize="2.5em"
                    subText="Average Time:"
                    subStat={data.fastestCharacter().time}
                  />
                </Col>
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="8"
                  style={{ height: "400px" }}
                >
                  <StatsBarChart
                    heading="Starting Stats"
                    title="Characters"
                    data={data.startingCharacters()}
                    dark={true}
                    height={400}
                    dy={40}
                    xHeight={75}
                  />
                </Col>
              </Row>
              <Row className="pt-4 pb-3 stats-row">
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="8"
                  style={{ height: "400px" }}
                >
                  <StatsBarChart
                    heading="Starting Stats"
                    title="Abilities"
                    data={data.startingAbilities()}
                    dark={true}
                    height={400}
                    dy={40}
                    xHeight={75}
                  />
                </Col>
                <Col
                  className="mb-5 mb-xl-0 col-padding"
                  lg="6"
                  xl="4"
                  style={{
                    display: "flex",
                    height: "400px",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <StatsCard
                    key="mostUsedAbility"
                    title="Most Used Starting Ability"
                    stat={data.mostUsedAbility().name}
                    icon={faBook}
                    iconColor="bg-secondary"
                    height="47%"
                    fontSize="2.5em"
                    subText="Total Runs:"
                    subStat={data.mostUsedAbility().runs}
                  />
                  <StatsCard
                    key="fastestAbility"
                    title="Fastest Starting Ability"
                    stat={data.fastestAbility().name}
                    icon={faGauge}
                    iconColor="bg-success"
                    height="47%"
                    fontSize="2.5em"
                    subText="Average Time:"
                    subStat={data.fastestAbility().time}
                  />
                </Col>
              </Row>
            </Card>
          </Container>
        </React.Fragment>
      );
    } else {
      body = (
        <React.Fragment>
          <div className="stats-error-container">
            <div className="stats-error-title">No data found!</div>
          </div>
          <div className="stats-error-container">
            <strong className="new-line">{`\nPerhaps you haven't submitted any data yet? Lets fix that!\n\n`}</strong>
          </div>
          <div className="submit-container" id="submit-container">
            <Button color="primary" onClick={(event) => navigate("/submit")}>
              Submit a Run
            </Button>
          </div>
        </React.Fragment>
      );
    }

    page = <Page>{body}</Page>;
  }

  return <React.Fragment>{page}</React.Fragment>;
}

function getRunsForUser(userId, setStatsState) {
  try {
    API.graphql(graphqlOperation(runsForUser, { userId: userId, limit: 1000 }))
      .then((responseJson) => {
        setStatsState({
          type: "data_retrieved",
          data: responseJson.data.runsForUser.items,
        });
      })
      .catch(console.error);
  } catch (err) {
    console.log("Error fetching user data: ", err);
  }
}

function getUserFromURL() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));

  const userId = fragment.get("user");
  return userId ? userId : null;
}

function copyURLToClipboard(e, userId, setUserId) {
  navigator.clipboard.writeText(
    window.location.href
      .replace(window.location.hash, "")
      .concat(`#user=${userId.id}`),
  );
  setUserId({ type: "copied" });
  setTimeout(() => {
    setUserId({ type: "reset_copy" });
  }, 3000);
}

function getEnum(enumName, setEnum) {
  let query = `query {
    __type(name: "${enumName}") {
      name
      enumValues {
        name
        description
      }
    }
  }
  `;

  try {
    API.graphql(graphqlOperation(query)).then((responseJson) => {
      let charList = [];
      for (let i = 0; i < responseJson.data.__type.enumValues.length; i++) {
        charList.push(responseJson.data.__type.enumValues[i].name);
      }
      setEnum(charList);
    });
  } catch (err) {
    console.log("error fetching enum list from backend for query: ", query);
  }
}

export default Stats;
