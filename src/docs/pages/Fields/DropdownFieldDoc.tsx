import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { DropdownFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

const ufs = [
  { label: "Mato Grosso", value: "MT" },
  { label: "São Paulo", value: "SP" },
  { label: "Rio de Janeiro", value: "RJ" },
  { label: "Minas Gerais", value: "MG" },
  { label: "Bahia", value: "BA" },
];

function BasicExample() {
  const { control } = useForm({ defaultValues: { uf: null, status: null } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <DropdownFieldSeplag
        name="uf"
        control={control}
        label="UF"
        options={ufs}
        optionLabel="label"
        optionValue="value"
        cols="12 6"
        getFormErrorMessage={noError}
      />
      <DropdownFieldSeplag
        name="status"
        control={control}
        label="Status (obrigatório)"
        options={[
          { label: "Ativo", value: "A" },
          { label: "Inativo", value: "I" },
        ]}
        optionLabel="label"
        optionValue="value"
        cols="12 6"
        required
        getFormErrorMessage={noError}
      />
    </div>
  );
}

const sections: DocSection[] = [
  {
    title: "Uso básico",
    description:
      "Dropdown com filtro embutido e botão de limpar, integrado com react-hook-form.",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { DropdownFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

const ufs = [
  { label: "Mato Grosso", value: "MT" },
  { label: "São Paulo", value: "SP" },
];

<DropdownFieldSeplag
  name="uf"
  control={control}
  label="UF"
  options={ufs}
  optionLabel="label"
  optionValue="value"
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
    description: "Lista de opções do dropdown.",
  },
  {
    name: "optionLabel",
    type: "string",
    required: true,
    description: "Propriedade da opção usada como texto exibido.",
  },
  {
    name: "optionValue",
    type: "string",
    required: true,
    description: "Propriedade da opção usada como valor.",
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
    defaultValue: '"12 6"',
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
    description: "Texto exibido quando nenhum item está selecionado.",
  },
  {
    name: "showClear",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Exibe botão para limpar a seleção.",
  },
  {
    name: "filter",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Habilita o filtro interno do dropdown.",
  },
  {
    name: "isLoading",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Exibe indicador de carregamento.",
  },
  {
    name: "onChange",
    type: "(value: any) => void",
    required: false,
    description: "Callback disparado ao mudar a seleção.",
  },
  {
    name: "rules",
    type: "RegisterOptions",
    required: false,
    description: "Regras de validação extras do react-hook-form.",
  },
  {
    name: "virtualScrollerOptions",
    type: "object",
    required: false,
    description:
      "Opções do virtual scroll (ativado automaticamente com >50 itens).",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function DropdownFieldDoc() {
  return (
    <DocPage
      title="DropdownField"
      description="Campo de seleção única com filtro embutido, botão de limpar e virtual scroll automático para listas grandes. Integrado com react-hook-form."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
