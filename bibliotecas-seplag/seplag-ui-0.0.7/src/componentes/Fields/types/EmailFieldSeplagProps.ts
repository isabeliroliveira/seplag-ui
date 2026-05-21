import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface EmailFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly placeholder?: string;
  readonly maxLength?: number;
  readonly autoTrimOnBlur?: boolean;
}
