---
id: S02
parent_epic: E01
parent_feature: F01
status: blocked
priority: P1
order: 2
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-002, ARCH-001, DEC-001]
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

`Q-ARCH-001`, `Q-ARCH-002`, `Q-ARCH-006` e `Q-ARCH-007` deixam segurança, Admin, senha e política de dados indefinidos. `localStorage` é confirmado por [DEC-001](../../../../docs/00-governance/decisions.md), mas não resolve a política de credenciais.

## Task

- `T002` — Preparar criação de contas mockadas — `blocked`.
