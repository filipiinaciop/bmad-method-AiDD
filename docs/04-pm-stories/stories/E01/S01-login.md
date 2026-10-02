---
id: S01
parent_epic: E01
parent_feature: F01
status: done
priority: P1
order: 1
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-001, ARCH-001, DEC-001, DEC-003, UX-002]
depends_on: [DEP-001, DEP-003]
blocks: [S03]
---

# S01 — Autenticar usuário mockado

## Narrativa

**Como** Aluno ou Professor/Admin, **quero** entrar com e-mail e senha, **para** acessar as capacidades do Germinare Tech compatíveis com meu perfil.

## Critérios de aceitação

### AC-S01-01 — Credencial válida
- Fonte: [PRD-FR-001](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-1-login-por-credenciais)
- **Dado** um usuário mockado com credenciais válidas
- **Quando** ele enviar o formulário de login
- **Então** o sistema deve reconhecer o usuário e exibir a área autenticada correspondente ao perfil.

### AC-S01-02 — Credencial inválida
- **Dado** e-mail ou senha inválidos
- **Quando** o formulário for enviado
- **Então** o sistema deve rejeitar o acesso sem revelar se o e-mail existe.

## UX e arquitetura

- Tratamento visual deve seguir [UX-001](../../../../docs/01-inputs/ux.md), com os estados específicos de [UX-002](../../../../docs/01-inputs/ux.md#ux-002--contratos-específicos-do-produto).
- RBAC: [ARCH-001](../../../../docs/01-inputs/architecture.md#arch-sec-006--autenticação).
- Persistência de dados mockados: [DEC-001](../../../../docs/00-governance/decisions.md).

## Bloqueios

Resolvidos por `DEC-003`, `DEC-004`, `DEC-008` e `DEC-009`.

## Task

- `T001` — Preparar autenticação mockada — `done`. Evidência: [`T001.md`](../../../../_bmad-output/implementation-artifacts/verification/T001.md).
