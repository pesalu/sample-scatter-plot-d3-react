import "./App.css";
import { scaleLinear, min, max, extent, format } from "d3";
import { useData } from "./useData";
import { AxisBottom } from "./AxisBottom";
import { AxisLeft } from "./AxisLeft";
import { Marks } from "./Marks";

const aspectRatio = 960 / 500;

const height = 500;
const width = height * aspectRatio;
const margin = { top: 20, right: 30, bottom: 70, left: 100 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;
const xAxisLabelOffset = 40;
const yAxisLabelOffset = 50;

const tickOffset = 10;

function App() {
  const data = useData();
  if (!data) {
    return <pre>Loading...</pre>;
  }

  // Reusable data accessor functions
  const xValue = (d) => d["sepal.length"];
  const xAxisLabel = "Sepal Length";

  const yValue = (d) => d["sepal.width"];
  const yAxisLabel = "Sepal Width";

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
    // <div style={{ border: "2px solid" }}>
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
    // </div>
  );
}

export default App;
