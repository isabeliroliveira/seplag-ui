import type { FieldValues } from "react-hook-form";
import type React from "react";
import type { FormFieldSeplagProps } from "./FormFieldSeplagProps";

export type SuggestionSeplag<T> = T extends any[] ? T[number] : T;

export interface SearchFieldSeplagProps<
  TForm extends FieldValues = any,
  TItem = any,
> extends FormFieldSeplagProps<TForm> {
  readonly minLength: number;
  readonly fieldLabel?: string;
  readonly items?: SuggestionSeplag<TItem>[];
  readonly search?: (query: string) => void;
  readonly itemTemplate?: (item: TItem) => React.ReactNode;
  readonly forceSelection?: boolean;
  readonly placeholder?: string;
}
