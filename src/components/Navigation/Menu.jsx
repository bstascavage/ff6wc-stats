import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";
import "../scss/main.scss";

function Menu(props) {
  let loginLink, statsLink, submitLink;

  if (Object.keys(props.discordUserdata.userdata).length !== 0) {
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
    loginLink = loginLink = logout(props);
  } else {
    if (!props.discordUserdata.discord_login_error) {
      loginLink = (
        <li className="nav-link">
          <a
            className="nav-link"
            href={process.env.REACT_APP_DISCORD_OAUTH_LINK}
          >
            Login
          </a>
        </li>
      );
    } else {
      loginLink = logout(props);
    }
  }
  return (
    <div className="nav-menu">
      <li className="nav-link">
        <NavLink className="nav-link" to="/about">
          About
        </NavLink>
      </li>
      {statsLink}
      {submitLink}
      {loginLink}
    </div>
  );
}

function logout(props) {
  return (
    <li className="nav-link">
      <Logout
        className="nav-link"
        discordUserdata={props.discordUserdata}
        setUserdataState={props.setUserdataState}
      >
        Log Out
      </Logout>
    </li>
  );
}
export default Menu;
