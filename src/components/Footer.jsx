import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Menu from "./Navigation/Menu";
import "./scss/main.scss";

function Footer(props) {
  const [latestTag, setLatestTag] = useState("");

  useEffect(() => {
    const fetchLatestTag = async () => {
      // Fetches the lastest tagged release from the Github repo
      try {
        const response = await fetch(
          `https://api.github.com/repos/${props.config.footer.github.owner}/${props.config.footer.github.repo}/tags`,
        );
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setLatestTag(data[0].name);
        } else {
          setLatestTag("No tags found");
        }
      } catch (error) {
        console.error("Error fetching latest tag:", error);
        setLatestTag("Error fetching latest tag");
      }
    };

    fetchLatestTag();
  }, [props.config]);

  return (
    <footer className="site-footer">
      <div className="wrapper">
        <div className="site-navigation">
          <p>
            <strong>Site Map</strong>
          </p>
          <ul className="pages">
            <Menu
              discordUserdata={props.discordUserdata}
              setUserdataState={props.setUserdataState}
            />
          </ul>
        </div>

        <div className="site-contact">
          <p>
            <strong>Contact</strong>
          </p>
          <ul className="social-media-list">
            <li>
              <a
                href={props.config.footer.ff6wc.url}
                title={props.config.footer.ff6wc.title}
              >
                <FontAwesomeIcon icon={faLink} fixedWidth />
                <span className="username">&nbsp;FF6WC Home</span>
              </a>
            </li>
            <li>
              <a
                href={props.config.footer.discord.url}
                title={props.config.footer.discord.title}
              >
                <FontAwesomeIcon icon={faDiscord} fixedWidth />
                <span className="username">&nbsp;Discord</span>
              </a>
            </li>
            <li>
              <a
                href={props.config.footer.twitter.url}
                title={props.config.footer.twitter.title}
              >
                <FontAwesomeIcon icon={faTwitter} fixedWidth />
                <span className="username">&nbsp;Twitter</span>
              </a>
            </li>
            <li>
              <a
                href={props.config.footer.github.url}
                title={props.config.footer.github.title}
              >
                <FontAwesomeIcon icon={faGithub} fixedWidth />
                <span className="username">&nbsp;Github</span>
              </a>
            </li>
            <li>
              <a
                href={props.config.footer.statscompanion.url}
                title={props.config.footer.statscompanion.title}
              >
                <FontAwesomeIcon icon={faLink} fixedWidth />
                <span className="username">&nbsp;StatsCompanion</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="site-signature">
          <p>
            <strong>Site Description</strong>
          </p>
          <p className="text">A collection of Worlds Collide stats.</p>
          <p className="text">
            <b>Version: </b>
            {latestTag}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
