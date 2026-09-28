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

## Resultado da execução

- Implementado no fluxo de Contas em `src/controllers/app-controller.js` e `src/models/domain.js`.
- Professor/Admin redefine a senha de uma conta existente com mínimo de 8 caracteres.
- Usuários sanitizados não carregam o campo de senha para a interface.
- Validação: teste direcionado T004, suíte completa, lint e build.

## Bloqueio

Resolvido por `DEC-003`, `DEC-004`, `DEC-008` e `DEC-009`.
