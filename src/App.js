import React, { useState, useReducer, useEffect } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, About, Stats, Submit } from "./components";
import { createUser, updateUser } from "./graphql/mutations";

import awsExports from "./aws-exports";
import { getUserDiscordId } from "./graphql/user-data-queries";

// Amplify auto-generates aws-exports but sets it to the host IP and not localhost if you use mock
// This breaks in docker because docker networking is crazy.
// This logic allows us to toggle it
if (process.env.REACT_APP_LOCAL_BACKEND) {
  var localAwsExports = {
    ...awsExports,
    aws_appsync_graphqlEndpoint: "http://localhost:20002/graphql",
  };
  Amplify.configure(localAwsExports);
} else {
  Amplify.configure(awsExports);
}

function userdataReducer(state, action) {
  switch (action.type) {
    case "send_discord_request":
      return { ...state, hide_render: true };
    case "retrieved_discord_data":
      return { ...state, hide_render: false, userdata: action.userdata };
    case "not_logged_in":
      return { hide_render: false, userdata: {} };
    default:
      return state;
  }
}

function App() {
  const [discordUserdata, setUserdataState] = useReducer(userdataReducer, {
    hide_render: true,
    userdata: {},
  });
  const [validateBackendUserdata, setBackendUserdata] = useState([]);
  const [upsertBackendUserdata, setUpsertBackendUserdata] = useState(false);

  parseDiscordCallback();

  useEffect(() => {
    // If has stored discord token, retrieve info.  Else, show login button
    if (localStorage.getItem("discord_access_token")) {
      setUserdataState({ type: "send_discord_request" });
      getUserInfoFromDiscord(setUserdataState);
    } else {
      setUserdataState({ type: "not_logged_in" });
    }
  }, []);
  useEffect(() => {
    // Lookup user data in backend after retrieving discord data
    if (Object.keys(discordUserdata.userdata).length !== 0) {
      validateUserDiscordId(discordUserdata, setBackendUserdata);
    }
  }, [discordUserdata]);
  useEffect(() => {
    // Once user is looked up in backend, create/update the user
    if (Object.keys(discordUserdata.userdata).length !== 0) {
      storeUserInfo(
        discordUserdata,
        validateBackendUserdata,
        upsertBackendUserdata,
        setUpsertBackendUserdata
      );
    }
  }, [discordUserdata, validateBackendUserdata]);

  return (
    <React.Fragment>
      {discordUserdata.hide_render && <div></div>}
      {!discordUserdata.hide_render && (
        <Router>
          <Navigation
            discordUserdata={discordUserdata}
            setUserdataState={setUserdataState}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/submit" element={<Submit />} />
          </Routes>
          <Footer discordUserdata={discordUserdata} />
        </Router>
      )}
    </React.Fragment>
  );
}

function storeUserInfo(
  discordUserdata,
  validateBackendUserdata,
  upsertBackendUserdata,
  setUpsertBackendUserdata
) {
  if (
    discordUserdata.userdata &&
    validateBackendUserdata.data &&
    !upsertBackendUserdata
  ) {
    try {
      var now = new Date();
      const data = {
        discordUserId: discordUserdata.userdata.id,
        discordUserName: discordUserdata.userdata.username,
        discordDiscriminator: discordUserdata.userdata.discriminator,
        discordAvatarUrl: `https://cdn.discordapp.com/avatars/${discordUserdata.userdata.id}/${discordUserdata.userdata.avatar}.png`,
        lastLogin: now.toISOString(),
      };

      if (validateBackendUserdata.data.getUser === null) {
        // If user isn't found in backend, create it
        API.graphql(
          graphqlOperation(createUser, {
            input: data,
          })
        ).then(setUpsertBackendUserdata(true));
      } else if (
        validateBackendUserdata.data.getUser.discordUserId ===
        discordUserdata.userdata.id
      ) {
        API.graphql(
          graphqlOperation(updateUser, {
            input: data,
          })
        ).then(setUpsertBackendUserdata(true));
      } else {
        console.error("Discord id somehow does not match store id");
      }
    } catch (err) {
      console.log("error creating/updating user data in the backend:", err);
    }
  }
}

function validateUserDiscordId(discordUserdata, setBackendUserdata) {
  if (discordUserdata.userdata.id) {
    try {
      API.graphql(
        graphqlOperation(getUserDiscordId, {
          discordUserId: discordUserdata.userdata.id,
        })
      )
        .then((responseJson) => setBackendUserdata(responseJson))
        .catch(console.error);
    } catch (err) {
      console.log("error validating user in backend", err);
    }
  }
}

function getUserInfoFromDiscord(setUserdataState) {
  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${localStorage.getItem(
        "discord_token_type"
      )} ${localStorage.getItem("discord_access_token")} `,
    },
  })
    .then((result) => result.json())
    .then((responseJson) => {
      setUserdataState({
        type: "retrieved_discord_data",
        userdata: responseJson,
      });
    })
    .catch(console.error);
}

function parseDiscordCallback() {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType, state] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
    fragment.get("state"),
  ];

  if (accessToken) {
    localStorage.setItem("discord_access_token", accessToken);
    localStorage.setItem("discord_token_type", tokenType);
    localStorage.setItem("discord_token_state", state);
    window.history.replaceState(null, null, `${window.location.origin}`);
  }
}

export default App;
