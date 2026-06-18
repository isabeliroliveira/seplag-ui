import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { NumberFieldSeplagProps } from "./types";
import { classNames } from "primereact/utils";
import { InputNumber } from "primereact/inputnumber";

export function NumberFieldSeplag<T extends FieldValues = any>(
  props: Readonly<NumberFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12 6",
    inputStyle,
    min,
    max,
    getFormErrorMessage,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} é obrigatório` } : undefined}
        render={({ field, fieldState }) => (
          <div className="flex flex-column col">
            <InputNumber
              id={field.name}
              value={field.value}
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={(e: { value: any }) => field.onChange(e.value)}
              useGrouping={false}
              disabled={disabled}
              inputStyle={inputStyle}
              min={min}
              max={max}
            />
            {getFormErrorMessage(field.name)}
          </div>
        )}
      />
    </RotuloSeplag>
  );
}

export default NumberFieldSeplag;
