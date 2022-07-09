import React from "react";
import { NavLink } from "react-router-dom";
import Menu from "./Menu";
import logo from "../../assets/magitek-icon.jpeg";
import "../scss/main.scss";

function Navigation({ userdata, setUserData }) {
  return (
    <React.Fragment>
      <div className="navigation">
        <div className="navigation-wrapper">
          <NavLink className="logo" to="/">
            <img src={logo} alt="Seto Stats" />
          </NavLink>
          <nav role="navigation">
            <ul id="js-navigation-menu" className="navigation-menu">
              <Menu userdata={userdata} setUserData={setUserData} />
            </ul>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navigation;
