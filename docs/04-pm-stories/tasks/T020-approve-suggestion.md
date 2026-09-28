---
id: T020
parent_story: S20
parent_epic: E04
status: done
type: frontend | data | test
priority: P1
order: 20
owner: "A definir"
sources: [PRD-FR-020, ARCH-001, DEC-001]
acceptance_criteria: [AC-S20-01, AC-S20-02]
depends_on: [DEP-004, DEP-006, DEP-010, DEP-011]
blocks: []
---

# T020 — Transformar sugestão aprovada em formulário pré-preenchido

## Objetivo

Abrir a criação de evento com título e descrição da sugestão sem publicar automaticamente.

## Escopo

- Atualizar sugestão conforme estado decidido.
- Transportar somente dados confirmados.
- Persistir vínculo somente após decisão arquitetural.

## Resultado e validação

Cenário de aprovação, abandono e confirmação de publicação posterior.

## Bloqueio

`CONFLICT-001`, `CONFLICT-003` e `Q-ARCH-003`.
