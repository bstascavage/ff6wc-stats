import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faGithub } from "@fortawesome/free-brands-svg-icons";
import Menu from "./Navigation/Menu";
import "./scss/main.scss";

function Footer(props) {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        <div className="site-navigation">
          <p>
            <strong>Site Map</strong>
          </p>
          <ul className="pages">
            <Menu discordUserdata={props.discordUserdata} />
          </ul>
        </div>

        <div className="site-contact">
          <p>
            <strong>Contact</strong>
          </p>
          <ul className="social-media-list">
            <li>
              <a href="https://ff6wc.com" title="FFVI Worlds Collide">
                <FontAwesomeIcon icon={faLink} />
                <span className="username">&nbsp;FF6WC Home</span>
              </a>
            </li>
            <li>
              <a href="https://discord.gg/5MPeng5" title="FF6WC Discord">
                <FontAwesomeIcon icon={faDiscord} />
                <span className="username">&nbsp;Discord</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/bstascavage/ff6wc-stats"
                title="Github"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span className="username">&nbsp;&nbsp;Github</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="site-signature">
          <p>
            <strong>Site Description</strong>
          </p>
          <p className="text">A collection of Worlds Collide stats.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
