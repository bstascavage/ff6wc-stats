import React from "react";
import "./scss/main.scss";

function Column(props) {
  return (
    <React.Fragment>
      <div className="column">
        <div className="columns is-multiline is-desktop">{props.children}</div>
      </div>
    </React.Fragment>
  );
}

export default Column;
