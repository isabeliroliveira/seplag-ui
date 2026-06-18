# Controle de Vagas - Visao Geral e Status de Implementacao

## 1. O que e a funcionalidade de Controle de Vagas

A funcionalidade de **Controle de Vagas** controla, valida e acompanha vagas autorizadas para cargos e funcoes dentro do SIGEP.

Ela funciona como uma camada anterior aos processos funcionais. Antes de uma pessoa ocupar uma vaga, o sistema passa a verificar se existe configuracao de controle, quadro autorizado, distribuicao, reserva, saldo disponivel e, quando aplicavel, vaga numerada.

Em termos simples, o modulo responde perguntas como:

- Este cargo ou funcao controla vaga?
- Existe quantidade autorizada para este cargo ou funcao?
- O orgao ou setor possui saldo?
- Quantas vagas estao ocupadas, reservadas ou disponiveis?
- Esta vaga pode ser ocupada agora?
- Quem ocupou esta vaga anteriormente?
- Qual evento funcional gerou ocupacao, liberacao ou alteracao de saldo?

## 2. Por que essa funcionalidade existe

O Controle de Vagas existe para dar rastreabilidade, seguranca e consistencia ao processo de provimento, movimentacao e ocupacao de cargos/funcoes.

Sem esse controle, o sistema pode permitir inconsistencias entre vagas autorizadas, vagas distribuidas, vagas reservadas e vagas ocupadas. Isso afeta nomeacoes, designacoes, movimentacoes, vacancias, exoneracoes e demais eventos funcionais.

Com essa funcionalidade, o SIGEP passa a ter uma base organizada para:

- Configurar quais cargos/funcoes controlam vagas.
- Definir criterios de compatibilidade.
- Cadastrar o quadro autorizado.
- Distribuir vagas por orgao/setor.
- Reservar vagas para processos futuros.
- Consultar saldo em uma data de referencia.
- Controlar vagas numeradas.
- Manter historico de ocupacao e movimentacao.
- Simular integracao com eventos funcionais.

## 3. Estrutura do modulo

O modulo foi organizado em etapas para evitar uma tela grande demais e permitir evolucao controlada do prototipo.

Etapas:

1. Configuracao de Controle de Vagas.
2. Quadro Autorizado de Vagas.
3. Distribuicao de Vagas.
4. Reserva de Vagas.
5. Consulta de Saldo de Vagas.
6. Vagas Numeradas.
7. Integracao com Ingresso/Eventos Funcionais.
8. Historico/Ocupacao de Vagas.

## 4. Status atual

### 4.1. Hub Controle de Vagas

Implementado.

Entrada principal:

`Cadastro > Cargo e Concurso > Controle de Vagas`

Rota:

`/prototipos/sigep/controle-vagas`

O hub exibe cards funcionais para:

- Configuracao.
- Quadro Autorizado.
- Vagas Numeradas.
- Consulta de Saldo.
- Integracao Funcional.
- Historico/Ocupacao.

### 4.2. Etapa 01 - Configuracao de Controle de Vagas

Implementada.

Objetivo:

Configurar se determinado cargo ou funcao controla vaga e quais criterios serao usados para validar compatibilidade antes da ocupacao.

Rotas:

- `/prototipos/sigep/controle-vagas/configuracao`
- `/prototipos/sigep/controle-vagas/configuracao/novo`
- `/prototipos/sigep/controle-vagas/configuracao/:id/editar`

Entregue:

- Listagem com filtros, botao Adicionar, tabela mockada, badges de situacao e acoes.
- Cadastro/edicao com abas Detalhes, Criterios de Compatibilidade e Historico.
- Regra visual: quando **Controla Vaga = Nao**, campos dependentes ficam desabilitados.
- Criterios mockados: Cargo/Funcao, Regime Juridico, Tipo de Vinculo, Orgao/Setor, Setores subordinados, Localidade, Especialidade e Jornada.
- Regra: Cargo/Funcao fica sempre marcado e bloqueado.
- Regra: Setores subordinados depende de Orgao/Setor.
- Historico mockado somente leitura.

### 4.3. Etapa 02 - Quadro Autorizado de Vagas

Implementada.

Objetivo:

Cadastrar o quantitativo autorizado de vagas para cargo ou funcao, vinculado a orgao/setor, situacao, vigencia e documentos legais.

Rotas:

- `/prototipos/sigep/controle-vagas/quadro-autorizado`
- `/prototipos/sigep/controle-vagas/quadro-autorizado/novo`
- `/prototipos/sigep/controle-vagas/quadro-autorizado/:id/editar`

Entregue:

- Listagem com filtros por cargo/funcao, orgao/setor, tipo e situacao.
- Tabela com quantidade autorizada, ocupada, reservada e disponivel.
- Cadastro/edicao com Dados Gerais.
- Abas funcionais para Distribuicoes, Reservas e Historico.
- Reuso do componente `SituacaoVigenciaSeplag`.
- Reuso do componente `DocumentosLegaisAssociadosSeplag`.

### 4.4. Etapa 03 - Distribuicao de Vagas

Implementada dentro do Quadro Autorizado.

Objetivo:

Distribuir a quantidade autorizada entre orgaos/setores e controlar o saldo por distribuicao.

Entregue:

- Resumo do quadro.
- Tabela de distribuicoes.
- Formulario para nova distribuicao.
- Calculo mockado de autorizado, distribuido, nao distribuido, ocupado, reservado e disponivel.
- Remocao de distribuicao com recomposicao do saldo.

Regra simulada:

`disponivel = distribuido - ocupado - reservado`

### 4.5. Etapa 04 - Reserva de Vagas

Implementada dentro do Quadro Autorizado.

Objetivo:

Reservar vagas para processos futuros, impedindo que o saldo reservado seja consumido por outras ocupacoes.

Entregue:

- Aba Reservas.
- Formulario de reserva.
- Tipos de reserva mockados.
- Tabela de reservas.
- Acoes de editar, cancelar e encerrar.
- Impacto da reserva no saldo do quadro e da distribuicao.
- Mocks com reservas ativas, canceladas e encerradas.

Campos:

- Tipo de reserva.
- Orgao/Setor.
- Quantidade.
- Motivo.
- Data de inicio.
- Data de fim.
- Situacao.
- Observacao.

### 4.6. Etapa 05 - Consulta de Saldo de Vagas

Implementada.

Objetivo:

Consultar o saldo de vagas em uma data de referencia, considerando quadro autorizado, distribuicoes, reservas e ocupacoes.

Rota:

`/prototipos/sigep/controle-vagas/consulta-saldo`

Entregue:

- Tela consultiva propria no hub.
- Filtros por data de referencia, cargo/funcao, orgao/setor, tipo e situacao.
- Cards de resumo.
- Abas/secoes de consulta por quadro e por distribuicao.
- Mocks derivados das etapas anteriores.
- Calculo atualizado usando reservas ativas.

Resumo exibido:

- Total autorizado.
- Total distribuido.
- Total nao distribuido.
- Total ocupado.
- Total reservado.
- Total disponivel.

### 4.7. Etapa 06 - Vagas Numeradas

Implementada.

Objetivo:

Controlar vagas individualizadas por numero/codigo proprio, permitindo rastrear qual vaga esta disponivel, ocupada, reservada, bloqueada, agendada ou extinta.

Rotas:

- `/prototipos/sigep/controle-vagas/vagas-numeradas`
- `/prototipos/sigep/controle-vagas/vagas-numeradas/novo`
- `/prototipos/sigep/controle-vagas/vagas-numeradas/:id/editar`

Entregue:

- Tela de consulta.
- Cadastro/edicao.
- Vinculo com quadro autorizado.
- Situacoes da vaga: Disponivel, Ocupada, Reservada, Bloqueada, Agendada e Extinta.
- Aba/area de ocupacao atual.
- Historico mockado da vaga.
- Validacao visual de compatibilidade com quadro, distribuicao e reserva.

### 4.8. Etapa 07 - Integracao com Ingresso/Eventos Funcionais

Implementada como simulacao.

Objetivo:

Simular como o Controle de Vagas sera consumido por processos funcionais, como ingresso, nomeacao, designacao, vacancia, exoneracao ou movimentacao.

Rota:

`/prototipos/sigep/controle-vagas/integracao`

Entregue:

- Card no hub Controle de Vagas.
- Tela de simulacao de evento funcional.
- Selecao de vaga numerada.
- Dados simulados de pessoa, CPF e tipo de vinculo.
- Acao **Validar Saldo**.
- Acao **Ocupar Vaga**.
- Acao **Liberar Vaga**.
- Bloqueio quando nao ha saldo disponivel.
- Bloqueio quando a vaga esta ocupada, bloqueada, extinta, agendada ou sem distribuicao compatavel.
- Recalculo local de saldo apos ocupacao/liberacao.
- Registro de eventos em historico local da simulacao.

Exemplo mockado para teste de bloqueio:

- `GG-001`: vaga vinculada a distribuicao sem saldo disponivel.

### 4.9. Etapa 08 - Historico/Ocupacao de Vagas

Implementada.

Objetivo:

Consultar a linha do tempo de ocupacoes, liberacoes, bloqueios, extincoes e demais eventos de vaga.

Rota:

`/prototipos/sigep/controle-vagas/historico`

Entregue:

- Tela consultiva propria no hub.
- Filtros mockados por periodo, cargo/funcao, vaga, evento, pessoa/vinculo e usuario.
- Cards de resumo.
- Tabela de eventos.
- Eventos mockados de ocupacao, ativacao, bloqueio, extincao e designacao.

## 5. Regras funcionais ja simuladas

### 5.1. Reserva impactando saldo

Implementado.

Reservas ativas sao consideradas no calculo do saldo disponivel da distribuicao.

Regra:

`disponivel = quantidade distribuida - vagas ocupadas - reservas ativas`

### 5.2. Vaga numerada respeitando quadro/distribuicao/reserva

Implementado como validacao visual e regra de integracao.

A vaga numerada verifica:

- Se possui quadro autorizado.
- Se o cargo/funcao da vaga e compativel com o quadro.
- Se existe distribuicao para o orgao/setor da vaga.
- Se vaga reservada possui reserva ativa correspondente.

### 5.3. Consulta de saldo refletindo alteracoes mockadas

Implementado.

A Consulta de Saldo usa os mocks de quadro, distribuicoes e reservas ativas para calcular os totais. A tela de Integracao tambem recalcula saldo localmente ao ocupar ou liberar uma vaga.

### 5.4. Integracao bloqueando operacao sem saldo

Implementado.

Ao tentar ocupar uma vaga sem saldo disponivel, a tela de Integracao registra evento bloqueado e nao altera a situacao da vaga.

## 6. O que ainda falta

O modulo esta prototipado, mas ainda faltam evolucoes para transformar a simulacao em fluxo real.

Pendencias principais:

- Integrar com backend real.
- Persistir configuracoes, quadros, distribuicoes, reservas, vagas e historicos.
- Consolidar historico real entre todas as etapas.
- Fazer a Consulta de Saldo consumir dados persistidos.
- Fazer eventos funcionais reais consumirem o servico de validacao de vagas.
- Definir regras finais de concorrencia para impedir duas ocupacoes simultaneas do mesmo saldo.
- Definir comportamento real para consumo de reserva.
- Definir mensagens oficiais de erro, alerta e sucesso.
- Criar testes automatizados de regra de saldo.
- Validar perfis de acesso e permissoes.

## 7. Rotas atuais para teste

Hub Controle de Vagas:

`http://localhost:5173/#/prototipos/sigep/controle-vagas`

Configuracao - Listagem:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/configuracao`

Configuracao - Novo:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/configuracao/novo`

Configuracao - Editar mock:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/configuracao/1/editar`

Quadro Autorizado - Listagem:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/quadro-autorizado`

Quadro Autorizado - Novo:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/quadro-autorizado/novo`

Quadro Autorizado - Editar mock:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/quadro-autorizado/1/editar`

Consulta de Saldo:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/consulta-saldo`

Vagas Numeradas - Listagem:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/vagas-numeradas`

Vagas Numeradas - Novo:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/vagas-numeradas/novo`

Vagas Numeradas - Editar mock:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/vagas-numeradas/1/editar`

Integracao Funcional:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/integracao`

Historico/Ocupacao:

`http://localhost:5173/#/prototipos/sigep/controle-vagas/historico`

## 8. Arquivos principais

Arquivos principais alterados:

- `src/App.tsx`
- `src/prototipos/PrototiposPage.tsx`
- `src/prototipos/prototipos.css`

Documento de status:

- `docs/controle-vagas-status-implementacao.md`

Componentes reaproveitados:

- `CardSeplag`
- `TablePaginadoSeplag`
- `TabsSeplag`
- `TextFieldSeplag`
- `DropdownFieldSeplag`
- `NumberFieldSeplag`
- `TextAreaFieldSeplag`
- `BotaoSeplag`
- `BotaoSalvarSeplag`
- `BotaoVoltarSeplag`
- `BotaoLimparFiltroSeplag`
- `BotaoIconSeplag`
- `SituacaoVigenciaSeplag`
- `DocumentosLegaisAssociadosSeplag`

## 9. Validacoes executadas

Validacoes executadas durante a implementacao:

- `npm run type-check`
- `npm run build`

## 10. Resumo executivo

O Controle de Vagas ja possui prototipo navegavel para configuracao, quadro autorizado, distribuicao, reserva, consulta de saldo, vagas numeradas, integracao funcional e historico/ocupacao.

O prototipo demonstra a regra central do modulo: cargos e funcoes so devem ser ocupados quando houver configuracao, quadro autorizado, distribuicao e saldo disponivel.

A proxima fase nao e mais criar as telas basicas, mas sim consolidar regras, persistencia, integracao real com eventos funcionais e testes automatizados.
