import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";
import type { CSSProperties } from "react";

export interface CheckboxFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly defaultValue?: string;
  readonly checkboxLabel: string;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly checkedValue?: string;
  readonly uncheckedValue?: string;
}
