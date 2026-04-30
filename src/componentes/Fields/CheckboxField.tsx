import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { CheckboxFieldSeplagProps } from "./types";
import { Checkbox } from "primereact/checkbox";

export function CheckboxFieldSeplag<T extends FieldValues = any>(
  props: Readonly<CheckboxFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    checkboxLabel,
    cols = "12",
    defaultValue = "N",
    className,
    style,
    checkedValue = "S",
    uncheckedValue = "N",
  } = props as CheckboxFieldSeplagProps<T>;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as any}
        rules={required ? { required: `${label} é obrigatório` } : undefined}
        render={({ field }) => {
          const {
            value,
            onChange,
            name: fieldName,
            ...restField
          } = field as any;
          const id = String(fieldName);
          const checked = value === checkedValue;

          const handleChange = (e: any) =>
            onChange(e.checked ? checkedValue : uncheckedValue);

          return (
            <div className={className} style={style}>
              <Checkbox
                inputId={id}
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                {...restField}
              />
              <label htmlFor={id} style={{ marginLeft: 8 }}>
                {checkboxLabel}
              </label>
            </div>
          );
        }}
      />
    </RotuloSeplag>
  );
}

export default CheckboxFieldSeplag;
