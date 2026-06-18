import { Checkbox, type CheckboxChangeEvent } from "primereact/checkbox";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import type { CSSProperties } from "react";
import { CheckboxSNValorSeplag } from "./values";

export interface CheckboxSNSeplagProps<T extends FieldValues = any> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  inputId?: string;
  isDisabled?: boolean;
  className?: string;
  style?: CSSProperties;
  checkedValue?: string;
  uncheckedValue?: string;
}

export const CheckboxSNSeplag = <T extends FieldValues = any>({
  name,
  control,
  label,
  inputId,
  isDisabled = false,
  className,
  style,
  checkedValue = CheckboxSNValorSeplag.SIM,
  uncheckedValue = CheckboxSNValorSeplag.NAO,
}: CheckboxSNSeplagProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => {
      const { value, onChange, name: fieldName, ...restField } = field as any;
      const id = inputId ?? String(fieldName);
      const checked = value === checkedValue;

      const handleChange = (e: CheckboxChangeEvent) => {
        onChange(e.checked ? checkedValue : uncheckedValue);
      };

      return (
        <div className={className} style={style}>
          <Checkbox
            inputId={id}
            checked={checked}
            onChange={handleChange}
            disabled={isDisabled}
            {...restField}
          />
          <label htmlFor={id} style={{ marginLeft: 8 }}>
            {label}
          </label>
        </div>
      );
    }}
  />
);
