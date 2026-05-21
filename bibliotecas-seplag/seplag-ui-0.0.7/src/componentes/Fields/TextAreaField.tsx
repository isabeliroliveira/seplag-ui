import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import { InputTextarea } from "primereact/inputtextarea";
import type { TextAreaFieldSeplagProps } from "./types";

export function TextAreaFieldSeplag<T extends FieldValues = any>(
  props: Readonly<TextAreaFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12",
    getFormErrorMessage,
    rows = 4,
    placeholder,
    maxLength,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag cols={cols} nome={label} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} é obrigatório` } : undefined}
        render={({ field, fieldState }) => {
          const currentLength = field.value?.length || 0;

          return (
            <div className="flex flex-column gap-1">
              <InputTextarea
                id={field.name}
                {...field}
                value={field.value || ""}
                rows={rows}
                className={classNames("w-full", {
                  "p-invalid": fieldState.error,
                })}
                autoResize
                disabled={disabled}
                placeholder={placeholder}
                maxLength={maxLength}
              />
              {maxLength && (
                <small
                  className={classNames("text-right", {
                    "text-red-500": currentLength >= maxLength,
                    "text-500": currentLength < maxLength,
                  })}
                >
                  {currentLength}/{maxLength}
                </small>
              )}

              {getFormErrorMessage(field.name)}
            </div>
          );
        }}
      />
    </RotuloSeplag>
  );
}

export default TextAreaFieldSeplag;
