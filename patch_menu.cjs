const fs = require('fs');
const file = 'src/prototipos/PrototiposPage.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  'path: "",\n    icon: "pi pi-history",\n    status: "Em breve"',
  'path: "/prototipos/sigep/controle-vagas/historico",\n    icon: "pi pi-history",\n    status: "Etapa 08"'
);

content = content.replace(
  'path: "",\r\n    icon: "pi pi-history",\r\n    status: "Em breve"',
  'path: "/prototipos/sigep/controle-vagas/historico",\r\n    icon: "pi pi-history",\r\n    status: "Etapa 08"'
);

fs.writeFileSync(file, content);
console.log('Done replacement');
