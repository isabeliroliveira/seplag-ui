const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Replace routes
app = app.replace(
  /element={<PrototiposControleVagasConsultaSaldoPage \/>}\s+\/>\s+<Route\s+path="\/prototipos\/sigep\/categoria"/,
  `element={<PrototiposControleVagasConsultaSaldoPage />}
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
        path="/prototipos/sigep/categoria"`
);

// Replace imports
const importRegex = /PrototiposControleVagasConsultaSaldoPage,\s+\} from "\.\/prototipos\/PrototiposPage";/;
app = app.replace(
  importRegex,
  `PrototiposControleVagasConsultaSaldoPage,
  PrototiposControleVagasVagasNumeradasPage,
  PrototiposControleVagasVagasNumeradasFormPage,
} from "./prototipos/PrototiposPage";`
);

fs.writeFileSync('src/App.tsx', app);
