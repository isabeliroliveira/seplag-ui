import{i as e,n as t,t as n}from"./jsx-runtime-CUBmso4R.js";/* empty css              */import{t as r}from"./AnexarDocumento-WU0MF2kB.js";import{t as i}from"./DocPage-Sa8iwTkn.js";var a=e(t(),1),o=n();function s(){return(0,o.jsx)(r,{fileUploadRef:(0,a.useRef)(null),arquivoBase64:null,handleViewArquivo:()=>{},onUploadDocument:e=>console.log(`upload`,e),onRemoveArquivo:()=>{},label:`Comprovante`,cols:`12`})}function c(){return(0,o.jsx)(r,{fileUploadRef:(0,a.useRef)(null),arquivoBase64:{nome:`comprovante`,extensao:`pdf`,contentType:`application/pdf`,conteudoEmBase64:`BASE64_AQUI`},handleViewArquivo:()=>alert(`Visualizar documento`),onRemoveArquivo:()=>alert(`Arquivo removido`),label:`Comprovante`,cols:`12`})}var l=[{title:`Sem arquivo anexado`,description:`Estado inicial — exibe o botão de upload.`,example:(0,o.jsx)(s,{}),code:`import { useRef } from "react";
import { AnexarDocumentoSeplag } from "@seplag/ui-lib-react-18";
import { FileUpload } from "primereact/fileupload";

const fileUploadRef = useRef<FileUpload | null>(null);

<AnexarDocumentoSeplag
  fileUploadRef={fileUploadRef}
  arquivoBase64={null}
  handleViewArquivo={() => {}}
  onUploadDocument={(e) => handleUpload(e)}
  onRemoveArquivo={() => handleRemove()}
  label="Comprovante"
  cols="12"
/>`},{title:`Com arquivo anexado`,description:`Quando arquivoBase64 está preenchido, exibe os botões de Visualizar e Remover.`,example:(0,o.jsx)(c,{}),code:`<AnexarDocumentoSeplag
  fileUploadRef={fileUploadRef}
  arquivoBase64={{
    nome: "comprovante",
    extensao: "pdf",
    contentType: "application/pdf",
    conteudoEmBase64: base64String,
  }}
  handleViewArquivo={() => openDocument()}
  onRemoveArquivo={() => clearDocument()}
  label="Comprovante"
/>`}],u=[{name:`fileUploadRef`,type:`RefObject<FileUpload | null>`,required:!1,description:`Ref para o componente PrimeReact FileUpload (acesso programático).`},{name:`arquivoBase64`,type:`{ nome, extensao, contentType, conteudoEmBase64 } | null`,required:!1,description:`Arquivo atualmente anexado. null = nenhum arquivo.`},{name:`handleViewArquivo`,type:`() => void`,required:!0,description:`Callback para visualizar o arquivo anexado.`},{name:`onUploadDocument`,type:`(event: any) => void`,required:!1,description:`Callback chamado ao selecionar um arquivo para upload.`},{name:`onRemoveArquivo`,type:`() => void`,required:!1,description:`Callback para remover o arquivo anexado.`},{name:`label`,type:`string`,required:!1,description:`Rótulo exibido acima do campo.`},{name:`cols`,type:`string`,defaultValue:`"12"`,required:!1,description:`Largura via grid SEPLAG.`},{name:`hideLabel`,type:`boolean`,defaultValue:`false`,required:!1,description:`Oculta o rótulo.`},{name:`canView`,type:`boolean`,defaultValue:`true`,required:!1,description:`Exibe o botão de visualização quando há arquivo anexado.`}];function d(){return(0,o.jsx)(i,{title:`Anexar Documento`,description:`Componente de upload de documento padrão SEPLAG. Gerencia o ciclo de vida do arquivo: upload, visualização e remoção, com integração ao formato base64.`,badge:`Estável`,since:`v0.0.1`,importStatement:`import { AnexarDocumentoSeplag } from "@seplag/ui-lib-react-18";`,sections:l,props:u})}export{d as default};