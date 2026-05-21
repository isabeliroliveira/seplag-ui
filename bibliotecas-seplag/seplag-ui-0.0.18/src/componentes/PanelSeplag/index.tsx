import type { ReactNode } from "react";
import gridCss from "../../uteis/Grid";

export interface PanelSeplagProps {
  cols?: string;

  title?: string;
  description?: string;
  gap?: string;
  className?: string;
  classNameHeader?: string;
  id?: string;
  children: ReactNode;
}

const PanelSeplag = ({
  cols,
  title,
  description,
  gap,
  className,
  classNameHeader,
  id,
  children,
}: PanelSeplagProps) => {
  const gapClass = gap ? `gap-${gap}` : "gap-2";

  return (
    <div id={id} className={gridCss(cols ?? "12")}>
      <div
        className={`flex flex-column border-1 border-300 border-round-sm p-2 ${gapClass} ${className ?? ""}`}
      >
        {(title || description) && (
          <div className={`flex flex-column ${classNameHeader ?? ""}`}>
            {title && (
              <strong className="label-rotulo label-destaque">{title}</strong>
            )}
            {description && <span className="text-sm">{description}</span>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export { PanelSeplag };
