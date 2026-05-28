import { Link, useNavigate, useParams } from "react-router-dom";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Controller, useForm, type FieldErrors } from "react-hook-form";
import {
  BotaoLimparFiltroSeplag,
  BotaoIconSeplag,
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
  CheckboxFieldSeplag,
  DropdownFieldSeplag,
  MultiSelectFieldSeplag,
  NumberFieldSeplag,
  SwitchFieldSeplag,
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
import { folhaPagamentoService } from "./folhaPagamento/folhaPagamentoService";
import type {
  FolhaPagamentoExecucaoRow,
  FolhaPagamentoExecucaoSituacao,
  FolhaPagamentoFiltroForm,
  FolhaPagamentoForm,
  FolhaPagamentoPessoaLogFiltroForm,
  FolhaPagamentoPessoaLogRow,
  FolhaPagamentoPessoaLogSituacao,
  FolhaPagamentoRow,
  FolhaPagamentoRubricaLogRow,
  FolhaPagamentoRubricaLogSituacao,
  FolhaPagamentoSituacao,
} from "./folhaPagamento/types";

const SIGEP_BASE_PATH = "/prototipos/sigep";
const SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH =
  "/prototipos/sigep/cargo-concurso-teste";

interface CargoConcursoRouteProps {
  routePrefix?: string;
}

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
          { label: "Cargo", icon: "pi pi-circle-on", to: "/prototipos/sigep/cargo", visibleOnMenu: true, visibleOnRouter: true },
          {
            label: "Controle de Vagas",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/controle-vagas",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          { label: "Tabelas de Vencimentos", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
        ],
      },
      {
        label: "Cargo e Concurso TESTE",
        icon: "pi pi-clone",
        url: "#",
        visibleOnMenu: true,
        visibleOnRouter: true,
        items: [
          {
            label: "Regime Jurídico",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/cargo-concurso-teste/regime-juridico",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          {
            label: "Categoria/Subcategoria",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/cargo-concurso-teste/categoria",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          {
            label: "Cargo",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/cargo-concurso-teste/cargo",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          {
            label: "Tipo de Vínculo",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/cargo-concurso-teste/tipo-vinculo",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
          {
            label: "Matriz/Regras",
            icon: "pi pi-circle-on",
            to: "/prototipos/sigep/cargo-concurso-teste/matriz-validacao",
            visibleOnMenu: true,
            visibleOnRouter: true,
          },
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
    label: "Processamento",
    icon: "pi pi-cog",
    url: "#",
    visibleOnMenu: true,
    visibleOnRouter: true,
    items: [
      {
        label: "Folha de Pagamento",
        icon: "pi pi-circle-on",
        to: "/prototipos/folha/processamento/folha-pagamento",
        visibleOnMenu: true,
        visibleOnRouter: true,
      },
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
  {
    id: "folha",
    title: "Folha de Pagamento",
    description: "Protótipos para rubricas, grupos de cálculo, grupos de eleitos e lançamentos financeiros.",
    path: "/prototipos/folha",
    icon: "pi pi-money-bill",
    status: "Protótipo em evolução",
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

interface CargoFiltroForm {
  cargo?: string;
  categoria?: string;
  situacao?: string;
}

interface TipoVinculoFiltroForm {
  termo?: string;
  natureza?: string;
  instituicao?: string;
  situacao?: string;
}

interface MatrizValidacaoFiltroForm {
  instituicao?: string;
  orgao?: string;
  regimeJuridico?: string;
  tipoVinculo?: string;
  categoria?: string;
  cargo?: string;
  situacao?: string;
}

interface CargoForm {
  codigo?: string;
  baseLegal?: string[];
  categoria?: string;
  subcategoria?: string;
  instituicao?: string[];
  nomeCargo?: string;
  descricao?: string;
  tipoCargo?: string;
  naturezaCargo?: string;
  formaProvimento?: string;
  regimeJuridico?: string;
  jornadaTrabalho?: string;
  escolaridadeMinima?: string;
  cbo?: string;
  especialidade?: string;
  naturezaVinculo?: string;
  cargoChefia?: "S" | "N";
  permiteSubstituicao?: "S" | "N";
  exibirPortal?: "S" | "N";
  observacao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  dataExtincao?: string;
  motivoEncerramento?: string;
  motivoExtincao?: string;
}

interface TipoVinculoForm {
  codigo?: string;
  nome?: string;
  descricao?: string;
  natureza?: string;
  baseLegal?: string[];
  geraVinculoFuncional?: "S" | "N";
  exigeCargo?: "S" | "N";
  exigeVaga?: "S" | "N";
  permiteControleVagas?: "S" | "N";
  permiteFolha?: "S" | "N";
  permiteAposentadoria?: "S" | "N";
  permitePensionista?: "S" | "N";
  permiteEventoCargo?: "S" | "N";
  exigeDataFim?: "S" | "N";
  observacao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  dataExtincao?: string;
  motivoEncerramento?: string;
  motivoExtincao?: string;
}

interface MatrizValidacaoForm {
  instituicao?: string;
  orgao?: string;
  setor?: string;
  regimeJuridico?: string;
  tipoVinculo?: string;
  categoria?: string;
  subcategoria?: string;
  cargo?: string;
  formaProvimento?: string;
  jornada?: string;
  controlaVaga?: string;
  tipoControleVaga?: string;
  aplicaIngresso?: "S" | "N";
  aplicaEventoCargo?: "S" | "N";
  aplicaConcurso?: "S" | "N";
  aplicaControleVagas?: "S" | "N";
  observacao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  dataExtincao?: string;
  motivoEncerramento?: string;
  motivoExtincao?: string;
}


interface RegimeJuridicoFiltroForm {
  nome?: string;
  instituicao?: string;
  situacao?: string;
}

interface ControleVagasConfiguracaoFiltroForm {
  cargoFuncao?: string;
  tipo?: "" | "Cargo" | "Função";
  controlaVaga?: "" | "Sim" | "Não";
  tipoControle?: "" | "Quantitativo" | "Numerado" | "Híbrido";
  situacao?: "" | "Ativo" | "Agendado" | "Encerrado" | "Inativo";
}

interface ControleVagasConfiguracaoForm {
  tipo?: "Cargo" | "Função" | "";
  codigo?: string;
  cargoFuncao?: string;
  controlaVaga?: "Sim" | "Não" | "";
  tipoControle?: "Quantitativo" | "Numerado" | "Híbrido" | "";
  dataInicio?: string;
  permiteSaldoNegativo?: "Sim" | "Não" | "";
  justificativaSaldoNegativo?: string;
  observacao?: string;
  criterioCargoFuncao?: "S" | "N";
  criterioRegimeJuridico?: "S" | "N";
  criterioTipoVinculo?: "S" | "N";
  criterioOrgaoSetor?: "S" | "N";
  criterioSetoresSubordinados?: "S" | "N";
  criterioLocalidade?: "S" | "N";
  criterioEspecialidade?: "S" | "N";
  criterioJornada?: "S" | "N";
}

interface ControleVagasHistoricoRow {
  id: number;
  dataHora: string;
  evento: string;
  usuario: string;
  detalhe: string;
}

interface GrupoEleitosFiltroForm {
  termo?: string;
  situacao?: StatusOperacionalVigenciaSeplag | "";
}

interface GrupoCalculoFiltroForm {
  nomeGrupo?: string;
  situacao?: StatusOperacionalVigenciaSeplag | "";
  tipoVinculo?: string;
}

interface GrupoCalculoForm {
  nome?: string;
  descricao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
  abrangenciaRegimeJuridico?: string;
  abrangenciaTipoVinculo?: string;
  abrangenciaInstituicao?: string;
  abrangenciaHerdarDe?: string;
  abrangenciaOrgao?: string;
}

interface GrupoEleitoForm {
  descricao?: string;
  situacao?: SituacaoVigenciaValueSeplag["situacao"];
  dataAtivacao?: string;
  dataEncerramento?: string;
  motivoEncerramento?: string;
  dataExtincao?: string;
  motivoExtincao?: string;
  observacoes?: string;
  participanteBusca?: string;
  consultar?: "todos" | "disponiveis" | "eleitos";
  filtroInstituicao?: string[];
  filtroOrgao?: string[];
  filtroTipoVinculo?: string[];
  filtroSetor?: string[];
  filtroCategoria?: string[];
  filtroSubcategoria?: string[];
  filtroCargo?: string[];
}

interface RegimeJuridicoForm {
  nome?: string;
  sigla?: string;
  descricao?: string;
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
  subcategoriaSigla?: string;
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

interface CategoriaTesteRow extends CategoriaRow {
  subcategorias: number;
  vigencia: string;
}

interface CargoRow {
  id: number;
  cargo: string;
  categoria: string;
  baseLegal: number;
  instituicoes: number;
  situacao: "ATIVO" | "ENCERRADO";
}

interface CargoTesteRow extends CargoRow {
  codigo: string;
  subcategoria: string;
  jornadaPadrao: string;
  regrasUso: number;
  vigencia: string;
}

interface TipoVinculoTesteRow {
  id: number;
  codigo: string;
  nome: string;
  descricao: string;
  natureza: string;
  instituicao: string;
  instituicoesVinculadas: number;
  comportamentos: string[];
  vigencia: string;
  situacao: "ATIVO" | "ENCERRADO";
}

interface MatrizValidacaoTesteRow {
  id: number;
  instituicao: string;
  orgao: string;
  setor: string;
  regimeJuridico: string;
  tipoVinculo: string;
  categoria: string;
  subcategoria: string;
  cargo: string;
  formaProvimento: string;
  jornada: string;
  vigencia: string;
  situacao: "ATIVO" | "ENCERRADO";
  especificidade: "Genérica" | "Por órgão" | "Por cargo";
}

interface RegimeJuridicoRow {
  id: number;
  nome: string;
  descricao: string;
  instituicao: string;
  instituicoesVinculadas: number;
  situacao: StatusOperacionalVigenciaSeplag;
}

interface RegimeJuridicoTesteRow extends RegimeJuridicoRow {
  codigo: string;
  vigencia: string;
}

interface ControleVagasConfiguracaoRow {
  id: number;
  tipo: "Cargo" | "Função";
  codigo: string;
  cargoFuncao: string;
  controlaVaga: "Sim" | "Não";
  tipoControle: "Quantitativo" | "Numerado" | "Híbrido" | "-";
  dataInicio: string;
  criterios: string[];
  situacao: "Ativo" | "Agendado" | "Encerrado" | "Inativo";
  ultimaAlteracao: string;
}

interface GrupoEleitosRow {
  id: number;
  descricao: string;
  situacao: StatusOperacionalVigenciaSeplag;
  quantidadeEleitos: number;
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

interface GrupoCalculoRubricaGerenciada extends RubricaRow {
  origem: "filtro" | "manual";
  reordenada?: boolean;
}

interface GrupoEleitoParticipanteRow {
  id: number;
  matricula: string;
  cpf: string;
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

interface SubcategoriaTesteRow {
  id: number;
  sigla: string;
  nome: string;
  descricao: string;
  cargos: number;
  regrasUso: number;
  vigencia: string;
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

const categoriasTesteMock: CategoriaTesteRow[] = [
  {
    id: 1,
    sigla: "EDU",
    descricao: "Profissionais da Educação",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    subcategorias: 3,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 2,
    sigla: "MIL",
    descricao: "Militar",
    instituicao: "govmt",
    instituicoesVinculadas: 2,
    subcategorias: 2,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 3,
    sigla: "SAUDE",
    descricao: "Profissionais da Saúde",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    subcategorias: 4,
    vigencia: "01/03/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 4,
    sigla: "AREA_MEIO",
    descricao: "Profissionais da Área Meio",
    instituicao: "mti",
    instituicoesVinculadas: 3,
    subcategorias: 5,
    vigencia: "01/01/2026 -",
    situacao: "ENCERRADO",
  },
];

const subcategoriasTesteMock: SubcategoriaTesteRow[] = [
  {
    id: 1,
    sigla: "PROF",
    nome: "Professor",
    descricao: "Subcategoria da carreira de profissionais da educação.",
    cargos: 2,
    regrasUso: 3,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 2,
    sigla: "TAE",
    nome: "Técnico Administrativo Educacional",
    descricao: "Subcategoria administrativa vinculada à educação.",
    cargos: 5,
    regrasUso: 2,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 3,
    sigla: "OFICIAL",
    nome: "Oficial",
    descricao: "Subcategoria composta pelos postos de oficiais militares.",
    cargos: 8,
    regrasUso: 4,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
];

const cargosMock: CargoRow[] = [
  {
    id: 1,
    cargo: "ENGENHEIRO DE SOFTWARE",
    categoria: "B/A BA/",
    baseLegal: 1,
    instituicoes: 2,
    situacao: "ATIVO",
  },
  {
    id: 2,
    cargo: "CARGO 1 abc",
    categoria: "Agentes de Administração Fazendária",
    baseLegal: 1,
    instituicoes: 1,
    situacao: "ATIVO",
  },
  {
    id: 3,
    cargo: "CARGO THAUÃ",
    categoria: "Bolsista",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 4,
    cargo: "ASSIST. TEC. DE DEFESA AGROP.",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 5,
    cargo: "ASSISTENTE ADM. DEF. AGROPEC.",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 6,
    cargo: "AUXILIAR SERV DEF AGROPECUARIA",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 7,
    cargo: "TEC. DEF AGROPEC FLORESTAL - PROV",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 8,
    cargo: "TEC. ADM. DEF. AGROPEC. FLORES - PROV",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 9,
    cargo: "ASSIST. TEC. DE DEFESA AGROP. - PROV",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 10,
    cargo: "ASSISTENTE ADM. DEF. AGROPEC. - PROV",
    categoria: "Profissionais do Instituto de Defesa Agropecuario",
    baseLegal: 0,
    instituicoes: 0,
    situacao: "ATIVO",
  },
  {
    id: 11,
    cargo: "ANALISTA ADMINISTRATIVO",
    categoria: "Agentes Governamentais da Cultura sss",
    baseLegal: 2,
    instituicoes: 3,
    situacao: "ENCERRADO",
  },
  {
    id: 12,
    cargo: "GESTOR GOVERNAMENTAL",
    categoria: "N/A/D",
    baseLegal: 1,
    instituicoes: 2,
    situacao: "ATIVO",
  },
];

const cargosTesteMock: CargoTesteRow[] = [
  {
    id: 1,
    codigo: "PROF_ED_BAS",
    cargo: "Professor da Educação Básica",
    categoria: "Profissionais da Educação",
    subcategoria: "Professor",
    jornadaPadrao: "30H",
    baseLegal: 1,
    instituicoes: 0,
    regrasUso: 3,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 2,
    codigo: "MEDICO",
    cargo: "Médico",
    categoria: "Profissionais da Saúde",
    subcategoria: "Médico",
    jornadaPadrao: "Conforme regra",
    baseLegal: 2,
    instituicoes: 0,
    regrasUso: 2,
    vigencia: "01/03/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 3,
    codigo: "TEN_BM",
    cargo: "Tenente BM",
    categoria: "Militar",
    subcategoria: "Oficial",
    jornadaPadrao: "Dedicação integral",
    baseLegal: 1,
    instituicoes: 0,
    regrasUso: 4,
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 4,
    codigo: "ANALISTA_ADM",
    cargo: "Analista Administrativo",
    categoria: "Profissionais da Área Meio",
    subcategoria: "Administrativo",
    jornadaPadrao: "40H",
    baseLegal: 1,
    instituicoes: 0,
    regrasUso: 1,
    vigencia: "01/01/2026 -",
    situacao: "ENCERRADO",
  },
];

const cargoRegrasUsoTesteMock = [
  {
    id: 1,
    instituicao: "GOVMT",
    orgao: "SEDUC",
    regime: "Estatutário Civil",
    tipoVinculo: "Efetivo",
    formaProvimento: "Concurso Público",
    jornada: "30H",
    situacao: "Ativo",
  },
  {
    id: 2,
    instituicao: "GOVMT",
    orgao: "Todos",
    regime: "Regime Especial",
    tipoVinculo: "Contratado",
    formaProvimento: "Processo Seletivo",
    jornada: "Conforme matriz",
    situacao: "Ativo",
  },
];

const tiposVinculoTesteMock: TipoVinculoTesteRow[] = [
  {
    id: 1,
    codigo: "EFET",
    nome: "Efetivo",
    descricao: "Vínculo decorrente de provimento efetivo em cargo público.",
    natureza: "Permanente",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    comportamentos: ["Gera vínculo", "Exige cargo", "Permite folha"],
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 2,
    codigo: "CONT",
    nome: "Contratado",
    descricao: "Vínculo temporário decorrente de contratação por prazo determinado.",
    natureza: "Temporário",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    comportamentos: ["Gera vínculo", "Exige cargo", "Exige data fim"],
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 3,
    codigo: "COM",
    nome: "Comissionado",
    descricao: "Vínculo de livre nomeação e exoneração.",
    natureza: "Comissionado",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    comportamentos: ["Gera vínculo", "Permite folha", "Permite evento"],
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 4,
    codigo: "APOS",
    nome: "Aposentado/Inativo",
    descricao: "Vínculo previdenciário de servidor aposentado ou inativo.",
    natureza: "Previdenciário",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    comportamentos: ["Permite folha", "Permite aposentadoria"],
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
  },
  {
    id: 5,
    codigo: "PENS",
    nome: "Pensionista",
    descricao: "Vínculo previdenciário ou especial para beneficiário de pensão.",
    natureza: "Previdenciário",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    comportamentos: ["Permite folha", "Permite pensionista"],
    vigencia: "01/01/2026 -",
    situacao: "ENCERRADO",
  },
];

const matrizValidacaoTesteMock: MatrizValidacaoTesteRow[] = [
  {
    id: 1,
    instituicao: "GOVMT",
    orgao: "SEDUC",
    setor: "Todos",
    regimeJuridico: "Estatutário Civil",
    tipoVinculo: "Efetivo",
    categoria: "Profissionais da Educação",
    subcategoria: "Professor",
    cargo: "Professor da Educação Básica",
    formaProvimento: "Concurso Público",
    jornada: "30H",
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
    especificidade: "Por cargo",
  },
  {
    id: 2,
    instituicao: "GOVMT",
    orgao: "SES",
    setor: "Todos",
    regimeJuridico: "Regime Especial",
    tipoVinculo: "Contratado",
    categoria: "Profissionais da Saúde",
    subcategoria: "Médico",
    cargo: "Médico",
    formaProvimento: "Processo Seletivo",
    jornada: "Plantão",
    vigencia: "01/03/2026 -",
    situacao: "ATIVO",
    especificidade: "Por cargo",
  },
  {
    id: 3,
    instituicao: "GOVMT",
    orgao: "CBMMT",
    setor: "Todos",
    regimeJuridico: "Estatutário Militar",
    tipoVinculo: "Efetivo",
    categoria: "Militar",
    subcategoria: "Oficial",
    cargo: "Todos",
    formaProvimento: "Concurso Público",
    jornada: "Dedicação integral",
    vigencia: "01/01/2026 -",
    situacao: "ATIVO",
    especificidade: "Por órgão",
  },
  {
    id: 4,
    instituicao: "GOVMT",
    orgao: "Todos",
    setor: "Todos",
    regimeJuridico: "Estatutário Civil",
    tipoVinculo: "Efetivo",
    categoria: "Profissionais da Área Meio",
    subcategoria: "Todos",
    cargo: "Todos",
    formaProvimento: "Todos",
    jornada: "Todos",
    vigencia: "01/01/2026 -",
    situacao: "ENCERRADO",
    especificidade: "Genérica",
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
    descricao: "PESSOA FÍSICA",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    quantidadeEleitos: 0,
  },
  {
    id: 79,
    descricao: "abc123",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    quantidadeEleitos: 0,
  },
  {
    id: 80,
    descricao:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas minima reprehenderit cupiditate tempore. Commodi dignissimos ad impedit repellendus consequatur aliquam cumque magnam saepe vero dolor acc",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO,
    quantidadeEleitos: 0,
  },
  {
    id: 77,
    descricao: "Grupo Teste",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
    quantidadeEleitos: 0,
  },
  {
    id: 75,
    descricao: "TESTE",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO,
    quantidadeEleitos: 0,
  },
  {
    id: 76,
    descricao: "TESTE",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
    quantidadeEleitos: 0,
  },
  {
    id: 74,
    descricao: "Teste 24/04/2026",
    situacao: STATUS_OPERACIONAL_VIGENCIA.EXTINTO,
    quantidadeEleitos: 0,
  },
];

const regimesJuridicosTesteMock: RegimeJuridicoTesteRow[] = [
  {
    id: 1,
    codigo: "EST_CIVIL",
    nome: "Estatutário Civil",
    descricao: "Servidores civis estatutários da Administração Pública.",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    vigencia: "01/01/2026 -",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
  },
  {
    id: 2,
    codigo: "EST_MIL",
    nome: "Estatutário Militar",
    descricao: "Militares estaduais regidos por estatuto próprio.",
    instituicao: "govmt",
    instituicoesVinculadas: 2,
    vigencia: "01/01/2026 -",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
  },
  {
    id: 3,
    codigo: "TEMP_MIL",
    nome: "Militar Temporário",
    descricao: "Militares temporários com vínculo por tempo determinado.",
    instituicao: "govmt",
    instituicoesVinculadas: 2,
    vigencia: "01/01/2026 -",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO,
  },
  {
    id: 4,
    codigo: "CLT",
    nome: "Regime Celetista",
    descricao: "Empregados públicos regidos pela CLT.",
    instituicao: "mti",
    instituicoesVinculadas: 3,
    vigencia: "01/01/2026 -",
    situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
  },
  {
    id: 5,
    codigo: "REG_ESP",
    nome: "Regime Especial",
    descricao: "Contratos temporários e hipóteses especiais previstas em lei.",
    instituicao: "govmt",
    instituicoesVinculadas: 1,
    vigencia: "01/03/2026 -",
    situacao: STATUS_OPERACIONAL_VIGENCIA.AGENDADO,
  },
];

const controleVagasConfiguracoesMock: ControleVagasConfiguracaoRow[] = [
  {
    id: 1,
    tipo: "Cargo",
    codigo: "C001",
    cargoFuncao: "Analista Administrativo",
    controlaVaga: "Sim",
    tipoControle: "Quantitativo",
    dataInicio: "01/01/2026",
    criterios: ["Cargo/Função", "Órgão/Setor", "Especialidade"],
    situacao: "Ativo",
    ultimaAlteracao: "12/05/2026 09:20",
  },
  {
    id: 2,
    tipo: "Cargo",
    codigo: "C014",
    cargoFuncao: "Técnico Administrativo",
    controlaVaga: "Sim",
    tipoControle: "Híbrido",
    dataInicio: "01/03/2026",
    criterios: ["Cargo/Função", "Localidade", "Tipo de Vínculo"],
    situacao: "Agendado",
    ultimaAlteracao: "18/05/2026 14:05",
  },
  {
    id: 3,
    tipo: "Função",
    codigo: "F023",
    cargoFuncao: "Coordenador",
    controlaVaga: "Sim",
    tipoControle: "Numerado",
    dataInicio: "15/01/2026",
    criterios: ["Cargo/Função", "Órgão/Setor", "Setores subordinados"],
    situacao: "Ativo",
    ultimaAlteracao: "20/05/2026 10:42",
  },
  {
    id: 4,
    tipo: "Cargo",
    codigo: "C032",
    cargoFuncao: "Professor da Educação Básica",
    controlaVaga: "Sim",
    tipoControle: "Quantitativo",
    dataInicio: "01/02/2026",
    criterios: ["Cargo/Função", "Especialidade", "Jornada", "Localidade"],
    situacao: "Ativo",
    ultimaAlteracao: "21/05/2026 08:11",
  },
  {
    id: 5,
    tipo: "Função",
    codigo: "F041",
    cargoFuncao: "Assessor Técnico",
    controlaVaga: "Não",
    tipoControle: "-",
    dataInicio: "-",
    criterios: ["Cargo/Função"],
    situacao: "Inativo",
    ultimaAlteracao: "22/05/2026 16:30",
  },
  {
    id: 6,
    tipo: "Cargo",
    codigo: "C008",
    cargoFuncao: "Gestor Governamental",
    controlaVaga: "Sim",
    tipoControle: "Quantitativo",
    dataInicio: "01/01/2025",
    criterios: ["Cargo/Função", "Regime Jurídico", "Tipo de Vínculo"],
    situacao: "Encerrado",
    ultimaAlteracao: "23/05/2026 11:15",
  },
];

const controleVagasHistoricoMock: ControleVagasHistoricoRow[] = [
  {
    id: 1,
    dataHora: "27/05/2026 09:12",
    evento: "Configuração criada",
    usuario: "ROBERTO JUNIOR",
    detalhe: "Controle quantitativo habilitado para o cargo/função selecionado.",
  },
  {
    id: 2,
    dataHora: "27/05/2026 09:18",
    evento: "Critérios atualizados",
    usuario: "ROBERTO JUNIOR",
    detalhe: "Validação por órgão/setor e tipo de vínculo incluída.",
  },
  {
    id: 3,
    dataHora: "27/05/2026 09:24",
    evento: "Vigência ajustada",
    usuario: "ROBERTO JUNIOR",
    detalhe: "Data de início alterada para compatibilizar com a competência de implantação.",
  },
];

const controleVagasModuleItems = [
  {
    id: "configuracao",
    title: "Configuração",
    description: "Define quais cargos e funções controlam vagas e quais critérios serão validados.",
    path: "/prototipos/sigep/controle-vagas/configuracao",
    icon: "pi pi-sliders-h",
    status: "Etapa 01",
  },
  {
    id: "quadro-autorizado",
    title: "Quadro Autorizado",
    description: "Cadastra o quantitativo autorizado de vagas por cargo ou função.",
    path: "",
    icon: "pi pi-table",
    status: "Em breve",
  },
  {
    id: "vagas-numeradas",
    title: "Vagas Numeradas",
    description: "Controla vagas individualizadas com código próprio e ocupação rastreável.",
    path: "",
    icon: "pi pi-hashtag",
    status: "Em breve",
  },
  {
    id: "saldo",
    title: "Consulta de Saldo",
    description: "Exibe vagas autorizadas, ocupadas, reservadas e disponíveis por referência.",
    path: "",
    icon: "pi pi-chart-bar",
    status: "Em breve",
  },
  {
    id: "historico",
    title: "Histórico/Ocupação",
    description: "Consulta a linha do tempo de ocupações, reservas, liberações e alterações.",
    path: "",
    icon: "pi pi-history",
    status: "Em breve",
  },
];

const folhaPagamentoSituacaoOptions: {
  label: string;
  value: FolhaPagamentoSituacao | "";
}[] = [
  { label: "Todas", value: "" },
  { label: "Rascunho", value: "RASCUNHO" },
  { label: "Aberta", value: "ABERTA" },
  { label: "Em fila", value: "EM_FILA" },
  { label: "Em processamento", value: "EM_PROCESSAMENTO" },
  { label: "Processada", value: "PROCESSADA" },
  { label: "Processada com alerta", value: "PROCESSADA_COM_ALERTA" },
  { label: "Processada com erro", value: "PROCESSADA_COM_ERRO" },
  { label: "Bloqueada", value: "BLOQUEADA" },
  { label: "Cancelada", value: "CANCELADA" },
];

const folhaPagamentoSituacaoMeta: Record<
  FolhaPagamentoSituacao,
  { label: string; color: string; bg: string; border: string }
> = {
  RASCUNHO: { label: "Rascunho", color: "#52616b", bg: "#eef2f6", border: "#eef2f6" },
  ABERTA: { label: "Aberta", color: "#005494", bg: "#e6f0f8", border: "#e6f0f8" },
  EM_FILA: { label: "Em fila", color: "#8a5a00", bg: "#fff4d6", border: "#fff4d6" },
  EM_PROCESSAMENTO: { label: "Em processamento", color: "#005494", bg: "#e7f3ff", border: "#e7f3ff" },
  PROCESSADA: { label: "Processada", color: "#00843d", bg: "#e2f3e8", border: "#e2f3e8" },
  PROCESSADA_COM_ALERTA: { label: "Processada com alerta", color: "#9a6500", bg: "#fff1c7", border: "#fff1c7" },
  PROCESSADA_COM_ERRO: { label: "Processada com erro", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
  BLOQUEADA: { label: "Bloqueada", color: "#334e68", bg: "#e2e8f0", border: "#e2e8f0" },
  CANCELADA: { label: "Cancelada", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
};

const folhaPagamentoExecucaoSituacaoMeta: Record<
  FolhaPagamentoExecucaoSituacao,
  { label: string; color: string; bg: string; border: string }
> = {
  EM_FILA: { label: "Em fila", color: "#8a5a00", bg: "#fff4d6", border: "#fff4d6" },
  EM_PROCESSAMENTO: { label: "Em processamento", color: "#005494", bg: "#e7f3ff", border: "#e7f3ff" },
  CONCLUIDA: { label: "Concluída", color: "#00843d", bg: "#e2f3e8", border: "#e2f3e8" },
  CONCLUIDA_COM_ALERTA: { label: "Concluída com alerta", color: "#9a6500", bg: "#fff1c7", border: "#fff1c7" },
  CONCLUIDA_COM_ERRO: { label: "Concluída com erro", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
  CANCELADA: { label: "Cancelada", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
};

const folhaPagamentoPessoaLogSituacaoOptions: {
  label: string;
  value: FolhaPagamentoPessoaLogSituacao | "";
}[] = [
  { label: "Todas", value: "" },
  { label: "Não processada", value: "NAO_PROCESSADA" },
  { label: "Em processamento", value: "EM_PROCESSAMENTO" },
  { label: "Sucesso", value: "SUCESSO" },
  { label: "Alerta", value: "ALERTA" },
  { label: "Erro", value: "ERRO" },
  { label: "Ignorada", value: "IGNORADA" },
];

const folhaPagamentoPessoaLogSituacaoMeta: Record<
  FolhaPagamentoPessoaLogSituacao,
  { label: string; color: string; bg: string; border: string }
> = {
  NAO_PROCESSADA: { label: "Não processada", color: "#52616b", bg: "#eef2f6", border: "#eef2f6" },
  EM_PROCESSAMENTO: { label: "Em processamento", color: "#005494", bg: "#e7f3ff", border: "#e7f3ff" },
  SUCESSO: { label: "Sucesso", color: "#00843d", bg: "#e2f3e8", border: "#e2f3e8" },
  ALERTA: { label: "Alerta", color: "#9a6500", bg: "#fff1c7", border: "#fff1c7" },
  ERRO: { label: "Erro", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
  IGNORADA: { label: "Ignorada", color: "#64748b", bg: "#f1f5f9", border: "#f1f5f9" },
};

const folhaPagamentoRubricaLogSituacaoMeta: Record<
  FolhaPagamentoRubricaLogSituacao,
  { label: string; color: string; bg: string; border: string }
> = {
  CALCULADA: { label: "Calculada", color: "#00843d", bg: "#e2f3e8", border: "#e2f3e8" },
  NAO_ELEGIVEL: { label: "Não elegível", color: "#64748b", bg: "#f1f5f9", border: "#f1f5f9" },
  ALERTA: { label: "Alerta", color: "#9a6500", bg: "#fff1c7", border: "#fff1c7" },
  ERRO: { label: "Erro", color: "#b42318", bg: "#fee4e2", border: "#fee4e2" },
  NAO_PROCESSADA: { label: "Não processada", color: "#52616b", bg: "#eef2f6", border: "#eef2f6" },
};

const folhaPagamentoOrgaoOptions = [
  { label: "SEPLAG", value: "SEPLAG" },
  { label: "MTI", value: "MTI" },
  { label: "SEDUC", value: "SEDUC" },
  { label: "SES", value: "SES" },
  { label: "SAD", value: "SAD" },
];

const folhaPagamentoRegimeOptions = [
  { label: "Todos", value: "" },
  { label: "Estatutário Civil", value: "Estatutário Civil" },
  { label: "Estatutário Militar", value: "Estatutário Militar" },
  { label: "Regime Celetista", value: "Regime Celetista" },
  { label: "Contrato Temporário", value: "Contrato Temporário" },
];

const folhaPagamentoCategoriaOptions = [
  { label: "Todas", value: "" },
  { label: "Profissionais da Educação", value: "Profissionais da Educação" },
  { label: "Profissionais da Saúde", value: "Profissionais da Saúde" },
  { label: "Área Meio", value: "Área Meio" },
  { label: "Militar", value: "Militar" },
];

const folhaPagamentoCargoOptions = [
  { label: "Todos", value: "" },
  { label: "Professor da Educação Básica", value: "Professor da Educação Básica" },
  { label: "Analista Administrativo", value: "Analista Administrativo" },
  { label: "Médico", value: "Médico" },
  { label: "Gestor Governamental", value: "Gestor Governamental" },
];

const folhaPagamentoGrupoEleitosOptions = [
  { label: "Nenhum", value: "" },
  { label: "PESSOA FÍSICA", value: "PESSOA FÍSICA" },
  { label: "Grupo Teste", value: "Grupo Teste" },
  { label: "Teste 24/04/2026", value: "Teste 24/04/2026" },
];

const folhaPagamentoTabs: TabItemSeplag<string>[] = [
  { label: "Dados da Folha", value: "dados", col: "lg:col-4" },
  { label: "Abrangência", value: "abrangencia", col: "lg:col-4" },
  { label: "Parâmetros de Cálculo", value: "parametros", col: "lg:col-4" },
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

const gruposCalculoVersoesMock: Record<number, GrupoCalculoRow[]> = {
  1: [
    gruposCalculoMock[0],
    {
      ...gruposCalculoMock[0],
      codigo: "G001-V1",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
      inicioVigencia: "01/2025",
      fimVigencia: "12/2025",
      rubricas: 39,
    },
  ],
  2: [
    gruposCalculoMock[1],
    {
      ...gruposCalculoMock[1],
      codigo: "G010-V1",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
      inicioVigencia: "01/2025",
      fimVigencia: "12/2025",
      rubricas: 31,
    },
  ],
  3: [
    gruposCalculoMock[2],
    {
      ...gruposCalculoMock[2],
      codigo: "G011-V2",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ATIVO,
      inicioVigencia: "01/2026",
      fimVigencia: "05/2026",
      rubricas: 36,
      pendencias: 0,
    },
    {
      ...gruposCalculoMock[2],
      codigo: "G011-V1",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
      inicioVigencia: "03/2025",
      fimVigencia: "12/2025",
      rubricas: 34,
      pendencias: 0,
    },
  ],
  4: [gruposCalculoMock[3]],
  5: [
    gruposCalculoMock[4],
    {
      ...gruposCalculoMock[4],
      codigo: "G030-V1",
      situacao: STATUS_OPERACIONAL_VIGENCIA.ENCERRADO,
      inicioVigencia: "01/2025",
      fimVigencia: "12/2025",
      rubricas: 15,
      pendencias: 0,
    },
  ],
  6: [gruposCalculoMock[5]],
  7: [gruposCalculoMock[6]],
  8: [gruposCalculoMock[7]],
  9: [gruposCalculoMock[8]],
  10: [gruposCalculoMock[9]],
};

const grupoEleitoParticipantesMock: GrupoEleitoParticipanteRow[] = [
  {
    id: 1,
    matricula: "139151",
    cpf: "012.014.025-02",
    vinculo: "15",
    servidor: "ADRIANA MAMEDES MENDONÇA",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "21/04/2026",
  },
  {
    id: 2,
    matricula: "309263",
    cpf: "123.456.789-00",
    vinculo: "1",
    servidor: "MARIA 322373",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "01/01/2001",
  },
  {
    id: 3,
    matricula: "309263",
    cpf: "123.456.789-00",
    vinculo: "2",
    servidor: "MARIA 322373",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "",
  },
  {
    id: 4,
    matricula: "",
    cpf: "456.789.123-11",
    vinculo: "3",
    servidor: "ABELARDO PINTO TELES",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "11/09/2025",
  },
  {
    id: 5,
    matricula: "",
    cpf: "012.014.025-02",
    vinculo: "9",
    servidor: "ABELVAL LUIZ GOMES DA SILVA",
    orgaoEntidade: "",
    dataExercicioAposentadoria: "10/12/2025",
  },
  {
    id: 6,
    matricula: "322603",
    cpf: "012.014.025-02",
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

const regimeTesteInstituicaoOptions = [
  { label: "GOVMT", value: "govmt" },
  { label: "MTI", value: "mti" },
  { label: "METAMAT", value: "metamat" },
  { label: "JUCEMAT", value: "jucemat" },
  { label: "PMMT", value: "pmmt" },
  { label: "CBMMT", value: "cbmmt" },
];

const grupoCalculoInstituicaoOptions = [
  { label: "GOVMT", value: "govmt" },
  { label: "METAMAT", value: "metamat" },
  { label: "UCEMAT", value: "ucemat" },
  { label: "MTI", value: "mti" },
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
  { label: "Efetivo", value: "efetivo" },
  { label: "Contratado", value: "contratado" },
  { label: "Comissionado", value: "comissionado" },
  { label: "Aposentado", value: "aposentado" },
];

const grupoCalculoFiltroTipoVinculoOptions = [
  { label: "Todos", value: "todos" },
  ...grupoCalculoTipoVinculoOptions,
];

const grupoCalculoSuperiorOptions = [
  { label: "Nenhum", value: "nenhum" },
  { label: "Geral", value: "Geral" },
  { label: "Efetivos", value: "Efetivos" },
  { label: "Contratados", value: "Contratados" },
  { label: "Comissionados", value: "Comissionados" },
];

const grupoCalculoRegimeJuridicoOptions = regimesJuridicosMock.map((regime) => ({
  label: regime.nome,
  value: regime.nome,
}));

const grupoCalculoRubricasPorFiltro: Record<string, string[]> = {
  "regime:ESTATUTARIO CIVIL": ["1001", "1006", "1007", "1008", "1010", "1011"],
  "regime:ESTATUTARIO MILITAR": ["1001", "1006", "1007", "1008", "1010", "1011"],
  "regime:MILITAR TEMPORARIO": ["1001", "1002", "1007", "1009", "1010"],
  "regime:REGIME CELETISTA": ["1001", "1002", "1005", "1007", "1009", "1013"],
  "regime:REGIME ESPECIAL": ["1001", "1007", "1008", "1012", "1014"],
  "regime:REGIME MISTO": ["1001", "1006", "1007", "1008", "1009", "1010", "1011"],
  "vinculo:efetivo": ["1001", "1003", "1006", "1007", "1008", "1009", "1010", "1011"],
  "vinculo:contratado": ["1001", "1002", "1003", "1007", "1009", "1013"],
  "vinculo:comissionado": ["1001", "1003", "1007", "1008", "1011", "1012"],
  "vinculo:aposentado": ["1001", "1006", "1007", "1010", "1011", "1014"],
  "instituicao:govmt": ["1001", "1003", "1006", "1007", "1008", "1009", "1010", "1011"],
  "instituicao:metamat": ["1001", "1002", "1007", "1009", "1013", "1014"],
  "instituicao:ucemat": ["1001", "1003", "1007", "1008", "1011", "1012"],
  "instituicao:mti": ["1001", "1002", "1007", "1008", "1009", "1012", "1013"],
  "orgao:todos": ["1001", "1002", "1003", "1005", "1006", "1007", "1008", "1009", "1010", "1011", "1012", "1013", "1014"],
  "orgao:seplag": ["1001", "1003", "1006", "1007", "1008", "1010", "1011"],
  "orgao:seduc": ["1001", "1002", "1003", "1007", "1009", "1013"],
  "orgao:pge": ["1001", "1003", "1006", "1007", "1008", "1011", "1012"],
  "herdar:Geral": ["1001", "1003", "1007", "1012"],
  "herdar:Efetivos": ["1001", "1003", "1006", "1007", "1008", "1010", "1011"],
  "herdar:Contratados": ["1001", "1002", "1003", "1007", "1009", "1013"],
  "herdar:Comissionados": ["1001", "1003", "1007", "1008", "1011", "1012"],
};

const grupoCalculoRubricasPorCombinacao: Record<string, string[]> = {
  "ESTATUTARIO CIVIL|efetivo|govmt|seplag|Geral": ["1001", "1003", "1006", "1007", "1008", "1010", "1011"],
  "ESTATUTARIO CIVIL|aposentado|govmt|seplag|Efetivos": ["1001", "1006", "1007", "1010", "1011", "1014"],
  "REGIME CELETISTA|contratado|metamat|seduc|Contratados": ["1001", "1002", "1003", "1005", "1007", "1009", "1013"],
  "ESTATUTARIO CIVIL|comissionado|ucemat|pge|Comissionados": ["1001", "1003", "1007", "1008", "1011", "1012"],
  "REGIME ESPECIAL|comissionado|mti|seplag|nenhum": ["1001", "1007", "1008", "1012", "1014"],
  "MILITAR TEMPORARIO|contratado|govmt|todos|Geral": ["1001", "1002", "1007", "1009", "1010"],
  "ESTATUTARIO MILITAR|efetivo|govmt|todos|Geral": ["1001", "1003", "1006", "1007", "1008", "1010", "1011"],
  "REGIME MISTO|efetivo|mti|seplag|Efetivos": ["1001", "1006", "1007", "1008", "1009", "1010", "1011"],
};

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

  return (
    <span className="prototype-grupo-calculo-status-badge-wrap">
      <span
        className={`prototype-sistema-status-badge${
          isStatusLongo ? " prototype-sistema-status-badge--long" : ""
        }`}
        style={{
          color: badge.color,
          backgroundColor: badge.bg,
          borderColor: badge.border,
        }}
      >
        {isStatusLongo ? (
          <>
            <span>Agendado para</span>
            <strong>
              {status === STATUS_OPERACIONAL_VIGENCIA.AGENDADO_ENCERRAMENTO
                ? "Encerramento"
                : "Extinção"}
            </strong>
          </>
        ) : (
          badge.label
        )}
      </span>
    </span>
  );
}

function renderControleVagasSituacaoBadge(
  situacao: ControleVagasConfiguracaoRow["situacao"],
) {
  const meta = {
    Ativo: { color: "#00843d", bg: "#dff3e7" },
    Agendado: { color: "#8a5a00", bg: "#fff4d6" },
    Encerrado: { color: "#6b7280", bg: "#f1f5f9" },
    Inativo: { color: "#6b7280", bg: "#eef2f7" },
  }[situacao];

  return (
    <span
      className="prototype-sistema-status-badge"
      style={{ color: meta.color, backgroundColor: meta.bg, borderColor: meta.bg }}
    >
      {situacao}
    </span>
  );
}

function getGrupoCalculoRubricaTipo(rubrica: RubricaRow) {
  if (["1003", "1010", "1012"].includes(rubrica.codigo)) return "Auxiliar";
  if (rubrica.naturezaVerba === "Desconto") return "Desconto";
  return "Vantagem";
}

function getGrupoCalculoRubricaTipoBadge(tipo: string) {
  if (tipo === "Desconto") {
    return {
      color: "#b42318",
      bg: "#fee4e2",
      border: "#fca5a5",
    };
  }

  if (tipo === "Auxiliar") {
    return {
      color: "#005a9c",
      bg: "#dbeafe",
      border: "#93c5fd",
    };
  }

  return {
    color: "#00843d",
    bg: "#d1fae5",
    border: "#bbf7d0",
  };
}

function getRubricasGrupoCalculoPorAbrangencia({
  regimeJuridico,
  tipoVinculo,
  instituicao,
  orgao,
  herdarDe,
}: {
  regimeJuridico?: string;
  tipoVinculo?: string;
  instituicao?: string;
  orgao?: string;
  herdarDe?: string;
}) {
  const combinationKey = [
    regimeJuridico,
    tipoVinculo,
    instituicao,
    orgao,
    herdarDe,
  ].join("|");

  const exactCodes = grupoCalculoRubricasPorCombinacao[combinationKey];
  if (exactCodes) return exactCodes;

  const filterKeys = [
    regimeJuridico ? `regime:${regimeJuridico}` : "",
    tipoVinculo ? `vinculo:${tipoVinculo}` : "",
    instituicao ? `instituicao:${instituicao}` : "",
    orgao ? `orgao:${orgao}` : "",
    herdarDe && herdarDe !== "nenhum" ? `herdar:${herdarDe}` : "",
  ].filter(Boolean);

  const codes = new Set<string>();
  filterKeys.forEach((filterKey) => {
    grupoCalculoRubricasPorFiltro[filterKey]?.forEach((codigo) =>
      codes.add(codigo),
    );
  });

  return Array.from(codes);
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
  subcategorias: [
    { label: "Professor 30h", value: "professor-30h" },
    { label: "Professor 40h", value: "professor-40h" },
    { label: "Administrativo", value: "administrativo" },
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

const cargoCategoriaOptions = Array.from(
  new Set(cargosMock.map((cargo) => cargo.categoria)),
).map((categoria) => ({ label: categoria, value: categoria }));

const cargoTesteCategoriaOptions = Array.from(
  new Set(cargosTesteMock.map((cargo) => cargo.categoria)),
).map((categoria) => ({ label: categoria, value: categoria }));

const cargoBaseLegalOptions = documentosLegaisMock.map((documento) => ({
  label: documento.titulo,
  value: documento.id,
}));

const cargoInstituicaoOptions = [
  { label: "Governo do Estado de Mato Grosso", value: "govmt" },
  { label: "SEPLAG", value: "seplag" },
  { label: "Casa Civil", value: "casa-civil" },
  { label: "MTI", value: "mti" },
];

const cargoSubcategoriaOptions = [
  { label: "Administração Direta", value: "administracao-direta" },
  { label: "Defesa Agropecuária", value: "defesa-agropecuaria" },
  { label: "Tecnologia da Informação", value: "tecnologia-informacao" },
  { label: "Educação Básica", value: "educacao-basica" },
];

const cargoTipoOptions = [
  { label: "Efetivo", value: "efetivo" },
  { label: "Comissionado", value: "comissionado" },
  { label: "Temporário", value: "temporario" },
];

const cargoNaturezaOptions = [
  { label: "Civil", value: "civil" },
  { label: "Militar", value: "militar" },
  { label: "Especial", value: "especial" },
];

const cargoFormaProvimentoOptions = [
  { label: "Concurso Público", value: "concurso-publico" },
  { label: "Nomeação", value: "nomeacao" },
  { label: "Contrato Temporário", value: "contrato-temporario" },
];

const cargoJornadaOptions = [
  { label: "20 horas", value: "20h" },
  { label: "30 horas", value: "30h" },
  { label: "40 horas", value: "40h" },
];

const cargoEscolaridadeOptions = [
  { label: "Ensino Fundamental", value: "fundamental" },
  { label: "Ensino Médio", value: "medio" },
  { label: "Ensino Superior", value: "superior" },
  { label: "Pós-graduação", value: "pos-graduacao" },
];

const cargoCboOptions = [
  { label: "2124-05 - Analista de sistemas", value: "2124-05" },
  { label: "2521-05 - Administrador", value: "2521-05" },
  { label: "3211-05 - Técnico agropecuário", value: "3211-05" },
];

const cargoEspecialidadeOptions = [
  { label: "Geral", value: "geral" },
  { label: "Software", value: "software" },
  { label: "Agropecuária", value: "agropecuaria" },
  { label: "Gestão Pública", value: "gestao-publica" },
];

const tipoVinculoNaturezaOptions = [
  { label: "Permanente", value: "Permanente" },
  { label: "Temporário", value: "Temporário" },
  { label: "Comissionado", value: "Comissionado" },
  { label: "Previdenciário", value: "Previdenciário" },
  { label: "Especial", value: "Especial" },
  { label: "Requisitado/Cedido", value: "Requisitado/Cedido" },
  { label: "Militar", value: "Militar" },
  { label: "Não Funcional", value: "Não Funcional" },
];

const matrizInstituicaoOptions = regimeTesteInstituicaoOptions.map((item) => ({
  label: item.label,
  value: item.label,
}));

const matrizOrgaoOptions = [
  { label: "Todos", value: "Todos" },
  { label: "SEDUC", value: "SEDUC" },
  { label: "SES", value: "SES" },
  { label: "CBMMT", value: "CBMMT" },
  { label: "SEPLAG", value: "SEPLAG" },
];

const matrizSetorOptions = [
  { label: "Todos", value: "Todos" },
  { label: "Gabinete", value: "Gabinete" },
  { label: "Coordenadoria", value: "Coordenadoria" },
  { label: "Unidade Administrativa", value: "Unidade Administrativa" },
];

const matrizRegimeOptions = regimesJuridicosTesteMock.map((regime) => ({
  label: regime.nome,
  value: regime.nome,
}));

const matrizTipoVinculoOptions = tiposVinculoTesteMock.map((tipo) => ({
  label: tipo.nome,
  value: tipo.nome,
}));

const matrizCategoriaOptions = categoriasTesteMock.map((categoria) => ({
  label: categoria.descricao,
  value: categoria.descricao,
}));

const matrizSubcategoriaOptions = [
  { label: "Todos", value: "Todos" },
  ...subcategoriasTesteMock.map((subcategoria) => ({
    label: subcategoria.nome,
    value: subcategoria.nome,
  })),
];

const matrizCargoOptions = [
  { label: "Todos", value: "Todos" },
  ...cargosTesteMock.map((cargo) => ({
    label: cargo.cargo,
    value: cargo.cargo,
  })),
];

const matrizControlaVagaOptions = [
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" },
];

const matrizTipoControleVagaOptions = [
  { label: "Quantitativa", value: "Quantitativa" },
  { label: "Numerada", value: "Numerada" },
  { label: "Ambas", value: "Ambas" },
];

const cargoNaturezaVinculoOptions = [
  { label: "Estatutário", value: "estatutario" },
  { label: "Celetista", value: "celetista" },
  { label: "Temporário", value: "temporario" },
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

const controleVagasTipoOptions = [
  { label: "Todos", value: "" },
  { label: "Cargo", value: "Cargo" },
  { label: "Função", value: "Função" },
];

const controleVagasSimNaoOptions = [
  { label: "Todos", value: "" },
  { label: "Sim", value: "Sim" },
  { label: "Não", value: "Não" },
];

const controleVagasTipoControleOptions = [
  { label: "Todos", value: "" },
  { label: "Quantitativo", value: "Quantitativo" },
  { label: "Numerado", value: "Numerado" },
  { label: "Híbrido", value: "Híbrido" },
];

const controleVagasSituacaoOptions = [
  { label: "Todas", value: "" },
  { label: "Ativo", value: "Ativo" },
  { label: "Agendado", value: "Agendado" },
  { label: "Encerrado", value: "Encerrado" },
  { label: "Inativo", value: "Inativo" },
];

const controleVagasTipoFormOptions = controleVagasTipoOptions.filter(
  (option) => option.value,
);

const controleVagasSimNaoFormOptions = controleVagasSimNaoOptions.filter(
  (option) => option.value,
);

const controleVagasTipoControleFormOptions =
  controleVagasTipoControleOptions.filter((option) => option.value);

const controleVagasCargoFuncaoOptions = [
  { label: "Analista Administrativo", value: "Analista Administrativo" },
  { label: "Técnico Administrativo", value: "Técnico Administrativo" },
  { label: "Coordenador", value: "Coordenador" },
  { label: "Professor da Educação Básica", value: "Professor da Educação Básica" },
  { label: "Assessor Técnico", value: "Assessor Técnico" },
  { label: "Gestor Governamental", value: "Gestor Governamental" },
];

const controleVagasConfiguracaoTabs: TabItemSeplag<string>[] = [
  { label: "Detalhes", value: "detalhes" },
  { label: "Critérios de Compatibilidade", value: "criterios" },
  { label: "Histórico", value: "historico" },
];

const regimeStatusMeta: Record<
  StatusOperacionalVigenciaSeplag,
  { label: string; color: string; bg: string; border: string }
> = {
  AGENDADO: {
    label: "Agendado",
    color: "#8a5a00",
    bg: "#fff4d6",
    border: "#fff4d6",
  },
  ATIVO: {
    label: "Ativo",
    color: "#00843d",
    bg: "#dff3e8",
    border: "#dff3e8",
  },
  AGENDADO_ENCERRAMENTO: {
    label: "Agendado para Encerramento",
    color: "#6b7280",
    bg: "#f1f5f9",
    border: "#f1f5f9",
  },
  ENCERRADO: {
    label: "Encerrado",
    color: "#6b7280",
    bg: "#f1f5f9",
    border: "#f1f5f9",
  },
  AGENDADO_EXTINCAO: {
    label: "Agendado para Extinção",
    color: "#b42318",
    bg: "#fee4e2",
    border: "#fee4e2",
  },
  EXTINTO: {
    label: "Extinto",
    color: "#b42318",
    bg: "#fee4e2",
    border: "#fee4e2",
  },
};

const categoriaTabs: TabItemSeplag<string>[] = [
  { label: "Dados Gerais", value: "dados-gerais", col: "lg:col-6" },
  { label: "Subcategoria", value: "subcategoria", col: "lg:col-6" },
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
            className="col-12 prototype-component-dashboard"
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
                situacao: "12 12 3",
                dataAtivacao: "12 12 3",
                statusOperacional: "col-12 md:col-12 lg:col-4 prototype-status-operacional-col",
                dataEncerramento: "12 12 3",
                motivoEncerramento: "12",
                dataExtincao: "12 12 3",
                motivoExtincao: "12",
              }}
              getFormErrorMessage={getFormErrorMessage(errors)}
            />
            <div className="col-12 prototype-vigencia-actions">
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

export function PrototiposControleVagasPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title="Controle de Vagas"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
          legenda={() => (
            <p className="prototype-card-description">
              Selecione uma área para configurar, consultar ou acompanhar o controle de vagas do SIGEP.
            </p>
          )}
        >
          <div className="prototype-module-card-grid">
            {controleVagasModuleItems.map((item) => {
              const content = (
                <article
                  className={`prototype-module-card${
                    item.path ? "" : " is-disabled"
                  }`}
                >
                  <div className="prototype-module-card-icon" aria-hidden="true">
                    <i className={item.icon} />
                  </div>
                  <div className="prototype-module-card-body">
                    <span>{item.status}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <i className="pi pi-arrow-right prototype-module-card-action" aria-hidden="true" />
                </article>
              );

              return item.path ? (
                <Link
                  key={item.id}
                  to={item.path}
                  className="prototype-module-card-link"
                >
                  {content}
                </Link>
              ) : (
                <div key={item.id} className="prototype-module-card-link">
                  {content}
                </div>
              );
            })}
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposControleVagasConfiguracaoPage() {
  const navigate = useNavigate();
  const { control, reset, watch } =
    useForm<ControleVagasConfiguracaoFiltroForm>({
      defaultValues: {
        cargoFuncao: "",
        tipo: "",
        controlaVaga: "",
        tipoControle: "",
        situacao: "",
      },
    });
  const filtros = watch();
  const termoBusca = filtros.cargoFuncao?.trim().toLowerCase();
  const configuracoesFiltradas = controleVagasConfiguracoesMock.filter(
    (configuracao) => {
      const atendeCargoFuncao =
        !termoBusca ||
        configuracao.codigo.toLowerCase().includes(termoBusca) ||
        configuracao.cargoFuncao.toLowerCase().includes(termoBusca);
      const atendeTipo = !filtros.tipo || configuracao.tipo === filtros.tipo;
      const atendeControla =
        !filtros.controlaVaga ||
        configuracao.controlaVaga === filtros.controlaVaga;
      const atendeTipoControle =
        !filtros.tipoControle ||
        configuracao.tipoControle === filtros.tipoControle;
      const atendeSituacao =
        !filtros.situacao || configuracao.situacao === filtros.situacao;

      return (
        atendeCargoFuncao &&
        atendeTipo &&
        atendeControla &&
        atendeTipoControle &&
        atendeSituacao
      );
    },
  );
  const configuracaoResults = createResults(configuracoesFiltradas);
  const configuracaoColumns: ColumnMetaSeplag<ControleVagasConfiguracaoRow>[] = [
    { field: "tipo", header: "Tipo" },
    { field: "codigo", header: "Código" },
    { field: "cargoFuncao", header: "Cargo/Função" },
    { field: "controlaVaga", header: "Controla Vaga" },
    { field: "tipoControle", header: "Tipo de Controle" },
    { field: "dataInicio", header: "Data Início" },
    {
      header: "Critérios",
      body: (row) => row.criterios.join(", "),
    },
    {
      header: "Situação",
      body: (row) => renderControleVagasSituacaoBadge(row.situacao),
    },
    { field: "ultimaAlteracao", header: "Última Alteração" },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title="Configuração de Controle de Vagas"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-category-filters prototype-controle-vagas-filters grid">
            <TextFieldSeplag
              name="cargoFuncao"
              control={control}
              label="Cargo/Função"
              placeholder="Código ou descrição"
              cols="12 12 4"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="tipo"
              control={control}
              label="Tipo"
              cols="12 6 2"
              options={controleVagasTipoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="controlaVaga"
              control={control}
              label="Controla Vaga"
              cols="12 6 2"
              options={controleVagasSimNaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="tipoControle"
              control={control}
              label="Tipo de Controle"
              cols="12 6 2"
              options={controleVagasTipoControleOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6 2"
              options={controleVagasSituacaoOptions}
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
                    cargoFuncao: "",
                    tipo: "",
                    controlaVaga: "",
                    tipoControle: "",
                    situacao: "",
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-controle-vagas-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={configuracaoResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={configuracaoColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate("/prototipos/sigep/controle-vagas/configuracao/novo")
              }
              handleView={(row) =>
                navigate(
                  `/prototipos/sigep/controle-vagas/configuracao/${row.id}/editar`,
                )
              }
              handleEdit={(row) =>
                navigate(
                  `/prototipos/sigep/controle-vagas/configuracao/${row.id}/editar`,
                )
              }
              handleInativar={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposControleVagasConfiguracaoFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const configuracao = controleVagasConfiguracoesMock.find(
    (item) => String(item.id) === id,
  );
  const isEditing = Boolean(id);
  const [activeTab, setActiveTab] = useState("detalhes");
  const { control, watch, setValue } = useForm<ControleVagasConfiguracaoForm>({
    defaultValues: {
      tipo: configuracao?.tipo ?? "",
      codigo: configuracao?.codigo ?? "",
      cargoFuncao: configuracao?.cargoFuncao ?? "",
      controlaVaga: configuracao?.controlaVaga ?? "Sim",
      tipoControle:
        configuracao?.tipoControle === "-" ? "" : configuracao?.tipoControle ?? "",
      dataInicio: configuracao?.dataInicio ?? "01/06/2026",
      permiteSaldoNegativo: "Não",
      justificativaSaldoNegativo: "",
      observacao: "",
      criterioCargoFuncao: "S",
      criterioRegimeJuridico: configuracao?.criterios.includes("Regime Jurídico")
        ? "S"
        : "N",
      criterioTipoVinculo: configuracao?.criterios.includes("Tipo de Vínculo")
        ? "S"
        : "N",
      criterioOrgaoSetor: configuracao?.criterios.includes("Órgão/Setor")
        ? "S"
        : "N",
      criterioSetoresSubordinados: configuracao?.criterios.includes(
        "Setores subordinados",
      )
        ? "S"
        : "N",
      criterioLocalidade: configuracao?.criterios.includes("Localidade")
        ? "S"
        : "N",
      criterioEspecialidade: configuracao?.criterios.includes("Especialidade")
        ? "S"
        : "N",
      criterioJornada: configuracao?.criterios.includes("Jornada") ? "S" : "N",
    },
  });
  const controlaVaga = watch("controlaVaga");
  const orgaoSetorSelecionado = watch("criterioOrgaoSetor") === "S";
  const camposDependentesDesabilitados = controlaVaga === "Não";

  useEffect(() => {
    if (controlaVaga !== "Não") return;

    setValue("tipoControle", "");
    setValue("dataInicio", "");
    setValue("permiteSaldoNegativo", "Não");
    setValue("justificativaSaldoNegativo", "");
    setValue("criterioRegimeJuridico", "N");
    setValue("criterioTipoVinculo", "N");
    setValue("criterioOrgaoSetor", "N");
    setValue("criterioSetoresSubordinados", "N");
    setValue("criterioLocalidade", "N");
    setValue("criterioEspecialidade", "N");
    setValue("criterioJornada", "N");
  }, [controlaVaga, setValue]);

  useEffect(() => {
    if (!orgaoSetorSelecionado) {
      setValue("criterioSetoresSubordinados", "N");
    }
  }, [orgaoSetorSelecionado, setValue]);

  const criterioRows = [
    {
      name: "criterioCargoFuncao" as const,
      titulo: "Cargo/Função",
      descricao: "Sempre validado para garantir que a configuração pertence ao cargo ou função selecionado.",
      bloqueado: true,
    },
    {
      name: "criterioRegimeJuridico" as const,
      titulo: "Regime Jurídico",
      descricao: "Valida compatibilidade do vínculo com o regime jurídico informado.",
    },
    {
      name: "criterioTipoVinculo" as const,
      titulo: "Tipo de Vínculo",
      descricao: "Restringe a ocupação conforme efetivo, contratado, comissionado ou aposentado.",
    },
    {
      name: "criterioOrgaoSetor" as const,
      titulo: "Órgão/Setor",
      descricao: "Valida se a vaga pertence à estrutura organizacional informada.",
    },
    {
      name: "criterioSetoresSubordinados" as const,
      titulo: "Setores subordinados",
      descricao: "Inclui estruturas filhas quando órgão/setor estiver marcado.",
      bloqueado: !orgaoSetorSelecionado,
    },
    {
      name: "criterioLocalidade" as const,
      titulo: "Localidade",
      descricao: "Considera município, unidade ou localidade de exercício.",
    },
    {
      name: "criterioEspecialidade" as const,
      titulo: "Especialidade",
      descricao: "Valida perfil ou especialidade exigida para a vaga.",
    },
    {
      name: "criterioJornada" as const,
      titulo: "Jornada",
      descricao: "Compara carga horária ou referência da vaga com o vínculo funcional.",
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content prototype-page-content--white">
        <CardSeplag
          title={`${isEditing ? "Alterar" : "Cadastrar"} - Configuração de Controle de Vagas`}
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          <div className="prototype-controle-vagas-form">
            <TabsSeplag
              items={controleVagasConfiguracaoTabs}
              activeValue={activeTab}
              onChange={setActiveTab}
              equalWidth
            />

            {activeTab === "detalhes" && (
              <div className="grid prototype-controle-vagas-form-section">
                <DropdownFieldSeplag
                  name="tipo"
                  control={control}
                  label="Tipo"
                  cols="12 12 3"
                  options={controleVagasTipoFormOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="codigo"
                  control={control}
                  label="Código"
                  cols="12 12 3"
                  placeholder="Ex.: C001"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="cargoFuncao"
                  control={control}
                  label="Cargo/Função"
                  cols="12 12 6"
                  options={controleVagasCargoFuncaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="controlaVaga"
                  control={control}
                  label="Controla Vaga"
                  cols="12 12 3"
                  options={controleVagasSimNaoFormOptions}
                  optionLabel="label"
                  optionValue="value"
                  required
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="tipoControle"
                  control={control}
                  label="Tipo de Controle"
                  cols="12 12 3"
                  options={controleVagasTipoControleFormOptions}
                  optionLabel="label"
                  optionValue="value"
                  required={!camposDependentesDesabilitados}
                  disabled={camposDependentesDesabilitados}
                  getFormErrorMessage={() => null}
                />
                <DateFieldSeplag
                  name="dataInicio"
                  control={control}
                  label="Data Início"
                  cols="12 12 3"
                  required={!camposDependentesDesabilitados}
                  disabled={camposDependentesDesabilitados}
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="permiteSaldoNegativo"
                  control={control}
                  label="Permite saldo negativo"
                  cols="12 12 3"
                  options={controleVagasSimNaoFormOptions}
                  optionLabel="label"
                  optionValue="value"
                  disabled={camposDependentesDesabilitados}
                  getFormErrorMessage={() => null}
                />
                <TextAreaFieldSeplag
                  name="justificativaSaldoNegativo"
                  control={control}
                  label="Justificativa para saldo negativo"
                  cols="12"
                  rows={3}
                  disabled={camposDependentesDesabilitados}
                  placeholder="Informe a justificativa quando a regra permitir saldo negativo."
                  getFormErrorMessage={() => null}
                />
                <TextAreaFieldSeplag
                  name="observacao"
                  control={control}
                  label="Observação"
                  cols="12"
                  rows={3}
                  placeholder="Uso administrativo."
                  getFormErrorMessage={() => null}
                />
                {camposDependentesDesabilitados && (
                  <div className="col-12">
                    <div className="prototype-controle-vagas-rule-alert">
                      Ao marcar <strong>Controla Vaga = Não</strong>, os campos de controle, vigência e critérios ficam desabilitados.
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "criterios" && (
              <div
                className={`prototype-controle-vagas-criterios${
                  camposDependentesDesabilitados ? " is-disabled" : ""
                }`}
              >
                <div className="prototype-controle-vagas-section-title">
                  <h3>Critérios de Compatibilidade</h3>
                  <p>
                    Defina quais dados do vínculo funcional serão comparados antes
                    de ocupar ou reservar uma vaga.
                  </p>
                </div>
                <div className="prototype-controle-vagas-criterios-list">
                  {criterioRows.map((criterio) => (
                    <div
                      className="prototype-controle-vagas-criterio-item"
                      key={criterio.name}
                    >
                      <CheckboxFieldSeplag
                        name={criterio.name}
                        control={control}
                        checkboxLabel={criterio.titulo}
                        cols="12"
                        disabled={
                          camposDependentesDesabilitados || criterio.bloqueado
                        }
                      />
                      <span>{criterio.descricao}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "historico" && (
              <div className="prototype-controle-vagas-historico">
                <div className="prototype-controle-vagas-section-title">
                  <h3>Histórico da Configuração</h3>
                  <p>
                    Registro somente leitura das principais alterações simuladas
                    nesta configuração.
                  </p>
                </div>
                <div className="prototype-table-wrapper">
                  <table className="prototype-simple-table">
                    <thead>
                      <tr>
                        <th>Data/Hora</th>
                        <th>Evento</th>
                        <th>Usuário</th>
                        <th>Detalhe</th>
                      </tr>
                    </thead>
                    <tbody>
                      {controleVagasHistoricoMock.map((item) => (
                        <tr key={item.id}>
                          <td>{item.dataHora}</td>
                          <td>{item.evento}</td>
                          <td>{item.usuario}</td>
                          <td>{item.detalhe}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="prototype-form-actions">
              <BotaoVoltarSeplag
                type="button"
                label="Voltar"
                icon="pi pi-arrow-left"
                onClick={() =>
                  navigate("/prototipos/sigep/controle-vagas/configuracao")
                }
              />
              <BotaoSalvarSeplag type="button" label="Salvar" />
            </div>
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposCategoriaPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
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
  const categoriasFiltradas = categoriasTesteMock.filter((categoria) => {
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
  const categoriaColumns: ColumnMetaSeplag<CategoriaTesteRow>[] = [
    { field: "sigla", header: "Sigla/Código" },
    { field: "descricao", header: "Categoria" },
    {
      header: "Subcategorias",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.subcategorias}
        </button>
      ),
    },
    {
      header: "Instituições",
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
          <div className="prototype-category-filters prototype-categoria-filters grid">
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

          <div className="prototype-category-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={categoriaResults}
              rows={10}
              paginator={false}
              lazy={false}
              selectionMode={null}
              columns={categoriaColumns}
              hasEventoAcao
              handleAdicionar={() => navigate(`${routePrefix}/categoria/novo`)}
              handleView={() => {}}
              handleEdit={(row) =>
                navigate(`${routePrefix}/categoria/${row.id}/editar`)
              }
              handleDelete={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposCargoPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
  const navigate = useNavigate();
  const { control, reset, watch } = useForm<CargoFiltroForm>({
    defaultValues: {
      cargo: "",
      categoria: undefined,
      situacao: undefined,
    },
  });
  const filtros = watch();
  const cargoBusca = filtros.cargo?.trim().toLowerCase();
  const cargosFiltrados = cargosTesteMock.filter((cargo) => {
    const atendeCargo =
      !cargoBusca ||
      cargo.codigo.toLowerCase().includes(cargoBusca) ||
      cargo.cargo.toLowerCase().includes(cargoBusca);
    const atendeCategoria =
      !filtros.categoria || cargo.categoria === filtros.categoria;
    const atendeSituacao =
      !filtros.situacao || cargo.situacao === filtros.situacao;

    return atendeCargo && atendeCategoria && atendeSituacao;
  });
  const cargoResults = {
    ...createResults(cargosFiltrados),
    totalPages: Math.max(1, Math.ceil(cargosFiltrados.length / 10)),
    sizePage: 10,
    size: 10,
  };
  const cargoColumns: ColumnMetaSeplag<CargoTesteRow>[] = [
    { field: "codigo", header: "Código/Sigla" },
    { field: "cargo", header: "Cargo" },
    { field: "categoria", header: "Categoria" },
    { field: "subcategoria", header: "Subcategoria" },
    { field: "jornadaPadrao", header: "Jornada Padrão" },
    {
      header: "Base Legal",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.baseLegal} Base(s)
        </button>
      ),
    },
    { field: "vigencia", header: "Vigência" },
    {
      header: "Instituições",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.instituicoes} Instituição(ões)
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
        <CardSeplag title="Cargos" cols="12">
          <div className="prototype-category-filters prototype-cargo-filters grid">
            <TextFieldSeplag
              name="cargo"
              control={control}
              label="Cargo"
              placeholder="Nome do Cargo"
              cols="12 12 4"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="categoria"
              control={control}
              label="Categoria"
              placeholder="Selecione a Categoria"
              cols="12 12 4"
              options={cargoCategoriaOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              placeholder="Selecione a Situação"
              cols="12 12 2"
              options={situacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    cargo: "",
                    categoria: undefined,
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-cargo-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={cargoResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={cargoColumns}
              hasEventoAcao
              handleAdicionar={() => navigate(`${routePrefix}/cargo/novo`)}
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

export function PrototiposCargoFormPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
  const navigate = useNavigate();
  const { control, setValue } = useForm<CargoForm>({
    defaultValues: {
      codigo: "",
      baseLegal: [],
      categoria: "",
      subcategoria: "",
      instituicao: [],
      nomeCargo: "",
      descricao: "",
      tipoCargo: "",
      naturezaCargo: "",
      formaProvimento: "",
      regimeJuridico: "",
      jornadaTrabalho: "",
      escolaridadeMinima: "",
      cbo: "",
      especialidade: "",
      naturezaVinculo: "",
      cargoChefia: "N",
      permiteSubstituicao: "N",
      exibirPortal: "N",
      observacao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "",
      dataEncerramento: "",
      dataExtincao: "",
      motivoEncerramento: "",
      motivoExtincao: "",
    },
  });

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title="Cadastrar - Cargo"
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-cargo-form">
              <section className="prototype-cargo-form-section">
                <h3>Identificação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <TextFieldSeplag
                    name="codigo"
                    control={control}
                    label="Código/Sigla"
                    cols="12 12 3"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextFieldSeplag
                    name="nomeCargo"
                    control={control}
                    label="Nome do Cargo"
                    cols="12 12 9"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextFieldSeplag
                    name="descricao"
                    control={control}
                    label="Descrição"
                    cols="12"
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Classificação Funcional</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="categoria"
                    control={control}
                    label="Categoria"
                    placeholder="Selecione..."
                    cols="12 12 6"
                    options={cargoTesteCategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="subcategoria"
                    control={control}
                    label="Subcategoria"
                    placeholder="Selecione..."
                    cols="12 12 6"
                    options={cargoSubcategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="tipoCargo"
                    control={control}
                    label="Tipo de Cargo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoTipoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="naturezaCargo"
                    control={control}
                    label="Natureza do Cargo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoNaturezaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Características do Cargo</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="jornadaTrabalho"
                    control={control}
                    label="Jornada padrão do cargo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoJornadaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="escolaridadeMinima"
                    control={control}
                    label="Escolaridade Mínima"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoEscolaridadeOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="cbo"
                    control={control}
                    label="CBO"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoCboOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="especialidade"
                    control={control}
                    label="Especialidade"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoEspecialidadeOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <SwitchFieldSeplag
                    name="cargoChefia"
                    control={control}
                    label="Cargo de Chefia"
                    cols="12 12 4"
                    getFormErrorMessage={() => null}
                  />
                  <SwitchFieldSeplag
                    name="permiteSubstituicao"
                    control={control}
                    label="Permite Substituição"
                    cols="12 12 4"
                    getFormErrorMessage={() => null}
                  />
                  <SwitchFieldSeplag
                    name="exibirPortal"
                    control={control}
                    label="Exibir no Portal?"
                    cols="12 12 4"
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
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Base Legal</h3>
                <div className="grid prototype-cargo-form-fields">
                  <MultiSelectFieldSeplag
                    name="baseLegal"
                    control={control}
                    label="Base Legal"
                    placeholder="Selecione as Bases Legais"
                    cols="12"
                    options={cargoBaseLegalOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Vigência</h3>
                <div className="prototype-cargo-vigencia-fields">
                  <SituacaoVigenciaSeplag<CargoForm>
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Início de Vigência"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-4 lg:col-4 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Regras de Uso</h3>
                <div className="prototype-table-wrapper">
                  <table className="prototype-simple-table">
                    <thead>
                      <tr>
                        <th>Instituição</th>
                        <th>Órgão</th>
                        <th>Regime</th>
                        <th>Tipo de Vínculo</th>
                        <th>Forma Provimento</th>
                        <th>Jornada</th>
                        <th>Situação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cargoRegrasUsoTesteMock.map((regra) => (
                        <tr key={regra.id}>
                          <td>{regra.instituicao}</td>
                          <td>{regra.orgao}</td>
                          <td>{regra.regime}</td>
                          <td>{regra.tipoVinculo}</td>
                          <td>{regra.formaProvimento}</td>
                          <td>{regra.jornada}</td>
                          <td>{regra.situacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate(`${routePrefix}/cargo`)}
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

export function PrototiposCategoriaFormPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
  const navigate = useNavigate();
  const { id } = useParams();
  const categoria = categoriasTesteMock.find((item) => String(item.id) === id);
  const isEditing = Boolean(id);
  const [activeTab, setActiveTab] = useState("dados-gerais");
  const [isAddingSubcategory, setIsAddingSubcategory] = useState(false);
  const [documentosCategoria, setDocumentosCategoria] = useState<string[]>([
    "lei-12345-2023",
    "decreto-456-2024",
  ]);
  const [documentosSubcategoria, setDocumentosSubcategoria] = useState<
    string[]
  >([]);
  const [instituicoesDisponiveis, setInstituicoesDisponiveis] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value !== "govmt"),
  );
  const [instituicoesSelecionadas, setInstituicoesSelecionadas] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value === "govmt"),
  );
  const { control, setValue } = useForm<CategoriaForm>({
    defaultValues: {
      sigla: categoria?.sigla ?? "",
      descricao: categoria?.descricao ?? "",
      observacao: isEditing ? "a" : "",
      subcategoriaSigla: "",
      subcategoriaNome: "",
      subcategoriaDescricao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "08/05/2026",
    },
  });
  const categoriaResumo = {
    sigla: categoria?.sigla || "EDU",
    descricao: categoria?.descricao || "Profissionais da Educação",
  };
  const subcategoriaColumns: ColumnMetaSeplag<SubcategoriaTesteRow>[] = [
    { field: "sigla", header: "Sigla" },
    { field: "nome", header: "Nome" },
    { field: "descricao", header: "Descrição" },
    { field: "cargos", header: "Cargos" },
    {
      header: "Regras de Uso",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.regrasUso}
        </button>
      ),
    },
    { field: "vigencia", header: "Vigência" },
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
        <CardSeplag
          title={`${isEditing ? "Alterar" : "Cadastrar"} - Categoria e Subcategoria`}
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
                  label="Sigla/Código"
                  cols="12 12 3"
                  required
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="descricao"
                  control={control}
                  label="Nome da Categoria"
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
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
                <div className="col-12 prototype-category-structure">
                  <PickListSeplag<(typeof regimeTesteInstituicaoOptions)[number]>
                    title="Instituições"
                    titleNaoSelecionados="Instituições disponíveis"
                    titleSelecionados="Instituições selecionadas"
                    dataKey="value"
                    dataLabel="label"
                    filterBy="label"
                    filterPlaceholder="Procurar por instituição"
                    naoSelecionados={instituicoesDisponiveis}
                    selecionados={instituicoesSelecionadas}
                    setNaoSelecionados={setInstituicoesDisponiveis}
                    setSelecionados={setInstituicoesSelecionadas}
                  />
                </div>
              </div>
            ) : (
              <div className="prototype-category-subcategory">
                <div className="prototype-category-summary">
                  <strong>Categoria</strong>
                  <p>
                    <span>Sigla/Código:</span> {categoriaResumo.sigla}
                  </p>
                  <p>
                    <span>Nome da Categoria:</span>{" "}
                    {categoriaResumo.descricao}
                  </p>
                </div>

                {isAddingSubcategory ? (
                  <div className="grid prototype-subcategory-form-fields">
                    <TextFieldSeplag
                      name="subcategoriaSigla"
                      control={control}
                      label="Sigla/Código"
                      placeholder="Sigla da subcategoria"
                      cols="12 12 3"
                      required
                      getFormErrorMessage={() => null}
                    />
                    <TextFieldSeplag
                      name="subcategoriaNome"
                      control={control}
                      label="Nome da Subcategoria"
                      placeholder="Nome da subcategoria"
                      cols="12 12 9"
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
                    <div className="col-12 prototype-category-documents">
                      <DocumentosLegaisAssociadosSeplag
                        label="Base Legal da Subcategoria"
                        options={documentosLegaisMock}
                        value={documentosSubcategoria}
                        onChange={setDocumentosSubcategoria}
                        onNovoCadastro={() => {}}
                        onVisualizar={() => {}}
                      />
                    </div>
                    <div className="col-12 prototype-category-vigencia">
                      <h6>Vigência da Subcategoria</h6>
                      <SituacaoVigenciaSeplag
                        control={control}
                        setValue={setValue}
                        rotuloDataAtivacao="Data de Início"
                        cols={{
                          situacao: "12 12 3",
                          dataAtivacao: "12 12 3",
                          statusOperacional:
                            "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                          dataEncerramento: "12 12 3",
                          motivoEncerramento: "12",
                          dataExtincao: "12 12 3",
                          motivoExtincao: "12",
                        }}
                        getFormErrorMessage={() => null}
                      />
                    </div>
                  </div>
                ) : (
                  <TablePaginadoSeplag
                    dataKey="id"
                    data={createResults<SubcategoriaTesteRow>(subcategoriasTesteMock)}
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
                    onClick={() => navigate(`${routePrefix}/categoria`)}
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

export function PrototiposSigepRegimeJuridicoPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
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
      body: (row) => (
        <span className="prototype-regime-status-badge">
          {renderGrupoCalculoStatusBadge(row.situacao)}
        </span>
      ),
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
                navigate(`${routePrefix}/regime-juridico/novo`)
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

export function PrototiposSigepRegimeJuridicoNovoPage({
  routePrefix = SIGEP_BASE_PATH,
}: CargoConcursoRouteProps = {}) {
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
                    situacao: "12 12 3",
                    dataAtivacao: "12 12 3",
                    statusOperacional:
                      "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                    dataEncerramento: "12 12 3",
                    motivoEncerramento: "12",
                    dataExtincao: "12 12 3",
                    motivoExtincao: "12",
                  }}
                  getFormErrorMessage={() => null}
                />
              </div>
            </div>

            <div className="prototype-category-form-footer">
              <BotaoVoltarSeplag
                type="button"
                onClick={() => navigate(`${routePrefix}/regime-juridico`)}
              />
              <BotaoSalvarSeplag type="submit" />
            </div>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

export function PrototiposCategoriaTestePage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
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
        <CardSeplag title="Categoria e Subcategoria" cols="12">
          <div className="prototype-category-filters prototype-categoria-filters grid">
            <TextFieldSeplag
              name="categoria"
              control={control}
              label="Categoria (Sigla/Código, Nome)"
              cols="12 6 3"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              cols="12 6 3"
              options={regimeTesteInstituicaoOptions}
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

          <div className="prototype-category-table prototype-category-teste-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={categoriaResults}
              rows={10}
              paginator={false}
              lazy={false}
              selectionMode={null}
              columns={categoriaColumns}
              hasEventoAcao
              handleAdicionar={() => navigate(`${routePrefix}/categoria/novo`)}
              handleView={() => {}}
              handleEdit={(row) =>
                navigate(`${routePrefix}/categoria/${row.id}/editar`)
              }
              handleDelete={() => {}}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposCategoriaTesteFormPage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
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
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
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
                    onClick={() => navigate(`${routePrefix}/categoria`)}
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

export function PrototiposCargoTestePage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, reset, watch } = useForm<CargoFiltroForm>({
    defaultValues: {
      cargo: "",
      categoria: undefined,
      situacao: undefined,
    },
  });
  const filtros = watch();
  const cargoBusca = filtros.cargo?.trim().toLowerCase();
  const cargosFiltrados = cargosMock.filter((cargo) => {
    const atendeCargo =
      !cargoBusca || cargo.cargo.toLowerCase().includes(cargoBusca);
    const atendeCategoria =
      !filtros.categoria || cargo.categoria === filtros.categoria;
    const atendeSituacao =
      !filtros.situacao || cargo.situacao === filtros.situacao;

    return atendeCargo && atendeCategoria && atendeSituacao;
  });
  const cargoResults = {
    ...createResults(cargosFiltrados),
    totalPages: Math.max(1, Math.ceil(cargosFiltrados.length / 10)),
    sizePage: 10,
    size: 10,
  };
  const cargoColumns: ColumnMetaSeplag<CargoRow>[] = [
    { field: "cargo", header: "Cargo" },
    { field: "categoria", header: "Categoria" },
    {
      header: "Base Legal",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.baseLegal} Base(s)
        </button>
      ),
    },
    {
      header: "Regras de Uso",
      body: (row) => (
        <button
          type="button"
          className="prototype-link-button"
          onClick={() => {}}
        >
          {row.regrasUso}
        </button>
      ),
    },
    { field: "vigencia", header: "Vigência" },
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
        <CardSeplag title="Cargos" cols="12">
          <div className="prototype-category-filters prototype-cargo-filters grid">
            <TextFieldSeplag
              name="cargo"
              control={control}
              label="Cargo"
              placeholder="Código/Sigla ou Nome do Cargo"
              cols="12 12 4"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="categoria"
              control={control}
              label="Categoria"
              placeholder="Selecione a Categoria"
              cols="12 12 4"
              options={cargoTesteCategoriaOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              placeholder="Selecione a Situação"
              cols="12 12 2"
              options={situacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    cargo: "",
                    categoria: undefined,
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-cargo-table prototype-cargo-teste-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={cargoResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={cargoColumns}
              hasEventoAcao
              handleAdicionar={() => navigate(`${routePrefix}/cargo/novo`)}
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

export function PrototiposCargoTesteFormPage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, setValue } = useForm<CargoForm>({
    defaultValues: {
      baseLegal: [],
      categoria: "",
      subcategoria: "",
      instituicao: [],
      nomeCargo: "",
      descricao: "",
      tipoCargo: "",
      naturezaCargo: "",
      formaProvimento: "",
      regimeJuridico: "",
      jornadaTrabalho: "",
      escolaridadeMinima: "",
      cbo: "",
      especialidade: "",
      naturezaVinculo: "",
      cargoChefia: "N",
      permiteSubstituicao: "N",
      exibirPortal: "N",
      observacao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "",
      dataEncerramento: "",
      dataExtincao: "",
      motivoEncerramento: "",
      motivoExtincao: "",
    },
  });

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title="Cadastrar - Cargo"
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-cargo-form">
              <section className="prototype-cargo-form-section">
                <h3>Estrutura do Cargo</h3>
                <div className="grid prototype-cargo-form-fields">
                  <MultiSelectFieldSeplag
                    name="baseLegal"
                    control={control}
                    label="Base Legal"
                    placeholder="Selecione as Bases Legais"
                    cols="12"
                    options={cargoBaseLegalOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="categoria"
                    control={control}
                    label="Categoria"
                    placeholder="Selecione..."
                    cols="12 12 6"
                    options={cargoCategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="subcategoria"
                    control={control}
                    label="Subcategoria"
                    placeholder="Selecione..."
                    cols="12 12 6"
                    options={cargoSubcategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <MultiSelectFieldSeplag
                    name="instituicao"
                    control={control}
                    label="Instituição"
                    placeholder="Selecione as Instituições"
                    cols="12"
                    options={cargoInstituicaoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextFieldSeplag
                    name="nomeCargo"
                    control={control}
                    label="Nome do Cargo"
                    cols="12 12 3"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextFieldSeplag
                    name="descricao"
                    control={control}
                    label="Descrição"
                    cols="12 12 9"
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Classificação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="tipoCargo"
                    control={control}
                    label="Tipo de Cargo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoTipoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="naturezaCargo"
                    control={control}
                    label="Natureza do Cargo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoNaturezaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="formaProvimento"
                    control={control}
                    label="Forma Provimento"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoFormaProvimentoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="regimeJuridico"
                    control={control}
                    label="Regime Jurídico"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={grupoCalculoRegimeJuridicoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="jornadaTrabalho"
                    control={control}
                    label="Jornada de Trabalho"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoJornadaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="escolaridadeMinima"
                    control={control}
                    label="Escolaridade Mínima"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoEscolaridadeOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="cbo"
                    control={control}
                    label="CBO"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoCboOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="especialidade"
                    control={control}
                    label="Especialidade"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoEspecialidadeOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="naturezaVinculo"
                    control={control}
                    label="Natureza do Vínculo"
                    placeholder="Selecione..."
                    cols="12 12 3"
                    options={cargoNaturezaVinculoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Regras Funcionais</h3>
                <div className="grid prototype-cargo-form-fields prototype-cargo-switch-row">
                  <SwitchFieldSeplag
                    name="cargoChefia"
                    control={control}
                    label="Cargo de Chefia"
                    cols="12 12 4"
                    getFormErrorMessage={() => null}
                  />
                  <SwitchFieldSeplag
                    name="permiteSubstituicao"
                    control={control}
                    label="Permite Substituição"
                    cols="12 12 4"
                    getFormErrorMessage={() => null}
                  />
                  <SwitchFieldSeplag
                    name="exibirPortal"
                    control={control}
                    label="Exibir no Portal?"
                    cols="12 12 4"
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
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Vigência</h3>
                <div className="prototype-cargo-vigencia-fields">
                  <SituacaoVigenciaSeplag<CargoForm>
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Início de Vigência"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-4 lg:col-4 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate(`${routePrefix}/cargo`)}
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

export function PrototiposSigepRegimeJuridicoTestePage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, reset, watch } = useForm<RegimeJuridicoFiltroForm>({
    defaultValues: {
      nome: "",
      instituicao: undefined,
      situacao: undefined,
    },
  });
  const filtros = watch();
  const regimeBusca = filtros.nome?.trim().toLowerCase();
  const regimesFiltrados = regimesJuridicosTesteMock.filter((regime) => {
    const atendeNome =
      !regimeBusca ||
      regime.codigo.toLowerCase().includes(regimeBusca) ||
      regime.nome.toLowerCase().includes(regimeBusca) ||
      regime.descricao.toLowerCase().includes(regimeBusca);
    const atendeInstituicao =
      !filtros.instituicao || regime.instituicao === filtros.instituicao;
    const atendeSituacao =
      !filtros.situacao || regime.situacao === filtros.situacao;

    return atendeNome && atendeInstituicao && atendeSituacao;
  });
  const regimeResults = {
    ...createResults(regimesFiltrados),
    totalPages: Math.max(1, Math.ceil(regimesFiltrados.length / 10)),
    totalRecords: regimesFiltrados.length,
    size: 10,
    sizePage: 10,
  };
  const regimeColumns: ColumnMetaSeplag<RegimeJuridicoTesteRow>[] = [
    { field: "codigo", header: "Código/Sigla" },
    { field: "nome", header: "Nome" },
    { field: "descricao", header: "Descrição" },
    {
      header: "Instituições",
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
    { field: "vigencia", header: "Vigência" },
    {
      header: "Situação",
      body: (row) => (
        <span className="prototype-regime-status-badge">
          {renderGrupoCalculoStatusBadge(row.situacao)}
        </span>
      ),
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
              label="Nome ou Código/Sigla"
              cols="12 6 4"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              cols="12 6 3"
              options={regimeTesteInstituicaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6 3"
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
                navigate(`${routePrefix}/regime-juridico/novo`)
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

export function PrototiposSigepRegimeJuridicoTesteNovoPage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const [baseLegalSelecionada, setBaseLegalSelecionada] = useState<string[]>(
    [],
  );
  const [instituicoesDisponiveis, setInstituicoesDisponiveis] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value !== "govmt"),
  );
  const [instituicoesSelecionadas, setInstituicoesSelecionadas] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value === "govmt"),
  );
  const { control, setValue } = useForm<RegimeJuridicoForm>({
    defaultValues: {
      nome: "",
      sigla: "",
      descricao: "",
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
            <div className="prototype-regime-teste-form">
              <section className="prototype-cargo-form-section">
                <h3>Dados Gerais</h3>
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
                    label="Sigla/Código"
                    cols="12 12 4"
                    required
                    maxLength={30}
                    getFormErrorMessage={() => null}
                  />
                  <TextAreaFieldSeplag
                    name="descricao"
                    control={control}
                    label="Descrição"
                    cols="12"
                    rows={4}
                    maxLength={500}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Base Legal</h3>
                <div className="prototype-regime-section">
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
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Instituições</h3>
                <PickListSeplag<(typeof regimeTesteInstituicaoOptions)[number]>
                  title=""
                  titleNaoSelecionados="Instituições disponíveis"
                  titleSelecionados="Instituições selecionadas"
                  dataKey="value"
                  dataLabel="label"
                  filterBy="label"
                  filterPlaceholder="Procurar por instituição"
                  naoSelecionados={instituicoesDisponiveis}
                  selecionados={instituicoesSelecionadas}
                  setNaoSelecionados={setInstituicoesDisponiveis}
                  setSelecionados={setInstituicoesSelecionadas}
                />
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Vigência</h3>
                <div className="prototype-cargo-vigencia-fields">
                  <SituacaoVigenciaSeplag
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Início de Vigência"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-12 lg:col-5 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>
            </div>

            <div className="prototype-category-form-footer">
              <BotaoVoltarSeplag
                type="button"
                onClick={() => navigate(`${routePrefix}/regime-juridico`)}
              />
              <BotaoSalvarSeplag type="submit" />
            </div>
          </CardSeplag>
        </div>
      </form>
    </PrototypeSystemPage>
  );
}

export function PrototiposTipoVinculoTestePage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, reset, watch } = useForm<TipoVinculoFiltroForm>({
    defaultValues: {
      termo: "",
      natureza: undefined,
      instituicao: undefined,
      situacao: undefined,
    },
  });
  const filtros = watch();
  const termoBusca = filtros.termo?.trim().toLowerCase();
  const tiposFiltrados = tiposVinculoTesteMock.filter((tipo) => {
    const atendeTermo =
      !termoBusca ||
      tipo.codigo.toLowerCase().includes(termoBusca) ||
      tipo.nome.toLowerCase().includes(termoBusca) ||
      tipo.descricao.toLowerCase().includes(termoBusca);
    const atendeNatureza =
      !filtros.natureza || tipo.natureza === filtros.natureza;
    const atendeInstituicao =
      !filtros.instituicao || tipo.instituicao === filtros.instituicao;
    const atendeSituacao =
      !filtros.situacao || tipo.situacao === filtros.situacao;

    return (
      atendeTermo && atendeNatureza && atendeInstituicao && atendeSituacao
    );
  });
  const tipoVinculoResults = {
    ...createResults(tiposFiltrados),
    totalPages: Math.max(1, Math.ceil(tiposFiltrados.length / 10)),
    totalRecords: tiposFiltrados.length,
    size: 10,
    sizePage: 10,
  };
  const tipoVinculoColumns: ColumnMetaSeplag<TipoVinculoTesteRow>[] = [
    { field: "codigo", header: "Sigla/Código" },
    { field: "nome", header: "Tipo de Vínculo" },
    { field: "natureza", header: "Natureza" },
    {
      header: "Instituições",
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
      header: "Comportamentos",
      body: (row) => row.comportamentos.join(", "),
    },
    { field: "vigencia", header: "Vigência" },
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
        <CardSeplag title="Tipo de Vínculo" cols="12">
          <div className="prototype-category-filters prototype-tipo-vinculo-filters grid">
            <TextFieldSeplag
              name="termo"
              control={control}
              label="Nome ou Código/Sigla"
              cols="12 12 3"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="natureza"
              control={control}
              label="Natureza do Vínculo"
              placeholder="Selecione..."
              cols="12 12 3"
              options={tipoVinculoNaturezaOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              placeholder="Selecione..."
              cols="12 12 2"
              options={regimeTesteInstituicaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              placeholder="Selecione..."
              cols="12 12 2"
              options={situacaoOptions}
              optionLabel="label"
              optionValue="value"
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
                    natureza: undefined,
                    instituicao: undefined,
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-tipo-vinculo-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={tipoVinculoResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={tipoVinculoColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate(`${routePrefix}/tipo-vinculo/novo`)
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

export function PrototiposTipoVinculoTesteFormPage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const [baseLegalSelecionada, setBaseLegalSelecionada] = useState<string[]>(
    [],
  );
  const [instituicoesDisponiveis, setInstituicoesDisponiveis] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value !== "govmt"),
  );
  const [instituicoesSelecionadas, setInstituicoesSelecionadas] = useState(
    regimeTesteInstituicaoOptions.filter((item) => item.value === "govmt"),
  );
  const { control, setValue } = useForm<TipoVinculoForm>({
    defaultValues: {
      codigo: "",
      nome: "",
      descricao: "",
      natureza: "",
      baseLegal: [],
      geraVinculoFuncional: "S",
      exigeCargo: "S",
      exigeVaga: "N",
      permiteControleVagas: "S",
      permiteFolha: "S",
      permiteAposentadoria: "N",
      permitePensionista: "N",
      permiteEventoCargo: "S",
      exigeDataFim: "N",
      observacao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "",
      dataEncerramento: "",
      dataExtincao: "",
      motivoEncerramento: "",
      motivoExtincao: "",
    },
  });
  const comportamentoRows: Array<{
    name: keyof TipoVinculoForm;
    titulo: string;
    descricao: string;
  }> = [
    {
      name: "geraVinculoFuncional",
      titulo: "Gera vínculo funcional?",
      descricao: "Indica se o tipo cria um vínculo funcional para a pessoa.",
    },
    {
      name: "exigeCargo",
      titulo: "Exige cargo?",
      descricao: "Torna obrigatória a seleção de cargo nos fluxos aplicáveis.",
    },
    {
      name: "exigeVaga",
      titulo: "Exige vaga?",
      descricao: "Permite exigir vaga quando o cargo controlar quadro.",
    },
    {
      name: "permiteControleVagas",
      titulo: "Permite controle de vagas?",
      descricao: "Habilita uso no módulo de Controle de Vagas.",
    },
    {
      name: "permiteFolha",
      titulo: "Permite folha?",
      descricao: "Indica se o vínculo pode gerar registros para pagamento.",
    },
    {
      name: "permiteAposentadoria",
      titulo: "Permite aposentadoria?",
      descricao: "Habilita fluxos previdenciários de aposentadoria/inatividade.",
    },
    {
      name: "permitePensionista",
      titulo: "Permite pensionista?",
      descricao: "Habilita fluxos específicos de pensionista.",
    },
    {
      name: "permiteEventoCargo",
      titulo: "Permite evento de cargo?",
      descricao: "Permite uso em provimento, alteração ou evento de cargo.",
    },
    {
      name: "exigeDataFim",
      titulo: "Exige data fim?",
      descricao: "Obrigatoriedade de data final prevista para o vínculo.",
    },
  ];

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title="Cadastrar - Tipo de Vínculo"
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-cargo-form">
              <section className="prototype-cargo-form-section">
                <h3>Dados Gerais</h3>
                <div className="grid prototype-cargo-form-fields">
                  <TextFieldSeplag
                    name="codigo"
                    control={control}
                    label="Sigla/Código"
                    cols="12 12 3"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextFieldSeplag
                    name="nome"
                    control={control}
                    label="Nome do Tipo de Vínculo"
                    cols="12 12 9"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <TextAreaFieldSeplag
                    name="descricao"
                    control={control}
                    label="Descrição"
                    cols="12"
                    rows={4}
                    maxLength={500}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Classificação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="natureza"
                    control={control}
                    label="Natureza do Vínculo"
                    placeholder="Selecione..."
                    cols="12 12 4"
                    options={tipoVinculoNaturezaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Instituições</h3>
                <PickListSeplag<(typeof regimeTesteInstituicaoOptions)[number]>
                  title=""
                  titleNaoSelecionados="Instituições disponíveis"
                  titleSelecionados="Instituições selecionadas"
                  dataKey="value"
                  dataLabel="label"
                  filterBy="label"
                  filterPlaceholder="Procurar por instituição"
                  naoSelecionados={instituicoesDisponiveis}
                  selecionados={instituicoesSelecionadas}
                  setNaoSelecionados={setInstituicoesDisponiveis}
                  setSelecionados={setInstituicoesSelecionadas}
                />
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Comportamentos do Vínculo</h3>
                <div className="prototype-controle-vagas-criterios-list prototype-tipo-vinculo-comportamentos">
                  {comportamentoRows.map((comportamento) => (
                    <div
                      className="prototype-controle-vagas-criterio-item"
                      key={comportamento.name}
                    >
                      <CheckboxFieldSeplag<TipoVinculoForm>
                        name={comportamento.name}
                        control={control}
                        checkboxLabel={comportamento.titulo}
                        cols="12"
                      />
                      <span>{comportamento.descricao}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Base Legal</h3>
                <div className="prototype-regime-section">
                  <DocumentosLegaisAssociadosSeplag
                    label="Base Legal"
                    options={documentosLegaisMock}
                    value={baseLegalSelecionada}
                    onChange={setBaseLegalSelecionada}
                    onNovoCadastro={() => {}}
                    onVisualizar={() => {}}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Vigência</h3>
                <div className="prototype-cargo-vigencia-fields">
                  <SituacaoVigenciaSeplag<TipoVinculoForm>
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Início de Vigência"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-4 lg:col-4 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Observação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <TextAreaFieldSeplag
                    name="observacao"
                    control={control}
                    label="Observação"
                    cols="12"
                    rows={4}
                    maxLength={500}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate(`${routePrefix}/tipo-vinculo`)}
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

export function PrototiposMatrizValidacaoTestePage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, reset, watch } = useForm<MatrizValidacaoFiltroForm>({
    defaultValues: {
      instituicao: undefined,
      orgao: undefined,
      regimeJuridico: undefined,
      tipoVinculo: undefined,
      categoria: undefined,
      cargo: "",
      situacao: undefined,
    },
  });
  const filtros = watch();
  const cargoBusca = filtros.cargo?.trim().toLowerCase();
  const regrasFiltradas = matrizValidacaoTesteMock.filter((regra) => {
    const atendeInstituicao =
      !filtros.instituicao || regra.instituicao === filtros.instituicao;
    const atendeOrgao = !filtros.orgao || regra.orgao === filtros.orgao;
    const atendeRegime =
      !filtros.regimeJuridico ||
      regra.regimeJuridico === filtros.regimeJuridico;
    const atendeTipoVinculo =
      !filtros.tipoVinculo || regra.tipoVinculo === filtros.tipoVinculo;
    const atendeCategoria =
      !filtros.categoria || regra.categoria === filtros.categoria;
    const atendeCargo =
      !cargoBusca ||
      regra.cargo.toLowerCase().includes(cargoBusca) ||
      regra.subcategoria.toLowerCase().includes(cargoBusca);
    const atendeSituacao =
      !filtros.situacao || regra.situacao === filtros.situacao;

    return (
      atendeInstituicao &&
      atendeOrgao &&
      atendeRegime &&
      atendeTipoVinculo &&
      atendeCategoria &&
      atendeCargo &&
      atendeSituacao
    );
  });
  const matrizResults = {
    ...createResults(regrasFiltradas),
    totalPages: Math.max(1, Math.ceil(regrasFiltradas.length / 10)),
    totalRecords: regrasFiltradas.length,
    size: 10,
    sizePage: 10,
  };
  const matrizColumns: ColumnMetaSeplag<MatrizValidacaoTesteRow>[] = [
    { field: "instituicao", header: "Instituição" },
    { field: "orgao", header: "Órgão" },
    { field: "regimeJuridico", header: "Regime Jurídico" },
    { field: "tipoVinculo", header: "Tipo de Vínculo" },
    { field: "categoria", header: "Categoria" },
    { field: "subcategoria", header: "Subcategoria" },
    { field: "cargo", header: "Cargo" },
    { field: "formaProvimento", header: "Provimento" },
    { field: "jornada", header: "Jornada" },
    {
      header: "Especificidade",
      body: (row) => (
        <BadgeSeplag
          label={row.especificidade}
          color={row.especificidade === "Genérica" ? "#52616b" : "#005494"}
          bg={row.especificidade === "Genérica" ? "#eef2f6" : "#e6f0f8"}
          border="transparent"
          size="md"
        />
      ),
    },
    { field: "vigencia", header: "Vigência" },
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
        <CardSeplag title="Matriz de Validação Funcional" cols="12">
          <div className="prototype-category-filters prototype-matriz-filters grid">
            <DropdownFieldSeplag
              name="instituicao"
              control={control}
              label="Instituição"
              cols="12 12 2"
              options={matrizInstituicaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="orgao"
              control={control}
              label="Órgão"
              cols="12 12 2"
              options={matrizOrgaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="regimeJuridico"
              control={control}
              label="Regime Jurídico"
              cols="12 12 2"
              options={matrizRegimeOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="tipoVinculo"
              control={control}
              label="Tipo de Vínculo"
              cols="12 12 2"
              options={matrizTipoVinculoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="categoria"
              control={control}
              label="Categoria"
              cols="12 12 2"
              options={matrizCategoriaOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <TextFieldSeplag
              name="cargo"
              control={control}
              label="Cargo/Subcategoria"
              cols="12 12 2"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 12 2"
              options={situacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-2">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    instituicao: undefined,
                    orgao: undefined,
                    regimeJuridico: undefined,
                    tipoVinculo: undefined,
                    categoria: undefined,
                    cargo: "",
                    situacao: undefined,
                  })
                }
              />
            </div>
          </div>

          <div className="prototype-matriz-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={matrizResults}
              rows={10}
              rowsPerPage={[10]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={matrizColumns}
              hasEventoAcao
              handleAdicionar={() =>
                navigate(`${routePrefix}/matriz-validacao/novo`)
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

export function PrototiposMatrizValidacaoTesteFormPage() {
  const navigate = useNavigate();
  const routePrefix = SIGEP_CARGO_CONCURSO_TESTE_BASE_PATH;
  const { control, setValue, watch } = useForm<MatrizValidacaoForm>({
    defaultValues: {
      instituicao: "GOVMT",
      orgao: "Todos",
      setor: "Todos",
      regimeJuridico: "",
      tipoVinculo: "",
      categoria: "",
      subcategoria: "Todos",
      cargo: "Todos",
      formaProvimento: "",
      jornada: "",
      controlaVaga: "Sim",
      tipoControleVaga: "Quantitativa",
      aplicaIngresso: "S",
      aplicaEventoCargo: "S",
      aplicaConcurso: "S",
      aplicaControleVagas: "S",
      observacao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "",
      dataEncerramento: "",
      dataExtincao: "",
      motivoEncerramento: "",
      motivoExtincao: "",
    },
  });
  const valores = watch();
  const aplicacoes = [
    valores.aplicaIngresso === "S" ? "Ingresso" : null,
    valores.aplicaEventoCargo === "S" ? "Evento de Cargo/Provimento" : null,
    valores.aplicaConcurso === "S" ? "Concurso" : null,
    valores.aplicaControleVagas === "S" ? "Controle de Vagas" : null,
  ].filter(Boolean);
  const especificidade =
    valores.cargo && valores.cargo !== "Todos"
      ? "Regra específica por cargo"
      : valores.orgao && valores.orgao !== "Todos"
        ? "Regra específica por órgão"
        : "Regra genérica";
  const resumo = [
    valores.instituicao,
    valores.orgao,
    valores.setor,
    valores.regimeJuridico,
    valores.tipoVinculo,
    valores.categoria,
    valores.subcategoria,
    valores.cargo,
  ].filter(Boolean);

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title="Cadastrar - Matriz de Validação Funcional"
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="prototype-cargo-form">
              <section className="prototype-cargo-form-section">
                <h3>Contexto Organizacional</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="instituicao"
                    control={control}
                    label="Instituição"
                    cols="12 12 4"
                    options={matrizInstituicaoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="orgao"
                    control={control}
                    label="Órgão"
                    cols="12 12 4"
                    options={matrizOrgaoOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="setor"
                    control={control}
                    label="Setor"
                    cols="12 12 4"
                    options={matrizSetorOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Composição Funcional</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="regimeJuridico"
                    control={control}
                    label="Regime Jurídico"
                    cols="12 12 6"
                    options={matrizRegimeOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="tipoVinculo"
                    control={control}
                    label="Tipo de Vínculo"
                    cols="12 12 6"
                    options={matrizTipoVinculoOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="categoria"
                    control={control}
                    label="Categoria"
                    cols="12 12 4"
                    options={matrizCategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    required
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="subcategoria"
                    control={control}
                    label="Subcategoria"
                    cols="12 12 4"
                    options={matrizSubcategoriaOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="cargo"
                    control={control}
                    label="Cargo"
                    cols="12 12 4"
                    options={matrizCargoOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Parâmetros de Ocupação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <DropdownFieldSeplag
                    name="formaProvimento"
                    control={control}
                    label="Forma de Provimento"
                    cols="12 12 3"
                    options={cargoFormaProvimentoOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="jornada"
                    control={control}
                    label="Jornada de Trabalho"
                    cols="12 12 3"
                    options={cargoJornadaOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="controlaVaga"
                    control={control}
                    label="Controla Vaga?"
                    cols="12 12 3"
                    options={matrizControlaVagaOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                  <DropdownFieldSeplag
                    name="tipoControleVaga"
                    control={control}
                    label="Tipo de Controle de Vaga"
                    cols="12 12 3"
                    options={matrizTipoControleVagaOptions}
                    optionLabel="label"
                    optionValue="value"
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Aplicação da Regra</h3>
                <div className="prototype-controle-vagas-criterios-list prototype-matriz-aplicacoes">
                  <div className="prototype-controle-vagas-criterio-item">
                    <CheckboxFieldSeplag<MatrizValidacaoForm>
                      name="aplicaIngresso"
                      control={control}
                      checkboxLabel="Ingresso"
                      cols="12"
                    />
                    <span>Permite usar a combinação no ingresso.</span>
                  </div>
                  <div className="prototype-controle-vagas-criterio-item">
                    <CheckboxFieldSeplag<MatrizValidacaoForm>
                      name="aplicaEventoCargo"
                      control={control}
                      checkboxLabel="Evento de Cargo / Provimento"
                      cols="12"
                    />
                    <span>Permite usar em eventos de cargo e provimento.</span>
                  </div>
                  <div className="prototype-controle-vagas-criterio-item">
                    <CheckboxFieldSeplag<MatrizValidacaoForm>
                      name="aplicaConcurso"
                      control={control}
                      checkboxLabel="Concurso"
                      cols="12"
                    />
                    <span>Permite ofertar a combinação em concurso.</span>
                  </div>
                  <div className="prototype-controle-vagas-criterio-item">
                    <CheckboxFieldSeplag<MatrizValidacaoForm>
                      name="aplicaControleVagas"
                      control={control}
                      checkboxLabel="Controle de Vagas"
                      cols="12"
                    />
                    <span>Permite criar quadro ou vaga para a combinação.</span>
                  </div>
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Resumo e Validações</h3>
                <div className="prototype-matriz-summary">
                  <div>
                    <strong>{especificidade}</strong>
                    <p>{resumo.length ? resumo.join(" + ") : "Preencha os campos para visualizar a combinação."}</p>
                  </div>
                  <div>
                    <strong>Aplicação</strong>
                    <p>
                      {aplicacoes.length
                        ? aplicacoes.join(", ")
                        : "Nenhuma funcionalidade selecionada."}
                    </p>
                  </div>
                  <div className="prototype-matriz-warning">
                    <i className="pi pi-exclamation-triangle" aria-hidden="true" />
                    <span>
                      Validação visual: verificar sobreposição de vigência para a
                      mesma combinação antes de salvar.
                    </span>
                  </div>
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Vigência</h3>
                <div className="prototype-cargo-vigencia-fields">
                  <SituacaoVigenciaSeplag<MatrizValidacaoForm>
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Início de Vigência"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional:
                        "col-12 md:col-4 lg:col-4 prototype-status-operacional-col",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <section className="prototype-cargo-form-section">
                <h3>Observação</h3>
                <div className="grid prototype-cargo-form-fields">
                  <TextAreaFieldSeplag
                    name="observacao"
                    control={control}
                    label="Observação"
                    cols="12"
                    rows={4}
                    maxLength={500}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </section>

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate(`${routePrefix}/matriz-validacao`)}
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

export function PrototiposFolhaPage() {
  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    />
  );
}

export function PrototiposFolhaPagamentoPage() {
  const [folhas, setFolhas] = useState<FolhaPagamentoRow[]>(() =>
    folhaPagamentoService.listarFolhas(),
  );
  const [execucoes, setExecucoes] = useState<FolhaPagamentoExecucaoRow[]>(
    () => folhaPagamentoService.listarExecucoes(),
  );
  const [pessoaLogs] = useState<FolhaPagamentoPessoaLogRow[]>(() =>
    folhaPagamentoService.listarPessoaLogs(),
  );
  const [rubricaLogs] = useState<FolhaPagamentoRubricaLogRow[]>(
    () => folhaPagamentoService.listarRubricaLogs(),
  );
  const [folhaSelecionada, setFolhaSelecionada] =
    useState<FolhaPagamentoRow | null>(null);
  const [modalFormularioAberto, setModalFormularioAberto] = useState(false);
  const [modalDetalheAberto, setModalDetalheAberto] = useState(false);
  const [modalExecucoesAberto, setModalExecucoesAberto] = useState(false);
  const [modalLogAberto, setModalLogAberto] = useState(false);
  const [modalPessoaLogAberto, setModalPessoaLogAberto] = useState(false);
  const [execucaoSelecionada, setExecucaoSelecionada] =
    useState<FolhaPagamentoExecucaoRow | null>(null);
  const [pessoaLogSelecionada, setPessoaLogSelecionada] =
    useState<FolhaPagamentoPessoaLogRow | null>(null);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [activeTab, setActiveTab] = useState("dados");
  const [feedback, setFeedback] = useState("");
  const [formFeedback, setFormFeedback] = useState("");
  const { control, reset, watch } = useForm<FolhaPagamentoFiltroForm>({
    defaultValues: {
      termo: "",
      orgaos: [],
      mesAnoReferencia: "",
      situacao: "",
    },
  });
  const {
    control: formControl,
    reset: resetForm,
    handleSubmit,
    formState: { errors },
  } = useForm<FolhaPagamentoForm>({
    defaultValues: {
      nome: "",
      numero: "",
      mesAnoReferencia: "",
      competencia: "",
      observacao: "",
      orgaos: [],
      regimeJuridico: "",
      categoria: "",
      cargo: "",
      grupoEleitos: "",
      totalMesesAdiantar: 0,
      totalMesesRetroagir: 0,
    },
  });
  const {
    control: logControl,
    reset: resetLog,
    watch: watchLog,
  } = useForm<FolhaPagamentoPessoaLogFiltroForm>({
    defaultValues: {
      matricula: "",
      nome: "",
      cpf: "",
      orgao: "",
      situacao: "",
      rubrica: "",
      mensagem: "",
    },
  });

  const filtros = watch();
  const normalizeMesAno = (value?: string) => {
    const cleanValue = value?.trim() ?? "";
    const matchMesAno = cleanValue.match(/^(\d{2})\/(\d{4})$/);
    if (matchMesAno) return `${matchMesAno[2]}-${matchMesAno[1]}`;
    return cleanValue;
  };

  const isMesAnoValido = (value?: string) => {
    const cleanValue = value?.trim() ?? "";
    return /^(\d{4}-\d{2}|\d{2}\/\d{4})$/.test(cleanValue);
  };

  const termoBuscaDigitado = filtros.termo?.trim().toLowerCase() ?? "";
  const termoBusca =
    termoBuscaDigitado.length >= 3 ? termoBuscaDigitado : "";
  const mesAnoReferenciaFiltro = normalizeMesAno(filtros.mesAnoReferencia);
  const folhasFiltradas = folhas.filter((folha) => {
    const atendeTermo =
      !termoBusca ||
      folha.numero.toLowerCase().includes(termoBusca) ||
      folha.nome.toLowerCase().includes(termoBusca);
    const atendeOrgao =
      !filtros.orgaos?.length ||
      filtros.orgaos.some((orgao) => folha.orgaos.includes(orgao));
    const atendeMes =
      !mesAnoReferenciaFiltro ||
      folha.mesAnoReferencia === mesAnoReferenciaFiltro;
    const atendeSituacao =
      !filtros.situacao || folha.situacao === filtros.situacao;

    return atendeTermo && atendeOrgao && atendeMes && atendeSituacao;
  });

  const folhaResults = {
    ...createResults(folhasFiltradas),
    totalPages: Math.max(1, Math.ceil(folhasFiltradas.length / 10)),
    totalRecords: folhasFiltradas.length,
    size: 10,
    sizePage: 10,
  };

  const renderFolhaSituacaoBadge = (situacao: FolhaPagamentoSituacao) => {
    const meta = folhaPagamentoSituacaoMeta[situacao];
    const label =
      situacao === "PROCESSADA_COM_ALERTA"
        ? "Processada\ncom alerta"
        : situacao === "PROCESSADA_COM_ERRO"
          ? "Processada\ncom erro"
          : meta.label;

    return (
      <BadgeSeplag
        {...meta}
        label={label}
        size="md"
        customStyle={
          situacao === "PROCESSADA_COM_ALERTA" ||
          situacao === "PROCESSADA_COM_ERRO"
            ? {
                whiteSpace: "pre-line",
                lineHeight: 1.12,
                textAlign: "center",
                paddingInline: 12,
              }
            : undefined
        }
      />
    );
  };

  const renderExecucaoSituacaoBadge = (
    situacao: FolhaPagamentoExecucaoSituacao,
  ) => {
    const meta = folhaPagamentoExecucaoSituacaoMeta[situacao];
    return <BadgeSeplag {...meta} size="md" />;
  };

  const renderPessoaLogSituacaoBadge = (
    situacao: FolhaPagamentoPessoaLogSituacao,
  ) => {
    const meta = folhaPagamentoPessoaLogSituacaoMeta[situacao];
    return <BadgeSeplag {...meta} size="md" />;
  };

  const renderRubricaLogSituacaoBadge = (
    situacao: FolhaPagamentoRubricaLogSituacao,
  ) => {
    const meta = folhaPagamentoRubricaLogSituacaoMeta[situacao];
    return <BadgeSeplag {...meta} size="sm" />;
  };

  const formatMesAno = (value: string) => {
    if (!value) return "-";
    const [ano, mes] = value.split("-");
    return mes && ano ? `${mes}/${ano}` : value;
  };

  const folhaPodeEditar = (folha: FolhaPagamentoRow) =>
    folha.situacao === "RASCUNHO" || folha.situacao === "ABERTA";

  const folhaPodeProcessar = (folha: FolhaPagamentoRow) =>
    folha.situacao === "RASCUNHO" || folha.situacao === "ABERTA";

  const getFormErrorMessage = (name: keyof FolhaPagamentoForm) => {
    const message = errors[name]?.message;
    return message ? <small className="p-error">{String(message)}</small> : null;
  };

  const abrirNovaFolha = () => {
    setFeedback("");
    setFormFeedback("");
    setFolhaSelecionada(null);
    setFormMode("create");
    setActiveTab("dados");
    resetForm({
      nome: "",
      numero: "",
      mesAnoReferencia: "",
      competencia: "",
      observacao: "",
      orgaos: [],
      regimeJuridico: "",
      categoria: "",
      cargo: "",
      grupoEleitos: "",
      totalMesesAdiantar: 0,
      totalMesesRetroagir: 0,
    });
    setModalFormularioAberto(true);
  };

  const abrirEditarFolha = (folha: FolhaPagamentoRow) => {
    if (!folhaPodeEditar(folha)) {
      setFeedback("Não é possível editar uma folha em processamento, processada, bloqueada ou cancelada.");
      return;
    }

    setFeedback("");
    setFormFeedback("");
    setFolhaSelecionada(folha);
    setFormMode("edit");
    setActiveTab("dados");
    resetForm({
      nome: folha.nome,
      numero: folha.numero,
      mesAnoReferencia: formatMesAno(folha.mesAnoReferencia),
      competencia: formatMesAno(folha.competencia),
      observacao: folha.observacao,
      orgaos: folha.orgaos,
      regimeJuridico: folha.regimeJuridico,
      categoria: folha.categoria,
      cargo: folha.cargo,
      grupoEleitos: folha.grupoEleitos,
      totalMesesAdiantar: folha.totalMesesAdiantar,
      totalMesesRetroagir: folha.totalMesesRetroagir,
    });
    setModalFormularioAberto(true);
  };

  const abrirDetalheFolha = (folha: FolhaPagamentoRow) => {
    setFolhaSelecionada(folha);
    setModalDetalheAberto(true);
  };

  const salvarFolha = (data: FolhaPagamentoForm) => {
    const orgaos = data.orgaos ?? [];
    const totalMesesAdiantar = data.totalMesesAdiantar ?? 0;
    const totalMesesRetroagir = data.totalMesesRetroagir ?? 0;
    const mesAnoReferencia = normalizeMesAno(data.mesAnoReferencia);
    const competencia = normalizeMesAno(data.competencia);

    if (!isMesAnoValido(data.mesAnoReferencia) || !isMesAnoValido(data.competencia)) {
      setFormFeedback("Informe mês/ano de referência e competência no formato MM/AAAA.");
      setActiveTab("dados");
      return;
    }

    if (!orgaos.length) {
      setFormFeedback("Informe ao menos um órgão para a abrangência da folha.");
      setActiveTab("abrangencia");
      return;
    }

    if (totalMesesAdiantar < 0 || totalMesesRetroagir < 0) {
      setFormFeedback("Total de meses a adiantar e retroagir não pode ser menor que zero.");
      setActiveTab("parametros");
      return;
    }

    const folhaDuplicada = folhas.some((folha) => {
      if (formMode === "edit" && folha.id === folhaSelecionada?.id) return false;

      return (
        folha.numero === data.numero &&
        folha.mesAnoReferencia === mesAnoReferencia &&
        folha.competencia === competencia &&
        folha.orgaos.slice().sort().join("|") === orgaos.slice().sort().join("|")
      );
    });

    if (folhaDuplicada) {
      setFormFeedback("Já existe folha cadastrada para a combinação de número, referência, competência e órgão(s).");
      setActiveTab("dados");
      return;
    }

    if (formMode === "edit" && folhaSelecionada) {
      folhaPagamentoService.atualizarFolha(folhaSelecionada.id, {
        ...data,
        mesAnoReferencia,
        competencia,
        orgaos,
        totalMesesAdiantar,
        totalMesesRetroagir,
      });
      setFolhas((current) =>
        current.map((folha) =>
          folha.id === folhaSelecionada.id
            ? {
                ...folha,
                nome: data.nome ?? "",
                numero: data.numero ?? "",
                mesAnoReferencia,
                competencia,
                observacao: data.observacao ?? "",
                orgaos,
                regimeJuridico: data.regimeJuridico ?? "",
                categoria: data.categoria ?? "",
                cargo: data.cargo ?? "",
                grupoEleitos: data.grupoEleitos ?? "",
                totalMesesAdiantar,
                totalMesesRetroagir,
              }
            : folha,
        ),
      );
      setFeedback("Folha atualizada com sucesso.");
    } else {
      folhaPagamentoService.criarFolha({
        ...data,
        mesAnoReferencia,
        competencia,
        orgaos,
        totalMesesAdiantar,
        totalMesesRetroagir,
      });
      setFolhas((current) => [
        {
          id: Math.max(...current.map((folha) => folha.id), 0) + 1,
          nome: data.nome ?? "",
          numero: data.numero ?? "",
          mesAnoReferencia,
          competencia,
          observacao: data.observacao ?? "",
          orgaos,
          regimeJuridico: data.regimeJuridico ?? "",
          categoria: data.categoria ?? "",
          cargo: data.cargo ?? "",
          grupoEleitos: data.grupoEleitos ?? "",
          totalMesesAdiantar,
          totalMesesRetroagir,
          situacao: "RASCUNHO",
          totalPessoas: 0,
          totalSucesso: 0,
          totalAlerta: 0,
          totalErro: 0,
          ultimaExecucao: "-",
        },
        ...current,
      ]);
      setFeedback("Folha cadastrada com sucesso.");
    }

    setModalFormularioAberto(false);
  };

  const processarFolha = (folha: FolhaPagamentoRow) => {
    if (!folhaPodeProcessar(folha) || !folha.orgaos.length) {
      setFeedback("Não foi possível processar a folha. Verifique os dados obrigatórios.");
      return;
    }

    folhaPagamentoService.executarFolha({ folhaPagamentoId: folha.id });

    const novaExecucao: FolhaPagamentoExecucaoRow = {
      id: Math.max(...execucoes.map((execucao) => execucao.id), 1000) + 1,
      folhaPagamentoId: folha.id,
      situacao: "EM_FILA",
      dataHoraInicio: "28/05/2026 10:00",
      dataHoraFim: "-",
      usuarioResponsavel: "ROBERTO JUNIOR",
      totalPessoas: folha.totalPessoas,
      totalSucesso: 0,
      totalAlerta: 0,
      totalErro: 0,
      parametrosResumo: `Adiantar ${folha.totalMesesAdiantar} mês(es), retroagir ${folha.totalMesesRetroagir} mês(es)`,
    };

    setExecucoes((current) => [novaExecucao, ...current]);
    setFolhas((current) =>
      current.map((item) =>
        item.id === folha.id
          ? {
              ...item,
              situacao: "EM_FILA",
              ultimaExecucao: "28/05/2026 10:00",
            }
          : item,
      ),
    );
    setFeedback("Processamento enviado para a fila.");
  };

  const abrirExecucoesFolha = (folha: FolhaPagamentoRow) => {
    setFolhaSelecionada(folha);
    setModalExecucoesAberto(true);
  };

  const folhaColumns: ColumnMetaSeplag<FolhaPagamentoRow>[] = [
    { field: "numero", header: "Número da folha" },
    { field: "nome", header: "Nome da folha" },
    { header: "Órgão(s)", body: (row) => row.orgaos.join(", ") },
    { header: "Mês/ano ref.", body: (row) => formatMesAno(row.mesAnoReferencia) },
    { header: "Competência", body: (row) => formatMesAno(row.competencia) },
    { header: "Situação", body: (row) => renderFolhaSituacaoBadge(row.situacao) },
    { field: "totalPessoas", header: "Total pessoas" },
    { field: "totalSucesso", header: "Sucesso" },
    { field: "totalAlerta", header: "Alerta" },
    { field: "totalErro", header: "Erro" },
    { field: "ultimaExecucao", header: "Última execução" },
  ];

  const execucoesFolha = folhaSelecionada
    ? execucoes.filter(
        (execucao) => execucao.folhaPagamentoId === folhaSelecionada.id,
      )
    : [];
  const execucoesResults = createResults(execucoesFolha);
  const execucaoColumns: ColumnMetaSeplag<FolhaPagamentoExecucaoRow>[] = [
    { field: "id", header: "Execução" },
    {
      header: "Situação",
      body: (row) => renderExecucaoSituacaoBadge(row.situacao),
    },
    { field: "dataHoraInicio", header: "Início" },
    { field: "dataHoraFim", header: "Fim" },
    { field: "usuarioResponsavel", header: "Usuário" },
    { field: "totalPessoas", header: "Pessoas" },
    { field: "totalSucesso", header: "Sucesso" },
    { field: "totalAlerta", header: "Alerta" },
    { field: "totalErro", header: "Erro" },
  ];

  const logFiltros = watchLog();
  const logsDaExecucao = execucaoSelecionada
    ? pessoaLogs.filter(
        (log) => log.execucaoId === execucaoSelecionada.id,
      )
    : [];
  const rubricasDaPessoa = pessoaLogSelecionada
    ? rubricaLogs.filter(
        (rubrica) => rubrica.pessoaLogId === pessoaLogSelecionada.id,
      )
    : [];
  const logsFiltrados = logsDaExecucao.filter((log) => {
    const rubricasPessoa = rubricaLogs.filter(
      (rubrica) => rubrica.pessoaLogId === log.id,
    );
    const rubricaBusca = logFiltros.rubrica?.trim().toLowerCase();

    return (
      (!logFiltros.matricula ||
        `${log.matricula}/${log.vinculo}`.includes(logFiltros.matricula)) &&
      (!logFiltros.nome ||
        log.nome.toLowerCase().includes(logFiltros.nome.toLowerCase())) &&
      (!logFiltros.cpf || log.cpf.includes(logFiltros.cpf)) &&
      (!logFiltros.orgao || log.orgao === logFiltros.orgao) &&
      (!logFiltros.situacao || log.situacao === logFiltros.situacao) &&
      (!logFiltros.mensagem ||
        log.mensagem.toLowerCase().includes(logFiltros.mensagem.toLowerCase())) &&
      (!rubricaBusca ||
        rubricasPessoa.some(
          (rubrica) =>
            rubrica.codigoRubrica.toLowerCase().includes(rubricaBusca) ||
            rubrica.nomeRubrica.toLowerCase().includes(rubricaBusca),
        ))
    );
  });
  const logResults = createResults(logsFiltrados);
  const rubricasResults = createResults(rubricasDaPessoa);
  const logPessoaColumns: ColumnMetaSeplag<FolhaPagamentoPessoaLogRow>[] = [
    { header: "Matrícula/vínculo", body: (row) => `${row.matricula}/${row.vinculo}` },
    { field: "nome", header: "Nome" },
    { field: "cpf", header: "CPF" },
    { field: "orgao", header: "Órgão" },
    { field: "cargo", header: "Cargo" },
    {
      header: "Situação",
      body: (row) => renderPessoaLogSituacaoBadge(row.situacao),
    },
    { field: "mensagem", header: "Mensagem" },
  ];
  const rubricaLogColumns: ColumnMetaSeplag<FolhaPagamentoRubricaLogRow>[] = [
    { field: "codigoRubrica", header: "Código" },
    { field: "nomeRubrica", header: "Rubrica" },
    { field: "tipoRubrica", header: "Tipo" },
    { field: "valorCalculado", header: "Valor calculado" },
    {
      header: "Situação",
      body: (row) => renderRubricaLogSituacaoBadge(row.situacao),
    },
    { field: "mensagem", header: "Mensagem" },
  ];

  const renderAcoesFolha = (folha: FolhaPagamentoRow) => (
    <>
      <BotaoIconSeplag
        severity="warning"
        type="button"
        tooltip={
          folhaPodeEditar(folha)
            ? "Editar"
            : "Edição bloqueada pela situação da folha"
        }
        icon="pi pi-pencil"
        disabled={!folhaPodeEditar(folha)}
        onClick={() => abrirEditarFolha(folha)}
      />
      <BotaoIconSeplag
        type="button"
        tooltip={
          folhaPodeProcessar(folha)
            ? "Processar folha"
            : "Processamento indisponível para esta situação"
        }
        icon="pi pi-play"
        disabled={!folhaPodeProcessar(folha)}
        onClick={() => processarFolha(folha)}
      />
      <BotaoIconSeplag
        type="button"
        tooltip="Consultar execuções"
        icon="pi pi-list-check"
        disabled={!execucoes.some((execucao) => execucao.folhaPagamentoId === folha.id)}
        onClick={() => abrirExecucoesFolha(folha)}
      />
    </>
  );

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <div className="prototype-page-content prototype-page-content--white prototype-folha-pagamento-page">
        <CardSeplag
          title="Folha de Pagamento"
          cols="12"
          cardHeaderClassNames="prototype-regime-card"
        >
          {feedback ? (
            <div className="prototype-validation-panel">{feedback}</div>
          ) : null}

          <div className="col-12 prototype-category-filters prototype-folha-pagamento-filters">
            <TextFieldSeplag
              name="termo"
              control={control}
              label="Pesquisar por número ou nome da folha"
              cols="12 12 4"
              getFormErrorMessage={() => null}
            />
            <MultiSelectFieldSeplag
              name="orgaos"
              control={control}
              label="Órgãos"
              cols="12 12 3"
              options={folhaPagamentoOrgaoOptions}
              optionLabel="label"
              optionValue="value"
              selectedItemsLabel="{0} órgãos selecionados"
              getFormErrorMessage={() => null}
            />
            <TextFieldSeplag
              name="mesAnoReferencia"
              control={control}
              label="Mês/ano de referência"
              placeholder="MM/AAAA"
              cols="12 6 2"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 6 2"
              options={folhaPagamentoSituacaoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6 lg:col-1">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    termo: "",
                    orgaos: [],
                    mesAnoReferencia: "",
                    situacao: "",
                  })
                }
              />
            </div>
          </div>

          <div className="col-12 prototype-folha-pagamento-actions">
            <BotaoSeplag
              type="button"
              label="Nova Folha"
              icon="pi pi-plus"
              onClick={abrirNovaFolha}
            />
          </div>

          <div className="col-12 prototype-folha-pagamento-table">
            <TablePaginadoSeplag
              dataKey="id"
              data={folhaResults}
              rows={10}
              rowsPerPage={[10, 20, 50]}
              paginator
              lazy={false}
              selectionMode={null}
              columns={folhaColumns}
              hasEventoAcao
              handleView={abrirDetalheFolha}
              renderBotoes={renderAcoesFolha}
              handleOnPageChange={() => {}}
            />
          </div>
        </CardSeplag>

        <ModalSeplag
          visible={modalFormularioAberto}
          titulo={`${formMode === "edit" ? "Alterar" : "Cadastrar"} - Folha de Pagamento`}
          fechar={() => setModalFormularioAberto(false)}
          labelAcao="Salvar"
          iconAcao="pi pi-save"
          funcAcao={handleSubmit(salvarFolha)}
          tamanho="960px"
        >
          <div className="col-12 prototype-folha-pagamento-form">
            {formFeedback ? (
              <div className="prototype-validation-panel">{formFeedback}</div>
            ) : null}
            <TabsSeplag
              items={folhaPagamentoTabs}
              activeValue={activeTab}
              onChange={setActiveTab}
              equalWidth
            />

            {activeTab === "dados" && (
              <div className="grid prototype-category-form-fields">
                <TextFieldSeplag
                  name="nome"
                  control={formControl}
                  label="Nome da folha"
                  cols="12 12 6"
                  required
                  getFormErrorMessage={() => getFormErrorMessage("nome")}
                />
                <TextFieldSeplag
                  name="numero"
                  control={formControl}
                  label="Número da folha"
                  cols="12 12 3"
                  required
                  getFormErrorMessage={() => getFormErrorMessage("numero")}
                />
                <TextFieldSeplag
                  name="mesAnoReferencia"
                  control={formControl}
                  label="Mês/ano de referência"
                  placeholder="MM/AAAA"
                  cols="12 12 3"
                  required
                  getFormErrorMessage={() =>
                    getFormErrorMessage("mesAnoReferencia")
                  }
                />
                <TextFieldSeplag
                  name="competencia"
                  control={formControl}
                  label="Competência"
                  placeholder="MM/AAAA"
                  cols="12 12 3"
                  required
                  getFormErrorMessage={() => getFormErrorMessage("competencia")}
                />
                <TextAreaFieldSeplag
                  name="observacao"
                  control={formControl}
                  label="Observação"
                  cols="12"
                  rows={4}
                  maxLength={500}
                  getFormErrorMessage={() => getFormErrorMessage("observacao")}
                />
              </div>
            )}

            {activeTab === "abrangencia" && (
              <div className="grid prototype-category-form-fields">
                <MultiSelectFieldSeplag
                  name="orgaos"
                  control={formControl}
                  label="Órgãos"
                  cols="12 12 6"
                  required
                  options={folhaPagamentoOrgaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  selectedItemsLabel="{0} órgãos selecionados"
                  getFormErrorMessage={() => getFormErrorMessage("orgaos")}
                />
                <DropdownFieldSeplag
                  name="regimeJuridico"
                  control={formControl}
                  label="Regime jurídico"
                  cols="12 12 6"
                  options={folhaPagamentoRegimeOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() =>
                    getFormErrorMessage("regimeJuridico")
                  }
                />
                <DropdownFieldSeplag
                  name="categoria"
                  control={formControl}
                  label="Categoria"
                  cols="12 12 4"
                  options={folhaPagamentoCategoriaOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => getFormErrorMessage("categoria")}
                />
                <DropdownFieldSeplag
                  name="cargo"
                  control={formControl}
                  label="Cargo"
                  cols="12 12 4"
                  options={folhaPagamentoCargoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => getFormErrorMessage("cargo")}
                />
                <DropdownFieldSeplag
                  name="grupoEleitos"
                  control={formControl}
                  label="Grupo de eleitos"
                  cols="12 12 4"
                  options={folhaPagamentoGrupoEleitosOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() =>
                    getFormErrorMessage("grupoEleitos")
                  }
                />
              </div>
            )}

            {activeTab === "parametros" && (
              <div className="grid prototype-category-form-fields">
                <NumberFieldSeplag
                  name="totalMesesAdiantar"
                  control={formControl}
                  label="Total de meses a adiantar"
                  cols="12 12 6"
                  required
                  min={0}
                  getFormErrorMessage={() =>
                    getFormErrorMessage("totalMesesAdiantar")
                  }
                />
                <NumberFieldSeplag
                  name="totalMesesRetroagir"
                  control={formControl}
                  label="Total de meses a retroagir"
                  cols="12 12 6"
                  required
                  min={0}
                  getFormErrorMessage={() =>
                    getFormErrorMessage("totalMesesRetroagir")
                  }
                />
              </div>
            )}
          </div>
        </ModalSeplag>

        <ModalSeplag
          visible={modalDetalheAberto}
          titulo="Detalhar Folha de Pagamento"
          fechar={() => setModalDetalheAberto(false)}
          tamanho="760px"
          hideFooter
        >
          {folhaSelecionada ? (
            <div className="col-12 prototype-catalogo-view-content">
              <p><strong>Número:</strong> {folhaSelecionada.numero}</p>
              <p><strong>Nome:</strong> {folhaSelecionada.nome}</p>
              <p><strong>Órgão(s):</strong> {folhaSelecionada.orgaos.join(", ")}</p>
              <p><strong>Mês/ano de referência:</strong> {formatMesAno(folhaSelecionada.mesAnoReferencia)}</p>
              <p><strong>Competência:</strong> {formatMesAno(folhaSelecionada.competencia)}</p>
              <p><strong>Situação:</strong> {renderFolhaSituacaoBadge(folhaSelecionada.situacao)}</p>
              <p><strong>Regime jurídico:</strong> {folhaSelecionada.regimeJuridico || "Todos"}</p>
              <p><strong>Categoria:</strong> {folhaSelecionada.categoria || "Todas"}</p>
              <p><strong>Cargo:</strong> {folhaSelecionada.cargo || "Todos"}</p>
              <p><strong>Grupo de eleitos:</strong> {folhaSelecionada.grupoEleitos || "Não informado"}</p>
              <p><strong>Meses a adiantar:</strong> {folhaSelecionada.totalMesesAdiantar}</p>
              <p><strong>Meses a retroagir:</strong> {folhaSelecionada.totalMesesRetroagir}</p>
              <p><strong>Observação:</strong> {folhaSelecionada.observacao || "-"}</p>
            </div>
          ) : null}
        </ModalSeplag>

        <ModalSeplag
          visible={modalExecucoesAberto}
          titulo="Execuções da Folha de Pagamento"
          fechar={() => setModalExecucoesAberto(false)}
          tamanho="1120px"
          hideFooter
        >
          {folhaSelecionada ? (
            <div className="col-12 prototype-folha-execucoes-modal">
              <div className="prototype-folha-execucoes-summary">
                <div>
                  <span>Folha</span>
                  <strong>{folhaSelecionada.numero}</strong>
                  <p>{folhaSelecionada.nome}</p>
                </div>
                <div>
                  <span>Referência</span>
                  <strong>{formatMesAno(folhaSelecionada.mesAnoReferencia)}</strong>
                  <p>Competência {formatMesAno(folhaSelecionada.competencia)}</p>
                </div>
                <div>
                  <span>Situação atual</span>
                  {renderFolhaSituacaoBadge(folhaSelecionada.situacao)}
                </div>
                <div>
                  <span>Histórico</span>
                  <strong>{execucoesFolha.length}</strong>
                  <p>{execucoesFolha.length === 1 ? "execução" : "execuções"}</p>
                </div>
              </div>

              {execucoesFolha.length ? (
                <div className="prototype-folha-execucoes-table">
                  <TablePaginadoSeplag
                    dataKey="id"
                    data={execucoesResults}
                    rows={5}
                    rowsPerPage={[5, 10]}
                    paginator
                    lazy={false}
                    selectionMode={null}
                    columns={execucaoColumns}
                    hasEventoAcao
                    renderBotoes={(execucao) => (
                      <BotaoIconSeplag
                        type="button"
                        tooltip="Ver log pessoa por pessoa"
                        icon="pi pi-search"
                        onClick={() => {
                          setExecucaoSelecionada(execucao);
                          resetLog({
                            matricula: "",
                            nome: "",
                            cpf: "",
                            orgao: "",
                            situacao: "",
                            rubrica: "",
                            mensagem: "",
                          });
                          setModalLogAberto(true);
                        }}
                      />
                    )}
                    handleOnPageChange={() => {}}
                  />
                </div>
              ) : (
                <div className="prototype-empty-content">
                  Nenhuma execução registrada para esta folha.
                </div>
              )}
            </div>
          ) : null}
        </ModalSeplag>

        <ModalSeplag
          visible={modalLogAberto}
          titulo="Log de Processamento"
          fechar={() => setModalLogAberto(false)}
          tamanho="1180px"
          hideFooter
        >
          {execucaoSelecionada ? (
            <div className="col-12 prototype-folha-log-modal">
              <div className="prototype-folha-execucoes-summary">
                <div>
                  <span>Execução</span>
                  <strong>{execucaoSelecionada.id}</strong>
                  <p>{execucaoSelecionada.usuarioResponsavel}</p>
                </div>
                <div>
                  <span>Situação</span>
                  {renderExecucaoSituacaoBadge(execucaoSelecionada.situacao)}
                </div>
                <div>
                  <span>Início / fim</span>
                  <strong>{execucaoSelecionada.dataHoraInicio}</strong>
                  <p>{execucaoSelecionada.dataHoraFim}</p>
                </div>
                <div>
                  <span>Totais</span>
                  <strong>{execucaoSelecionada.totalPessoas}</strong>
                  <p>
                    {execucaoSelecionada.totalSucesso} sucesso,{" "}
                    {execucaoSelecionada.totalAlerta} alerta,{" "}
                    {execucaoSelecionada.totalErro} erro
                  </p>
                </div>
              </div>

              <div className="prototype-category-filters prototype-folha-log-filters">
                <TextFieldSeplag
                  name="matricula"
                  control={logControl}
                  label="Matrícula/vínculo"
                  cols="12"
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="nome"
                  control={logControl}
                  label="Nome"
                  cols="12"
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="cpf"
                  control={logControl}
                  label="CPF"
                  cols="12"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="orgao"
                  control={logControl}
                  label="Órgão"
                  cols="12"
                  options={[{ label: "Todos", value: "" }, ...folhaPagamentoOrgaoOptions]}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="situacao"
                  control={logControl}
                  label="Situação"
                  cols="12"
                  options={folhaPagamentoPessoaLogSituacaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="rubrica"
                  control={logControl}
                  label="Rubrica"
                  cols="12"
                  getFormErrorMessage={() => null}
                />
                <TextFieldSeplag
                  name="mensagem"
                  control={logControl}
                  label="Mensagem contém"
                  cols="12"
                  getFormErrorMessage={() => null}
                />
                <div className="prototype-category-clear">
                  <BotaoLimparFiltroSeplag
                    type="button"
                    label="Limpar"
                    icon="pi pi-refresh"
                    onClick={() =>
                      resetLog({
                        matricula: "",
                        nome: "",
                        cpf: "",
                        orgao: "",
                        situacao: "",
                        rubrica: "",
                        mensagem: "",
                      })
                    }
                  />
                </div>
              </div>

              <div className="prototype-folha-log-table">
                <TablePaginadoSeplag
                  dataKey="id"
                  data={logResults}
                  rows={8}
                  rowsPerPage={[8, 16]}
                  paginator
                  lazy={false}
                  selectionMode={null}
                  columns={logPessoaColumns}
                  hasEventoAcao
                  renderBotoes={(row) => (
                    <BotaoIconSeplag
                      type="button"
                      tooltip="Ver detalhe"
                      icon="pi pi-eye"
                      onClick={() => {
                        setPessoaLogSelecionada(row);
                        setModalPessoaLogAberto(true);
                      }}
                    />
                  )}
                  handleOnPageChange={() => {}}
                />
              </div>
            </div>
          ) : null}
        </ModalSeplag>

        <ModalSeplag
          visible={modalPessoaLogAberto}
          titulo="Detalhe do Processamento por Pessoa"
          fechar={() => setModalPessoaLogAberto(false)}
          tamanho="980px"
          hideFooter
        >
          {pessoaLogSelecionada ? (
            <div className="col-12 prototype-folha-pessoa-log-modal">
              <div className="prototype-folha-pessoa-log-summary">
                <p><strong>Matrícula/vínculo:</strong> {pessoaLogSelecionada.matricula}/{pessoaLogSelecionada.vinculo}</p>
                <p><strong>Nome:</strong> {pessoaLogSelecionada.nome}</p>
                <p><strong>CPF:</strong> {pessoaLogSelecionada.cpf}</p>
                <p><strong>Órgão:</strong> {pessoaLogSelecionada.orgao}</p>
                <p><strong>Regime jurídico:</strong> {pessoaLogSelecionada.regimeJuridico}</p>
                <p><strong>Categoria:</strong> {pessoaLogSelecionada.categoria}</p>
                <p><strong>Cargo:</strong> {pessoaLogSelecionada.cargo}</p>
                <p><strong>Grupo de eleitos:</strong> {pessoaLogSelecionada.grupoEleitos || "Não informado"}</p>
                <p><strong>Situação:</strong> {renderPessoaLogSituacaoBadge(pessoaLogSelecionada.situacao)}</p>
                <p><strong>Mensagem:</strong> {pessoaLogSelecionada.mensagem}</p>
              </div>

              {rubricasDaPessoa.length ? (
                <div className="prototype-folha-rubricas-log-table">
                  <TablePaginadoSeplag
                    dataKey="id"
                    data={rubricasResults}
                    rows={6}
                    rowsPerPage={[6, 12]}
                    paginator={false}
                    lazy={false}
                    selectionMode={null}
                    columns={rubricaLogColumns}
                    handleOnPageChange={() => {}}
                  />
                </div>
              ) : (
                <div className="prototype-empty-content">
                  Nenhuma rubrica registrada para esta pessoa nesta execução.
                </div>
              )}
            </div>
          ) : null}
        </ModalSeplag>
      </div>
    </PrototypeSystemPage>
  );
}

export function PrototiposFolhaGruposCalculoPage() {
  const navigate = useNavigate();
  const [expandedGrupoCalculoIds, setExpandedGrupoCalculoIds] = useState<number[]>([]);
  const { control, reset } = useForm<GrupoCalculoFiltroForm>({
    defaultValues: {
      nomeGrupo: "",
      situacao: "",
      tipoVinculo: "",
    },
  });

  const toggleGrupoCalculo = (grupoId: number) => {
    setExpandedGrupoCalculoIds((current) =>
      current.includes(grupoId)
        ? current.filter((id) => id !== grupoId)
        : [...current, grupoId],
    );
  };

  const renderGrupoCalculoAction = (row: GrupoCalculoRow) => (
    <div className="prototype-accordion-action-button">
      <button
        type="button"
        aria-label={`Visualizar ${row.grupo}`}
        onClick={() => navigate(`/prototipos/folha/grupos-calculo/${row.id}/editar`)}
      >
        <i className="pi pi-eye" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Abrir ações de ${row.grupo}`}
        onClick={() => navigate(`/prototipos/folha/grupos-calculo/${row.id}/editar`)}
      >
        <i className="pi pi-chevron-down" aria-hidden="true" />
      </button>
    </div>
  );

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
          <div className="col-12 prototype-category-filters prototype-grupos-calculo-filters">
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
              name="tipoVinculo"
              control={control}
              label="Tipo de Vínculo"
              cols="12 6"
              options={grupoCalculoFiltroTipoVinculoOptions}
              optionLabel="label"
              optionValue="value"
              getFormErrorMessage={() => null}
            />
            <div className="prototype-category-clear col-12 md:col-6">
              <BotaoLimparFiltroSeplag
                type="button"
                label="Limpar Filtro"
                icon="pi pi-refresh"
                onClick={() =>
                  reset({
                    nomeGrupo: "",
                    situacao: "",
                    tipoVinculo: "",
                  })
                }
              />
            </div>
          </div>

          <div className="col-12 prototype-folha-grupos-calculo-table">
            <div className="prototype-grupos-calculo-accordion-table">
              <div className="prototype-grupos-calculo-table-toolbar">
                <BotaoSeplag
                  type="button"
                  label="Adicionar"
                  icon="pi pi-plus"
                  onClick={() => navigate("/prototipos/folha/grupos-calculo/novo")}
                />
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Grupo</th>
                    <th>Tipo vínculo</th>
                    <th>Situação atual</th>
                    <th aria-label="Expandir versões" />
                  </tr>
                </thead>
                <tbody>
                  {gruposCalculoMock.map((grupo) => {
                    const isExpanded = expandedGrupoCalculoIds.includes(grupo.id);
                    const versoes = gruposCalculoVersoesMock[grupo.id] ?? [grupo];

                    return (
                      <Fragment key={grupo.id}>
                        <tr className="prototype-grupos-calculo-group-row" key={grupo.id}>
                          <td>
                            <strong>{grupo.grupo}</strong>
                          </td>
                          <td>{grupo.tipoVinculo}</td>
                          <td>{renderGrupoCalculoStatusBadge(grupo.situacao)}</td>
                          <td>
                            <button
                              type="button"
                              className="prototype-grupos-calculo-expand"
                              aria-label={`${isExpanded ? "Recolher" : "Expandir"} versões de ${grupo.grupo}`}
                              aria-expanded={isExpanded}
                              onClick={() => toggleGrupoCalculo(grupo.id)}
                            >
                              <i
                                className={`pi ${isExpanded ? "pi-chevron-up" : "pi-chevron-down"}`}
                                aria-hidden="true"
                              />
                            </button>
                          </td>
                        </tr>

                        {isExpanded && (
                          <tr className="prototype-grupos-calculo-versions-row" key={`${grupo.id}-versions`}>
                            <td colSpan={4}>
                              <div className="prototype-grupos-calculo-versions">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Versão</th>
                                      <th>Início vigência</th>
                                      <th>Fim vigência</th>
                                      <th>Rubricas</th>
                                      <th>Situação</th>
                                      <th>Ações</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {versoes.map((versao, index) => (
                                      <tr key={`${grupo.id}-${versao.codigo}-${index}`}>
                                        <td>
                                          <strong>{`V${versoes.length - index}`}</strong>
                                        </td>
                                        <td>{versao.inicioVigencia}</td>
                                        <td>{versao.fimVigencia}</td>
                                        <td>{versao.rubricas}</td>
                                        <td>{renderGrupoCalculoStatusBadge(versao.situacao)}</td>
                                        <td>{renderGrupoCalculoAction(versao)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
  const [rubricasGerenciadas, setRubricasGerenciadas] = useState<GrupoCalculoRubricaGerenciada[]>(
    () =>
      isEdit
        ? catalogoRubricasMock.slice(0, 12).map((rubrica) => ({
            ...rubrica,
            origem: "filtro",
          }))
        : [],
  );
  const [rubricaDragIndex, setRubricaDragIndex] = useState<number | null>(null);
  const [modalRubricasAberto, setModalRubricasAberto] = useState(false);
  const [rubricasSelecionadasParaAdicionar, setRubricasSelecionadasParaAdicionar] =
    useState<number[]>([]);
  const ultimaAbrangenciaKeyRef = useRef("");

  const { control, setValue, watch } = useForm<GrupoCalculoForm>({
    defaultValues: {
      nome: grupo?.grupo ?? "",
      descricao: grupo
        ? `Configuração de cálculo para ${grupo.grupo.toLowerCase()}.`
        : "",
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
      abrangenciaRegimeJuridico: "",
      abrangenciaTipoVinculo: "",
      abrangenciaInstituicao: "",
      abrangenciaHerdarDe: "nenhum",
      abrangenciaOrgao: "",
    },
  });

  const handleMoverRubricaGerenciada = (fromIndex: number, toIndex: number) => {
    setRubricasGerenciadas((current) => {
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
      next.splice(toIndex, 0, { ...item, reordenada: true });
      return next;
    });
  };

  const handleRemoverRubricaGerenciada = (idRubrica: number) => {
    setRubricasGerenciadas((current) =>
      current.filter((rubrica) => rubrica.id !== idRubrica),
    );
  };

  const handleAbrirModalAdicionarRubricas = () => {
    setRubricasSelecionadasParaAdicionar([]);
    setModalRubricasAberto(true);
  };

  const handleToggleRubricaParaAdicionar = (idRubrica: number) => {
    setRubricasSelecionadasParaAdicionar((current) =>
      current.includes(idRubrica)
        ? current.filter((idSelecionado) => idSelecionado !== idRubrica)
        : [...current, idRubrica],
    );
  };

  const handleConfirmarAdicionarRubricas = () => {
    setRubricasGerenciadas((current) => {
      const idsAtuais = new Set(current.map((rubrica) => rubrica.id));
      const novasRubricas = catalogoRubricasMock
        .filter(
          (rubrica) =>
            rubricasSelecionadasParaAdicionar.includes(rubrica.id) &&
            !idsAtuais.has(rubrica.id),
        )
        .map((rubrica) => ({
          ...rubrica,
          origem: "manual" as const,
        }));

      return [...current, ...novasRubricas];
    });
    setModalRubricasAberto(false);
    setRubricasSelecionadasParaAdicionar([]);
  };

  const abrangenciaRegimeJuridico = watch("abrangenciaRegimeJuridico");
  const abrangenciaTipoVinculo = watch("abrangenciaTipoVinculo");
  const abrangenciaInstituicao = watch("abrangenciaInstituicao");
  const abrangenciaOrgao = watch("abrangenciaOrgao");
  const abrangenciaHerdarDe = watch("abrangenciaHerdarDe");
  const podeGerenciarRubricas = Boolean(
    abrangenciaRegimeJuridico && abrangenciaTipoVinculo,
  );
  const abrangenciaKey = [
    abrangenciaRegimeJuridico,
    abrangenciaTipoVinculo,
    abrangenciaInstituicao,
    abrangenciaOrgao,
    abrangenciaHerdarDe,
  ].join("|");

  useEffect(() => {
    if (ultimaAbrangenciaKeyRef.current === abrangenciaKey) return;

    ultimaAbrangenciaKeyRef.current = abrangenciaKey;

    if (!podeGerenciarRubricas) {
      if (!isEdit) setRubricasGerenciadas([]);
      return;
    }

    const codigosRubricas = getRubricasGrupoCalculoPorAbrangencia({
      regimeJuridico: abrangenciaRegimeJuridico,
      tipoVinculo: abrangenciaTipoVinculo,
      instituicao: abrangenciaInstituicao,
      orgao: abrangenciaOrgao,
      herdarDe: abrangenciaHerdarDe,
    });

    setRubricasGerenciadas(
      catalogoRubricasMock
        .filter((rubrica) => codigosRubricas.includes(rubrica.codigo))
        .map((rubrica) => ({
          ...rubrica,
          origem: "filtro" as const,
        })),
    );
  }, [
    abrangenciaHerdarDe,
    abrangenciaInstituicao,
    abrangenciaKey,
    abrangenciaOrgao,
    abrangenciaRegimeJuridico,
    abrangenciaTipoVinculo,
    isEdit,
    podeGerenciarRubricas,
  ]);

  const rubricasDisponiveisParaAdicionar = catalogoRubricasMock.filter(
    (rubrica) =>
      !rubricasGerenciadas.some(
        (rubricaGerenciada) => rubricaGerenciada.id === rubrica.id,
      ),
  );

  const renderGrupoCalculoContent = () => (
    <div className="grid prototype-category-form-fields prototype-grupo-calculo-form-fields">
          <TextFieldSeplag
            name="nome"
            control={control}
            label="Nome do Grupo"
            cols="12 12 12"
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
          <div className="col-12 prototype-grupo-calculo-vigencia">
            <SituacaoVigenciaSeplag<GrupoCalculoForm>
              control={control}
              setValue={setValue}
              rotuloDataAtivacao="Início da Vigência"
              cols={{
                situacao: "12 12 3",
                dataAtivacao: "12 12 3",
                statusOperacional: "col-12 md:col-4 lg:col-4",
                dataEncerramento: "12 12 3",
                motivoEncerramento: "12",
                dataExtincao: "12 12 3",
                motivoExtincao: "12",
              }}
              getFormErrorMessage={() => null}
            />
          </div>

          <div className="col-12 prototype-grupo-calculo-rubricas-section">
            <div className="prototype-grupo-calculo-abrangencia">
              <div className="prototype-grupo-calculo-section-heading">
                <strong>Abrangência</strong>
                {!podeGerenciarRubricas && (
                  <span>Preencha os filtros para carregar as rubricas</span>
                )}
              </div>
              <div className="grid prototype-category-form-fields">
                <DropdownFieldSeplag
                  name="abrangenciaRegimeJuridico"
                  control={control}
                  label="Regime Jurídico"
                  cols="12 12 3"
                  required
                  options={grupoCalculoRegimeJuridicoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="abrangenciaTipoVinculo"
                  control={control}
                  label="Tipo de Vínculo"
                  cols="12 12 3"
                  required
                  options={grupoCalculoTipoVinculoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="abrangenciaInstituicao"
                  control={control}
                  label="Instituição"
                  cols="12 12 3"
                  options={grupoCalculoInstituicaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="abrangenciaOrgao"
                  control={control}
                  label="Órgão"
                  cols="12 12 3"
                  options={grupoCalculoOrgaoOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
                <DropdownFieldSeplag
                  name="abrangenciaHerdarDe"
                  control={control}
                  label="Herdar De"
                  cols="12 12 3"
                  options={grupoCalculoSuperiorOptions}
                  optionLabel="label"
                  optionValue="value"
                  getFormErrorMessage={() => null}
                />
              </div>
            </div>

            <div className="prototype-grupo-calculo-rubricas-manager">
              <div className="prototype-grupo-calculo-rubricas-header">
                <div>
                  <strong>Gerenciar Rubricas</strong>
                  {!podeGerenciarRubricas && (
                    <span>Preencha os filtros acima para carregar as rubricas</span>
                  )}
                </div>
                {podeGerenciarRubricas && (
                  <BotaoSeplag
                    type="button"
                    label="Adicionar Rubrica"
                    icon="pi pi-plus"
                    className="prototype-grupo-calculo-add-rubrica-btn"
                    onClick={handleAbrirModalAdicionarRubricas}
                  />
                )}
              </div>

              {podeGerenciarRubricas ? (
                <div className="prototype-grupo-calculo-rubricas-list">
                <div className="prototype-grupo-calculo-rubricas-list-head">
                  <span aria-label="Ordenar" />
                  <span>#</span>
                  <span>Código</span>
                  <span>Nome da Rubrica</span>
                  <span>Tipo</span>
                  <span>Ações</span>
                </div>

                {rubricasGerenciadas.length > 0 ? (
                  rubricasGerenciadas.map((rubrica, index) => {
                  const tipoRubrica = getGrupoCalculoRubricaTipo(rubrica);
                  const tipoRubricaBadge = getGrupoCalculoRubricaTipoBadge(tipoRubrica);
                  const rubricaBloqueada = rubrica.origem === "filtro";
                  const rubricaFiltradaApagada =
                    rubricaBloqueada && !rubrica.reordenada;

                  return (
                    <div
                      key={rubrica.id}
                      className={`prototype-grupo-calculo-rubrica-row${
                        rubricaFiltradaApagada ? " is-filtered" : ""
                      }`}
                      draggable
                      onDragStart={() => setRubricaDragIndex(index)}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (rubricaDragIndex === null) return;
                        handleMoverRubricaGerenciada(rubricaDragIndex, index);
                        setRubricaDragIndex(null);
                      }}
                      onDragEnd={() => setRubricaDragIndex(null)}
                    >
                      <button
                        type="button"
                        className="prototype-grupo-calculo-drag-handle"
                        title="Arraste para reordenar"
                        aria-label={`Reordenar ${rubrica.nomeRubrica}`}
                      >
                        <i className="pi pi-bars" aria-hidden="true" />
                      </button>
                      <span>{index + 1}</span>
                      <code>{rubrica.codigo}</code>
                      <strong>{rubrica.nomeRubrica}</strong>
                      <span
                        className="prototype-grupo-calculo-tipo-pill"
                        style={{
                          color: tipoRubricaBadge.color,
                          backgroundColor: tipoRubricaBadge.bg,
                          borderColor: tipoRubricaBadge.border,
                        }}
                      >
                        {tipoRubrica}
                      </span>
                      {rubricaBloqueada ? (
                        <button
                          type="button"
                          className="prototype-grupo-calculo-lock-rubrica-btn"
                          title="Rubrica carregada pelos filtros"
                          aria-label={`${rubrica.nomeRubrica} carregada pelos filtros`}
                          disabled
                        >
                          <i className="pi pi-lock" aria-hidden="true" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="prototype-grupo-calculo-remove-rubrica-btn"
                          title="Remover rubrica"
                          aria-label={`Remover ${rubrica.nomeRubrica}`}
                          onClick={() => handleRemoverRubricaGerenciada(rubrica.id)}
                        >
                          <i className="pi pi-trash" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  );
                })
                ) : (
                  <div className="prototype-grupo-calculo-rubricas-list-empty">
                    Nenhuma rubrica adicionada.
                  </div>
                )}
                </div>
              ) : (
                <div className="prototype-grupo-calculo-rubricas-empty">
                  <i className="pi pi-exclamation-circle" aria-hidden="true" />
                  <span>
                    Selecione o Regime Jurídico e Tipo de Vínculo para carregar
                    as rubricas
                  </span>
                </div>
              )}
            </div>
          </div>
    </div>
  );

  return (
    <PrototypeSystemPage
      nomeSistema="FOLHA"
      ambienteSistema="Teste"
      menuItems={menuFolha}
    >
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="prototype-page-content prototype-page-content--white">
          <CardSeplag
            title={`${isEdit ? "Alterar" : "Cadastrar"} - Grupos de Cálculo de Folha`}
            cols="12"
            cardHeaderClassNames="prototype-category-card"
          >
            <div className="col-12 prototype-category-form prototype-grupo-calculo-form">
              {renderGrupoCalculoContent()}

              <div className="prototype-category-form-footer">
                <BotaoVoltarSeplag
                  type="button"
                  onClick={() => navigate("/prototipos/folha/grupos-calculo")}
                />
                <BotaoSalvarSeplag
                  type="submit"
                  label="Salvar Rascunho"
                />
                <BotaoSalvarSeplag
                  type="button"
                  label="Publicar"
                  icon="pi pi-send"
                  onClick={() => {}}
                />
              </div>
            </div>

            <ModalSeplag
              visible={modalRubricasAberto}
              titulo="Adicionar Rubrica"
              tamanho="720px"
              labelFechar="Cancelar"
              labelAcao="Adicionar"
              iconAcao="pi pi-plus"
              funcAcao={handleConfirmarAdicionarRubricas}
              fechar={() => {
                setModalRubricasAberto(false);
                setRubricasSelecionadasParaAdicionar([]);
              }}
            >
              <div className="col-12 prototype-grupo-calculo-modal-rubricas">
                {rubricasDisponiveisParaAdicionar.length > 0 ? (
                  rubricasDisponiveisParaAdicionar.map((rubrica) => {
                    const tipoRubrica = getGrupoCalculoRubricaTipo(rubrica);
                    const tipoRubricaBadge =
                      getGrupoCalculoRubricaTipoBadge(tipoRubrica);
                    const checked = rubricasSelecionadasParaAdicionar.includes(
                      rubrica.id,
                    );

                    return (
                      <label
                        className="prototype-grupo-calculo-modal-rubrica-item"
                        key={rubrica.id}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            handleToggleRubricaParaAdicionar(rubrica.id)
                          }
                        />
                        <span className="prototype-grupo-calculo-modal-rubrica-codigo">
                          {rubrica.codigo}
                        </span>
                        <strong>{rubrica.nomeRubrica}</strong>
                        <span
                          className="prototype-grupo-calculo-tipo-pill"
                          style={{
                            color: tipoRubricaBadge.color,
                            backgroundColor: tipoRubricaBadge.bg,
                            borderColor: tipoRubricaBadge.border,
                          }}
                        >
                          {tipoRubrica}
                        </span>
                      </label>
                    );
                  })
                ) : (
                  <div className="prototype-grupo-calculo-modal-empty">
                    Todas as rubricas disponíveis já foram adicionadas.
                  </div>
                )}
              </div>
            </ModalSeplag>
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
      situacao: "",
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
      field: "descricao",
      header: "Descrição",
    },
    {
      field: "quantidadeEleitos",
      header: "Quantidade Eleitos",
    },
    {
      header: "Situação",
      body: (row) => renderGrupoCalculoStatusBadge(row.situacao),
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
              label="Descrição"
              cols="12 12 6"
              getFormErrorMessage={() => null}
            />
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12 12 4"
              options={regimeSituacaoOptions}
              optionLabel="label"
              optionValue="value"
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
                    situacao: "",
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
  const [participantesDisponiveis, setParticipantesDisponiveis] = useState(
    grupoEleitoParticipantesMock.slice(4),
  );
  const [participantesEleitos, setParticipantesEleitos] = useState(
    grupoEleitoParticipantesMock.slice(0, 4),
  );
  const { control, setValue } = useForm<GrupoEleitoForm>({
    defaultValues: {
      descricao: "",
      situacao: SITUACAO_VIGENCIA.ATIVO,
      dataAtivacao: "08/05/2026",
      dataEncerramento: "",
      motivoEncerramento: "",
      dataExtincao: "",
      motivoExtincao: "",
      observacoes: "",
      participanteBusca: "",
      consultar: "todos",
      filtroInstituicao: [],
      filtroOrgao: [],
      filtroTipoVinculo: [],
      filtroSetor: [],
      filtroCategoria: [],
      filtroSubcategoria: [],
      filtroCargo: [],
    },
  });
  const renderParticipantePickListItem = (participante: GrupoEleitoParticipanteRow) => (
    <div className="prototype-grupo-picklist-item">
      <span className="prototype-grupo-matricula">{participante.matricula || "-"}</span>
      <strong>{participante.servidor}</strong>
      <span className="prototype-grupo-cpf">{participante.cpf}</span>
    </div>
  );
  const handleClearParticipanteFilters = () => {
    setValue("participanteBusca", "");
    setValue("filtroInstituicao", []);
    setValue("filtroOrgao", []);
    setValue("filtroTipoVinculo", []);
    setValue("filtroSetor", []);
    setValue("filtroCategoria", []);
    setValue("filtroSubcategoria", []);
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
            <div className="col-12 prototype-category-form prototype-grupo-eleito-form">
              <div className="grid prototype-category-form-fields prototype-grupo-eleito-form-fields">
                <TextFieldSeplag
                  name="descricao"
                  control={control}
                  label="Descrição"
                  cols="12 12 12"
                  required
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
                <div className="col-12 prototype-category-vigencia">
                  <SituacaoVigenciaSeplag<GrupoEleitoForm>
                    control={control}
                    setValue={setValue}
                    rotuloDataAtivacao="Data Criação"
                    cols={{
                      situacao: "12 12 3",
                      dataAtivacao: "12 12 3",
                      statusOperacional: "col-12 md:col-4 lg:col-4",
                      dataEncerramento: "12 12 3",
                      motivoEncerramento: "12",
                      dataExtincao: "12 12 3",
                      motivoExtincao: "12",
                    }}
                    getFormErrorMessage={() => null}
                  />
                </div>
              </div>

              <div className="prototype-grupo-participantes">
                <div className="prototype-grupo-picklist-shell">
                  <div className="prototype-grupo-card-search">
                    <div className="prototype-grupo-card-search-label">
                      Nome, CPF ou Matrícula<span>*</span>
                    </div>
                    <div className="prototype-grupo-card-search-row">
                      <Controller
                        name="participanteBusca"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="p-inputtext p-component"
                            placeholder="Buscar por nome, CPF ou matrícula..."
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
                        name="filtroSetor"
                        control={control}
                        label="Setores"
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
                        name="filtroSubcategoria"
                        control={control}
                        label="Subcategoria"
                        cols="12 6 4"
                        options={grupoEleitoFiltroAvancadoOptions.subcategorias}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Selecionar subcategorias"
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
                      <MultiSelectFieldSeplag
                        name="filtroTipoVinculo"
                        control={control}
                        label="Tipo de Vínculo"
                        cols="12 6 4"
                        options={grupoEleitoFiltroAvancadoOptions.tiposVinculo}
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Selecionar Tipo de Vínculo"
                        getFormErrorMessage={() => null}
                      />
                      <div className="col-12 md:col-6 lg:col-8 prototype-grupo-inline-filter-actions">
                        <BotaoSeplag
                          type="button"
                          label="Aplicar Filtro"
                          icon="pi pi-filter"
                          style={{ height: 30, marginBottom: 0 }}
                        />
                        <BotaoLimparFiltroSeplag
                          type="button"
                          label="Limpar Filtro"
                          icon="pi pi-refresh"
                          style={{ height: 30, marginBottom: 0 }}
                          onClick={handleClearParticipanteFilters}
                        />
                      </div>
                    </div>
                  </details>

                  <PickListSeplag<GrupoEleitoParticipanteRow>
                    title=""
                    titleNaoSelecionados="Disponíveis"
                    titleSelecionados="Eleitos"
                    dataKey="id"
                    dataLabel="servidor"
                    filterBy="matricula,cpf,servidor"
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
