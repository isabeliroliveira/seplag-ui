export interface UnsavedChangesContextValueSeplag {
  setDirty: (dirty: boolean) => void;
  guard: (action: () => void) => void;
}
