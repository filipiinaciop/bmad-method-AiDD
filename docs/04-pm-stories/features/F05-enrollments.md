---
id: F05
parent_epic: E03
status: done
priority: P1
sources: [PRD-FR-012, PRD-FR-013, PRD-FR-014, PRD-FR-015, PRD-FR-016, PRD-FR-017, PRD-FR-022, ARCH-001, DEC-001]
depends_on: [DEP-004, DEP-005, DEP-008, DEP-009]
---

# F05 — Inscrições

## Capacidade

Permitir inscrição e cancelamento com regras de disponibilidade, duplicidade, capacidade e autorização.

## Stories

- `S12` Inscrever-se em evento — `done`.
- `S13` Impedir duplicidade e excedente de vagas — `done`.
- `S14` Cancelar própria inscrição — `done`.
- `S15` Consultar minhas inscrições — `done`.
- `S16` Cancelar inscrição como Professor/Admin — `done`.

## Critério de conclusão

A modelagem `ATIVA`/`CANCELADA` foi decidida por `DEC-007`, refletida em `ARCH-DATA-006` e `ARCH-RULE-010`. O limite da garantia de capacidade está registrado em `DEC-012`. Verificado em `T012` a `T016`.
