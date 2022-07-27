import React, { useReducer, useEffect } from "react";
import { Button } from "reactstrap";
import { API, graphqlOperation } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import Page from "../Page";
import cover from "../../assets/stats-cover.jpg";
import "./scss/main.scss";

import { Data } from "./Data";
import FilterWrapper from "./FilterWrapper";
import StatsWrapper from "./StatsWrapper";
import StatsCard from "./StatsCard";
import Dropdown from "./Dropdown";
import { runsForUser } from "../../graphql/queries";
// import { Button } from "@aws-amplify/ui-react";

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

  const config = props.config.stats;
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

  if (statsState.has_data) {
    body = (
      <React.Fragment>
        <FilterWrapper title="Filters">
          <Dropdown
            title="Flagset"
            id="flagsetFilter"
            choices={data.flagsets()}
            resetOthers={true}
            statsState={statsState}
            setStatsState={setStatsState}
          />
          <Dropdown
            title="Race"
            id="raceFilter"
            choices={data.races()}
            statsState={statsState}
            setStatsState={setStatsState}
          />
        </FilterWrapper>
        <StatsWrapper>{createStatCards(config, data)}</StatsWrapper>
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

  page = statsState.hide_page ? <div></div> : page;
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

function createStatCards(config, data) {
  let renderList = [];

  Object.keys(config.statsCards).forEach((key, index) => {
    renderList.push(
      <StatsCard
        key={key}
        title={config.statsCards[key].title}
        stat={data[config.statsCards[key].statFunction]()}
        icon={config.statsCards[key].icon}
        iconColor={config.statsCards[key].iconColor}
      />
    );
  });

  return renderList;
}

export default Stats;
