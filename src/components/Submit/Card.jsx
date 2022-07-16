import React from "react";
import "./scss/main.scss";

function Card(props) {
  return (
    <React.Fragment>
      <div className="column is-full">
        <div className="card">
          <div className="card-header">{props.title}</div>
          <div className="card-content">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Card;
