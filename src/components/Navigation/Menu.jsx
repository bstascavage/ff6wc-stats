import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";
import "../scss/main.scss";

function Menu({ userdata, setUserData }) {
  let loginLink, statsLink, submitLink;

  if (userdata.user_auth === true) {
    statsLink = (
      <li className="nav-link">
        <NavLink className="nav-link" to="/stats">
          My Stats
        </NavLink>
      </li>
    );
    submitLink = (
      <li className="nav-link">
        <NavLink className="nav-link" to="/submit">
          Submit Run
        </NavLink>
      </li>
    );
    loginLink = (
      <li className="nav-link">
        <Logout className="nav-link" setUserData={setUserData}>
          Log Out
        </Logout>
      </li>
    );
  } else {
    loginLink = (
      <li className="nav-link">
        <a
          className="nav-link"
          href="https://discord.com/api/oauth2/authorize?client_id=994734074704957602&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=token&scope=identify%20email"
        >
          Login
        </a>
      </li>
    );
  }
  return (
    <div className="nav-menu">
      <li className="nav-link">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>
      <li className="nav-link">
        <NavLink className="nav-link" to="/global">
          Global Stats
        </NavLink>
      </li>
      {statsLink}
      {submitLink}
      {loginLink}
    </div>
  );
}

export default Menu;
