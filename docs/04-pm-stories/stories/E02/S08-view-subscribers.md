---
id: S08
parent_epic: E02
parent_feature: F03
status: blocked
priority: P1
order: 8
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-008, ARCH-001, DEC-001]
depends_on: [DEP-005, DEP-006, DEP-009]
---

# S08 — Visualizar inscritos

## Narrativa

**Como** Professor/Admin autorizado, **quero** consultar os alunos inscritos em um evento, **para** acompanhar a participação confirmada.

## Critérios de aceitação

### AC-S08-01 — Lista atual
- Fonte: [PRD-FR-008](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-8-visualização-de-inscritos)
- **Dado** um evento com inscrições mockadas
- **Quando** o usuário autorizado consultar o evento
- **Então** a lista deve exibir os alunos conforme o estado de inscrição persistido.

## Bloqueios

Estados ativo/inativo e permissões administrativas ainda dependem de decisões arquiteturais.

## Task

- `T008` — Exibir inscritos persistidos — `blocked`.
