import React from "react";
import "./scss/main.scss";

function ColumnWrapper(props) {
  return (
    <React.Fragment>
      <div className="section">
        <div className="container">
          <div className="submit" id="submit" style={{ display: "block" }}>
            <div className="columns is-desktop">{props.children}</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ColumnWrapper;
