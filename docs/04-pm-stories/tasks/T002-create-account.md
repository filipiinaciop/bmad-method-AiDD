---
id: T002
parent_story: S02
parent_epic: E01
status: done
type: frontend | data | test
priority: P1
order: 2
owner: "A definir"
sources: [PRD-FR-002, ARCH-001, DEC-001, DEC-003, DEC-004, UX-002]
acceptance_criteria: [AC-S02-01, AC-S02-02]
depends_on: [DEP-001, DEP-002, DEP-003]
blocks: []
---

# T002 — Preparar criação de contas mockadas

## Objetivo

Implementar a criação manual de contas e sua persistência local, após as regras de segurança e perfil serem confirmadas.

## Escopo

- Validar nome, e-mail e senha conforme decisão aprovada.
- Impedir e-mail duplicado.
- Persistir o novo usuário mockado em `localStorage`.
- Não implementar edição, exclusão, importação CSV ou integração externa.

## Resultado e validação

- Cenário manual de criação válida e duplicada.
- Teste/evidência ligado a `AC-S02-01` e `AC-S02-02`.

## Resultado da execução

- Implementado em `src/models/domain.js`, `src/models/store.js`, `src/controllers/app-controller.js` e `src/views/index.html`.
- Professor/Admin cria contas mockadas de Aluno ou Professor/Admin e o novo registro persiste em `localStorage`.
- E-mail duplicado é rejeitado; senha mínima segue `DEC-003`.
- Validação: teste direcionado T002, suíte completa, lint e build.

## Bloqueio

Resolvido por `DEC-003`, `DEC-004`, `DEC-008` e `DEC-009`.
