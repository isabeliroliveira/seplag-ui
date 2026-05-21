import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import { RadioButton } from "primereact/radiobutton";
import type { RadioButtonFieldSeplagProps } from "./types";
import React from "react";

export function RadioButtonFieldSeplag<T extends FieldValues = any>(
  props: Readonly<RadioButtonFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12",
    options,
    getFormErrorMessage,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} é obrigatório` } : undefined}
        render={({ field }) => (
          <div className="flex flex-column">
            <div
              className="flex justify-content-start"
              style={{ minHeight: "39px" }}
            >
              <div className="flex align-items-center">
                {options.map((option, index) => (
                  <React.Fragment key={option.value}>
                    <RadioButton
                      inputId={`${field.name}_${index}`}
                      {...field}
                      inputRef={field.ref}
                      value={option.value}
                      checked={field.value === option.value}
                      disabled={disabled}
                    />
                    <label
                      htmlFor={`${field.name}_${index}`}
                      className="ml-1 mr-3"
                    >
                      {option.label}
                    </label>
                  </React.Fragment>
                ))}
              </div>
            </div>
            {getFormErrorMessage(field.name)}
          </div>
        )}
      />
    </RotuloSeplag>
  );
}

export default RadioButtonFieldSeplag;
