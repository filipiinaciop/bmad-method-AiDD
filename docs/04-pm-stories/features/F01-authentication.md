---
id: F01
parent_epic: E01
status: done
priority: P1
sources: [PRD-FR-001, PRD-FR-002, PRD-FR-023, ARCH-001, DEC-001]
depends_on: [DEP-001, DEP-002, DEP-003]
---

# F01 — Autenticação e contas

## Capacidade

Usuários mockados entram no sistema e Professor/Admin gerencia contas dentro do escopo do produto.

## Stories

- `S01` Login por credenciais — `done`.
- `S02` Criar conta mockada — `done`.
- `S04` Redefinir senha — `done`.

## Critério de conclusão

Os fluxos de conta possuem critérios verificáveis, persistência local, tratamento de erro e política de segurança confirmada. `ARCH-OQ-001` e `ARCH-OQ-006` foram resolvidos por `DEC-003`. Verificado em `T001`, `T002` e `T004`.
