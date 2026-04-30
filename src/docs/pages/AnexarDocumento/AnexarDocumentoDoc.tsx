import { useRef } from "react";
import {
  DocPage,
  type DocSection,
  type DocProp,
} from "../../components/DocPage";
import { AnexarDocumentoSeplag } from "@componentes/AnexarDocumento";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/lara-light-blue/theme.css";

function AnexarDocumentoBasicExample() {
  const fileUploadRef = useRef<FileUpload | null>(null);
  return (
    <AnexarDocumentoSeplag
      fileUploadRef={fileUploadRef}
      arquivoBase64={null}
      handleViewArquivo={() => {}}
      onUploadDocument={(e) => console.log("upload", e)}
      onRemoveArquivo={() => {}}
      label="Comprovante"
      cols="12"
    />
  );
}

function AnexarDocumentoWithFileExample() {
  const fileUploadRef = useRef<FileUpload | null>(null);
  return (
    <AnexarDocumentoSeplag
      fileUploadRef={fileUploadRef}
      arquivoBase64={{
        nome: "comprovante",
        extensao: "pdf",
        contentType: "application/pdf",
        conteudoEmBase64: "BASE64_AQUI",
      }}
      handleViewArquivo={() => alert("Visualizar documento")}
      onRemoveArquivo={() => alert("Arquivo removido")}
      label="Comprovante"
      cols="12"
    />
  );
}

const sections: DocSection[] = [
  {
    title: "Sem arquivo anexado",
    description: "Estado inicial — exibe o botão de upload.",
    example: <AnexarDocumentoBasicExample />,
    code: `import { useRef } from "react";
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
/>`,
  },
  {
    title: "Com arquivo anexado",
    description:
      "Quando arquivoBase64 está preenchido, exibe os botões de Visualizar e Remover.",
    example: <AnexarDocumentoWithFileExample />,
    code: `<AnexarDocumentoSeplag
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
/>`,
  },
];

const props: DocProp[] = [
  {
    name: "fileUploadRef",
    type: "RefObject<FileUpload | null>",
    required: false,
    description:
      "Ref para o componente PrimeReact FileUpload (acesso programático).",
  },
  {
    name: "arquivoBase64",
    type: "{ nome, extensao, contentType, conteudoEmBase64 } | null",
    required: false,
    description: "Arquivo atualmente anexado. null = nenhum arquivo.",
  },
  {
    name: "handleViewArquivo",
    type: "() => void",
    required: true,
    description: "Callback para visualizar o arquivo anexado.",
  },
  {
    name: "onUploadDocument",
    type: "(event: any) => void",
    required: false,
    description: "Callback chamado ao selecionar um arquivo para upload.",
  },
  {
    name: "onRemoveArquivo",
    type: "() => void",
    required: false,
    description: "Callback para remover o arquivo anexado.",
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
    name: "hideLabel",
    type: "boolean",
    defaultValue: "false",
    required: false,
    description: "Oculta o rótulo.",
  },
  {
    name: "canView",
    type: "boolean",
    defaultValue: "true",
    required: false,
    description: "Exibe o botão de visualização quando há arquivo anexado.",
  },
];

export default function AnexarDocumentoDoc() {
  return (
    <DocPage
      title="Anexar Documento"
      description="Componente de upload de documento padrão SEPLAG. Gerencia o ciclo de vida do arquivo: upload, visualização e remoção, com integração ao formato base64."
      badge="Estável"
      since="v0.0.1"
      importStatement={`import { AnexarDocumentoSeplag } from "@seplag/ui-lib-react-18";`}
      sections={sections}
      props={props}
    />
  );
}
