import styles from "./DropdownMenu.module.css";
import Select from "react-select";

export function DropdownMenu({
  id,
  label,
  options,
  selectedValue,
  onSelectedValueChange,
}) {
  return (
    <div className={styles["menu-container"]}>
      <span className={styles["dropdown-label"]}>{label}</span>
      <Select
        className={styles["select-component"]}
        options={options}
        defaultValue={[
          options.find((option) => {
            return option.value === selectedValue ? option : null;
          }),
        ]}
        onChange={({ value }) => onSelectedValueChange(value)}
      />
    </div>
  );
}
