import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function StatsCard(props) {
  // TODO: Rework this
  let deltaComponent = <span className="text-success mr-2"></span>;
  if (props.delta) {
    deltaComponent = (
      <span className="text-success mr-2">
        <i className="fa fa-arrow-up" /> 3.48%
      </span>
    );
  }
  const height = props.delta ? "auto" : "80%";

  return (
    <React.Fragment>
      <Col lg="6" xl="3">
        <Card
          className="card-stats mb-4 mb-xl-0"
          style={{ height: height }}
          id={props.id}
        >
          <CardBody>
            <Row>
              <div className="col">
                <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                  {props.title}
                </CardTitle>
                <span className="h2 font-weight-bold mb-0">{props.stat}</span>
              </div>
              <Col className="col-auto">
                <div
                  className={`icon icon-shape ${props.iconColor} text-white rounded-circle shadow`}
                >
                  <FontAwesomeIcon
                    icon={props.icon}
                    size="lg"
                    color="bg-white"
                    style={{ fontSize: "2.25em" }}
                  />
                </div>
              </Col>
            </Row>
            <p className="mt-3 mb-0 text-muted text-sm">
              {deltaComponent}{" "}
              <span className="text-nowrap">{props.deltaText}</span>
            </p>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default StatsCard;
