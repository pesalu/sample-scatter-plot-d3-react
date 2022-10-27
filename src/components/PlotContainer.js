import { useEffect, useRef, useState } from "react";
import IrisDataScatterPlotDemo from "./iris-data-scatter-plot-demo/IrisDataScatterPlotDemo";

const ResponsivePlotContainer = () => {
  let svgContainer = useRef();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  const getSvgContainerSize = () => {
    const newWidth = svgContainer.current.clientWidth;
    setWidth(newWidth);

    const newHeight = svgContainer.current.clientHeight;
    setHeight(newHeight);
  };

  useEffect(() => {
    getSvgContainerSize();
    window.addEventListener("resize", getSvgContainerSize);
    return () => window.removeEventListener("resize", getSvgContainerSize);
  }, []);

  return (
    <div ref={svgContainer} style={{ height: "80vh" }}>
      <IrisDataScatterPlotDemo width={width} height={height} />
    </div>
  );
};
export default ResponsivePlotContainer;
