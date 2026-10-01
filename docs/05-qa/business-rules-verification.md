---
id: QA-BUSINESS-RULES
type: qa-validation
status: done
owner: "Integrante 5 — QA / Validation"
sources: [DEC-001, DEC-012, ARCH-001, AGENTS]
depends_on: [QA-AC-VALIDATION]
---

# Verificação de regras de negócio

Verificação das doze decisões `DEC-001` a `DEC-012`, das regras adicionais do MVP registradas em [`decisions.md`](../00-governance/decisions.md) e das regras arquiteturais de [`AGENTS.md`](../../AGENTS.md), confrontadas com o comportamento executado.

## Resultado

| Conjunto | Regras | Cumpridas | Com ressalva |
|---|---:|---:|---:|
| `DEC-001` a `DEC-012` | 12 | 12 | 1 |
| Regras adicionais do MVP | 2 | 2 | 0 |
| Regras arquiteturais de `AGENTS.md` | 16 | 15 | 1 |
| **Total** | **30** | **29** | **2** |

Nenhuma regra de negócio é violada pela implementação. As duas ressalvas são de propagação documental, não de comportamento.

## Decisões de governança

### DEC-001 — Persistência mockada em `localStorage`

**Cumprida.** Nenhuma dependência de banco. `package.json` declara apenas `express@4.22.3`. `store.js` lê e escreve exclusivamente em `localStorage`, e `server.js` não tem rota de dados.

Evidência: `TEST-NFR-01`, `TEST-NFR-02`, smoke HTTP.

### DEC-002 — Hierarquia `Epic → Feature → Story → Task`

**Cumprida na estrutura.** 4 Epics, 7 Features, 21 Stories, 21 Tasks, com `parent_epic` e `parent_feature` declarados em todas as Stories.

**Ressalva:** a camada Feature, criada por esta decisão para ser o elo formal entre Epic e Story, é hoje o nível mais inconsistente da hierarquia — todas as 7 declaram `done` apontando Stories `blocked`. A estrutura exigida por `DEC-002` existe; a informação que ela carrega está errada. Ver [`QA-001`](findings.md#qa-001).

### DEC-003 — Autenticação mockada, senha mínima de 8, usuários sanitizados

**Cumprida nas três partes.**

| Parte | Verificação |
|---|---|
| Contas seed e criadas em `localStorage` | `TEST-NFR-02` |
| Senha mínima de 8 caracteres | `MIN_PASSWORD_LENGTH = 8` em `createAccount` e `resetPassword`; `TEST-S02-04` confirma que as três contas do seed respeitam o mínimo |
| Usuários sanitizados antes de exibição | `TEST-S04-02` — sete superfícies de leitura sem o campo `senha` |

A sanitização é aplicada em `sanitizeUser`, chamada por toda função que devolve usuário. Não há caminho de leitura que escape.

### DEC-004 — `ADMIN` com as mesmas capacidades de `PROFESSOR`, `VALIDAR_EVENTO` única

**Cumprida.** `TEST-S03-02` compara as duas listas de permissões e confirma paridade exata. `TEST-S03-03` confirma que a mesma permissão autoriza `APROVADO` e `NEGADO`, sem permissão separada para negar.

A Role continua separada em `ROLES`, preservando a diferenciação futura prevista pela decisão.

### DEC-005 — Ciclo de vida do evento

**Cumprida em todos os ramos.**

| Regra | Verificação |
|---|---|
| Aluno cria como `PENDENTE` | `TEST-S05-01` |
| Professor/Admin cria como `APROVADO` | `TEST-S05-01` |
| Validação leva `PENDENTE` a `APROVADO` ou `NEGADO` | `TEST-S07-04` |
| Cancelamento produz `CANCELADO` | `TEST-S07-01` |
| Evento cancelado não reabre nem aceita inscrição | `TEST-S06-03`, `TEST-S12-02` |
| `ENCERRADO` fora do MVP | ausente do enum `EVENT_STATUS` |

A consequência do último item — sem `ENCERRADO`, evento com data passada permanece aberto — está registrada em [`QA-012`](findings.md#qa-012). Não é violação da decisão: é efeito dela, não documentado.

### DEC-006 — Capacidade, autor e entidade Sugestão

**Cumprida na implementação.** `EVENTO` tem `capacidade` e `criadoPor`; `SUGESTAO` existe com `autorId`, `status` e `eventoId` opcional.

**Ressalva:** a decisão não foi propagada para `architecture.md`, que continua sem os campos e sem a entidade. Ver [`QA-018`](findings.md#qa-018). A regra de `decisions.md` — *"uma decisão confirmada deve ser refletida na fonte canônica afetada"* — não foi cumprida para esta decisão.

Evidência de implementação: `TEST-S05-03`, `TEST-S17-01`, `TEST-S20-02`.

### DEC-007 — Ciclo de vida da inscrição

**Cumprida em todos os ramos.**

| Regra | Verificação |
|---|---|
| Inscrição é `ATIVA` ou `CANCELADA` | `ENROLLMENT_STATUS` |
| Histórico permanece | `TEST-S15-02` |
| Uma inscrição ativa por Aluno/Evento | `TEST-S13-01` |
| Após cancelar, pode se inscrever novamente | `TEST-S14-01` |
| Cancelamento libera capacidade | `TEST-S14-01`, `TEST-S16-01` |

Mesma ressalva de propagação de `DEC-006`: `ARCH-DATA-006` não tem o campo `status` e ainda declara `CONFLICT-002` como aberto.

### DEC-008 — Contratos de UX

**Cumprida com desvios registrados.** Shell autenticado, navegação por permissão, lista/calendário/detalhe, formulários, fila, estados vazios e requisitos responsivos estão implementados — detalhamento em [`review-ux.md`](review-ux.md).

Os desvios são [`QA-007`](findings.md#qa-007), [`QA-008`](findings.md#qa-008) (ações oferecidas em estados que o domínio recusa) e [`QA-013`](findings.md#qa-013) (erro fora do contexto). Nenhum contradiz a decisão; todos descumprem partes específicas do contrato que ela confirma.

### DEC-009 — Comandos oficiais

**Cumprida.** Os cinco comandos existem e executam:

```text
npm install    → 73 packages, 0 vulnerabilities
npm start      → servidor em http://localhost:3000
npm test       → 68 pass, 0 fail
npm run lint   → Lint OK: 6 arquivos JavaScript verificados.
npm run build  → Build OK: baseline MVC, assets e referências completos.
```

A decisão também determina que *"o servidor Express serve a aplicação no mesmo projeto e não expõe API REST pública"* — confirmado: `server.js` tem 25 linhas, serve estáticos, uma rota `GET /` e um 404.

Registro de alteração: o script `test` foi ajustado nesta entrega para cobrir os dois arquivos da pasta `tests/`. Antes, executava apenas `domain.test.js`, e qualquer suíte nova ficaria fora do comando oficial. Ver [`QA-015`](findings.md#qa-015).

### DEC-010 — Professor/Admin criam contas de qualquer Role

**Cumprida.** `createAccount` aceita `ALUNO`, `PROFESSOR` e `ADMIN`, recusando qualquer valor fora de `ROLES` com `INVALID_ROLE`. As capacidades de descoberta constam nas duas Roles administrativas.

A interface respeita a decisão de forma mais restritiva do que o domínio: `renderAccounts` só oferece a opção `ADMIN` quando o ator é `PROFESSOR` ou `ADMIN`. Como ambos têm `CRIAR_CONTA`, não há divergência prática.

### DEC-011 — Somente eventos `APROVADO` podem ser cancelados

**Cumprida no domínio.** `TEST-S07-02` varre `PENDENTE`, `NEGADO` e `CANCELADO`, confirmando `INVALID_TRANSITION` em todos.

A interface oferece a ação em estados que o domínio recusa — [`QA-007`](findings.md#qa-007). A regra não é violada: a operação falha corretamente. O defeito é oferecer o botão.

### DEC-012 — Garantia de capacidade limitada ao mesmo store

**Cumprida.** `TEST-S13-03` exercita doze tentativas sequenciais contra duas vagas restantes e confirma que exatamente duas são aceitas.

A decisão é explícita ao não prometer atomicidade entre abas, e a implementação não promete mais do que isso. É um caso de escopo honestamente delimitado: `localStorage` não oferece transação, e a decisão registra a limitação em vez de escondê-la.

## Regras adicionais do MVP

| Regra | Situação | Evidência |
|---|---|---|
| Datas como strings ISO, interpretadas no horário local, sem multi-timezone | cumprida | `validDate` exige `YYYY-MM-DD`; `now()` usa ISO; nenhum tratamento de fuso |
| Dados inválidos ou corrompidos restauram o seed sem quebrar | cumprida | `TEST-NFR-01` — chave ausente, JSON inválido e estrutura incompatível |

A segunda regra é a mais bem implementada do conjunto. `store.js` valida a forma do objeto após o parse, não apenas o parse — um JSON sintaticamente válido mas sem as coleções esperadas também dispara a restauração.

## Regras arquiteturais de `AGENTS.md`

| Regra | Situação |
|---|---|
| Respeitar MVC de `ARCH-001` | cumprida — `src/models`, `src/views`, `src/controllers` |
| Respeitar a stack HTML/CSS/JS/Node/Express | cumprida |
| Dados mockados e `localStorage` | cumprida |
| Frontend e backend no mesmo projeto | cumprida |
| Não criar API REST independente ou pública | cumprida |
| Respeitar RBAC por Roles e Permissions | cumprida |
| Respeitar entidades e relacionamentos de `ARCH-DATA-*` | **ressalva** — ver abaixo |
| Não adicionar tecnologias ou camadas desnecessárias | cumprida — dependência única |
| Não criar Repository ou Service sem necessidade | cumprida |
| Não implementar `ARCH-OQ-*` por inferência | cumprida — cada questão tem `DEC-*` ou está deferida |
| Alunos criam eventos que iniciam `PENDENTE` | cumprida — `TEST-S05-01` |
| Professores criam eventos e têm `VALIDAR_EVENTO` | cumprida — `TEST-S03-02` |
| `VALIDAR_EVENTO` é permissão única para aprovar e negar | cumprida — `TEST-S03-03` |
| Respeitar os estados `PENDENTE`, `APROVADO`, `NEGADO`, `CANCELADO` | cumprida |
| Evento de aluno passa pelo fluxo de validação | cumprida — `TEST-S07-04` |
| Professor visualiza solicitações `PENDENTE` | cumprida — `renderValidation` filtra `PENDENTE` |

**A ressalva em "respeitar as entidades e relacionamentos definidos em `ARCH-DATA-*`"** é peculiar e merece ser lida com cuidado.

A implementação **não** respeita `ARCH-DATA-*` literalmente: usa `capacidade`, `criadoPor`, `status` de inscrição e a entidade `SUGESTAO`, nenhum dos quais existe no modelo canônico. Seguir a regra ao pé da letra teria exigido ignorar `DEC-006` e `DEC-007` e entregar um MVP sem capacidade de evento e sem sugestões — ou seja, sem metade do produto.

A implementação seguiu as decisões, que é a escolha certa pela precedência de [`bmad-reading-map.md`](../00-governance/bmad-reading-map.md). O problema é que `AGENTS.md` aponta para uma fonte que ficou para trás. A regra não foi violada por descuido; ela ficou impossível de cumprir literalmente quando `DEC-006` e `DEC-007` não foram propagadas.

Correção em [`QA-018`](findings.md#qa-018): atualizar `ARCH-DATA-*`. Com isso, a regra de `AGENTS.md` volta a ser cumprível e verdadeira.

## Regras contra alucinação

`AGENTS.md` define nove regras de disciplina de evidência. Duas são verificáveis no estado atual do repositório:

| Regra | Situação |
|---|---|
| Fonte ausente, conflito ou contrato indefinido marcado como `unknown`/`conflict` | cumprida nas fontes — PRD usa `[ASSUMPTION]`, matriz usa classes de evidência |
| Não alterar decisões arquiteturais por conta própria | cumprida — nenhuma `DEC-*` foi alterada sem registro |

As demais regem o processo de criação dos artefatos e não deixam traço verificável no produto final.

Esta camada de QA observou a mesma disciplina: nenhum arquivo em `src/` foi alterado, conforme o limite de autoridade descrito em [`README.md`](README.md#autoridade-e-limites).

## Fontes lidas

- [`decisions.md`](../00-governance/decisions.md) — `DEC-001` a `DEC-012` e regras adicionais do MVP
- [`AGENTS.md`](../../AGENTS.md) — regras arquiteturais e contra alucinação
- [`architecture.md`](../01-inputs/architecture.md) — `ARCH-DATA-*`, `ARCH-SEC-007`, `ARCH-SEC-010`
- [`bmad-reading-map.md`](../00-governance/bmad-reading-map.md) — precedência entre fontes
- `src/models/domain.js`, `src/models/store.js`, `server.js`, `package.json`
