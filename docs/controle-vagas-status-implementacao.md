# Controle de Vagas - Visao Geral e Status de Implementacao

## 1. O que e a funcionalidade de Controle de Vagas

A funcionalidade de **Controle de Vagas** tem como objetivo controlar, validar e acompanhar a quantidade de vagas autorizadas para cargos e funcoes dentro do SIGEP.

Ela funciona como uma camada de controle antes da ocupacao de uma vaga por um vinculo funcional. Em vez de permitir que uma pessoa seja vinculada a qualquer cargo ou funcao sem validacao estruturada, o sistema passa a verificar se existe uma configuracao de controle, se ha quadro autorizado, se existe saldo disponivel, se a vaga esta distribuida para o orgao/setor correto e, futuramente, se existe uma vaga numerada ou reserva associada.

Em termos simples, o modulo responde perguntas como:

- Este cargo ou funcao controla vaga?
- Existe quantidade autorizada para este cargo ou funcao?
- O orgao ou setor possui saldo?
- Ha vagas ocupadas, reservadas ou disponiveis?
- Esta vaga pode ser ocupada agora?
- Quem ocupou esta vaga anteriormente?
- Qual evento funcional gerou a ocupacao, liberacao ou alteracao do saldo?

## 2. Por que essa funcionalidade existe

O Controle de Vagas existe para dar rastreabilidade, seguranca e consistencia ao processo de provimento, movimentacao e ocupacao de cargos/funcoes.

Sem esse controle, o sistema pode ter dificuldade para responder se uma nomeacao, designacao, remocao, cessao, vacancia ou outro evento funcional respeita o quantitativo autorizado. Isso gera risco de inconsistencia entre vagas autorizadas, vagas ocupadas e vagas disponiveis.

Com essa funcionalidade, o SIGEP passa a ter uma base organizada para:

- Configurar quais cargos/funcoes controlam vagas.
- Definir os criterios usados para validar compatibilidade.
- Cadastrar o quadro autorizado de vagas.
- Distribuir vagas por orgao/setor.
- Reservar vagas para processos futuros.
- Consultar saldo em uma data de referencia.
- Controlar vagas numeradas quando necessario.
- Manter historico completo de ocupacao e movimentacao.
- Integrar a validacao de vaga com eventos funcionais.

## 3. Estrutura planejada do modulo

O modulo foi organizado em etapas para evitar uma tela grande demais e para permitir evolucao controlada do prototipo.

As etapas planejadas sao:

1. Configuracao de Controle de Vagas.
2. Quadro Autorizado de Vagas.
3. Distribuicao de Vagas.
4. Reserva de Vagas.
5. Consulta de Saldo de Vagas.
6. Vagas Numeradas.
7. Historico/Ocupacao de Vagas.
8. Integracao com Ingresso/Eventos Funcionais.

Observacao: a etapa de integracao deve ficar por ultimo, porque depende das regras e estruturas das etapas anteriores.

## 4. O que ja foi implementado

### 4.1. Hub Controle de Vagas

Foi criada a entrada principal do modulo em:

`Cadastro > Cargo e Concurso > Controle de Vagas`

Ao clicar em Controle de Vagas, o sistema exibe uma pagina de hub com cards para as areas do modulo.

Cards planejados/exibidos:

- Configuracao.
- Quadro Autorizado.
- Vagas Numeradas.
- Consulta de Saldo.
- Historico/Ocupacao.

Atualmente os cards funcionais sao:

- Configuracao.
- Quadro Autorizado.

Os demais permanecem como etapas futuras.

### 4.2. Etapa 01 - Configuracao de Controle de Vagas

Esta etapa foi implementada.

Objetivo:

Permitir configurar se determinado cargo ou funcao controla vaga e quais criterios serao usados para validar a compatibilidade antes da ocupacao.

Rotas criadas:

- `/prototipos/sigep/controle-vagas/configuracao`
- `/prototipos/sigep/controle-vagas/configuracao/novo`
- `/prototipos/sigep/controle-vagas/configuracao/:id/editar`

Foi implementada uma listagem com:

- Filtros.
- Botao Adicionar.
- Tabela com dados mockados.
- Badges de situacao.
- Acoes de visualizar/editar.

Foi implementada tela de cadastro/edicao com abas:

- Detalhes.
- Criterios de Compatibilidade.
- Historico.

Na aba Detalhes, foram criados campos principais da configuracao, como:

- Tipo.
- Codigo.
- Cargo/Funcao.
- Controla Vaga.
- Tipo de Controle.
- Data Inicio.
- Permite saldo negativo.
- Justificativa para saldo negativo.
- Observacao.

Regra implementada:

Quando o campo **Controla Vaga** estiver como **Nao**, os campos dependentes ficam desabilitados. Isso evita que o usuario configure tipo de controle, vigencia ou criterios quando o cargo/funcao nao deve controlar vaga.

Na aba Criterios de Compatibilidade, foram implementados criterios mockados:

- Cargo/Funcao.
- Regime Juridico.
- Tipo de Vinculo.
- Orgao/Setor.
- Setores subordinados.
- Localidade.
- Especialidade.
- Jornada.

Regra implementada:

- Cargo/Funcao fica sempre marcado e bloqueado.
- Setores subordinados depende de Orgao/Setor.
- Quando Controla Vaga = Nao, os criterios ficam desabilitados.

Na aba Historico, foi criada uma tabela somente leitura com eventos mockados.

Validacao realizada:

- `npm run type-check`
- `npm run build`

### 4.3. Etapa 02 - Quadro Autorizado de Vagas

Esta etapa foi implementada em primeira versao.

Objetivo:

Cadastrar o quantitativo autorizado de vagas para um cargo ou funcao, vinculado a orgao/setor, situacao, vigencia e documentos legais.

Rotas criadas:

- `/prototipos/sigep/controle-vagas/quadro-autorizado`
- `/prototipos/sigep/controle-vagas/quadro-autorizado/novo`
- `/prototipos/sigep/controle-vagas/quadro-autorizado/:id/editar`

Foi criada listagem com:

- Filtros por cargo/funcao, orgao/setor, tipo e situacao.
- Botao Adicionar.
- Tabela mockada.
- Colunas de quantidade autorizada, ocupada, reservada e disponivel.
- Badge de situacao.
- Acoes de visualizar/editar.

Foi criada tela de cadastro/edicao com abas:

- Dados Gerais.
- Distribuicoes.
- Reservas.
- Historico.

Na aba Dados Gerais, foram implementados:

- Codigo.
- Tipo.
- Cargo/Funcao.
- Orgao/Setor.
- Quantidade Autorizada.
- Processo SEI.
- Observacao.
- Componente de Situacao/Vigencia.
- Componente de Documentos Vinculados.

Componentes reaproveitados:

- `SituacaoVigenciaSeplag`.
- `DocumentosLegaisAssociadosSeplag`.

As abas Distribuicoes e Reservas foram inicialmente preparadas como espacos futuros.

Na aba Historico, foi criada tabela mockada somente leitura.

Validacao realizada:

- `npm run type-check`
- `npm run build`

### 4.4. Etapa 03 - Distribuicao de Vagas

Esta etapa foi implementada dentro da aba **Distribuicoes** do Quadro Autorizado.

Objetivo:

Permitir distribuir a quantidade autorizada do quadro entre orgaos/setores, controlando o quanto ja foi distribuido, ocupado, reservado e ainda disponivel.

Foi implementado:

- Resumo do quadro.
- Tabela de distribuicoes.
- Formulario de nova distribuicao.
- Calculos mockados de saldo.

Resumo exibido:

- Autorizado.
- Distribuido.
- Nao distribuido.
- Ocupado.
- Reservado.
- Disponivel.

Formulario de nova distribuicao:

- Orgao/Setor.
- Quantidade Distribuida.
- Observacao.
- Botao Adicionar.

Tabela de distribuicoes:

- Orgao/Setor.
- Distribuido.
- Ocupado.
- Reservado.
- Disponivel.
- Situacao.
- Acoes.

Regras simuladas:

- Ao adicionar uma distribuicao, o total distribuido aumenta.
- O saldo nao distribuido e recalculado.
- O saldo disponivel considera: distribuido - ocupado - reservado.
- Ao remover uma distribuicao, o saldo volta para nao distribuido.

Validacao realizada:

- `npm run type-check`
- `npm run build`

## 5. O que falta implementar

### 5.1. Etapa 04 - Reserva de Vagas

Objetivo:

Permitir reservar vagas para processos futuros, impedindo que o saldo reservado seja consumido por outras ocupacoes.

O que falta:

- Implementar aba Reservas dentro do Quadro Autorizado.
- Criar formulario de reserva.
- Criar tipos de reserva.
- Mostrar impacto da reserva no saldo.
- Criar tabela de reservas.
- Criar acoes: editar, cancelar e encerrar.

Campos esperados:

- Tipo de reserva.
- Orgao/Setor.
- Quantidade.
- Motivo.
- Data de inicio.
- Data de fim.
- Situacao.
- Observacao.

### 5.2. Etapa 05 - Consulta de Saldo de Vagas

Objetivo:

Criar uma tela consultiva para visualizar o saldo de vagas em uma data de referencia.

O que falta:

- Criar rota propria no hub.
- Criar filtro obrigatorio por data de referencia.
- Criar filtros por cargo/funcao, orgao/setor, tipo e situacao.
- Criar cards de resumo.
- Criar abas ou secoes:
  - Por Quadro.
  - Por Distribuicao.
  - Reservadas.
  - Ocupadas.
  - Disponiveis.
- Usar mocks derivados das etapas anteriores.

Resumo esperado:

- Total autorizado.
- Total distribuido.
- Total ocupado.
- Total reservado.
- Total disponivel.
- Total nao distribuido.

### 5.3. Etapa 06 - Vagas Numeradas

Objetivo:

Controlar vagas individualizadas por numero/codigo proprio, permitindo rastrear exatamente qual vaga esta ocupada, reservada, bloqueada ou disponivel.

O que falta:

- Criar tela de consulta.
- Criar cadastro/edicao.
- Criar situacoes da vaga:
  - Disponivel.
  - Ocupada.
  - Reservada.
  - Bloqueada.
  - Agendada.
  - Extinta.
- Criar aba de ocupacao atual.
- Criar historico mockado da vaga.

Essa etapa sera importante para cenarios em que o controle apenas quantitativo nao e suficiente.

### 5.4. Etapa 08 - Historico/Ocupacao de Vagas

Objetivo:

Criar uma tela consultiva para rastrear toda a linha do tempo da vaga, desde criacao, distribuicao, reserva, ocupacao, liberacao e encerramento.

O que falta:

- Criar rota propria no hub.
- Criar filtros por:
  - Periodo.
  - Cargo/Funcao.
  - Vaga.
  - Pessoa.
  - Vinculo.
  - Evento.
  - Usuario.
- Criar listagem em formato de linha do tempo.
- Criar detalhe do evento.
- Criar visao de ocupacoes.

Eventos esperados:

- Criacao de quadro autorizado.
- Distribuicao de vaga.
- Reserva de vaga.
- Ocupacao.
- Liberacao.
- Cancelamento de reserva.
- Encerramento.
- Extincao.

### 5.5. Etapa 07 - Integracao com Ingresso/Eventos Funcionais

Objetivo:

Simular como o Controle de Vagas sera consumido por processos funcionais, como ingresso, nomeacao, designacao, vacancia, exoneracao ou movimentacao.

Esta etapa deve ficar por ultimo porque depende das anteriores.

O que falta:

- Simular servico de validacao de vaga.
- Simular ocupacao/liberacao de vaga.
- Integrar com saldo mockado.
- Integrar com historico mockado.
- Definir mensagens de bloqueio ou alerta.
- Somente depois avaliar backend real ou eventos funcionais reais.

Exemplos de validacao futura:

- Nao permitir ocupar vaga se nao houver saldo.
- Nao permitir ocupar vaga encerrada/extinta.
- Consumir reserva quando a ocupacao estiver vinculada a uma reserva.
- Liberar saldo quando houver vacancia.
- Registrar historico automatico.

## 6. Ordem recomendada daqui para frente

A ordem recomendada de continuidade e:

1. Implementar Etapa 04 - Reserva.
2. Implementar Etapa 05 - Consulta de Saldo.
3. Implementar Etapa 06 - Vagas Numeradas.
4. Implementar Etapa 08 - Historico/Ocupacao.
5. Implementar Etapa 07 - Integracao.

Motivo:

A reserva depende do quadro e das distribuicoes. A consulta de saldo depende do quadro, distribuicoes e reservas. Vagas numeradas usam o saldo e a distribuicao como base. Historico precisa consolidar eventos de todas as etapas. Integracao deve vir por ultimo porque representa o consumo final das regras por outros fluxos do sistema.

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

## 8. Observacoes tecnicas

Arquivos principais alterados:

- `src/App.tsx`
- `src/prototipos/PrototiposPage.tsx`
- `src/prototipos/prototipos.css`

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

Base de dados atual:

Tudo esta usando dados mockados no frontend. Ainda nao existe integracao com backend real.

Validacoes executadas nas etapas implementadas:

- `npm run type-check`
- `npm run build`

## 9. Resumo executivo

O Controle de Vagas esta sendo estruturado como um modulo para garantir que cargos e funcoes so sejam ocupados quando houver regra, quadro autorizado e saldo disponivel.

Ja existe um fluxo inicial navegavel com configuracao, quadro autorizado e distribuicao. O prototipo ja mostra a logica principal de controle: configurar, autorizar, distribuir e calcular saldos.

As proximas entregas devem completar reserva, consulta de saldo, vagas numeradas, historico consolidado e integracao com eventos funcionais.
