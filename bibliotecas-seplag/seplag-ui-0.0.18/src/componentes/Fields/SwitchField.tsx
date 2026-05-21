import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { SwitchFieldSeplagProps } from "./types";
import { InputSwitch } from "primereact/inputswitch";

export function SwitchFieldSeplag<T extends FieldValues = any>(
  props: Readonly<SwitchFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "",
    cols = "12 6",
    horizontal = false,
    getFormErrorMessage,
    textTooltip,
  } = props;

  if (!visible) return null;

  return (
    <Controller
      name={name}
      control={control}
      rules={required ? { required: `${label} é obrigatório` } : undefined}
      render={({ field, fieldState }) => (
        <RotuloSeplag
          nome={label}
          cols={cols}
          obrigatorio={required}
          horizontal={horizontal}
        >
          <InputSwitch
            inputId={field.name}
            checked={field.value === "S"}
            onChange={(e) => field.onChange(e.value ? "S" : "N")}
            disabled={disabled}
            tooltip={textTooltip}
          />
          {fieldState.error && (
            <small className="p-error">{getFormErrorMessage(name)}</small>
          )}
        </RotuloSeplag>
      )}
    />
  );
}

export default SwitchFieldSeplag;
