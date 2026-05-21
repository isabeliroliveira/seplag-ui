import React, { useRef, useMemo } from "react";
import { Toast } from "primereact/toast";
import { ContextToastSeplag } from "./ToastContext";

interface ToastProviderSeplagProps {
  readonly children: React.ReactNode;
}

export function ToastProviderSeplag({ children }: ToastProviderSeplagProps) {
  const toast = useRef<Toast>(null);

  const contextValue = useMemo(() => ({ toastRef: toast }), []);

  return (
    <ContextToastSeplag.Provider value={contextValue}>
      <Toast ref={toast} />
      {children}
    </ContextToastSeplag.Provider>
  );
}

export default ToastProviderSeplag;
