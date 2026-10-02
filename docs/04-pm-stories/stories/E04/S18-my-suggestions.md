---
id: S18
parent_epic: E04
parent_feature: F06
status: done
priority: P1
order: 18
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-004, PRD-FR-024, DEC-001, UX-001]
depends_on: [DEP-010, DEP-011]
---

# S18 — Consultar minhas sugestões

## Narrativa

**Como** Aluno, **quero** consultar minhas sugestões e seus status, **para** acompanhar o resultado das ideias que enviei.

## Critérios de aceitação

### AC-S18-01 — Isolamento por autor
- Fonte: [PRD-FR-024](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-24-minhas-sugestões)
- **Dado** sugestões de vários alunos
- **Quando** o Aluno abrir sua lista
- **Então** somente suas sugestões e os status persistidos devem ser exibidos.

## Bloqueios

Resolvidos por `DEC-006` e `DEC-008`.

## Task

- `T018` — Renderizar minhas sugestões — `done`. Evidência: [`T018.md`](../../../../_bmad-output/implementation-artifacts/verification/T018.md).
