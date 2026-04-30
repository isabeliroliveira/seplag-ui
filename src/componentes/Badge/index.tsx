import { BotaoChipSeplag } from "@componentes/Botao"
import React from "react"

export interface BadgeSeplagProps {
  /** Texto exibido no badge */
  label: string
  /** Classe de ícone PrimeIcons (ex: "pi pi-clock") */
  icon?: string
  /** Cor principal: texto e borda */
  color: string
  /** Cor de fundo */
  bg: string
  /** Cor da borda (opcional — padrão: 30% opaco da cor principal) */
  border?: string
  /** Tamanho. Padrão: "sm" */
  size?: "xs" | "sm" | "md"
  /** Quando true, renderiza como <button> clicável */
  onClick?: () => void
  /** Marca o chip como ativo (aplica bg+color sólidos) — útil para filtros */
  active?: boolean
  /** Cor de fundo quando ativo */
  activeBg?: string
  /** Cor do texto quando ativo */
  activeColor?: string
}

const SIZE_CLASS: Record<NonNullable<BadgeSeplagProps["size"]>, string> = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
}

const SIZE_PADDING: Record<NonNullable<BadgeSeplagProps["size"]>, string> = {
  xs: "1px 6px",
  sm: "3px 10px",
  md: "4px 14px",
}

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
}: BadgeSeplagProps) {
  const resolvedBorder = border ?? `${color}50`
  const resolvedBg = active && activeBg ? activeBg : bg
  const resolvedColor = active && activeBg ? activeColor : color
  const resolvedBorderC = active && activeBg ? activeBg : resolvedBorder

  const style: React.CSSProperties = {
    padding: SIZE_PADDING[size],
    color: resolvedColor,
    backgroundColor: resolvedBg,
    border: `1px solid ${resolvedBorderC}`,
    whiteSpace: "nowrap",
    cursor: onClick ? "pointer" : "default",
    outline: "none",
    fontWeight: 500,
    fontFamily: "inherit",
  }

  const className = [
    "flex align-items-center gap-1 font-medium border-round-3xl",
    SIZE_CLASS[size],
    "transition-all transition-duration-150",
  ].join(" ")

  if (onClick) {
    return (
      <BotaoChipSeplag className={className} style={style} onClick={onClick}>
        {icon && <i className={icon} style={{ display: "inline-flex", alignItems: "center", lineHeight: 1, marginTop: 2 }} />}
        {label}
      </BotaoChipSeplag>
    )
  }

  return (
    <span className={className} style={style}>
      {icon && <i className={icon} style={{ display: "inline-flex", alignItems: "center", lineHeight: 1, marginTop: 2 }} />}
      {label}
    </span>
  )
}
