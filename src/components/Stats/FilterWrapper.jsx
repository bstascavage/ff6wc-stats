import React from "react";
import { Text } from "@aws-amplify/ui-react";
import "./scss/main.scss";

function FilterWrapper(props) {
  return (
    <React.Fragment>
      <div className="section">
        <div className="container">
          <Text className="filter-title">{props.title}</Text>
          <div className="filter is-desktop">{props.children}</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FilterWrapper;
