import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { TextAreaFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

function BasicExample() {
  const { control } = useForm({ defaultValues: { descricao: "", obs: "" } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <TextAreaFieldSeplag
        name="descricao"
        control={control}
        label="Descrição"
        placeholder="Descreva..."
        cols="12"
        rows={3}
        getFormErrorMessage={noError}
      />
      <TextAreaFieldSeplag
        name="obs"
        control={control}
        label="Observações (máx. 200 caracteres)"
        placeholder="Digite suas observações..."
        cols="12"
        rows={4}
        maxLength={200}
        getFormErrorMessage={noError}
      />
    </div>
  );
}

const sections: DocSection[] = [
  {
    title: "Uso básico",
    description:
      "Área de texto com auto-resize e contador de caracteres opcional.",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { TextAreaFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

<TextAreaFieldSeplag
  name="descricao"
  control={control}
  label="Descrição"
  placeholder="Descreva..."
  cols="12"
  rows={3}
  getFormErrorMessage={(name) => errors[name]?.message}
/>

// Com contador de caracteres
<TextAreaFieldSeplag
  name="obs"
  control={control}
  label="Observações"
  maxLength={200}
  cols="12"
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
    name: "label",
    type: "string",
    required: false,
    description: "Rótulo exibido acima do campo.",
  },
  {
    name: "cols",
    type: "string",
    defaultValue: '"12"',
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
    name: "rows",
    type: "number",
    defaultValue: "4",
    required: false,
    description: "Número de linhas visíveis.",
  },
  {
    name: "placeholder",
    type: "string",
    required: false,
    description: "Texto de placeholder.",
  },
  {
    name: "maxLength",
    type: "number",
    required: false,
    description: "Limite de caracteres. Exibe contador quando definido.",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function TextAreaFieldDoc() {
  return (
    <DocPage
      title="TextAreaField"
      description="Campo de área de texto com auto-resize e contador de caracteres opcional. Integrado com react-hook-form e Rótulo SEPLAG."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
