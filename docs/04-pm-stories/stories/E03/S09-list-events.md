---
id: S09
parent_epic: E03
parent_feature: F04
status: done
priority: P1
order: 9
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-002, PRD-FR-009, DEC-001, UX-001]
depends_on: [DEP-004, DEP-008]
---

# S09 — Listar eventos

## Narrativa

**Como** Aluno, **quero** visualizar os eventos em uma lista, **para** descobrir o que acontece na escola.

## Critérios de aceitação

### AC-S09-01 — Eventos disponíveis
- Fonte: [PRD-FR-009](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-9-listagem-de-eventos)
- **Dado** eventos mockados persistidos
- **Quando** o Aluno abrir a lista
- **Então** os eventos e seus status devem ser apresentados conforme o filtro/estado aprovado.

## Bloqueios

Resolvidos por `DEC-005` e `DEC-008`.

## Task

- `T009` — Renderizar lista de eventos mockados — `done`. Evidência: [`T009.md`](../../../../_bmad-output/implementation-artifacts/verification/T009.md).
