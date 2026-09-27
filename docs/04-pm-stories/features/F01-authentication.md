---
id: F01
parent_epic: E01
status: blocked
priority: P1
sources: [PRD-FR-001, PRD-FR-002, PRD-FR-023, ARCH-001, DEC-001]
depends_on: [DEP-001, DEP-002, DEP-003]
---

# F01 — Autenticação e contas

## Capacidade

Usuários mockados entram no sistema e Professor/Admin gerencia contas dentro do escopo do produto.

## Stories

- `S01` Login por credenciais — `blocked`.
- `S02` Criar conta mockada — `blocked`.
- `S04` Redefinir senha — `blocked`.

## Critério de conclusão

Os fluxos de conta possuem critérios verificáveis, persistência local, tratamento de erro e política de segurança confirmada. Enquanto `ARCH-OQ-001` e `ARCH-OQ-006` estiverem abertos, a Feature permanece `blocked`.
