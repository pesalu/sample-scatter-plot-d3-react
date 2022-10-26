import styles from "./Tooltip.module.css";

export const Tooltip = ({
  id,
  position = { x: 0, y: 0 },
  xDomainValue,
  yDomainValue,
  xLabel = "X",
  yLabel = "Y",
  offset = { x: 15, y: 15 },
  visibility = "hidden",
}) => {
  return (
    <div
      id={id}
      className={styles.tooltip}
      style={{
        left: position.x + offset.x,
        top: position.y + offset.y,
        visibility: visibility,
      }}
    >
      <div>
        {xLabel}: {xDomainValue}
      </div>
      <div>
        {yLabel}: {yDomainValue}
      </div>
    </div>
  );
};
