import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { TextFieldSeplagProps } from "./types";
import { InputText } from "primereact/inputtext";

export function TextFieldSeplag<T extends FieldValues = any>(
  props: Readonly<TextFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12 6",
    getFormErrorMessage,
    placeholder,
    icon,
    maxLength,
    noSpaces = false,
    allowMoreThanOneSpace = false,
    allowNumberLetter = false,
    autoTrimOnBlur = true,
    numbersOnly = false,
    value,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={
          required
            ? {
                required: `${label} é obrigatório`,
                validate: (value: any) => {
                  if (typeof value === "string" && !/[^\s]/.test(value)) {
                    return `${label} é obrigatório`;
                  }

                  return true;
                },
              }
            : undefined
        }
        render={({ field, fieldState }) => {
          const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;

            if (numbersOnly) {
              value = value.replaceAll(/\D/g, "");
            } else if (noSpaces) {
              value = value.replaceAll(/\s/g, "");
            } else if (allowNumberLetter) {
              value = value.replaceAll(/[^A-Za-z0-9]/g, "");
            } else if (!allowMoreThanOneSpace) {
              value = value.replaceAll(/\s+/g, " ");
            }

            field.onChange(value);
          };

          const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (autoTrimOnBlur) {
              field.onChange(e.target.value.trim());
            }

            field.onBlur();
          };

          const input = () => (
            <InputText
              id={field.name}
              value={value ?? field.value ?? ""}
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={handleOnChange}
              onBlur={handleOnBlur}
              disabled={disabled}
              placeholder={placeholder}
              maxLength={maxLength}
              style={{ height: "40px" }}
            />
          );

          return (
            <div className="flex flex-column">
              {icon ? (
                <span className="p-input-icon-right" style={{ width: "100%" }}>
                  {input()}
                  <i className={icon} />
                </span>
              ) : (
                input()
              )}
              {getFormErrorMessage(field.name)}
            </div>
          );
        }}
      />
    </RotuloSeplag>
  );
}

export default TextFieldSeplag;
