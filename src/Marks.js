export const Marks = ({
  data,
  xScale,
  yScale,
  xValue,
  yValue,
  tooltipFormat,
  circleRadius = 10,
}) =>
  data.map((d, idx) => (
    <circle
      key={idx}
      className="mark"
      cx={xScale(xValue(d))}
      cy={yScale(yValue(d))}
      r={circleRadius}
    >
      <title>{tooltipFormat(xValue(d))}</title>
    </circle>
  ));
