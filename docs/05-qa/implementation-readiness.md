---
id: QA-READINESS
type: qa-gate
status: done
owner: "Integrante 5 — QA / Validation"
sources: [PRD-001, UX-001, ARCH-001, DEC-009, E01, E02, E03, E04]
depends_on: [QA-FINDINGS, QA-AC-VALIDATION, QA-BUSINESS-RULES]
---

# Implementation Readiness

Gate de prontidão da entrega do Germinare Tech. Avalia se o MVP está pronto para a revisão final e o walkthrough humano registrados como `next_gate` em [`sprint-status.yaml`](../../_bmad-output/sprint-status.yaml).

## Veredito

**GO CONDICIONAL** para a entrega do software.
**NO-GO** para promover [`architecture.md`](../01-inputs/architecture.md) de `proposed` a `approved`.

A distinção é a conclusão central desta camada. O produto construído está correto: 23 dos 24 requisitos funcionais implementados, 38 critérios de aceitação atendidos, 12 decisões de negócio respeitadas, 68 testes passando, zero vulnerabilidades. O que bloqueia não é o código — é a documentação canônica, que descreve um sistema diferente do que foi entregue.

Entregar o MVP com os achados abertos e registrados é defensável. Carimbar como `approved` uma arquitetura que não contém um terço das entidades implementadas, não é.

## Critérios do gate

| # | Critério | Resultado |
|---|---|---|
| 1 | Comandos oficiais de `DEC-009` executam sem erro | **passa** |
| 2 | Suíte automatizada verde | **passa** — 68/68 |
| 3 | Critérios de aceitação atendidos | **passa** — 38/38, 1 com desvio registrado |
| 4 | Regras de negócio `DEC-001`–`DEC-012` respeitadas | **passa** — 12/12 |
| 5 | Regras arquiteturais de `AGENTS.md` respeitadas | **passa com ressalva** — 15/16 |
| 6 | Requisitos funcionais do MVP implementados | **passa** — 23/24, 1 deferido por decisão |
| 7 | Nenhum achado de severidade alta sem registro e responsável | **passa** — 7 registrados, todos com owner |
| 8 | Fontes canônicas consistentes com a implementação | **falha** — [`QA-018`](findings.md#qa-018) |
| 9 | Rastreabilidade reflete o estado real | **falha** — [`QA-001`](findings.md#qa-001), [`QA-002`](findings.md#qa-002), [`QA-003`](findings.md#qa-003) |
| 10 | Superfícies visuais verificadas | **pendente** — walkthrough manual não executado |

Sete critérios aprovados, dois reprovados, um pendente. Os dois reprovados são documentais; o pendente depende de execução humana.

## Evidência de execução

```text
$ npm test
1..68
# tests 68
# suites 0
# pass 68
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 148.02625

$ npm run lint
> node scripts/lint.js
Lint OK: 6 arquivos JavaScript verificados.

$ npm run build
> node scripts/build.js
Build OK: baseline MVC, assets e referências da aplicação estão completos.

$ npm ci
added 73 packages, and audited 74 packages in 2s
found 0 vulnerabilities
```

Smoke HTTP com `npm start` ativo:

```text
/                               -> 200
/models/domain.js               -> 200
/models/store.js                -> 200
/controllers/app-controller.js  -> 200
/public/styles.css              -> 200
/rota-inexistente               -> 404
x-powered-by ausente (OK)
```

## O que bloqueia a promoção da arquitetura

[`architecture.md`](../01-inputs/architecture.md) lista os próprios critérios para sair de `proposed`. Dois não estão cumpridos:

**[`QA-018`](findings.md#qa-018) — modelo de dados desatualizado.** `ARCH-DATA-005` não tem `capacidade` nem `criadoPor`. `ARCH-DATA-006` não tem `status` de inscrição e ainda declara `CONFLICT-002` como aberto. A entidade `SUGESTAO` não existe — o modelo vai de `ARCH-DATA-000` a `ARCH-DATA-006` sem ela.

Todos os três foram decididos por `DEC-006` e `DEC-007`, estão implementados e testados. A regra de [`decisions.md`](../00-governance/decisions.md) — *"uma decisão confirmada deve ser refletida na fonte canônica afetada"* — foi cumprida para `DEC-001` e não para essas duas.

A consequência prática é concreta: `AGENTS.md` manda respeitar `ARCH-DATA-*`. Quem seguir essa instrução literalmente constrói um sistema sem capacidade de evento e sem sugestões.

**[`QA-006`](findings.md#qa-006) — responsável e versão não confirmados.** Item explícito do checklist do próprio documento.

Ambos têm correção barata — edição de documento, sem tocar em código. Fechados, a promoção passa a ser defensável.

## O que não bloqueia, mas precisa de decisão

Seis achados descrevem comportamento real do produto que nenhuma fonte especifica. Não são defeitos de implementação: são lacunas de requisito que apareceram quando o software foi exercitado.

| Achado | Comportamento | Decisão necessária |
|---|---|---|
| [`QA-009`](findings.md#qa-009) | Aluno que propõe evento nunca mais o vê | Criar superfície de acompanhamento ou assumir a ausência |
| [`QA-010`](findings.md#qa-010) | Evento `NEGADO` permanece editável | Definir se `NEGADO` é terminal |
| [`QA-011`](findings.md#qa-011) | Autor não pode editar nem retirar a própria proposta | Definir permissões do Aluno sobre o evento que criou |
| [`QA-012`](findings.md#qa-012) | Evento com data passada aceita inscrição | Validar data futura ou assumir o efeito de deferir `ENCERRADO` |
| [`QA-007`](findings.md#qa-007) | "Cancelar evento" oferecido em estado que o domínio recusa | Condicionar o botão ao status |
| [`QA-008`](findings.md#qa-008) | "Editar" oferecido em evento cancelado | Condicionar o botão ao status |

Os três primeiros formam um conjunto: o Aluno pode criar um evento e, a partir daí, perde completamente o controle sobre ele. Não vê, não edita, não cancela. Cada peça é fiel à sua fonte — a matriz RBAC de `ARCH-SEC-007` foi desenhada da perspectiva administrativa —, mas a combinação produz um fluxo que ninguém especificou.

Vale uma decisão conjunta, não três isoladas.

`QA-007` e `QA-008` são baratos e visíveis: dois `if` adicionais em `eventCard`. São os achados com melhor relação entre custo de correção e qualidade percebida no walkthrough.

## Walkthrough manual pendente

A suíte exercita o domínio. Três áreas só podem ser verificadas com a aplicação aberta:

| Área | O que verificar | Referência |
|---|---|---|
| Calendário mensal | evento no dia 1, no último dia e no mês corrente do seed (`2026-10`) | `AC-S10-01` |
| Estados de erro e foco | mensagem de erro em formulário longo; posição e perceptibilidade | [`QA-013`](findings.md#qa-013), [`QA-014`](findings.md#qa-014) |
| Responsividade | 850px (sidebar vira barra horizontal) e 560px (formulário em coluna) | `UX-002` |

Roteiro sugerido, cobrindo `SM-1` do PRD ponta a ponta:

1. Entrar como `professor@germinare.edu.br` e criar um evento com capacidade 2.
2. Entrar como `aluna@germinare.edu.br`, localizar o evento pela busca, abrir o detalhe e inscrever-se.
3. Cancelar a inscrição em "Minhas inscrições" e confirmar que a vaga voltou.
4. Enviar uma sugestão e confirmar que aparece em "Minhas sugestões" como pendente.
5. Entrar como professor, aprovar a sugestão e confirmar o formulário pré-preenchido.
6. Criar um evento como aluno e observar que ele não aparece em lugar nenhum — confirma [`QA-009`](findings.md#qa-009) visualmente.
7. Na tela de gestão, observar o botão "Cancelar evento" em um evento `PENDENTE` e clicá-lo — confirma [`QA-007`](findings.md#qa-007).

Os passos 6 e 7 existem para que o walkthrough confirme os dois achados mais relevantes com os próprios olhos, em vez de confiar no relato desta camada.

## Condições para fechar o gate

**Para promover a arquitetura a `approved`:**

1. Fechar [`QA-018`](findings.md#qa-018) — atualizar `ARCH-DATA-005`, `ARCH-DATA-006`, criar `ARCH-DATA-007 — SUGESTAO` e remover a referência a `CONFLICT-002`.
2. Fechar [`QA-006`](findings.md#qa-006) — confirmar responsável e versão.

**Para a rastreabilidade refletir o estado real:**

3. Fechar [`QA-001`](findings.md#qa-001), [`QA-002`](findings.md#qa-002) e [`QA-003`](findings.md#qa-003) — propagar o estado `done` nos três níveis da hierarquia e atualizar as seções "Bloqueios".
4. Fechar [`QA-017`](findings.md#qa-017) — corrigir a contagem de evidência na matriz.

**Para o produto:**

5. Decidir os seis achados de comportamento acima, cada um virando correção ou `DEC-*` que o assuma conscientemente.
6. Executar o walkthrough manual.

Itens 1 a 4 são edição de documento. Item 5 exige decisão de produto. Item 6 exige uma pessoa com o navegador aberto.

## Reavaliação

Este veredito vale para o estado verificado nesta data. Cada correção deve ser revalidada pelo protocolo de [`correction-validation.md`](correction-validation.md) antes de o gate ser reaberto.

Um achado só passa a `revalidado` com evidência de reteste. Fechar um item na lista acima sem reexecutar a suíte e sem registrar a saída real não satisfaz a [`definition-of-done.md`](../04-pm-stories/definition-of-done.md), que é explícita: *"'Funcionou', 'parece correto' ou a simples existência de um arquivo não são evidências suficientes."*
