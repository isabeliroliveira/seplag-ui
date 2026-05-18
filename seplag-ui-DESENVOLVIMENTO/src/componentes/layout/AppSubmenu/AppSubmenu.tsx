import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import type { IMenuSeplag } from "../Config/menu";
import { AppSubmenuItemSeplag } from "../AppSubmenuItem/AppSubmenuItem";

interface AppSubmenuSeplagProps {
  onMenuItemClick: (event: { originalEvent: any; item: IMenuSeplag[] }) => void;
  items: IMenuSeplag[] | null | undefined;
  root?: boolean;
  className?: string;
}
export function AppSubmenuSeplag(props: AppSubmenuSeplagProps) {
  const [activeMenu, setActiveMenu] = useState<IMenuSeplag | null>(null);
  const location = useLocation();
  const visibleItems = props.items?.filter(
    (item) => item.visibleOnMenu !== false && item.label !== null,
  );

  const isRouteActive = (target?: string) => {
    if (!target || target === "#") {
      return false;
    }

    const normalize = (value: string) =>
      value.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
    const escapeRegExp = (value: string) =>
      [
        "\\",
        ".",
        "*",
        "+",
        "?",
        "^",
        "$",
        "{",
        "}",
        "(",
        ")",
        "|",
        "[",
        "]",
      ].reduce((result, char) => {
        const replacement = char === "\\" ? String.raw`\\` : `\\${char}`;
        return result.replaceAll(char, replacement);
      }, value);
    const toRoutePattern = (value: string) => {
      const normalized = normalize(value);
      const pattern = normalized
        .split("/")
        .map((segment) =>
          segment.startsWith(":") ? "[^/]+" : escapeRegExp(segment),
        )
        .join("/");

      return new RegExp(`^${pattern}$`);
    };

    const currentPath = normalize(location.pathname);
    const targetPath = normalize(target);

    return (
      currentPath === targetPath ||
      currentPath.startsWith(`${targetPath}/`) ||
      toRoutePattern(targetPath).test(currentPath)
    );
  };

  const hasActiveRoute = (item: IMenuSeplag): boolean => {
    if (isRouteActive(item.to)) {
      return true;
    }

    return item.items?.some((child) => hasActiveRoute(child)) ?? false;
  };

  const onMenuItemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    item: IMenuSeplag,
  ) => {
    if (item.disabled) {
      event.preventDefault();
      return true;
    }

    if (activeMenu?.label === item.label) {
      setActiveMenu(null);
    } else {
      setActiveMenu(item);
    }
  };

  const items = visibleItems?.map((item, i) => {
    const active = activeMenu?.label === item.label || hasActiveRoute(item);
    const styleClass = [
      item.badgeStyleClass,
      active && !item.to ? "active-menuitem" : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <AppSubmenuItemSeplag
        key={item.label + "_" + i}
        className={styleClass}
        item={item}
        onMenuClick={props.onMenuItemClick}
        onMenuItemClick={onMenuItemClick}
        active={active}
        root={props.root}
      />
    );
  });

  return items ? <ul className={props.className}>{items}</ul> : null;
}
