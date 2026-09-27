---
id: S15
parent_epic: E03
parent_feature: F05
status: done
priority: P1
order: 15
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-002, PRD-UJ-003, PRD-FR-017, DEC-001, UX-001]
depends_on: [DEP-005, DEP-008, DEP-009]
---

# S15 — Consultar minhas inscrições

## Narrativa

**Como** Aluno, **quero** ver minhas inscrições, **para** acompanhar e cancelar eventos sem procurar na lista geral.

## Critérios de aceitação

### AC-S15-01 — Apenas minhas inscrições
- Fonte: [PRD-FR-017](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-17-minhas-inscrições)
- **Dado** inscrições de vários alunos
- **Quando** o Aluno abrir sua lista
- **Então** somente suas inscrições devem ser exibidas.

### AC-S15-02 — Atualização
- **Então** cancelamentos persistidos devem refletir o estado atual ao recarregar a tela.

## Bloqueios

O estado de inscrição e os estados de interface ainda precisam de decisão/UX.

## Task

- `T015` — Renderizar minhas inscrições — `blocked`.
