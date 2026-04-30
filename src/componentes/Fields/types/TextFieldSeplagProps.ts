import type { FieldValues } from "react-hook-form";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export interface TextFieldSeplagProps<
  T extends FieldValues = any,
> extends FormFieldSeplagProps<T> {
  readonly placeholder?: string;
  readonly icon?: string;
  readonly maxLength?: number;
  readonly noSpaces?: boolean;
  readonly allowMoreThanOneSpace?: boolean;
  readonly allowNumberLetter?: boolean;
  readonly autoTrimOnBlur?: boolean;
  readonly numbersOnly?: boolean;
  readonly value?: string;
}
