import { classNames } from "primereact/utils";
import { Controller, type FieldValues } from "react-hook-form";
import RotuloSeplag from "../Rotulo";
import type { SearchFieldSeplagProps, SuggestionSeplag } from "./types";
import { AutoComplete } from "primereact/autocomplete";

export function SearchFieldSeplag<TForm extends FieldValues = any, TItem = any>(
  props: Readonly<SearchFieldSeplagProps<TForm, TItem>>,
) {
  const {
    visible = true,
    name,
    required = false,
    disabled = false,
    control,
    fieldLabel = undefined,
    placeholder = "",
    label = "",
    cols = "12 6",
    items = [] as SuggestionSeplag<TItem>[],
    minLength = 3,
    search,
    getFormErrorMessage,
    itemTemplate,
    forceSelection = false,
  } = props;

  if (!visible) return null;
  return (
    <RotuloSeplag nome={label} cols={cols} obrigatorio={required}>
      <Controller
        name={name}
        control={control}
        rules={required ? { required: `${label} é obrigatório` } : undefined}
        render={({ field, fieldState }) => (
          <div className="flex flex-column">
            <AutoComplete
              id={field.name}
              value={field.value || ""}
              className={classNames({ "p-invalid": fieldState.error })}
              showEmptyMessage
              emptyMessage="Nenhum registro localizado"
              disabled={disabled}
              placeholder={placeholder}
              field={fieldLabel}
              suggestions={items}
              minLength={minLength}
              itemTemplate={itemTemplate}
              completeMethod={(e) => search?.(e.query)}
              onChange={(e) => field.onChange(e.target.value)}
              forceSelection={forceSelection}
            />

            {getFormErrorMessage(field.name)}
          </div>
        )}
      />
    </RotuloSeplag>
  );
}

export default SearchFieldSeplag;
