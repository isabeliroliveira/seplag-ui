import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
import pkg from "../package.json";
import { DocsLayout, DocsRenderer } from "./docs/layout/DocsLayout";
import {
  PrototiposAnexarDocumentoPage,
  PrototiposAposentadoriaPage,
  PrototiposAuditoriaPage,
  PrototiposCargoFormPage,
  PrototiposCargoPage,
  PrototiposCargoTesteFormPage,
  PrototiposCargoTestePage,
  PrototiposCategoriaPage,
  PrototiposCategoriaFormPage,
  PrototiposCategoriaTesteFormPage,
  PrototiposCategoriaTestePage,
  PrototiposComponentesPage,
  PrototiposControleVagasConfiguracaoFormPage,
  PrototiposControleVagasPage,
  PrototiposControleVagasConfiguracaoPage,
  PrototiposControleVagasQuadroAutorizadoFormPage,
  PrototiposControleVagasQuadroAutorizadoPage,
  PrototiposControleVagasConsultaSaldoPage,
  PrototiposControleVagasVagasNumeradasPage,
  PrototiposControleVagasVagasNumeradasFormPage,
  PrototiposControleVagasHistoricoPage,
  PrototiposControleVagasIntegracaoPage,
  PrototiposDocumentosVinculadosPage,
  PrototiposEstruturaOrganizacionalPage,
  PrototiposSituacaoVigenciaPage,
  PrototiposConformidadePage,
  PrototiposConsignadoPage,
  PrototiposContagemTempoPage,
  PrototiposESocialPage,
  PrototiposFolhaGrupoEleitoFormPage,
  PrototiposFolhaGrupoEleitosPage,
  PrototiposFolhaGrupoCalculoFormPage,
  PrototiposFolhaGruposCalculoPage,
  PrototiposFolhaCompetenciasPage,
  PrototiposFolhaCronogramaPage,
  PrototiposFolhaFichaFinanceiraPage,
  PrototiposFolhaPagamentoFormPage,
  PrototiposFolhaPagamentoLogPage,
  PrototiposFolhaPagamentoPage,
  PrototiposFolhaProcessamentoFormPage,
  PrototiposFolhaSolicitacoesAjustesPage,
  PrototiposFolhaTabelaReferenciaVigenciaFormPage,
  PrototiposFolhaTabelasReferenciaPage,
  PrototiposFolhaConformidadePage,
  PrototiposFolhaPenhoraJudicialPage,
  PrototiposFolhaCatalogoRubricasPage,
  PrototiposFolhaCatalogoRubricaViewPage,
  PrototiposFolhaPage,
  PrototiposMatrizValidacaoTesteFormPage,
  PrototiposMatrizValidacaoTestePage,
  PrototiposPage,
  PrototiposPericiaPage,
  PrototiposSigepPage,
  PrototiposSigepRegimeJuridicoNovoPage,
  PrototiposSigepRegimeJuridicoPage,
  PrototiposSigepRegimeJuridicoTesteNovoPage,
  PrototiposSigepRegimeJuridicoTestePage,
  PrototiposTipoVinculoTesteFormPage,
  PrototiposTipoVinculoTestePage,
} from "./prototipos/PrototiposPage";

function HomePage() {
  const sistemas = [
    {
      sigla: "SIGEP",
      titulo: "Gestao de Pessoas",
      descricao: "Protótipos de cadastro, cargos, regime jurídico, categorias e componentes reutilizáveis.",
      status: "Em prototipação",
      to: "/prototipos/sigep",
      links: [
        { label: "Categoria", to: "/prototipos/sigep/categoria" },
        { label: "Cargo", to: "/prototipos/sigep/cargo" },
        { label: "Regime Jurídico", to: "/prototipos/sigep/regime-juridico" },
        { label: "Controle de Vagas", to: "/prototipos/sigep/controle-vagas" },
        { label: "Componentes", to: "/prototipos/sigep/componentes" },
      ],
    },
    {
      sigla: "FOLHA",
      titulo: "Folha de Pagamento",
      descricao: "Protótipos para grupos de cálculo, folhas por competência, rubricas e cálculos.",
      status: "Em evolução",
      to: "/prototipos/folha",
      links: [
        { label: "Competências da Folha", to: "/prototipos/folha/processamento/competencias" },
        { label: "Processamento da Folha", to: "/prototipos/folha/processamento/processamento-folha" },
        { label: "Folha de Pagamento", to: "/prototipos/folha/processamento/folha-pagamento" },
        { label: "Grupo de Eleitos", to: "/prototipos/folha/grupo-eleitos" },
        { label: "Grupos de Cálculo", to: "/prototipos/folha/grupos-calculo" },
        { label: "Catálogo de Rubricas", to: "/prototipos/folha/catalogo-rubricas" },
      ],
    },
    {
      sigla: "GERAL",
      titulo: "Demais Protótipos",
      descricao: "Atalhos para estudos de perícia, consignado, eSocial, auditoria e conformidade.",
      status: "Mapa geral",
      to: "/prototipos",
      links: [
        { label: "Todos os protótipos", to: "/prototipos" },
        { label: "Documentação", to: "/docs" },
      ],
    },
  ];

  const versoes = [
    {
      versao: "0.0.7",
      titulo: "Biblioteca ativa",
      descricao: "Versão usada hoje pelo projeto em src/componentes.",
    },
    {
      versao: "0.0.18",
      titulo: "Referência de desenvolvimento",
      descricao: "Versão externa armazenada em bibliotecas-seplag para consulta e migração.",
    },
  ];

  return (
    <div className="app-container">
      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo-group">
            <span className="logo-seplag">SEPLAG</span>
            <span className="logo-divider">/</span>
            <span className="logo-ds">Portal UI</span>
          </div>
          <div className="nav-actions">
            <Link to="/docs" className="nav-link">
              Documentação
            </Link>
            <Link to="/prototipos" className="nav-link">
              Protótipos
            </Link>
            <div className="version-tag">v{pkg.version}</div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="portal-hero">
          <div className="portal-hero-copy">
            <span className="kicker">Ambiente de protótipos e componentes</span>
            <h1>Portal SEPLAG UI</h1>
            <p>
              Centralize protótipos por sistema, acompanhe versões da biblioteca
              visual e acesse rapidamente as telas em construção.
            </p>
            <div className="action-buttons">
              <Link to="/prototipos" className="btn-primary">
                Abrir protótipos
              </Link>
              <Link to="/docs" className="btn-secondary">
                Ver documentação
              </Link>
            </div>
          </div>
          <div className="portal-summary" aria-label="Resumo do portal">
            <div>
              <strong>2</strong>
              <span>Sistemas ativos</span>
            </div>
            <div>
              <strong>2</strong>
              <span>Versões mapeadas</span>
            </div>
            <div>
              <strong>+10</strong>
              <span>Protótipos</span>
            </div>
          </div>
        </section>

        <section className="home-section" aria-labelledby="sistemas-title">
          <div className="section-heading">
            <span className="card-label">Sistemas</span>
            <h2 id="sistemas-title">Protótipos por sistema</h2>
          </div>
          <div className="systems-grid">
            {sistemas.map((sistema) => (
              <article className="system-card" key={sistema.sigla}>
                <div className="system-card-header">
                  <span className="system-code">{sistema.sigla}</span>
                  <span className="system-status">{sistema.status}</span>
                </div>
                <h3>{sistema.titulo}</h3>
                <p>{sistema.descricao}</p>
                <div className="system-links">
                  {sistema.links.map((link) => (
                    <Link key={link.to} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
                <Link to={sistema.to} className="card-action">
                  Abrir área
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="home-section home-two-columns">
          <div className="library-panel">
            <div className="section-heading">
              <span className="card-label">Bibliotecas</span>
              <h2>Versões disponíveis</h2>
            </div>
            <div className="version-list">
              {versoes.map((item) => (
                <div className="version-card" key={item.versao}>
                  <span className="version-number">v{item.versao}</span>
                  <div>
                    <strong>{item.titulo}</strong>
                    <p>{item.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="library-panel package-panel">
            <div className="section-heading">
              <span className="card-label">Pacote atual</span>
              <h2>{pkg.name}</h2>
            </div>
            <p>
              A versão ativa continua em <strong>src/componentes</strong>. As
              pastas em <strong>bibliotecas-seplag</strong> servem como acervo
              para comparação e migração futura.
            </p>
            <code>npm install @seplag/ui-lib-react-18</code>
          </div>
        </section>
      </main>

      <footer className="main-footer">
        <p>
          Desenvolvido pela Coordenadoria de Desenvolvimento de Soluções de TI -
          SEPLAG-MT.
        </p>
        <p>© {new Date().getFullYear()} Governo do Estado de Mato Grosso</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/prototipos" element={<PrototiposPage />} />
      <Route path="/prototipos/sigep" element={<PrototiposSigepPage />} />
      <Route
        path="/prototipos/sigep/componentes"
        element={<PrototiposComponentesPage />}
      />
      <Route
        path="/prototipos/sigep/componentes/situacao-vigencia"
        element={<PrototiposSituacaoVigenciaPage />}
      />
      <Route
        path="/prototipos/sigep/componentes/documentos-vinculados"
        element={<PrototiposDocumentosVinculadosPage />}
      />
      <Route
        path="/prototipos/sigep/componentes/anexar-documento"
        element={<PrototiposAnexarDocumentoPage />}
      />
      <Route
        path="/prototipos/sigep/componentes/estrutura-organizacional"
        element={<PrototiposEstruturaOrganizacionalPage />}
      />
      <Route
        path="/prototipos/sigep/regime-juridico"
        element={<PrototiposSigepRegimeJuridicoPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas"
        element={<PrototiposControleVagasPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/configuracao"
        element={<PrototiposControleVagasConfiguracaoPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/configuracao/novo"
        element={<PrototiposControleVagasConfiguracaoFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/configuracao/:id/editar"
        element={<PrototiposControleVagasConfiguracaoFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/quadro-autorizado"
        element={<PrototiposControleVagasQuadroAutorizadoPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/quadro-autorizado/novo"
        element={<PrototiposControleVagasQuadroAutorizadoFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/quadro-autorizado/:id/editar"
        element={<PrototiposControleVagasQuadroAutorizadoFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/consulta-saldo"
        element={<PrototiposControleVagasConsultaSaldoPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/vagas-numeradas"
        element={<PrototiposControleVagasVagasNumeradasPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/vagas-numeradas/novo"
        element={<PrototiposControleVagasVagasNumeradasFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar"
        element={<PrototiposControleVagasVagasNumeradasFormPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/historico"
        element={<PrototiposControleVagasHistoricoPage />}
      />
      <Route
        path="/prototipos/sigep/controle-vagas/integracao"
        element={<PrototiposControleVagasIntegracaoPage />}
      />
      <Route
        path="/prototipos/sigep/categoria"
        element={<PrototiposCategoriaPage />}
      />
      <Route
        path="/prototipos/sigep/cargo"
        element={<PrototiposCargoPage />}
      />
      <Route
        path="/prototipos/sigep/cargo/novo"
        element={<PrototiposCargoFormPage />}
      />
      <Route
        path="/prototipos/sigep/categoria/novo"
        element={<PrototiposCategoriaFormPage />}
      />
      <Route
        path="/prototipos/sigep/categoria/:id/editar"
        element={<PrototiposCategoriaFormPage />}
      />
      <Route
        path="/prototipos/sigep/regime-juridico/novo"
        element={<PrototiposSigepRegimeJuridicoNovoPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/regime-juridico"
        element={<PrototiposSigepRegimeJuridicoTestePage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/regime-juridico/novo"
        element={<PrototiposSigepRegimeJuridicoTesteNovoPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/regime-juridico/:id/editar"
        element={<PrototiposSigepRegimeJuridicoTesteNovoPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/categoria"
        element={<PrototiposCategoriaTestePage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/categoria/novo"
        element={<PrototiposCategoriaTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/categoria/:id/editar"
        element={<PrototiposCategoriaTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/cargo"
        element={<PrototiposCargoTestePage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/cargo/novo"
        element={<PrototiposCargoTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/cargo/:id/editar"
        element={<PrototiposCargoTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/tipo-vinculo"
        element={<PrototiposTipoVinculoTestePage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/tipo-vinculo/novo"
        element={<PrototiposTipoVinculoTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/tipo-vinculo/:id/editar"
        element={<PrototiposTipoVinculoTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/matriz-validacao"
        element={<PrototiposMatrizValidacaoTestePage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/matriz-validacao/novo"
        element={<PrototiposMatrizValidacaoTesteFormPage />}
      />
      <Route
        path="/prototipos/sigep/cargo-concurso-teste/matriz-validacao/:id/editar"
        element={<PrototiposMatrizValidacaoTesteFormPage />}
      />
      <Route path="/prototipos/folha" element={<PrototiposFolhaPage />} />
      <Route
        path="/prototipos/folha/cronograma"
        element={<PrototiposFolhaCronogramaPage />}
      />
      <Route
        path="/prototipos/folha/processamento/competencias"
        element={<PrototiposFolhaCompetenciasPage />}
      />
      <Route
        path="/prototipos/folha/processamento/folha-pagamento"
        element={<PrototiposFolhaPagamentoPage />}
      />
      <Route
        path="/prototipos/folha/processamento/processamento-folha"
        element={
          <PrototiposFolhaPagamentoPage
            title="Processamento da Folha"
            variant="processamento"
          />
        }
      />
      <Route
        path="/prototipos/folha/processamento/processamento-folha/novo"
        element={<PrototiposFolhaProcessamentoFormPage />}
      />
      <Route
        path="/prototipos/folha/processamento/solicitacoes-ajustes"
        element={<PrototiposFolhaSolicitacoesAjustesPage />}
      />
      <Route
        path="/prototipos/folha/processamento/folha-pagamento/novo"
        element={<PrototiposFolhaPagamentoFormPage />}
      />
      <Route
        path="/prototipos/folha/processamento/folha-pagamento/:id/editar"
        element={<PrototiposFolhaPagamentoFormPage />}
      />
      <Route
        path="/prototipos/folha/processamento/folha-pagamento/execucoes/:execucaoId/log"
        element={<PrototiposFolhaPagamentoLogPage />}
      />
      <Route
        path="/prototipos/folha/grupos-folha"
        element={<Navigate to="/prototipos/folha/grupos-calculo" replace />}
      />
      <Route
        path="/prototipos/folha/grupos-folha/novo"
        element={<Navigate to="/prototipos/folha/grupos-calculo/novo" replace />}
      />
      <Route
        path="/prototipos/folha/grupos-folha/:id/editar"
        element={<Navigate to="/prototipos/folha/grupos-calculo" replace />}
      />
      <Route
        path="/prototipos/folha/catalogo-rubricas"
        element={<PrototiposFolhaCatalogoRubricasPage />}
      />
      <Route
        path="/prototipos/folha/catalogo-rubricas/:id"
        element={<PrototiposFolhaCatalogoRubricaViewPage />}
      />
      <Route
        path="/prototipos/folha/grupo-eleitos"
        element={<PrototiposFolhaGrupoEleitosPage />}
      />
      <Route
        path="/prototipos/folha/tabelas-referencia"
        element={<PrototiposFolhaTabelasReferenciaPage />}
      />
      <Route
        path="/prototipos/folha/tabelas-referencia/:tabelaId/vigencias/novo"
        element={<PrototiposFolhaTabelaReferenciaVigenciaFormPage />}
      />
      <Route
        path="/prototipos/folha/tabelas-referencia/:tabelaId/vigencias/:vigenciaId/editar"
        element={<PrototiposFolhaTabelaReferenciaVigenciaFormPage />}
      />
      <Route
        path="/prototipos/folha/relatorios/conformidade"
        element={<PrototiposFolhaConformidadePage />}
      />
      <Route
        path="/prototipos/folha/lancamento-financeiro/ficha-financeira"
        element={<PrototiposFolhaFichaFinanceiraPage />}
      />
      <Route
        path="/prototipos/folha/grupo-eleitos/novo"
        element={<PrototiposFolhaGrupoEleitoFormPage />}
      />
      <Route
        path="/prototipos/folha/grupos-calculo"
        element={<PrototiposFolhaGruposCalculoPage />}
      />
      <Route
        path="/prototipos/folha/grupos-calculo/novo"
        element={<PrototiposFolhaGrupoCalculoFormPage />}
      />
      <Route
        path="/prototipos/folha/grupos-calculo/:id/editar"
        element={<PrototiposFolhaGrupoCalculoFormPage />}
      />
      <Route
        path="/prototipos/folha/penhora-judicial"
        element={<PrototiposFolhaPenhoraJudicialPage />}
      />
      <Route path="/prototipos/pericia" element={<PrototiposPericiaPage />} />
      <Route
        path="/prototipos/consignado"
        element={<PrototiposConsignadoPage />}
      />
      <Route
        path="/prototipos/contagem-tempo"
        element={<PrototiposContagemTempoPage />}
      />
      <Route path="/prototipos/e-social" element={<PrototiposESocialPage />} />
      <Route
        path="/prototipos/aposentadoria"
        element={<PrototiposAposentadoriaPage />}
      />
      <Route
        path="/prototipos/conformidade"
        element={<PrototiposConformidadePage />}
      />
      <Route path="/prototipos/auditoria" element={<PrototiposAuditoriaPage />} />
      <Route path="/docs" element={<DocsLayout />}>
        <Route path=":id" element={<DocsRenderer />} />
        <Route index element={<DocsRenderer />} />
      </Route>
    </Routes>
  );
}

export default App;
