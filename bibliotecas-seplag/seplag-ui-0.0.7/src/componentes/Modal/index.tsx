import { useCallback, useMemo, type ReactNode } from "react";
import { Dialog } from "primereact/dialog";
import { BotaoVoltarSeplag, BotaoSalvarSeplag } from "../Botao";
import styles from "./style.module.css";

export interface ModalSeplagProps {
  visible: boolean;
  isSubmit?: boolean;
  titulo?: string;
  children: ReactNode;
  funcAcao?: () => void;
  fechar: () => void;
  labelFechar?: string;
  labelAcao?: string;
  iconAcao?: string;
  iconFechar?: string;
  tamanho?: string;
  altura?: string;
  draggable?: boolean;
  customFooter?: ReactNode;
  ariaLabel?: string;
  closeOnEscape?: boolean;
  alignFooter?: "left" | "right";
  hideFooter?: boolean;
}

export const ModalSeplag = (props: Readonly<ModalSeplagProps>) => {
  const {
    visible,
    isSubmit = false,
    titulo,
    children,
    funcAcao,
    fechar,
    labelFechar = "Fechar",
    labelAcao = "Enviar",
    iconAcao = "pi pi-check",
    iconFechar = "pi pi-times",
    tamanho,
    altura,
    draggable = false,
    customFooter,
    alignFooter = "right",
    hideFooter = false,
    ariaLabel,
    closeOnEscape = true,
  } = props;

  const handleClose = useCallback(() => fechar(), [fechar]);
  const handleAction = useCallback(() => funcAcao?.(), [funcAcao]);

  const footerClassName = useMemo(
    () =>
      [
        styles["modalSeplag-botoes-footer"],
        alignFooter === "right"
          ? styles["modalSeplag-botoes-footer-right"]
          : "",
      ]
        .filter(Boolean)
        .join(" "),
    [alignFooter],
  );

  const dialogStyle = useMemo(
    () => ({
      width: tamanho ?? "auto",
      height: altura ?? "auto",
    }),
    [tamanho, altura],
  );

  const resolvedAriaLabel = ariaLabel?.trim() || titulo || "Modal";

  const footerContent = useMemo(() => {
    if (hideFooter) return undefined;
    if (customFooter) return customFooter;

    return (
      <div className={footerClassName}>
        <BotaoVoltarSeplag
          label={labelFechar}
          icon={iconFechar}
          onClick={handleClose}
          className={`p-button-outlined p-button-danger ${styles["margin-app-entre-button"]}`}
          type="button"
        />
        <BotaoSalvarSeplag
          label={labelAcao}
          icon={iconAcao}
          onClick={handleAction}
          autoFocus
          className={`p-button-raised ${styles["margin-app-entre-button"]}`}
          type={isSubmit ? "submit" : "button"}
        />
      </div>
    );
  }, [
    hideFooter,
    customFooter,
    footerClassName,
    labelFechar,
    iconFechar,
    labelAcao,
    iconAcao,
    isSubmit,
    handleClose,
    handleAction,
  ]);

  return (
    <Dialog
      header={titulo}
      footer={footerContent}
      visible={visible}
      style={dialogStyle}
      modal
      onHide={handleClose}
      contentStyle={{ flex: 1 }}
      draggable={draggable}
      aria-label={resolvedAriaLabel}
      closeOnEscape={closeOnEscape}
    >
      <div
        className={`${styles["margin-superior-simples"]} ${styles["quebrar-texto"]} ${styles["modalSeplag-wrapper"]}`}
      >
        <div className="grid p-fluid">{children}</div>
      </div>
    </Dialog>
  );
};

export default ModalSeplag;
