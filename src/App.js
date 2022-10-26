import "./App.css";
import { scaleLinear, extent, format, scaleOrdinal, select } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { ColorLegend } from "./ColorLegend";
import { Tooltip } from "./components/tooltip/Tooltip";
import { DropdownMenu } from "./components/dropdown-menu/DropdownMenu";
import { useState } from "react";

import styles from "./MenusContainer.module.css";

const aspectRatio = 960 / 500;

const height = 500;
const width = height * aspectRatio;
const margin = { top: 20, right: 200, bottom: 70, left: 100 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 50;

const tickOffset = 10;

const initialXAttribute = "sepal.width";
const initialYAttribute = "sepal.length";
const circleRadius = 7;
const colorLegendLabel = "Species";

const fadeOpacity = 0.5;

function App() {
  const data = useData();

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];

  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];

  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredDatapoint, setHoveredDatapoint] = useState(null);
  const colorValue = (d) => d["variety"];

  if (!data) {
    return <pre>Loading...</pre>;
  }

  console.log("DP: ", hoveredDatapoint);
  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const { attributes } = data;
  const getLabel = (labelId) => {
    let attribute = attributes.find((attribute) => attribute.value === labelId);
    return attribute && attribute.label;
  };

  const xAxisLabel = getLabel(xAttribute);
  const yAxisLabel = getLabel(yAttribute);

  const siFormat = format(".2s");
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace("G", "B");

  const xScale = scaleLinear()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();
  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([0, innerHeight]);
  const colorScale = scaleOrdinal()
    .domain(data.map(colorValue))
    .range(["#E6842A", "#137B80", "#8E6C8A"]);

  let mouseOverHandler = (e) => {
    setHoveredDatapoint({
      x: e.pageX,
      y: e.pageY,
      xDomainValue: format(".2s")(xScale.invert(e.target.attributes.cx.value)),
      yDomainValue: format(".2s")(yScale.invert(e.target.attributes.cy.value)),
    });
  };

  return (
    <div className={styles["graph-menu-container"]}>
      <div className={styles["menus-container"]}>
        <DropdownMenu
          label={"X"}
          options={attributes}
          selectedValue={xAttribute}
          onSelectedValueChange={setXAttribute}
        />
        <DropdownMenu
          label={"Y"}
          options={attributes}
          selectedValue={yAttribute}
          onSelectedValueChange={setYAttribute}
        />
      </div>

      <Tooltip
        id={"tooltip"}
        position={hoveredDatapoint || { x: 0, y: 0 }}
        xLabel={xAxisLabel}
        yLabel={yAxisLabel}
        xDomainValue={hoveredDatapoint && hoveredDatapoint.xDomainValue}
        yDomainValue={hoveredDatapoint && hoveredDatapoint.yDomainValue}
        visibility={hoveredDatapoint ? "visible" : "hidden"}
      />

      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={xScale}
            innerHeight={innerHeight}
            tickFormat={xAxisTickFormat}
            tickOffset={tickOffset}
          />
          <AxisLeft
            yScale={yScale}
            innerWidth={innerWidth}
            tickOffset={tickOffset}
          />
          <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text>
          <text
            className="axis-label"
            transform={`translate(
              ${-yAxisLabelOffset}, 
              ${innerHeight / 2}
            ) rotate(-90)`}
            textAnchor="middle"
          >
            {yAxisLabel}
          </text>
          <g
            transform={`translate(${innerWidth + margin.right / 3}, ${
              innerHeight / 3
            })`}
          >
            <ColorLegend
              colorLegendLabel={colorLegendLabel}
              colorScale={colorScale}
              tickSpacing={25}
              tickTextOffset={20}
              tickSize={circleRadius}
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={data}
              xScale={xScale}
              xValue={xValue}
              yScale={yScale}
              yValue={yValue}
              colorScale={colorScale}
              colorValue={colorValue}
              tooltipFormat={xAxisTickFormat}
              circleRadius={circleRadius}
              mouseOverHandler={mouseOverHandler}
              mouseMoveHandler={mouseOverHandler}
              mouseOutHandler={(e) => {
                setHoveredDatapoint(null);
                console.log("I'm out");
              }}
            />
          </g>
          <Marks
            data={filteredData}
            xScale={xScale}
            xValue={xValue}
            yScale={yScale}
            yValue={yValue}
            colorScale={colorScale}
            colorValue={colorValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;
