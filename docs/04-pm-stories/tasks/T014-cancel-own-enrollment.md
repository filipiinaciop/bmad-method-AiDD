---
id: T014
parent_story: S14
parent_epic: E03
status: blocked
type: frontend | data | test
priority: P1
order: 14
owner: "A definir"
sources: [PRD-FR-016, DEC-001]
acceptance_criteria: [AC-S14-01, AC-S14-02]
depends_on: [DEP-005, DEP-009]
blocks: []
---

# T014 — Implementar cancelamento próprio

## Objetivo

Permitir que o Aluno cancele somente a própria inscrição e atualize a disponibilidade.

## Escopo

- Verificar identidade do usuário atual.
- Atualizar persistência local conforme estado aprovado.
- Preservar histórico somente se a decisão confirmar isso.

## Resultado e validação

Cenários de cancelamento próprio e tentativa sobre outro aluno.

## Bloqueio

`CONFLICT-002` e `Q-ARCH-005`.
