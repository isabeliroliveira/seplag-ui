export const StatusKeySeplag = {
  ATIVO: "ATIVO",
  ENCERRADO: "ENCERRADO",
  AGENDADO: "AGENDADO",
  EXTINTO: "EXTINTO",
  INATIVO: "INATIVO",
  PENDENTE: "PENDENTE",
} as const;

export type StatusKeySeplag =
  (typeof StatusKeySeplag)[keyof typeof StatusKeySeplag];

export const StatusLabels: Record<StatusKeySeplag, string> = {
  [StatusKeySeplag.ATIVO]: "Ativo",
  [StatusKeySeplag.ENCERRADO]: "Encerrado",
  [StatusKeySeplag.AGENDADO]: "Agendado",
  [StatusKeySeplag.EXTINTO]: "Extinto",
  [StatusKeySeplag.INATIVO]: "Inativo",
  [StatusKeySeplag.PENDENTE]: "Pendente",
};
