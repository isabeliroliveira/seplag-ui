import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface SwitchFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly horizontal?: boolean;
  readonly placeholder?: string;
  readonly className?: string;
  readonly textTooltip?: string;
}
