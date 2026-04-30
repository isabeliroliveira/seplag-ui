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
  const [size, setSize] = useState<(typeof SIZE_OPTIONS)[number]>("sm");
  const [presetIdx, setPresetIdx] = useState(0);
  const [active, setActive] = useState(false);
  const [clickable, setClickable] = useState(false);

  const preset = PRESET_COLORS[presetIdx];

  const propsCode = [
    `label="${label}"`,
    icon ? `icon="${icon}"` : "",
    `color="${preset.color}"`,
    `bg="${preset.bg}"`,
    size !== "sm" ? `size="${size}"` : "",
    active ? "active" : "",
    active ? `activeBg="${preset.color}"` : "",
    clickable ? `onClick={() => alert("clicado!")}` : "",
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
          icon={icon || undefined}
          color={preset.color}
          bg={preset.bg}
          size={size}
          active={active}
          activeBg={active ? preset.color : undefined}
          onClick={clickable ? () => undefined : undefined}
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
