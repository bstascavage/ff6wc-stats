import React from "react";
import { Row } from "reactstrap";

function StatsWrapper(props) {
  return (
    <React.Fragment>
      <div className="stats-overview">
        <Row>{props.children}</Row>
      </div>
    </React.Fragment>
  );
}

export default StatsWrapper;
