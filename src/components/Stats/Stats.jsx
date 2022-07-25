import React, { useReducer, useEffect } from "react";
import { faMedal } from "@fortawesome/free-solid-svg-icons";
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

function runDataStateReducer(state, action) {
  switch (action.type) {
    case "data_retrieved":
      return {
        ...state,
        render_page: true,
        data: action.data,
      };
    case "set_filter":
      const filters = state.filters;
      return {
        ...state,
        filters: {
          ...filters,
          [action.filter.type]: action.filter.value,
        },
      };
    default:
      return state;
  }
}

function Stats(props) {
  const [runDataState, setRunDataState] = useReducer(runDataStateReducer, {
    render_page: false,
    filters: { flagsetFilter: "All", raceFilter: "All" },
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
            setRunDataState={setRunDataState}
          />
          {/* <Dropdown
          title="Race"
          id="raceFilter"
          choices={data.races()}
          setRunDataState={setRunDataState}
        /> */}
        </FilterWrapper>
        <StatsWrapper title="Overview">
          <StatsCard title="Runs" stat={data.attempt()} slim={true} />
          <StatsCard
            title="Best Time"
            stat={data.bestTime()}
            icon={faMedal}
            icon_size="2xl"
            icon_color="rgba(40, 167, 69)"
          />
          <StatsCard title="Last Time" stat={data.lastTime()} />
          <StatsCard
            title="Standard Deviation"
            stat={data.standardDeviation()}
          />
        </StatsWrapper>
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
export default Stats;
