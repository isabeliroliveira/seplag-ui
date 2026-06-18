const fs = require('fs');
let doc = fs.readFileSync('docs/controle-vagas-status-implementacao.md', 'utf8');
doc = doc.replace(
  /### 5\.1\. Etapa 06 - Vagas Numeradas([\s\S]*?)### 5\.2\. Etapa 08/,
  `### 4.7. Etapa 06 - Vagas Numeradas\n\nEsta etapa foi implementada.\n\nObjetivo:\nControlar vagas individualizadas por numero/codigo proprio.\n\nO que foi feito:\n- Criada tela de consulta (\`/prototipos/sigep/controle-vagas/vagas-numeradas\`).\n- Criada tela de cadastro/edicao.\n- Adicionadas situacoes da vaga: Disponivel, Ocupada, Reservada, Bloqueada, Agendada, Extinta.\n- Adicionadas abas de ocupacao atual e historico.\n\n### 5.1. Etapa 08`
);
fs.writeFileSync('docs/controle-vagas-status-implementacao.md', doc);
