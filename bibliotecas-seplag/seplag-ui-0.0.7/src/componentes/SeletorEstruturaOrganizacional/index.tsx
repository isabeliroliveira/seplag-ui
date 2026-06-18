import { useMemo, useState } from "react";
import styles from "./style.module.css";

export interface EstruturaOrganizacionalItemSeplag {
  id: string;
  nome: string;
  parentId?: string;
}

export interface EstruturaOrganizacionalNivelSeplag {
  id: string;
  titulo: string;
  disponiveisTitulo: string;
  selecionadosTitulo: string;
  filtroPlaceholder: string;
  itens: EstruturaOrganizacionalItemSeplag[];
  parentLevelId?: string;
}

export type SeletorEstruturaOrganizacionalValueSeplag = Record<
  string,
  string[]
>;

export interface SeletorEstruturaOrganizacionalSeplagProps {
  niveis: EstruturaOrganizacionalNivelSeplag[];
  value?: SeletorEstruturaOrganizacionalValueSeplag;
  onChange?: (value: SeletorEstruturaOrganizacionalValueSeplag) => void;
}

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

function isVisibleLevel(
  nivel: EstruturaOrganizacionalNivelSeplag,
  value: SeletorEstruturaOrganizacionalValueSeplag,
) {
  if (!nivel.parentLevelId) return true;
  return (value[nivel.parentLevelId] ?? []).length > 0;
}

function getAvailableItems(
  nivel: EstruturaOrganizacionalNivelSeplag,
  value: SeletorEstruturaOrganizacionalValueSeplag,
) {
  const selected = new Set(value[nivel.id] ?? []);
  const parentSelected = nivel.parentLevelId
    ? new Set(value[nivel.parentLevelId] ?? [])
    : null;

  return nivel.itens.filter((item) => {
    if (selected.has(item.id)) return false;
    if (!parentSelected) return true;
    return item.parentId ? parentSelected.has(item.parentId) : false;
  });
}

function getSelectedItems(
  nivel: EstruturaOrganizacionalNivelSeplag,
  value: SeletorEstruturaOrganizacionalValueSeplag,
) {
  const selected = new Set(value[nivel.id] ?? []);
  return nivel.itens.filter((item) => selected.has(item.id));
}

function filterItems(
  itens: EstruturaOrganizacionalItemSeplag[],
  term: string,
) {
  if (!term.trim()) return itens;
  const normalizedTerm = normalize(term);
  return itens.filter((item) => normalize(item.nome).includes(normalizedTerm));
}

export function SeletorEstruturaOrganizacionalSeplag({
  niveis,
  value,
  onChange,
}: Readonly<SeletorEstruturaOrganizacionalSeplagProps>) {
  const [internalValue, setInternalValue] =
    useState<SeletorEstruturaOrganizacionalValueSeplag>({});
  const [openLevels, setOpenLevels] = useState<Record<string, boolean>>({
    [niveis[0]?.id ?? ""]: true,
  });
  const [marked, setMarked] = useState<Record<string, string[]>>({});
  const [filters, setFilters] = useState<Record<string, string>>({});

  const currentValue = value ?? internalValue;

  const setCurrentValue = (
    nextValue: SeletorEstruturaOrganizacionalValueSeplag,
  ) => {
    if (!value) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  const visibleLevels = useMemo(
    () => niveis.filter((nivel) => isVisibleLevel(nivel, currentValue)),
    [niveis, currentValue],
  );

  const updateLevelValue = (levelId: string, selectedIds: string[]) => {
    const levelIndex = niveis.findIndex((nivel) => nivel.id === levelId);
    const nextValue: SeletorEstruturaOrganizacionalValueSeplag = {
      ...currentValue,
      [levelId]: selectedIds,
    };

    niveis.slice(levelIndex + 1).forEach((nivel) => {
      delete nextValue[nivel.id];
    });

    setMarked({});
    setCurrentValue(nextValue);
  };

  const toggleMarked = (key: string, itemId: string) => {
    setMarked((previous) => {
      const current = new Set(previous[key] ?? []);
      if (current.has(itemId)) {
        current.delete(itemId);
      } else {
        current.add(itemId);
      }
      return { ...previous, [key]: Array.from(current) };
    });
  };

  const moveMarked = (
    nivel: EstruturaOrganizacionalNivelSeplag,
    direction: "toSelected" | "toAvailable",
    all = false,
  ) => {
    const available = getAvailableItems(nivel, currentValue);
    const selected = getSelectedItems(nivel, currentValue);
    const selectedIds = currentValue[nivel.id] ?? [];
    const sourceKey = `${nivel.id}-${direction}`;
    const idsToMove = all
      ? direction === "toSelected"
        ? available.map((item) => item.id)
        : selected.map((item) => item.id)
      : marked[sourceKey] ?? [];

    if (!idsToMove.length) return;

    if (direction === "toSelected") {
      updateLevelValue(nivel.id, Array.from(new Set([...selectedIds, ...idsToMove])));
      return;
    }

    updateLevelValue(
      nivel.id,
      selectedIds.filter((id) => !idsToMove.includes(id)),
    );
  };

  return (
    <div className={styles.container}>
      {visibleLevels.map((nivel) => {
        const availableItems = filterItems(
          getAvailableItems(nivel, currentValue),
          filters[`${nivel.id}-available`] ?? "",
        );
        const selectedItems = filterItems(
          getSelectedItems(nivel, currentValue),
          filters[`${nivel.id}-selected`] ?? "",
        );
        const isOpen = openLevels[nivel.id] ?? false;

        return (
          <section className={styles.level} key={nivel.id}>
            <button
              className={styles.levelHeader}
              type="button"
              onClick={() =>
                setOpenLevels((previous) => ({
                  ...previous,
                  [nivel.id]: !isOpen,
                }))
              }
            >
              <span>{nivel.titulo}</span>
              <i
                className={`pi ${isOpen ? "pi-chevron-up" : "pi-chevron-down"}`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className={styles.picklist}>
                <SelectionPanel
                  title={nivel.disponiveisTitulo}
                  filterPlaceholder={nivel.filtroPlaceholder}
                  filterValue={filters[`${nivel.id}-available`] ?? ""}
                  onFilterChange={(filterValue) =>
                    setFilters((previous) => ({
                      ...previous,
                      [`${nivel.id}-available`]: filterValue,
                    }))
                  }
                  items={availableItems}
                  markedIds={marked[`${nivel.id}-toSelected`] ?? []}
                  onToggle={(itemId) =>
                    toggleMarked(`${nivel.id}-toSelected`, itemId)
                  }
                />

                <div className={styles.actions} aria-label="Ações de seleção">
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => moveMarked(nivel, "toSelected")}
                    aria-label="Selecionar itens marcados"
                  >
                    &gt;
                  </button>
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => moveMarked(nivel, "toSelected", true)}
                    aria-label="Selecionar todos os itens"
                  >
                    &gt;&gt;
                  </button>
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => moveMarked(nivel, "toAvailable")}
                    aria-label="Remover itens marcados"
                  >
                    &lt;
                  </button>
                  <button
                    className={styles.actionButton}
                    type="button"
                    onClick={() => moveMarked(nivel, "toAvailable", true)}
                    aria-label="Remover todos os itens"
                  >
                    &lt;&lt;
                  </button>
                </div>

                <SelectionPanel
                  title={nivel.selecionadosTitulo}
                  filterPlaceholder={nivel.filtroPlaceholder}
                  filterValue={filters[`${nivel.id}-selected`] ?? ""}
                  onFilterChange={(filterValue) =>
                    setFilters((previous) => ({
                      ...previous,
                      [`${nivel.id}-selected`]: filterValue,
                    }))
                  }
                  items={selectedItems}
                  markedIds={marked[`${nivel.id}-toAvailable`] ?? []}
                  onToggle={(itemId) =>
                    toggleMarked(`${nivel.id}-toAvailable`, itemId)
                  }
                />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}

interface SelectionPanelProps {
  title: string;
  filterPlaceholder: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  items: EstruturaOrganizacionalItemSeplag[];
  markedIds: string[];
  onToggle: (itemId: string) => void;
}

function SelectionPanel({
  title,
  filterPlaceholder,
  filterValue,
  onFilterChange,
  items,
  markedIds,
  onToggle,
}: Readonly<SelectionPanelProps>) {
  const markedSet = new Set(markedIds);

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>{title}</div>
      <div className={styles.panelFilter}>
        <input
          value={filterValue}
          onChange={(event) => onFilterChange(event.target.value)}
          placeholder={filterPlaceholder}
        />
      </div>
      <div className={styles.list}>
        {items.length ? (
          items.map((item) => (
            <button
              className={`${styles.item} ${
                markedSet.has(item.id) ? styles.itemMarked : ""
              }`}
              type="button"
              key={item.id}
              onClick={() => onToggle(item.id)}
            >
              {item.nome}
            </button>
          ))
        ) : (
          <div className={styles.empty}>Nenhum registro encontrado.</div>
        )}
      </div>
    </div>
  );
}

export default SeletorEstruturaOrganizacionalSeplag;
