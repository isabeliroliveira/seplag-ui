import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { CNPJFieldSeplagProps } from "./types";
import { InputMask } from "primereact/inputmask";
import { validacaoCNPJSeplag } from "../../uteis";

export function CNPJFieldSeplag<T extends FieldValues = any>(
  props: Readonly<CNPJFieldSeplagProps<T>>,
) {
  const {
    name,
    required = false,
    disabled = false,
    visible = true,
    control,
    label = "CNPJ",
    cols = "12 6",
    getFormErrorMessage,
    onBlur,
    validarCNPJ = true,
  } = props;

  if (!visible) return null;

  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={{
          ...(required ? { required: `${label} é obrigatório` } : {}),
          ...(validarCNPJ ? { validate: validacaoCNPJSeplag(label) } : {}),
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-column">
            <InputMask
              id={field.name}
              mask="99.999.999/9999-99"
              value={field.value}
              placeholder="00.000.000/0000-00"
              className={classNames({ "p-invalid": fieldState.error })}
              onChange={(e) => field.onChange(e.target.value)}
              onBlur={onBlur}
              disabled={disabled}
              autoClear={false}
            />
            {getFormErrorMessage(field.name)}
          </div>
        )}
      />
    </RotuloSeplag>
  );
}

export default CNPJFieldSeplag;
