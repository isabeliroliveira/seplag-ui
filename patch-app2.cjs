const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

app = app.replace(
  /PrototiposControleVagasConsultaSaldoPage,/,
  `PrototiposControleVagasConsultaSaldoPage,
  PrototiposControleVagasVagasNumeradasPage,
  PrototiposControleVagasVagasNumeradasFormPage,`
);

fs.writeFileSync('src/App.tsx', app);
