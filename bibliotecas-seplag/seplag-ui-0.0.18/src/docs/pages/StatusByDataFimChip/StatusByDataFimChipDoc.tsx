import { useState } from "react";
import {
  DocPage,
  PlaygroundCode,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { StatusByDataFimChipSeplag } from "@componentes/StatusByDataFimChip/StatusByDataFimChip";

// ---------------------------------------------------------------------------
// Dados de exemplo
// ---------------------------------------------------------------------------

const today = new Date();
const fmt = (d: Date) =>
  d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

const exampleDates = {
  hoje: fmt(today),
  futuro: fmt(new Date(today.getTime() + 1000 * 60 * 60 * 24 * 7)),
  passado: fmt(new Date(today.getTime() - 1000 * 60 * 60 * 24 * 7)),
};

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

function StatusByDataFimChipPlayground() {
  const [selected, setSelected] = useState<
    "hoje" | "futuro" | "passado" | "null"
  >("hoje");

  const dataFim = selected === "null" ? null : exampleDates[selected];

  const dataFimAttr = dataFim ? `"${dataFim}"` : "null";
  const generatedCode = [
    'import { StatusByDataFimChipSeplag } from "@seplag/ui-lib-react-18";',
    "",
    `<StatusByDataFimChipSeplag dataFim={${dataFimAttr}} />`,
  ].join("\n");

  return (
    <div className="botao-playground">
      <div className="botao-playground-preview">
        <div>
          <StatusByDataFimChipSeplag dataFim={dataFim} />
        </div>
      </div>

      <div className="botao-playground-controls">
        <div className="pg-field">
          <label htmlFor="datafim-select" className="pg-label">
            dataFim
          </label>
          <select
            id="datafim-select"
            className="pg-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value as any)}
          >
            <option value="hoje">Hoje ({exampleDates.hoje})</option>
            <option value="futuro">Futuro ({exampleDates.futuro})</option>
            <option value="passado">Passado ({exampleDates.passado})</option>
            <option value="null">Null (sem data)</option>
          </select>
        </div>
      </div>

      <PlaygroundCode code={generatedCode} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Seções e props
// ---------------------------------------------------------------------------

const sections: DocSection[] = [
  {
    title: "Playground",
    description:
      "Teste o comportamento do chip com diferentes valores de `dataFim`.",
    example: <StatusByDataFimChipPlayground />,
    code: "",
  },
  {
    title: "Uso básico",
    description:
      "Exemplo com datas fixas para visualizar estados Ativo / Inativo.",
    example: (
      <div style={{ display: "flex", gap: 12 }}>
        <div>
          <StatusByDataFimChipSeplag dataFim={exampleDates.futuro} />
        </div>
        <div>
          <StatusByDataFimChipSeplag dataFim={exampleDates.passado} />
        </div>
        <div>
          <StatusByDataFimChipSeplag dataFim={null} />
        </div>
      </div>
    ),
    code: `import { StatusByDataFimChipSeplag } from "@seplag/ui-lib-react-18";

<StatusByDataFimChipSeplag dataFim="${exampleDates.futuro}" />
<StatusByDataFimChipSeplag dataFim="${exampleDates.passado}" />
<StatusByDataFimChipSeplag dataFim={null} />`,
  },
];

const props: DocProp[] = [
  {
    name: "dataFim",
    type: "string | null",
    description:
      "Data final no formato dd/MM/yyyy. Quando ausente, considera ativo.",
  },
];

export default function StatusByDataFimChipDoc() {
  return (
    <DocPage
      title="StatusByDataFimChip"
      badge="Estável"
      since="v0.0.1"
      description="Exibe um chip de status com base na data de fim informada (dd/MM/yyyy)."
      importStatement={`import { StatusByDataFimChipSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
