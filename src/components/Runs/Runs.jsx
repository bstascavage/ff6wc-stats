import React, { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";
import { API, graphqlOperation } from "aws-amplify";
import { Data } from "../shared/Data";
import { runsForUser } from "../../graphql/queries";
import Page from "../Page";
import cover from "../../assets/covers/about-cover.jpg";

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

function getTableRows(runs) {
  console.log(runs);

  let renderList = [];

  for (let i = 0; i < runs.length; i++) {
    const D = new Date(runs[i].runDate);

    const flagset = runs[i].flagset.replace(/__/g, " - ").replace(/_/g, " ");
    const race = runs[i].race.replace(/__/g, " - ").replace(/_/g, " ");

    renderList.push(
      <tr key={i}>
        <td>
          <b>{D.getMonth() + 1 + "/" + D.getDay() + "/" + D.getFullYear()}</b>
        </td>
        <td>{flagset}</td>
        <td>{runs[i].runTime}</td>
        <td>{race}</td>
        <td>{runs[i].seed}</td>
        <td className="no-border">
          <Button color="primary" type="submit" className="centered-element">
            View
          </Button>
        </td>
      </tr>,
    );
  }
  console.log(renderList);
  return <tbody>{renderList}</tbody>;
}

function Runs(props) {
  const navigate = useNavigate();
  const [statsState, setStatsState] = useReducer(statsStateReducer, {
    hide_page: true,
    has_data: false,
    filters: defaultFlagset,
    data: [],
  });

  const [userId, setUserId] = useReducer(userIdReducer, {
    id: "",
    copied: false,
  });

  useEffect(() => {
    const userIdFromUrl = getUserFromURL();
    userIdFromUrl
      ? setUserId({ type: "set_id", id: userIdFromUrl })
      : setUserId({ type: "set_id", id: props.discordUserdata.userdata.id });
  }, []);
  useEffect(() => {
    if (userId.id) getRunsForUser(userId.id, setStatsState);
  }, [userId]);

  const data = new Data(statsState.data, statsState.filters);

  let body = (
    <React.Fragment>
      <Container
        fluid
        className="pt-4 pb-5"
        style={{ width: "50em", maxWidth: "100%" }}
      >
        <Card
          className="card-stats card-section mt-4 mb-4 mb-xl-0"
          style={{ height: props.height, width: "100%" }}
        >
          <CardHeader
            tag="h5"
            className="header has-text-align-center has-text-color"
          >
            Runs
          </CardHeader>
          <Row className="pb-4 runs-row">
            <Table hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Flagset</th>
                  <th>Time</th>
                  <th>Race</th>
                  <th>Seed</th>
                  <th style={{ borderStyle: "hidden", width: "85px" }}></th>
                </tr>
              </thead>
              {getTableRows(data.runData)}
            </Table>
          </Row>
        </Card>
      </Container>
    </React.Fragment>
  );

  let page = (
    <Page
      cover={cover}
      bannerTitle="Runs"
      bannerSubtitle="A detailed list of all your Worlds Collide Runs"
      backgroundPositionX="0%"
      backgroundPositionY="70%"
    >
      {body}
    </Page>
  );
  return <React.Fragment>{page}</React.Fragment>;
}

export default Runs;
