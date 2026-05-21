import { useContext, useEffect } from "react";
import { UnsavedChangesContextSeplag } from "./context";
import type { UnsavedChangesContextValueSeplag } from "./types";

export function useUnsavedChangesSeplag(): UnsavedChangesContextValueSeplag {
  const context = useContext(UnsavedChangesContextSeplag);
  if (!context) {
    throw new Error(
      "useUnsavedChanges deve ser usado dentro de um <UnsavedChangesProvider>.",
    );
  }
  return context;
}

export function useUnsavedChangesSyncSeplag(isDirty: boolean): void {
  const { setDirty } = useUnsavedChangesSeplag();

  useEffect(() => {
    setDirty(isDirty);
    return () => setDirty(false);
  }, [isDirty, setDirty]);
}
