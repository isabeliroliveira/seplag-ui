import{t as e}from"./jsx-runtime-CUBmso4R.js";/* empty css              */import{t}from"./DocPage-CYm-SFTR.js";import{r as n}from"./checkbox.esm-BV8zFsrm.js";import{h as r}from"./Fields-BTODmlpP.js";var i=e(),a=()=>null;function o(){let{control:e}=n({defaultValues:{descricao:``,obs:``}});return(0,i.jsxs)(`div`,{className:`grid`,style:{width:`100%`},children:[(0,i.jsx)(r,{name:`descricao`,control:e,label:`Descrição`,placeholder:`Descreva...`,cols:`12`,rows:3,getFormErrorMessage:a}),(0,i.jsx)(r,{name:`obs`,control:e,label:`Observações (máx. 200 caracteres)`,placeholder:`Digite suas observações...`,cols:`12`,rows:4,maxLength:200,getFormErrorMessage:a})]})}var s=[{title:`Uso básico`,description:`Área de texto com auto-resize e contador de caracteres opcional.`,example:(0,i.jsx)(o,{}),code:`import { useForm } from "react-hook-form";
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
/>`}],c=[{name:`name`,type:`Path<T>`,required:!0,description:`Nome do campo no formulário.`},{name:`control`,type:`Control<T>`,required:!0,description:`Objeto control do useForm.`},{name:`label`,type:`string`,required:!1,description:`Rótulo exibido acima do campo.`},{name:`cols`,type:`string`,defaultValue:`"12"`,required:!1,description:`Largura via grid SEPLAG.`},{name:`required`,type:`boolean`,defaultValue:`false`,required:!1,description:`Torna o campo obrigatório.`},{name:`disabled`,type:`boolean`,defaultValue:`false`,required:!1,description:`Desabilita o campo.`},{name:`visible`,type:`boolean`,defaultValue:`true`,required:!1,description:`Quando false, oculta o campo.`},{name:`rows`,type:`number`,defaultValue:`4`,required:!1,description:`Número de linhas visíveis.`},{name:`placeholder`,type:`string`,required:!1,description:`Texto de placeholder.`},{name:`maxLength`,type:`number`,required:!1,description:`Limite de caracteres. Exibe contador quando definido.`},{name:`getFormErrorMessage`,type:`(name: string) => ReactNode | null`,required:!1,description:`Função que retorna a mensagem de erro.`}];function l(){return(0,i.jsx)(t,{title:`TextAreaField`,description:`Campo de área de texto com auto-resize e contador de caracteres opcional. Integrado com react-hook-form e Rótulo SEPLAG.`,badge:`Estável`,since:`v0.0.1`,sections:s,props:c})}export{l as default};