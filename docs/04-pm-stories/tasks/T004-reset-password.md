---
id: T004
parent_story: S04
parent_epic: E01
status: done
type: frontend | data | test
priority: P1
order: 4
owner: "A definir"
sources: [PRD-FR-023, ARCH-001, DEC-001, DEC-003, DEC-004, UX-002]
acceptance_criteria: [AC-S04-01, AC-S04-02]
depends_on: [DEP-001, DEP-003]
blocks: []
---

# T004 — Preparar redefinição de senha mockada

## Objetivo

Permitir que Professor/Admin defina nova senha para conta existente sem exibir a senha atual.

## Escopo

- Validar conta existente.
- Aplicar política de senha somente após decisão.
- Atualizar o registro local.
- Não implementar recuperação self-service.

## Resultado e validação

Login posterior com nova senha e verificação de que a senha atual não aparece na UI.

## Bloqueio

`Q-ARCH-001` e `Q-ARCH-006` abertas.
