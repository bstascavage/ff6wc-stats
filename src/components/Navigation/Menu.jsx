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
        <a className="nav-link" href={process.env.REACT_APP_DISCORD_OAUTH_LINK}>
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
