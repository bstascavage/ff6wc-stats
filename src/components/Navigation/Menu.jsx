import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../Logout";

function Menu(props) {
  let loginLink, statsLink, runsLink, submitLink;

  if (Object.keys(props.discordUserdata.userdata).length !== 0) {
    statsLink = (
      <li className="nav-link nav-link-li">
        <NavLink
          reloadDocument
          className="nav-link"
          to="/stats"
          onClick={() => props.setUserdataState({ type: "close_menu" })}
        >
          My Stats
        </NavLink>
      </li>
    );
    runsLink = (
      <li className="nav-link nav-link-li">
        <NavLink
          reloadDocument
          className="nav-link"
          to="/runs"
          onClick={() => props.setUserdataState({ type: "close_menu" })}
        >
          Runs
        </NavLink>
      </li>
    );
    submitLink = (
      <li className="nav-link nav-link-li">
        <NavLink
          className="nav-link"
          to="/submit"
          onClick={() => props.setUserdataState({ type: "close_menu" })}
        >
          Submit Run
        </NavLink>
      </li>
    );
    loginLink = logout(props);
  } else {
    loginLink = (
      <li className="nav-link nav-link-li">
        <a className="nav-link" href={process.env.REACT_APP_DISCORD_OAUTH_LINK}>
          Login
        </a>
      </li>
    );
  }
  return (
    <div className="nav-menu">
      <li className="nav-link nav-link-li">
        <NavLink
          className="nav-link"
          to="/"
          onClick={() => props.setUserdataState({ type: "close_menu" })}
        >
          Home
        </NavLink>
      </li>
      <li className="nav-link nav-link-li">
        <NavLink
          className="nav-link"
          to="/about"
          onClick={() => props.setUserdataState({ type: "close_menu" })}
        >
          About
        </NavLink>
      </li>
      {statsLink}
      {runsLink}
      {submitLink}
      {loginLink}
    </div>
  );
}

function logout(props) {
  return (
    <li className="nav-link nav-link-li">
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
