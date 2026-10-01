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

## Achados pendentes

Dezesseis achados permanecem `aberto`, com responsável definido em [`findings.md`](findings.md). Nenhum foi corrigido por esta camada.

| Responsável | Achados | Natureza |
|---|---|---|
| Integrante 1 — Product / Requirements | `QA-009`, `QA-011`, `QA-012` | lacuna de requisito |
| Integrante 2 — UX | `QA-005`, `QA-013`, `QA-014` | contrato de experiência |
| Integrante 3 — Architect | `QA-006`, `QA-018` | fonte canônica desatualizada |
| Integrante 4 — PM / Stories | `QA-001`, `QA-002`, `QA-003`, `QA-004`, `QA-017` | rastreabilidade |
| Integrantes 1 e 3 | `QA-010` | regra de ciclo de vida |
| Integrantes 2 e 3 | `QA-007`, `QA-008` | ação de UI versus regra de domínio |

A distribuição diz algo sobre a entrega: cinco dos dezesseis achados são de rastreabilidade e dois de fonte canônica. Sete dos dezesseis — quase metade — descrevem documentação que ficou para trás da implementação, não software defeituoso.

## Registro de revalidações

| Data | Achado | Responsável pela correção | Reteste | Resultado |
|---|---|---|---|---|
| 2026-10-01 | [`QA-015`](findings.md#qa-015) | QA / Validation | `npm test` | `revalidado` — 68/68 |
| 2026-10-01 | [`QA-016`](findings.md#qa-016) | QA / Validation | `npm test`, `npm run lint`, `npm run build` | `revalidado` — sem regressão |

Novas revalidações devem ser acrescentadas nesta tabela com a saída real do comando, não com o resultado esperado.

## Fontes lidas

- [`findings.md`](findings.md) — `QA-001` a `QA-018`
- [`definition-of-done.md`](../04-pm-stories/definition-of-done.md) — seção "Evidências mínimas"
- [`evidence-protocol.md`](../00-governance/evidence-protocol.md) — classificação de evidência
- [`decisions.md`](../00-governance/decisions.md) — `DEC-009`
