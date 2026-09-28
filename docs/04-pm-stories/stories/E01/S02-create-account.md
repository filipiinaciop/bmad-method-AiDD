---
id: S02
parent_epic: E01
parent_feature: F01
status: done
priority: P1
order: 2
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-002, ARCH-001, DEC-001, DEC-003, DEC-004, UX-002]
depends_on: [DEP-001, DEP-002, DEP-003]
---

# S02 — Criar conta mockada

## Narrativa

**Como** Professor/Admin, **quero** criar uma conta de Aluno ou Professor/Admin, **para** provisionar usuários do sistema.

## Critérios de aceitação

### AC-S02-01 — Dados obrigatórios
- Fonte: [PRD-FR-002](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-2-criação-manual-de-conta)
- **Dado** nome, e-mail e senha inicial válidos
- **Quando** o Professor/Admin confirmar a criação
- **Então** uma conta mockada deve ser persistida localmente e poder ser usada no login.

### AC-S02-02 — E-mail duplicado
- **Dado** uma conta existente com o mesmo e-mail
- **Quando** uma nova conta for submetida
- **Então** a criação deve ser rejeitada sem duplicar o registro.

## Bloqueios

Resolvidos por `DEC-003`, `DEC-004`, `DEC-008` e `DEC-009`.

## Task

- `T002` — Preparar criação de contas mockadas — `done`.
