const fs = require('fs');
let page = fs.readFileSync('src/prototipos/PrototiposPage.tsx', 'utf8');

const mocks = `
export interface ControleVagasVagaNumeradaRow {
  id: number;
  codigo: string;
  cargoFuncao: string;
  orgaoSetor: string;
  ocupanteAtual: string;
  situacao: string;
}

const controleVagasVagasNumeradasMock: ControleVagasVagaNumeradaRow[] = [
  {
    id: 1,
    codigo: "VA-001",
    cargoFuncao: "ANALISTA DE TI",
    orgaoSetor: "SEPLAG / STI",
    ocupanteAtual: "JOÃO DA SILVA",
    situacao: "Ocupada",
  },
  {
    id: 2,
    codigo: "VA-002",
    cargoFuncao: "ANALISTA DE TI",
    orgaoSetor: "SEPLAG / STI",
    ocupanteAtual: "-",
    situacao: "Disponível",
  },
  {
    id: 3,
    codigo: "VA-003",
    cargoFuncao: "TÉCNICO ADMINISTRATIVO",
    orgaoSetor: "SEDUC",
    ocupanteAtual: "-",
    situacao: "Reservada",
  },
  {
    id: 4,
    codigo: "VA-004",
    cargoFuncao: "ASSESSOR JURÍDICO",
    orgaoSetor: "PGE",
    ocupanteAtual: "-",
    situacao: "Bloqueada",
  },
];

export interface ControleVagasVagaNumeradaForm {
  codigo: string;
  cargoFuncao: string;
  orgaoSetor: string;
  situacao: string;
  observacao: string;
}

const controleVagasVagaNumeradaSituacaoOptions = [
  { label: "Disponível", value: "Disponível" },
  { label: "Ocupada", value: "Ocupada" },
  { label: "Reservada", value: "Reservada" },
  { label: "Bloqueada", value: "Bloqueada" },
  { label: "Agendada", value: "Agendada" },
  { label: "Extinta", value: "Extinta" },
];
`;

page = page.replace(
  /const controleVagasQuadroHistoricoMock: ControleVagasQuadroHistoricoRow\[\] = \[/,
  mocks + '\nconst controleVagasQuadroHistoricoMock: ControleVagasQuadroHistoricoRow[] = ['
);

fs.writeFileSync('src/prototipos/PrototiposPage.tsx', page);
