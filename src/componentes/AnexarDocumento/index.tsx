import RotuloSeplag from "../Rotulo";
import { FileUpload } from "primereact/fileupload";
import { useMemo, useCallback } from "react";
import { BotaoIconSeplag } from "../Botao";

export interface AnexarDocumentoSeplagProps {
  readonly fileUploadRef?: React.RefObject<FileUpload | null>;
  readonly arquivoBase64?: {
    nome: string;
    extensao: string;
    contentType: string;
    conteudoEmBase64: string;
  } | null;
  readonly handleViewArquivo: () => void;
  readonly onUploadDocument?: (event: any) => void;
  readonly onRemoveArquivo?: () => void;
  readonly hideLabel?: boolean;
  readonly label?: string;
  readonly cols?: string;
  readonly canView?: boolean;
  readonly className?: string;
  readonly style?: React.CSSProperties;
}

export function AnexarDocumentoSeplag(props: AnexarDocumentoSeplagProps) {
  const {
    arquivoBase64,
    fileUploadRef,
    handleViewArquivo,
    onUploadDocument,
    onRemoveArquivo,
    hideLabel,
    label,
    cols,
    canView = true,
    className,
    style,
  } = props;

  const handleView = useCallback(
    () => handleViewArquivo?.(),
    [handleViewArquivo],
  );
  const handleRemove = useCallback(
    () => onRemoveArquivo?.(),
    [onRemoveArquivo],
  );

  const content = useMemo(
    () => (
      <>
        {arquivoBase64 && (
          <div
            className="mb-2 p-2 border-round"
            style={{ backgroundColor: "#f0f9ff", border: "1px solid #bfdbfe" }}
          >
            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-2">
                <i
                  className="pi pi-file-pdf"
                  style={{ fontSize: "1.2rem", color: "#dc2626" }}
                ></i>
                <span className="font-semibold" style={{ color: "#1e40af" }}>
                  {arquivoBase64.nome}
                </span>
              </div>
              <div className="flex gap-2">
                <BotaoIconSeplag
                  icon="pi pi-eye"
                  tooltip="Visualizar documento"
                  onClick={handleView}
                  disabled={!canView}
                />
                {onRemoveArquivo && (
                  <BotaoIconSeplag
                    icon="pi pi-times"
                    severity="danger"
                    tooltip="Remover arquivo"
                    onClick={handleRemove}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {!arquivoBase64 && (
          <>
            <FileUpload
              ref={fileUploadRef}
              customUpload={true}
              mode="basic"
              chooseLabel="Anexar documento"
              invalidFileSizeMessageDetail="Tamanho Máximo do Arquivo Não Permitido. Tamanho Máximo de {1}."
              accept="application/pdf"
              onSelect={onUploadDocument}
              maxFileSize={2000000}
              className="w-full flex"
              pt={{
                chooseButton: {
                  className:
                    "w-full surface-400 border-none hover:surface-500 white-space-nowrap justify-content-center",
                },
              }}
            />
            <small className="block mt-1">
              Formato aceito: .pdf | Tamanho máximo: 2MB
            </small>
          </>
        )}
      </>
    ),
    [
      arquivoBase64,
      canView,
      fileUploadRef,
      onUploadDocument,
      onRemoveArquivo,
      handleView,
      handleRemove,
    ],
  );

  if (hideLabel) {
    return (
      <div className={className ?? cols ?? "col-12 md:col-4"} style={style}>
        {content}
      </div>
    );
  }

  return (
    <RotuloSeplag nome={label || "Anexar Documento"} cols={cols || "12 4"}>
      <div className={className} style={style}>
        {content}
      </div>
    </RotuloSeplag>
  );
}

export default AnexarDocumentoSeplag;
