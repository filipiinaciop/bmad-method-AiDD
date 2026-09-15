---
id: PRD-001
type: requirements
title: "PRD: Germinare Tech"
status: final
owner: "Integrante 1 — Product / Requirements"
created: 2026-09-14
updated: 2026-09-15
source_of_truth: "../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md"
---

# PRD-001 — Requirements: Germinare Tech

Este arquivo é a entrada canônica de Requirements para o processo PM/Stories. O conteúdo completo permanece no artefato original gerado pelo BMAD para evitar duas fontes de verdade.

## Fonte de verdade

[PRD completo: Germinare Tech](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md)

O arquivo original deve ser lido antes de criar Epics, Features, Stories, Specs ou Tasks. Este entrypoint organiza os IDs e as relações; ele não substitui o conteúdo do PRD.

## Origem relacionada

- [Product Brief: Germinare Tech](../../_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/brief.md)
- Revisões do PRD: `_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/`

## Mapa de Requirements

Use os IDs padrão desta tabela nas stories, tasks e na matriz de rastreabilidade. O ID nativo do PRD continua preservado para facilitar a leitura do documento original.

| ID padrão | ID nativo | Tipo | Fonte no PRD | Classificação inicial |
|---|---|---|---|---|
| `PRD-001` | Documento inteiro | Requirements | [PRD](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md) | `confirmed` com itens `unknown`/`conflict` explícitos |
| `PRD-VISION-001` | §1 | Visão e proposta de valor | [Visão](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#1-visão) | `confirmed` |
| `PRD-USER-001` | §2.1–§2.2 | Usuários, JTBD e não-usuários | [Usuário-Alvo](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#2-usuário-alvo) | `confirmed` |
| `PRD-UJ-001` a `PRD-UJ-006` | UJ-1 a UJ-6 | Jornadas de usuário | [Jornadas](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) | `mixed` — ver `[ASSUMPTION]` inline |
| `PRD-GLOSSARY-001` | §3 | Glossário e regras de domínio | [Glossário](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#3-glossário) | `confirmed` |
| `PRD-FR-001` a `PRD-FR-024` | FR-1 a FR-24 | Requisitos funcionais | [Funcionalidades](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#4-funcionalidades) | `mixed` — requisitos e `[ASSUMPTION]` devem ser separados |
| `PRD-NG-001` | §5 | Non-Goals | [Non-Goals](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#5-non-goals-explícito) | `confirmed` com notas de decisão |
| `PRD-SCOPE-001` | §6 | Escopo do MVP | [Escopo do MVP](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#6-escopo-do-mvp) | `confirmed` com itens adiados |
| `PRD-SM-001` | SM-1 | Critério de sucesso primário | [Critérios de Sucesso](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#7-critérios-de-sucesso) | `confirmed` |
| `PRD-SM-002` | SM-2 | Critério de entrega acadêmica | [Critérios de Sucesso](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#7-critérios-de-sucesso) | `confirmed` |
| `PRD-SM-003` | SM-3 | Critério de sucesso secundário | [Critérios de Sucesso](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#7-critérios-de-sucesso) | `confirmed` |
| `PRD-SM-C1` | SM-C1 | Contra-métrica | [Critérios de Sucesso](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#7-critérios-de-sucesso) | `confirmed` |
| `PRD-OQ-001` a `PRD-OQ-005` | Questões 1 a 5 | Perguntas abertas | [Questões em Aberto](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#8-questões-em-aberto) | `unknown` até decisão |
| `PRD-ASM-001` | §9 | Índice de suposições | [Índice de Suposições](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#9-índice-de-suposições) | `unknown`/`derived` conforme confirmação |
| `PRD-NFR-001` | Privacy | Privacidade e proteção de dados | [Constraints and Guardrails](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#constraints-and-guardrails) | `confirmed` |
| `PRD-NFR-002` | Guardrails de extensibilidade | Restrições para arquitetura futura | [Constraints and Guardrails](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#constraints-and-guardrails) | `confirmed` como guardrail, não FR |
| `PRD-NFR-003` | Confiabilidade do fluxo principal | NFR transversal | [Cross-Cutting NFRs](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#cross-cutting-nfrs) | `confirmed` |
| `PRD-NFR-004` | Integridade de dados | NFR transversal | [Cross-Cutting NFRs](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#cross-cutting-nfrs) | `confirmed` |
| `PRD-NFR-005` | Retenção de histórico | NFR transversal | [Cross-Cutting NFRs](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#cross-cutting-nfrs) | `confirmed` |
| `PRD-NFR-006` | Plataforma | NFR transversal | [Cross-Cutting NFRs](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#cross-cutting-nfrs) | `mixed` — inclui `[ASSUMPTION]` |
| `PRD-NFR-007` | Desempenho | NFR transversal | [Cross-Cutting NFRs](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#cross-cutting-nfrs) | `confirmed` sem SLA formal |

## Regras para usar o PRD

1. Use o ID padrão nas referências de PM/Stories e o ID nativo ao localizar o texto original.
2. Uma referência completa deve informar ID, caminho e seção:

   ```text
   [PRD-FR-012](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-12-inscrição-em-evento) — Aluno pode se inscrever em Evento Publicado.
   ```

3. `mixed` não significa que tudo está confirmado: separe os requisitos das suposições inline antes de criar uma Story `ready`.
4. `unknown` exige uma pergunta `Q-*` ou decisão `DEC-*`; não pode ser convertido em comportamento por inferência.
5. Se houver conflito entre o PRD, UX ou Arquitetura, registre `conflict` e bloqueie o item até uma decisão.
6. Não altere este entrypoint para copiar trechos do PRD. Atualizações de conteúdo devem ocorrer na fonte de verdade e ser refletidas aqui apenas no mapa de IDs/status.

## Handoff para o Integrante 4

O Integrante 4 deve usar esta sequência:

1. Ler o PRD completo na fonte de verdade.
2. Selecionar os IDs padrão relevantes para o Epic/Feature/Story/Spec/Task.
3. Registrar fatos confirmados, suposições, questões abertas e conflitos.
4. Criar o intake e aguardar confirmação antes de criar artefatos.
5. Atualizar a matriz de rastreabilidade com os IDs usados.
