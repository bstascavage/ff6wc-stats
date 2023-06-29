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
  let text = "text-dark";
  let stroke = "#444444";
  let background = "bg-gradient-light";
  let fill = "#504bc4";

  if (props.dark) {
    text = "text-light";
    stroke = "white";
    background = "bg-gradient-default";
    fill = "#8884d8";
  }

  const getFriendlyTime = (tickFormat) => {
    if (tickFormat == null) {
      return "N/A";
    }

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

  let CustomTooltip = ({ active, payload, label }) => {
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
          <p className="la bel">
            Time: {getFriendlyTime(payload[0].payload.time)}
          </p>
          <p className="desc">Runs: {payload[0].payload.runs}</p>
        </div>
      );
    }

    return null;
  };

  let yAxis = (
    <YAxis
      tickFormatter={(tick) => getFriendlyTime(tick)}
      type="number"
      stroke={stroke}
      domain={[
        (dataMin) =>
          Math.max(0, Math.floor(dataMin / 600000) * 600000 - 600000),
        (dataMax) => Math.floor(dataMax / 600000) * 600000 + 600000,
      ]}
    />
  );

  // By default the yAxis is configured for HH:MM:SS.
  // This lets us set other yAxis formats
  if (props.yAxisType === "interval") {
    yAxis = <YAxis type="number" stroke={stroke} />;
  }

  return (
    <Card className={`${background} shadow`} style={{ height: "100%" }}>
      <CardHeader
        className={background}
        style={{ border: "none", height: "24%" }}
      >
        <Row className="align-items-center">
          <Col>
            <h6 className={`text-uppercase ${text} ls-1 mb-1`}>
              {props.heading}
            </h6>
            <h2 className={`${text} mb-0`}>{props.title}</h2>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div style={{ fontWeight: "600" }}>
          <ResponsiveContainer width="99%" height={props.height * 0.7}>
            <BarChart
              name="Time"
              dataKey="data"
              data={props.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <XAxis
                dataKey="name"
                stroke={stroke}
                tick={{ angle: 90 }}
                dy={props.dy}
                height={props.xHeight}
                interval={0}
              />
              {yAxis}
              <Tooltip filterNull={false} content={<CustomTooltip />} />
              <Bar
                name="Time"
                dataKey="data"
                fill={fill}
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
