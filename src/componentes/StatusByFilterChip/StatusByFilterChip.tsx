import { Chip } from "primereact/chip";
import styles from "./StatusByFilterChip.module.scss";
import { StatusKeySeplag, StatusLabels } from "@type/status";

interface Props {
  readonly descStatus?: string | null;
}

export function StatusByFilterChipSeplag({ descStatus }: Props) {
  const raw = descStatus?.trim().toUpperCase() || StatusKeySeplag.PENDENTE;
  const key = Object.values(StatusKeySeplag).includes(raw as StatusKeySeplag)
    ? (raw as StatusKeySeplag)
    : StatusKeySeplag.PENDENTE;

  const label = StatusLabels[key];
  const cssClass = styles[`chip-${key}`] ?? styles[`chip-PENDENTE`];

  return (
    <Chip
      className={`${styles["chip-fixed-width"]} ${cssClass}`}
      label={label}
    />
  );
}
