---
id: S20
parent_epic: E04
parent_feature: F07
status: blocked
priority: P1
order: 20
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-005, PRD-FR-020, ARCH-001, DEC-001]
depends_on: [DEP-004, DEP-006, DEP-010, DEP-011]
---

# S20 — Aprovar sugestão e pré-preencher criação

## Narrativa

**Como** Professor/Admin, **quero** aprovar uma sugestão e abrir a criação pré-preenchida, **para** aproveitar a ideia sem publicar automaticamente um evento incompleto.

## Critérios de aceitação

### AC-S20-01 — Aprovação
- Fonte: [PRD-FR-020](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-20-aprovação-de-sugestão)
- **Dado** uma sugestão pendente
- **Quando** o Professor/Admin aprovar
- **Então** a sugestão deve mudar de estado e a criação de evento deve abrir com título e descrição pré-preenchidos, sem publicação automática.

### AC-S20-02 — Vínculo
- **Então** o vínculo entre sugestão e evento resultante deve ser preservado conforme decisão arquitetural.

## Bloqueios

`CONFLICT-001` e `CONFLICT-003` impedem definir status, entidade e vínculo.

## Task

- `T020` — Transformar sugestão aprovada em formulário pré-preenchido — `blocked`.
