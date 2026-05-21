import React from "react";
import {
  AppSwitcherSeplag,
  type AppSystemItemSeplag,
} from "@componentes/layout/AppSwitcher";
import styles from "./AppTopbar.module.css";

export interface AppTopbarSeplagProps {
  isSidebarVisible: boolean;
  onToggleMenu: (event: React.MouseEvent) => void;
  nomeSistema: string;
  ambienteSistema: string;
  systemas: AppSystemItemSeplag[];
}
export const AppTopbarSeplag = (props: AppTopbarSeplagProps) => {
  return (
    <div className={styles["layout-topbar"]}>
      <button
        type="button"
        className={`${styles["layout-menu-button"]} ${styles["menu-link"]}`}
        onClick={props.onToggleMenu}
        aria-label={props.isSidebarVisible ? "Fechar menu" : "Abrir menu"}
      >
        <div
          className={[
            styles["menu-btn"],
            props.isSidebarVisible ? styles.open : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <div className={styles["menu-burger"]} />
        </div>
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{ fontSize: "18px", fontWeight: 600, marginRight: "10px" }}
        >
          {props.nomeSistema} - {props.ambienteSistema}
        </span>
        <AppSwitcherSeplag
          items={props.systemas}
          currentSystem={props.nomeSistema}
        />
      </div>
    </div>
  );
};
