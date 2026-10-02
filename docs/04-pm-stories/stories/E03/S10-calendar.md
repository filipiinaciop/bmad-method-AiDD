---
id: S10
parent_epic: E03
parent_feature: F04
status: done
priority: P1
order: 10
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-002, PRD-FR-010, UX-001, DEC-001]
depends_on: [DEP-004, DEP-008]
---

# S10 — Navegar por calendário

## Narrativa

**Como** Aluno, **quero** alternar para um calendário mensal, **para** localizar eventos pela data.

## Critérios de aceitação

### AC-S10-01 — Mês e evento
- Fonte: [PRD-FR-010](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-10-listagem-de-eventos-em-calendário)
- **Dado** eventos mockados com data válida
- **Quando** o Aluno navegar até o mês correspondente
- **Então** cada evento deve aparecer na data correspondente.

### AC-S10-02 — Consistência com lista
- **Então** alternar entre lista e calendário deve manter o mesmo conjunto de eventos e status aprovados.

## Bloqueios

Resolvidos por `DEC-003`, `DEC-005`, `DEC-008` e `DEC-016`.

## Task

- `T010` — Implementar visualização mensal — `done`. Evidência: [`T010.md`](../../../../_bmad-output/implementation-artifacts/verification/T010.md).
