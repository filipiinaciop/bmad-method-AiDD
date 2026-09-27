---
id: S04
parent_epic: E01
parent_feature: F01
status: blocked
priority: P1
order: 4
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-023, ARCH-001, DEC-001]
depends_on: [DEP-001, DEP-003]
---

# S04 — Redefinir senha de conta

## Narrativa

**Como** Professor/Admin, **quero** redefinir a senha de uma conta existente, **para** recuperar o acesso do usuário sem expor a senha atual.

## Critérios de aceitação

### AC-S04-01 — Nova senha
- Fonte: [PRD-FR-023](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-23-redefinição-de-senha-de-conta-existente)
- **Dado** uma conta existente e uma nova senha válida segundo a política aprovada
- **Quando** o Professor/Admin confirmar
- **Então** a nova senha deve permitir login da conta.

### AC-S04-02 — Senha atual protegida
- **Quando** uma conta for exibida ou editada
- **Então** a senha atual nunca deve ser exibida.

## Bloqueios

`Q-ARCH-001` e `Q-ARCH-006` impedem decidir armazenamento e regras de senha.

## Task

- `T004` — Preparar redefinição de senha mockada — `blocked`.
