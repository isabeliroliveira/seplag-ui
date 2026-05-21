import { useState } from "react";
import {
  DocPage,
  PlaygroundCode,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import {
  TablePaginadoSeplag,
  type ColumnMetaSeplag,
} from "@componentes/TablePaginado";
import type { ResultsSeplag } from "../../../interfaces/Results";
import { formatCPFSeplag } from "../../../uteis/formatCpf";
import {
  formatarParaCNPJComPaddingSeplag,
  formatCNPJSeplag,
} from "../../../uteis/cpfCnpj/manipulaCNPJAndCPF";
import { formatAnyDateSeplag } from "../../../uteis/manipulaData";
import "primereact/resources/themes/lara-light-blue/theme.css";

// ---------------------------------------------------------------------------
// Tipos de exemplo
// ---------------------------------------------------------------------------

interface PessoaExemplo {
  id: number;
  nome: string;
  cpf: string;
  cargo: string;
}

interface ColaboradorExemplo {
  id: number;
  nome: string;
  cpf: string;
  cnpj: string;
  salario: number;
  dataAdmissao: string;
  situacao: "ativo" | "inativo" | "ferias";
}

// ---------------------------------------------------------------------------
// Dados fictícios
// ---------------------------------------------------------------------------

const mockData: ResultsSeplag<PessoaExemplo> = {
  content: [
    { id: 1, nome: "Ana Silva", cpf: "12345678900", cargo: "Analista" },
    { id: 2, nome: "Bruno Costa", cpf: "98765432100", cargo: "Coordenador" },
    { id: 3, nome: "Carla Souza", cpf: "11122233344", cargo: "Gerente" },
  ],
  totalRecords: 3,
  totalPages: 1,
  pageActual: 0,
  sizePage: 10,
  size: 10,
  number: 0,
  numberOfElements: 3,
  last: true,
  first: true,
  empty: false,
};

const mockDataVazia: ResultsSeplag<PessoaExemplo> = {
  content: [],
  totalRecords: 0,
  totalPages: 0,
  pageActual: 0,
  sizePage: 10,
  size: 10,
  number: 0,
  numberOfElements: 0,
  last: true,
  first: true,
  empty: true,
};

const columns: ColumnMetaSeplag<PessoaExemplo>[] = [
  { header: "Nome", field: "nome" },
  {
    header: "CPF",
    body: (row) => formatCPFSeplag(row.cpf),
  },
  { header: "Cargo", field: "cargo" },
];

// ---------------------------------------------------------------------------
// Dados e colunas para exemplos avançados
// ---------------------------------------------------------------------------

const mockColaboradores: ResultsSeplag<ColaboradorExemplo> = {
  content: [
    {
      id: 1,
      nome: "Ana Silva",
      cpf: "12345678900",
      cnpj: "12345678000195",
      salario: 4500,
      dataAdmissao: "2021-03-15",
      situacao: "ativo",
    },
    {
      id: 2,
      nome: "Bruno Costa",
      cpf: "98765432100",
      cnpj: "98765432000100",
      salario: 7200.5,
      dataAdmissao: "2019-07-01",
      situacao: "ferias",
    },
    {
      id: 3,
      nome: "Carla Souza",
      cpf: "11122233344",
      cnpj: "11122233000144",
      salario: 3100,
      dataAdmissao: "2023-01-10",
      situacao: "inativo",
    },
  ],
  totalRecords: 3,
  totalPages: 1,
  pageActual: 0,
  sizePage: 10,
  size: 10,
  number: 0,
  numberOfElements: 3,
  last: true,
  first: true,
  empty: false,
};

const situacaoStyles: Record<
  ColaboradorExemplo["situacao"],
  { background: string; color: string; label: string }
> = {
  ativo: { background: "#d4edda", color: "#155724", label: "Ativo" },
  inativo: { background: "#f8d7da", color: "#721c24", label: "Inativo" },
  ferias: { background: "#fff3cd", color: "#856404", label: "Férias" },
};

const columnsColaboradores: ColumnMetaSeplag<ColaboradorExemplo>[] = [
  { header: "Nome", field: "nome" },
  {
    header: "CPF",
    body: (row) => formatCPFSeplag(row.cpf),
  },
  {
    header: "CNPJ",
    body: (row) => formatCNPJSeplag(row.cnpj),
  },
  {
    header: "Salário",
    body: (row) =>
      row.salario.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      }),
  },
  {
    header: "Admissão",
    body: (row) => formatAnyDateSeplag(row.dataAdmissao),
  },
  {
    header: "Situação",
    body: (row) => {
      const s = situacaoStyles[row.situacao];
      return (
        <span
          style={{
            background: s.background,
            color: s.color,
            padding: "2px 10px",
            borderRadius: 12,
            fontWeight: 600,
            fontSize: "0.85rem",
          }}
        >
          {s.label}
        </span>
      );
    },
  },
];

const columnsMascaras: ColumnMetaSeplag<ColaboradorExemplo>[] = [
  { header: "Nome", field: "nome" },
  {
    header: "CPF (formatCPFSeplag)",
    body: (row) => formatCPFSeplag(row.cpf),
  },
  {
    header: "CNPJ (formatCNPJSeplag)",
    body: (row) => formatCNPJSeplag(row.cnpj),
  },
  {
    header: "CNPJ com padding",
    body: (row) => formatarParaCNPJComPaddingSeplag(row.cnpj),
  },
  {
    header: "Data ISO → dd/MM/yyyy",
    body: (row) => formatAnyDateSeplag(row.dataAdmissao),
  },
];

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

interface ToggleRowProps {
  readonly propKey: string;
  readonly label: string;
  readonly value: boolean;
  readonly setter: (v: boolean) => void;
}

function ToggleRow({ propKey, label, value, setter }: ToggleRowProps) {
  return (
    <div className="pg-field">
      <span className="pg-label">{propKey}</span>
      <div className="pg-radio-group">
        {([true, false] as boolean[]).map((v) => (
          <label
            key={String(v)}
            className={`pg-radio-btn${value === v ? " selected" : ""}`}
          >
            <input
              type="radio"
              name={propKey}
              checked={value === v}
              onChange={() => setter(v)}
            />
            {v ? label : "false"}
          </label>
        ))}
      </div>
    </div>
  );
}

interface PlaygroundState {
  readonly hasView: boolean;
  readonly hasEdit: boolean;
  readonly hasDuplicar: boolean;
  readonly hasDelete: boolean;
  readonly hasAdicionar: boolean;
  readonly paginator: boolean;
  readonly semInformacoes: boolean;
}

interface PlaygroundActionHandlers {
  handleView: ((row: PessoaExemplo) => void) | null;
  handleEdit: ((row: PessoaExemplo) => void) | null;
  handleDuplicar: ((row: PessoaExemplo) => void) | null;
  handleDelete: ((row: PessoaExemplo) => void) | null;
  handleAdicionar: (() => void) | null;
}

function buildPlaygroundActionHandlers(
  s: PlaygroundState,
): PlaygroundActionHandlers {
  return {
    handleView: s.hasView ? (row) => alert(`Visualizar: ${row.nome}`) : null,
    handleEdit: s.hasEdit ? (row) => alert(`Editar: ${row.nome}`) : null,
    handleDuplicar: s.hasDuplicar
      ? (row) => alert(`Duplicar: ${row.nome}`)
      : null,
    handleDelete: s.hasDelete ? (row) => alert(`Excluir: ${row.nome}`) : null,
    handleAdicionar: s.hasAdicionar ? () => alert("Adicionar novo") : null,
  };
}

function buildGeneratedCode(s: PlaygroundState): string {
  const acoes = s.hasView || s.hasEdit || s.hasDuplicar || s.hasDelete;
  const lines: string[] = [
    `import { TablePaginadoSeplag } from "@seplag/ui-lib-react-18";`,
    `import type { ColumnMetaSeplag } from "@seplag/ui-lib-react-18";`,
    ``,
    `const columns: ColumnMetaSeplag<Pessoa>[] = [`,
    `  { header: "Nome", field: "nome" },`,
    `  { header: "CPF", field: "cpf" },`,
    `  { header: "Cargo", field: "cargo" },`,
    `];`,
    ``,
    `<TablePaginadoSeplag`,
    `  data={${s.semInformacoes ? "dataVazia" : "data"}}`,
    `  rows={10}`,
    `  columns={columns}`,
  ];
  if (acoes) lines.push(`  hasEventoAcao`);
  if (s.hasView) lines.push(`  handleView={(row) => console.log("ver", row)}`);
  if (s.hasEdit)
    lines.push(`  handleEdit={(row) => console.log("editar", row)}`);
  if (s.hasDuplicar)
    lines.push(`  handleDuplicar={(row) => console.log("duplicar", row)}`);
  if (s.hasDelete)
    lines.push(`  handleDelete={(row) => console.log("excluir", row)}`);
  if (s.hasAdicionar)
    lines.push(`  handleAdicionar={() => console.log("adicionar")}`);
  lines.push(
    `  // quando não houver registros, exibe: "Nenhum registro encontrado"`,
    `  paginator={${s.paginator}}`,
    `  handleOnPageChange={(e) => console.log(e)}`,
    `/>`,
  );
  return lines.join("\n");
}

function TablePlayground() {
  const [hasView, setHasView] = useState(true);
  const [hasEdit, setHasEdit] = useState(true);
  const [hasDuplicar, setHasDuplicar] = useState(false);
  const [hasDelete, setHasDelete] = useState(true);
  const [hasAdicionar, setHasAdicionar] = useState(true);
  const [paginator, setPaginator] = useState(true);
  const [semInformacoes, setSemInformacoes] = useState(false);

  const acoes = hasView || hasEdit || hasDuplicar || hasDelete;
  const generatedCode = buildGeneratedCode({
    hasView,
    hasEdit,
    hasDuplicar,
    hasDelete,
    hasAdicionar,
    paginator,
    semInformacoes,
  });
  const actionHandlers = buildPlaygroundActionHandlers({
    hasView,
    hasEdit,
    hasDuplicar,
    hasDelete,
    hasAdicionar,
    paginator,
    semInformacoes,
  });

  return (
    <div className="botao-playground">
      <div
        className="botao-playground-preview"
        style={{ padding: "0.5rem", borderRadius: 8 }}
      >
        <TablePaginadoSeplag
          key={`${hasView}-${hasEdit}-${hasDuplicar}-${hasDelete}-${hasAdicionar}-${paginator}-${semInformacoes}`}
          data={semInformacoes ? mockDataVazia : mockData}
          rows={10}
          columns={columns}
          hasEventoAcao={acoes}
          handleView={actionHandlers.handleView}
          handleEdit={actionHandlers.handleEdit}
          handleDuplicar={actionHandlers.handleDuplicar}
          handleDelete={actionHandlers.handleDelete}
          handleAdicionar={actionHandlers.handleAdicionar}
          paginator={paginator}
          lazy={false}
          handleOnPageChange={() => {}}
        />
      </div>

      <div className="botao-playground-controls">
        <ToggleRow
          propKey="handleView"
          label="Visualizar"
          value={hasView}
          setter={setHasView}
        />
        <ToggleRow
          propKey="handleEdit"
          label="Editar"
          value={hasEdit}
          setter={setHasEdit}
        />
        <ToggleRow
          propKey="handleDuplicar"
          label="Duplicar"
          value={hasDuplicar}
          setter={setHasDuplicar}
        />
        <ToggleRow
          propKey="handleDelete"
          label="Excluir"
          value={hasDelete}
          setter={setHasDelete}
        />
        <ToggleRow
          propKey="handleAdicionar"
          label="Botão Adicionar (header)"
          value={hasAdicionar}
          setter={setHasAdicionar}
        />
        <ToggleRow
          propKey="paginator"
          label="Paginador"
          value={paginator}
          setter={setPaginator}
        />
        <ToggleRow
          propKey="semInformacoes"
          label="Sem informações"
          value={semInformacoes}
          setter={setSemInformacoes}
        />
      </div>

      <PlaygroundCode code={generatedCode} />
    </div>
  );
}

function TableSemInformacoesExample() {
  return (
    <TablePaginadoSeplag
      data={mockDataVazia}
      rows={10}
      columns={columns}
      lazy={false}
      paginator={false}
      handleOnPageChange={() => {}}
    />
  );
}

// ---------------------------------------------------------------------------
// Seções
// ---------------------------------------------------------------------------

const sections: DocSection[] = [
  {
    title: "Playground",
    description:
      "Tabela paginada interativa. Ative ou desative as opções abaixo para ver o resultado.",
    example: <TablePlayground />,
    code: "",
  },
  {
    title: "Com seleção múltipla",
    description:
      'Passe `selectionMode="multiple"` para exibir checkboxes de seleção.',
    example: (
      <TablePaginadoSeplag
        data={mockData}
        rows={10}
        columns={columns}
        selectionMode="multiple"
        lazy={false}
        paginator={false}
        handleOnPageChange={() => {}}
      />
    ),
    code: `<TablePaginadoSeplag\n  data={data}\n  rows={10}\n  columns={columns}\n  selectionMode="multiple"\n  handleOnPageChange={(e) => ...}\n/>`,
  },
  {
    title: "Sem informações",
    description:
      "Quando `content` está vazio, a tabela mantém a estrutura e exibe a mensagem de estado vazio.",
    example: <TableSemInformacoesExample />,
    code: `const dataVazia = {
  content: [],
  totalRecords: 0,
  pageActual: 0,
  // ...demais campos do ResultsSeplag
};

<TablePaginadoSeplag
  data={dataVazia}
  rows={10}
  columns={columns}
  handleOnPageChange={() => {}}
/>`,
  },
  {
    title: "Com botões customizados",
    description:
      "Use `renderBotoes` para adicionar ações personalizadas por linha.",
    example: (
      <TablePaginadoSeplag
        data={mockData}
        rows={10}
        columns={columns}
        hasEventoAcao
        renderBotoes={(row: PessoaExemplo) => (
          <button
            style={{ background: "none", border: "none", cursor: "pointer" }}
            onClick={() => alert(`Custom: ${row.nome}`)}
          >
            ⚙️
          </button>
        )}
        lazy={false}
        paginator={false}
        handleOnPageChange={() => {}}
      />
    ),
    code: `<TablePaginadoSeplag\n  data={data}\n  rows={10}\n  columns={columns}\n  hasEventoAcao\n  renderBotoes={(row) => <MeuBotao row={row} />}\n  handleOnPageChange={(e) => ...}\n/>`,
  },
  {
    title: "Máscaras em colunas (CPF, CNPJ, Data)",
    description:
      "Use o campo `body` em `ColumnMetaSeplag` para formatar valores usando as funções utilitárias da lib: `formatCPFSeplag`, `formatCNPJSeplag`, `formatarParaCNPJComPaddingSeplag` e `formatAnyDateSeplag`.",
    example: (
      <TablePaginadoSeplag
        data={mockColaboradores}
        rows={10}
        columns={columnsMascaras}
        lazy={false}
        paginator={false}
        handleOnPageChange={() => {}}
      />
    ),
    code: `import {\n  formatCPFSeplag,\n  formatCNPJSeplag,\n  formatAnyDateSeplag,\n} from "@seplag/ui-lib-react-18";\nimport type { ColumnMetaSeplag } from "@seplag/ui-lib-react-18";\n\nconst columns: ColumnMetaSeplag<Colaborador>[] = [\n  { header: "Nome", field: "nome" },\n  { header: "CPF", body: (row) => formatCPFSeplag(row.cpf) },\n  { header: "CNPJ", body: (row) => formatCNPJSeplag(row.cnpj) },\n  { header: "Admissão", body: (row) => formatAnyDateSeplag(row.dataAdmissao) },\n];`,
  },
  {
    title: "Coluna com badge de status e valor monetário",
    description:
      "Use `body` para renderizar qualquer elemento React — badges coloridos, valores em moeda, ícones, etc.",
    example: (
      <TablePaginadoSeplag
        data={mockColaboradores}
        rows={10}
        columns={columnsColaboradores}
        hasEventoAcao
        handleView={(row) => alert(`Visualizar: ${row.nome}`)}
        handleEdit={(row) => alert(`Editar: ${row.nome}`)}
        lazy={false}
        paginator={false}
        handleOnPageChange={() => {}}
      />
    ),
    code: `const columns: ColumnMetaSeplag<Colaborador>[] = [\n  { header: "Nome", field: "nome" },\n  { header: "CPF", body: (row) => formatCPFSeplag(row.cpf) },\n  {\n    header: "Salário",\n    body: (row) => row.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),\n  },\n  { header: "Admissão", body: (row) => formatAnyDateSeplag(row.dataAdmissao) },\n  {\n    header: "Situação",\n    body: (row) => (\n      <span style={{ background: "#d4edda", color: "#155724", padding: "2px 10px", borderRadius: 12 }}>\n        {row.situacao}\n      </span>\n    ),\n  },\n];`,
  },
];

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

const props: DocProp[] = [
  {
    name: "data",
    type: "ResultsSeplag<T> | undefined",
    required: true,
    description:
      "Objeto paginado com `content`, `totalRecords`, `pageActual`, etc.",
  },
  {
    name: "rows",
    type: "number",
    required: true,
    description: "Quantidade de linhas por página.",
  },
  {
    name: "columns",
    type: "ColumnMetaSeplag<T>[]",
    required: true,
    description:
      "Definição das colunas. Cada item tem `header`, `field` e opcionalmente `body`.",
  },
  {
    name: "handleOnPageChange",
    type: "(page: DataTableStateEvent) => void",
    required: true,
    description: "Callback chamado ao mudar de página.",
  },
  {
    name: "hasEventoAcao",
    type: "boolean",
    description:
      "Exibe a coluna de ações (Visualizar, Editar, Excluir, Duplicar).",
  },
  {
    name: "handleEdit",
    type: "(row: T) => void",
    description: "Callback para editar um registro. Exibe botão de edição.",
  },
  {
    name: "handleDelete",
    type: "(row: T) => void",
    description:
      "Callback para excluir. Abre modal de confirmação antes de chamar.",
  },
  {
    name: "handleView",
    type: "(row: T) => void",
    description: "Callback para visualizar. Exibe botão de visualização.",
  },
  {
    name: "handleDuplicar",
    type: "(row: T) => void",
    description:
      "Callback para duplicar. Aparece no SplitButton quando há 3 ou mais ações.",
  },
  {
    name: "handleAdicionar",
    type: "() => void",
    description: "Exibe o botão Adicionar no cabeçalho da tabela.",
  },
  {
    name: "renderBotoes",
    type: "(row: T) => ReactNode",
    description: "Renderiza botões adicionais por linha na coluna de ações.",
  },
  {
    name: "selectionMode",
    type: '"multiple" | "checkbox" | "single" | null',
    description: 'Modo de seleção de linhas. Padrão: `"single"`.',
  },
  {
    name: "selected",
    type: "T[] | null",
    description: "Linhas selecionadas (controlado).",
  },
  {
    name: "handleSelectionChange",
    type: "(event: { value: T[] | null }) => void",
    description: "Callback chamado ao alterar a seleção.",
  },
  {
    name: "isFetching",
    type: "boolean",
    description: "Exibe o ícone de carregamento sobre a tabela.",
  },
  {
    name: "lazy",
    type: "boolean",
    description:
      "Modo lazy (paginação/filtro controlados pelo servidor). Padrão: `true`.",
  },
  {
    name: "paginator",
    type: "boolean",
    description: "Exibe o paginador na parte inferior. Padrão: `true`.",
  },
  {
    name: "rowsPerPage",
    type: "number[]",
    description: "Opções de linhas por página no paginador.",
  },
  {
    name: "dataKey",
    type: "string",
    description: 'Campo usado como chave única das linhas. Padrão: `"id"`.',
  },
  {
    name: "header",
    type: "DataTableHeaderTemplateType<T[]>",
    description: "Conteúdo extra para o cabeçalho da tabela.",
  },
  {
    name: "expandedRows",
    type: "DataTableExpandedRows | DataTableValueArray",
    description: "Linhas expandidas (para rowExpansion).",
  },
  {
    name: "rowExpansionTemplate",
    type: "(data: T, options) => ReactNode",
    description: "Template renderizado ao expandir uma linha.",
  },
  {
    name: "allowExpansion",
    type: "boolean | ((data: T, options) => boolean)",
    description: "Controla quais linhas têm o ícone de expansão.",
  },
  {
    name: "isDisabled",
    type: "boolean",
    description: "Desativa seleção e eventos de linha.",
  },
];

// ---------------------------------------------------------------------------
// Página de documentação
// ---------------------------------------------------------------------------

export default function TablePaginadoDoc() {
  return (
    <DocPage
      title="TablePaginado"
      badge="Estável"
      since="v0.0.1"
      description="Tabela paginada com suporte a seleção, ações por linha, expansão de linhas e botão de adicionar integrado ao cabeçalho. Usa PrimeReact DataTable internamente."
      importStatement={`import { TablePaginadoSeplag } from "@seplag/ui-lib-react-18";\nimport type { TablePaginadoSeplagProps, ColumnMetaSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
