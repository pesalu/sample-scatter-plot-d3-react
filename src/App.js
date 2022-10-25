import "./App.css";
import { scaleLinear, extent, format } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";
import { DropdownMenu } from "./components/dropdown-menu/DropdownMenu";
import { useState } from "react";

const aspectRatio = 960 / 500;

const height = 500;
const width = height * aspectRatio;
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 50;

const tickOffset = 10;

const initialXAttribute = "sepal.length";
const initialYAttribute = "sepal.length";
function App() {
  const data = useData();
  console.log("DA ", data);

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];

  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];

  if (!data) {
    return <pre>Loading...</pre>;
  }

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

  return (
    <div>
      <DropdownMenu
        id={"x-select"}
        label={"X: "}
        options={attributes}
        selectedValue={xAttribute}
        onSelectedValueChange={setXAttribute}
      />
      <DropdownMenu
        id={"y-select"}
        label={"Y: "}
        options={attributes}
        selectedValue={yAttribute}
        onSelectedValueChange={setYAttribute}
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
          <Marks
            data={data}
            xScale={xScale}
            yScale={yScale}
            xValue={xValue}
            yValue={yValue}
            tooltipFormat={xAxisTickFormat}
            circleRadius={7}
          />
        </g>
      </svg>
    </div>
  );
}

export default App;
