---
id: QA-REVIEW-STORIES
type: qa-review
status: done
owner: "Integrante 5 — QA / Validation"
sources: [E01, E02, E03, E04, F01, F02, F03, F04, F05, F06, F07, S01, S21, T001, T021, DEC-002]
depends_on: [E01, E02, E03, E04]
---

# Revisão de Epics, Features, Stories e Tasks

Revisão da camada de decomposição em [`docs/04-pm-stories/`](../04-pm-stories/): 4 Epics, 7 Features, 21 Stories, 21 Tasks, 38 critérios de aceitação, 12 dependências e a matriz de rastreabilidade.

## Veredito

A decomposição é correta na estrutura e defeituosa no estado. A hierarquia `Epic → Feature → Story → Task` exigida por `DEC-002` está completa, os IDs são estáveis, cada Story aponta fontes por ID e cada critério de aceitação é escrito em Dado/Quando/Então testável. Nada disso é trivial e está bem feito.

O problema é que **nenhum dos três níveis da hierarquia é internamente consistente**. Cada artefato declara `done` no front-matter e `blocked` no corpo, simultaneamente. Esse é o achado mais sério da revisão documental ([`QA-001`](findings.md#qa-001), [`QA-002`](findings.md#qa-002), [`QA-003`](findings.md#qa-003)).

## A cascata de status contraditório

Levantamento completo:

| Nível | Front-matter | Corpo declara | Contagem |
|---|---|---|---|
| Epics | `status: done` (4/4) | Features como `blocked` | 8 de 8 |
| Features | `status: done` (7/7) | Stories como `blocked` | 21 de 21 |
| Stories | `status: done` (21/21) | Task como `blocked` | 13 de 21 |

As 8 Stories de `E01` e `E02` (`S01`–`S08`) tiveram a seção "Bloqueios" atualizada para *"Resolvidos por `DEC-003`..."* e a Task marcada `done`. As 13 restantes (`S09`–`S21`) não receberam o mesmo tratamento.

O corte é exato e revela o que aconteceu: a atualização de estado foi feita até `S08` e interrompida. Não é erro de julgamento, é trabalho incompleto.

Exemplo de `S13`, cuja seção Bloqueios ainda afirma:

```text
A arquitetura não define capacidade nem status ativo/inativo;
a implementação de concorrência no localStorage ainda precisa
de estratégia validada.
```

Os três bloqueios foram resolvidos: `DEC-006` define capacidade, `DEC-007` define `ATIVA`/`CANCELADA`, `DEC-012` define o escopo da garantia de concorrência. A Story está `done`, implementada e coberta por `TEST-S13-01` a `TEST-S13-03`.

Nove Stories citam conflitos nominalmente (`CONFLICT-001`, `CONFLICT-002`, `CONFLICT-003`, `Q-ARCH-004`, `Q-ARCH-005`) como se estivessem abertos. Todos constam como `resolvida` em [`dependencies.md`](../04-pm-stories/dependencies.md).

**Por que isso importa:** o `README.md` da camada estabelece como regra anti-alucinação que *"sem validação, não está concluído"* e que `blocked` exige causa registrada em `dependencies.md`. A camada viola a própria regra em 42 declarações. Um agente que leia `F05` para saber se pode trabalhar em `S13` recebe `blocked` como resposta — sobre código que já está em produção e testado.

## Qualidade dos critérios de aceitação

Aqui a avaliação é positiva. Os 38 critérios seguem formato testável e cobrem caminho principal e caso de erro de forma deliberada:

| Story | Caminho principal | Caso negativo |
|---|---|---|
| `S01` | `AC-S01-01` credencial válida | `AC-S01-02` credencial inválida sem enumeração |
| `S02` | `AC-S02-01` dados obrigatórios | `AC-S02-02` e-mail duplicado |
| `S13` | `AC-S13-02` capacidade concorrente | `AC-S13-01` duplicidade ativa |
| `S14` | `AC-S14-01` cancelamento próprio | `AC-S14-02` inscrição de outro aluno |

Das 21 Stories, 17 têm par de critérios cobrindo sucesso e falha. As 4 com critério único (`S08`, `S09`, `S16`, `S18`) são as que expressam uma capacidade de leitura sem ramo de erro próprio — é adequado, não é lacuna.

Um detalhe de qualidade que merece registro: `AC-S01-02` exige que a rejeição ocorra *"sem revelar se o e-mail existe"*. É um critério de segurança escrito dentro de uma Story de login por quem não era especialista em segurança, e a implementação o cumpre. Verificado em `TEST-S01-02`.

A validação item a item dos 38 critérios está em [`acceptance-criteria-validation.md`](acceptance-criteria-validation.md).

## Rastreabilidade de fontes

Toda Story declara `sources` com IDs reais e `depends_on` com `DEP-*` existentes. A verificação cruzada não encontrou nenhum ID órfão: todos os `PRD-FR-*`, `UX-00*`, `ARCH-001`, `DEC-00*` e `DEP-0**` citados existem nas fontes correspondentes.

Os links relativos para o PRD usam `../../../../_bmad-output/...` a partir de `stories/E0*/`, profundidade correta para a estrutura real.

Duas observações sobre a matriz de rastreabilidade:

1. A seção "Auditoria" afirma *"14 testes de domínio"*. A suíte original tinha 15 casos; com a camada QA, são 68. Corrigido como [`QA-017`](findings.md#qa-017) — severidade baixa, mas é literalmente a linha onde a matriz declara sua própria evidência.
2. As classes de evidência (`confirmed`, `mixed`, `conflict`, `unknown`) permaneceram congeladas no estado pré-decisão. `PRD-FR-013`, `FR-014`, `FR-016`, `FR-018` a `FR-021` e `FR-024` constam como `conflict`, e `FR-015`, `FR-022`, `FR-023` como `unknown`, embora a coluna seguinte já registre a `DEC-*` que resolveu cada um e o status `done`. A matriz carrega a resolução e a classificação antiga lado a lado.

O ponto 2 é o mesmo defeito de `QA-001`/`QA-002` manifestado na matriz: o estado foi atualizado onde o trabalho terminou, não onde a informação mudou.

## Dependências

[`dependencies.md`](../04-pm-stories/dependencies.md) é o artefato mais bem mantido da camada. As 12 dependências `DEP-001` a `DEP-012` estão `resolvida`, com condição de desbloqueio, responsável e fonte por ID e seção. O cabeçalho registra corretamente que foram resolvidas por `DEC-003`–`DEC-009`.

É a prova de que a atualização de estado foi feita deliberadamente neste arquivo — e não propagada para Epics, Features e Stories.

Uma ressalva de conteúdo, não de estado: `DEP-006` e `DEP-011` têm como condição de desbloqueio *"promover entidades/campos ou atualizar PRD"* e *"registrar decisão de dados e vínculo"*. A decisão foi registrada (`DEC-006`), mas a promoção para o modelo arquitetural não ocorreu — `architecture.md` continua sem capacidade, sem autor e sem a entidade Sugestão. Ver [`QA-018`](findings.md#qa-018). As duas dependências estão marcadas `resolvida` com metade da condição cumprida.

## Tasks

As 21 Tasks `T001`–`T021` cobrem integralmente as 21 Stories, uma para uma. A ordem em [`implementation-order.md`](../04-pm-stories/implementation-order.md) é coerente com as dependências declaradas — autenticação e RBAC antes de eventos, eventos antes de inscrições, sugestões por último.

Cada Task possui artefato de verificação em `_bmad-output/implementation-artifacts/verification/T0**.md`, referenciado pela matriz. A granularidade está correta: nenhuma Task acumula duas Stories, nenhuma Story foi partida em Tasks que não entregam valor isolado.

O defeito é o já descrito: 13 dessas Tasks estão declaradas `blocked` dentro de Stories `done` que apontam para o artefato de verificação da própria Task.

## Conformidade com a Definition of Done

Avaliação da camada contra [`definition-of-done.md`](../04-pm-stories/definition-of-done.md), seção "Para uma story":

| Item da DoD | Situação |
|---|---|
| Critérios `AC-*` atendidos com evidência verificável | atendido — ver [`acceptance-criteria-validation.md`](acceptance-criteria-validation.md) |
| Cada critério ligado a fonte/decisão, task e teste | atendido |
| Caminho principal, erros, estados vazios e permissões verificados | atendido — estados vazios em 9 superfícies, permissões em `TEST-S03-01` |
| Sem fontes conflitantes ou perguntas bloqueadoras sem registro | **não atendido** — [`QA-003`](findings.md#qa-003) |
| Tasks filhas `done` ou canceladas com justificativa | **não atendido** — 13 declaradas `blocked` |
| Testes automatizados executados | atendido — 68 casos |
| Lint, type-check e build executados | atendido |
| Acessibilidade e responsividade avaliadas | atendido com ressalvas — [`QA-014`](findings.md#qa-014) |
| Segurança, privacidade e tratamento de erro avaliados | atendido com ressalva — [`QA-013`](findings.md#qa-013) |
| Documentação e contratos afetados atualizados | **não atendido** — [`QA-018`](findings.md#qa-018) |
| Matriz de rastreabilidade e status atualizados | **não atendido** — [`QA-017`](findings.md#qa-017) |

Oito de onze atendidos. Os quatro itens não atendidos são todos de atualização documental — nenhum deles indica software incorreto.

## Fontes lidas

- [`README.md`](../04-pm-stories/README.md) — IDs, status permitido, critérios de `ready`, regras anti-alucinação
- [`epics/`](../04-pm-stories/epics/) — `E01` a `E04`
- [`features/`](../04-pm-stories/features/) — `F01` a `F07`
- [`stories/`](../04-pm-stories/stories/) — `S01` a `S21`, 38 critérios `AC-*`
- [`tasks/`](../04-pm-stories/tasks/) — `T001` a `T021`
- [`dependencies.md`](../04-pm-stories/dependencies.md) — `DEP-001` a `DEP-012`
- [`implementation-order.md`](../04-pm-stories/implementation-order.md)
- [`traceability-matrix.md`](../04-pm-stories/traceability-matrix.md)
- [`definition-of-done.md`](../04-pm-stories/definition-of-done.md)
