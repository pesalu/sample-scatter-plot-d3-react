import { styles } from "./DropdownMenu.module.css";

export function DropdownMenu({
  id,
  label,
  options,
  selectedValue,
  onSelectedValueChange,
}) {
  return (
    <>
      <label for={id}>{label}</label>
      <select
        name="pets"
        id={id}
        onChange={(event) => onSelectedValueChange(event.target.value)}
      >
        <option value="">--Please choose an option--</option>
        {options.map(({ value, label }) => (
          <option value={value} selected={value === selectedValue}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
