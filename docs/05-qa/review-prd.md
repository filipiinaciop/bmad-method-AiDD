---
id: QA-REVIEW-PRD
type: qa-review
status: done
owner: "Integrante 5 — QA / Validation"
sources: [PRD-001, PRD-FR-001..PRD-FR-024, PRD-NFR-001..PRD-NFR-007, DEC-005, DEC-009]
depends_on: [PRD-001]
---

# Revisão do PRD

Revisão de [`PRD-001`](../01-inputs/prd.md) e da fonte de verdade [`prd.md`](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md), com foco em três perguntas: cada requisito é verificável, cada suposição está marcada, e o comportamento implementado corresponde ao que o documento promete.

## Veredito

O PRD é o artefato mais maduro do projeto. Possui `[ASSUMPTION]` explícito em cada inferência, índice de suposições consolidado em §9, questões abertas separadas em §8 e uma seção de reconciliação com as decisões de implementação. A separação entre requisito e suposição — exigida pelo entrypoint `PRD-001` antes de uma Story virar `ready` — está feita na origem.

Dois problemas sobraram, ambos na fronteira entre o PRD e o que foi efetivamente construído: um requisito faltante para um ator que ganhou capacidade depois ([`QA-009`](findings.md#qa-009)) e o efeito colateral não registrado de um requisito deferido ([`QA-012`](findings.md#qa-012)).

## Cobertura dos requisitos funcionais

Classificação por confronto entre o texto do PRD e o comportamento verificado em `src/models/domain.js` via suíte automatizada.

### 4.1 Autenticação e contas

| FR | Requisito | Situação | Evidência |
|---|---|---|---|
| FR-1 | Login por credenciais | `confirmed` | `TEST-S01-01`..`TEST-S01-03` |
| FR-2 | Criação manual de conta | `confirmed` | `TEST-S02-01`..`TEST-S02-04` |
| FR-3 | Controle de acesso por perfil | `confirmed` | `TEST-S03-01`..`TEST-S03-03` |
| FR-23 | Redefinição de senha | `confirmed` | `TEST-S04-01`, `TEST-S04-02` |

`FR-1` exige que a falha de login não revele se o e-mail existe. `authenticate` retorna `null` para e-mail inexistente e para senha errada, sem distinção — a exigência está atendida na origem, não só na mensagem de interface.

`FR-2` vai além do texto: a violação de unicidade responde `Não foi possível criar a conta com os dados informados.` em vez de "e-mail já cadastrado". O PRD não pedia isso. É uma decisão de implementação acertada e que vale registrar, porque uma refatoração futura pode "melhorar" a mensagem e reintroduzir a enumeração de contas.

### 4.2 Gestão de eventos

| FR | Requisito | Situação | Evidência |
|---|---|---|---|
| FR-4 | Criação de evento | `confirmed` | `TEST-S05-01`..`TEST-S05-03` |
| FR-5 | Edição de evento | `confirmed` | `TEST-S06-01`, `TEST-S06-02` |
| FR-6 | Cancelamento de evento | `confirmed` com desvio de UI | `TEST-S07-01`..`TEST-S07-03` · [`QA-007`](findings.md#qa-007) |
| FR-7 | Encerramento automático | `deferred` por `DEC-005` | [`QA-012`](findings.md#qa-012) |
| FR-8 | Visualização de inscritos | `confirmed` | `TEST-S08-01` |

`FR-4` traz uma convenção de teste explícita: *"inscrições só são limitadas quando há limite de vaga definido; na ausência, o número de inscritos é ilimitado para efeito de teste — ao menos 1000"*. Essa convenção não tinha teste. Foi coberta em `TEST-S13-02`, com 1000 inscrições aceitas em evento sem capacidade.

`FR-5` prevê o bloqueio de reduzir a vaga abaixo do número de inscrições confirmadas. Implementado em `updateEvent` como `CAPACITY_TOO_LOW`, verificado por `TEST-S06-02`.

**`FR-7` é o único requisito funcional do MVP sem implementação**, por decisão rastreável (`DEC-005` deferiu `ENCERRADO`). O que não está registrado é a consequência: sem `ENCERRADO`, nenhum mecanismo distingue evento passado de futuro, e um evento com data vencida continua `APROVADO` e aceitando inscrição. Ver [`QA-012`](findings.md#qa-012).

### 4.3 Descoberta de eventos

| FR | Requisito | Situação | Evidência |
|---|---|---|---|
| FR-9 | Listagem de eventos | `confirmed` com ressalva | `TEST-S09-01`, `TEST-S09-02` |
| FR-10 | Calendário | `confirmed` | `TEST-S10-01` · implementação `renderCalendar` |
| FR-11 | Detalhe do evento | `confirmed` | `TEST-S11-01`, `TEST-S11-02` |

A suposição §9 de `FR-9` — *"alunos veem eventos em todos os Status (não só Publicado)"* — merece atenção, porque à primeira vista a implementação a contraria: `renderEvents` filtra `APROVADO` e `CANCELADO`.

Não há contradição. Os status do PRD eram `Publicado`, `Cancelado` e `Encerrado`; `DEC-005` deferiu `ENCERRADO`. O filtro, portanto, exibe **todos os status que existiam no vocabulário do PRD**. `PENDENTE` e `NEGADO` nasceram na arquitetura, depois do requisito, e nunca foram cobertos por essa suposição.

O que falta é a superfície de acompanhamento para quem criou um evento `PENDENTE` — ver [`QA-009`](findings.md#qa-009).

### 4.4 Inscrições

| FR | Requisito | Situação | Evidência |
|---|---|---|---|
| FR-12 | Inscrição em evento | `confirmed` | `TEST-S12-01`..`TEST-S12-03` |
| FR-13 | Prevenção de duplicidade | `confirmed` | `TEST-S13-01` |
| FR-14 | Bloqueio em evento indisponível | `confirmed` | `TEST-S12-02` |
| FR-15 | Respeito ao limite de vaga | `confirmed` | `TEST-S13-02`, `TEST-S13-03` |
| FR-16 | Cancelamento da própria inscrição | `confirmed` | `TEST-S14-01`, `TEST-S14-02` |
| FR-17 | Minhas inscrições | `confirmed` | `TEST-S15-01`, `TEST-S15-02` |
| FR-22 | Cancelamento pelo Professor/Admin | `confirmed` | `TEST-S16-01` |

Este é o bloco mais bem especificado do PRD e o mais bem implementado. Todas as regras de borda descritas no glossário §3 foram verificadas: inscrição cancelada permanece como registro histórico inativo, o Aluno pode se reinscrever depois de cancelar, e o cancelamento devolve a vaga imediatamente.

A garantia de concorrência de `FR-13`/`FR-15` está limitada pelo que `DEC-012` promete — chamadas repetidas no mesmo store, não atomicidade entre abas. `TEST-S13-03` exercita doze tentativas sequenciais contra duas vagas restantes e confirma que exatamente duas são aceitas.

### 4.5 e 4.6 Sugestões

| FR | Requisito | Situação | Evidência |
|---|---|---|---|
| FR-18 | Envio de sugestão | `confirmed` | `TEST-S17-01`, `TEST-S17-02` |
| FR-19 | Fila de análise | `confirmed` | `TEST-S19-01` |
| FR-20 | Aprovação de sugestão | `confirmed` | `TEST-S20-01`, `TEST-S20-02` |
| FR-21 | Rejeição de sugestão | `confirmed` | `TEST-S21-01`, `TEST-S21-02` |
| FR-24 | Minhas sugestões | `confirmed` | `TEST-S18-01` |

`FR-20` é explícito ao exigir que aprovar uma sugestão **não** publique um evento automaticamente. `reviewSuggestion` apenas muda o status; o vínculo `suggestion.eventoId` só é escrito quando `createEvent` recebe `suggestionId` e a sugestão está aprovada. O requisito está atendido com precisão, incluindo a suposição §9 de que a sugestão aprovada não retorna à fila se a criação for abandonada.

A regra de privacidade de `FR-18` e `FR-24` — o Aluno nunca vê sugestões de outros alunos — não tinha teste com dois alunos distintos. Coberta em `TEST-S18-01`.

## Requisitos não funcionais

| NFR | Conteúdo | Situação | Evidência |
|---|---|---|---|
| `PRD-NFR-001` | Privacidade: dados de aluno visíveis só a quem tem papel | `confirmed` | `TEST-S04-02`, `TEST-S15-01`, `TEST-S18-01` |
| `PRD-NFR-002` | Guardrails de extensibilidade | `confirmed` | `ARCH-DEC-010` mantém o modelo relacional como evolução |
| `PRD-NFR-003` | Confiabilidade do fluxo principal | `confirmed` | SM-1 verificado ponta a ponta |
| `PRD-NFR-004` | Integridade de dados | `confirmed` | `TEST-NFR-03`, `TEST-NFR-05` |
| `PRD-NFR-005` | Retenção de histórico | `confirmed` | `TEST-S15-02` |
| `PRD-NFR-006` | Plataforma | `confirmed` | `DEC-001`, smoke HTTP |
| `PRD-NFR-007` | Desempenho sem SLA formal | `confirmed` | `TEST-S13-02` com 1000 registros |

`PRD-NFR-001` é o NFR mais exposto a regressão, porque depende de `sanitizeUser` ser aplicado em cada superfície de leitura. `TEST-S04-02` percorre as sete superfícies — `authenticate`, `createAccount`, `resetPassword`, `listSubscribers`, `listMyEnrollments`, `listMySuggestions` e `listSuggestionQueue` — e confirma que nenhuma devolve o campo `senha`. O isolamento entre alunos distintos é coberto por `TEST-S15-01` e `TEST-S18-01`.

`PRD-NFR-004` exige que uma operação recusada não deixe efeito parcial. `TEST-NFR-03` verifica a integridade do estado após erro de permissão e após erro de capacidade; `TEST-NFR-05` confirma que mutar o retorno de leitura não altera o estado interno.

## Questões abertas do PRD

| ID | Questão | Situação |
|---|---|---|
| `PRD-OQ-001`..`005` | §8 do PRD | permanecem `unknown` |

Nenhuma das cinco questões abertas foi fechada, e isso está correto: todas tratam de evolução pós-MVP (retenção de eventos encerrados, horizonte de arquivamento, notificações). Nenhuma Story depende delas. A questão 4 — *"Alunos devem continuar vendo Eventos Encerrados indefinidamente?"* — perde o objeto no MVP, já que `ENCERRADO` não existe.

O ponto de atenção é inverso ao usual: as questões abertas estão bem contidas, e o risco está nas respostas que foram dadas fora do PRD. A criação de evento por Aluno é o caso — nasceu em `ARCH-DATA-005`, foi confirmada por `DEC-005` e nunca voltou ao PRD como requisito. Ver [`QA-009`](findings.md#qa-009).

## Observação de vocabulário

O PRD descreve o ciclo de vida do evento como `Publicado` / `Cancelado` / `Encerrado`. A implementação usa `PENDENTE` / `APROVADO` / `NEGADO` / `CANCELADO`. `DEC-005` define o ciclo novo por extenso, e [`E02-event-lifecycle.md`](../04-pm-stories/epics/E02-event-lifecycle.md) proíbe explicitamente resolver essa diferença por inferência.

A decisão resolve o ciclo, mas **não declara a equivalência terminológica**: nenhuma fonte diz que `Publicado` corresponde a `APROVADO`. A correspondência é `derived` — sustentada pelo fato de ser o único estado em que o evento aceita inscrição, nos dois vocabulários.

Classificação: `derived`, risco baixo, sem achado aberto. Vale uma linha em `DEC-005` na próxima revisão, porque toda a rastreabilidade de `FR-4` a `FR-16` depende dessa leitura.

## Fontes lidas

- [`PRD-001`](../01-inputs/prd.md) — entrypoint e mapa de IDs
- [`prd.md`](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md) — §1 a §9, Constraints and Guardrails, Cross-Cutting NFRs, Reconciliation
- [`brief.md`](../../_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/brief.md) — contexto de origem
- [`decisions.md`](../00-governance/decisions.md) — `DEC-001` a `DEC-012`
- `src/models/domain.js` — comportamento verificado
