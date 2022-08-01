import React, { useReducer, useEffect } from "react";
import { Button, Col, Row, Container } from "reactstrap";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import cover from "../../assets/stats-cover.jpg";
import "./scss/main.scss";

import { Data } from "./Data";
import FilterWrapper from "./FilterWrapper";
import StatsWrapper from "./StatsWrapper";
import StatsCard from "./StatsCard";
import FilterDropdown from "./FilterDropdown";
import StatsLineChart from "./StatsLineChart";
import StatsBarChart from "./StatsBarChart";
import { runsForUser } from "../../graphql/queries";

import {
  faBars,
  faMedal,
  faStopwatch,
  faCalculator,
  faStar,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";

const defaultFlagset = {
  flagsetFilter: { name: "Flagset", value: "All" },
  raceFilter: { name: "Race", value: "All" },
};

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

  useEffect(() => {
    getRunsForUser(props.discordUserdata.userdata.id, setStatsState);
  }, []);

  const data = new Data(statsState.data, statsState.filters);
  let page, body;

  if (statsState.hide_page) {
    page = <div></div>;
  } else {
    if (statsState.has_data) {
      body = (
        <React.Fragment>
          <FilterWrapper title="Filters">
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
          <StatsWrapper>
            <Col lg="6" xl="3">
              <StatsCard
                key="totalRuns"
                title="Total Runs"
                stat={data.attempt()}
                icon={faBars}
                iconColor="bg-primary"
                height="80%"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                key="bestTime"
                title="Best Time"
                stat={data.bestTime()}
                icon={faMedal}
                iconColor="bg-success"
                height="80%"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                key="lastTime"
                title="Last Time"
                stat={data.lastTime()}
                icon={faStopwatch}
                iconColor="bg-secondary"
                height="80%"
              />
            </Col>
            <Col lg="6" xl="3">
              <StatsCard
                key="stdDeviation"
                title="Std Deviation"
                stat={data.standardDeviation()}
                icon={faCalculator}
                iconColor="bg-info"
                height="80%"
              />
            </Col>
          </StatsWrapper>
          <Container fluid>
            <Row>
              <Col
                className="mb-5 mb-xl-0"
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
                className="mb-5 mb-xl-0"
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
                  height="45%"
                  fontSize="2.5em"
                  delta={data.deltaRunTime()}
                  deltaText="since last run"
                />
                <StatsCard
                  key="meanLastFive"
                  title="Average - Last 5"
                  stat={data.averageTime(5)}
                  icon={faStarHalfStroke}
                  iconColor="bg-primary"
                  height="45%"
                  fontSize="2.5em"
                  delta={data.deltaRunTime(5)}
                  deltaText="since last run"
                />
              </Col>
            </Row>
            <Row className="pt-4">
              <Col
                className="mb-5 mb-xl-0"
                lg="6"
                xl="6"
                style={{ height: "500px" }}
              >
                <StatsBarChart
                  heading="Starting Stats"
                  title="Characters"
                  data={data.startingCharacters()}
                  height={500}
                  dy={40}
                  xHeight={75}
                />
              </Col>
            </Row>
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

    page = (
      <Page
        cover={cover}
        bannerTitle="Run Stats"
        bannerSubtitle="Stats pertaining to run times"
      >
        {body}
      </Page>
    );
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

export default Stats;
