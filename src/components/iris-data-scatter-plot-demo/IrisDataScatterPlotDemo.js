import { scaleLinear, extent, format, scaleOrdinal, select, color } from "d3";
import { useData } from "./useData";
import { DropdownMenu } from "../dropdown-menu/DropdownMenu";
import { useState, useRef, useEffect } from "react";

import styles from "./MenusContainer.module.css";
import { ScatterPlot } from "../scatter-plot/ScatterPlot";

const colorLegendLabel = "Species";
const initialXAttribute = "sepal.width";
const initialYAttribute = "sepal.length";

function IrisDataScatterPlotDemo() {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  let svgContainerRef = useRef(null);

  // Monitor the size of div containing the
  // svg to enable responsiveness
  useEffect(() => {
    const resizeObserver = new ResizeObserver((event) => {
      setWidth(event[0].contentBoxSize[0].inlineSize);
      setHeight(event[0].contentBoxSize[0].blockSize);
    });

    if (svgContainerRef.current) {
      resizeObserver.observe(svgContainerRef.current);
    }
  }, [svgContainerRef]);

  const margin = { top: 10, right: 120, bottom: 110, left: 70 };
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const plotConfiguration = {
    height,
    width,
    margin,
    innerHeight,
    innerWidth,
    xAxisLabelOffset: 50,
    yAxisLabelOffset: 50,
    tickOffset: 10,
    circleRadius: 7,
    fadeOpacity: 0.5,
  };

  const data = useData();

  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = (d) => d[xAttribute];

  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = (d) => d[yAttribute];

  const [hoveredValue, setHoveredValue] = useState(null);
  const [hoveredDatapoint, setHoveredDatapoint] = useState(null);
  const colorValue = (d) => d["variety"];

  if (!data) {
    console.log("RENDERING 1");
    return (
      <div ref={svgContainerRef} className={styles["graph-menu-container"]}>
        <pre>Loading...</pre>;
      </div>
    );
  }

  const filteredData = data.filter((d) => hoveredValue === colorValue(d));

  const { attributes } = data;
  const getLabel = (labelId) => {
    let attribute =
      attributes && attributes.find((attribute) => attribute.value === labelId);
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
    <div ref={svgContainerRef} className={styles["graph-menu-container"]}>
      {console.log("RENDERING 2")}
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
      <ScatterPlot
        data={data}
        xValue={xValue}
        yValue={yValue}
        hoveredValue={hoveredValue}
        setHoveredValue={setHoveredValue}
        setHoveredDatapoint={setHoveredDatapoint}
        colorValue={colorValue}
        filteredData={filteredData}
        xAxisLabel={xAxisLabel}
        yAxisLabel={yAxisLabel}
        xAxisTickFormat={xAxisTickFormat}
        xScale={xScale}
        yScale={yScale}
        colorScale={colorScale}
        colorLegendLabel={colorLegendLabel}
        mouseOverHandler={mouseOverHandler}
        hoveredDatapoint={hoveredDatapoint}
        plotConfiguration={plotConfiguration}
      ></ScatterPlot>
    </div>
  );
}

export default IrisDataScatterPlotDemo;
