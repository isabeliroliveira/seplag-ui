import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface CNPJFieldSeplagProps<T extends FieldValues = any> extends Omit<
  FormFieldSeplagProps<T>,
  "mask" | "placeholder"
> {
  readonly onBlur?: () => void;
  readonly validarCNPJ?: boolean;
}
