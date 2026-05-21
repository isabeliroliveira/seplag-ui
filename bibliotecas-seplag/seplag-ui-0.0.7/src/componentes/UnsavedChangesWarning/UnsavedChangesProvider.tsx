import { BotaoSeplag } from "@componentes/Botao";
import ModalSeplag from "@componentes/Modal";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { SEPLAG_PRIMARY } from "../../tokens";
import { UnsavedChangesContextSeplag } from "./context";

const DEFAULT_MESSAGE: React.ReactNode =
  "Você possui alterações não salvas. Se sair agora, os dados serão perdidos.";

interface PendingNav {
  state: unknown;
  title: string;
  url?: string | URL | null;
}

interface UnsavedChangesGuard {
  guard: (action: () => void) => void;
  Modal: React.ReactElement;
}

/**
 * Hook interno que intercepta navegação e renderiza o Modal.
 */
function useUnsavedChangesGuardSeplag(
  isDirty: boolean,
  message = DEFAULT_MESSAGE,
): UnsavedChangesGuard {
  const [visible, setVisible] = useState(false);
  const pendingNavRef = useRef<PendingNav | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);

  const isAllowedRef = useRef(false);
  const origPushStateRef = useRef(
    globalThis.history.pushState.bind(globalThis.history),
  );
  const origReplaceStateRef = useRef(
    globalThis.history.replaceState.bind(globalThis.history),
  );

  // Fallback caso a interceptação de navegação falhe por algum motivo.
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    if (isDirty) globalThis.addEventListener("beforeunload", handler);
    return () => globalThis.removeEventListener("beforeunload", handler);
  }, [isDirty, message]);

  useEffect(() => {
    if (!isDirty) return;

    origPushStateRef.current = globalThis.history.pushState.bind(
      globalThis.history,
    );
    origReplaceStateRef.current = globalThis.history.replaceState.bind(
      globalThis.history,
    );

    const makeInterceptor =
      (orig: typeof globalThis.history.pushState) =>
      (state: unknown, title: string, url?: string | URL | null) => {
        if (isAllowedRef.current) {
          orig(state, title, url);
          return;
        }

        const targetPath = url
          ? new URL(url.toString(), globalThis.location.href).pathname
          : globalThis.location.pathname;

        if (targetPath === globalThis.location.pathname) {
          orig(state, title, url);
          return;
        }

        pendingNavRef.current = { state, title, url };
        pendingActionRef.current = null;
        setVisible(true);
      };

    globalThis.history.pushState = makeInterceptor(origPushStateRef.current);
    globalThis.history.replaceState = makeInterceptor(
      origReplaceStateRef.current,
    );

    const onPopState = () => {
      if (isAllowedRef.current) return;
      origPushStateRef.current(
        globalThis.history.state,
        "",
        globalThis.location.href,
      );
      pendingNavRef.current = null;
      pendingActionRef.current = null;
      setVisible(true);
    };

    globalThis.addEventListener("popstate", onPopState);

    return () => {
      globalThis.history.pushState = origPushStateRef.current;
      globalThis.history.replaceState = origReplaceStateRef.current;
      globalThis.removeEventListener("popstate", onPopState);
    };
  }, [isDirty]);

  const guard = (action: () => void) => {
    if (!isDirty) {
      action();
      return;
    }
    pendingActionRef.current = action;
    pendingNavRef.current = null;
    setVisible(true);
  };

  const stay = () => {
    setVisible(false);
    pendingNavRef.current = null;
    pendingActionRef.current = null;
  };

  const leave = () => {
    const action = pendingActionRef.current;
    const pending = pendingNavRef.current;
    pendingActionRef.current = null;
    pendingNavRef.current = null;
    setVisible(false);

    if (action) {
      action();
    } else if (pending) {
      isAllowedRef.current = true;
      origPushStateRef.current(pending.state, pending.title, pending.url);
      globalThis.dispatchEvent(
        new PopStateEvent("popstate", { state: pending.state }),
      );
      setTimeout(() => {
        isAllowedRef.current = false;
      }, 0);
    } else {
      isAllowedRef.current = true;
      globalThis.history.go(-1);
      setTimeout(() => {
        isAllowedRef.current = false;
      }, 0);
    }
  };

  const customFooter = (
    <div className="modalSeplag-botoes-footer modalSeplag-botoes-footer-right">
      <BotaoSeplag
        label="Sim"
        onClick={leave}
        style={{
          color: SEPLAG_PRIMARY,
          backgroundColor: "white",
          border: `1px solid ${SEPLAG_PRIMARY}`,
          minWidth: 120,
        }}
      />
      <BotaoSeplag
        label="Cancelar"
        onClick={stay}
        style={{ minWidth: 120 }}
        autoFocus
      />
    </div>
  );

  const Modal = (
    <ModalSeplag
      visible={visible}
      titulo="Alterações não salvas"
      fechar={stay}
      customFooter={customFooter}
      alignFooter="right"
    >
      <div>
        {message}
        <p>Deseja continuar?</p>
      </div>
    </ModalSeplag>
  );

  return { guard, Modal };
}

/**
 * @example
 * <UnsavedChangesProvider>
 *   <AppRouter />
 * </UnsavedChangesProvider>
 */
export function UnsavedChangesProviderSeplag({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isDirty, setIsDirty] = useState(false);
  const { guard, Modal } = useUnsavedChangesGuardSeplag(isDirty);

  const contextValue = useMemo(
    () => ({ setDirty: setIsDirty, guard }),
    [guard],
  );

  return (
    <UnsavedChangesContextSeplag.Provider value={contextValue}>
      {Modal}
      {children}
    </UnsavedChangesContextSeplag.Provider>
  );
}
