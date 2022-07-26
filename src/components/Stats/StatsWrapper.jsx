import React from "react";
import { Row, Container } from "reactstrap";

function StatsWrapper(props) {
  return (
    <React.Fragment>
      <div className="header-body">
        <div className="header bg-gradient-info pb-8 pt-4 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row>{props.children}</Row>
            </div>
          </Container>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StatsWrapper;
