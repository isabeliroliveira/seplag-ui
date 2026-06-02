export type FolhaPagamentoSituacao =
  | "RASCUNHO"
  | "ABERTO"
  | "AGUARDANDO_PROCESSAMENTO"
  | "EM_PROCESSAMENTO"
  | "PROCESSO_COM_SUCESSO"
  | "PROCESSO_COM_ERRO"
  | "PROCESSO_COM_FALHAS"
  | "CANCELADA";

export type FolhaCompetenciaSituacao =
  | "ATIVA"
  | "FECHADA";

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

export type GrupoFolhaSituacao =
  | "RASCUNHO"
  | "VIGENTE"
  | "INATIVO"
  | "ENCERRADO"
  | "CANCELADO";

export type GrupoFolhaTipo =
  | "NORMAL"
  | "COMPLEMENTAR"
  | "DECIMO_TERCEIRO"
  | "FERIAS"
  | "RESCISAO"
  | "PENSIONISTAS";

export interface GrupoFolhaFiltroForm {
  termo?: string;
  tipoFolha?: GrupoFolhaTipo | "";
  orgaos?: string[];
  situacao?: GrupoFolhaSituacao | "";
}

export interface GrupoFolhaForm {
  codigo?: string;
  nome?: string;
  descricao?: string;
  tipoFolha?: GrupoFolhaTipo | "";
  orgaos?: string[];
  regimeJuridico?: string;
  categoria?: string;
  cargo?: string;
  grupoEleitosPadrao?: string;
  situacao?: GrupoFolhaSituacao;
  vigenciaInicial?: string;
  vigenciaFinal?: string;
  totalMesesAdiantarPadrao?: number;
  totalMesesRetroagirPadrao?: number;
  permiteRetroacao?: "S" | "N";
  herdarConfiguracaoCompetenciaAnterior?: "S" | "N";
  rubricasAssociadas?: string[];
  ordemProcessamento?: string;
  relatoriosDisponiveis?: string[];
}

export interface GrupoFolhaRow extends Required<GrupoFolhaForm> {
  id: number;
  versaoVigente: string;
  ultimaAlteracao: string;
  responsavel: string;
}

export interface GrupoFolhaVersaoRow {
  id: number;
  grupoFolhaId: number;
  versao: string;
  vigenciaInicial: string;
  vigenciaFinal: string;
  alteracao: string;
  motivo: string;
  usuarioResponsavel: string;
  dataHora: string;
  situacao: GrupoFolhaSituacao;
}

export interface FolhaPagamentoFiltroForm {
  termo?: string;
  orgaos?: string[];
  mesAnoReferencia?: string;
  situacao?: FolhaPagamentoSituacao | "";
}

export interface FolhaCompetenciaFiltroForm {
  competencia?: string;
  situacao?: FolhaCompetenciaSituacao | "";
}

export interface FolhaCompetenciaForm {
  codigo?: string;
  nome?: string;
  competencia?: string;
  mesAnoReferencia?: string;
  dataInicio?: string;
  dataFim?: string;
  situacao?: FolhaCompetenciaSituacao;
  observacao?: string;
}

export interface FolhaCompetenciaRow extends Required<FolhaCompetenciaForm> {
  id: number;
  totalFolhas: number;
  createdAt: string;
}

export interface FolhaPagamentoForm {
  competenciaId?: number;
  grupoFolhaId?: number;
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

export type CreateFolhaPagamentoRequest = FolhaPagamentoForm & {
  situacao?: FolhaPagamentoSituacao;
};
export type UpdateFolhaPagamentoRequest = FolhaPagamentoForm & {
  situacao?: FolhaPagamentoSituacao;
};
export type CreateFolhaCompetenciaRequest = FolhaCompetenciaForm;
export type CreateGrupoFolhaRequest = GrupoFolhaForm;
export type UpdateGrupoFolhaRequest = GrupoFolhaForm;

export interface ExecutarFolhaPagamentoRequest {
  folhaPagamentoId: number;
}
