import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Card, CardBody, CardHeader } from "reactstrap";
import {
  ScatterChart,
  XAxis,
  YAxis,
  Scatter,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

const getHeatGroups = (dataset, numOfIntervals) => {
  let breakpoints = [];

  // Dynamically set the number of breakpoints based on the `numOfIntervals`
  for (let i = 0; i <= numOfIntervals; i++) {
    const colorInterval = 185 / numOfIntervals;
    i === 0
      ? breakpoints.push({ temp: 0, color: "none" })
      : breakpoints.push({
          temp: i,
          color: `rgb(${192 - colorInterval * i}, ${
            219 - colorInterval * i
          }, 255)`,
        });
  }

  let remaining = [...dataset];
  const heatGroups = [];

  breakpoints.forEach(({ temp, color }, index) => {
    heatGroups.push({
      label: `<= ${temp}`,
      color,
      data: remaining.filter((d) => d.temperature <= temp),
    });

    // Keep track of remaining
    remaining = remaining.filter((d) => d.temperature > temp);
  });
  if (remaining.length > 0) {
    heatGroups.push({
      label: `> ${breakpoints.pop().temp}`,
      color: "rgb(165, 0, 38)",
      data: remaining,
    });
  }

  return heatGroups;
};

const CustomShape = (props) => {
  return (
    <Rectangle
      {...props}
      height={props.divHeight * 0.083}
      width={(props.divWidth - 70) / 8} // Divide by the number of x-axis ticks
      x={props.x + 6}
      y={props.y - 29}
    />
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
          backgroundColor: "rgb(20, 20, 40)",
          border: "1px",
          solid: "rgb(204, 204, 204)",
          whiteSpace: "nowrap",
          color: "rgb(255, 255, 255)",
        }}
      >
        <p className="desc">Dragon: {payload[0].payload.dragonName}</p>
        <p className="desc">
          Dragons Fought: {payload[0].payload.numOfDragons}
        </p>
        <p className="desc">Runs: {payload[0].payload.numOfRuns}</p>
      </div>
    );
  }

  return null;
};

function HeatMap(props) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const handleWindowResize = (ref) => {
    if (ref) {
      setHeight(ref.current ? ref.current.offsetHeight : 0);
      setWidth(ref.current ? ref.current.offsetWidth : 0);
    }
  };

  const ref = useRef(null);

  useEffect(() => {
    // component is mounted and window is available
    handleWindowResize(ref);
    window.addEventListener("resize", () => handleWindowResize(ref));

    // unsubscribe from the event on component unmount
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  let text = "text-dark";
  let stroke = "#444444";
  let background = "bg-gradient-light";

  if (props.dark) {
    text = "text-light";
    stroke = "white";
    background = "bg-gradient-default";
  }

  const dataset = props.data.dragons.map((i) => ({
    ...i,
    temperature: i.numOfRuns,
  }));
  const formatDragon = (dragonName) => {
    return dragonName >= props.yAxisMap.length
      ? ""
      : props.yAxisMap[dragonName];
  };

  return (
    <div id="heat-map" style={{ height: "100%" }}>
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
          <div ref={ref} style={{ fontWeight: "600" }}>
            <ResponsiveContainer width="100%" height={props.height * 0.7}>
              <ScatterChart
                margin={{
                  left: 10,
                  bottom: 75,
                }}
              >
                <XAxis
                  dataKey="dragon"
                  stroke={stroke}
                  tick={{
                    angle: 90,
                    fontSize: 14,
                    textAnchor: "start",
                    dx: 70,
                    dy: 10,
                  }}
                  tickLine={false}
                  dy={props.dy}
                  height={props.xHeight}
                  interval={0}
                  type="number"
                  tickFormatter={(tick) => formatDragon(tick)}
                  tickCount={9}
                />
                <YAxis
                  dataKey="numOfDragons"
                  type="number"
                  stroke={stroke}
                  tickCount={8}
                  padding={{ top: 15 }}
                  tick={{ fontSize: 16 }}
                  domain={[1, 8]}
                />

                <Tooltip content={<CustomTooltip />} />
                {getHeatGroups(dataset, props.data.interval).map((group) => (
                  <Scatter
                    key={group.label}
                    name={group.label}
                    data={group.data}
                    fill={group.color}
                    shape={<CustomShape divHeight={height} divWidth={width} />}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default HeatMap;
