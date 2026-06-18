import RotuloSeplag from "../Rotulo";
import { FileUpload } from "primereact/fileupload";
import { useMemo, useCallback, useEffect, useRef } from "react";
import { BotaoIconSeplag } from "../Botao";
import type {
  AnexarDocumentoSeplagProps,
  ArquivoAnexadoSeplag,
} from "../AnexarDocumento";
import styles from "./style.module.css";

function formatTamanho(tamanho?: string | number) {
  if (tamanho === undefined || tamanho === null || tamanho === "") return null;
  if (typeof tamanho === "string") return tamanho;
  if (tamanho < 1024) return `${tamanho} B`;
  if (tamanho < 1024 * 1024) return `${(tamanho / 1024).toFixed(1)} KB`;
  return `${(tamanho / (1024 * 1024)).toFixed(1)} MB`;
}

function getIconByExtension(extensao: string) {
  if (extensao.toLowerCase() === "pdf") return "pi pi-file-pdf";
  return "pi pi-file";
}

export type AnexarDocumentoSolicitacaoFolhaSeplagProps =
  AnexarDocumentoSeplagProps;

export function AnexarDocumentoSolicitacaoFolhaSeplag(
  props: AnexarDocumentoSolicitacaoFolhaSeplagProps,
) {
  const {
    arquivoBase64,
    arquivosBase64,
    fileUploadRef,
    handleViewArquivo,
    onUploadDocument,
    onRemoveArquivo,
    onDownloadArquivo,
    hideLabel,
    label,
    descricao,
    cols,
    canView = true,
    canDownload = true,
    multiple = false,
    accept = "application/pdf",
    maxFileSize = 10000000,
    helpText = "Formato aceito: .pdf | Tamanho máximo: 10MB",
    className,
    style,
  } = props;

  const fileListRef = useRef<HTMLDivElement | null>(null);
  const arquivos = arquivosBase64 ?? (arquivoBase64 ? [arquivoBase64] : []);
  const shouldShowUploader =
    Boolean(onUploadDocument) && (multiple || arquivos.length === 0);
  const uploadKey = arquivos
    .map((arquivo, index) => `${arquivo.nome}-${arquivo.tamanho ?? index}`)
    .join("|");

  useEffect(() => {
    if (!fileListRef.current) return;
    fileListRef.current.scrollTop = fileListRef.current.scrollHeight;
  }, [uploadKey]);

  const handleView = useCallback(
    (arquivo: ArquivoAnexadoSeplag, index: number) =>
      handleViewArquivo?.(arquivo, index),
    [handleViewArquivo],
  );
  const handleRemove = useCallback(
    (arquivo: ArquivoAnexadoSeplag, index: number) =>
      onRemoveArquivo?.(arquivo, index),
    [onRemoveArquivo],
  );

  const content = useMemo(
    () => (
      <div className={styles.container}>
        {descricao && <p className={styles.description}>{descricao}</p>}

        {arquivos.length > 0 && (
          <div className={styles.fileList} ref={fileListRef}>
            {arquivos.map((arquivo, index) => {
              const tamanho = formatTamanho(arquivo.tamanho);

              return (
                <div className={styles.fileRow} key={`${arquivo.nome}-${index}`}>
                  <div className={styles.fileIcon} aria-hidden="true">
                    <i className={getIconByExtension(arquivo.extensao)} />
                  </div>
                  <div className={styles.fileInfo}>
                    <span className={styles.fileName}>{arquivo.nome}</span>
                    {tamanho && <span className={styles.fileSize}>{tamanho}</span>}
                  </div>
                  <div className={styles.fileActions}>
                    <BotaoIconSeplag
                      icon="pi pi-eye"
                      tooltip="Visualizar documento"
                      onClick={() => handleView(arquivo, index)}
                      disabled={!canView}
                    />
                    {onDownloadArquivo && (
                      <BotaoIconSeplag
                        icon="pi pi-download"
                        tooltip="Baixar documento"
                        onClick={() => onDownloadArquivo(arquivo, index)}
                        disabled={!canDownload}
                      />
                    )}
                    {onRemoveArquivo && (
                      <BotaoIconSeplag
                        icon="pi pi-trash"
                        severity="danger"
                        tooltip="Remover arquivo"
                        onClick={() => handleRemove(arquivo, index)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {shouldShowUploader && (
          <div className={styles.uploadArea}>
            <FileUpload
              key={uploadKey}
              ref={fileUploadRef}
              customUpload
              mode="basic"
              chooseLabel="Anexar documento"
              invalidFileSizeMessageDetail="Tamanho Máximo do Arquivo Não Permitido. Tamanho Máximo de {1}."
              accept={accept}
              onSelect={onUploadDocument}
              maxFileSize={maxFileSize}
              multiple={multiple}
              className={styles.upload}
              pt={{
                chooseButton: {
                  className: styles.uploadButton,
                },
              }}
            />
            <small className={styles.helpText}>{helpText}</small>
          </div>
        )}
      </div>
    ),
    [
      accept,
      arquivos,
      canDownload,
      canView,
      descricao,
      fileUploadRef,
      handleRemove,
      handleView,
      helpText,
      maxFileSize,
      multiple,
      onDownloadArquivo,
      onRemoveArquivo,
      onUploadDocument,
      shouldShowUploader,
      uploadKey,
    ],
  );

  if (hideLabel) {
    return (
      <div className={className ?? cols ?? "col-12"} style={style}>
        {content}
      </div>
    );
  }

  return (
    <RotuloSeplag nome={label || "Anexar Documento"} cols={cols || "12"}>
      <div className={className} style={style}>
        {content}
      </div>
    </RotuloSeplag>
  );
}

export default AnexarDocumentoSolicitacaoFolhaSeplag;
