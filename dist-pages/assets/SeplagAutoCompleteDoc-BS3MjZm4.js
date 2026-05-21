import{i as e,n as t,t as n}from"./jsx-runtime-CUBmso4R.js";import{P as r}from"./hooks.esm-CQ5c3DPY.js";/* empty css              */import{t as i}from"./autocomplete.esm-DgS5wdsD.js";import{t as a}from"./DocPage-D2k3n4h7.js";var o=e(t(),1),s=n(),c={sm:`p-inputtext-sm`,md:void 0,lg:`p-inputtext-lg`},l={sm:`p-button-sm`,md:void 0,lg:`p-button-lg`};function u({completeMethod:e,componentSize:t=`md`,helpText:n,maxRenderedItems:a=50,minWidth:o,onChange:u,...d}){let f=d.className?.split(` `).includes(`w-full`),p=Math.max(0,a),m=c[t],h=l[t],g=!d.multiple&&typeof d.value==`object`&&d.value!==null&&!d.disabled,_=d.suggestions?.slice(0,p),v=d.style?.width??(f?`100%`:void 0),y=e=>{u?.(e)},b=e=>{y(e)},x=t=>{e?.(t.query)},S=e=>{y({originalEvent:e,value:null,stopPropagation:()=>e.stopPropagation(),preventDefault:()=>e.preventDefault(),target:{name:d.name??``,id:d.inputId??d.id??``,value:null}}),d.onClear?.(e)};return(0,s.jsxs)(`div`,{style:{display:v?`block`:`inline-flex`,flexDirection:`column`,width:v,minWidth:o??d.style?.minWidth},children:[(0,s.jsxs)(`span`,{style:{position:`relative`,display:v?`block`:`inline-flex`,width:v,minWidth:o??d.style?.minWidth},children:[(0,s.jsx)(i,{...d,className:r(d.className,m),delay:d.delay??0,minLength:d.minLength??0,suggestions:_,style:{...d.style,minWidth:o??d.style?.minWidth,width:v??d.style?.width},dropdownIcon:d.dropdownIcon??`pi pi-search`,pt:{...d.pt,dropdownButton:{...d.pt?.dropdownButton,root:{...typeof d.pt?.dropdownButton?.root==`object`?d.pt.dropdownButton.root:void 0,className:r(typeof d.pt?.dropdownButton?.root==`object`?d.pt.dropdownButton.root?.className:void 0,h)}}},onChange:b,completeMethod:x}),g&&(0,s.jsx)(`button`,{type:`button`,"aria-label":`Limpar seleção`,title:`Limpar seleção`,onClick:S,style:{position:`absolute`,margin:`auto 0px`,right:`2.75rem`,bottom:`calc(50% - 0.5rem)`,width:`1rem`,height:`1rem`,padding:`0px`,border:`0px`,background:`transparent`,color:`rgb(107, 114, 128)`,cursor:`pointer`,zIndex:1},children:(0,s.jsx)(`i`,{className:`pi pi-times`,style:{fontSize:`0.875rem`}})})]}),n?(0,s.jsx)(`small`,{className:`text-600 mt-2 block`,children:n}):null]})}var d=[{id:1,nome:`Ana Beatriz Oliveira`,cpf:`123.456.789-00`,matricula:`874521`,dataNascimento:`12/03/1989`},{id:2,nome:`Ana Carolina Lima`,cpf:`987.654.321-00`,matricula:`741258`,dataNascimento:`27/09/1991`},{id:3,nome:`Ana Clara Souza`,cpf:`456.123.789-55`,matricula:`963852`,dataNascimento:`05/11/1985`},{id:4,nome:`Ana Luiza Martins`,cpf:`741.852.963-11`,matricula:`159357`,dataNascimento:`18/01/1993`},{id:5,nome:`Ana Paula Rocha`,cpf:`258.369.147-22`,matricula:`456123`,dataNascimento:`21/06/1990`},{id:6,nome:`Bruno Henrique Costa`,cpf:`369.258.147-33`,matricula:`852741`,dataNascimento:`14/02/1988`},{id:7,nome:`Ana Clara Silva`,cpf:`111.222.333-44`,matricula:`874531`,dataNascimento:`03/08/1992`},{id:8,nome:`Ana Maria Braga`,cpf:`222.333.444-55`,matricula:`874532`,dataNascimento:`17/10/1987`},{id:9,nome:`Ana Paula Souza`,cpf:`333.444.555-66`,matricula:`874533`,dataNascimento:`29/05/1991`}];function f(e){return(0,s.jsxs)(`div`,{children:[(0,s.jsx)(`div`,{className:`font-medium`,children:e.nome}),(0,s.jsxs)(`small`,{className:`text-600`,children:[e.cpf,` • Matrícula `,e.matricula]})]})}function p(e){return e.normalize(`NFD`).replaceAll(/[^\w\s]/g,``).toLowerCase().trim()}function m(e){let t=p(e);return t.length<3?[]:d.filter(e=>[e.nome,e.cpf,e.matricula].map(p).join(` `).includes(t))}function h(){let[e,t]=(0,o.useState)(void 0),[n,r]=(0,o.useState)([]);return(0,s.jsx)(`div`,{className:`grid`,style:{width:`100%`},children:(0,s.jsx)(`div`,{className:`col-12 md:col-8`,children:(0,s.jsx)(u,{value:e,suggestions:n,completeMethod:e=>{r(m(e))},componentSize:`md`,helpText:`teste texto de ajuda`,maxRenderedItems:10,minWidth:`25rem`,onChange:e=>{t(e.value??void 0)},field:`nome`,dropdown:!0,dropdownMode:`current`,placeholder:`Digite nome, CPF ou matrícula`,emptyMessage:`Nenhum registro localizado`,showEmptyMessage:!0,itemTemplate:f})})})}var g=[{title:`Uso básico`,description:`Wrapper leve do AutoComplete do PrimeReact. A estratégia de busca fica com o consumidor: você implementa a consulta no completeMethod e controla as sugestões retornadas.`,example:(0,s.jsx)(h,{}),code:`import { useState } from "react";
import { SeplagAutoComplete } from "@seplag/ui-lib-react-18";

type Pessoa = {
  id: number;
  nome: string;
  cpf: string;
  matricula: string;
};

const pessoasMock = [
  { id: 1, nome: "Ana Beatriz Oliveira", cpf: "109.876.543-21", matricula: "874521" },
  { id: 2, nome: "Ana Carolina Mendes", cpf: "210.987.654-32", matricula: "874522" },
  { id: 3, nome: "Ana Júlia Vasconcelos", cpf: "321.098.765-43", matricula: "874523" },
  { id: 5, nome: "Ana Luísa Guimarães", cpf: "543.210.987-65", matricula: "874525" },
  { id: 6, nome: "Bruno Henrique Costa", cpf: "234.567.890-12", matricula: "741258" },
  { id: 7, nome: "Carlos Eduardo Santos", cpf: "345.678.901-23", matricula: "159357" },
  { id: 8, nome: "Daniela Souza Lima", cpf: "456.789.012-34", matricula: "951753" },
  { id: 9, nome: "Eduardo Ribeiro Silva", cpf: "567.890.123-45", matricula: "357951" },
  { id: 10, nome: "Fernanda Alves Pereira", cpf: "678.901.234-56", matricula: "258147" } 
];

const renderPessoaItem = (pessoa: Pessoa) => (
  <div>
    <div className="font-medium">{pessoa.nome}</div>
    <small className="text-600">
      {pessoa.cpf} • Matrícula {pessoa.matricula}
    </small>
  </div>
);



const [value, setValue] = useState<Pessoa | string | null>(null);
const [items, setItems] = useState<typeof pessoasMock>([]);

const search = (query: string) => {
  const termo = query.trim().toLowerCase();

  if (termo.length < 3) {
    setItems([]);
    return;
  }

  setItems(
    pessoasMock.filter((pessoa) =>
      [pessoa.nome, pessoa.cpf, pessoa.matricula]
        .join(" ")
        .toLowerCase()
        .includes(termo),
    ),
  );
};

const helpText =  "teste texto de ajuda";

<SeplagAutoComplete
  value={value}
  suggestions={items}
  completeMethod={search}
  componentSize="lg"
  helpText={helpText}
  maxRenderedItems={30}
  minWidth="28rem"
  onChange={(e) => {
    setValue(e.value ?? null);
  }}
  field="nome"
  dropdown
  dropdownMode="current"
  placeholder="Digite nome, CPF ou matrícula"
  itemTemplate={renderPessoaItem}
/>`}],_=[{name:`value`,type:`T | string | null`,required:!1,description:`Valor controlado do campo.`},{name:`suggestions`,type:`T[]`,required:!1,description:`Lista de sugestões exibida no painel.`},{name:`completeMethod`,type:`(query: string) => void | Promise<void>`,required:!1,description:`Callback para consultas manuais, inclusive no clique do botão dropdown.`},{name:`onChange`,type:`(event) => void`,required:!1,description:`Evento de mudança controlado pelo consumidor. É o lugar recomendado para decidir quando buscar ou limpar sugestões.`},{name:`field`,type:`string`,required:!1,description:`Campo do objeto de sugestão usado como texto padrão.`},{name:`dropdown`,type:`boolean`,defaultValue:`false`,required:!1,description:`Exibe o botão lateral do AutoComplete.`},{name:`dropdownMode`,type:`"blank" | "current"`,defaultValue:`"blank"`,required:!1,description:`Define se o botão lateral consulta vazio ou com o valor atual do input.`},{name:`componentSize`,type:`"sm" | "md" | "lg"`,defaultValue:`"md"`,required:!1,description:`Controla o tamanho visual do input e do botão dropdown.`},{name:`helpText`,type:`ReactNode`,required:!1,description:`Texto de ajuda exibido abaixo do componente. Pode ser string vazia para não renderizar nada.`},{name:`minWidth`,type:`string | number`,required:!1,description:`Define a largura mínima do componente na raiz, preservando outros estilos passados em style.`},{name:`maxRenderedItems`,type:`number`,defaultValue:`50`,required:!1,description:`Limita quantas sugestões são repassadas ao componente por render para evitar travamentos com listas muito grandes.`},{name:`itemTemplate`,type:`(item: T) => ReactNode`,required:!1,description:`Template opcional para customizar cada sugestão.`},{name:`placeholder`,type:`string`,required:!1,description:`Texto exibido enquanto o campo está vazio.`},{name:`emptyMessage`,type:`string`,required:!1,description:`Mensagem exibida quando não há sugestões.`},{name:`showEmptyMessage`,type:`boolean`,defaultValue:`false`,required:!1,description:`Controla a exibição da mensagem de lista vazia.`}];function v(){return(0,s.jsx)(a,{title:`SeplagAutoComplete`,description:`Autocomplete reutilizável para cenários controlados pelo consumidor, sem acoplamento com react-hook-form.`,badge:`Novo`,since:`v0.0.17`,sections:g,props:_})}export{v as default};