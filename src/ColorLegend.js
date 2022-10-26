import styles from "./ColorLegend.module.css";

export const ColorLegend = ({
  colorLegendLabel,
  colorScale,
  tickSpacing = 20,
  tickSize = 10,
  tickTextOffset = 20,
}) => {
  return (
    <>
      <text className={styles["legend-label"]} x={-10} y={-25}>
        {colorLegendLabel}
      </text>
      {colorScale.domain().map((domainValue, idx) => {
        return (
          <g transform={`translate(0, ${idx * tickSpacing})`}>
            <circle fill={colorScale(domainValue)} r={tickSize}></circle>
            <text className={styles["tick"]} x={tickTextOffset} dy="0.32em">
              {domainValue}
            </text>
          </g>
        );
      })}
    </>
  );
};
