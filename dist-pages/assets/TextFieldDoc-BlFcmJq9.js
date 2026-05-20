import{t as e}from"./jsx-runtime-CUBmso4R.js";/* empty css              */import{r as t}from"./checkbox.esm-6Qyfa0-5.js";import{g as n}from"./Fields-CNIxnAr7.js";import{t as r}from"./DocPage-Sa8iwTkn.js";var i=e(),a=()=>null;function o(){let{control:e}=t({defaultValues:{nome:``,codigo:``}});return(0,i.jsxs)(`div`,{className:`grid`,style:{width:`100%`},children:[(0,i.jsx)(n,{name:`nome`,control:e,label:`Nome`,placeholder:`Digite o nome`,cols:`12 6`,getFormErrorMessage:a}),(0,i.jsx)(n,{name:`codigo`,control:e,label:`Código (somente letras/números)`,placeholder:`Ex: ABC123`,cols:`12 6`,allowNumberLetter:!0,getFormErrorMessage:a})]})}function s(){let{control:e}=t({defaultValues:{nomeObrigatorio:``,campoDesabilitado:``}});return(0,i.jsxs)(`div`,{className:`grid`,style:{width:`100%`},children:[(0,i.jsx)(n,{name:`nomeObrigatorio`,control:e,label:`Nome (obrigatório)`,placeholder:`Obrigatório`,cols:`12 6`,required:!0,getFormErrorMessage:a}),(0,i.jsx)(n,{name:`campoDesabilitado`,control:e,label:`Desabilitado`,placeholder:`Campo desabilitado`,cols:`12 6`,disabled:!0,getFormErrorMessage:a})]})}var c=[{title:`Uso básico`,description:`Campo de texto simples integrado com react-hook-form e Rótulo SEPLAG.`,example:(0,i.jsx)(o,{}),code:`import { useForm } from "react-hook-form";
import { TextFieldSeplag } from "@seplag/ui-lib-react-18";

const { control, formState: { errors } } = useForm();

<TextFieldSeplag
  name="nome"
  control={control}
  label="Nome"
  placeholder="Digite o nome"
  cols="12 6"
  getFormErrorMessage={(name) => errors[name]?.message}
/>`},{title:`Obrigatório e desabilitado`,description:`Adicione required para validação automática ou disabled para bloquear o campo.`,example:(0,i.jsx)(s,{}),code:`<TextFieldSeplag
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
/>`}],l=[{name:`name`,type:`Path<T>`,required:!0,description:`Nome do campo no formulário.`},{name:`control`,type:`Control<T>`,required:!0,description:`Objeto control do useForm.`},{name:`label`,type:`string`,required:!1,description:`Rótulo exibido acima do campo.`},{name:`cols`,type:`string`,defaultValue:`"12 6"`,required:!1,description:`Largura via grid SEPLAG, ex: "12 6".`},{name:`required`,type:`boolean`,defaultValue:`false`,required:!1,description:`Torna o campo obrigatório.`},{name:`disabled`,type:`boolean`,defaultValue:`false`,required:!1,description:`Desabilita o campo.`},{name:`visible`,type:`boolean`,defaultValue:`true`,required:!1,description:`Quando false, oculta o campo.`},{name:`placeholder`,type:`string`,required:!1,description:`Texto de placeholder.`},{name:`maxLength`,type:`number`,required:!1,description:`Limite de caracteres.`},{name:`noSpaces`,type:`boolean`,defaultValue:`false`,required:!1,description:`Remove todos os espaços.`},{name:`numbersOnly`,type:`boolean`,defaultValue:`false`,required:!1,description:`Permite apenas dígitos.`},{name:`allowNumberLetter`,type:`boolean`,defaultValue:`false`,required:!1,description:`Permite apenas letras e números.`},{name:`allowMoreThanOneSpace`,type:`boolean`,defaultValue:`false`,required:!1,description:`Permite mais de um espaço seguido.`},{name:`autoTrimOnBlur`,type:`boolean`,defaultValue:`true`,required:!1,description:`Remove espaços nas extremidades ao sair do campo.`},{name:`icon`,type:`string`,required:!1,description:`Ícone à direita, ex: "pi pi-search".`},{name:`getFormErrorMessage`,type:`(name: string) => ReactNode | null`,required:!1,description:`Função que retorna a mensagem de erro.`}];function u(){return(0,i.jsx)(r,{title:`TextField`,description:`Campo de texto simples padrão SEPLAG, integrado com react-hook-form. Suporta trimming automático, restrições de caracteres e exibição de ícone.`,badge:`Estável`,since:`v0.0.1`,sections:c,props:l})}export{u as default};