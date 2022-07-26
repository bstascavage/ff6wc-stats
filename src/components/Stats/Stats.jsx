import React, { useReducer, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import Page from "../Page";
import cover from "../../assets/stats-cover.jpg";
import "./scss/main.scss";

import { Data } from "./Data";
import FilterWrapper from "./FilterWrapper";
import StatsWrapper from "./StatsWrapper";
import StatsCard from "./StatsCard";
import Dropdown from "./Dropdown";
import { runsForUser } from "../../graphql/queries";

const defaultFlagset = {
  flagsetFilter: { name: "Flagset", value: "All" },
  raceFilter: { name: "Race", value: "All" },
};

function runDataStateReducer(state, action) {
  switch (action.type) {
    case "data_retrieved":
      return {
        ...state,
        render_page: true,
        data: action.data,
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
  const config = props.config.stats;
  const [runDataState, setRunDataState] = useReducer(runDataStateReducer, {
    render_page: false,
    filters: defaultFlagset,
    data: [],
  });

  useEffect(() => {
    getRunsForUser(props.discordUserdata.userdata.id, setRunDataState);
  }, []);

  const data = new Data(runDataState.data, runDataState.filters);
  let page;

  if (!runDataState.render_page) {
    page = <div></div>;
  } else if (runDataState.render_page) {
    page = (
      <Page
        cover={cover}
        bannerTitle="Run Stats"
        bannerSubtitle="Stats pertaining to run times"
      >
        <FilterWrapper title="Filters">
          <Dropdown
            title="Flagset"
            id="flagsetFilter"
            choices={data.flagsets()}
            resetOthers={true}
            runDataState={runDataState}
            setRunDataState={setRunDataState}
          />
          <Dropdown
            title="Race"
            id="raceFilter"
            choices={data.races()}
            runDataState={runDataState}
            setRunDataState={setRunDataState}
          />
        </FilterWrapper>
        <StatsWrapper>{createStatCards(config, data)}</StatsWrapper>
      </Page>
    );
  }
  return <React.Fragment>{page}</React.Fragment>;
}

function getRunsForUser(userId, setRunDataState) {
  try {
    API.graphql(graphqlOperation(runsForUser, { userId: userId, limit: 1000 }))
      .then((responseJson) =>
        setRunDataState({
          type: "data_retrieved",
          data: responseJson.data.runsForUser.items,
        })
      )
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
