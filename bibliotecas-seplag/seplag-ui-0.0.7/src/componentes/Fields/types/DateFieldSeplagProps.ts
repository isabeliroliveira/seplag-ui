import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface DateFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly shouldUnregister?: boolean;
  readonly placeholder?: string;
  readonly dateFormat?: string;
  readonly mask?: string;
  readonly view?: "date" | "month" | "year";
  readonly customValidation?: (value: any) => string | boolean;
  readonly validateAfterDate?: any;
  readonly validateAfterMessage?: string;
  readonly validateStartDate?: any;
  readonly validateStartMessage?: string;
  readonly maxDate?: Date;
  readonly minDate?: Date;
}
