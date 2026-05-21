import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface TextAreaFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly rows?: number;
  readonly placeholder?: string;
  readonly maxLength?: number;
}
