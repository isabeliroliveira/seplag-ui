import { useState } from "react";
import {
  DocPage,
  PlaygroundCode,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { BadgeSeplag } from "@componentes/Badge";
import "primereact/resources/themes/lara-light-blue/theme.css";

// ---------------------------------------------------------------------------
// Playground interativo
// ---------------------------------------------------------------------------

const SIZE_OPTIONS = ["xs", "sm", "md"] as const;
const ICON_OPTIONS = [
  { label: "Nenhum", value: "" },
  { label: "pi-clock", value: "pi pi-clock" },
  { label: "pi-check-circle", value: "pi pi-check-circle" },
  { label: "pi-times-circle", value: "pi pi-times-circle" },
  { label: "pi-exclamation-triangle", value: "pi pi-exclamation-triangle" },
  { label: "pi-info-circle", value: "pi pi-info-circle" },
  { label: "pi-tag", value: "pi pi-tag" },
  { label: "pi-user", value: "pi pi-user" },
  { label: "pi-calendar", value: "pi pi-calendar" },
  { label: "pi-star", value: "pi pi-star" },
];

const PRESET_COLORS = [
  { label: "Azul", color: "#1351b4", bg: "#dce9f5" },
  { label: "Verde", color: "#168821", bg: "#d4edda" },
  { label: "Vermelho", color: "#c0392b", bg: "#fde8e6" },
  { label: "Amarelo", color: "#b07d00", bg: "#fff3cd" },
  { label: "Cinza", color: "#555770", bg: "#e8e8ef" },
  { label: "Roxo", color: "#7b2d8b", bg: "#f3e5f5" },
];

function BadgePlayground() {
  const [label, setLabel] = useState("Em andamento");
  const [icon, setIcon] = useState("pi pi-clock");
  const [customIcon, setCustomIcon] = useState("");
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>("sm");
  const [presetIdx, setPresetIdx] = useState(0);
  const [active, setActive] = useState(false);
  const [clickable, setClickable] = useState(false);
  const [tooltip, setTooltip] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState<"top" | "bottom" | "left" | "right">("top");
  const [minWidth, setMinWidth] = useState("");
  const [maxWidth, setMaxWidth] = useState("");
  const [bold, setBold] = useState(false);
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right" | "">("");
  const [customStyleInput, setCustomStyleInput] = useState("");

  const TOOLTIP_POSITIONS = ["top", "bottom", "left", "right"] as const;

  const preset = PRESET_COLORS[presetIdx];
  const resolvedIcon = customIcon || icon || "";

  let customStyle: React.CSSProperties | undefined;
  try {
    customStyle = customStyleInput ? JSON.parse(customStyleInput) : undefined;
  } catch {
    customStyle = undefined;
  }

  const propsCode = [
    `label="${label}"`,
    resolvedIcon ? `icon="${resolvedIcon}"` : "",
    `color="${preset.color}"`,
    `bg="${preset.bg}"`,
    size !== "sm" ? `size="${size}"` : "",
    active ? "active" : "",
    active ? `activeBg="${preset.color}"` : "",
    clickable ? `onClick={() => alert("clicado!")}` : "",
    tooltip ? `tooltip="${tooltip}"` : "",
    tooltip && tooltipPosition !== "top" ? `tooltipPosition="${tooltipPosition}"` : "",
    minWidth ? `minWidth="${minWidth}"` : "",
    maxWidth ? `maxWidth="${maxWidth}"` : "",
    bold ? "fontWeight" : "",
    textAlign ? `textAlign="${textAlign}"` : "",
    customStyleInput ? `customStyle={${customStyleInput}}` : "",
  ]
    .filter(Boolean)
    .join("\n  ");

  const generatedCode = `import { BadgeSeplag } from "@seplag/ui-lib-react-18";\n\n<BadgeSeplag\n  ${propsCode}\n/>`;

  return (
    <div className="botao-playground">
      {/* Preview */}
      <div className="botao-playground-preview">
        <BadgeSeplag
          label={label}
          icon={resolvedIcon || undefined}
          color={preset.color}
          bg={preset.bg}
          size={size}
          active={active}
          activeBg={active ? preset.color : undefined}
          onClick={clickable ? () => undefined : undefined}
          tooltip={tooltip || undefined}
          tooltipPosition={tooltipPosition}
          minWidth={minWidth || undefined}
          maxWidth={maxWidth || undefined}
          fontWeight={bold}
          textAlign={textAlign || undefined}
          customStyle={customStyle}
        />
      </div>

      {/* Controles */}
      <div className="botao-playground-controls">
        {/* Label */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-label">
            label
          </label>
          <input
            id="pg-badge-label"
            className="pg-input"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Texto do badge"
          />
        </div>

        {/* Icon */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-icon">
            icon
          </label>
          <select
            id="pg-badge-icon"
            className="pg-select"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          >
            {ICON_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Icon */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-custom-icon">
            icon customizado
          </label>
          <input
            id="pg-badge-custom-icon"
            className="pg-input"
            type="text"
            value={customIcon}
            onChange={(e) => setCustomIcon(e.target.value)}
            placeholder="ex: fa-solid fa-check"
          />
        </div>

        {/* Cor */}
        <div className="pg-field">
          <span className="pg-label">cor</span>
          <div className="pg-radio-group">
            {PRESET_COLORS.map((p, i) => (
              <label
                key={p.label}
                className={`pg-radio-btn${presetIdx === i ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name="badge-color"
                  checked={presetIdx === i}
                  onChange={() => setPresetIdx(i)}
                />
                {p.label}
              </label>
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="pg-field">
          <span className="pg-label">size</span>
          <div className="pg-radio-group">
            {SIZE_OPTIONS.map((s) => (
              <label
                key={s}
                className={`pg-radio-btn${size === s ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name="badge-size"
                  value={s}
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
                {s}
              </label>
            ))}
          </div>
        </div>

        {/* Booleanos */}
        <div className="pg-field">
          <span className="pg-label">modificadores</span>
          <div className="pg-checkbox-group">
            {(
              [
                ["active", active, setActive],
                ["clickable (onClick)", clickable, setClickable],
                ["bold (fontWeight)", bold, setBold],
              ] as [string, boolean, (v: boolean) => void][]
            ).map(([name, val, setter]) => (
              <label
                key={name}
                className={`pg-checkbox-btn${val ? " selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={val}
                  onChange={(e) => setter(e.target.checked)}
                />
                {name}
              </label>
            ))}
          </div>
        </div>

        {/* Dimensões */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-minwidth">
            minWidth
          </label>
          <input
            id="pg-badge-minwidth"
            className="pg-input"
            type="text"
            value={minWidth}
            onChange={(e) => setMinWidth(e.target.value)}
            placeholder="ex: 100px ou 10rem"
          />
        </div>

        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-maxwidth">
            maxWidth
          </label>
          <input
            id="pg-badge-maxwidth"
            className="pg-input"
            type="text"
            value={maxWidth}
            onChange={(e) => setMaxWidth(e.target.value)}
            placeholder="ex: 200px ou 20rem"
          />
        </div>

        {/* Text Align */}
        <div className="pg-field">
          <span className="pg-label">textAlign</span>
          <div className="pg-radio-group">
            {(["left", "center", "right", ""] as const).map((align) => (
              <label
                key={align || "none"}
                className={`pg-radio-btn${textAlign === align ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name="badge-align"
                  checked={textAlign === align}
                  onChange={() => setTextAlign(align)}
                />
                {align || "padrão"}
              </label>
            ))}
          </div>
        </div>
        {/* Tooltip */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-tooltip">
            tooltip
          </label>
          <input
            id="pg-badge-tooltip"
            className="pg-input"
            type="text"
            value={tooltip}
            onChange={(e) => setTooltip(e.target.value)}
            placeholder="Texto do tooltip"
          />
        </div>

        {tooltip && (
          <div className="pg-field">
            <span className="pg-label">tooltipPosition</span>
            <div className="pg-radio-group">
              {TOOLTIP_POSITIONS.map((p) => (
                <label
                  key={p}
                  className={`pg-radio-btn${tooltipPosition === p ? " selected" : ""}`}
                >
                  <input
                    type="radio"
                    name="badge-tooltip-pos"
                    value={p}
                    checked={tooltipPosition === p}
                    onChange={() => setTooltipPosition(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Custom Style */}
        <div className="pg-field">
          <label className="pg-label" htmlFor="pg-badge-customstyle">
            customStyle (JSON)
          </label>
          <textarea
            id="pg-badge-customstyle"
            className="pg-input"
            style={{ minHeight: "80px", fontFamily: "monospace", fontSize: "12px" }}
            value={customStyleInput}
            onChange={(e) => setCustomStyleInput(e.target.value)}
            placeholder={`{"borderRadius": "8px", "padding": "10px 20px"}`}
          />
        </div>
      </div>

      {/* Código gerado */}
      <PlaygroundCode code={generatedCode} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Seções
// ---------------------------------------------------------------------------

const sections: DocSection[] = [
  {
    title: "Playground",
    description:
      "Monte o badge escolhendo as props ao vivo. O código gerado é atualizado automaticamente.",
    example: <BadgePlayground />,
    code: `// Use o playground acima para gerar o código do seu badge`,
  },
  {
    title: "Variações de cor",
    description: "Use color + bg para compor qualquer esquema de cores.",
    example: (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <BadgeSeplag label="Ativo" color="#168821" bg="#d4edda" />
        <BadgeSeplag label="Inativo" color="#c0392b" bg="#fde8e6" />
        <BadgeSeplag label="Pendente" icon="pi pi-clock" color="#b07d00" bg="#fff3cd" />
        <BadgeSeplag label="Análise" icon="pi pi-info-circle" color="#1351b4" bg="#dce9f5" />
        <BadgeSeplag label="Cancelado" color="#555770" bg="#e8e8ef" />
      </div>
    ),
    code: `<BadgeSeplag label="Ativo" color="#168821" bg="#d4edda" />
<BadgeSeplag label="Inativo" color="#c0392b" bg="#fde8e6" />
<BadgeSeplag label="Pendente" icon="pi pi-clock" color="#b07d00" bg="#fff3cd" />
<BadgeSeplag label="Análise" icon="pi pi-info-circle" color="#1351b4" bg="#dce9f5" />
<BadgeSeplag label="Cancelado" color="#555770" bg="#e8e8ef" />`,
  },
  {
    title: "Tamanhos",
    description: "Três tamanhos disponíveis: xs, sm (padrão) e md.",
    example: (
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <BadgeSeplag label="xs" size="xs" color="#1351b4" bg="#dce9f5" />
        <BadgeSeplag label="sm" size="sm" color="#1351b4" bg="#dce9f5" />
        <BadgeSeplag label="md" size="md" color="#1351b4" bg="#dce9f5" />
      </div>
    ),
    code: `<BadgeSeplag label="xs" size="xs" color="#1351b4" bg="#dce9f5" />
<BadgeSeplag label="sm" size="sm" color="#1351b4" bg="#dce9f5" />
<BadgeSeplag label="md" size="md" color="#1351b4" bg="#dce9f5" />`,
  },
  {
    title: "Estado ativo",
    description:
      "Quando active=true, aplica activeBg como fundo sólido e activeColor como cor do texto. Útil para filtros selecionados.",
    example: (
      <div style={{ display: "flex", gap: 8 }}>
        <BadgeSeplag
          label="Inativo"
          color="#1351b4"
          bg="#dce9f5"
          activeBg="#1351b4"
          active={false}
        />
        <BadgeSeplag
          label="Ativo"
          color="#1351b4"
          bg="#dce9f5"
          activeBg="#1351b4"
          active={true}
        />
      </div>
    ),
    code: `{/* Inativo */}
<BadgeSeplag label="Inativo" color="#1351b4" bg="#dce9f5" activeBg="#1351b4" active={false} />

{/* Ativo — fundo sólido */}
<BadgeSeplag label="Ativo" color="#1351b4" bg="#dce9f5" activeBg="#1351b4" active={true} />`,
  },
  {
    title: "Clicável",
    description:
      "Quando onClick é fornecido, o badge é renderizado como <button> via BotaoChipSeplag (cursor pointer, acessível).",
    example: (
      <BadgeSeplag
        label="Clique aqui"
        icon="pi pi-filter"
        color="#168821"
        bg="#d4edda"
        onClick={() => undefined}
      />
    ),
    code: `<BadgeSeplag
  label="Clique aqui"
  icon="pi pi-filter"
  color="#168821"
  bg="#d4edda"
  onClick={() => handleFiltro()}
/>`,
  },
  {
    title: "Tooltip",
    description:
      "Use tooltip para exibir um texto ao passar o mouse. tooltipPosition controla a direção (padrão: top). Funciona tanto em badges estáticos quanto clicáveis.",
    example: (
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <BadgeSeplag label="Padrão (top)" color="#1351b4" bg="#dce9f5" tooltip="Tooltip acima" />
        <BadgeSeplag label="Abaixo" color="#168821" bg="#d4edda" tooltip="Tooltip abaixo" tooltipPosition="bottom" />
        <BadgeSeplag label="Esquerda" color="#b07d00" bg="#fff3cd" tooltip="Tooltip à esquerda" tooltipPosition="left" />
        <BadgeSeplag label="Direita" color="#7b2d8b" bg="#f3e5f5" tooltip="Tooltip à direita" tooltipPosition="right" />
        <BadgeSeplag label="Clicável" color="#c0392b" bg="#fde8e6" tooltip="Badge clicável com tooltip" onClick={() => undefined} />
      </div>
    ),
    code: `{/* Estático */}
<BadgeSeplag label="Padrão" color="#1351b4" bg="#dce9f5" tooltip="Tooltip acima" />
<BadgeSeplag label="Abaixo" color="#168821" bg="#d4edda" tooltip="Tooltip abaixo" tooltipPosition="bottom" />

{/* Clicável */}
<BadgeSeplag label="Clicável" color="#c0392b" bg="#fde8e6" tooltip="Tooltip" onClick={() => handleClick()} />`,
  },
  {
    title: "Dimensões e alinhamento",
    description:
      "Use minWidth/maxWidth para controlar o tamanho, fontWeight para texto negrito, e textAlign para alinhar o conteúdo.",
    example: (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "flex-start" }}>
        <BadgeSeplag label="Mínimo 120px" color="#1351b4" bg="#dce9f5" minWidth="120px" />
        <BadgeSeplag label="Máximo 100px" color="#168821" bg="#d4edda" maxWidth="100px" />
        <BadgeSeplag label="Negrito" color="#c0392b" bg="#fde8e6" fontWeight />
        <BadgeSeplag label="Alinhado à direita" color="#b07d00" bg="#fff3cd" textAlign="right" minWidth="150px" />
      </div>
    ),
    code: `<BadgeSeplag label="Mínimo 120px" color="#1351b4" bg="#dce9f5" minWidth="120px" />
<BadgeSeplag label="Máximo 100px" color="#168821" bg="#d4edda" maxWidth="100px" />
<BadgeSeplag label="Negrito" color="#c0392b" bg="#fde8e6" fontWeight />
<BadgeSeplag label="Alinhado à direita" color="#b07d00" bg="#fff3cd" textAlign="right" minWidth="150px" />`,
  },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

const props: DocProp[] = [
  {
    name: "label",
    type: "string",
    required: true,
    description: "Texto exibido no badge.",
  },
  {
    name: "color",
    type: "string",
    required: true,
    description: "Cor principal: texto e borda (ex: \"#1351b4\").",
  },
  {
    name: "bg",
    type: "string",
    required: true,
    description: "Cor de fundo do badge (ex: \"#dce9f5\").",
  },
  {
    name: "icon",
    type: "string",
    required: false,
    description: "Classe de ícone PrimeIcons exibida à esquerda do texto (ex: \"pi pi-clock\").",
  },
  {
    name: "border",
    type: "string",
    required: false,
    description: "Cor da borda. Padrão: 30% opaco da cor principal (color + \"50\").",
  },
  {
    name: "size",
    type: '"xs" | "sm" | "md"',
    defaultValue: '"sm"',
    required: false,
    description: "Tamanho do badge. Controla padding e tamanho da fonte.",
  },
  {
    name: "active",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Quando true, aplica activeBg como fundo sólido e activeColor como texto.",
  },
  {
    name: "activeBg",
    type: "string",
    required: false,
    description: "Cor de fundo quando active=true.",
  },
  {
    name: "activeColor",
    type: "string",
    defaultValue: '"#ffffff"',
    required: false,
    description: "Cor do texto quando active=true.",
  },
  {
    name: "onClick",
    type: "() => void",
    required: false,
    description:
      "Quando fornecido, o badge é renderizado como <button> (BotaoChipSeplag). Caso contrário, renderiza como <span>.",
  },
  {
    name: "tooltip",
    type: "string",
    required: false,
    description: "Texto exibido ao passar o mouse sobre o badge.",
  },
  {
    name: "tooltipPosition",
    type: '"top" | "bottom" | "left" | "right"',
    defaultValue: '"top"',
    required: false,
    description: "Direção do tooltip.",
  },
  {
    name: "minWidth",
    type: "string | number",
    required: false,
    description: "Largura mínima do badge (ex: \"100px\" ou 100).",
  },
  {
    name: "maxWidth",
    type: "string | number",
    required: false,
    description: "Largura máxima do badge (ex: \"200px\" ou 200).",
  },
  {
    name: "fontWeight",
    type: "boolean",
    required: false,
    description: "Quando true, aplica fontWeight 700 (negrito). Padrão é 500.",
  },
  {
    name: "textAlign",
    type: '"left" | "center" | "right"',
    required: false,
    description: "Alinhamento do texto dentro do badge.",
  },
  {
    name: "customStyle",
    type: "React.CSSProperties",
    required: false,
    description: "Objeto com propriedades CSS customizadas que serão aplicadas e podem sobrescrever outras propriedades.",
  },
];

export default function BadgeDoc() {
  return (
    <DocPage
      title="Badge"
      description="Componente de badge/chip visual para exibição de status, categorias e filtros. Suporta ícones, múltiplos tamanhos, estado ativo e modo clicável."
      badge="Estável"
      since="v0.0.1"
      importStatement={`import { BadgeSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
