---
id: S16
parent_epic: E03
parent_feature: F05
status: done
priority: P1
order: 16
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-022, ARCH-001, DEC-001]
depends_on: [DEP-002, DEP-005, DEP-009]
---

# S16 — Cancelar inscrição como Professor/Admin

## Narrativa

**Como** Professor/Admin autorizado, **quero** cancelar a inscrição de um aluno, **para** corrigir a lista e liberar uma vaga quando necessário.

## Critérios de aceitação

### AC-S16-01 — Cancelamento administrativo
- Fonte: [PRD-FR-022](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-22-cancelamento-de-inscrição-pelo-professoradmin)
- **Dado** uma inscrição de outro Aluno
- **Quando** o Professor/Admin autorizado cancelar
- **Então** a inscrição deve ser atualizada conforme a política aprovada e a vaga recalculada.

## Bloqueios

Permissões de Admin, histórico de inscrição e política de cancelamento ainda estão abertos.

## Task

- `T016` — Permitir cancelamento administrativo — `blocked`.
