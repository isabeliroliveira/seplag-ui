import { BotaoChipSeplag } from "@componentes/Botao";
import { Tooltip } from "primereact/tooltip";
import React, { useId } from "react";

export interface BadgeSeplagProps {
  label: string;
  icon?: string;
  color: string;
  bg: string;
  border?: string;
  size?: "xs" | "sm" | "md";
  onClick?: () => void;
  active?: boolean;
  activeBg?: string;
  activeColor?: string;
  tooltip?: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
  minWidth?: string | number;
  maxWidth?: string | number;
  fontWeight?: boolean;
  textAlign?: "left" | "center" | "right";
  customStyle?: React.CSSProperties;
}

const SIZE_CLASS: Record<NonNullable<BadgeSeplagProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
};

const SIZE_PADDING: Record<NonNullable<BadgeSeplagProps["size"]>, string> = {
  xs: "1px 6px",
  sm: "3px 10px",
  md: "4px 14px",
};

export function BadgeSeplag({
  label,
  icon,
  color,
  bg,
  border,
  size = "sm",
  onClick,
  active = false,
  activeBg,
  activeColor = "#ffffff",
  tooltip,
  tooltipPosition = "top",
  minWidth,
  maxWidth,
  fontWeight,
  textAlign,
  customStyle,
}: Readonly<BadgeSeplagProps>) {
  const resolvedBorder = border ?? `${color}50`;
  const resolvedBg = active && activeBg ? activeBg : bg;
  const resolvedColor = active && activeBg ? activeColor : color;
  const resolvedBorderC = active && activeBg ? activeBg : resolvedBorder;

  const tooltipId = useId();

  const justifyContentMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  } as const;

  const style: React.CSSProperties = {
    padding: SIZE_PADDING[size],
    color: resolvedColor,
    backgroundColor: resolvedBg,
    border: `1px solid ${resolvedBorderC}`,
    whiteSpace: "nowrap",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: textAlign ? justifyContentMap[textAlign] : undefined,
    cursor: onClick ? "pointer" : "default",
    outline: "none",
    fontWeight: fontWeight ? 700 : 500,
    fontFamily: "inherit",
    minWidth,
    maxWidth,
    ...customStyle,
  };

  const className = [
    "align-items-center gap-1 border-round-3xl",
    SIZE_CLASS[size],
    "transition-all transition-duration-150",
  ].join(" ");

  if (onClick) {
    return (
      <BotaoChipSeplag
        className={className}
        style={style}
        onClick={onClick}
        tooltip={tooltip}
        tooltipOptions={tooltip ? { position: tooltipPosition } : undefined}
      >
        {icon && (
          <i
            className={icon}
            style={{
              display: "inline-flex",
              alignItems: "center",
              lineHeight: 1,
              marginTop: 2,
            }}
          />
        )}
        {label}
      </BotaoChipSeplag>
    );
  }

  const spanId = `badge-${tooltipId.replaceAll(":", "")}`;

  return (
    <>
      {tooltip && (
        <Tooltip
          target={`#${spanId}`}
          content={tooltip}
          position={tooltipPosition}
        />
      )}
      <span id={spanId} className={className} style={style}>
        {icon && (
          <i
            className={icon}
            style={{
              display: "inline-flex",
              alignItems: "center",
              lineHeight: 1,
              marginTop: 2,
            }}
          />
        )}
        {label}
      </span>
    </>
  );
}
