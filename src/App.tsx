import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import pkg from "../package.json";
import { DocsLayout, DocsRenderer } from "./docs/layout/DocsLayout";
import {
  PrototiposAnexarDocumentoPage,
  PrototiposAposentadoriaPage,
  PrototiposAuditoriaPage,
  PrototiposCategoriaPage,
  PrototiposCategoriaFormPage,
  PrototiposComponentesPage,
  PrototiposDocumentosVinculadosPage,
  PrototiposEstruturaOrganizacionalPage,
  PrototiposSituacaoVigenciaPage,
  PrototiposConformidadePage,
  PrototiposConsignadoPage,
  PrototiposContagemTempoPage,
  PrototiposESocialPage,
  PrototiposFolhaGrupoEleitoFormPage,
  PrototiposFolhaGrupoEleitosPage,
  PrototiposFolhaPenhoraJudicialPage,
  PrototiposFolhaCatalogoRubricasPage,
  PrototiposFolhaCatalogoRubricaViewPage,
  PrototiposFolhaPage,
  PrototiposPage,
  PrototiposPericiaPage,
  PrototiposSigepPage,
  PrototiposSigepRegimeJuridicoNovoPage,
  PrototiposSigepRegimeJuridicoPage,
} from "./prototipos/PrototiposPage";

function HomePage() {
  return (
    <div className="app-container">
      <div className="glow-1"></div>
      <div className="glow-2"></div>

      <nav className="main-nav">
        <div className="nav-content">
          <div className="logo-group">
            <span className="logo-seplag">SEPLAG</span>
          </div>
          <div className="nav-actions">
            <Link to="/docs" className="nav-link">
              Documentação →
            </Link>
            <Link to="/prototipos" className="nav-link">
              Protótipos →
            </Link>
            <div className="version-tag">v{pkg.version}</div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <section className="welcome-hero">
          <div className="visual-element">
            <div className="cube"></div>
          </div>
          <div className="text-element">
            <h1>A Linguagem Visual de Mato Grosso.</h1>
            <p>
              Importe, valide e experimente componentes padrão da{" "}
              <strong>SEPLAG</strong>. Garanta consistência e qualidade antes da
              publicação em produção.
            </p>
          </div>
        </section>

        <section className="status-grid">
          <div className="status-card current-pkg">
            <span className="card-label">Pacote Atual</span>
            <h3>{pkg.name}</h3>
            <span className="pkg-version">v{pkg.version}</span>
          </div>
          <div className="status-card registry-status">
            <span className="card-label">Registry</span>
            <div className="registry-info">
              <span className="status-dot online"></span>
              <h3>GIT LAB SEPLAG</h3>
            </div>
          </div>
          <div className="status-card quick-code">
            <span className="card-label">Uso Rápido</span>
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
        path="/prototipos/sigep/categoria"
        element={<PrototiposCategoriaPage />}
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
      <Route path="/prototipos/folha" element={<PrototiposFolhaPage />} />
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
        path="/prototipos/folha/grupo-eleitos/novo"
        element={<PrototiposFolhaGrupoEleitoFormPage />}
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
