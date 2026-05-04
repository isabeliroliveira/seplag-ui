import{t as e}from"./jsx-runtime-CUBmso4R.js";/* empty css              */import{t}from"./DocPage-CYm-SFTR.js";import{r as n}from"./checkbox.esm-BV8zFsrm.js";import{f as r}from"./Fields-BTODmlpP.js";var i=e(),a=()=>null,o=[{label:`Sim`,value:`S`},{label:`Não`,value:`N`}],s=[{label:`Masculino`,value:`M`},{label:`Feminino`,value:`F`},{label:`Outro`,value:`O`}];function c(){let{control:e}=n({defaultValues:{ativo:`S`,sexo:`M`}});return(0,i.jsxs)(`div`,{className:`grid`,style:{width:`100%`},children:[(0,i.jsx)(r,{name:`ativo`,control:e,label:`Ativo`,options:o,cols:`12 6`,getFormErrorMessage:a}),(0,i.jsx)(r,{name:`sexo`,control:e,label:`Sexo`,options:s,cols:`12 6`,getFormErrorMessage:a})]})}var l=[{title:`Uso básico`,description:`Grupo de radio buttons com opções customizáveis, integrado com react-hook-form.`,example:(0,i.jsx)(c,{}),code:`import { useForm } from "react-hook-form";
import { RadioButtonFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm({
  defaultValues: { ativo: "S" },
});

const opcoes = [
  { label: "Sim", value: "S" },
  { label: "Não", value: "N" },
];

<RadioButtonFieldSeplag
  name="ativo"
  control={control}
  label="Ativo"
  options={opcoes}
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>`}],u=[{name:`name`,type:`Path<T>`,required:!0,description:`Nome do campo no formulário.`},{name:`control`,type:`Control<T>`,required:!0,description:`Objeto control do useForm.`},{name:`options`,type:`{ label: string; value: any }[]`,required:!0,description:`Lista de opções do grupo de radio buttons.`},{name:`label`,type:`string`,required:!1,description:`Rótulo exibido acima do grupo.`},{name:`cols`,type:`string`,defaultValue:`"12"`,required:!1,description:`Largura via grid SEPLAG.`},{name:`required`,type:`boolean`,defaultValue:`false`,required:!1,description:`Torna o campo obrigatório.`},{name:`disabled`,type:`boolean`,defaultValue:`false`,required:!1,description:`Desabilita todos os radio buttons.`},{name:`visible`,type:`boolean`,defaultValue:`true`,required:!1,description:`Quando false, oculta o campo.`},{name:`getFormErrorMessage`,type:`(name: string) => ReactNode | null`,required:!1,description:`Função que retorna a mensagem de erro.`}];function d(){return(0,i.jsx)(t,{title:`RadioButtonField`,description:`Grupo de radio buttons com rótulos customizáveis. Integrado com react-hook-form e Rótulo SEPLAG.`,badge:`Estável`,since:`v0.0.1`,sections:l,props:u})}export{d as default};