import React from "react";
import { Row, Container } from "reactstrap";

function StatsWrapper(props) {
  return (
    <React.Fragment>
      <Container fluid className="pt-4">
        <Row>{props.children}</Row>
      </Container>
    </React.Fragment>
  );
}

export default StatsWrapper;
