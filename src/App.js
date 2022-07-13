import React from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, About, Stats, Submit } from "./components";
import { useState, useEffect } from "react";
import { createUserdata, updateUserdata } from "./graphql/mutations";

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

function App() {
  const [discordUserdata, setDiscordUserdata] = useState({
    hide_render: true,
    user_data: {},
  });
  const [validateBackendUserdata, setBackendUserdata] = useState([]);
  const [upsertBackendUserdata, setUpsertBackendUserdata] = useState(false);
  var render_obj;

  parseDiscordCallback();

  useEffect(() => {
    // If has stored discord token, retrieve info.  Else, show login button
    if (localStorage.getItem("discord_access_token")) {
      setDiscordUserdata({ ...discordUserdata, hide_render: true });
      getUserInfoFromDiscord(setDiscordUserdata);
    } else {
      setDiscordUserdata({ ...discordUserdata, hide_render: false });
    }
  }, []);
  useEffect(() => {
    // Lookup user data in backend after retrieving discord data
    if (Object.keys(discordUserdata.user_data).length !== 0) {
      validateUserDiscordId(discordUserdata, setBackendUserdata);
    }
  }, [discordUserdata]);
  useEffect(() => {
    // Once user is looked up in backend, create/update the user
    if (Object.keys(discordUserdata.user_data).length !== 0) {
      storeUserInfo(
        discordUserdata,
        validateBackendUserdata,
        upsertBackendUserdata,
        setUpsertBackendUserdata
      );
    }
  }, [discordUserdata, validateBackendUserdata]);

  if (discordUserdata.hide_render === false) {
    render_obj = (
      <Router>
        <Navigation
          discordUserdata={discordUserdata}
          setDiscordUserdata={setDiscordUserdata}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
        <Footer discordUserdata={discordUserdata} />
      </Router>
    );
  } else {
    render_obj = <div></div>;
  }

  return render_obj;
}

function storeUserInfo(
  discordUserdata,
  validateBackendUserdata,
  upsertBackendUserdata,
  setUpsertBackendUserdata
) {
  if (
    discordUserdata.user_data &&
    validateBackendUserdata.data &&
    !upsertBackendUserdata
  ) {
    try {
      var now = new Date();
      const data = {
        discordUserId: discordUserdata.user_data.id,
        discordUserName: discordUserdata.user_data.username,
        discordDiscriminator: discordUserdata.user_data.discriminator,
        discordAvatarUrl: `https://cdn.discordapp.com/avatars/${discordUserdata.user_data.id}/${discordUserdata.user_data.avatar}.png`,
        lastLogin: now.toISOString(),
      };

      if (validateBackendUserdata.data.getUserdata === null) {
        // If user isn't found in backend, create it
        API.graphql(
          graphqlOperation(createUserdata, {
            input: data,
          })
        ).then(setUpsertBackendUserdata(true));
      } else if (
        validateBackendUserdata.data.getUserdata.discordUserId ===
        discordUserdata.user_data.id
      ) {
        API.graphql(
          graphqlOperation(updateUserdata, {
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
  if (discordUserdata.user_data.id) {
    try {
      API.graphql(
        graphqlOperation(getUserDiscordId, {
          discordUserId: discordUserdata.user_data.id,
        })
      )
        .then((responseJson) => setBackendUserdata(responseJson))
        .catch(console.error);
    } catch (err) {
      console.log("error validating user in backend", err);
    }
  }
}

function getUserInfoFromDiscord(setDiscordUserdata) {
  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${localStorage.getItem(
        "discord_token_type"
      )} ${localStorage.getItem("discord_access_token")} `,
    },
  })
    .then((result) => result.json())
    .then((responseJson) => {
      setDiscordUserdata({ hide_render: false, user_data: responseJson });
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
