import type { CSSProperties, ReactNode } from "react";
import gridCss from "../../uteis/Grid";
import styles from "./style.module.css";

export interface RotuloSeplagProps {
  nome: string | ReactNode;
  children: ReactNode;
  cols?: string;
  horizontal?: boolean;
  obrigatorio?: boolean;
  htmlFor?: string;
  style?: CSSProperties;
  hidden?: boolean;
}

export const RotuloSeplag = (props: Readonly<RotuloSeplagProps>) => {
  const {
    nome,
    children,
    cols = "12",
    horizontal = false,
    obrigatorio = false,
    htmlFor,
    style,
    hidden = false,
  } = props;

  if (hidden) return null;

  const colClass = gridCss(cols);
  const wrapperClass = `${styles["content-rotulo"]} ${
    horizontal ? styles["rotulo-horizontal"] : styles["rotulo-vertical"]
  }`;

  return (
    <div
      className={colClass}
      style={style}
      aria-required={obrigatorio || undefined}
    >
      <div className={wrapperClass}>
        {htmlFor ? (
          <label
            className={`${styles["label-rotulo"]} col-fixed label-destaque`}
            htmlFor={htmlFor}
          >
            {nome}
            {obrigatorio && <span className={styles.obrigatorio}>*</span>}
          </label>
        ) : (
          <div className={`${styles["label-rotulo"]} col-fixed label-destaque`}>
            {nome}
            {obrigatorio && <span className={styles.obrigatorio}>*</span>}
          </div>
        )}

        <div className={`col ${styles.elemento}`}>{children}</div>
      </div>
    </div>
  );
};

export default RotuloSeplag;
