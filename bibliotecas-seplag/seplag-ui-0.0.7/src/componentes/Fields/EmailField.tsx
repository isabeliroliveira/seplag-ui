import { classNames } from "primereact/utils";
import { InputText } from "primereact/inputtext";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { EmailFieldSeplagProps } from "./types";

export function EmailFieldSeplag<T extends FieldValues = any>(
  props: Readonly<EmailFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "E-mail",
    cols = "12 6",
    getFormErrorMessage,
    placeholder = "Digite o e-mail",
    maxLength = 100,
    autoTrimOnBlur = true,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...(required
            ? {
                required: `${label} é obrigatório`,
              }
            : {}),
          validate: (value: any) => {
            const email = typeof value === "string" ? value.trim() : "";

            if (!email) {
              return required ? `${label} é obrigatório` : true;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(email)) {
              return `${label} inválido`;
            }

            return true;
          },
        }}
        render={({ field, fieldState }) => {
          const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;

            value = value.replaceAll(/\s/g, "");

            field.onChange(value);
          };

          const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            if (autoTrimOnBlur) {
              field.onChange(e.target.value.trim());
            }
            field.onBlur();
          };

          return (
            <div className="flex flex-column">
              <InputText
                id={field.name}
                value={field.value ?? ""}
                className={classNames({
                  "p-invalid": fieldState.error,
                })}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
                style={{ height: "40px" }}
              />
              {getFormErrorMessage(field.name)}
            </div>
          );
        }}
      />
    </RotuloSeplag>
  );
}

export default EmailFieldSeplag;
