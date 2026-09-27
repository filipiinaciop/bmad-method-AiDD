---
id: T010
parent_story: S10
parent_epic: E03
status: blocked
type: frontend | test
priority: P1
order: 10
owner: "A definir"
sources: [PRD-FR-010, UX-001, DEC-001]
acceptance_criteria: [AC-S10-01, AC-S10-02]
depends_on: [DEP-004, DEP-008]
blocks: []
---

# T010 — Implementar visualização mensal

## Objetivo

Apresentar eventos por mês e manter consistência com a lista.

## Escopo

- Usar datas persistidas localmente.
- Renderizar calendário sem inventar timezone.
- Preservar conjunto de eventos na alternância.

## Resultado e validação

Cenário de navegação entre meses e comparação lista/calendário.

## Bloqueio

`Q-ARCH-004`, `CONFLICT-001` e ausência de UX específica.
