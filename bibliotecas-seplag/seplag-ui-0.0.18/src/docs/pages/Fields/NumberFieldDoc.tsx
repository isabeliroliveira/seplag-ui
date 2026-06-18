import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { NumberFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

function BasicExample() {
  const { control } = useForm({ defaultValues: { qtd: null, idade: null } });
  return (
    <div className="grid" style={{ width: "100%" }}>
      <NumberFieldSeplag
        name="qtd"
        control={control}
        label="Quantidade"
        cols="12 6"
        getFormErrorMessage={noError}
      />
      <NumberFieldSeplag
        name="idade"
        control={control}
        label="Idade (0–120)"
        cols="12 6"
        min={0}
        max={120}
        getFormErrorMessage={noError}
      />
    </div>
  );
}

const sections: DocSection[] = [
  {
    title: "Uso básico",
    description:
      "Campo numérico inteiro sem agrupamento (sem separador de milhares).",
    example: <BasicExample />,
    code: `import { useForm } from "react-hook-form";
import { NumberFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

<NumberFieldSeplag
  name="qtd"
  control={control}
  label="Quantidade"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>

// Com limites min/max
<NumberFieldSeplag
  name="idade"
  control={control}
  label="Idade"
  min={0}
  max={120}
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
    name: "min",
    type: "number",
    required: false,
    description: "Valor mínimo permitido.",
  },
  {
    name: "max",
    type: "number",
    required: false,
    description: "Valor máximo permitido.",
  },
  {
    name: "inputStyle",
    type: "CSSProperties",
    required: false,
    description: "Estilo inline aplicado ao input interno.",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function NumberFieldDoc() {
  return (
    <DocPage
      title="NumberField"
      description="Campo numérico inteiro sem agrupamento de dígitos, integrado com react-hook-form. Suporta limites mínimo e máximo."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
