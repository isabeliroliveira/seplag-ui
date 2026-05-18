import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { CNPJFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

function BasicExample() {
  const { control } = useForm({ defaultValues: { cnpj: "", cnpjObrig: "" } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <CNPJFieldSeplag
        name="cnpj"
        control={control}
        label="CNPJ"
        cols="12 6"
        getFormErrorMessage={noError}
      />
      <CNPJFieldSeplag
        name="cnpjObrig"
        control={control}
        label="CNPJ (obrigatório)"
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
      "Campo de CNPJ com máscara 99.999.999/9999-99 e validação de dígitos verificadores.",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { CNPJFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

<CNPJFieldSeplag
  name="cnpj"
  control={control}
  label="CNPJ"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>

// Sem validação de dígitos verificadores
<CNPJFieldSeplag
  name="cnpj"
  control={control}
  label="CNPJ"
  validarCNPJ={false}
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
    defaultValue: '"CNPJ"',
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
    name: "validarCNPJ",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Ativa/desativa a validação dos dígitos verificadores.",
  },
  {
    name: "onBlur",
    type: "() => void",
    required: false,
    description: "Callback executado ao sair do campo.",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function CNPJFieldDoc() {
  return (
    <DocPage
      title="CNPJField"
      description="Campo de CNPJ com máscara automática 99.999.999/9999-99 e validação dos dígitos verificadores, integrado com react-hook-form."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
