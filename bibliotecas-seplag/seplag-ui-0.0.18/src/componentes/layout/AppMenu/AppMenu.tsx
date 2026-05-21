import { useMemo } from "react";
import { AppSubmenuSeplag } from "../AppSubmenu/AppSubmenu";
import type { IMenuSeplag } from "../Config/menu";

export interface AppMenuSeplagProps {
  items: IMenuSeplag[];
  onMenuItemClick: (event: any) => void;
}

export const AppMenuSeplag = ({
  items,
  onMenuItemClick,
}: AppMenuSeplagProps) => {
  const filteredMenu = useMemo(() => {
    return items.filter((menuItem) => {
      return (
        !menuItem?.items || menuItem.items.some((el) => el?.visibleOnRouter)
      );
    });
  }, [items]);

  return (
    <div className="layout-menu-container" style={{ textAlign: "center" }}>
      <AppSubmenuSeplag
        items={filteredMenu}
        className="layout-menu"
        onMenuItemClick={onMenuItemClick}
        root={true}
      />
    </div>
  );
};
