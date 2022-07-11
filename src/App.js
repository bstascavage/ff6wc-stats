import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation, Footer, Home, About, Stats } from "./components";
import { useState, useEffect } from "react";

function App() {
  const [userdata, setUserData] = useState({ user_auth: "", user_data: "" });
  parseDiscordCallback(userdata, setUserData);
  // TODO: This is the state I want:
  // 1. If no user_auth, just load the page, no call to Discord.  Faster this way
  // 2. If userauth, do not load the page in till call to Discord is complete
  // 3. If userauth, load correct nav banner based on auth succeeding or not

  if (
    userdata.user_auth.length === 0 &&
    localStorage.getItem("discord_access_token")
  ) {
    return <div></div>;
  } else {
    return (
      <Router>
        <Navigation userdata={userdata} setUserData={setUserData} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
        <Footer userdata={userdata} />
      </Router>
    );
  }
}

function parseDiscordCallback(userdata, setUserData) {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const [accessToken, tokenType, state] = [
    fragment.get("access_token"),
    fragment.get("token_type"),
    fragment.get("state"),
  ];

  if (accessToken) {
    localStorage.setItem("discord_access_token", accessToken);
    localStorage.setItem("discord_token_type", tokenType);
  }
  if (localStorage.getItem("discord_access_token")) {
    window.history.replaceState(null, null, `${window.location.origin}`);

    useEffect(() => {
      fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${localStorage.getItem(
            "discord_token_type"
          )} ${localStorage.getItem("discord_access_token")} `,
        },
      })
        .then((result) => result.json())
        .then((responseJson) => {
          setUserData({ user_auth: true, user_data: responseJson });
        })
        .catch(console.error);
    }, []);
  } else {
    useEffect(() => {
      setUserData({ user_auth: false });
    }, []);
  }
}

export default App;
