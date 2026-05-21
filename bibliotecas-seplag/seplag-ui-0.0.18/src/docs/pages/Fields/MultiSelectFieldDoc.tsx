import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { MultiSelectFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

const cargos = [
  { label: "Analista", value: 1 },
  { label: "Técnico", value: 2 },
  { label: "Assistente", value: 3 },
  { label: "Coordenador", value: 4 },
  { label: "Gerente", value: 5 },
];

function BasicExample() {
  const { control } = useForm({ defaultValues: { cargos: [], perfis: [] } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <MultiSelectFieldSeplag
        name="cargos"
        control={control}
        label="Cargos"
        options={cargos}
        optionLabel="label"
        optionValue="value"
        cols="12 6"
        getFormErrorMessage={noError}
      />
      <MultiSelectFieldSeplag
        name="perfis"
        control={control}
        label="Perfis (chips)"
        options={cargos}
        optionLabel="label"
        optionValue="value"
        display="chip"
        cols="12 6"
        getFormErrorMessage={noError}
      />
    </div>
  );
}

const sections: DocSection[] = [
  {
    title: "Uso básico",
    description:
      "Seleção múltipla com filtro. Suporta display em texto separado por vírgula ou em chips.",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { MultiSelectFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

// Display padrão (vírgula)
<MultiSelectFieldSeplag
  name="cargos"
  control={control}
  label="Cargos"
  options={[{ label: "Analista", value: 1 }]}
  optionLabel="label"
  optionValue="value"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>

// Display em chips
<MultiSelectFieldSeplag
  name="perfis"
  control={control}
  label="Perfis"
  options={[{ label: "Admin", value: 1 }]}
  optionLabel="label"
  optionValue="value"
  display="chip"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>`,
  },
];

const props: DocProp[] = [
  {
    name: "name",
    type: "Path<T>",
    required: true,
    description: "Nome do campo no formulário.",
  },
  {
    name: "control",
    type: "Control<T>",
    required: true,
    description: "Objeto control do useForm.",
  },
  {
    name: "options",
    type: "object[]",
    required: true,
    description: "Lista de opções do multiselect.",
  },
  {
    name: "optionLabel",
    type: "string",
    required: true,
    description: "Propriedade usada como texto exibido.",
  },
  {
    name: "optionValue",
    type: "string",
    required: true,
    description: "Propriedade usada como valor.",
  },
  {
    name: "label",
    type: "string",
    required: false,
    description: "Rótulo exibido acima do campo.",
  },
  {
    name: "cols",
    type: "string",
    defaultValue: '"12 4"',
    required: false,
    description: "Largura via grid SEPLAG.",
  },
  {
    name: "required",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Torna o campo obrigatório.",
  },
  {
    name: "disabled",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Desabilita o campo.",
  },
  {
    name: "visible",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Quando false, oculta o campo.",
  },
  {
    name: "placeholder",
    type: "string",
    defaultValue: '"Selecione..."',
    required: false,
    description: "Texto de placeholder.",
  },
  {
    name: "display",
    type: '"comma" | "chip"',
    defaultValue: '"comma"',
    required: false,
    description: "Exibe selecionados separados por vírgula ou como chips.",
  },
  {
    name: "maxSelectedLabels",
    type: "number",
    defaultValue: "3",
    required: false,
    description: "Máximo de rótulos exibidos antes de mostrar contagem.",
  },
  {
    name: "selectedItemsLabel",
    type: "string",
    required: false,
    description: "Texto customizado quando ultrapassa maxSelectedLabels.",
  },
  {
    name: "dataKey",
    type: "string",
    defaultValue: '"id"',
    required: false,
    description: "Chave única de cada item para performance.",
  },
  {
    name: "readOnly",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Impede alteração dos itens selecionados.",
  },
  {
    name: "isLoading",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Exibe indicador de carregamento.",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function MultiSelectFieldDoc() {
  return (
    <DocPage
      title="MultiSelectField"
      description="Campo de seleção múltipla com filtro embutido e dois modos de exibição (vírgula ou chips). Integrado com react-hook-form."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
