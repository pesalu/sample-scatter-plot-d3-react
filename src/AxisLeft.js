export const AxisLeft = ({ yScale, innerWidth, tickOffset = 5 }) =>
  yScale.ticks().map((tickValue) => (
    <g className="tick" transform={`translate(0, ${yScale(tickValue)})`}>
      {/* <line
        x1={0}
        y1={yScale(tickValue)}
        x2={innerWidth}
        y2={yScale(tickValue)}
      /> */}
      <line x2={innerWidth} />
      <text
        key={tickValue}
        style={{ textAnchor: "end" }}
        dy="0.32em"
        x={-tickOffset}
      >
        {tickValue}
      </text>
    </g>
  ));
