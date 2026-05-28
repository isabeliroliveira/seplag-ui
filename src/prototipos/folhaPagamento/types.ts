export type FolhaPagamentoSituacao =
  | "RASCUNHO"
  | "ABERTA"
  | "EM_FILA"
  | "EM_PROCESSAMENTO"
  | "PROCESSADA"
  | "PROCESSADA_COM_ALERTA"
  | "PROCESSADA_COM_ERRO"
  | "BLOQUEADA"
  | "CANCELADA";

export type FolhaPagamentoExecucaoSituacao =
  | "EM_FILA"
  | "EM_PROCESSAMENTO"
  | "CONCLUIDA"
  | "CONCLUIDA_COM_ALERTA"
  | "CONCLUIDA_COM_ERRO"
  | "CANCELADA";

export type FolhaPagamentoPessoaLogSituacao =
  | "NAO_PROCESSADA"
  | "EM_PROCESSAMENTO"
  | "SUCESSO"
  | "ALERTA"
  | "ERRO"
  | "IGNORADA";

export type FolhaPagamentoRubricaLogSituacao =
  | "CALCULADA"
  | "NAO_ELEGIVEL"
  | "ALERTA"
  | "ERRO"
  | "NAO_PROCESSADA";

export interface FolhaPagamentoFiltroForm {
  termo?: string;
  orgaos?: string[];
  mesAnoReferencia?: string;
  situacao?: FolhaPagamentoSituacao | "";
}

export interface FolhaPagamentoForm {
  nome?: string;
  numero?: string;
  mesAnoReferencia?: string;
  competencia?: string;
  observacao?: string;
  orgaos?: string[];
  regimeJuridico?: string;
  categoria?: string;
  cargo?: string;
  grupoEleitos?: string;
  totalMesesAdiantar?: number;
  totalMesesRetroagir?: number;
}

export interface FolhaPagamentoRow extends Required<FolhaPagamentoForm> {
  id: number;
  situacao: FolhaPagamentoSituacao;
  totalPessoas: number;
  totalSucesso: number;
  totalAlerta: number;
  totalErro: number;
  ultimaExecucao: string;
}

export interface FolhaPagamentoExecucaoRow {
  id: number;
  folhaPagamentoId: number;
  situacao: FolhaPagamentoExecucaoSituacao;
  dataHoraInicio: string;
  dataHoraFim: string;
  usuarioResponsavel: string;
  totalPessoas: number;
  totalSucesso: number;
  totalAlerta: number;
  totalErro: number;
  parametrosResumo: string;
}

export interface FolhaPagamentoPessoaLogFiltroForm {
  matricula?: string;
  nome?: string;
  cpf?: string;
  orgao?: string;
  situacao?: FolhaPagamentoPessoaLogSituacao | "";
  rubrica?: string;
  mensagem?: string;
}

export interface FolhaPagamentoPessoaLogRow {
  id: number;
  execucaoId: number;
  matricula: string;
  vinculo: string;
  nome: string;
  cpf: string;
  orgao: string;
  regimeJuridico: string;
  categoria: string;
  cargo: string;
  grupoEleitos: string;
  situacao: FolhaPagamentoPessoaLogSituacao;
  mensagem: string;
}

export interface FolhaPagamentoRubricaLogRow {
  id: number;
  pessoaLogId: number;
  codigoRubrica: string;
  nomeRubrica: string;
  tipoRubrica: string;
  valorCalculado: string;
  situacao: FolhaPagamentoRubricaLogSituacao;
  mensagem: string;
}

export type CreateFolhaPagamentoRequest = FolhaPagamentoForm;
export type UpdateFolhaPagamentoRequest = FolhaPagamentoForm;

export interface ExecutarFolhaPagamentoRequest {
  folhaPagamentoId: number;
}
