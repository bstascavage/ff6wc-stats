import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./scss/main.scss";

function StatsCard(props) {
  const cardType = `stat-card-flex${props.slim ? "-slim" : ""}`;

  let icon;
  if (props.icon) {
    icon = (
      <div className="stat-card__icon stat-card__icon--success">
        <div className="stat-card__icon-medal stat-card__icon-circle">
          <FontAwesomeIcon
            icon={props.icon}
            size={props.icon_size}
            color={props.icon_color}
          />
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <nav className={cardType}>
        <div className="stat-card">
          <div className="stat-card__content">
            <p className="text-uppercase mb-1 text-muted">{props.title}</p>
            <h2>{props.stat}</h2>
          </div>
          {icon}
        </div>
      </nav>
    </React.Fragment>
  );
}

export default StatsCard;
