import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import {
  BotaoLimparFiltroSeplag,
  BotaoSalvarSeplag,
  BotaoSeplag,
  BotaoVoltarSeplag,
} from "@componentes/Botao";
import { AnexarDocumentoSeplag } from "@componentes/AnexarDocumento";
import type { ArquivoAnexadoSeplag } from "@componentes/AnexarDocumento";
import { BadgeSeplag } from "@componentes/Badge";
import { CardSeplag } from "@componentes/Card";
import { ModalSeplag } from "@componentes/Modal";
import {
  DocumentosLegaisAssociadosSeplag,
  type DocumentoLegalAssociadoSeplag,
} from "@componentes/DocumentosLegaisAssociados";
import {
  DateFieldSeplag,
  DropdownFieldSeplag,
  MultiSelectFieldSeplag,
  TextAreaFieldSeplag,
  TextFieldSeplag,
} from "@componentes/Fields";
import {
  SITUACAO_VIGENCIA,
  STATUS_OPERACIONAL_VIGENCIA,
  SituacaoVigenciaSeplag,
  validarSituacaoVigenciaSeplag,
  type StatusOperacionalVigenciaSeplag,
  type SituacaoVigenciaValueSeplag,
} from "@componentes/SituacaoVigencia";
import {
  SeletorEstruturaOrganizacionalSeplag,
  type EstruturaOrganizacionalNivelSeplag,
  type SeletorEstruturaOrganizacionalValueSeplag,
} from "@componentes/SeletorEstruturaOrganizacional";
import {
  TablePaginadoSeplag,
  type ColumnMetaSeplag,
} from "@componentes/TablePaginado";
import { PickListSeplag } from "@componentes/PickList";
import { TabsSeplag, type TabItemSeplag } from "@componentes/Tabs";
import { LayoutSeplag } from "@componentes/layout/layout/Layout";
import type { IMenuSeplag, IVinculoSeplag } from "@componentes/layout/Config/menu";
import type { AppSystemItemSeplag } from "@componentes/layout/AppSwitcher";
import type { ResultsSeplag } from "../interfaces/Results";
import logoEstado from "../assets/img/Logo_Branco_Estado_MT.png";
import logoSeplag from "../assets/img/logo-seplag.png";
import "../componentes/layout/layout/Layout.css";
import "./prototipos.css";

const menuGestaoPessoas: IMenuSeplag[] = [
  {
    label: "Página Inicial",
    icon: "pi pi-home",
    to: "/prototipos/sigep",
    visibleOnMenu: true,
    visibleOnRouter: true,
  },
  {
    label: "Cadastro",
    icon: "pi pi-file-edit",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
    items: [
      {
        label: "Pessoas",
        icon: "pi pi-users",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          { label: "Pessoa Física", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Pessoa Jurídica", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Dependente", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Tipo Dependência", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Representante Legal", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Estrutura Organizacional",
        icon: "pi pi-sitemap",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          { label: "Instituição", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Órgão Entidade", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Setor", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Cargo e Concurso",
        icon: "pi pi-briefcase",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          {
            label: "Regime Jurídico",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/regime-juridico",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          { label: "Categoria", icon: "pi pi-circle-on", to: "/prototipos/sigep/categoria", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Cargo", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Tabelas de Vencimentos", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Vínculos Funcionais",
        icon: "pi pi-link",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          { label: "Tipo de Vínculo", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Vínculo", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Vacância", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Documentação",
        icon: "pi pi-folder-open",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [{ label: "Documentos Legais", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true }],
      },
      {
        label: "Aposentadoria e Benefícios",
        icon: "pi pi-hourglass",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          { label: "Tipo Aposentadoria", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Aposentadoria", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Tipo de Pensão", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Parametrização",
        icon: "pi pi-cog",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          { label: "Listas de Referências", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Gestão de Documentos", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
          { label: "Componentes", icon: "pi pi-circle-on", to: "/prototipos/sigep/componentes", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
    ],
  },
];

const menuFolha: IMenuSeplag[] = [
  {
    label: "Página Inicial",
    icon: "pi pi-home",
    to: "/prototipos/folha",
    visibleOnMenu: true,
    visibleOnRouter: true,
  },
  {
    label: "Rubricas",
    icon: "pi pi-tag",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
    items: [
      { label: "Catálogo de Rubricas", icon: "pi pi-circle-on", to: "/prototipos/folha/catalogo-rubricas", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Solicitação de Rubrica", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
    ],
  },
  {
    label: "Cadastro",
    icon: "pi pi-list",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
    items: [
      { label: "Configurações de Folha", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Folha de Pagamento", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Evento", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Tipo Evento", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      {
        label: "Grupo de Eleitos",
        icon: "pi pi-circle-on",
        to: "/prototipos/folha/grupo-eleitos",
        visibleOnMenu: true,
        visibleOnRouter: true,
      },
      {
        label: "Grupos de Cálculo da Folha",
        icon: "pi pi-circle-on",
        to: "/prototipos/folha/grupos-calculo",
        visibleOnMenu: true,
        visibleOnRouter: true,
      },
      { label: "Parâmetros de Folha", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Pensão Alimentícia", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Pensão Especial", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
      { label: "Pensão por Morte", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
    ],
  },
  {
    label: "Lançamento Financeiro",
    icon: "pi pi-money-bill",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
    items: [
      {
        label: "Retenções Judiciais",
        icon: "pi pi-folder-open",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          {
            label: "Penhora Judicial",
            icon: "pi pi-circle-on",
            to: "/prototipos/folha/penhora-judicial",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
        ],
      },
    ],
  },
];

const menuSimples: IMenuSeplag[] = [
  {
    label: "Página Inicial",
    icon: "pi pi-home",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
  },
];

const vinculos: IVinculoSeplag[] = [
  { numrVinculo: 2, statVinculo: "ATIVO", unidade: { descUnidade: "CDS-TI" }, orgao: { descOrgao: "SEPLAG-MT" } },
  { numrVinculo: 1, statVinculo: "ATIVO", unidade: { descUnidade: "STI" }, orgao: { descOrgao: "SEPLAG-MT" } },
];

const prototypeSystems = [
  {
    id: "sigep",
    title: "SIGEP",
    description: "Sistema Integrado de Gestão de Pessoas",
    path: "/prototipos/sigep",
    icon: "pi pi-users",
    status: "Protótipo disponível",
  },
];

const sistemas: AppSystemItemSeplag[] = [
  { id: "gestao-pessoas", label: "GESTÃO DE PESSOAS", url: "#/prototipos/sigep", icon: "pi pi-users" },
  { id: "folha", label: "FOLHA", url: "#/prototipos/folha", icon: "pi pi-money-bill" },
  { id: "pericia", label: "PERÍCIA", url: "#/prototipos/pericia", icon: "pi pi-plus-circle" },
  { id: "consignado", label: "CONSIGNADO", url: "#/prototipos/consignado", icon: "pi pi-wallet" },
  { id: "contagem-tempo", label: "CONTAGEM DE TEMPO", url: "#/prototipos/contagem-tempo", icon: "pi pi-clock" },
  { id: "e-social", label: "E-SOCIAL", url: "#/prototipos/e-social", icon: "pi pi-file" },
  { id: "aposentadoria", label: "APOSENTADORIA", url: "#/prototipos/aposentadoria", icon: "pi pi-users" },
  { id: "conformidade", label: "CONFORMIDADE", url: "#/prototipos/conformidade", icon: "pi pi-verified" },
  { id: "auditoria", label: "AUDITORIA", url: "#/prototipos/auditoria", icon: "pi pi-check-square" },
];

const componentPrototypeItems = [
  {
    id: "situacao-vigencia",
    title: "Situação e Vigência",
    description:
      "Controle padronizado de situação, vigência e status operacional.",
    path: "/prototipos/sigep/componentes/situacao-vigencia",
    icon: "pi pi-calendar-clock",
    status: "Componente disponível",
  },
  {
    id: "documentos-vinculados",
    title: "Documentos Vinculados",
    description:
      "Seleção e vínculo de documentos previamente cadastrados no sistema.",
    path: "/prototipos/sigep/componentes/documentos-vinculados",
    icon: "pi pi-file-check",
    status: "Componente em definição",
  },
  {
    id: "anexar-documento",
    title: "Anexar Documento",
    description:
      "Upload de arquivo PDF com visualização e remoção do documento anexado.",
    path: "/prototipos/sigep/componentes/anexar-documento",
    icon: "pi pi-paperclip",
    status: "Componente disponível",
  },
  {
    id: "estrutura-organizacional",
    title: "Estrutura Organizacional",
    description:
      "Seleção hierárquica de instituições, órgãos e unidades vinculadas.",
    path: "/prototipos/sigep/componentes/estrutura-organizacional",
    icon: "pi pi-sitemap",
    status: "Componente em definição",
  },
];

const documentosLegaisMock: DocumentoLegalAssociadoSeplag[] = [
  {
    id: "lei-12345-2023",
    titulo: "Lei 12.345/2023",
    categoria: "Lei",
    descricao: "Organização administrativa municipal.",
  },
  {
    id: "decreto-456-2024",
    titulo: "Decreto 456/2024",
    categoria: "Decreto",
    descricao: "Regulamentação de eventos públicos.",
  },
  {
    id: "norma-001a-2022",
    titulo: "Norma 001-A/2022",
    categoria: "Norma",
    descricao: "Diretrizes de segurança da informação.",
  },
  {
    id: "portaria-123-2024",
    titulo: "Portaria 123/2024",
    categoria: "Portaria",
    descricao: "Regras de conduta para servidores.",
  },
  {
    id: "lei-complementar-88-2023",
    titulo: "Lei Complementar 88/2023",
    categoria: "Lei",
    descricao: "Estatuto dos servidores públicos municipais.",
  },
  {
    id: "decreto-789-2024",
    titulo: "Decreto 789/2024",
    categoria: "Decreto",
    descricao: "Procedimentos para tramitação digital.",
  },
];

const estruturaOrganizacionalNiveis: EstruturaOrganizacionalNivelSeplag[] = [
  {
    id: "instituicoes",
    titulo: "Instituições",
    disponiveisTitulo: "Instituições disponíveis",
    selecionadosTitulo: "Instituições selecionadas",
    filtroPlaceholder: "Procurar por instituição",
    itens: [
      { id: "govmt", nome: "Governo do Estado de Mato Grosso" },
      {
        id: "empaer",
        nome: "Empresa Mato-grossense de Pesquisa Assistência e Extensão Rural",
      },
      {
        id: "mtitec",
        nome: "Empresa Mato-grossense de Tecnologia da Informação",
      },
      { id: "mtgas", nome: "Companhia Mato-grossense de Gás" },
      {
        id: "sanemat",
        nome: "Companhia de Saneamento do Estado de Mato Grosso",
      },
      { id: "mtpar", nome: "MT Participações e Projetos S.A." },
      { id: "metamat", nome: "Companhia Mato-grossense de Mineração" },
    ],
  },
  {
    id: "orgaos",
    titulo: "Órgãos do GOVMT",
    disponiveisTitulo: "Órgãos disponíveis",
    selecionadosTitulo: "Órgãos selecionados",
    filtroPlaceholder: "Procurar por órgão",
    parentLevelId: "instituicoes",
    itens: [
      { id: "casa-civil", parentId: "govmt", nome: "Casa Civil do Estado de Mato Grosso" },
      { id: "cge", parentId: "govmt", nome: "Controladoria Geral do Estado (CGE-MT)" },
      { id: "pge", parentId: "govmt", nome: "Procuradoria Geral do Estado (PGE-MT)" },
      { id: "sefaz", parentId: "govmt", nome: "Secretaria de Estado de Fazenda (SEFAZ-MT)" },
      { id: "setasc", parentId: "govmt", nome: "Secretaria de Estado de Assistência Social e Cidadania (SETASC-MT)" },
      { id: "detran", parentId: "govmt", nome: "Departamento Estadual de Trânsito (DETRAN-MT)" },
      { id: "sesp", parentId: "govmt", nome: "Secretaria de Estado de Segurança Pública (SESP-MT)" },
      { id: "pmmt", parentId: "govmt", nome: "Polícia Militar do Estado de Mato Grosso" },
      { id: "pjc", parentId: "govmt", nome: "Polícia Judiciária Civil (PJC-MT)" },
      { id: "cbm", parentId: "govmt", nome: "Corpo de Bombeiros Militar (CBM-MT)" },
      { id: "seaf", parentId: "govmt", nome: "Secretaria de Estado de Agricultura Familiar (SEAF-MT)" },
      { id: "intermat", parentId: "govmt", nome: "Instituto de Terras de Mato Grosso (INTERMAT)" },
      { id: "indea", parentId: "govmt", nome: "Instituto de Defesa Agropecuária do Estado de MT (INDEA-MT)" },
      { id: "seduc", parentId: "govmt", nome: "Secretaria de Estado de Educação (SEDUC-MT)" },
      { id: "seciteci", parentId: "govmt", nome: "Secretaria de Estado de Ciência, Tecnologia e Inovação (SECITECI-MT)" },
      { id: "ses", parentId: "govmt", nome: "Secretaria de Estado de Saúde (SES-MT)" },
      { id: "seplag", parentId: "govmt", nome: "Secretaria de Estado de Planejamento e Gestão (SEPLAG-MT)" },
      { id: "sema", parentId: "govmt", nome: "Secretaria de Estado de Meio Ambiente (SEMA-MT)" },
      { id: "secom", parentId: "govmt", nome: "Secretaria de Estado de Comunicação (SECOM-MT)" },
      { id: "politec", parentId: "govmt", nome: "Perícia Oficial e Identificação Técnica (POLITEC-MT)" },
    ],
  },
  {
    id: "unidades",
    titulo: "Unidades da SEPLAG",
    disponiveisTitulo: "Unidades disponíveis",
    selecionadosTitulo: "Unidades selecionadas",
    filtroPlaceholder: "Procurar por unidade",
    parentLevelId: "orgaos",
    itens: [{ id: "sapgd", parentId: "seplag", nome: "SAPGD" }],
  },
  {
    id: "setores",
    titulo: "Setores da SAPGD",
    disponiveisTitulo: "Setores disponíveis",
    selecionadosTitulo: "Setores selecionados",
    filtroPlaceholder: "Procurar por setor",
    parentLevelId: "unidades",
    itens: [{ id: "cppti", parentId: "sapgd", nome: "CPPTI" }],
  },
];

interface PrototypeSystemPageProps {
  nomeSistema: string;
  ambienteSistema: string;
  menuItems: IMenuSeplag[];
  message?: string;
  children?: ReactNode;
}

function PrototypeSystemPage({
  nomeSistema,
  ambienteSistema,
  menuItems,
  message,
  children,
}: Readonly<PrototypeSystemPageProps>) {
  return (
    <div className="prototype-shell">
      <LayoutSeplag
        nomeSistema={nomeSistema}
        ambienteSistema={ambienteSistema}
        sistemas={sistemas}
        logoSrc={logoSeplag}
        menuItems={menuItems}
        menuMode="static"
        footerText="SEPLAG - SSCPG - Superintendência de Sistemas Corporativos de Planejamento e Gestão"
        nomeApresentacao="ROBERTO JUNIOR"
        numrVinculoAtual={2}
        vinculos={vinculos}
        onLogout={() => {}}
        onAlterarSenha={() => {}}
        onSelecionarVinculo={() => {}}
      >
        {children ?? (
          <div className="prototype-content">
            <img src={logoEstado} alt="Brasão do Estado de Mato Grosso" />
            {message && <div className="prototype-message">{message}</div>}
          </div>
        )}
      </LayoutSeplag>
    </div>
  );
}

export function PrototiposPage() {
  return (
    <main className="prototype-selection-page">
      <section className="prototype-selection-header">
        <span>Protótipos</span>
        <h1>Selecione um sistema</h1>
        <p>
          Escolha o sistema para visualizar os fluxos prototipados com a
          biblioteca de componentes da SEPLAG.
        </p>
      </section>

      <section className="prototype-system-grid" aria-label="Sistemas disponíveis">
        {prototypeSystems.map((system) => (
          <Link
            className="prototype-system-link"
            key={system.id}
            to={system.path}
            aria-label={`Abrir protótipo ${system.title}`}
          >
            <CardSeplag cols="12" cardHeaderClassNames="prototype-system-card">
              <div className="prototype-system-card-content">
                <div className="prototype-system-icon" aria-hidden="true">
                  <i className={system.icon} />
                </div>
                <div className="prototype-system-info">
                  <span>{system.status}</span>
                  <h2>{system.title}</h2>
                  <p>{system.description}</p>
                </div>
                <span className="prototype-system-action">
                  Acessar
                  <i className="pi pi-arrow-right" aria-hidden="true" />
                </span>
              </div>
            </CardSeplag>
          </Link>
        ))}
      </section>
    </main>
  );
}

interface SituacaoVigenciaDemoForm extends SituacaoVigenciaValueSeplag {
  possuiVinculosOuDependencias: boolean;
}

interface CategoriaFiltroForm {
  categoria?: string;
  instituicao?: string;
  situacao?: string;
}

interface RegimeJuridicoFiltroForm {
  nome?: string;
  instituicao?: string;
  situacao?: string;
}

interface GrupoEleitosFiltroForm {
  termo?: string;
  finalidade?: string;
  dataInicio?: string;
  dataFim?: string;
}

interface GrupoCalculoFiltroForm {
  orgao?: string;
  nomeGrupo?: string;
  situacao?: StatusOperacionalVigenciaSeplag | "";
  tipoFolha?: string;
  tipoVinculo?: string;
  competencia?: string;
  vigenteEm?: string;
}

interface GrupoCalculoForm {
  codigo?: string;
  nome?: string;
  descricao?: string;
  grupoSuperior?: string;
  nivelEspecificidade?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
  tipoFolha?: string;
  permiteHeranca?: string;
  permiteSobrescreverOrdem?: string;
  observacao?: string;
  criterioOrgao?: string;
  criterioTipoVinculo?: string;
  criterioRegimeJuridico?: string;
  criterioCategoria?: string;
  criterioCargo?: string;
  criterioSituacaoFuncional?: string;
  rubricaFiltroTermo?: string;
  rubricaFiltroTipo?: string;
  rubricaFiltroNatureza?: string;
  rubricaFiltroSituacao?: string;
  rubricaFiltroPossuiFormula?: string;
  simulacaoCompetencia?: string;
  simulacaoOrgao?: string;
  simulacaoTipoVinculo?: string;
  simulacaoSituacaoFuncional?: string;
  simulacaoAmostra?: string;
}

interface GrupoEleitoForm {
  descricao?: string;
  finalidade?: string;
  observacoes?: string;
  participanteBusca?: string;
  consultar?: "todos" | "disponiveis" | "eleitos";
  filtroInstituicao?: string[];
  filtroOrgao?: string[];
  filtroTipoVinculo?: string[];
  filtroSetor?: string[];
  filtroCategoria?: string[];
  filtroCargo?: string[];
}

interface RegimeJuridicoForm {
  nome?: string;
  sigla?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
}

interface CategoriaForm {
  sigla?: string;
  descricao?: string;
  observacao?: string;
  subcategoriaNome?: string;
  subcategoriaDescricao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
}

interface CategoriaRow {
  id: number;
  sigla: string;
  descricao: string;
  instituicao: string;
  instituicoesVinculadas: number;
  situacao: "ATIVO" | "ENCERRADO";
}

interface RegimeJuridicoRow {
  id: number;
  nome: string;
  descricao: string;
  instituicao: string;
  instituicoesVinculadas: number;
  situacao: StatusOperacionalVigenciaSeplag;
}

interface GrupoEleitosRow {
  id: number;
  codigo: number;
  descricao: string;
  finalidade: string;
  quantidadeEleitos: number;
  dataCadastro: string;
}

interface GrupoCalculoRow {
  id: number;
  codigo: string;
  grupo: string;
  nivel: number;
  herdaDe: string;
  orgaoSetor: string;
  tipoVinculo: string;
  situacao: StatusOperacionalVigenciaSeplag;
  inicioVigencia: string;
  fimVigencia: string;
  rubricas: number;
  pendencias: number;
}

interface GrupoCalculoCriterioRow {
  id: number;
  criterio: string;
  operador: string;
  valor: string;
}

interface GrupoCalculoHerancaRubricaRow {
  id: number;
  rubrica: string;
  origem: string;
  ativaNesteGrupo: boolean;
  ordemHerdada: string;
  ordemLocal: string;
  acao: "Manter" | "Sobrescrever" | "Excluir localmente" | "Restaurar padrão";
}

interface GrupoCalculoSimulacaoRow {
  id: number;
  vinculo: string;
  servidor: string;
  orgao: string;
  tipoVinculo: string;
  cargo: string;
  situacao: string;
  grupoAplicado: string;
  observacao: string;
}

interface GrupoCalculoValidacaoRow {
  id: number;
  tipo: string;
  descricao: string;
  severidade: "Bloqueante" | "Alerta" | "Informativo";
  acaoSugerida: string;
  abaRelacionada: string;
}

interface CatalogoRubricaFiltroForm {
  termo?: string;
  status?: "Ativa" | "Inativa" | "Extintas" | "";
}

interface InativarRubricaForm {
  motivoInativacao: string;
  dataFim: string;
}

interface RubricaRow {
  id: number;
  codigo: string;
  nomeRubrica: string;
  naturezaVerba: string;
  dataAprovacao: string;
  status: "Ativa" | "Inativa" | "Extintas";
}

interface GrupoEleitoParticipanteRow {
  id: number;
  matricula: string;
  vinculo: string;
  servidor: string;
  orgaoEntidade: string;
  dataExercicioAposentadoria: string;
}

interface SubcategoriaRow {
  id: number;
  nome: string;
  descricao: string;
  orgaosVinculados: number;
  situacao: "ATIVO" | "ENCERRADO";
}

const categoriasMock: CategoriaRow[] = [
  {
    id: 1,
    sigla: "n/a abc",
    descricao: "n/a abc",
    instituicao: "seplag",
    instituicoesVinculadas: 1,
    situacao: "ATIVO",
  },
  {
    id: 2,
    sigla: "N/A/D",
    descricao: "N/A/D",
    instituicao: "seplag",
    instituicoesVinculadas: 2,
    situacao: "ATIVO",
  },
  {
    id: 3,
    sigla: "N/A",
    descricao: "N/A",
    instituicao: "casa-civil",
    instituicoesVinculadas: 2,
    situacao: "ENCERRADO",
  },
  {
    id: 4,
    sigla: "N/A N/A B/A",
    descricao: "B/A BA/",
    instituicao: "mti",
    instituicoesVinculadas: 3,
    situacao: "ENCERRADO",
  },
  {
    id: 5,
    sigla: "fffffffffffffff",
    descricao: "Agentes Governamentais da Cultura sss",
    instituicao: "seplag",
    instituicoesVinculadas: 3,
    situacao: "ATIVO",
  },
  {
    id: 6,
    sigla: "fffffffffffffff",
    descricao: "Agentes Governamentais da Cultura sss",
    instituicao: "casa-civil",
    instituicoesVinculadas: 3,
    situacao: "ATIVO",
  },
  {
    id: 7,
    sigla: "rgrgrgrgrg",
    descricao: "rgrg",
    instituicao: "mti",
    instituicoesVinculadas: 1,
    situacao: "ATIVO",
  },
];

const regimesJuridicosMock: RegimeJuridicoRow[] = [
  {
    id: 1,
    nome: "ESTATUTARIO CIVIL",
    descricao: "Estatutário Civil",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO,
  },
  {
    id: 2,
    nome: "ESTATUTARIO MILITAR",
    descricao: "Estatutário Militar",
    instituicao: "govmt",
    instituicoesVinculadas: 3,
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
  },
  {
    id: 3,
    nome: "MILITAR TEMPORARIO",
    descricao: "Militar Temporário",
    instituicao: "govmt",
    instituicoesVinculadas: 2,
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO,
  },
  {
    id: 4,
    nome: "REGIME CELETISTA",
    descricao: "Regime Celetista",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
  },
  {
    id: 5,
    nome: "REGIME ESPECIAL",
    descricao: "Regime Especial(Contrato Temporário)",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO,
  },
  {
    id: 6,
    nome: "REGIME MISTO",
    descricao: "Regime Misto(Comissionados)",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    situacao: STATUS_OPERACIONAL_VIGENCIA.EXTINTO,
  },
];

const gruposEleitosMock: GrupoEleitosRow[] = [
  {
    id: 81,
    codigo: 81,
    descricao: "PESSOA FÍSICA",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "15/05/2026",
  },
  {
    id: 79,
    codigo: 79,
    descricao: "abc123",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "14/05/2026",
  },
  {
    id: 80,
    codigo: 80,
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minima reprehenderit cupiditate tempore. Commodi dignissimos ad impedit repellendus consequatur aliquam cumque magnam saepe vero dolor acc",
    finalidade: "CONTAGEM DE TEMPO",
    quantidadeEleitos: 0,
    dataCadastro: "14/05/2026",
  },
  {
    id: 77,
    codigo: 77,
    descricao: "Grupo Teste",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "11/05/2026",
  },
  {
    id: 75,
    codigo: 75,
    descricao: "TESTE",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "29/04/2026",
  },
  {
    id: 76,
    codigo: 76,
    descricao: "TESTE",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "29/04/2026",
  },
  {
    id: 74,
    codigo: 74,
    descricao: "Teste 24/04/2026",
    finalidade: "FOLHA DE PAGAMENTO",
    quantidadeEleitos: 0,
    dataCadastro: "27/04/2026",
  },
];

const catalogoRubricaStatusOptions = [
  { label: "Todos", value: "" },
  { label: "Ativa", value: "Ativa" },
  { label: "Inativa", value: "Inativa" },
  { label: "Extintas", value: "Extintas" },
];

const rubricaStatusBadge: Record<RubricaRow["status"], { label: string; color: string; bg: string; icon: string }> = {
  Ativa: { label: "Ativa", color: "#168821", bg: "#d4edda", icon: "pi pi-check" },
  Inativa: { label: "Inativa", color: "#c0392b", bg: "#fde8e6", icon: "pi pi-ban" },
  Extintas: { label: "Extintas", color: "#b42318", bg: "#fee4e2", icon: "pi pi-times-circle" },
};

const catalogoRubricasMock: RubricaRow[] = [
  {
    id: 1,
    codigo: "1001",
    nomeRubrica: "SALÁRIO BÁSICO",
    naturezaVerba: "Provento",
    dataAprovacao: "10/05/2026",
    status: "Ativa",
  },
  {
    id: 2,
    codigo: "1002",
    nomeRubrica: "ADICIONAL NOTURNO",
    naturezaVerba: "Provento",
    dataAprovacao: "02/05/2026",
    status: "Inativa",
  },
  {
    id: 3,
    codigo: "1003",
    nomeRubrica: "DÉCIMO TERCEIRO",
    naturezaVerba: "Provento",
    dataAprovacao: "15/04/2026",
    status: "Extintas",
  },
  {
    id: 4,
    codigo: "1004",
    nomeRubrica: "VALE ALIMENTAÇÃO",
    naturezaVerba: "Provento",
    dataAprovacao: "18/05/2026",
    status: "Ativa",
  },
  {
    id: 5,
    codigo: "1005",
    nomeRubrica: "CONTRIBUIÇÃO SINDICAL",
    naturezaVerba: "Desconto",
    dataAprovacao: "22/05/2026",
    status: "Inativa",
  },
  {
    id: 6,
    codigo: "1006",
    nomeRubrica: "PREVIDÊNCIA RPPS",
    naturezaVerba: "Desconto",
    dataAprovacao: "23/05/2026",
    status: "Ativa",
  },
  {
    id: 7,
    codigo: "1007",
    nomeRubrica: "IRRF",
    naturezaVerba: "Desconto",
    dataAprovacao: "24/05/2026",
    status: "Ativa",
  },
  {
    id: 8,
    codigo: "1008",
    nomeRubrica: "GRATIFICAÇÃO DE FUNÇÃO",
    naturezaVerba: "Provento",
    dataAprovacao: "25/05/2026",
    status: "Ativa",
  },
  {
    id: 9,
    codigo: "1009",
    nomeRubrica: "AUXÍLIO TRANSPORTE",
    naturezaVerba: "Provento",
    dataAprovacao: "26/05/2026",
    status: "Ativa",
  },
  {
    id: 10,
    codigo: "1010",
    nomeRubrica: "BASE PREVIDENCIÁRIA",
    naturezaVerba: "Provento",
    dataAprovacao: "27/05/2026",
    status: "Ativa",
  },
  {
    id: 11,
    codigo: "1011",
    nomeRubrica: "TETO REMUNERATÓRIO",
    naturezaVerba: "Desconto",
    dataAprovacao: "28/05/2026",
    status: "Ativa",
  },
  {
    id: 12,
    codigo: "1012",
    nomeRubrica: "MEMÓRIA DE CÁLCULO",
    naturezaVerba: "Provento",
    dataAprovacao: "29/05/2026",
    status: "Ativa",
  },
  {
    id: 13,
    codigo: "1013",
    nomeRubrica: "ADICIONAL DE INSALUBRIDADE",
    naturezaVerba: "Provento",
    dataAprovacao: "30/05/2026",
    status: "Inativa",
  },
  {
    id: 14,
    codigo: "1014",
    nomeRubrica: "DEVOLUÇÃO DE VALORES",
    naturezaVerba: "Desconto",
    dataAprovacao: "31/05/2026",
    status: "Extintas",
  },
];

const gruposCalculoMock: GrupoCalculoRow[] = [
  {
    id: 1,
    codigo: "G001",
    grupo: "Geral",
    nivel: 1,
    herdaDe: "-",
    orgaoSetor: "Todos",
    tipoVinculo: "Todos",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    inicioVigencia: "01/2026",
    fimVigencia: "-",
    rubricas: 42,
    pendencias: 0,
  },
  {
    id: 2,
    codigo: "G010",
    grupo: "Efetivos",
    nivel: 2,
    herdaDe: "Geral",
    orgaoSetor: "Todos",
    tipoVinculo: "Efetivo",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    inicioVigencia: "01/2026",
    fimVigencia: "-",
    rubricas: 35,
    pendencias: 0,
  },
  {
    id: 3,
    codigo: "G011",
    grupo: "Efetivos SEDUC",
    nivel: 3,
    herdaDe: "Efetivos",
    orgaoSetor: "SEDUC",
    tipoVinculo: "Efetivo",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO,
    inicioVigencia: "01/2026",
    fimVigencia: "06/2026",
    rubricas: 38,
    pendencias: 1,
  },
  {
    id: 4,
    codigo: "G020",
    grupo: "Contratados",
    nivel: 2,
    herdaDe: "Geral",
    orgaoSetor: "Todos",
    tipoVinculo: "Contratado",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    inicioVigencia: "01/2026",
    fimVigencia: "-",
    rubricas: 21,
    pendencias: 0,
  },
  {
    id: 5,
    codigo: "G030",
    grupo: "Comissionados",
    nivel: 2,
    herdaDe: "Geral",
    orgaoSetor: "Todos",
    tipoVinculo: "Comissionado",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO,
    inicioVigencia: "06/2026",
    fimVigencia: "-",
    rubricas: 18,
    pendencias: 2,
  },
  {
    id: 6,
    codigo: "G040",
    grupo: "Inativos",
    nivel: 2,
    herdaDe: "Geral",
    orgaoSetor: "Todos",
    tipoVinculo: "Aposentado",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
    inicioVigencia: "01/2025",
    fimVigencia: "12/2025",
    rubricas: 27,
    pendencias: 0,
  },
  {
    id: 7,
    codigo: "G041",
    grupo: "Pensionistas",
    nivel: 2,
    herdaDe: "Geral",
    orgaoSetor: "Todos",
    tipoVinculo: "Pensionista",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO,
    inicioVigencia: "02/2026",
    fimVigencia: "08/2026",
    rubricas: 16,
    pendencias: 3,
  },
  {
    id: 8,
    codigo: "G050",
    grupo: "Efetivos PGE",
    nivel: 3,
    herdaDe: "Efetivos",
    orgaoSetor: "PGE",
    tipoVinculo: "Efetivo",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    inicioVigencia: "01/2026",
    fimVigencia: "-",
    rubricas: 38,
    pendencias: 1,
  },
  {
    id: 9,
    codigo: "G060",
    grupo: "Professores SEDUC 40h",
    nivel: 4,
    herdaDe: "Efetivos SEDUC",
    orgaoSetor: "SEDUC",
    tipoVinculo: "Efetivo",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    inicioVigencia: "03/2026",
    fimVigencia: "-",
    rubricas: 44,
    pendencias: 0,
  },
  {
    id: 10,
    codigo: "G070",
    grupo: "Contratados SEPLAG",
    nivel: 3,
    herdaDe: "Contratados",
    orgaoSetor: "SEPLAG",
    tipoVinculo: "Contratado",
    situacao: STATUS_OPERACIONAL_VIGENCIA.EXTINTO,
    inicioVigencia: "01/2025",
    fimVigencia: "04/2026",
    rubricas: 19,
    pendencias: 0,
  },
];

const gruposCalculoCriteriosMock: GrupoCalculoCriterioRow[] = [
  { id: 1, criterio: "Órgão", operador: "igual a", valor: "SEDUC" },
  { id: 2, criterio: "Tipo de vínculo", operador: "igual a", valor: "Efetivo" },
  { id: 3, criterio: "Regime jurídico", operador: "igual a", valor: "Estatutário" },
  { id: 4, criterio: "Regime previdenciário", operador: "igual a", valor: "RPPS" },
  { id: 5, criterio: "Categoria", operador: "igual a", valor: "Professor" },
  { id: 6, criterio: "Subcategoria", operador: "em lista", valor: "Professor 30h, Professor 40h" },
  { id: 7, criterio: "Cargo", operador: "em lista", valor: "Professor, Técnico" },
  { id: 8, criterio: "Situação funcional", operador: "em lista", valor: "Ativo" },
  { id: 9, criterio: "Grupo de eleitos", operador: "igual a", valor: "PESSOA FÍSICA" },
];

const gruposCalculoHerancaRubricasMock: GrupoCalculoHerancaRubricaRow[] = [
  {
    id: 1,
    rubrica: "Subsídio",
    origem: "Efetivos",
    ativaNesteGrupo: true,
    ordemHerdada: "001",
    ordemLocal: "001",
    acao: "Manter",
  },
  {
    id: 2,
    rubrica: "Previdência RPPS",
    origem: "Efetivos",
    ativaNesteGrupo: true,
    ordemHerdada: "002",
    ordemLocal: "003",
    acao: "Sobrescrever",
  },
  {
    id: 3,
    rubrica: "IRRF",
    origem: "Geral",
    ativaNesteGrupo: true,
    ordemHerdada: "003",
    ordemLocal: "004",
    acao: "Manter",
  },
  {
    id: 4,
    rubrica: "Auxílio Alimentação SEDUC",
    origem: "Efetivos SEDUC",
    ativaNesteGrupo: true,
    ordemHerdada: "-",
    ordemLocal: "002",
    acao: "Sobrescrever",
  },
  {
    id: 5,
    rubrica: "Gratificação X",
    origem: "Geral",
    ativaNesteGrupo: false,
    ordemHerdada: "005",
    ordemLocal: "-",
    acao: "Excluir localmente",
  },
  {
    id: 6,
    rubrica: "Base Previdenciária",
    origem: "Geral",
    ativaNesteGrupo: true,
    ordemHerdada: "006",
    ordemLocal: "006",
    acao: "Manter",
  },
  {
    id: 7,
    rubrica: "Auxílio Transporte",
    origem: "Efetivos SEDUC",
    ativaNesteGrupo: true,
    ordemHerdada: "007",
    ordemLocal: "005",
    acao: "Sobrescrever",
  },
  {
    id: 8,
    rubrica: "Adicional de Insalubridade",
    origem: "Professores SEDUC",
    ativaNesteGrupo: true,
    ordemHerdada: "008",
    ordemLocal: "008",
    acao: "Restaurar padrão",
  },
];

const gruposCalculoSimulacaoMock: GrupoCalculoSimulacaoRow[] = [
  {
    id: 1,
    vinculo: "12345",
    servidor: "MARIA SILVA",
    orgao: "SEDUC",
    tipoVinculo: "Efetivo",
    cargo: "Professor",
    situacao: "Ativo",
    grupoAplicado: "Professores SEDUC 40h",
    observacao: "OK",
  },
  {
    id: 2,
    vinculo: "45678",
    servidor: "JOÃO COSTA",
    orgao: "PGE",
    tipoVinculo: "Efetivo",
    cargo: "Analista",
    situacao: "Ativo",
    grupoAplicado: "Efetivos PGE",
    observacao: "OK",
  },
  {
    id: 3,
    vinculo: "98765",
    servidor: "ANA LIMA",
    orgao: "CPLAG",
    tipoVinculo: "Comissionado",
    cargo: "Assessor",
    situacao: "Ativo",
    grupoAplicado: "Sem grupo",
    observacao: "Gerar pendência de configuração",
  },
  {
    id: 4,
    vinculo: "11223",
    servidor: "CARLOS NUNES",
    orgao: "SEPLAG",
    tipoVinculo: "Contratado",
    cargo: "Técnico Administrativo",
    situacao: "Ativo",
    grupoAplicado: "Contratados",
    observacao: "OK",
  },
  {
    id: 5,
    vinculo: "33445",
    servidor: "FERNANDA ALMEIDA",
    orgao: "SEDUC",
    tipoVinculo: "Efetivo",
    cargo: "Professor",
    situacao: "Ativo",
    grupoAplicado: "Professores SEDUC 40h",
    observacao: "OK",
  },
  {
    id: 6,
    vinculo: "55667",
    servidor: "PAULO HENRIQUE",
    orgao: "SEFAZ",
    tipoVinculo: "Efetivo",
    cargo: "Analista Administrativo",
    situacao: "Ativo",
    grupoAplicado: "Efetivos",
    observacao: "Grupo geral aplicado por ausência de regra específica.",
  },
  {
    id: 7,
    vinculo: "77889",
    servidor: "LUCIANA ROCHA",
    orgao: "SEPLAG",
    tipoVinculo: "Contratado",
    cargo: "Técnico Administrativo",
    situacao: "Ativo",
    grupoAplicado: "Contratados SEPLAG",
    observacao: "OK",
  },
  {
    id: 8,
    vinculo: "99110",
    servidor: "ROBERTO MENEZES",
    orgao: "SES",
    tipoVinculo: "Aposentado",
    cargo: "Médico",
    situacao: "Inativo",
    grupoAplicado: "Sem grupo",
    observacao: "Servidor sem regra para órgão SES.",
  },
];

const gruposCalculoValidacoesMock: GrupoCalculoValidacaoRow[] = [
  {
    id: 1,
    tipo: "Servidores sem grupo",
    descricao: "38 vínculos sem enquadramento para a competência simulada.",
    severidade: "Bloqueante",
    acaoSugerida: "Ajustar critérios ou criar grupo específico.",
    abaRelacionada: "criterios",
  },
  {
    id: 2,
    tipo: "Rubrica sem fórmula",
    descricao: "Rubrica 2002 não possui fórmula vigente.",
    severidade: "Bloqueante",
    acaoSugerida: "Configurar fórmula ou remover rubrica do grupo.",
    abaRelacionada: "rubricas",
  },
  {
    id: 3,
    tipo: "Ordem inválida",
    descricao: "IRRF está antes de rubricas-base usadas no cálculo.",
    severidade: "Bloqueante",
    acaoSugerida: "Reordenar rubricas respeitando dependências.",
    abaRelacionada: "ordenacao",
  },
  {
    id: 4,
    tipo: "Conta contábil ausente",
    descricao: "Rubrica 1005 sem conta registro vinculada.",
    severidade: "Alerta",
    acaoSugerida: "Informar conta antes da publicação.",
    abaRelacionada: "rubricas",
  },
  {
    id: 5,
    tipo: "Herança sobrescrita",
    descricao: "Previdência RPPS possui ordem local diferente da ordem herdada.",
    severidade: "Informativo",
    acaoSugerida: "Revisar sobrescrita ou restaurar padrão.",
    abaRelacionada: "heranca",
  },
  {
    id: 6,
    tipo: "Rubrica extinta selecionada",
    descricao: "Rubrica 1014 está extinta e permanece vinculada ao grupo.",
    severidade: "Bloqueante",
    acaoSugerida: "Remover rubrica ou criar nova versão vigente.",
    abaRelacionada: "rubricas",
  },
  {
    id: 7,
    tipo: "Vigência futura",
    descricao: "Grupo G030 inicia em competência futura e ficará agendado.",
    severidade: "Informativo",
    acaoSugerida: "Confirmar publicação agendada.",
    abaRelacionada: "dados-gerais",
  },
  {
    id: 8,
    tipo: "Dependência circular",
    descricao: "Rubricas 1006 e 1007 possuem dependência cruzada simulada.",
    severidade: "Alerta",
    acaoSugerida: "Visualizar dependências e revisar ordem.",
    abaRelacionada: "ordenacao",
  },
];

const grupoEleitoParticipantesMock: GrupoEleitoParticipanteRow[] = [
  {
    id: 1,
    matricula: "139151",
    vinculo: "15",
    servidor: "ADRIANA MAMEDES MENDONÇA",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "21/04/2026",
  },
  {
    id: 2,
    matricula: "309263",
    vinculo: "1",
    servidor: "MARIA 322373",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "01/01/2001",
  },
  {
    id: 3,
    matricula: "309263",
    vinculo: "2",
    servidor: "MARIA 322373",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "",
  },
  {
    id: 4,
    matricula: "322603",
    vinculo: "3",
    servidor: "ABELARDO PINTO TELES",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "11/09/2025",
  },
  {
    id: 5,
    matricula: "322607",
    vinculo: "9",
    servidor: "ABELVAL LUIZ GOMES DA SILVA",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "10/12/2025",
  },
  {
    id: 6,
    matricula: "139151",
    vinculo: "9",
    servidor: "ADRIANA MAMEDES MENDONÇA",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "20/04/2026",
  },
];

const instituicaoOptions = [
  { label: "SEPLAG", value: "seplag" },
  { label: "Casa Civil", value: "casa-civil" },
  { label: "MTI", value: "mti" },
];

const regimeInstituicaoOptions = [{ label: "GOVMT", value: "govmt" }];

const grupoEleitosFinalidadeOptions = [
  { label: "Folha de Pagamento", value: "FOLHA DE PAGAMENTO" },
  { label: "Contagem de Tempo", value: "CONTAGEM DE TEMPO" },
];

const grupoCalculoOrgaoOptions = [
  { label: "Todos", value: "todos" },
  { label: "SEPLAG", value: "seplag" },
  { label: "SEDUC", value: "seduc" },
  { label: "PGE", value: "pge" },
];

const grupoCalculoTipoFolhaOptions = [
  { label: "Normal", value: "normal" },
  { label: "13º Salário", value: "decimo-terceiro" },
  { label: "Férias", value: "ferias" },
  { label: "Rescisória", value: "rescisoria" },
  { label: "Complementar", value: "complementar" },
];

const grupoCalculoTipoVinculoOptions = [
  { label: "Todos", value: "todos" },
  { label: "Efetivo", value: "efetivo" },
  { label: "Contratado", value: "contratado" },
  { label: "Comissionado", value: "comissionado" },
  { label: "Aposentado", value: "aposentado" },
];

const grupoCalculoSituacaoFuncionalOptions = [
  { label: "Todos", value: "todos" },
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" },
  { label: "Pensionista", value: "pensionista" },
];

const grupoCalculoAmostraOptions = [
  { label: "10 vínculos", value: "10" },
  { label: "100 vínculos", value: "100" },
  { label: "Todos", value: "todos" },
];

const grupoCalculoSuperiorOptions = [
  { label: "Geral", value: "Geral" },
  { label: "Efetivos", value: "Efetivos" },
  { label: "Contratados", value: "Contratados" },
  { label: "Comissionados", value: "Comissionados" },
];

const grupoCalculoNivelOptions = [
  { label: "Geral", value: "geral" },
  { label: "Vínculo", value: "vinculo" },
  { label: "Órgão", value: "orgao" },
  { label: "Cargo", value: "cargo" },
  { label: "Setor", value: "setor" },
  { label: "Especial", value: "especial" },
];

const grupoCalculoSimNaoOptions = [
  { label: "Sim", value: "sim" },
  { label: "Não", value: "nao" },
];

const grupoCalculoRubricaTipoOptions = [
  { label: "Todos", value: "" },
  { label: "Vantagem", value: "Vantagem" },
  { label: "Desconto", value: "Desconto" },
  { label: "Informativa", value: "Informativa" },
];

const grupoCalculoRubricaNaturezaOptions = [
  { label: "Todas", value: "" },
  { label: "Provento", value: "Provento" },
  { label: "Desconto", value: "Desconto" },
];

const grupoCalculoRubricaFormulaOptions = [
  { label: "Todas", value: "" },
  { label: "Sim", value: "sim" },
  { label: "Não", value: "nao" },
];

const grupoCalculoCriterioOptions = [
  "Órgão",
  "Tipo de vínculo",
  "Regime jurídico",
  "Regime previdenciário",
  "Categoria",
  "Subcategoria",
  "Cargo",
  "Situação funcional",
  "Grupo de eleitos",
];

const grupoCalculoOperadorOptions = [
  "igual a",
  "contém",
  "em lista",
  "diferente de",
  "maior que",
  "menor que",
  "entre",
  "existe",
  "não existe",
];

function mapGrupoCalculoSituacao(
  situacao?: StatusOperacionalVigenciaSeplag,
): SituacaoVigenciaValueSeplag["situacao"] {
  if (
    situacao === STATUS_OPERACIONAL_VIGENCIA.ENCERRADO ||
    situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO
  ) {
    return SITUACAO_VIGENCIA.ENCERRADO;
  }

  if (
    situacao === STATUS_OPERACIONAL_VIGENCIA.EXTINTO ||
    situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO
  ) {
    return SITUACAO_VIGENCIA.EXTINTO;
  }

  return SITUACAO_VIGENCIA.ATIVO;
}

function renderGrupoCalculoStatusBadge(status: StatusOperacionalVigenciaSeplag) {
  const badge = regimeStatusMeta[status];
  const isStatusLongo =
    status === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO ||
    status === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO;

  if (!isStatusLongo) {
    return <span className="prototype-grupo-calculo-status-badge-wrap">
      <BadgeSeplag
        label={badge.label}
        color={badge.color}
        bg={badge.bg}
        icon={badge.icon}
      />
    </span>;
  }

  const segundaLinha =
    status === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO
      ? "Encerramento"
      : "Extinção";

  return (
    <span className="prototype-grupo-calculo-status-badge-wrap">
      <span
        className="prototype-grupo-calculo-status-badge"
        style={{
          color: badge.color,
          backgroundColor: badge.bg,
          borderColor: `${badge.color}50`,
        }}
      >
        <i className={badge.icon} aria-hidden="true" />
        <span>
          Agendado para
          <strong>{segundaLinha}</strong>
        </span>
      </span>
    </span>
  );
}

function getGrupoCalculoRubricaTipo(rubrica: RubricaRow) {
  if (["1003", "1010", "1012"].includes(rubrica.codigo)) return "Informativa";
  if (rubrica.naturezaVerba === "Desconto") return "Desconto";
  return "Vantagem";
}

function getGrupoCalculoRubricaPossuiFormula(rubrica: RubricaRow) {
  return !["1005", "1012", "1014"].includes(rubrica.codigo);
}

function getGrupoCalculoSeveridadeMeta(
  severidade: GrupoCalculoValidacaoRow["severidade"],
) {
  if (severidade === "Bloqueante") {
    return {
      color: "#b42318",
      bg: "#fee4e2",
      icon: "pi pi-ban",
    };
  }

  if (severidade === "Alerta") {
    return {
      color: "#8a5a00",
      bg: "#fff4d6",
      icon: "pi pi-exclamation-triangle",
    };
  }

  return {
    color: "#005a9c",
    bg: "#e0f2fe",
    icon: "pi pi-info-circle",
  };
}

const grupoEleitoFiltroAvancadoOptions = {
  instituicoes: [
    { label: "Governo do Estado de Mato Grosso", value: "govmt" },
    { label: "SEPLAG-MT", value: "seplag" },
    { label: "MTI", value: "mti" },
  ],
  orgaos: [
    { label: "SEPLAG-MT", value: "seplag" },
    { label: "SEFAZ-MT", value: "sefaz" },
    { label: "SEDUC-MT", value: "seduc" },
  ],
  tiposVinculo: [
    { label: "Efetivo", value: "efetivo" },
    { label: "Comissionado", value: "comissionado" },
    { label: "Temporário", value: "temporario" },
  ],
  setores: [
    { label: "SAPGD", value: "sapgd" },
    { label: "CPPTI", value: "cppti" },
    { label: "Gabinete", value: "gabinete" },
  ],
  categorias: [
    { label: "Estatutário Civil", value: "estatutario-civil" },
    { label: "Militar", value: "militar" },
    { label: "Celetista", value: "celetista" },
  ],
  cargos: [
    { label: "Analista Administrativo", value: "analista-administrativo" },
    { label: "Técnico Administrativo", value: "tecnico-administrativo" },
    { label: "Gestor Governamental", value: "gestor-governamental" },
  ],
};

const situacaoOptions = [
  { label: "Ativo", value: "ATIVO" },
  { label: "Encerrado", value: "ENCERRADO" },
];

const regimeSituacaoOptions = [
  { label: "AGENDADO", value: STATUS_OPERACIONAL_VIGENCIA.AGENDADO },
  { label: "ATIVO", value: STATUS_OPERACIONAL_VIGENCIA.ATIVO },
  {
    label: "AGENDADO PARA ENCERRAMENTO",
    value: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO,
  },
  { label: "ENCERRADO", value: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO },
  {
    label: "AGENDADO PARA EXTINÇÃO",
    value: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO,
  },
  { label: "EXTINTO", value: STATUS_OPERACIONAL_VIGENCIA.EXTINTO },
];

const regimeStatusMeta: Record<
  StatusOperacionalVigenciaSeplag,
  { label: string; color: string; bg: string; icon: string }
> = {
  AGENDADO: {
    label: "Agendado",
    color: "#8a5a00",
    bg: "#fff4d6",
    icon: "pi pi-clock",
  },
  ATIVO: {
    label: "Ativo",
    color: "#00843d",
    bg: "#e2f3e8",
    icon: "pi pi-check-circle",
  },
  AGENDADO_ENCERRAMENTO: {
    label: "Agendado para Encerramento",
    color: "#6b7280",
    bg: "#f1f5f9",
    icon: "pi pi-clock",
  },
  ENCERRADO: {
    label: "Encerrado",
    color: "#6b7280",
    bg: "#f1f5f9",
    icon: "pi pi-lock",
  },
  AGENDADO_EXTINCAO: {
    label: "Agendado para Extinção",
    color: "#b42318",
    bg: "#fee4e2",
    icon: "pi pi-clock",
  },
  EXTINTO: {
    label: "Extinto",
    color: "#b42318",
    bg: "#fee4e2",
    icon: "pi pi-times-circle",
  },
};

const categoriaTabs: TabItemSeplag<string>[] = [
  { label: "Dados Gerais", value: "dados-gerais", col: "lg:col-6" },
  { label: "Subcategoria", value: "subcategoria", col: "lg:col-6" },
];

const grupoEleitoTabs: TabItemSeplag<string>[] = [
  { label: "Informações", value: "grupo-eleito", col: "lg:col-6" },
  { label: "Participantes", value: "participantes", col: "lg:col-6" },
];

const grupoCalculoTabs: TabItemSeplag<string>[] = [
  { label: "Dados Gerais", value: "dados-gerais", col: "" },
  { label: "Critérios", value: "criterios", col: "" },
  { label: "Rubricas", value: "rubricas", col: "" },
  { label: "Ordenação", value: "ordenacao", col: "" },
  { label: "Herança", value: "heranca", col: "" },
  { label: "Simulação", value: "simulacao", col: "" },
  { label: "Validações", value: "validacoes", col: "" },
];

function createResults<T>(content: T[]): ResultsSeplag<T> {
  return {
    content,
    last: true,
    totalPages: 1,
    pageActual: 0,
    sizePage: content.length,
    totalRecords: content.length,
    size: content.length,
    number: 0,
    first: true,
    numberOfElements: content.length,
    empty: content.length === 0,
  };
}

const situacaoVigenciaDemoDefaultValues: SituacaoVigenciaDemoForm = {
  situacao: SITUACAO_VIGENCIA.ATIVO,
  dataAtivacao: "08/05/2026",
  possuiVinculosOuDependencias: false,
};

function getFormErrorMessage(errors: FieldErrors<SituacaoVigenciaDemoForm>) {
  return (name: string) => {
    const error = errors[name as keyof SituacaoVigenciaDemoForm];
    if (!error?.message) return null;
    return <small className="p-error">{String(error.message)}</small>;
  };
}

export function PrototiposComponentesPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <CardSeplag
          title="Componentes"
          cols="12"
          legenda={() => (
            <p className="prototype-card-description">
              Selecione um componente reutilizável para visualizar seu
              comportamento no protótipo.
            </p>
          )}
        >
          <section
            className="prototype-component-dashboard"
            aria-label="Componentes disponíveis"
          >
            {componentPrototypeItems.map((component) => (
              <Link
                className="prototype-component-tile"
                key={component.id}
                to={component.path}
                aria-label={`Abrir componente ${component.title}`}
              >
                <div className="prototype-component-tile-icon" aria-hidden="true">
                  <i className={component.icon} />
                </div>
                <div className="prototype-component-tile-info">
                  <span>{component.status}</span>
                  <h2>{component.title}</h2>
                  <p>{component.description}</p>
                </div>
                <i className="pi pi-arrow-right" aria-hidden="true" />
              </Link>
            ))}
          </section>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposSituacaoVigenciaPage() {
  const [businessMessages, setBusinessMessages] = useState<string[]>([]);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm<SituacaoVigenciaDemoForm>({
    defaultValues: situacaoVigenciaDemoDefaultValues,
  });
  const formValues = watch();
  const possuiVinculosOuDependencias = watch("possuiVinculosOuDependencias");

  const handleValidSubmit = (data: SituacaoVigenciaDemoForm) => {
    const messages = validarSituacaoVigenciaSeplag(data, {
      possuiVinculosOuDependencias: data.possuiVinculosOuDependencias,
      permitirExtincaoDireta: false,
    });
    setBusinessMessages(
      messages.length ? messages : ["Registro validado com sucesso!"],
    );
  };

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={handleSubmit(handleValidSubmit)}>
        <div className="prototype-page-content prototype-situacao-page">
          <CardSeplag
            title="Vigência"
            cols="12"
          >
            <SituacaoVigenciaSeplag
              control={control}
              setValue={setValue}
              possuiVinculosOuDependencias={possuiVinculosOuDependencias}
              rotuloDataAtivacao="Data de Início"
              cols={{
                situacao: "12 12 4",
                dataAtivacao: "12 12 3",
                statusOperacional: "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                dataEncerramento: "12 12 4",
                motivoEncerramento: "12 12 8",
                dataExtincao: "12 12 4",
                motivoExtincao: "12 12 8",
              }}
              getFormErrorMessage={getFormErrorMessage(errors)}
            />
            <div className="prototype-vigencia-actions">
              <BotaoSalvarSeplag type="submit" />
            </div>
          </CardSeplag>

          <CardSeplag
            title="Simulação"
            cols="12"
            legenda={() => (
              <p className="prototype-card-description">
                Ajuste cenários e regras auxiliares para testar o comportamento
                do componente.
              </p>
            )}
          >
            <div className="prototype-component-options">
              <label className="flex align-items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!possuiVinculosOuDependencias}
                  onChange={(event) =>
                    setValue(
                      "possuiVinculosOuDependencias",
                      event.target.checked,
                    )
                  }
                />
                Simular vínculos ou associações existentes
              </label>
            </div>

            {businessMessages.length > 0 && (
              <div className="prototype-validation-panel">
                {businessMessages.map((message) => (
                  <div key={message}>{message}</div>
                ))}
              </div>
            )}

            <div className="prototype-component-actions">
              <BotaoSeplag
                type="button"
                label="Ativo"
                icon="pi pi-check"
                onClick={() => {
                  reset(situacaoVigenciaDemoDefaultValues);
                  setBusinessMessages([]);
                }}
              />
              <BotaoSeplag
                type="button"
                label="Agendado"
                icon="pi pi-clock"
                onClick={() => {
                  reset({
                    situacao: SITUACAO_VIGENCIA.ATIVO,
                    dataAtivacao: "31/12/2026",
                    possuiVinculosOuDependencias: false,
                  });
                  setBusinessMessages([]);
                }}
              />
              <BotaoSeplag
                type="button"
                label="Encerrado"
                icon="pi pi-lock"
                onClick={() => {
                  reset({
                    situacao: SITUACAO_VIGENCIA.ENCERRADO,
                    dataAtivacao: "01/01/2026",
                    dataEncerramento: "08/05/2026",
                    motivoEncerramento: "Registro encerrado para demonstração.",
                    possuiVinculosOuDependencias: true,
                  });
                  setBusinessMessages([]);
                }}
              />
              <BotaoSeplag
                type="button"
                label="Extinto"
                icon="pi pi-times"
                onClick={() => {
                  reset({
                    situacao: SITUACAO_VIGENCIA.EXTINTO,
                    dataAtivacao: "01/01/2026",
                    dataEncerramento: "01/04/2026",
                    dataExtincao: "08/05/2026",
                    motivoExtincao: "Registro extinto para demonstração.",
                    possuiVinculosOuDependencias: false,
                  });
                  setBusinessMessages([]);
                }}
              />
            </div>
          </CardSeplag>

          <CardSeplag title="Resumo do Estado" cols="12">
            <pre className="prototype-state-preview">
              {JSON.stringify(formValues, null, 2)}
            </pre>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

export function PrototiposDocumentosVinculadosPage() {
  const [documentosSelecionados, setDocumentosSelecionados] = useState<string[]>(
    ["lei-12345-2023", "decreto-456-2024"],
  );

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <CardSeplag
          title="Documentos Vinculados"
          cols="12"
          legenda={() => (
            <p className="prototype-card-description">
              Componente para selecionar e vincular documentos previamente
              cadastrados no sistema.
            </p>
          )}
        >
          <DocumentosLegaisAssociadosSeplag
            required
            options={documentosLegaisMock}
            value={documentosSelecionados}
            onChange={setDocumentosSelecionados}
            onNovoCadastro={() => {}}
            onVisualizar={() => {}}
          />
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposAnexarDocumentoPage() {
  const [arquivos, setArquivos] = useState<ArquivoAnexadoSeplag[]>([
    {
      nome: "USXXX - Manter Regime Jurídico.pdf",
      extensao: "pdf",
      contentType: "application/pdf",
      conteudoEmBase64: "",
      tamanho: "455.3 KB",
    },
    {
      nome: "Parecer técnico - Regime Jurídico.pdf",
      extensao: "pdf",
      contentType: "application/pdf",
      conteudoEmBase64: "",
      tamanho: "497.2 KB",
    },
    {
      nome: "Evidência de homologação.pdf",
      extensao: "pdf",
      contentType: "application/pdf",
      conteudoEmBase64: "",
      tamanho: "258.6 KB",
    },
  ]);

  const handleUploadDocumento = (event: { files?: File[] }) => {
    const files = Array.from(event.files ?? []);
    if (!files.length) return;

    setArquivos((current) => [
      ...current,
      ...files.map((file) => ({
        nome: file.name,
        extensao: file.name.split(".").pop()?.toLowerCase() ?? "pdf",
        contentType: file.type || "application/octet-stream",
        conteudoEmBase64: "",
        tamanho: file.size,
      })),
    ]);
  };

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <CardSeplag
          title="Documentos"
          cols="12"
          legenda={() => (
            <p className="prototype-card-description">
              Anexe um ou mais documentos. Você pode visualizar, baixar ou
              remover cada arquivo.
            </p>
          )}
        >
          <div className="grid prototype-anexar-documento-demo">
            <AnexarDocumentoSeplag
              label="Documento"
              cols="12 12 6"
              multiple
              arquivosBase64={arquivos}
              onUploadDocument={handleUploadDocumento}
              onRemoveArquivo={(_, index) =>
                setArquivos((current) =>
                  current.filter((__, itemIndex) => itemIndex !== index),
                )
              }
              onDownloadArquivo={() => {}}
              handleViewArquivo={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposEstruturaOrganizacionalPage() {
  const [estruturaSelecionada, setEstruturaSelecionada] =
    useState<SeletorEstruturaOrganizacionalValueSeplag>({});

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <CardSeplag
          title="Estrutura Organizacional"
          cols="12"
          legenda={() => (
            <p className="prototype-card-description">
              Componente para selecionar instituições e abrir níveis
              vinculados conforme a hierarquia organizacional.
            </p>
          )}
        >
          <SeletorEstruturaOrganizacionalSeplag
            niveis={estruturaOrganizacionalNiveis}
            value={estruturaSelecionada}
            onChange={setEstruturaSelecionada}
          />
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposSigepPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    />
  );
}

export function PrototiposCategoriaPage() {
  const navigate = useNavigate();
  const { control, reset, watch } = useForm<CategoriaFiltroForm>({
    defaultValues: {
      categoria: "",
      instituicao: undefined,
      situacao: undefined,
    },
  });
  const filtros = watch();
  const categoriaBusca = filtros.categoria?.trim().toLowerCase();
  const categoriasFiltradas = categoriasMock.filter((categoria) => {
    const atendeCategoria =
      !categoriaBusca ||
      categoria.sigla.toLowerCase().includes(categoriaBusca) ||
      categoria.descricao.toLowerCase().includes(categoriaBusca);
    const atendeSituacao =
      !filtros.situacao || categoria.situacao === filtros.situacao;
    const atendeInstituicao =
      !filtros.instituicao || categoria.instituicao === filtros.instituicao;

    return atendeCategoria && atendeSituacao && atendeInstituicao;
  });
  const categoriaResults = createResults(categoriasFiltradas);
  const categoriaColumns: ColumnMetaSeplag<CategoriaRow>[] = [
    { field: "sigla", header: "Sigla" },
    { field: "descricao", header: "Descrição" },
    {
      header: "Instituições Vinculadas",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.instituicoesVinculadas}{" "}
          {row.instituicoesVinculadas === 1 ? "Instituição" : "Instituições"}
        </button>
      ),
    },
    {
      header: "Situação",
      body: (row) => (
        <BadgeSeplag
          label={row.situacao === "ATIVO" ? "Ativo" : "Encerrado"}
          color={row.situacao === "ATIVO" ? "#00843d" : "#9a6500"}
          bg={row.situacao === "ATIVO" ? "#e2f3e8" : "#fff1c7"}
          border="transparent"
          size="md"
        />
      ),
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag title="Categorias" cols="12">
          <div className="prototype-category-filters grid">
            <TextFieldSeplag
              name="categoria"
              control={control}
              label="Categoria (Sigla, Descrição)"
              cols="12 6 3"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              cols="12 6 3"
              options={instituicaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6 3"
              options={situacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-3">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    categoria: "",
                    instituicao: undefined,
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <TablePaginadoSeplag
            dataKey="id"
            data={categoriaResults}
            rows={10}
            paginator={false}
            lazy={false}
            selectionMode={null}
            columns={categoriaColumns}
            hasEventoAcao
            handleAdicionar={() => navigate("/prototipos/sigep/categoria/novo")}
            handleView={() => {}}
            handleEdit={(row) =>
              navigate(`/prototipos/sigep/categoria/${row.id}/editar`)
            }
            handleDelete={() => {}}
            handleOnPageChange={() => {}}
          />
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposCategoriaFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const categoria = categoriasMock.find((item) => String(item.id) === id);
  const isEditing = Boolean(id);
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [documentosCategoria, setDocumentosCategoria] = useState<string[]>([
    "lei-12345-2023",
    "decreto-456-2024",
  ]);
  const [estruturaCategoria, setEstruturaCategoria] =
    useState<SeletorEstruturaOrganizacionalValueSeplag>({});
  const { control, setValue } = useForm<CategoriaForm>({
    defaultValues: {
      sigla: categoria?.sigla ?? "",
      descricao: categoria?.descricao ?? "",
      observacao: isEditing ? "a" : "",
      subcategoriaNome: "",
      subcategoriaDescricao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "08/05/2026",
    },
  });
  const categoriaResumo = {
    sigla: categoria?.sigla || "CATEGORIA DE TESTES11A",
    descricao: categoria?.descricao || "TESTE DO TESTE",
  };
  const subcategoriaColumns: ColumnMetaSeplag<SubcategoriaRow>[] = [
    { field: "nome", header: "Nome" },
    { field: "descricao", header: "Descrição" },
    { field: "orgaosVinculados", header: "Órgãos Vinculados" },
    { field: "situacao", header: "Situação" },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title={`${isEditing ? "Alterar" : "Cadastrar"} - Categoria`}
          cols="12"
          cardHeaderClassNames="prototype-category-card"
        >
          <div className="prototype-category-form">
            <TabsSeplag
              items={categoriaTabs}
              activeValue={activeTab}
              onChange={setActiveTab}
              maxWidth="512px"
            />

            {activeTab === "dados-gerais" ? (
              <div className="grid prototype-category-form-fields">
                <TextFieldSeplag
                  name="sigla"
                  control={control}
                  label="Sigla"
                  cols="12 12 3"
                  required
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="descricao"
                  control={control}
                  label="Descrição"
                  cols="12 12 9"
                  required
                  getFormErrorMessage={() => null}
                />
                <TextAreaFieldSeplag
                  name="observacao"
                  control={control}
                  label="Observação"
                  cols="12"
                  rows={4}
                  maxLength={500}
                  getFormErrorMessage={() => null}
                />
                <div className="col-12 prototype-category-documents">
                  <DocumentosLegaisAssociadosSeplag
                    required
                    options={documentosLegaisMock}
                    value={documentosCategoria}
                    onChange={setDocumentosCategoria}
                    onNovoCadastro={() => {}}
                    onVisualizar={() => {}}
                  />
                </div>
                <div className="col-12 prototype-category-vigencia">
                  <h6>Vigência</h6>
                  <SituacaoVigenciaSeplag
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Data de Início"
                    cols={{
                      situacao: "12 12 4",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                      dataEncerramento: "12 12 4",
                      motivoEncerramento: "12 12 8",
                      dataExtincao: "12 12 4",
                      motivoExtincao: "12 12 8",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
                <div className="col-12 prototype-category-structure">
                  <SeletorEstruturaOrganizacionalSeplag
                    niveis={estruturaOrganizacionalNiveis}
                    value={estruturaCategoria}
                    onChange={setEstruturaCategoria}
                  />
                </div>
              </div>
            ) : (
              <div className="prototype-category-subcategory">
                <div className="prototype-category-summary">
                  <strong>Categoria</strong>
                  <p>
                    <span>Nome da Categoria:</span> {categoriaResumo.sigla}
                  </p>
                  <p>
                    <span>Descrição da Categoria:</span>{" "}
                    {categoriaResumo.descricao}
                  </p>
                </div>

                {isAddingSubcategory ? (
                  <div className="grid prototype-subcategory-form-fields">
                    <TextFieldSeplag
                      name="subcategoriaNome"
                      control={control}
                      label="Nome"
                      placeholder="Nome da subcategoria"
                      cols="12"
                      required
                      getFormErrorMessage={() => null}
                    />
                    <TextAreaFieldSeplag
                      name="subcategoriaDescricao"
                      control={control}
                      label="Descrição"
                      placeholder="Descreva a subcategoria"
                      cols="12"
                      rows={4}
                      maxLength={500}
                      required
                      getFormErrorMessage={() => null}
                    />
                  </div>
                ) : (
                  <TablePaginadoSeplag
                    dataKey="id"
                    data={createResults<SubcategoriaRow>([])}
                    rows={5}
                    rowsPerPage={[5, 10, 20]}
                    paginator
                    lazy={false}
                    selectionMode={null}
                    columns={subcategoriaColumns}
                    hasEventoAcao
                    handleAdicionar={() => setIsAddingSubcategory(true)}
                    handleView={() => {}}
                    handleEdit={() => {}}
                    handleDelete={() => {}}
                    handleOnPageChange={() => {}}
                  />
                )}

                <div className="prototype-category-form-footer">
                  <BotaoVoltarSeplag
                    type="button"
                    onClick={() => navigate("/prototipos/sigep/categoria")}
                  />
                </div>
              </div>
            )}
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposSigepRegimeJuridicoPage() {
  const navigate = useNavigate();
  const { control, reset } = useForm<RegimeJuridicoFiltroForm>({
    defaultValues: {
      nome: "REGIME ESPECIAL",
      instituicao: "govmt",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    },
  });
  const regimeResults = {
    ...createResults(regimesJuridicosMock),
    totalPages: 5,
    totalRecords: 45,
    size: 10,
    sizePage: 10,
  };
  const regimeColumns: ColumnMetaSeplag<RegimeJuridicoRow>[] = [
    { field: "nome", header: "Nome" },
    { field: "descricao", header: "Descrição" },
    {
      header: "Instituições Vinculadas",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.instituicoesVinculadas}{" "}
          {row.instituicoesVinculadas === 1 ? "Instituição" : "Instituições"}
        </button>
      ),
    },
    {
      header: "Situação",
      body: (row) => {
        const statusConfig = regimeStatusMeta[row.situacao];

        return (
          <span className="prototype-regime-status-badge">
            <BadgeSeplag
              label={statusConfig.label}
              color={statusConfig.color}
              bg={statusConfig.bg}
              border="transparent"
              icon={statusConfig.icon}
              size="sm"
            />
          </span>
        );
      },
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-regime-page">
        <CardSeplag
          title="Regime Jurídico"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-category-filters prototype-regime-filters grid">
            <TextFieldSeplag
              name="nome"
              control={control}
              label="Nome"
              cols="12 6 3"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              cols="12 6 2"
              options={regimeInstituicaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6 2"
              options={regimeSituacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtros"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    nome: "",
                    instituicao: undefined,
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-regime-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={regimeResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy
              selectionMode={null}
              columns={regimeColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate("/prototipos/sigep/regime-juridico/novo")
              }
              handleView={() => {}}
              handleEdit={() => {}}
              handleDelete={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposSigepRegimeJuridicoNovoPage() {
  const navigate = useNavigate();
  const [baseLegalSelecionada, setBaseLegalSelecionada] = useState<string[]>(
    [],
  );
  const [estruturaSelecionada, setEstruturaSelecionada] =
    useState<SeletorEstruturaOrganizacionalValueSeplag>({});
  const { control, setValue } = useForm<RegimeJuridicoForm>({
    defaultValues: {
      nome: "",
      sigla: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "13/05/2026",
    },
  });

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white prototype-regime-page">
          <CardSeplag
            title="Cadastrar - Regime Jurídico"
            cols="12"
            cardHeaderClassNames="prototype-regime-card"
          >
            <div className="grid prototype-category-form-fields prototype-regime-form-fields">
              <TextFieldSeplag
                name="nome"
                control={control}
                label="Nome"
                cols="12 12 8"
                required
                maxLength={150}
                getFormErrorMessage={() => null}
              />
              <TextFieldSeplag
                name="sigla"
                control={control}
                label="Sigla"
                cols="12 12 4"
                required
                maxLength={30}
                getFormErrorMessage={() => null}
              />

              <div className="col-12 prototype-regime-section">
                <DocumentosLegaisAssociadosSeplag
                  label="Base Legal"
                  required
                  options={documentosLegaisMock}
                  value={baseLegalSelecionada}
                  onChange={setBaseLegalSelecionada}
                  onNovoCadastro={() => {}}
                  onVisualizar={() => {}}
                />
              </div>

              <div className="col-12 prototype-regime-section">
                <SeletorEstruturaOrganizacionalSeplag
                  niveis={estruturaOrganizacionalNiveis}
                  value={estruturaSelecionada}
                  onChange={setEstruturaSelecionada}
                />
              </div>

              <div className="col-12 prototype-category-vigencia">
                <h6>Vigência</h6>
                <SituacaoVigenciaSeplag
                  control={control}
                  setValue={setValue}
                  rotuloDataAtivacao="Início de Vigência"
                  cols={{
                    situacao: "12 12 4",
                    dataAtivacao: "12 12 3",
                    statusOperacional:
                      "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                    dataEncerramento: "12 12 4",
                    motivoEncerramento: "12 12 8",
                    dataExtincao: "12 12 4",
                    motivoExtincao: "12 12 8",
                  }}
                  getFormErrorMessage={() => null}
                />
              </div>
            </div>

            <div className="prototype-category-form-footer">
              <BotaoVoltarSeplag
                type="button"
                onClick={() => navigate("/prototipos/sigep/regime-juridico")}
              />
              <BotaoSalvarSeplag type="submit" />
            </div>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    />
  );
}

export function PrototiposFolhaGruposCalculoPage() {
  const navigate = useNavigate();
  const { control, reset } = useForm<GrupoCalculoFiltroForm>({
    defaultValues: {
      orgao: "",
      nomeGrupo: "",
      situacao: "",
      tipoFolha: "",
      tipoVinculo: "",
      competencia: "",
      vigenteEm: "",
    },
  });

  const gruposCalculoResults = {
    ...createResults(gruposCalculoMock),
    totalPages: 3,
    totalRecords: 24,
    size: 10,
    sizePage: 10,
  };

  const gruposCalculoColumns: ColumnMetaSeplag<GrupoCalculoRow>[] = [
    {
      field: "codigo",
      header: "Código",
    },
    {
      field: "grupo",
      header: "Grupo",
    },
    {
      field: "nivel",
      header: "Nível",
    },
    {
      field: "herdaDe",
      header: "Herda de",
    },
    {
      field: "orgaoSetor",
      header: "Órgão/Setor",
    },
    {
      field: "tipoVinculo",
      header: "Tipo vínculo",
    },
    {
      header: "Situação",
      body: (row) => renderGrupoCalculoStatusBadge(row.situacao),
    },
    {
      field: "inicioVigencia",
      header: "Início vigência",
    },
    {
      field: "fimVigencia",
      header: "Fim vigência",
    },
    {
      field: "rubricas",
      header: "Rubricas",
    },
    {
      header: "Pendências",
      body: (row) => (
        <BadgeSeplag
          label={String(row.pendencias)}
          color={row.pendencias > 0 ? "#b42318" : "#00843d"}
          bg={row.pendencias > 0 ? "#fee4e2" : "#e2f3e8"}
          icon={row.pendencias > 0 ? "pi pi-exclamation-triangle" : "pi pi-check-circle"}
        />
      ),
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-folha-grupos-calculo-page">
        <CardSeplag
          title="Configuração de Grupos de Cálculo da Folha"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-category-filters prototype-grupos-calculo-filters grid">
            <DropdownFieldSeplag
              name="orgao"
              control={control}
              label="Empresa/Órgão"
              cols="12 6"
              options={grupoCalculoOrgaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <TextFieldSeplag
              name="nomeGrupo"
              control={control}
              label="Nome do Grupo"
              cols="12 6"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6"
              options={regimeSituacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="tipoFolha"
              control={control}
              label="Tipo de Folha"
              cols="12 6"
              options={grupoCalculoTipoFolhaOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="tipoVinculo"
              control={control}
              label="Tipo de Vínculo"
              cols="12 6"
              options={grupoCalculoTipoVinculoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <TextFieldSeplag
              name="competencia"
              control={control}
              label="Competência"
              cols="12 6"
              placeholder="mm/aaaa"
              getFormErrorMessage={() => null}
            />
            <DateFieldSeplag
              name="vigenteEm"
              control={control}
              label="Vigente em"
              cols="12 6"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    orgao: "",
                    nomeGrupo: "",
                    situacao: "",
                    tipoFolha: "",
                    tipoVinculo: "",
                    competencia: "",
                    vigenteEm: "",
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-folha-grupos-calculo-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={gruposCalculoResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy
              selectionMode={null}
              columns={gruposCalculoColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate("/prototipos/folha/grupos-calculo/novo")
              }
              handleView={() => {}}
              handleEdit={(row) =>
                navigate(`/prototipos/folha/grupos-calculo/${row.id}/editar`)
              }
              handleDuplicar={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaGrupoCalculoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  const grupo = gruposCalculoMock.find((item) => String(item.id) === id);
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [rubricasDisponiveis, setRubricasDisponiveis] = useState(
    catalogoRubricasMock.slice(2),
  );
  const [rubricasSelecionadas, setRubricasSelecionadas] = useState(
    catalogoRubricasMock.slice(0, 2),
  );
  const [operadorCriterios, setOperadorCriterios] = useState<"todos" | "qualquer">("todos");
  const [criterios, setCriterios] = useState<GrupoCalculoCriterioRow[]>(
    gruposCalculoCriteriosMock,
  );
  const [criterioEditandoId, setCriterioEditandoId] = useState<number | null>(null);
  const [herancaRubricas, setHerancaRubricas] = useState<GrupoCalculoHerancaRubricaRow[]>(
    gruposCalculoHerancaRubricasMock,
  );

  const { control, setValue, watch } = useForm<GrupoCalculoForm>({
    defaultValues: {
      codigo: grupo?.codigo ?? "",
      nome: grupo?.grupo ?? "",
      descricao: grupo
        ? `Configuração de cálculo para ${grupo.grupo.toLowerCase()}.`
        : "",
      grupoSuperior: grupo?.herdaDe !== "-" ? grupo?.herdaDe : "",
      nivelEspecificidade: grupo?.nivel === 1 ? "geral" : "vinculo",
      situacao: mapGrupoCalculoSituacao(grupo?.situacao),
      dataAtivacao:
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO
          ? "01/06/2026"
          : "08/05/2026",
      dataEncerramento:
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.ENCERRADO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.EXTINTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO
          ? "30/06/2026"
          : "",
      motivoEncerramento:
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.ENCERRADO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.EXTINTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO
          ? "Encerramento programado da configuração vigente."
          : "",
      dataExtincao:
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.EXTINTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO
          ? "30/07/2026"
          : "",
      motivoExtincao:
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.EXTINTO ||
        grupo?.situacao === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_EXTINCAO
          ? "Extinção administrativa da configuração."
          : "",
      tipoFolha: "normal",
      permiteHeranca: "sim",
      permiteSobrescreverOrdem: "sim",
      observacao: "",
      criterioOrgao: "todos",
      criterioTipoVinculo: "todos",
      criterioRegimeJuridico: "",
      criterioCategoria: "",
      criterioCargo: "",
      criterioSituacaoFuncional: "",
      rubricaFiltroTermo: "",
      rubricaFiltroTipo: "",
      rubricaFiltroNatureza: "",
      rubricaFiltroSituacao: "",
      rubricaFiltroPossuiFormula: "",
      simulacaoCompetencia: "",
      simulacaoOrgao: "",
      simulacaoTipoVinculo: "todos",
      simulacaoSituacaoFuncional: "todos",
      simulacaoAmostra: "10",
    },
  });

  const renderRubricaPickListItem = (rubrica: RubricaRow) => (
    <div className="prototype-grupo-picklist-item prototype-grupo-calculo-rubrica-item">
      <div>
        <span className="prototype-grupo-matricula">{rubrica.codigo}</span>
        <strong>{rubrica.nomeRubrica}</strong>
      </div>
      <small>
        {getGrupoCalculoRubricaTipo(rubrica)} • {rubrica.naturezaVerba} •{" "}
        {rubrica.status} • Fórmula:{" "}
        {getGrupoCalculoRubricaPossuiFormula(rubrica) ? "Sim" : "Não"}
      </small>
    </div>
  );

  const handleAdicionarCriterio = () => {
    const novoId = Math.max(0, ...criterios.map((criterio) => criterio.id)) + 1;
    setCriterios((current) => [
      ...current,
      {
        id: novoId,
        criterio: "Órgão",
        operador: "igual a",
        valor: "",
      },
    ]);
    setCriterioEditandoId(novoId);
  };

  const handleAtualizarCriterio = (
    idCriterio: number,
    field: keyof Omit<GrupoCalculoCriterioRow, "id">,
    value: string,
  ) => {
    setCriterios((current) =>
      current.map((criterio) =>
        criterio.id === idCriterio ? { ...criterio, [field]: value } : criterio,
      ),
    );
  };

  const handleRemoverCriterio = (idCriterio: number) => {
    setCriterios((current) =>
      current.filter((criterio) => criterio.id !== idCriterio),
    );
    setCriterioEditandoId((current) =>
      current === idCriterio ? null : current,
    );
  };

  const handleMoverRubricaOrdenacao = (fromIndex: number, toIndex: number) => {
    setRubricasSelecionadas((current) => {
      if (
        fromIndex < 0 ||
        fromIndex >= current.length ||
        toIndex < 0 ||
        toIndex >= current.length ||
        fromIndex === toIndex
      ) {
        return current;
      }

      const next = [...current];
      const [item] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, item);
      return next;
    });
  };

  const handleMoverRubricaParaPosicao = (
    fromIndex: number,
    positionValue: string,
  ) => {
    const parsedPosition = Number(positionValue);
    if (!Number.isInteger(parsedPosition)) return;
    handleMoverRubricaOrdenacao(fromIndex, parsedPosition - 1);
  };

  const handleAlterarAcaoHeranca = (
    idRubrica: number,
    acao: GrupoCalculoHerancaRubricaRow["acao"],
  ) => {
    setHerancaRubricas((current) =>
      current.map((rubrica) =>
        rubrica.id === idRubrica
          ? {
              ...rubrica,
              acao,
              ativaNesteGrupo: acao !== "Excluir localmente",
            }
          : rubrica,
      ),
    );
  };

  const rubricaFiltroTermo = (watch("rubricaFiltroTermo") ?? "").toLowerCase().trim();
  const rubricaFiltroTipo = watch("rubricaFiltroTipo") ?? "";
  const rubricaFiltroNatureza = watch("rubricaFiltroNatureza") ?? "";
  const rubricaFiltroSituacao = watch("rubricaFiltroSituacao") ?? "";
  const rubricaFiltroPossuiFormula = watch("rubricaFiltroPossuiFormula") ?? "";
  const rubricaMatchesFilters = (rubrica: RubricaRow) => {
    const matchesTermo =
      !rubricaFiltroTermo ||
      rubrica.codigo.toLowerCase().includes(rubricaFiltroTermo) ||
      rubrica.nomeRubrica.toLowerCase().includes(rubricaFiltroTermo);
    const matchesTipo =
      !rubricaFiltroTipo ||
      getGrupoCalculoRubricaTipo(rubrica) === rubricaFiltroTipo;
    const matchesNatureza =
      !rubricaFiltroNatureza ||
      rubrica.naturezaVerba === rubricaFiltroNatureza;
    const matchesSituacao =
      !rubricaFiltroSituacao ||
      rubrica.status === rubricaFiltroSituacao;
    const matchesFormula =
      !rubricaFiltroPossuiFormula ||
      (rubricaFiltroPossuiFormula === "sim") ===
        getGrupoCalculoRubricaPossuiFormula(rubrica);

    return (
      matchesTermo &&
      matchesTipo &&
      matchesNatureza &&
      matchesSituacao &&
      matchesFormula
    );
  };
  const rubricasDisponiveisFiltradas = rubricasDisponiveis.filter(
    rubricaMatchesFilters,
  );
  const handleSetRubricasDisponiveisFiltradas = (nextFiltradas: RubricaRow[]) => {
    setRubricasDisponiveis((current) => {
      const filteredIds = new Set(
        rubricasDisponiveisFiltradas.map((rubrica) => rubrica.id),
      );
      const hidden = current.filter((rubrica) => !filteredIds.has(rubrica.id));
      return [...hidden, ...nextFiltradas];
    });
  };

  const renderTabContent = () => {
    if (activeTab === "dados-gerais") {
      return (
        <div className="grid prototype-category-form-fields prototype-grupo-calculo-form-fields">
          <TextFieldSeplag
            name="codigo"
            control={control}
            label="Código do Grupo"
            cols="12 12 3"
            getFormErrorMessage={() => null}
          />
          <TextFieldSeplag
            name="nome"
            control={control}
            label="Nome do Grupo"
            cols="12 12 9"
            required
            getFormErrorMessage={() => null}
          />
          <TextAreaFieldSeplag
            name="descricao"
            control={control}
            label="Descrição"
            cols="12 12 12"
            maxLength={500}
            getFormErrorMessage={() => null}
          />
          <DropdownFieldSeplag
            name="grupoSuperior"
            control={control}
            label="Grupo Superior"
            cols="12 12 4"
            options={grupoCalculoSuperiorOptions}
            optionLabel="label"
            optionValue="value"
            getFormErrorMessage={() => null}
          />
          <DropdownFieldSeplag
            name="nivelEspecificidade"
            control={control}
            label="Nível de Especificidade"
            cols="12 12 3"
            options={grupoCalculoNivelOptions}
            optionLabel="label"
            optionValue="value"
            getFormErrorMessage={() => null}
          />
          <DropdownFieldSeplag
            name="tipoFolha"
            control={control}
            label="Tipo de Folha Aplicável"
            cols="12 12 4"
            options={grupoCalculoTipoFolhaOptions}
            optionLabel="label"
            optionValue="value"
            getFormErrorMessage={() => null}
          />
          <DropdownFieldSeplag
            name="permiteHeranca"
            control={control}
            label="Permite Herança de Rubricas"
            cols="12 12 4"
            options={grupoCalculoSimNaoOptions}
            optionLabel="label"
            optionValue="value"
            getFormErrorMessage={() => null}
          />
          <DropdownFieldSeplag
            name="permiteSobrescreverOrdem"
            control={control}
            label="Permite Sobrescrever Ordem Herdada"
            cols="12 12 4"
            options={grupoCalculoSimNaoOptions}
            optionLabel="label"
            optionValue="value"
            getFormErrorMessage={() => null}
          />
          <div className="col-12 prototype-grupo-calculo-vigencia">
            <SituacaoVigenciaSeplag<GrupoCalculoForm>
              control={control}
              setValue={setValue}
              rotuloDataAtivacao="Início da Vigência"
              cols={{
                situacao: "12 12 4",
                dataAtivacao: "12 12 4",
                statusOperacional: "col-12 md:col-4 lg:col-4",
                dataEncerramento: "12 12 4",
                motivoEncerramento: "12 12 8",
                dataExtincao: "12 12 4",
                motivoExtincao: "12 12 8",
              }}
              getFormErrorMessage={() => null}
            />
          </div>
          <TextAreaFieldSeplag
            name="observacao"
            control={control}
            label="Observação"
            cols="12 12 12"
            maxLength={500}
            getFormErrorMessage={() => null}
          />
        </div>
      );
    }

    if (activeTab === "criterios") {
      return (
        <div className="prototype-grupo-calculo-tab-panel prototype-grupo-calculo-criterios">
          <div className="prototype-grupo-calculo-criterios-toolbar">
            <div className="prototype-grupo-calculo-operador">
              <span>Operador entre critérios</span>
              <label>
                <input
                  type="radio"
                  name="operadorCriterios"
                  checked={operadorCriterios === "todos"}
                  onChange={() => setOperadorCriterios("todos")}
                />
                Todos os critérios
              </label>
              <label>
                <input
                  type="radio"
                  name="operadorCriterios"
                  checked={operadorCriterios === "qualquer"}
                  onChange={() => setOperadorCriterios("qualquer")}
                />
                Qualquer critério
              </label>
            </div>

            <BotaoSeplag
              type="button"
              label="Adicionar critério"
              icon="pi pi-plus"
              onClick={handleAdicionarCriterio}
            />
          </div>

          <div className="prototype-grupo-calculo-simple-table prototype-grupo-calculo-criterios-table">
            <table>
              <thead>
                <tr>
                  <th>Critério</th>
                  <th>Operador</th>
                  <th>Valor</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {criterios.map((criterio) => {
                  const isEditing = criterioEditandoId === criterio.id;

                  return (
                    <tr key={criterio.id}>
                      <td>
                        {isEditing ? (
                          <select
                            value={criterio.criterio}
                            onChange={(event) =>
                              handleAtualizarCriterio(
                                criterio.id,
                                "criterio",
                                event.target.value,
                              )
                            }
                          >
                            {grupoCalculoCriterioOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          criterio.criterio
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <select
                            value={criterio.operador}
                            onChange={(event) =>
                              handleAtualizarCriterio(
                                criterio.id,
                                "operador",
                                event.target.value,
                              )
                            }
                          >
                            {grupoCalculoOperadorOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          criterio.operador
                        )}
                      </td>
                      <td>
                        {isEditing ? (
                          <input
                            value={criterio.valor}
                            onChange={(event) =>
                              handleAtualizarCriterio(
                                criterio.id,
                                "valor",
                                event.target.value,
                              )
                            }
                            placeholder="Informe o valor"
                          />
                        ) : (
                          criterio.valor
                        )}
                      </td>
                      <td>
                        <div className="prototype-grupo-calculo-row-actions">
                          <button
                            type="button"
                            className="prototype-grupo-calculo-icon-action"
                            title={isEditing ? "Concluir edição" : "Editar"}
                            onClick={() =>
                              setCriterioEditandoId(isEditing ? null : criterio.id)
                            }
                          >
                            <i
                              className={isEditing ? "pi pi-check" : "pi pi-pencil"}
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            className="prototype-grupo-calculo-icon-action prototype-grupo-calculo-icon-action--danger"
                            title="Remover"
                            onClick={() => handleRemoverCriterio(criterio.id)}
                          >
                            <i className="pi pi-trash" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "rubricas") {
      return (
        <div className="prototype-grupo-calculo-tab-panel">
          <div className="prototype-grupo-calculo-rubrica-filters">
            <strong>Filtros das rubricas disponíveis</strong>
            <div className="grid prototype-category-form-fields">
              <TextFieldSeplag
                name="rubricaFiltroTermo"
                control={control}
                label="Código/Nome"
                cols="12 12 4"
                getFormErrorMessage={() => null}
              />
              <DropdownFieldSeplag
                name="rubricaFiltroTipo"
                control={control}
                label="Tipo"
                cols="12 12 2"
                options={grupoCalculoRubricaTipoOptions}
                optionLabel="label"
                optionValue="value"
                getFormErrorMessage={() => null}
              />
              <DropdownFieldSeplag
                name="rubricaFiltroNatureza"
                control={control}
                label="Natureza"
                cols="12 12 2"
                options={grupoCalculoRubricaNaturezaOptions}
                optionLabel="label"
                optionValue="value"
                getFormErrorMessage={() => null}
              />
              <DropdownFieldSeplag
                name="rubricaFiltroSituacao"
                control={control}
                label="Situação"
                cols="12 12 2"
                options={catalogoRubricaStatusOptions}
                optionLabel="label"
                optionValue="value"
                getFormErrorMessage={() => null}
              />
              <DropdownFieldSeplag
                name="rubricaFiltroPossuiFormula"
                control={control}
                label="Possui fórmula"
                cols="12 12 2"
                options={grupoCalculoRubricaFormulaOptions}
                optionLabel="label"
                optionValue="value"
                getFormErrorMessage={() => null}
              />
            </div>
          </div>

          <div className="prototype-grupo-picklist-shell prototype-grupo-calculo-picklist">
            <PickListSeplag
              title="Rubricas do Grupo"
              titleNaoSelecionados="Rubricas disponíveis"
              titleSelecionados="Rubricas do grupo"
              dataKey="id"
              dataLabel="nomeRubrica"
              filterBy="codigo,nomeRubrica,naturezaVerba,status"
              filterPlaceholder="Buscar rubrica..."
              naoSelecionados={rubricasDisponiveisFiltradas}
              selecionados={rubricasSelecionadas}
              setNaoSelecionados={handleSetRubricasDisponiveisFiltradas}
              setSelecionados={setRubricasSelecionadas}
              naoSelecionadosItemTemplate={renderRubricaPickListItem}
              selecionadosItemTemplate={renderRubricaPickListItem}
            />
          </div>
        </div>
      );
    }

    if (activeTab === "ordenacao") {
      return (
        <div className="prototype-grupo-calculo-tab-panel">
          <div className="prototype-grupo-calculo-order-actions">
            <BotaoSeplag
              type="button"
              label="Validar ordem"
              icon="pi pi-check-circle"
              onClick={() => {}}
            />
            <BotaoSeplag
              type="button"
              label="Visualizar dependências"
              icon="pi pi-sitemap"
              onClick={() => {}}
            />
          </div>

          <div className="prototype-grupo-calculo-simple-table prototype-grupo-calculo-ordenacao-table">
            <table>
              <thead>
                <tr>
                  <th>Ordem</th>
                  <th>Código</th>
                  <th>Rubrica</th>
                  <th>Tipo</th>
                  <th>Origem</th>
                  <th>Fórmula</th>
                  <th>Depende de</th>
                  <th>Bloqueio</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rubricasSelecionadas.map((rubrica, index) => {
                  const dependeDe = index === 0 ? "-" : rubricasSelecionadas[0]?.codigo;
                  const possuiBloqueio = index > 0;

                  return (
                    <tr
                      key={rubrica.id}
                      className={possuiBloqueio ? "is-dependency-blocked" : undefined}
                    >
                      <td>{String(index + 1).padStart(3, "0")}</td>
                      <td>{rubrica.codigo}</td>
                      <td>{rubrica.nomeRubrica}</td>
                      <td>{getGrupoCalculoRubricaTipo(rubrica)}</td>
                      <td>{index === 0 ? "Herdada" : "Própria"}</td>
                      <td>
                        {getGrupoCalculoRubricaPossuiFormula(rubrica)
                          ? "Sim"
                          : "Não"}
                      </td>
                      <td>{dependeDe}</td>
                      <td>
                        <BadgeSeplag
                          label={possuiBloqueio ? "Sim" : "Não"}
                          color={possuiBloqueio ? "#b42318" : "#00843d"}
                          bg={possuiBloqueio ? "#fee4e2" : "#e2f3e8"}
                          icon={
                            possuiBloqueio
                              ? "pi pi-lock"
                              : "pi pi-check-circle"
                          }
                        />
                      </td>
                      <td>
                        <div className="prototype-grupo-calculo-row-actions prototype-grupo-calculo-order-row-actions">
                          <button
                            type="button"
                            className="prototype-grupo-calculo-icon-action"
                            title="Subir"
                            disabled={index === 0}
                            onClick={() =>
                              handleMoverRubricaOrdenacao(index, index - 1)
                            }
                          >
                            <i className="pi pi-arrow-up" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className="prototype-grupo-calculo-icon-action"
                            title="Descer"
                            disabled={index === rubricasSelecionadas.length - 1}
                            onClick={() =>
                              handleMoverRubricaOrdenacao(index, index + 1)
                            }
                          >
                            <i className="pi pi-arrow-down" aria-hidden="true" />
                          </button>
                          <input
                            className="prototype-grupo-calculo-position-input"
                            type="number"
                            min={1}
                            max={rubricasSelecionadas.length}
                            aria-label="Mover para posição"
                            title="Mover para posição"
                            placeholder="Pos."
                            onKeyDown={(event) => {
                              if (event.key !== "Enter") return;
                              handleMoverRubricaParaPosicao(
                                index,
                                event.currentTarget.value,
                              );
                              event.currentTarget.value = "";
                            }}
                            onBlur={(event) => {
                              if (!event.currentTarget.value) return;
                              handleMoverRubricaParaPosicao(
                                index,
                                event.currentTarget.value,
                              );
                              event.currentTarget.value = "";
                            }}
                          />
                          <button
                            type="button"
                            className="prototype-grupo-calculo-icon-action"
                            title="Visualizar dependências"
                            onClick={() => {}}
                          >
                            <i className="pi pi-sitemap" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "heranca") {
      return (
        <div className="prototype-grupo-calculo-tab-panel">
          <div className="prototype-grupo-calculo-heritage">
            <span>Geral</span>
            <i className="pi pi-arrow-right" aria-hidden="true" />
            <span>Efetivos</span>
            <i className="pi pi-arrow-right" aria-hidden="true" />
            <span>Efetivos SEDUC</span>
            <i className="pi pi-arrow-right" aria-hidden="true" />
            <span>Professores SEDUC 40h</span>
          </div>

          <div className="prototype-grupo-calculo-simple-table prototype-grupo-calculo-heranca-table">
            <table>
              <thead>
                <tr>
                  <th>Rubrica</th>
                  <th>Origem</th>
                  <th>Está ativa neste grupo?</th>
                  <th>Ordem herdada</th>
                  <th>Ordem local</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {herancaRubricas.map((rubrica) => (
                  <tr
                    key={rubrica.id}
                    className={!rubrica.ativaNesteGrupo ? "is-local-disabled" : undefined}
                  >
                    <td>{rubrica.rubrica}</td>
                    <td>{rubrica.origem}</td>
                    <td>
                      <BadgeSeplag
                        label={rubrica.ativaNesteGrupo ? "Sim" : "Não"}
                        color={rubrica.ativaNesteGrupo ? "#00843d" : "#b42318"}
                        bg={rubrica.ativaNesteGrupo ? "#e2f3e8" : "#fee4e2"}
                        icon={
                          rubrica.ativaNesteGrupo
                            ? "pi pi-check-circle"
                            : "pi pi-times-circle"
                        }
                      />
                    </td>
                    <td>{rubrica.ordemHerdada}</td>
                    <td>{rubrica.ordemLocal}</td>
                    <td>
                      <div className="prototype-grupo-calculo-heranca-actions">
                        {[
                          "Manter",
                          "Sobrescrever",
                          "Excluir localmente",
                          "Restaurar padrão",
                        ].map((acao) => (
                          <button
                            key={acao}
                            type="button"
                            className={
                              rubrica.acao === acao
                                ? "is-active"
                                : undefined
                            }
                            onClick={() =>
                              handleAlterarAcaoHeranca(
                                rubrica.id,
                                acao as GrupoCalculoHerancaRubricaRow["acao"],
                              )
                            }
                          >
                            {acao}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "simulacao") {
      return (
        <div className="prototype-grupo-calculo-tab-panel">
          <div className="grid prototype-category-form-fields">
            <TextFieldSeplag
              name="simulacaoCompetencia"
              control={control}
              label="Competência"
              cols="12 12 2"
              placeholder="mm/aaaa"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="simulacaoOrgao"
              control={control}
              label="Órgão"
              cols="12 12 2"
              options={grupoCalculoOrgaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="simulacaoTipoVinculo"
              control={control}
              label="Tipo de vínculo"
              cols="12 12 3"
              options={grupoCalculoTipoVinculoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="simulacaoSituacaoFuncional"
              control={control}
              label="Situação funcional"
              cols="12 12 3"
              options={grupoCalculoSituacaoFuncionalOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="simulacaoAmostra"
              control={control}
              label="Amostra"
              cols="12 12 2"
              options={grupoCalculoAmostraOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
          </div>

          <div className="prototype-grupo-calculo-simulacao-actions">
            <BotaoSeplag
              type="button"
              label="Simular"
              icon="pi pi-play"
              onClick={() => {}}
            />
            <BotaoSeplag
              type="button"
              label="Exportar resultado"
              icon="pi pi-download"
              onClick={() => {}}
            />
            <BotaoSeplag
              type="button"
              label="Ver servidores sem grupo"
              icon="pi pi-users"
              onClick={() => {}}
            />
            <BotaoSeplag
              type="button"
              label="Gerar pendência"
              icon="pi pi-exclamation-triangle"
              onClick={() => {}}
            />
          </div>

          <div className="prototype-grupo-calculo-simple-table prototype-grupo-calculo-simulacao-table">
            <table>
              <thead>
                <tr>
                  <th>Vínculo</th>
                  <th>Servidor</th>
                  <th>Órgão</th>
                  <th>Tipo vínculo</th>
                  <th>Cargo</th>
                  <th>Situação</th>
                  <th>Grupo aplicado</th>
                  <th>Observação</th>
                </tr>
              </thead>
              <tbody>
                {gruposCalculoSimulacaoMock.map((resultado) => {
                  const semGrupo = resultado.grupoAplicado === "Sem grupo";

                  return (
                    <tr key={resultado.id} className={semGrupo ? "is-sem-grupo" : undefined}>
                      <td>{resultado.vinculo}</td>
                      <td>{resultado.servidor}</td>
                      <td>{resultado.orgao}</td>
                      <td>{resultado.tipoVinculo}</td>
                      <td>{resultado.cargo}</td>
                      <td>{resultado.situacao}</td>
                      <td>
                        <BadgeSeplag
                          label={resultado.grupoAplicado}
                          color={semGrupo ? "#b42318" : "#00843d"}
                          bg={semGrupo ? "#fee4e2" : "#e2f3e8"}
                          icon={
                            semGrupo
                              ? "pi pi-exclamation-triangle"
                              : "pi pi-check-circle"
                          }
                        />
                      </td>
                      <td>{resultado.observacao}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="prototype-grupo-calculo-tab-panel">
        <div className="prototype-grupo-calculo-validacao-actions">
          <BotaoSeplag
            type="button"
            label="Validar grupo"
            icon="pi pi-check-circle"
            onClick={() => {}}
          />
        </div>

        <div className="prototype-grupo-calculo-simple-table prototype-grupo-calculo-validacoes-table">
          <table>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Severidade</th>
                <th>Ação sugerida</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {gruposCalculoValidacoesMock.map((pendencia) => {
                const meta = getGrupoCalculoSeveridadeMeta(pendencia.severidade);

                return (
                  <tr key={pendencia.id}>
                    <td>{pendencia.tipo}</td>
                    <td>{pendencia.descricao}</td>
                    <td>
                      <BadgeSeplag
                        label={pendencia.severidade}
                        color={meta.color}
                        bg={meta.bg}
                        icon={meta.icon}
                      />
                    </td>
                    <td>{pendencia.acaoSugerida}</td>
                    <td>
                      <div className="prototype-grupo-calculo-validacao-row-actions">
                        <button
                          type="button"
                          className="prototype-grupo-calculo-icon-action"
                          title="Resolver pendência"
                          onClick={() => {}}
                        >
                          <i className="pi pi-wrench" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          className="prototype-grupo-calculo-icon-action"
                          title="Ir para aba relacionada"
                          onClick={() => setActiveTab(pendencia.abaRelacionada)}
                        >
                          <i className="pi pi-arrow-right" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title={`${isEdit ? "Alterar" : "Cadastrar"} - Grupo de Cálculo`}
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-category-form prototype-grupo-calculo-form">
              <TabsSeplag
                items={grupoCalculoTabs}
                activeValue={activeTab}
                onChange={setActiveTab}
                className="prototype-grupo-calculo-tabs"
                maxWidth="100%"
              />

              {renderTabContent()}

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate("/prototipos/folha/grupos-calculo")}
                />
                <BotaoSalvarSeplag
                  type="submit"
                  label="Salvar Rascunho"
                />
                <BotaoSeplag
                  type="button"
                  label="Validar"
                  icon="pi pi-check-circle"
                  onClick={() => setActiveTab("validacoes")}
                />
                <BotaoSalvarSeplag
                  type="button"
                  label="Publicar"
                  icon="pi pi-send"
                  onClick={() => {}}
                />
              </div>
            </div>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaCatalogoRubricasPage() {
  const navigate = useNavigate();
  const { control, reset, watch } = useForm<CatalogoRubricaFiltroForm>({
    defaultValues: {
      termo: "",
      status: "",
    },
  });

  // Estados para o modal de inativação
  const [visibleModalInativar, setVisibleModalInativar] = useState(false);
  const [rubricaSelecionada, setRubricaSelecionada] = useState<RubricaRow | null>(null);
  const [catalogoRubricasMockState, setCatalogoRubricasMockState] = useState(catalogoRubricasMock);

  // Formulário para inativação
  const { control: controlInativar, reset: resetInativar, handleSubmit } = useForm<InativarRubricaForm>({
    defaultValues: {
      motivoInativacao: "",
      dataFim: "",
    },
  });

  const termo = (watch("termo") ?? "").toLowerCase().trim();
  const statusFiltro = watch("status");

  const catalogoResults = createResults(
    catalogoRubricasMockState.filter((item) => {
      const matchesStatus = !statusFiltro || item.status === statusFiltro;
      const matchesTermo =
        !termo ||
        item.codigo.toLowerCase().includes(termo) ||
        item.nomeRubrica.toLowerCase().includes(termo);
      return matchesStatus && matchesTermo;
    }),
  );

  const catalogoColumns: ColumnMetaSeplag<RubricaRow>[] = [
    {
      field: "codigo",
      header: "Código",
    },
    {
      field: "nomeRubrica",
      header: "Nome da Rubrica",
    },
    {
      field: "naturezaVerba",
      header: "Natureza da Verba",
    },
    {
      field: "dataAprovacao",
      header: "Data de Aprovação",
    },
    {
      header: "Status",
      body: (row) => {
        const badge = rubricaStatusBadge[row.status];
        return (
          <BadgeSeplag
            label={badge.label}
            color={badge.color}
            bg={badge.bg}
            icon={badge.icon}
          />
        );
      },
    },
  ];

  // Funções para lidar com inativação
  const handleInativar = (rubrica: RubricaRow) => {
    setRubricaSelecionada(rubrica);
    resetInativar({ motivoInativacao: "", dataFim: "" });
    setVisibleModalInativar(true);
  };

  const confirmarInativacao = handleSubmit((formData) => {
    if (rubricaSelecionada) {
      // Atualizar o mock data
      const rubricaAtualizada = catalogoRubricasMockState.map((rubrica) =>
        rubrica.id === rubricaSelecionada.id
          ? { ...rubrica, status: "Inativa" as const }
          : rubrica
      );
      setCatalogoRubricasMockState(rubricaAtualizada);
      
      // Fechar modal e resetar
      setVisibleModalInativar(false);
      resetInativar();
      setRubricaSelecionada(null);
    }
  });

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-folha-catalogo-page">
        <CardSeplag title="Catálogo de Rubricas" cols="12" cardHeaderClassNames="prototype-regime-card">
          <div className="prototype-category-filters prototype-folha-catalogo-filters grid">
            <TextFieldSeplag
              name="termo"
              control={control}
              label="Buscar por código ou nome"
              cols="12 12 6"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="status"
              control={control}
              label="Status"
              cols="12 12 4"
              options={catalogoRubricaStatusOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() => reset({ termo: "", status: "" })}
              />
            </div>
          </div>

          <div className="prototype-folha-catalogo-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={catalogoResults}
              rows={10}
              rowsPerPage={[10, 20, 50]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={catalogoColumns}
              hasEventoAcao
              handleView={(row) => navigate(`/prototipos/folha/catalogo-rubricas/${row.id}`)}
              handleInativar={(row) => row.status === "Ativa" ? handleInativar(row) : null}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>

        {/* Modal de Inativação */}
        <ModalSeplag
          visible={visibleModalInativar}
          titulo={`Inativar Rubrica - ${rubricaSelecionada?.codigo} (${rubricaSelecionada?.nomeRubrica})`}
          fechar={() => {
            setVisibleModalInativar(false);
            setRubricaSelecionada(null);
          }}
          labelAcao="Inativar"
          funcAcao={confirmarInativacao}
          tamanho="500px"
        >
          <div className="grid" style={{ paddingTop: "20px" }}>
            <TextAreaFieldSeplag
              name="motivoInativacao"
              control={controlInativar}
              label="Motivo da Inativação"
              cols="12"
              required={true}
              rows={4}
              placeholder="Informe o motivo da inativação desta rubrica"
              getFormErrorMessage={(error) => error?.message}
            />
            <DateFieldSeplag
              name="dataFim"
              control={controlInativar}
              label="Data de Fim"
              cols="12"
              required={true}
              placeholder="dd/mm/aaaa"
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              getFormErrorMessage={(error) => error?.message}
            />
          </div>
        </ModalSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaCatalogoRubricaViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const rubrica = catalogoRubricasMock.find((item) => String(item.id) === id);

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-folha-catalogo-view-page">
        <CardSeplag title="Detalhes da Rubrica" cols="12" cardHeaderClassNames="prototype-regime-card">
          <div className="prototype-catalogo-view-actions">
            <BotaoVoltarSeplag onClick={() => navigate(-1)}>
              Voltar
            </BotaoVoltarSeplag>
          </div>
          {rubrica ? (
            <div className="prototype-catalogo-view-content">
              <p><strong>Código:</strong> {rubrica.codigo}</p>
              <p><strong>Nome da Rubrica:</strong> {rubrica.nomeRubrica}</p>
              <p><strong>Natureza da Verba:</strong> {rubrica.naturezaVerba}</p>
              <p><strong>Data de Aprovação:</strong> {rubrica.dataAprovacao}</p>
              <p><strong>Status:</strong> <BadgeSeplag {...rubricaStatusBadge[rubrica.status]} label={rubrica.status} /></p>
            </div>
          ) : (
            <div className="prototype-empty-content">Rubrica não encontrada.</div>
          )}
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaPenhoraJudicialPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-empty-content" aria-label="Penhora Judicial" />
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaGrupoEleitosPage() {
  const navigate = useNavigate();
  const { control, reset } = useForm<GrupoEleitosFiltroForm>({
    defaultValues: {
      termo: "",
      finalidade: undefined,
      dataInicio: "",
      dataFim: "",
    },
  });
  const grupoEleitosResults = {
    ...createResults(gruposEleitosMock),
    totalPages: 5,
    totalRecords: 42,
    size: 10,
    sizePage: 10,
  };
  const grupoEleitosColumns: ColumnMetaSeplag<GrupoEleitosRow>[] = [
    {
      field: "codigo",
      header: "Código",
    },
    {
      field: "descricao",
      header: "Descrição",
    },
    {
      header: "Finalidade",
      body: (row) => <span>{row.finalidade}</span>,
    },
    {
      field: "quantidadeEleitos",
      header: "Quantidade Eleitos",
    },
    {
      field: "dataCadastro",
      header: "Data Cadastro",
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-folha-grupo-page">
        <CardSeplag
          title="Grupo de Eleitos"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-category-filters prototype-folha-grupo-filters grid">
            <TextFieldSeplag
              name="termo"
              control={control}
              label="Código, Descrição"
              cols="12 12 4"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="finalidade"
              control={control}
              label="Finalidade"
              cols="12 6 2"
              options={grupoEleitosFinalidadeOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DateFieldSeplag
              name="dataInicio"
              control={control}
              label="Data Início"
              cols="12 6 2"
              getFormErrorMessage={() => null}
            />
            <DateFieldSeplag
              name="dataFim"
              control={control}
              label="Data Fim"
              cols="12 6 2"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    termo: "",
                    finalidade: undefined,
                    dataInicio: "",
                    dataFim: "",
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-folha-grupo-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={grupoEleitosResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy
              selectionMode={null}
              columns={grupoEleitosColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate("/prototipos/folha/grupo-eleitos/novo")
              }
              handleView={() => {}}
              handleEdit={() => {}}
              handleDelete={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaGrupoEleitoFormPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("grupo-eleito");
  const [participantesDisponiveis, setParticipantesDisponiveis] = useState(
    grupoEleitoParticipantesMock.slice(4),
  );
  const [participantesEleitos, setParticipantesEleitos] = useState(
    grupoEleitoParticipantesMock.slice(0, 4),
  );
  const { control, setValue } = useForm<GrupoEleitoForm>({
    defaultValues: {
      descricao: "",
      finalidade: undefined,
      observacoes: "",
      participanteBusca: "",
      consultar: "todos",
      filtroInstituicao: [],
      filtroOrgao: [],
      filtroTipoVinculo: [],
      filtroSetor: [],
      filtroCategoria: [],
      filtroCargo: [],
    },
  });
  const renderParticipantePickListItem = (participante: GrupoEleitoParticipanteRow) => (
    <div className="prototype-grupo-picklist-item">
      <span className="prototype-grupo-matricula">{participante.matricula}</span>
      <strong>{participante.servidor}</strong>
    </div>
  );
  const handleClearParticipanteFilters = () => {
    setValue("participanteBusca", "");
    setValue("filtroInstituicao", []);
    setValue("filtroOrgao", []);
    setValue("filtroTipoVinculo", []);
    setValue("filtroSetor", []);
    setValue("filtroCategoria", []);
    setValue("filtroCargo", []);
  };

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title="Cadastrar - Grupo de Eleito"
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-category-form">
              <TabsSeplag
                items={grupoEleitoTabs}
                activeValue={activeTab}
                onChange={setActiveTab}
                maxWidth="420px"
              />

              {activeTab === "grupo-eleito" ? (
                <div className="grid prototype-category-form-fields prototype-grupo-eleito-form-fields">
                  <TextFieldSeplag
                    name="descricao"
                    control={control}
                    label="Descrição"
                    cols="12 12 6"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="finalidade"
                    control={control}
                    label="Finalidade"
                    cols="12 12 6"
                    required
                    options={grupoEleitosFinalidadeOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <TextAreaFieldSeplag
                    name="observacoes"
                    control={control}
                    label="Observações"
                    cols="12 12 12"
                    maxLength={500}
                    getFormErrorMessage={() => null}
                  />
                </div>
              ) : (
                <div className="prototype-grupo-participantes">
                  <div className="prototype-grupo-picklist-shell">
                    <div className="prototype-grupo-card-search">
                      <div className="prototype-grupo-card-search-label">
                        Nome,CPF ou Matrícula<span>*</span>
                      </div>
                        <div className="prototype-grupo-card-search-row">
                          <Controller
                            name="participanteBusca"
                            control={control}
                            render={({ field }) => (
                              <input
                                {...field}
                                className="p-inputtext p-component"
                                placeholder="Buscar por nome ou matrícula..."
                              />
                            )}
                          />
                        </div>
                      </div>

                      <details className="prototype-grupo-inline-filters" open>
                        <summary className="prototype-grupo-inline-filters-title">
                          <span>
                            <i className="pi pi-filter" aria-hidden="true" />
                            Filtros avançados
                          </span>
                          <i className="pi pi-chevron-down prototype-grupo-accordion-chevron" aria-hidden="true" />
                        </summary>
                        <div className="grid prototype-grupo-advanced-filter-grid">
                          <MultiSelectFieldSeplag
                            name="filtroInstituicao"
                            control={control}
                            label="Instituição"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.instituicoes}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar instituições"
                            getFormErrorMessage={() => null}
                          />
                          <MultiSelectFieldSeplag
                            name="filtroOrgao"
                            control={control}
                            label="Órgão"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.orgaos}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar órgãos"
                            getFormErrorMessage={() => null}
                          />
                          <MultiSelectFieldSeplag
                            name="filtroTipoVinculo"
                            control={control}
                            label="Tipo de Vínculo"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.tiposVinculo}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar tipos"
                            getFormErrorMessage={() => null}
                          />
                          <MultiSelectFieldSeplag
                            name="filtroSetor"
                            control={control}
                            label="Setor"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.setores}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar setores"
                            getFormErrorMessage={() => null}
                          />
                          <MultiSelectFieldSeplag
                            name="filtroCategoria"
                            control={control}
                            label="Categoria"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.categorias}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar categorias"
                            getFormErrorMessage={() => null}
                          />
                          <MultiSelectFieldSeplag
                            name="filtroCargo"
                            control={control}
                            label="Cargo"
                            cols="12 6 4"
                            options={grupoEleitoFiltroAvancadoOptions.cargos}
                            optionLabel="label"
                            optionValue="value"
                            placeholder="Selecionar cargos"
                            getFormErrorMessage={() => null}
                          />
                        </div>
                        <div className="prototype-grupo-inline-filter-actions">
                          <BotaoLimparFiltroSeplag
                            type="button"
                            label="Limpar Filtros"
                            icon="pi pi-refresh"
                            style={{ height: 30, marginBottom: 0 }}
                            onClick={handleClearParticipanteFilters}
                          />
                        </div>
                      </details>

                    <PickListSeplag<GrupoEleitoParticipanteRow>
                      title=""
                      titleNaoSelecionados="Disponíveis"
                      titleSelecionados="Eleitos"
                      dataKey="id"
                      dataLabel="servidor"
                      filterBy="matricula,servidor"
                      filterPlaceholder="Filtrar participantes..."
                      naoSelecionados={participantesDisponiveis}
                      selecionados={participantesEleitos}
                      setNaoSelecionados={setParticipantesDisponiveis}
                      setSelecionados={setParticipantesEleitos}
                      naoSelecionadosItemTemplate={renderParticipantePickListItem}
                      selecionadosItemTemplate={renderParticipantePickListItem}
                    />
                  </div>
                </div>
              )}

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate("/prototipos/folha/grupo-eleitos")}
                />
                <BotaoSalvarSeplag type="submit" />
              </div>
            </div>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

function EmDesenvolvimentoPage({
  nomeSistema,
}: Readonly<{ nomeSistema: string }>) {
  return (
    <PrototypeSystemPage
      nomeSistema={nomeSistema}
      ambienteSistema="Teste"
      menuItems={menuSimples}
      message={`${nomeSistema} ainda está em desenvolvimento.`}
    />
  );
}

export function PrototiposPericiaPage() {
  return <EmDesenvolvimentoPage nomeSistema="PERÍCIA" />;
}

export function PrototiposConsignadoPage() {
  return <EmDesenvolvimentoPage nomeSistema="CONSIGNADO" />;
}

export function PrototiposContagemTempoPage() {
  return <EmDesenvolvimentoPage nomeSistema="CONTAGEM DE TEMPO" />;
}

export function PrototiposESocialPage() {
  return <EmDesenvolvimentoPage nomeSistema="E-SOCIAL" />;
}

export function PrototiposAposentadoriaPage() {
  return <EmDesenvolvimentoPage nomeSistema="APOSENTADORIA" />;
}

export function PrototiposConformidadePage() {
  return <EmDesenvolvimentoPage nomeSistema="CONFORMIDADE" />;
}

export function PrototiposAuditoriaPage() {
  return <EmDesenvolvimentoPage nomeSistema="AUDITORIA" />;
}
