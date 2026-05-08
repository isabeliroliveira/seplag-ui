import { Link, useNavigate } from "react-router-dom";
import { useMemo, type ReactNode, useCallback } from "react";
import { useForm } from "react-hook-form";
import { CardSeplag } from "@componentes/Card";
import { LayoutSeplag } from "@componentes/layout/layout/Layout";
import type { IMenuSeplag, IVinculoSeplag } from "@componentes/layout/Config/menu";
import type { AppSystemItemSeplag } from "@componentes/layout/AppSwitcher";
import {
  TextFieldSeplag,
  DropdownFieldSeplag,
  RadioButtonFieldSeplag,
  DateFieldSeplag,
  TextAreaFieldSeplag,
  MultiSelectFieldSeplag,
} from "@componentes/Fields";
import { BotaoSeplag, BotaoSalvarSeplag, BotaoVoltarSeplag } from "@componentes/Botao";
import { StatusByFilterChipSeplag } from "@componentes/StatusByFilterChip/StatusByFilterChip";
import { TablePaginadoSeplag, type ColumnMetaSeplag } from "@componentes/TablePaginado";
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
          { label: "Categoria", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
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
    items: [{ label: "Solicitação de Rubrica", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true }],
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
      { label: "Grupo Eleitos", icon: "pi pi-circle-on", url: "#", visibleOnMenu: true, visibleOnRouter: true },
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

interface RegimeJuridicoFilterFormValues {
  nome: string;
  situacao: string | null;
}

interface RegimeJuridicoItem {
  id: number;
  nome: string;
  situacao: string;
}

const regimeJuridicoSituacoes = [
  { label: "Ativo", value: "Ativo" },
  { label: "Encerrado", value: "Encerrado" },
  { label: "Agendado", value: "Agendado" },
  { label: "Extinto", value: "Extinto" },
];

const regimeJuridicoBaseLegalOptions = [
  { label: "Lei de Pessoal", value: "lei_pessoal" },
  { label: "Decreto Municipal", value: "decreto_municipal" },
  { label: "Portaria Interna", value: "portaria_interna" },
];

const regimeJuridicoInstituicoesOptions = [
  { label: "Instituição A", value: "instituicao_a" },
  { label: "Instituição B", value: "instituicao_b" },
  { label: "Instituição C", value: "instituicao_c" },
];

const regimeJuridicoOrgaosOptions = [
  { label: "Órgão X", value: "orgao_x" },
  { label: "Órgão Y", value: "orgao_y" },
  { label: "Órgão Z", value: "orgao_z" },
];

const regimeJuridicoData: RegimeJuridicoItem[] = [
  { id: 1, nome: "Regime Público Estatutário", situacao: "Ativo" },
  { id: 2, nome: "Regime Celetista Especial", situacao: "Encerrado" },
  { id: 3, nome: "Regime Jurídico Transitório", situacao: "Agendado" },
  { id: 4, nome: "Regime de Contrato Temporário", situacao: "Extinto" },
  { id: 5, nome: "Regime Administrativo Comum", situacao: "Ativo" },
];

export function PrototiposSigepRegimeJuridicoPage() {
  const navigate = useNavigate();
  const { control, watch, reset } = useForm<RegimeJuridicoFilterFormValues>({
    defaultValues: {
      nome: "",
      situacao: null,
    },
  });

  const watchedValues = watch();

  const filteredData = useMemo(
    () =>
      regimeJuridicoData.filter((item) => {
        const nomeMatch = item.nome
          .toLowerCase()
          .includes((watchedValues.nome ?? "").toLowerCase());
        const situacaoMatch =
          !watchedValues.situacao || item.situacao === watchedValues.situacao;
        return nomeMatch && situacaoMatch;
      }),
    [watchedValues.nome, watchedValues.situacao],
  );

  const data: ResultsSeplag<RegimeJuridicoItem> = {
    content: filteredData,
    pageable: undefined as any,
    last: true,
    totalPages: 1,
    pageActual: 0,
    sizePage: filteredData.length,
    totalRecords: filteredData.length,
    size: filteredData.length,
    number: 0,
    sort: undefined as any,
    first: true,
    numberOfElements: filteredData.length,
    empty: filteredData.length === 0,
  };

  const columns: ColumnMetaSeplag<RegimeJuridicoItem>[] = [
    { header: "Nome", field: "nome" },
    {
      header: "Situação",
      body: (row) => <StatusByFilterChipSeplag descStatus={row.situacao} />,
    },
  ];

  const handleClearFilter = useCallback(() => {
    reset({ nome: "", situacao: null });
  }, [reset]);

  const handleAdd = useCallback(() => {
    navigate("/prototipos/sigep/regime-juridico/novo");
  }, [navigate]);

  const handleView = useCallback((row: RegimeJuridicoItem) => {
    alert(`Visualizar: ${row.nome}`);
  }, []);

  const handleEdit = useCallback((row: RegimeJuridicoItem) => {
    alert(`Editar: ${row.nome}`);
  }, []);

  const handleDelete = useCallback((row: RegimeJuridicoItem) => {
    alert(`Excluir: ${row.nome}`);
  }, []);

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <div className="regime-juridico-header">
          <h2>Regime Jurídico</h2>
        </div>
        <div className="regime-juridico-filters">
          <div className="regime-juridico-filter-input">
            <TextFieldSeplag
              name="nome"
              control={control}
              label="Nome"
              cols="12"
              placeholder="Filtro"
              getFormErrorMessage={() => null}
            />
          </div>
          <div className="regime-juridico-filter-right">
            <DropdownFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12"
              options={regimeJuridicoSituacoes}
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione situação"
              showClear
              getFormErrorMessage={() => null}
            />
            <div className="regime-juridico-actions">
              <BotaoSeplag
                label="Limpar filtro"
                icon="pi pi-refresh"
                iconPos="left"
                onClick={handleClearFilter}
              />
            </div>
          </div>
        </div>
        <div className="regime-juridico-table">
          <TablePaginadoSeplag
            data={data}
            rows={10}
            columns={columns}
            hasEventoAcao
            handleAdicionar={handleAdd}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleOnPageChange={() => undefined}
            paginator={false}
            lazy={false}
          />
        </div>
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

interface RegimeJuridicoFormValues {
  nome: string;
  baseLegal: string | null;
  instituicoes: string[];
  orgaos: string[];
  situacao: string | null;
  inicioVigencia: string | undefined;
  dataExtincao: string | undefined;
  dataEncerramento: string | undefined;
  motivoExtincao: string;
  motivoEncerramento: string;
}

export function PrototiposSigepRegimeJuridicoNovoPage() {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm<RegimeJuridicoFormValues>({
    defaultValues: {
      nome: "",
      baseLegal: null,
      instituicoes: [],
      orgaos: [],
      situacao: null,
      inicioVigencia: undefined,
      dataExtincao: undefined,
      dataEncerramento: undefined,
      motivoExtincao: "",
      motivoEncerramento: "",
    },
  });

  const situacao = watch("situacao");
  const isExtinto = situacao === "Extinto";
  const isEncerrado = situacao === "Encerrado";

  const handleCancel = useCallback(() => {
    navigate("/prototipos/sigep/regime-juridico");
  }, [navigate]);

  const handleSave = useCallback(
    (values: RegimeJuridicoFormValues) => {
      alert(
        `Regime Jurídico cadastrado:\nNome: ${values.nome}\nBase Legal: ${values.baseLegal}\nInstituições: ${values.instituicoes.join(", ")}\nÓrgãos: ${values.orgaos.join(", ")}\nSituação: ${values.situacao}\nInício de Vigência: ${values.inicioVigencia}\nData de Extinção: ${values.dataExtincao || "-"}\nData de Encerramento: ${values.dataEncerramento || "-"}\nMotivo da Extinção: ${values.motivoExtincao}\nMotivo do Encerramento: ${values.motivoEncerramento}`,
      );
      navigate("/prototipos/sigep/regime-juridico");
    },
    [navigate],
  );

  const getFormErrorMessage = () => null;

  return (
    <PrototypeSystemPage
      nomeSistema="GESTÃO DE PESSOAS"
      ambienteSistema="Teste"
      menuItems={menuGestaoPessoas}
    >
      <div className="prototype-page-content">
        <div className="regime-juridico-form-header">
          <h2>Novo Regime Jurídico</h2>
          <p>Preencha os dados abaixo para cadastrar um novo regime jurídico.</p>
        </div>
        <div className="regime-juridico-form-card">
          <form onSubmit={handleSubmit(handleSave)} className="regime-juridico-form">
            <TextFieldSeplag
              name="nome"
              control={control}
              label="Nome"
              cols="12"
              required
              maxLength={150}
              placeholder="Informe o nome do regime jurídico"
              getFormErrorMessage={getFormErrorMessage}
            />
            <DropdownFieldSeplag
              name="baseLegal"
              control={control}
              label="Base Legal"
              cols="12"
              required
              options={regimeJuridicoBaseLegalOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione base legal"
              showClear={false}
              getFormErrorMessage={getFormErrorMessage}
            />
            <MultiSelectFieldSeplag
              name="instituicoes"
              control={control}
              label="Instituições"
              cols="12"
              required
              options={regimeJuridicoInstituicoesOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione instituições"
              getFormErrorMessage={getFormErrorMessage}
            />
            <MultiSelectFieldSeplag
              name="orgaos"
              control={control}
              label="Órgãos"
              cols="12"
              required
              options={regimeJuridicoOrgaosOptions}
              optionLabel="label"
              optionValue="value"
              placeholder="Selecione órgãos"
              getFormErrorMessage={getFormErrorMessage}
            />
            <RadioButtonFieldSeplag
              name="situacao"
              control={control}
              label="Situação"
              cols="12"
              required
              options={regimeJuridicoSituacoes}
              getFormErrorMessage={getFormErrorMessage}
            />
            <DateFieldSeplag
              name="inicioVigencia"
              control={control}
              label="Início de Vigência"
              cols="12"
              required
              placeholder="dd/mm/aaaa"
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              getFormErrorMessage={getFormErrorMessage}
            />
            <DateFieldSeplag
              name="dataExtincao"
              control={control}
              label="Data de Extinção"
              cols="12"
              required={isExtinto}
              visible={isExtinto}
              shouldUnregister
              placeholder="dd/mm/aaaa"
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              validateAfterDate={watch("inicioVigencia")}
              validateAfterMessage="Data de Extinção deve ser maior ou igual à Data de Início"
              getFormErrorMessage={getFormErrorMessage}
            />
            <DateFieldSeplag
              name="dataEncerramento"
              control={control}
              label="Data de Encerramento"
              cols="12"
              required={isEncerrado}
              visible={isEncerrado}
              shouldUnregister
              placeholder="dd/mm/aaaa"
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              validateAfterDate={watch("inicioVigencia")}
              validateAfterMessage="Data de Encerramento deve ser maior ou igual à Data de Início"
              getFormErrorMessage={getFormErrorMessage}
            />
            <TextAreaFieldSeplag
              name="motivoExtincao"
              control={control}
              label="Motivo da Extinção"
              cols="12"
              required={isExtinto}
              visible={isExtinto}
              getFormErrorMessage={getFormErrorMessage}
              maxLength={500}
              placeholder="Descreva o motivo da extinção"
            />
            <TextAreaFieldSeplag
              name="motivoEncerramento"
              control={control}
              label="Motivo do Encerramento"
              cols="12"
              required={isEncerrado}
              visible={isEncerrado}
              getFormErrorMessage={getFormErrorMessage}
              maxLength={500}
              placeholder="Descreva o motivo do encerramento"
            />
            <div className="regime-juridico-form-actions">
              <BotaoVoltarSeplag type="button" onClick={handleCancel} />
              <BotaoSalvarSeplag type="submit" />
            </div>
          </form>
        </div>
      </div>
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
