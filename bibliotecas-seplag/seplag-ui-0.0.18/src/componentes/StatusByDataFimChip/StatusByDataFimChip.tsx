import { isBefore, parse } from "date-fns";
import { Chip } from "primereact/chip";
import styles from "./StatusByDataFimChip.module.scss";
import { StatusKeySeplag, StatusLabels } from "@type/status";

interface Props {
  readonly dataFim?: string | null;
}

export function StatusByDataFimChipSeplag({ dataFim }: Props) {
  let ativo = true;

  if (dataFim) {
    const dataFimParsed = parse(dataFim, "dd/MM/yyyy", new Date());
    const hoje = new Date();

    ativo = isBefore(hoje, dataFimParsed);
  }

  const key = ativo ? StatusKeySeplag.ATIVO : StatusKeySeplag.INATIVO;
  const label = StatusLabels[key];
  const cssClass = styles[`chip-${key}`] ?? styles[`chip-ATIVO`];

  return (
    <Chip
      className={`${styles["chip-fixed-width"]} ${cssClass}`}
      label={label}
    />
  );
}
