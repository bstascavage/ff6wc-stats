import React, { useState, useReducer, useEffect } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  About,
  Stats,
  Submit,
  Error,
} from "./components";
import { createUser, updateUser } from "./graphql/mutations";

import awsExports from "./aws-exports";
import { getUserDiscordId } from "./graphql/user-data-queries";
import CONFIG from "./config";

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
  // Sets the userdata based on the discord login state
  switch (action.type) {
    case "send_discord_request":
      return { ...state, hide_page: true };
    case "retrieved_discord_data":
      return { ...state, hide_page: false, userdata: action.userdata };
    case "not_logged_in":
      return { ...state, hide_page: false, userdata: {} };
    case "error_login_discord":
      return {
        ...state,
        hide_page: true,
        discord_login_error: true,
        userdata: "",
      };
    case "submitted_data":
      return {
        ...state,
        background_blur: true,
      };
    case "processed_data":
      return {
        ...state,
        background_blur: false,
      };
    default:
      return state;
  }
}

function App() {
  const [discordUserdata, setUserdataState] = useReducer(userdataReducer, {
    hide_page: true,
    discord_login_error: false,
    background_blur: false,
    userdata: {},
  });
  const [validateBackendUserdata, setBackendUserdata] = useState([]);
  const [upsertBackendUserdata, setUpsertBackendUserdata] = useState(false);

  useEffect(() => {
    // Call once on page load.  First check to see if its a discord callback; if so, set oauth token
    // Then check if token exists.  If so, authenticate with Discord.  Else, set state to "not_logged_in"
    parseDiscordCallback();

    if (localStorage.getItem("discord_access_token")) {
      setUserdataState({ type: "send_discord_request" });
      getUserInfoFromDiscord(
        setUserdataState,
        localStorage.getItem("discord_access_token")
      );
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
    // Once user is looked up in backend, create/update the user in the database
    if (Object.keys(discordUserdata.userdata).length !== 0) {
      storeUserInfo(
        discordUserdata,
        validateBackendUserdata,
        upsertBackendUserdata,
        setUpsertBackendUserdata
      );
    }
  }, [discordUserdata, validateBackendUserdata]);

  let page;
  if (discordUserdata.discord_login_error) {
    page = (
      // Render and redirect to error page if Discord login has issues
      <Router>
        <Navigation
          discordUserdata={discordUserdata}
          setUserdataState={setUserdataState}
        />

        <Routes>
          <Route path="/error" element={<Error />} />
          <Route path="*" element={<Navigate replace to="/error" />} />
        </Routes>
        <Footer discordUserdata={discordUserdata} />
      </Router>
    );
  } else {
    page = (
      <Router>
        <Navigation
          discordUserdata={discordUserdata}
          setUserdataState={setUserdataState}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/stats"
            element={
              <Stats discordUserdata={discordUserdata} config={CONFIG} />
            }
          />
          <Route
            path="/submit"
            element={
              <Submit
                discordUserdata={discordUserdata}
                setUserdataState={setUserdataState}
                config={CONFIG}
              />
            }
          />
        </Routes>
        <Footer
          discordUserdata={discordUserdata}
          setUserdataState={setUserdataState}
        />
      </Router>
    );
  }

  page = discordUserdata.hide_page ? <div></div> : page;
  return <React.Fragment>{page}</React.Fragment>;
}

function storeUserInfo(
  discordUserdata,
  validateBackendUserdata,
  upsertBackendUserdata,
  setUpsertBackendUserdata
) {
  // Creates the user in the database if they exists, else updates the user.
  // TODO: Clean this up to possibly eliminate the backendUserdata state hook
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
  // Checks whether the user is in the database
  // TODO: Combine with storeUserInfo?
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

function getUserInfoFromDiscord(setUserdataState, accessToken) {
  // Validates the user with Discord.  If successful, updates the state and
  // adds the user's Discord data to discordUserdata.userdata.
  fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: `${localStorage.getItem(
        "discord_token_type"
      )} ${accessToken} `,
    },
  })
    .then((result) => {
      if (!result.ok) {
        setUserdataState({
          type: "error_login_discord",
        });
        throw new Error(result.status);
      } else {
        return result.json();
      }
    })
    .then((responseJson) => {
      setUserdataState({
        type: "retrieved_discord_data",
        userdata: responseJson,
      });
    })
    .catch((error) => {
      console.log("error: ", error);
    });
}

function parseDiscordCallback() {
  // If redirected from Discord, extract and save the token
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
