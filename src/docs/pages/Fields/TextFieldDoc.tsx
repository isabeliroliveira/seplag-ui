import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { TextFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

function BasicExample() {
  const { control } = useForm({ defaultValues: { nome: "", codigo: "" } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <TextFieldSeplag
        name="nome"
        control={control}
        label="Nome"
        placeholder="Digite o nome"
        cols="12 6"
        getFormErrorMessage={noError}
      />
      <TextFieldSeplag
        name="codigo"
        control={control}
        label="Código (somente letras/números)"
        placeholder="Ex: ABC123"
        cols="12 6"
        allowNumberLetter
        getFormErrorMessage={noError}
      />
    </div>
  );
}

function RequiredExample() {
  const { control } = useForm({
    defaultValues: { nomeObrigatorio: "", campoDesabilitado: "" },
  });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <TextFieldSeplag
        name="nomeObrigatorio"
        control={control}
        label="Nome (obrigatório)"
        placeholder="Obrigatório"
        cols="12 6"
        required
        getFormErrorMessage={noError}
      />
      <TextFieldSeplag
        name="campoDesabilitado"
        control={control}
        label="Desabilitado"
        placeholder="Campo desabilitado"
        cols="12 6"
        disabled
        getFormErrorMessage={noError}
      />
    </div>
  );
}

const sections: DocSection[] = [
  {
    title: "Uso básico",
    description:
      "Campo de texto simples integrado com react-hook-form e Rótulo SEPLAG.",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { TextFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

<TextFieldSeplag
  name="nome"
  control={control}
  label="Nome"
  placeholder="Digite o nome"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>`,
  },
  {
    title: "Obrigatório e desabilitado",
    description:
      "Adicione required para validação automática ou disabled para bloquear o campo.",
    example: <RequiredExample />,
    code: `<TextFieldSeplag
  name="nome"
  control={control}
  label="Nome"
  required
  getFormErrorMessage={(name) => errors[name]?.message}
/>

<TextFieldSeplag
  name="campo"
  control={control}
  label="Desabilitado"
  disabled
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
    defaultValue: '"12 6"',
    required: false,
    description: 'Largura via grid SEPLAG, ex: "12 6".',
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
    required: false,
    description: "Texto de placeholder.",
  },
  {
    name: "maxLength",
    type: "number",
    required: false,
    description: "Limite de caracteres.",
  },
  {
    name: "noSpaces",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Remove todos os espaços.",
  },
  {
    name: "numbersOnly",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Permite apenas dígitos.",
  },
  {
    name: "allowNumberLetter",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Permite apenas letras e números.",
  },
  {
    name: "allowMoreThanOneSpace",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Permite mais de um espaço seguido.",
  },
  {
    name: "autoTrimOnBlur",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Remove espaços nas extremidades ao sair do campo.",
  },
  {
    name: "icon",
    type: "string",
    required: false,
    description: 'Ícone à direita, ex: "pi pi-search".',
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function TextFieldDoc() {
  return (
    <DocPage
      title="TextField"
      description="Campo de texto simples padrão SEPLAG, integrado com react-hook-form. Suporta trimming automático, restrições de caracteres e exibição de ícone."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
