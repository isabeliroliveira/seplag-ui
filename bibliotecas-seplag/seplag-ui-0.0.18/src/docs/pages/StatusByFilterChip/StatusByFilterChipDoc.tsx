import { useState } from "react";
import {
  DocPage,
  PlaygroundCode,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import "primereact/resources/themes/lara-light-blue/theme.css";
import { StatusByFilterChipSeplag } from "@componentes/StatusByFilterChip/StatusByFilterChip";

// ---------------------------------------------------------------------------
// Dados de exemplo
// ---------------------------------------------------------------------------

const examples = ["ATIVO", "INATIVO", "PENDENTE", "CANCELADO"];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

function StatusByFilterChipPlayground() {
  const [value, setValue] = useState<string>(examples[0]);

  const generatedCode = `import { StatusByFilterChipSeplag } from "@seplag/ui-lib-react-18";

<StatusByFilterChipSeplag descStatus="${value}" />`;

  return (
    <div className="botao-playground">
      <div className="botao-playground-preview">
        <div>
          <StatusByFilterChipSeplag descStatus={value} />
        </div>
      </div>

      <div className="botao-playground-controls">
        <div className="pg-field">
          <label htmlFor="descstatus-select" className="pg-label">
            descStatus
          </label>
          <select
            id="descstatus-select"
            className="pg-select"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          >
            {examples.map((ex) => (
              <option key={ex} value={ex}>
                {ex}
              </option>
            ))}
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
    description: "Teste o chip com diferentes valores textuais de status.",
    example: <StatusByFilterChipPlayground />,
    code: "",
  },
  {
    title: "Uso básico",
    description: "Variações de status através de strings conhecidas.",
    example: (
      <div style={{ display: "flex", gap: 12 }}>
        {examples.map((ex) => (
          <div key={ex}>
            <StatusByFilterChipSeplag descStatus={ex} />
          </div>
        ))}
      </div>
    ),
    code: `import { StatusByFilterChipSeplag } from "@seplag/ui-lib-react-18";

<StatusByFilterChipSeplag descStatus="ATIVO" />
<StatusByFilterChipSeplag descStatus="INATIVO" />
<StatusByFilterChipSeplag descStatus="PENDENTE" />`,
  },
];

const props: DocProp[] = [
  {
    name: "descStatus",
    type: "string | null",
    description:
      "Descrição textual do status. Normaliza e mapeia para uma chave de status.",
  },
];

export default function StatusByFilterChipDoc() {
  return (
    <DocPage
      title="StatusByFilterChip"
      badge="Estável"
      since="v0.0.1"
      description="Exibe um chip de status derivado de uma string descritiva."
      importStatement={`import { StatusByFilterChipSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
