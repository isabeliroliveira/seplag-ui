# Folha de Pagamento - Visao Geral e Status de Implementacao

## 1. Objetivo do prototipo

O prototipo do modulo **Folha de Pagamento** simula fluxos de configuracao, processamento e acompanhamento da folha usando os componentes do projeto `seplag-ui`.

O foco atual esta nas funcionalidades:

- Configuracao de Competencia.
- Folha de Pagamento.
- Tabelas de Referencia.
- Solicitacoes de Ajustes da Folha.
- Grupo de Eleitos.
- Penhora Judicial / Retencoes Judiciais, ainda como ponto de menu.

## 2. Rotas principais

Entrada do modulo:

`/#/prototipos/folha`

Solicitacoes de Ajustes da Folha:

`/#/prototipos/folha/processamento/solicitacoes-ajustes`

Configuracao de Competencia:

`/#/prototipos/folha/processamento/competencias`

Folha de Pagamento:

`/#/prototipos/folha/processamento/folha-pagamento`

Tabelas de Referencia:

`/#/prototipos/folha/cadastro/tabelas-referencia`

Grupo de Eleitos:

`/#/prototipos/folha/cadastro/grupo-eleitos`

## 3. Solicitacoes de Ajustes da Folha

### 3.1. Listagem

Implementado.

Menu:

`Folha > Processamento > Solicitacoes de Ajustes da Folha`

Entregue:

- Tela de listagem com filtros padronizados.
- Filtro por numero/nome da folha.
- Filtro por competencia.
- Filtro por grupo de eleitos com multiselect.
- Filtro por matricula ou CPF.
- Filtro por situacao.
- Botao **Nova Solicitacao** disponivel para o perfil Conformidade.
- Contador de registros encontrados.
- Tabela com:
  - Numero da Folha.
  - Nome da Folha.
  - Competencia.
  - Matricula/CPF ou Grupo de Eleitos.
  - Solicitante.
  - Data de Criacao.
  - Data de Fechamento.
  - Situacao.
  - Acoes.

Regras visuais ja ajustadas:

- Competencia sem quebra de linha.
- Datas exibidas sem hora.
- Situacao com badges ajustados para caber na coluna.
- Acoes alinhadas a esquerda.
- Botao **Nova Solicitacao** com texto branco.
- Botao **Limpar** com icone e texto curto.
- Botao **Concluir** em verde.
- Botao **Historico** em cinza.

### 3.2. Perfis

Implementado.

Perfis simulados:

- `Maria de Souza - Conformidade`
- `Joao Silva - Folha de Pagamento`

Regras:

- Perfil Conformidade pode cadastrar nova solicitacao.
- Perfil Conformidade pode editar e excluir apenas solicitacoes com situacao **Nova**.
- Perfil Conformidade pode devolver ou concluir solicitacoes corrigidas.
- Perfil Folha de Pagamento nao ve as acoes **Editar**, **Excluir** e **Concluir**.
- Perfil Folha de Pagamento pode iniciar/reiniciar correcao e finalizar correcao conforme situacao.

### 3.3. Cadastro, edicao e visualizacao

Implementado com base na US **Manter Solicitacoes de Ajustes da Folha**.

O botao **Nova Solicitacao** abre uma tela de cadastro dentro do fluxo da listagem.

Modos da tela:

- Cadastrar.
- Alterar.
- Visualizar.

Campos implementados:

- Competencia vigente em destaque no canto superior direito do cabecalho.
- Numero da Folha.
- Nome da Folha preenchido automaticamente ao selecionar o numero.
- Competencia.
- Data de criacao preenchida automaticamente.
- Origem da Solicitacao.
- Matricula ou CPF, exibido somente quando essa origem e selecionada.
- Grupo de Eleitos, exibido somente quando essa origem e selecionada.
- Motivo do ajuste com limite de 500 caracteres.
- Documento com componente padrao `AnexarDocumentoSeplag`.

Regras implementadas:

- Numero da Folha lista folhas processadas com sucesso.
- Nome da Folha e preenchido automaticamente pelo numero selecionado.
- Origem da Solicitacao e obrigatoria.
- Matricula/CPF e Grupo de Eleitos sao mutuamente exclusivos.
- Ao escolher uma origem, o campo da outra origem e limpo.
- Cadastro salva a solicitacao com situacao inicial **Nova**.
- Cadastro exibe a mensagem **Registro cadastrado com sucesso!**.
- Edicao exibe a mensagem **Registro atualizado com sucesso!**.
- Visualizacao abre a mesma tela em modo somente leitura.
- Modo visualizacao exibe botao **Editar** quando o perfil e Conformidade e a situacao e **Nova**.
- Ao tentar sair com alteracoes nao salvas, exibe a mensagem:

`Voce possui alteracoes nao salvas. Se sair agora, os dados serao perdidos. Deseja continuar?`

### 3.4. Documentos

Implementado.

Na tela de cadastro/edicao, o campo **Documento** usa o componente padrao `AnexarDocumentoSeplag`.

Comportamentos:

- Permite anexar multiplos documentos.
- Exibe lista de arquivos anexados.
- Permite visualizar, baixar e remover documentos.
- Aplica validacao local de quantidade, tamanho e extensoes conforme a US.

Regras simuladas:

- Maximo de 10 arquivos por solicitacao.
- Maximo de 2MB por arquivo.
- Extensoes aceitas no fluxo: `.pdf`, `.doc`, `.csv`, `.xlsx`, `.xls`, `.docx`.

### 3.5. Modais e mensagens

Implementado.

Modais ajustados:

- **Iniciar Correcao**
  - Mensagem:
    `Deseja iniciar o atendimento desta solicitacao? Voce sera registrado como o responsavel tecnico.`

- **Reiniciar Correcao**
  - Usado quando a solicitacao esta com situacao **Devolvido**.
  - Mensagem:
    `Esta solicitacao foi devolvida pela equipe de Conformidade e necessita de reajuste. Deseja reiniciar a correcao deste registro?`
  - Exibe motivo da devolucao.
  - Exibe documentos anexados apenas para visualizacao.

- **Finalizar Correcao**
  - Mensagem:
    `Deseja finalizar a correcao desta solicitacao? O registro sera enviado para homologacao da equipe de Conformidade.`

- **Devolver Solicitacao**
  - Permite informar motivo da devolucao.
  - Permite anexar documentos.

- **Concluir Solicitacao**
  - Mensagem:
    `Deseja encerrar e concluir esta solicitacao de ajuste? Ao confirmar, o status sera alterado para 'Concluido' e o registro ficara permanentemente bloqueado para novas alteracoes ou exclusoes.`

Mensagens de sucesso:

- Cadastro: `Registro cadastrado com sucesso!`
- Edicao: `Registro atualizado com sucesso!`
- Exclusao: `Registro deletado com sucesso!`

### 3.6. Historico

Implementado.

O modal de historico mostra linha do tempo com:

- Situacao.
- Data/Hora.
- Operador.
- Descricao detalhada do evento.

Os historicos mockados foram enriquecidos para explicar melhor cada movimento.

## 4. Configuracao de Competencia

Implementado.

Entregue:

- Listagem de competencias.
- Filtros por competencia e situacao.
- Situacoes padronizadas:
  - **Vigente** para competencia aberta.
  - **Encerrada** para competencia fechada.
- Botao pequeno de simulacao, apenas com icone de lixeira, para apagar competencias cadastradas.
- Quando nao ha competencias, o botao **Abertura de Competencia** aparece no lugar do registro vazio na tabela.
- O botao de abertura some depois que a primeira competencia e cadastrada.
- Modal de cadastro com mascara `MM/AAAA` para competencia e `DD/MM/AAAA` para datas.
- Ao salvar nova competencia, exibe:

`Salvo com sucesso a Nova Competencia!`

Fluxo de fechamento:

- Modal **Fechamento da Competencia**.
- Mensagem:

`Tem certeza que deseja encerrar a competencia atual?`

- Usuario informa Data fim da competencia atual ou Data inicio da proxima competencia.
- Se preencher Data fim, o sistema calcula Data inicio da proxima com D+1.
- Se preencher Data inicio, o sistema calcula Data fim da atual com D-1.
- Os campos Data fim e Data inicio ficam alinhados na mesma linha visual do modal.

## 5. Folha de Pagamento

Implementado parcialmente como prototipo navegavel.

Entregue:

- Listagem e cadastro/edicao de folhas.
- Uso de competencias, grupos de folha e parametros de processamento.
- Tela de execucoes e logs.
- Logs por pessoa.
- Logs por rubrica.
- Simulacao de processamento/reprocessamento.
- Tabela com situacoes e acoes.

## 6. Tabelas de Referencia

Implementado como prototipo de referencia para INSS.

Entregue:

- Tela **Tabelas de Referencia**.
- Acordeon por tabela:
  - INSS.
  - IRRF.
  - RPPS.
  - Salario Minimo.
  - Salario Familia.
- Dentro do acordeon do INSS:
  - Filtros por ano e status.
  - Tabela de vigencias.
  - Acoes de visualizar e editar.
  - Botao **Nova Vigencia**.
- Tela de vigencia do INSS com abas:
  - Dados Gerais.
  - Faixa de Contribuicao.
- Dados gerais da vigencia:
  - Descricao.
  - Ano Base.
  - Teto Previdenciario.
  - Inicio da Vigencia.
  - Fim da Vigencia.
  - Observacoes.
- Aba Faixa de Contribuicao:
  - Cards de resumo:
    - Teto Previdenciario.
    - Total de Faixas.
    - Desconto Maximo CLT.
  - Tabela com:
    - Ordem.
    - Faixa Inicial.
    - Faixa Final.
    - Percentual.
    - Contribuicao da Faixa.
    - Acoes.
  - Botao **Adicionar Faixa**.
  - Modal **Nova Faixa**.

Regras simuladas para INSS:

- Primeira faixa inicia em `R$ 0,01`.
- Faixas progressivas conforme valores informados na US.
- Desconto maximo CLT exibido como `R$ 988,09`.
- Teto previdenciario exibido como `R$ 8.475,55`.

## 7. Componentes ajustados

### 7.1. AnexarDocumentoSeplag

O componente `AnexarDocumentoSeplag` foi ajustado para aceitar configuracoes opcionais:

- `accept`
- `maxFileSize`
- `helpText`

Tambem foi ajustado para exibir o uploader apenas quando existir `onUploadDocument`. Isso evita mostrar botao de upload em telas somente leitura.

## 8. Publicacao GitHub Pages

O projeto foi publicado em GitHub Pages.

URL:

`https://taylor-SEPLAG.github.io/seplag-ui/`

Ultimo commit de publicacao observado:

`49dc6aa - Publish payroll adjustment request updates`

Durante a publicacao foi corrigido um erro de sintaxe CSS no bloco de fechamento de competencia que impedia o `npm run build:pages`.

## 9. Validacoes executadas

Durante as implementacoes do modulo Folha foram executados:

```bash
npm run type-check
npm run build
npm run build:pages
```

Os comandos passaram apos os ajustes.

## 10. Pendencias e proximos passos

Pendencias principais:

- Integrar os fluxos com backend real.
- Persistir documentos anexados.
- Persistir historico real de cada transicao.
- Substituir mocks por endpoints.
- Revisar permissoes finais por perfil.
- Criar testes automatizados para regras de validacao.
- Definir comportamento final para download/visualizacao real de documentos.
- Confirmar se as regras de upload da US devem prevalecer sobre o padrao visual do componente de documentos.

## 11. Arquivos principais

Arquivos mais alterados no fluxo do modulo Folha:

- `src/prototipos/PrototiposPage.tsx`
- `src/prototipos/prototipos.css`
- `src/prototipos/folhaPagamento/types.ts`
- `src/prototipos/folhaPagamento/folhaPagamentoService.ts`
- `src/componentes/AnexarDocumento/index.tsx`

