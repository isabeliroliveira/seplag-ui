import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { MaskFieldSeplagProps } from "./types";
import { InputMask } from "primereact/inputmask";

export function MaskFieldSeplag<T extends FieldValues = any>(
  props: Readonly<MaskFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12 6",
    mask = "99/99/9999",
    placeholder = "dd/mm/yyyy",
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
              mask={mask}
              value={field.value}
              placeholder={placeholder}
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

export default MaskFieldSeplag;
