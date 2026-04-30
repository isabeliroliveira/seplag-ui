import { Button, type ButtonProps } from "primereact/button";
import { SEPLAG_PRIMARY } from "../../tokens/colors";

const baseBotaoStyle = {
  height: 40,
  minWidth: 120,
  borderRadius: 4,
  border: "0px",
};

const saveBotaoStyle = {
  ...baseBotaoStyle,
  color: "white",
  backgroundColor: SEPLAG_PRIMARY,
};

const backBotaoStyle = {
  ...baseBotaoStyle,
  color: SEPLAG_PRIMARY,
  backgroundColor: "white",
  borderColor: SEPLAG_PRIMARY,
};

const clearFilterBotaoStyle = {
  height: 40,
  minWidth: 146,
  borderRadius: 4,
  border: "0px",
  marginBottom: 8,
};

const iconBotaoStyle = {
  color: "white",
  fontSize: "0.8rem",
};

export type BotaoSeplagProps = ButtonProps & {
  label?: string;
  hasPermission?: boolean;
  variant?: "base" | "save" | "back" | "clear" | "icon";
};

type BotaoChipSeplagProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  type?: ButtonProps["type"];
};

const defaultTooltipOptions = { position: "top" } as any;

export function ButtonSeplag(props: BotaoSeplagProps) {
  const {
    variant = "base",
    hasPermission = true,
    style,
    label,
    icon,
    unstyled = false,
    tooltipOptions = defaultTooltipOptions,
    ...rest
  } = props as any;

  let mergedStyle;
  if (unstyled) {
    mergedStyle = style;
  } else {
    switch (variant) {
      case "save":
        mergedStyle = { ...saveBotaoStyle, ...style };
        break;
      case "back":
        mergedStyle = { ...backBotaoStyle, ...style };
        break;
      case "clear":
        mergedStyle = { ...clearFilterBotaoStyle, ...style };
        break;
      case "icon":
        mergedStyle = { ...iconBotaoStyle, ...style };
        break;
      default:
        mergedStyle = { ...baseBotaoStyle, ...style };
    }
  }

  if (!shouldRenderButton(hasPermission)) {
    return null;
  }

  return (
    <Button
      style={mergedStyle}
      label={label}
      icon={icon}
      unstyled={unstyled}
      tooltipOptions={tooltipOptions}
      {...(rest as ButtonProps)}
    />
  );
}

function shouldRenderButton(hasPermission?: boolean) {
  return hasPermission !== false;
}

export function BotaoChipSeplag({
  children,
  style,
  className,
  onClick,
  type = "button",
}: BotaoChipSeplagProps) {
  return (
    <ButtonSeplag
      unstyled
      type={type}
      style={style}
      className={className}
      onClick={onClick}
    >
      {children}
    </ButtonSeplag>
  );
}

export function BotaoAdicionarSeplag(props: BotaoSeplagProps) {
  return (
    <ButtonSeplag
      label="Adicionar"
      icon="pi pi-plus"
      iconPos="left"
      {...props}
    />
  );
}

export function BotaoSalvarSeplag(props: BotaoSeplagProps) {
  return (
    <ButtonSeplag
      variant="save"
      label={props.label ?? "Salvar"}
      icon="pi pi-save"
      iconPos="left"
      raised
      {...props}
    />
  );
}

export function BotaoVoltarSeplag(props: BotaoSeplagProps) {
  return (
    <ButtonSeplag
      variant="back"
      label={props.label ?? "Voltar"}
      icon="pi pi-arrow-left"
      iconPos="left"
      text
      raised
      type={props.type ?? "button"}
      {...props}
    />
  );
}

export function BotaoConsultarSeplag(props: BotaoSeplagProps) {
  return (
    <ButtonSeplag
      label={props.label ?? "Consultar"}
      icon="pi pi-search"
      iconPos="left"
      {...props}
    />
  );
}

export function BotaoIconSeplag(props: BotaoSeplagProps) {
  const { tooltipOptions = defaultTooltipOptions } = props as any;
  return (
    <ButtonSeplag variant="icon" tooltipOptions={tooltipOptions} {...props} />
  );
}

export function BotaoSeplag(props: BotaoSeplagProps) {
  return <ButtonSeplag {...props} />;
}

export function BotaoLimparFiltroSeplag(props: BotaoSeplagProps) {
  return <ButtonSeplag variant="clear" {...props} />;
}
