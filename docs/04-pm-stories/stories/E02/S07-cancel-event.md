---
id: S07
parent_epic: E02
parent_feature: F03
status: done
priority: P1
order: 7
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-006, ARCH-001, DEC-001, DEC-005, DEC-007, DEC-008, UX-002]
depends_on: [DEP-004, DEP-005, DEP-006]
---

# S07 — Cancelar evento

## Narrativa

**Como** Professor/Admin autorizado, **quero** cancelar um evento, **para** impedir novas inscrições sem apagar o histórico.

## Critérios de aceitação

### AC-S07-01 — Cancelamento
- Fonte: [PRD-FR-006](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-6-cancelamento-de-evento)
- **Dado** um evento cancelável
- **Quando** o usuário autorizado confirmar o cancelamento
- **Então** o registro deve assumir o estado aprovado para cancelamento e não aceitar novas inscrições.

### AC-S07-02 — Histórico
- **Então** as inscrições existentes devem seguir a política de histórico confirmada, sem exclusão silenciosa.

## Bloqueios

Resolvidos por `DEC-005`, `DEC-007`, `DEC-008` e `DEC-009`.

## Task

- `T007` — Implementar cancelamento com persistência local — `done`.
