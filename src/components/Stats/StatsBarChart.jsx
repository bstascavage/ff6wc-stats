import React from "react";
import { Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StatsBarChart(props) {
  const getFriendlyTime = (tickFormat) => {
    // 1- Convert to seconds:
    let seconds = Math.round(tickFormat / 1000);
    // 2- Extract hours:
    const hours = parseInt(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = parseInt(seconds / 60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    return (
      hours +
      ":" +
      (minutes < 10 ? `0${minutes}` : minutes) +
      ":" +
      (seconds < 10 ? `0${seconds}` : seconds)
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="recharts-default-tooltip"
          style={{
            margin: "0px",
            padding: "10px",
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px",
            solid: "rgb(204, 204, 204)",
            whiteSpace: "nowrap",
          }}
        >
          <p className="label">Time: {getFriendlyTime(payload[0].value)}</p>
          <p className="desc">Runs: {payload[0].payload.runs}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="bg-gradient-default shadow" style={{ height: "100%" }}>
      <CardHeader
        className="bg-transparent"
        style={{ border: "none", height: "24%" }}
      >
        <Row className="align-items-center">
          <Col>
            <h6 className="text-uppercase text-light ls-1 mb-1">
              {props.heading}
            </h6>
            <h2 className="text-light mb-0">{props.title}</h2>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div style={{ fontWeight: "600" }}>
          <ResponsiveContainer width="99%" height={props.height * 0.7}>
            <BarChart
              name="Time"
              dataKey="time"
              data={props.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis
                dataKey="name"
                stroke="white"
                tick={{ angle: 90 }}
                dy={props.dy}
                height={props.xHeight}
                interval={0}
              />
              <YAxis
                tickFormatter={(tick) => getFriendlyTime(tick)}
                type="number"
                stroke="white"
                domain={[
                  (dataMin) => Math.floor(dataMin / 600000) * 600000 - 600000,
                  (dataMax) => Math.floor(dataMax / 600000) * 600000 + 600000,
                ]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                name="Time"
                dataKey="time"
                fill="#8884d8"
                animationDuration={2000}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default StatsBarChart;
