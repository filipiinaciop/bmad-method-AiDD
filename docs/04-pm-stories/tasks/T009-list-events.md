---
id: T009
parent_story: S09
parent_epic: E03
status: done
type: frontend | test
priority: P1
order: 9
owner: "A definir"
sources: [PRD-FR-009, DEC-001, UX-001]
acceptance_criteria: [AC-S09-01]
depends_on: [DEP-004, DEP-008]
blocks: [S10, S11]
---

# T009 — Renderizar lista de eventos mockados

## Objetivo

Exibir eventos persistidos em lista, respeitando filtro e status aprovados.

## Escopo

- Ler dados mockados do `localStorage`.
- Renderizar conteúdo com tokens `UX-001`.
- Não escolher quais estados são visíveis.

## Resultado e validação

Cenário de lista preenchida e lista sem registros, após UX específica.

## Bloqueio

`CONFLICT-001` e ausência de contrato UX para empty/loading/error.
