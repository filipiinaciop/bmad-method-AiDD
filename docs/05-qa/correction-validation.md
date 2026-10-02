---
id: QA-CORRECTION-VALIDATION
type: qa-validation
status: done
owner: "Integrante 5 — QA / Validation"
sources: [QA-FINDINGS, DEC-009]
depends_on: [QA-FINDINGS, QA-READINESS]
---

# Validação de correções

Protocolo de reteste dos achados registrados em [`findings.md`](findings.md) e registro das correções já validadas.

## Estados de um achado

| Estado | Significado |
|---|---|
| `aberto` | identificado, com responsável, sem correção |
| `em-correção` | o responsável assumiu; ainda sem evidência de reteste |
| `revalidado` | corrigido e verificado por reteste com evidência registrada |
| `aceito-com-registro` | comportamento mantido deliberadamente, com `DEC-*` que o assume |

Um achado nunca passa direto de `aberto` para fechado. Ou tem evidência de reteste, ou tem decisão que o assume — não existe terceira via.

## Protocolo de reteste

1. **Localizar a evidência original.** Cada achado em `findings.md` traz arquivo, linha e, quando aplicável, o cenário de caracterização que fixou o comportamento.
2. **Reexecutar os comandos oficiais de `DEC-009`** — `npm test`, `npm run lint`, `npm run build` — e registrar a saída real, não o resultado esperado.
3. **Tratar o teste de caracterização.** Se o achado tinha um `TEST-*` marcado `[caracterização QA-###]`, ele **vai falhar** após a correção. Isso é o comportamento desejado: significa que o comportamento mudou. O cenário deve ser reescrito para afirmar a regra nova.
4. **Verificar ausência de regressão** no restante da suíte.
5. **Atualizar o estado** do achado em `findings.md` e registrar a entrada na tabela deste documento.

O passo 3 é o que mais costuma ser feito errado. Um teste de caracterização falhando após uma correção não é um bug introduzido — é o marcador cumprindo sua função. Removê-lo sem substituir pela afirmação da regra nova deixa o comportamento corrigido sem cobertura.

## Achados com teste de caracterização

Três achados têm cenário que precisa ser reescrito quando forem corrigidos:

| Achado | Cenário atual | O que o cenário deve afirmar após a correção |
|---|---|---|
| [`QA-010`](findings.md#qa-010) | `TEST-S06-04` — evento `NEGADO` permanece editável | `NEGADO` é terminal e `updateEvent` lança `TERMINAL_EVENT` — ou, se a decisão for permitir, manter o cenário com a `DEC-*` citada no nome |
| [`QA-009`](findings.md#qa-009) | `TEST-S09-01` — evento `PENDENTE` do aluno fica fora do filtro | a superfície de acompanhamento devolve o evento `PENDENTE` ao autor |
| [`QA-012`](findings.md#qa-012) | `TEST-NFR-04` — evento com data passada aceita inscrição | `createEvent` recusa data passada, ou `enroll` recusa evento vencido, conforme a decisão |

Se a decisão for manter o comportamento, o achado vira `aceito-com-registro` e o cenário permanece — mas o nome deve trocar `[caracterização QA-###]` pela `DEC-*` que assumiu o comportamento. O teste deixa de ser marcador de pendência e passa a ser validação de regra.

## Correções validadas nesta entrega

Dois achados foram corrigidos dentro desta camada, por serem de infraestrutura de validação e não de comportamento de produto — o limite de autoridade descrito em [`README.md`](README.md#autoridade-e-limites) permite isso e proíbe alterar `src/`.

### QA-015 — Comando oficial de teste não cobria toda a pasta `tests/`

**Estado:** `revalidado`

`package.json` executava apenas `tests/domain.test.js`. Qualquer suíte nova ficaria fora do comando oficial de `DEC-009` — ou seja, produziria evidência não verificável pelo caminho que o projeto define como oficial.

**Correção:** o script `test` passou a incluir os dois arquivos.

```diff
- "test": "node --test tests/domain.test.js"
+ "test": "node --test tests/domain.test.js tests/qa-scenarios.test.js"
```

A forma `node --test tests/` foi descartada: no Node 22 em uso, o diretório é interpretado como caminho de módulo e o comando falha com `Cannot find module`. A enumeração explícita é a opção que funciona na versão corrente.

**Reteste:**

```text
$ npm test
1..68
# tests 68
# pass 68
# fail 0
# duration_ms 148.02625
```

Antes: 15 casos executados pelo comando oficial. Depois: 68. Nenhuma regressão nos 15 originais.

### QA-016 — Lacunas de cobertura automatizada em regras já exigidas

**Estado:** `revalidado`

Regras já declaradas nas fontes não tinham cenário automatizado. Não eram comportamentos errados: eram exigências sem verificação, que passariam despercebidas em qualquer refatoração.

**Correção:** 53 cenários acrescentados em `tests/qa-scenarios.test.js`.

Lacunas que mais importavam:

| Regra sem cobertura | Fonte | Cenário criado |
|---|---|---|
| 1000 inscrições em evento sem capacidade | `PRD-FR-004` (convenção de teste explícita) | `TEST-S13-02` |
| Nenhuma superfície de leitura expõe senha | `PRD-NFR-001`, `DEC-003` | `TEST-S04-02` |
| Aluno negado por chamada direta, não só por UI | `AC-S03-01` | `TEST-S03-01` |
| Isolamento de sugestões entre alunos | `PRD-FR-018` | `TEST-S18-01` |
| Dados corrompidos restauram o seed | regra adicional do MVP | `TEST-NFR-01` |
| Operação recusada não deixa efeito colateral | `PRD-NFR-004` | `TEST-NFR-03` |
| Aprovar sugestão não publica evento | `PRD-FR-020` | `TEST-S20-01` |

**Reteste:** 68/68, `lint` e `build` sem erro. Nenhum arquivo em `src/` foi alterado — a cobertura foi acrescentada sobre o comportamento existente, sem modificá-lo.

## Achados que esta camada não corrigiu

Vinte achados foram levantados por esta camada mas corrigidos pelos responsáveis de cada artefato, não por ela. A tabela abaixo preserva a distribuição original por responsável, porque ela diz algo sobre a entrega. Todos já estão `revalidado` em [`findings.md`](findings.md).

| Responsável | Achados | Natureza |
|---|---|---|
| Integrante 1 — Product / Requirements | `QA-009`, `QA-011`, `QA-012` | lacuna de requisito |
| Integrante 2 — UX | `QA-005`, `QA-013`, `QA-014`, `QA-020`, `QA-021`, `QA-022` | contrato de experiência |
| Integrante 3 — Architect | `QA-006`, `QA-018` | fonte canônica desatualizada |
| Integrante 4 — PM / Stories | `QA-001`, `QA-002`, `QA-003`, `QA-004`, `QA-017`, `QA-019` | rastreabilidade |
| Integrantes 1 e 3 | `QA-010` | regra de ciclo de vida |
| Integrantes 2 e 3 | `QA-007`, `QA-008` | ação de UI versus regra de domínio |

Seis dos vinte são de rastreabilidade e dois de fonte canônica. Oito dos vinte — quase metade — descrevem documentação que ficou para trás da implementação, não software defeituoso. Os seis de UX se dividem em dois grupos: `QA-005`, `QA-013` e `QA-014` saíram da leitura dos artefatos; `QA-020` a `QA-022` só apareceram com a aplicação em execução.

## Registro de revalidações

| Data | Achado | Responsável pela correção | Reteste | Resultado |
|---|---|---|---|---|
| 2026-10-01 | [`QA-015`](findings.md#qa-015) | QA / Validation | `npm test` | `revalidado` — 68/68 |
| 2026-10-01 | [`QA-016`](findings.md#qa-016) | QA / Validation | `npm test`, `npm run lint`, `npm run build` | `revalidado` — sem regressão |
| 2026-10-01 | [`QA-001`](findings.md#qa-001) | Integrante 4 — PM / Stories | leitura dos 32 artefatos | `revalidado` — nenhum `blocked` em Epics, Features ou Stories |
| 2026-10-01 | [`QA-002`](findings.md#qa-002) | Integrante 4 — PM / Stories | leitura das 21 Stories | `revalidado` — estado da Task coerente com a Story |
| 2026-10-01 | [`QA-003`](findings.md#qa-003) | Integrante 4 — PM / Stories | leitura dos Epics | `revalidado` — seção "Bloqueios" removida |
| 2026-10-01 | [`QA-004`](findings.md#qa-004) | Integrante 4 — PM / Stories | leitura de `decisions.md` | `revalidado` — 19 decisões em tabela única válida |
| 2026-10-01 | [`QA-005`](findings.md#qa-005) | Integrante 2 — UX | leitura de `ux.md` | `revalidado` — `status: confirmed`, sem contradição interna |
| 2026-10-01 | [`QA-006`](findings.md#qa-006) | Integrante 3 — Architect | leitura de `architecture.md` | `revalidado` — `owner: "Integrante 3 — Architect"` |
| 2026-10-01 | [`QA-007`](findings.md#qa-007) | Integrantes 2 e 3 | observação em execução | `revalidado` — "Cancelar evento" só em `APROVADO` |
| 2026-10-01 | [`QA-008`](findings.md#qa-008) | Integrantes 2 e 3 | observação em execução | `revalidado` — "Editar" oculto em `CANCELADO` e `NEGADO` |
| 2026-10-01 | [`QA-009`](findings.md#qa-009) | Integrante 1 — Product | `TEST-S09-03` + observação | `revalidado` — superfície "Minhas propostas" |
| 2026-10-01 | [`QA-010`](findings.md#qa-010) | Integrantes 1 e 3 | `TEST-S06-04` | `revalidado` — `NEGADO` é terminal para edição |
| 2026-10-01 | [`QA-011`](findings.md#qa-011) | Integrante 1 — Product | `TEST-S05-04` + observação | `revalidado` — autor retira proposta `PENDENTE` |
| 2026-10-01 | [`QA-012`](findings.md#qa-012) | Integrante 1 — Product | `TEST-NFR-04` | `revalidado` — criação recusa data passada; `ENCERRADO` segue deferido |
| 2026-10-01 | [`QA-013`](findings.md#qa-013) | Integrante 2 — UX | observação em execução | `revalidado` — erro de formulário em `#form-feedback` |
| 2026-10-01 | [`QA-014`](findings.md#qa-014) | Integrante 2 — UX | observação em execução | `revalidado` — `tabindex="-1"` nos alvos de foco |
| 2026-10-01 | [`QA-017`](findings.md#qa-017) | Integrante 4 — PM / Stories | leitura da matriz | `revalidado` — contagem corrigida para 71 |
| 2026-10-01 | [`QA-018`](findings.md#qa-018) | Integrante 3 — Architect | leitura de `architecture.md` | `revalidado` — `DEC-006` e `DEC-007` refletidos |
| 2026-10-01 | [`QA-019`](findings.md#qa-019) | Integrante 4 — PM / Stories | auditoria de links | `revalidado` — âncoras resolvem |
| 2026-10-01 | [`QA-020`](findings.md#qa-020) | Integrante 2 — UX | observação em execução + `npm test` | `revalidado` — expira em 5 s / 10 s |
| 2026-10-01 | [`QA-021`](findings.md#qa-021) | Integrante 2 — UX | observação em execução + `npm test` | `revalidado` — retorno à tela de origem |
| 2026-10-01 | [`QA-022`](findings.md#qa-022) | Integrante 2 — UX | observação em execução + `npm test` | `revalidado` — campos e sessão limpos |

Novas revalidações devem ser acrescentadas nesta tabela com a saída real do comando, não com o resultado esperado.

## Revalidação de QA-020 a QA-022 — defeitos de interface

`QA-020`, `QA-021` e `QA-022` são de camada de view e controller. O controller é uma IIFE acoplada a `window` e `document`, e o projeto não tem ambiente de DOM nos testes. Introduzir um não é opção: [`AGENTS.md`](../../AGENTS.md) proíbe adicionar tecnologias desnecessárias ao escopo. A evidência destes três é, portanto, **observação de comportamento na aplicação em execução**, classificada como tal por [`evidence-protocol.md`](../00-governance/evidence-protocol.md) — não como cobertura automatizada.

Instrumentação: servidor local em `node server.js`, `localStorage` zerado antes de cada rodada, leitura direta do DOM após cada ação.

### QA-020 — expiração do feedback

Feedback de sucesso, após `cancel-enrollment`, lendo `#feedback` a cada intervalo:

```text
t=0     "Inscrição cancelada."  class="feedback success"
t=4000  "Inscrição cancelada."  class="feedback success"
t=5000  ""                      class="feedback"
t=7000  ""                      class="feedback"
```

Feedback de erro, após submeter credencial inválida, lendo `#auth-feedback`:

```text
t=0      "Não foi possível entrar com essas credenciais."  class="feedback error"
t=5000   "Não foi possível entrar com essas credenciais."  class="feedback error"
t=10000  ""                                               class="feedback"
```

O erro expira em 10 s e o sucesso em 5 s, conforme `DEC-017`. A primeira medição desta rodada registrou o sucesso limpo antes de 5 s; a releitura com marcação de tempo acumulado mostrou que o erro estava no instrumento, não no código. Fica o registro: medição de temporizador exige âncora de tempo explícita, não soma de intervalos de `await`.

O erro de autenticação só passou a expirar depois de uma correção adicional nesta rodada — ele escrevia direto no elemento, sem passar por `setFeedback`.

### QA-021 — retorno para a tela anterior

Percurso Calendário → detalhe do evento → "← Voltar":

```text
activeNav: "Calendário"
#view-content h2: ["Calendário de eventos"]
```

O retorno levou à tela de origem real, não à lista de eventos. Confere com `DEC-018`.

### QA-022 — limpeza das credenciais no logout

Login com `aluna@germinare.edu.br`, depois clique em `#logout-button`:

```text
logado    -> #auth-view.hidden = true,  #user-identity = "Ana Souza · Aluno"
pós-logout-> #auth-view.hidden = false, #login-email = "", #login-password = ""
             #auth-feedback = "", sessão em localStorage = null
             autocomplete: form="off", email="off", senha="new-password"
```

Campos e feedback limpos, sessão removida. Confere com `DEC-019`.

### Comandos oficiais de DEC-009 após a rodada

```text
npm test        -> # tests 71  # pass 71  # fail 0
npm run lint    -> Lint OK: 6 arquivos JavaScript verificados.
npm run build   -> Build OK: baseline MVC, assets e referências da aplicação estão completos.
```

Sem regressão na suíte existente. Nenhum cenário novo foi adicionado a `tests/` para estes três achados, porque nenhum deles é verificável na camada de domínio — afirmar o contrário seria inflar a contagem de cobertura sem cobrir nada. As linhas correspondentes estão na tabela de [Registro de revalidações](#registro-de-revalidações).

## Fontes lidas

- [`findings.md`](findings.md) — `QA-001` a `QA-022`
- [`definition-of-done.md`](../04-pm-stories/definition-of-done.md) — seção "Evidências mínimas"
- [`evidence-protocol.md`](../00-governance/evidence-protocol.md) — classificação de evidência
- [`decisions.md`](../00-governance/decisions.md) — `DEC-009`
