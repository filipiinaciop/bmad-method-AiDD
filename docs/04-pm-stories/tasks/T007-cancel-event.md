---
id: T007
parent_story: S07
parent_epic: E02
status: blocked
type: frontend | data | test
priority: P1
order: 7
owner: "A definir"
sources: [PRD-FR-006, ARCH-001, DEC-001]
acceptance_criteria: [AC-S07-01, AC-S07-02]
depends_on: [DEP-004, DEP-005, DEP-006]
blocks: []
---

# T007 — Implementar cancelamento de evento

## Objetivo

Aplicar cancelamento sem apagar histórico, conforme a política de evento decidida.

## Escopo

- Exigir permissão confirmada.
- Atualizar o registro local.
- Bloquear novas inscrições após a decisão de estado.
- Não excluir dados ou inscrições sem decisão explícita.

## Resultado e validação

Cenário de cancelamento e tentativa posterior de inscrição.

## Bloqueio

`Q-ARCH-005` e `CONFLICT-001` abertas.
