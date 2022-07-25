import React from "react";
import { Text } from "@aws-amplify/ui-react";
import "./scss/main.scss";

function StatsWrapper(props) {
  return (
    <React.Fragment>
      <div className="section">
        <div className="container">
          <Text className="stats-title">{props.title}</Text>
          <div className="stats is-desktop">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StatsWrapper;
