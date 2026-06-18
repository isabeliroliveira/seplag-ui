import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { FormFieldSeplagProps } from "./types";
import { InputMask } from "primereact/inputmask";

export function CPFFieldSeplag<T extends FieldValues = any>(
  props: Readonly<Omit<FormFieldSeplagProps<T>, "mask" | "placeholder">>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "CPF",
    cols = "12 6",
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
          <div className="flex flex-column">
            <InputMask
              id={field.name}
              mask="999.999.999-99"
              value={field.value}
              placeholder="000.000.000-00"
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
              disabled={disabled}
            />
            {getFormErrorMessage(field.name)}
          </div>
        )}
      />
    </RotuloSeplag>
  );
}

export default CPFFieldSeplag;
