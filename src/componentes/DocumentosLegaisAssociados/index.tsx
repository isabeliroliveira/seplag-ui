import { useEffect, useMemo, useRef, useState } from "react";
import { BadgeSeplag } from "../Badge";
import styles from "./style.module.css";

export interface DocumentoLegalAssociadoSeplag {
  id: string;
  titulo: string;
  categoria: string;
  descricao?: string;
}

export interface DocumentosLegaisAssociadosSeplagProps {
  label?: string;
  required?: boolean;
  options: DocumentoLegalAssociadoSeplag[];
  value?: string[];
  onChange?: (selectedIds: string[]) => void;
  onNovoCadastro?: () => void;
  onVisualizar?: (documento: DocumentoLegalAssociadoSeplag) => void;
  placeholder?: string;
  filtroPlaceholder?: string;
  pageSize?: number;
}

const DEFAULT_PAGE_SIZE = 5;

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getCategoriaColors(categoria: string) {
  const key = normalizeText(categoria);

  if (key.includes("decreto")) {
    return { color: "#005ea8", bg: "#e6f3ff" };
  }

  if (key.includes("norma")) {
    return { color: "#6b4f00", bg: "#fff4d6" };
  }

  if (key.includes("portaria")) {
    return { color: "#475569", bg: "#f1f5f9" };
  }

  return { color: "#0072ce", bg: "#e8f3ff" };
}

export function DocumentosLegaisAssociadosSeplag({
  label = "Documentos Legais Associados",
  required = false,
  options,
  value,
  onChange,
  onNovoCadastro,
  onVisualizar,
  placeholder = "Buscar documentos legais...",
  filtroPlaceholder = "Filtrar por número ou descrição...",
  pageSize = DEFAULT_PAGE_SIZE,
}: Readonly<DocumentosLegaisAssociadosSeplagProps>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [internalValue, setInternalValue] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const selectedIds = value ?? internalValue;
  const selectedSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const selectedDocuments = useMemo(
    () => options.filter((item) => selectedSet.has(item.id)),
    [options, selectedSet],
  );
  const filteredOptions = useMemo(() => {
    const query = normalizeText(search.trim());
    if (!query) return options;

    return options.filter((item) => {
      const content = normalizeText(
        `${item.titulo} ${item.categoria} ${item.descricao ?? ""}`,
      );
      return content.includes(query);
    });
  }, [options, search]);
  const shouldPaginate = selectedDocuments.length >= pageSize;
  const totalPages = shouldPaginate
    ? Math.max(1, Math.ceil(selectedDocuments.length / pageSize))
    : 1;
  const safePage = Math.min(page, totalPages - 1);
  const visibleDocuments = shouldPaginate
    ? selectedDocuments.slice(safePage * pageSize, safePage * pageSize + pageSize)
    : selectedDocuments;

  const updateSelected = (nextValue: string[]) => {
    if (!value) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const toggleDocument = (id: string) => {
    const nextValue = selectedSet.has(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id];

    updateSelected(nextValue);
    setPage(0);
  };

  const removeDocument = (id: string) => {
    updateSelected(selectedIds.filter((item) => item !== id));
    setPage(0);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (page > totalPages - 1) setPage(Math.max(0, totalPages - 1));
  }, [page, totalPages]);

  return (
    <div className={styles.container} ref={rootRef}>
      <div className={styles.header}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <button
          className={styles.novoCadastro}
          type="button"
          onClick={onNovoCadastro}
        >
          <i className="pi pi-plus-circle" aria-hidden="true" />
          Novo Cadastro
        </button>
      </div>

      <div
        className={`${styles.inputShell} ${isOpen ? styles.inputShellOpen : ""}`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setIsOpen(true)}
      >
        <i className={`pi pi-search ${styles.searchIcon}`} aria-hidden="true" />
        <div className={styles.chips}>
          {selectedDocuments.map((documento) => (
            <span className={styles.chip} key={documento.id}>
              <span>{documento.titulo}</span>
              <button
                type="button"
                aria-label={`Remover ${documento.titulo}`}
                onClick={(event) => {
                  event.stopPropagation();
                  removeDocument(documento.id);
                }}
              >
                <i className="pi pi-times" aria-hidden="true" />
              </button>
            </span>
          ))}
          <input
            className={styles.inlineInput}
            aria-label="Buscar documentos legais associados"
            value={search}
            placeholder={selectedDocuments.length ? "" : placeholder}
            onChange={(event) => {
              setSearch(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </div>
        <i
          className={`pi ${isOpen ? "pi-chevron-up" : "pi-chevron-down"} ${styles.toggleIcon}`}
          aria-hidden="true"
        />
      </div>

      {isOpen && (
        <div className={styles.dropdown}>
          <div className={styles.filterWrap}>
            <input
              className={styles.filterInput}
              value={search}
              placeholder={filtroPlaceholder}
              onChange={(event) => setSearch(event.target.value)}
              autoFocus
            />
          </div>

          <div className={styles.options} role="listbox">
            {filteredOptions.length ? (
              filteredOptions.map((documento) => {
                const checked = selectedSet.has(documento.id);

                return (
                  <label
                    className={`${styles.option} ${
                      checked ? styles.optionSelected : ""
                    }`}
                    key={documento.id}
                  >
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleDocument(documento.id)}
                    />
                    <span>
                      <span className={styles.optionTitle}>
                        {documento.titulo}
                      </span>
                      {documento.descricao && (
                        <span className={styles.optionDescription}>
                          {documento.descricao}
                        </span>
                      )}
                    </span>
                  </label>
                );
              })
            ) : (
              <div className={styles.empty}>Nenhum documento encontrado.</div>
            )}
          </div>

          <div className={styles.dropdownFooter}>
            <span className={styles.selectedCount}>
              {selectedDocuments.length} selecionado
              {selectedDocuments.length === 1 ? "" : "s"}
            </span>
            <button
              className={styles.concluir}
              type="button"
              onClick={() => setIsOpen(false)}
            >
              Concluir
            </button>
          </div>
        </div>
      )}

      {selectedDocuments.length > 0 && (
        <div className={styles.selectedList}>
          {visibleDocuments.map((documento) => {
            const badgeColors = getCategoriaColors(documento.categoria);

            return (
              <div className={styles.selectedRow} key={documento.id}>
                <div className={styles.selectedInfo}>
                  <div className={styles.selectedTitle}>{documento.titulo}</div>
                  {documento.descricao && (
                    <div className={styles.selectedDescription}>
                      {documento.descricao}
                    </div>
                  )}
                </div>
                <div className={styles.badge}>
                  <BadgeSeplag
                    label={documento.categoria}
                    color={badgeColors.color}
                    bg={badgeColors.bg}
                    border="transparent"
                    size="xs"
                  />
                </div>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={`Visualizar ${documento.titulo}`}
                  onClick={() => onVisualizar?.(documento)}
                >
                  <i className="pi pi-eye" aria-hidden="true" />
                </button>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label={`Remover ${documento.titulo}`}
                  onClick={() => removeDocument(documento.id)}
                >
                  <i className="pi pi-times" aria-hidden="true" />
                </button>
              </div>
            );
          })}

          {shouldPaginate && (
            <div className={styles.pagination}>
              <button
                className={styles.pageButton}
                type="button"
                disabled={safePage === 0}
                onClick={() => setPage((current) => Math.max(0, current - 1))}
              >
                <i className="pi pi-chevron-left" aria-hidden="true" />
              </button>
              <span>
                Página {safePage + 1} de {totalPages}
              </span>
              <button
                className={styles.pageButton}
                type="button"
                disabled={safePage >= totalPages - 1}
                onClick={() =>
                  setPage((current) => Math.min(totalPages - 1, current + 1))
                }
              >
                <i className="pi pi-chevron-right" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DocumentosLegaisAssociadosSeplag;
