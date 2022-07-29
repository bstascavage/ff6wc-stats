import React from "react";
import { Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StatsLineChart(props) {
  const formatYAxis = (tickFormat) => {
    // 1- Convert to seconds:
    let seconds = tickFormat / 1000;
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

  return (
    <Card className="bg-gradient-default shadow">
      <CardHeader className="bg-transparent" style={{ border: "none" }}>
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
          <ResponsiveContainer width="99%" aspect={3}>
            <LineChart
              data={props.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="name" tick={false} stroke="white" />
              <YAxis
                tickFormatter={(tick) => formatYAxis(tick)}
                tickLine={false}
                stroke="white"
                type="number"
                domain={[
                  (dataMin) => Math.floor(dataMin / 600000) * 600000 - 600000,
                  (dataMax) => Math.floor(dataMax / 600000) * 600000 + 600000,
                ]}
              />
              <Tooltip
                formatter={(value) => formatYAxis(value)}
                labelFormatter={(value) => `Run #${value}`}
              />
              <Legend />
              <Line
                type="linear"
                name="Time"
                dataKey="time"
                stroke="#82ca9d"
                strokeWidth={4}
                animationDuration={2000}
                animationEasing="linear"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardBody>
    </Card>
  );
}

export default StatsLineChart;
