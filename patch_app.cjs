const fs = require('fs');
const file = 'src/App.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import
content = content.replace(
  'PrototiposControleVagasVagasNumeradasFormPage,',
  'PrototiposControleVagasVagasNumeradasFormPage,\n  PrototiposControleVagasHistoricoPage,'
);

// Add Route
content = content.replace(
  '<Route\n        path="/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar"\n        element={<PrototiposControleVagasVagasNumeradasFormPage />}\n      />',
  '<Route\n        path="/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar"\n        element={<PrototiposControleVagasVagasNumeradasFormPage />}\n      />\n      <Route\n        path="/prototipos/sigep/controle-vagas/historico"\n        element={<PrototiposControleVagasHistoricoPage />}\n      />'
);

// Fallback for different line endings
content = content.replace(
  '<Route\r\n        path="/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar"\r\n        element={<PrototiposControleVagasVagasNumeradasFormPage />}\r\n      />',
  '<Route\r\n        path="/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar"\r\n        element={<PrototiposControleVagasVagasNumeradasFormPage />}\r\n      />\r\n      <Route\r\n        path="/prototipos/sigep/controle-vagas/historico"\r\n        element={<PrototiposControleVagasHistoricoPage />}\r\n      />'
);

fs.writeFileSync(file, content);
console.log('App.tsx updated');
