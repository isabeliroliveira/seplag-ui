import type { FieldValues } from "react-hook-form";
import type React from "react";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface NumberFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly inputStyle?: React.CSSProperties;
  readonly min?: number;
  readonly max?: number;
}
