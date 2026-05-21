// @vitest-environment jsdom

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SeplagAutoComplete } from "./index";

vi.mock("primereact/utils", () => ({
  classNames: (...values: Array<string | undefined | null | false>) =>
    values.filter(Boolean).join(" "),
}));

vi.mock("primereact/autocomplete", async () => {
  const React = await import("react");

  type MockAutoCompleteProps = {
    value?: string;
    suggestions?: unknown[];
    showEmptyMessage?: boolean;
    emptyMessage?: string;
    onChange?: (event: { originalEvent: React.ChangeEvent<HTMLInputElement>; value: string }) => void;
    completeMethod?: (event: { originalEvent: Event; query: string }) => void;
  };

  const MockAutoComplete = ({
    value = "",
    suggestions = [],
    showEmptyMessage,
    emptyMessage,
    onChange,
    completeMethod,
  }: MockAutoCompleteProps) => {
    const [searching, setSearching] = React.useState(false);

    React.useEffect(() => {
      if (searching) {
        setSearching(false);
      }
    }, [searching, suggestions]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.({ originalEvent: event, value: event.target.value });

      setTimeout(() => {
        setSearching(true);
        completeMethod?.({
          originalEvent: new Event("input"),
          query: event.target.value,
        });
      }, 0);
    };

    return (
      <div>
        <input aria-label="autocomplete" value={value} onChange={handleInputChange} />
        {searching ? <span>loading</span> : null}
        {!searching && showEmptyMessage && suggestions.length === 0 ? (
          <span>{emptyMessage}</span>
        ) : null}
      </div>
    );
  };

  return { AutoComplete: MockAutoComplete };
});

function Harness() {
  const [value, setValue] = React.useState("");
  const [suggestions, setSuggestions] = React.useState<string[]>(["Ana"]);

  const handleComplete = (query: string) => {
    setSuggestions(query === "zzz" ? [] : ["Ana"]);
  };

  return (
    <SeplagAutoComplete
      value={value}
      suggestions={suggestions}
      completeMethod={handleComplete}
      onChange={(event) => setValue((event.value as string) ?? "")}
      emptyMessage="Nenhum registro localizado"
      showEmptyMessage
    />
  );
}

describe("SeplagAutoComplete", () => {
  it("mostra emptyMessage quando a busca digitada retorna vazio", async () => {
    const user = userEvent.setup();

    render(<Harness />);

    await user.clear(screen.getByRole("textbox", { name: "autocomplete" }));
    await user.type(screen.getByRole("textbox", { name: "autocomplete" }), "zzz");

    await waitFor(() => {
      expect(screen.queryByText("loading")).toBeNull();
      expect(screen.getByText("Nenhum registro localizado")).not.toBeNull();
    });
  });
});