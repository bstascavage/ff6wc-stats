import React from "react";
import { NavLink } from "react-router-dom";
import { slide as MobileMenu } from "react-burger-menu";

import Menu from "./Menu";
import logo from "../../assets/navbarlogo.png";
import "./scss/main.scss";

function Navigation(props) {
  return (
    <React.Fragment>
      <div className="navigation">
        <div className="navigation-wrapper">
          <NavLink className="logo" to="/">
            <img src={logo} alt="Stats Collide" />
          </NavLink>
          <nav role="navigation">
            <ul id="js-navigation-menu" className="navigation-menu">
              <Menu
                discordUserdata={props.discordUserdata}
                setUserdataState={props.setUserdataState}
              />
            </ul>
          </nav>
          <div className="bm-burger-menu">
            <MobileMenu
              right
              width={"100%"}
              isOpen={props.discordUserdata.open_menu}
              onStateChange={(state) =>
                state.isOpen
                  ? props.setUserdataState({ type: "open_menu" })
                  : props.setUserdataState({ type: "close_menu" })
              }
            >
              <Menu
                discordUserdata={props.discordUserdata}
                setUserdataState={props.setUserdataState}
              />
            </MobileMenu>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Navigation;
