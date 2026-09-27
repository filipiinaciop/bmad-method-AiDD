---
id: T016
parent_story: S16
parent_epic: E03
status: blocked
type: frontend | data | test
priority: P1
order: 16
owner: "A definir"
sources: [PRD-FR-022, ARCH-001, DEC-001]
acceptance_criteria: [AC-S16-01]
depends_on: [DEP-002, DEP-005, DEP-009]
blocks: []
---

# T016 — Permitir cancelamento administrativo

## Objetivo

Permitir que o Professor/Admin autorizado cancele inscrição de outro aluno conforme política aprovada.

## Escopo

- Aplicar permissionamento confirmado.
- Atualizar o registro local.
- Recalcular disponibilidade conforme contrato.

## Resultado e validação

Cenário de cancelamento autorizado e tentativa não autorizada.

## Bloqueio

`Q-ARCH-002`, `Q-ARCH-005` e `CONFLICT-002`.
