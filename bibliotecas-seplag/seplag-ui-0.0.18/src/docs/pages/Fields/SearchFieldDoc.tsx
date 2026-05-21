import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { SearchFieldSeplag } from "@componentes/Fields";
import "primereact/resources/themes/lara-light-blue/theme.css";

const noError = () => null;

const pessoas = [
  { id: 1, nome: "Ana Silva" },
  { id: 2, nome: "Bruno Costa" },
  { id: 3, nome: "Carlos Souza" },
  { id: 4, nome: "Diana Ferreira" },
  { id: 5, nome: "Eduardo Lima" },
];

function BasicExample() {
  const { control } = useForm({ defaultValues: { pessoa: "" } });
  const [sugestoes, setSugestoes] = useState<typeof pessoas>([]);

  const buscar = (query: string) => {
    const filtrados = pessoas.filter((p) =>
      p.nome.toLowerCase().includes(query.toLowerCase()),
    );
    setSugestoes(filtrados);
  };

  return (
    <div className="grid" style={{ width: "100%" }}>
      <SearchFieldSeplag
        name="pessoa"
        control={control}
        label="Pesquisar Pessoa"
        placeholder="Digite ao menos 1 caractere..."
        fieldLabel="nome"
        items={sugestoes}
        minLength={1}
        search={buscar}
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
      "AutoComplete com busca assíncrona. Chame search para carregar as sugestões.",
    example: <BasicExample />,
    code: `import { useState } from "react";
import { useForm } from "react-hook-form";
import { SearchFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();
const [sugestoes, setSugestoes] = useState([]);

const buscar = async (query: string) => {
  const resultado = await api.buscar(query);
  setSugestoes(resultado);
};

<SearchFieldSeplag
  name="pessoa"
  control={control}
  label="Pesquisar Pessoa"
  placeholder="Digite para buscar..."
  fieldLabel="nome"
  items={sugestoes}
  minLength={3}
  search={buscar}
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>`,
  },
];

const props: DocProp[] = [
  {
    name: "name",
    type: "Path<TForm>",
    required: true,
    description: "Nome do campo no formulário.",
  },
  {
    name: "control",
    type: "Control<TForm>",
    required: true,
    description: "Objeto control do useForm.",
  },
  {
    name: "items",
    type: "SuggestionSeplag<TItem>[]",
    required: true,
    description: "Lista de sugestões retornadas pela busca.",
  },
  {
    name: "search",
    type: "(query: string) => void",
    required: true,
    description: "Função chamada quando o usuário digita.",
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
    defaultValue: '""',
    required: false,
    description: "Texto de placeholder.",
  },
  {
    name: "fieldLabel",
    type: "string",
    required: false,
    description: "Propriedade do objeto de sugestão usada como texto exibido.",
  },
  {
    name: "minLength",
    type: "number",
    defaultValue: "3",
    required: false,
    description: "Mínimo de caracteres para disparar a busca.",
  },
  {
    name: "forceSelection",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Força a seleção de um item da lista.",
  },
  {
    name: "itemTemplate",
    type: "(item: TItem) => ReactNode",
    required: false,
    description: "Template customizado para cada item da lista de sugestões.",
  },
  {
    name: "getFormErrorMessage",
    type: "(name: string) => ReactNode | null",
    required: false,
    description: "Função que retorna a mensagem de erro.",
  },
];

export default function SearchFieldDoc() {
  return (
    <DocPage
      title="SearchField"
      description="Campo de busca com autocompletar (AutoComplete do PrimeReact). Ideal para buscar registros via API enquanto o usuário digita."
      badge="Estável"
      since="v0.0.1"
      sections={sections}
      props={props}
    />
  );
}
