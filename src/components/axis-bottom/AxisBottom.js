import styles from "./AxisBottom.module.css";

export const AxisBottom = ({
  xScale,
  innerHeight,
  tickFormat,
  tickOffset = 5,
}) =>
  xScale.ticks().map((tickValue) => (
    <g
      className={styles["tick"]}
      key={tickValue}
      transform={`translate(${xScale(tickValue)}, 0)`}
    >
      <line x1={0} y1={0} x2={0} y2={innerHeight} />
      <text
        style={{ textAnchor: "middle" }}
        y={innerHeight + tickOffset}
        dy=".71em"
      >
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
