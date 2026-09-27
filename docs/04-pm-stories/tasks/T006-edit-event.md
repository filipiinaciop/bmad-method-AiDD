---
id: T006
parent_story: S06
parent_epic: E02
status: blocked
type: frontend | data | test
priority: P1
order: 6
owner: "A definir"
sources: [PRD-FR-005, ARCH-001, DEC-001]
acceptance_criteria: [AC-S06-01, AC-S06-02]
depends_on: [DEP-004, DEP-005, DEP-006]
blocks: []
---

# T006 — Preparar edição de evento

## Objetivo

Atualizar evento existente sem invalidar inscrições ou transições de status por inferência.

## Escopo

- Carregar registro local.
- Validar alteração conforme contrato aprovado.
- Persistir somente alterações aceitas.
- Não decidir política de estado terminal ou capacidade.

## Resultado e validação

Cenário de edição válida e tentativa de capacidade incompatível.

## Bloqueio

`Q-ARCH-002`, `Q-ARCH-005` e `CONFLICT-001`.
