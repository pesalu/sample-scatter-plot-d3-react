import styles from "./ScatterPlot.module.css";

import { AxisBottom } from "../axis-bottom/AxisBottom";
import { AxisLeft } from "../axis-left/AxisLeft";
import { Marks } from "../marks/Marks";
import { ColorLegend } from "../legend/ColorLegend";
import { Tooltip } from "../tooltip/Tooltip";

export function ScatterPlot(props) {
  const {
    width,
    height,
    margin,
    innerHeight,
    tickOffset,
    innerWidth,
    xAxisLabelOffset,
    yAxisLabelOffset,
    colorLegendLabel,
    circleRadius,
    fadeOpacity,
  } = props.plotConfiguration;

  return (
    <>
      <Tooltip
        id={"tooltip"}
        position={props.hoveredDatapoint || { x: 0, y: 0 }}
        xLabel={props.xAxisLabel}
        yLabel={props.yAxisLabel}
        xDomainValue={
          props.hoveredDatapoint && props.hoveredDatapoint.xDomainValue
        }
        yDomainValue={
          props.hoveredDatapoint && props.hoveredDatapoint.yDomainValue
        }
        visibility={props.hoveredDatapoint ? "visible" : "hidden"}
      />
      <svg width={width} height={height}>
        <g transform={`translate(${margin.left}, ${margin.top})`}>
          <AxisBottom
            xScale={props.xScale}
            innerHeight={innerHeight}
            tickFormat={props.xAxisTickFormat}
            tickOffset={tickOffset}
          />
          <AxisLeft
            yScale={props.yScale}
            innerWidth={innerWidth}
            tickOffset={tickOffset}
          />
          <text
            className={styles["axis-label"]}
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {props.xAxisLabel}
          </text>
          <text
            className={styles["axis-label"]}
            transform={`translate(
            ${-yAxisLabelOffset}, 
            ${innerHeight / 2}
            ) rotate(-90)`}
            textAnchor="middle"
          >
            {props.yAxisLabel}
          </text>
          <g
            transform={`translate(${innerWidth + margin.right / 5}, ${
              innerHeight / 2.5
            })`}
          >
            <ColorLegend
              colorLegendLabel={props.colorLegendLabel}
              colorScale={props.colorScale}
              tickSpacing={25}
              tickTextOffset={20}
              tickSize={circleRadius}
              onHover={props.setHoveredValue}
              hoveredValue={props.hoveredValue}
              fadeOpacity={fadeOpacity}
            />
          </g>
          <g opacity={props.hoveredValue ? fadeOpacity : 1}>
            <Marks
              data={props.data}
              xScale={props.xScale}
              xValue={props.xValue}
              yScale={props.yScale}
              yValue={props.yValue}
              colorScale={props.colorScale}
              colorValue={props.colorValue}
              tooltipFormat={props.xAxisTickFormat}
              circleRadius={circleRadius}
              mouseOverHandler={props.mouseOverHandler}
              mouseMoveHandler={props.mouseOverHandler}
              mouseOutHandler={(e) => {
                props.setHoveredDatapoint(null);
                console.log("I'm out");
              }}
            />
          </g>
          <Marks
            data={props.filteredData}
            xScale={props.xScale}
            xValue={props.xValue}
            yScale={props.yScale}
            yValue={props.yValue}
            colorScale={props.colorScale}
            colorValue={props.colorValue}
            tooltipFormat={props.xAxisTickFormat}
            circleRadius={circleRadius}
          />
        </g>
      </svg>
    </>
  );
}
