# Contexto do Projeto SEPLAG UI

Este documento resume o que foi analisado, definido e alterado durante a conversa com o Codex em 04/05/2026. A ideia é servir como contexto rápido para continuar o trabalho em outro chat sem precisar reconstruir a história do projeto.

## Visão Geral

O projeto `seplag-ui` é uma biblioteca de componentes React utilizada pela SEPLAG para construir sistemas internos. Além da biblioteca, o repositório também contém uma área de documentação e uma área de protótipos de sistemas.

O pacote é publicado como:

```text
@seplag/ui-lib-react-18
```

O projeto tem dois usos principais:

- Biblioteca oficial de componentes SEPLAG.
- Área de protótipos, usada para montar telas e fluxos de sistemas reais utilizando os próprios componentes da biblioteca.

## Regra Combinada Para Novas Funcionalidades

Toda nova tela, protótipo ou funcionalidade deve usar os componentes existentes em `src/componentes` sempre que possível.

Antes de criar UI própria ou um componente novo, verificar se já existe componente equivalente na biblioteca. Se não existir um componente adequado, avisar explicitamente e sugerir uma das opções:

- Criar um novo componente reaproveitável na biblioteca.
- Resolver localmente no protótipo, caso seja algo muito específico.

## Estrutura Relevante

Arquivos e pastas principais:

```text
src/index.ts                         Entrada pública da biblioteca
src/componentes/index.ts             Export central dos componentes
src/componentes                      Componentes reutilizáveis da biblioteca
src/docs                             Documentação interna navegável
src/docs/config.ts                   Registro das páginas de documentação
src/prototipos                       Área de protótipos de sistemas
src/prototipos/PrototiposPage.tsx    Rotas/telas dos protótipos
src/prototipos/prototipos.css        Estilos da área de protótipos
src/lib/OAuth2Seplag                 Utilitário OAuth2
src/template                         Templates usados pelo gerador CLI
src/_generator/generate.js           Gerador CLI
vite.config.ts                       Configuração do build da lib e das pages
package.json                         Scripts, dependências e metadata do pacote
```

## Comandos Úteis

Rodar a aplicação localmente:

```bash
npm run dev
```

Endereços principais em desenvolvimento:

```text
http://localhost:5173/#/
http://localhost:5173/#/docs
http://localhost:5173/#/prototipos
```

Build da biblioteca:

```bash
npm run build
```

Build da documentação/pages:

```bash
npm run build:pages
```

Preview das pages geradas:

```bash
npm run preview:pages
```

Verificação TypeScript:

```bash
npm run type-check
```

Lint:

```bash
npm run lint
```

Testes unitários:

```bash
npx vitest run
```

## Análise Técnica Feita

Foi feita uma análise geral do projeto. Conclusões principais:

- O projeto é uma biblioteca React/Vite de Design System da SEPLAG.
- Existe build separado para biblioteca (`dist`) e pages/documentação (`dist-pages`).
- A biblioteca exporta componentes, utilitários, tokens, hooks, interfaces e OAuth2.
- A documentação é baseada em rotas e carregamento lazy via `src/docs/config.ts`.
- A área de protótipos estava abrindo diretamente o protótipo de Gestão de Pessoas/SIGEP ao acessar `/prototipos`.

Validações realizadas durante a análise:

```text
npm run type-check  passou
npm run build       passou
npm run build:pages passou
npx vitest run      passou
npm run lint        falhou por problemas já existentes
```

Problemas observados:

- `npm run lint` falhou em `src/docs/pages/Interfaces/InterfacesDoc.tsx` por `no-useless-escape`.
- Há warnings do React Hooks/React Compiler em exemplos de docs que usam `watch()` do `react-hook-form`.
- O build da biblioteca gerou assets grandes dentro do pacote, em especial `Logo_Branco_Estado_MT`.
- O `package.json` aponta `main/module/exports` para `./dist/index.js`, mas foi observado que o build gera `dist/src/index.js` e `dist/index.d.ts`. Isso merece revisão antes de publicação, pois pode afetar consumidores do pacote.
- `dist-pages` é versionado e gera muitos arquivos com hash novo quando `npm run build:pages` roda. Isso causa diffs grandes.

## Mudança Implementada Nos Protótipos

Solicitação: ao clicar em "Protótipos", não abrir diretamente o protótipo do SIGEP. Em vez disso, abrir uma tela de seleção com cards de sistemas. Por enquanto, deve existir apenas um card: SIGEP. Ao clicar no card, abrir o protótipo do SIGEP.

Mudança aplicada:

- `/prototipos` agora abre uma tela de seleção de sistemas.
- A tela exibe um card do SIGEP.
- Clicar no card navega para `/prototipos/sigep`.
- O protótipo antigo, que antes abria direto em `/prototipos`, agora foi movido para `/prototipos/sigep`.
- O sistema exibido no layout e no switcher não se chama SIGEP; ele deve aparecer como **GESTÃO DE PESSOAS**.
- O menu interno de Gestão de Pessoas aponta sua Página Inicial para `/prototipos/sigep`.
- O switcher de sistemas no canto superior direito continua exibindo os outros sistemas/protótipos existentes. A regra de "apenas SIGEP" vale somente para a tela inicial de seleção em `/prototipos`.

Arquivos alterados:

```text
src/App.tsx
src/prototipos/PrototiposPage.tsx
src/prototipos/prototipos.css
```

Componentes da biblioteca usados na nova tela:

- `CardSeplag`
- Ícones PrimeIcons já utilizados no projeto

Observação: a chamada visual "Acessar" dentro do card foi implementada como texto estilizado, não como botão interativo, para evitar botão dentro de link.

## Rotas Após a Mudança

```text
/#/prototipos        Tela de seleção de sistemas
/#/prototipos/sigep  Protótipo do módulo Gestão de Pessoas
```

Rotas antigas de outros protótipos ainda existem no código e continuam acessíveis pelo switcher do canto superior direito. A seleção principal em `/prototipos` mostra apenas SIGEP neste momento.

## Mudança Implementada em Folha de Pagamento

Em 07/05/2026 foi definido que Penhora Judicial deve ficar no módulo **Folha de Pagamento**, pois impacta cálculo de folha, rubrica de desconto, repasse a credor/terceiro e ficha financeira.

Posicionamento definido:

```text
Módulo: Folha de Pagamento
Menu principal: Lançamento Financeiro
Submenu: Retenções Judiciais
Funcionalidade: Penhora Judicial
```

Primeira implementação:

- Adicionado o menu `Lançamento Financeiro` no protótipo de Folha.
- Adicionado o submenu `Retenções Judiciais`.
- Adicionada a funcionalidade `Penhora Judicial`.
- Criada a rota vazia `/prototipos/folha/penhora-judicial`.
- A tela inicial da funcionalidade foi criada sem conteúdo visível por enquanto, apenas para validar navegação e posicionamento no menu.

## Componente de Situação e Vigência

Em 08/05/2026 foi analisada a US `USXXX – Componente de Situação e Vigência.pdf`. A US define um componente reutilizável para padronizar, nos cadastros do sistema, o controle de situação, vigência e status operacional.

Posicionamento no protótipo:

```text
Gestão de Pessoas
 └── Cadastro
      └── Parametrização
           └── Componentes
```

Rota:

```text
/#/prototipos/sigep/componentes
```

Implementação inicial:

- Criado o componente público `SituacaoVigenciaSeplag`.
- Criados helpers públicos:
  - `calcularStatusOperacionalVigenciaSeplag`
  - `validarSituacaoVigenciaSeplag`
  - `SITUACAO_VIGENCIA`
  - `STATUS_OPERACIONAL_VIGENCIA`
- Exportado em `src/componentes/index.ts`.
- Criada demonstração editável na página **Componentes**.
- A demonstração usa cenários rápidos: Ativo, Agendado, Encerrado e Extinto.
- A demonstração permite simular vínculos ou associações existentes para bloquear extinção.

Arquivos principais:

```text
src/componentes/SituacaoVigencia/index.tsx
src/componentes/index.ts
src/prototipos/PrototiposPage.tsx
src/prototipos/prototipos.css
src/App.tsx
```

Regras principais contempladas:

- Novo registro usa situação `Ativo`.
- `Agendado` é status calculado quando Data de Ativação é futura.
- `Agendado` não é opção manual de situação.
- `Encerrado` exibe Data de Encerramento e Motivo do Encerramento.
- `Extinto` exibe Data de Extinção e Motivo da Extinção.
- Datas respeitam a ordem: Ativação, Encerramento e Extinção.
- Extinção pode ser bloqueada quando há vínculos ou associações existentes.

## Validações Após a Mudança

Após a implementação, foram executados:

```bash
npm run type-check
npm run build:pages
```

Ambos passaram.

Como `build:pages` regenera arquivos em `dist-pages`, os artefatos gerados durante a validação foram restaurados/removidos para manter o diff apenas nos arquivos-fonte.

## Git e Commit

Foi criado um commit local pelo VS Code com a mensagem:

```text
feat: add SIGEP prototype page and update routing and styles
```

Hash observado:

```text
66780494a1c79c236ac7a2e31df2be18098244ba
```

O remoto configurado no momento da conversa:

```text
origin https://github.com/taylor-SEPLAG/seplag-ui.git
```

A branch local:

```text
main
```

Houve um erro no VS Code ao tentar rodar:

```text
git pull --tags origin main
fatal: couldn't find remote ref main
```

Foi explicado que o commit havia sido criado localmente e que o erro era no `pull`, não no commit. Depois foi identificado que provavelmente havia problema de autenticação/login no GitHub. A orientação foi autenticar corretamente e rodar:

```bash
git push origin main
```

Também foi explicado que warnings como abaixo não são erro:

```text
LF will be replaced by CRLF
```

Eles indicam conversão de quebra de linha no Windows.

## Recomendações Para Continuação

Próximos pontos sugeridos:

- Corrigir o lint em `src/docs/pages/Interfaces/InterfacesDoc.tsx`.
- Revisar a configuração de build/exports do pacote para garantir que `dist/index.js` exista ou ajustar `package.json`.
- Avaliar se `dist-pages` deve continuar versionado ou se deve ser gerado apenas em deploy.
- Revisar assets grandes exportados pela biblioteca.
- Revisar segurança do `OAuth2LibSeplag`, especialmente `localStorage`, `state` fixo e uso de `clientSecret` em browser.

## Como Orientar Um Novo Chat

Se abrir um novo chat, forneça este documento como contexto e diga:

```text
Este projeto é a biblioteca de componentes React da SEPLAG e também contém uma área de protótipos. Novas funcionalidades devem usar os componentes de src/componentes sempre que possível. Se não houver componente adequado, avise antes de criar algo novo. A rota /prototipos é uma seleção de sistemas e /prototipos/sigep abre o protótipo do módulo Gestão de Pessoas.
```
