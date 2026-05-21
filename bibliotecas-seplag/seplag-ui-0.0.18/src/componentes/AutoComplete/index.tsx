import { AutoComplete, type AutoCompleteProps } from "primereact/autocomplete";
import { classNames } from "primereact/utils";

type SeplagAutoCompleteVisualSize = "sm" | "md" | "lg";

const INPUT_SIZE_CLASS: Record<SeplagAutoCompleteVisualSize, string | undefined> = {
  sm: "p-inputtext-sm",
  md: undefined,
  lg: "p-inputtext-lg",
};

const DROPDOWN_BUTTON_SIZE_CLASS: Record<SeplagAutoCompleteVisualSize, string | undefined> = {
  sm: "p-button-sm",
  md: undefined,
  lg: "p-button-lg",
};

type SeplagAutoCompleteChangeEvent<T = any, M extends boolean = false> =
  Parameters<NonNullable<AutoCompleteProps<T, M>["onChange"]>>[0];

export interface SeplagAutoCompleteProps<T = any, M extends boolean = false>
  extends Omit<AutoCompleteProps<T, M>, "completeMethod"> {
  completeMethod?: (query: string) => void | Promise<void>;
  componentSize?: SeplagAutoCompleteVisualSize;
  helpText?: React.ReactNode;
  minWidth?: React.CSSProperties["minWidth"];
  maxRenderedItems?: number;
}

export function SeplagAutoComplete<T = any, M extends boolean = false>({
  completeMethod,
  componentSize = "md",
  helpText,
  maxRenderedItems = 50,
  minWidth,
  onChange,
  ...props
}: Readonly<SeplagAutoCompleteProps<T, M>>) {
  const hasFullWidthClass = props.className?.split(" ").includes("w-full");
  const resolvedMaxRenderedItems = Math.max(0, maxRenderedItems);
  const inputSizeClass = INPUT_SIZE_CLASS[componentSize];
  const dropdownButtonSizeClass = DROPDOWN_BUTTON_SIZE_CLASS[componentSize];
  const hasSelectedObjectValue =
    !props.multiple && typeof props.value === "object" && props.value !== null;
  const shouldShowClearSelection = hasSelectedObjectValue && !props.disabled;
  const limitedSuggestions = props.suggestions?.slice(0, resolvedMaxRenderedItems);
  const wrapperWidth = props.style?.width ?? (hasFullWidthClass ? "100%" : undefined);

  const emitChange = (event: SeplagAutoCompleteChangeEvent<T, M>) => {
    onChange?.(event);
  };

  const handleChange: AutoCompleteProps<T, M>["onChange"] = (event) => {
    emitChange(event);
  };

  const handleComplete: AutoCompleteProps<T, M>["completeMethod"] = (event) => {
    void completeMethod?.(event.query);
  };

  const handleClearSelection = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clearedValue = null as any;

    emitChange({
      originalEvent: event,
      value: clearedValue,
      stopPropagation: () => event.stopPropagation(),
      preventDefault: () => event.preventDefault(),
      target: {
        name: props.name ?? "",
        id: props.inputId ?? props.id ?? "",
        value: clearedValue,
      },
    });

    props.onClear?.(event);
  };

  return (
    <div
      style={{
        display: wrapperWidth ? "block" : "inline-flex",
        flexDirection: "column",
        width: wrapperWidth,
        minWidth: minWidth ?? props.style?.minWidth,
      }}
    >
      <span
        style={{
          position: "relative",
          display: wrapperWidth ? "block" : "inline-flex",
          width: wrapperWidth,
          minWidth: minWidth ?? props.style?.minWidth,
        }}
      >
        <AutoComplete
          {...props}
          className={classNames(props.className, inputSizeClass)}
          delay={props.delay ?? 0}
          minLength={props.minLength ?? 0}
          suggestions={limitedSuggestions}
          style={{
            ...props.style,
            minWidth: minWidth ?? props.style?.minWidth,
            width: wrapperWidth ?? props.style?.width,
          }}
          dropdownIcon={props.dropdownIcon ?? "pi pi-search"}
          pt={{
            ...props.pt,
            dropdownButton: {
              ...props.pt?.dropdownButton,
              root: {
                ...(typeof props.pt?.dropdownButton?.root === "object"
                  ? props.pt.dropdownButton.root
                  : undefined),
                className: classNames(
                  typeof props.pt?.dropdownButton?.root === "object"
                    ? props.pt.dropdownButton.root?.className
                    : undefined,
                  dropdownButtonSizeClass,
                ),
              },
            },
          }}
          onChange={handleChange}
          completeMethod={handleComplete}
        />
        {shouldShowClearSelection && (
          <button
            type="button"
            aria-label="Limpar seleção"
            title="Limpar seleção"
            onClick={handleClearSelection}
            style={{
              position: "absolute",
              margin: "auto 0px",
              right: "2.75rem",
              bottom: "calc(50% - 0.5rem)",
              width: "1rem",
              height: "1rem",
              padding: "0px",
              border: "0px",
              background: "transparent",
              color: "rgb(107, 114, 128)",
              cursor: "pointer",
              zIndex: 1,
            }}
          >
            <i className="pi pi-times" style={{ fontSize: "0.875rem" }} />
          </button>
        )}
      </span>

      {helpText ? (
        <small className="text-600 mt-2 block">{helpText}</small>
      ) : null}
    </div>
  );
}

export default SeplagAutoComplete;