export const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  colorScale,
  colorValue,
  tooltipFormat,
  circleRadius = 10,
  mouseOverHandler,
  mouseMoveHandler,
  mouseOutHandler,
}) =>
  data.map((d, idx) => (
    <circle
      key={idx}
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      fill={colorScale(colorValue(d))}
      r={circleRadius}
      onMouseOver={mouseOverHandler}
      onMouseMove={mouseMoveHandler}
      onMouseOut={mouseOutHandler}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));
