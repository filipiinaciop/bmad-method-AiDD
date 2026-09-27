---
id: T021
parent_story: S21
parent_epic: E04
status: blocked
type: frontend | data | test
priority: P1
order: 21
owner: "A definir"
sources: [PRD-FR-021, PRD-SM-C1, DEC-001]
acceptance_criteria: [AC-S21-01, AC-S21-02]
depends_on: [DEP-010, DEP-011]
blocks: []
---

# T021 — Persistir rejeição de sugestão

## Objetivo

Registrar uma decisão explícita de rejeição sem motivo e remover a pendência da fila conforme contrato aprovado.

## Escopo

- Exigir ação explícita do revisor.
- Atualizar persistência local conforme histórico decidido.
- Não enviar notificação nem adicionar motivo.

## Resultado e validação

Cenário de rejeição, retirada da fila e auditoria do estado.

## Bloqueio

Entidade/histórico de Sugestão e UX de feedback ainda ausentes.
