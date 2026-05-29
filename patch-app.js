const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

// Replace routes
app = app.replace(
  '        element={<PrototiposControleVagasConsultaSaldoPage />}\r\n      />\r\n      <Route\r\n        path="/prototipos/sigep/categoria"',
  `        element={<PrototiposControleVagasConsultaSaldoPage />}
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
const importRegex = /PrototiposControleVagasConsultaSaldoPage,([\r\n\s]+)\} from "\.\/prototipos\/PrototiposPage";/;
app = app.replace(
  importRegex,
  `PrototiposControleVagasConsultaSaldoPage,$1  PrototiposControleVagasVagasNumeradasPage,$1  PrototiposControleVagasVagasNumeradasFormPage,$1} from "./prototipos/PrototiposPage";`
);

fs.writeFileSync('src/App.tsx', app);
