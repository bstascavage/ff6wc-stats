import React from "react";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";

function StatsCard(props) {
  // TODO: Rework this
  let deltaComponent = <span className="text-success mr-2"></span>;
  if (props.delta) {
    let statusColor = "text-success";
    let arrow = faArrowUp;

    if (props.delta.negative) {
      statusColor = "text-danger";
      arrow = faArrowDown;
    }
    deltaComponent = (
      <React.Fragment>
        <span className={`${statusColor} mr-2`}>
          <FontAwesomeIcon icon={arrow} size="lg" color="bg-white" />{" "}
          {props.delta.time}
        </span>
        <span className="text-nowrap">{props.subText}</span>
      </React.Fragment>
    );
  } else if (props.subStat) {
    deltaComponent = (
      <React.Fragment>
        <span className="text-nowrap">{props.subText}</span>
        <span className={`mr-2`}> {props.subStat}</span>
      </React.Fragment>
    );
  }
  let height = props.height ? props.height : "136px";

  return (
    <React.Fragment>
      <Card
        className="card-stats hover mb-4 mb-xl-0"
        style={{ height: height, width: "100%" }}
        id={props.id}
      >
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {props.title}
              </CardTitle>
              <span
                className="h2 font-weight-bold mb-0"
                style={{ fontSize: props.fontSize }}
              >
                {props.stat}
              </span>
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
          <p className="mt-3 mb-0 text-muted text-sm">{deltaComponent}</p>
        </CardBody>
      </Card>
    </React.Fragment>
  );
}

export default StatsCard;
