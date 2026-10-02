---
id: F07
parent_epic: E04
status: done
priority: P1
sources: [PRD-FR-019, PRD-FR-020, PRD-FR-021, PRD-SM-C1, ARCH-001, DEC-001]
depends_on: [DEP-004, DEP-006, DEP-010, DEP-011]
---

# F07 — Fila e análise de sugestões/eventos

## Capacidade

Professor/Admin visualiza pendências e decide aprovar ou rejeitar uma sugestão/evento conforme o fluxo confirmado.

## Stories

- `S19` Visualizar fila — `done`.
- `S20` Aprovar sugestão e pré-preencher criação — `done`.
- `S21` Rejeitar sugestão — `done`.

## Critério de conclusão

O fluxo de aprovação foi reconciliado por `DEC-005`; a entidade Sugestão e o vínculo opcional com Evento por `DEC-006`, refletidos em `ARCH-DATA-007` e `ARCH-RULE-009`; as permissões de análise por `DEC-004` e `DEC-010`. Verificado em `T019` a `T021`.
