import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface MaskFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly mask?: string;
  readonly placeholder?: string;
}
