import React, { type ReactNode, useMemo, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { TbGridDots } from "react-icons/tb";

import styles from "./style.module.css";

export type AppLinkTargetSeplag = "_self" | "_blank";

export interface AppSystemItemSeplag {
  id: string;
  label: string;
  url: string;
  target?: AppLinkTargetSeplag;
  icon?: string | ReactNode;
}

export interface AppSwitcherSeplagProps {
  currentSystem?: string;
  items: AppSystemItemSeplag[];
  className?: string;
}

export const AppSwitcherSeplag = ({
  currentSystem,
  items,
  className,
}: AppSwitcherSeplagProps) => {
  const opRef = useRef<OverlayPanel>(null);

  const normalized = useMemo(() => {
    return (items ?? []).filter((x) => x?.id && x?.label && x?.url).slice();
  }, [items]);

  function open(e: React.MouseEvent) {
    opRef.current?.toggle(e);
  }

  function goTo(item: AppSystemItemSeplag) {
    opRef.current?.hide();

    const target = item.target ?? "_self";
    if (target === "_blank") {
      globalThis.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      globalThis.location.assign(item.url);
    }
  }

  return (
    <div className={`${styles["app-switcher"]} ${className ?? ""}`}>
      <Button
        type="button"
        className={`${styles["app-switcher__btn"]}`}
        icon={<TbGridDots size={32} />}
        tooltipOptions={{ position: "bottom" }}
        onClick={open}
      />

      <OverlayPanel
        ref={opRef}
        className={styles["app-switcher__panel"]}
        dismissable
        appendTo={document.body}
      >
        <div className={styles["app-switcher__grid"]} role="menu">
          {normalized.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles["app-switcher__item"]} ${item.label === currentSystem ? styles["app-switcher__item_selected"] : ""}`}
              onClick={() => goTo(item)}
            >
              <div className={styles["app-switcher__iconWrap"]}>
                {typeof item.icon === "string" ? (
                  <i
                    className={`${styles["app-switcher__img"]} ${item.icon}`}
                  />
                ) : (
                  item.icon
                )}
              </div>
              <div className={styles["app-switcher__label"]}>{item.label}</div>
            </button>
          ))}
        </div>
      </OverlayPanel>
    </div>
  );
};
