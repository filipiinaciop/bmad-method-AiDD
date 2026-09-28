---
id: E03
status: done
priority: P1
owner: "Integrante 4 — PM / Stories"
sources:
  - PRD-UJ-002
  - PRD-UJ-003
  - PRD-FR-009
  - PRD-FR-010
  - PRD-FR-011
  - PRD-FR-012
  - PRD-FR-013
  - PRD-FR-014
  - PRD-FR-015
  - PRD-FR-016
  - PRD-FR-017
  - PRD-FR-022
  - DEC-001
depends_on: [DEP-004, DEP-005, DEP-008, DEP-009]
blocks: []
---

# E03 — Descoberta e Inscrições

## Outcome

Permitir que o Aluno encontre eventos, consulte detalhes, inscreva-se e cancele sua inscrição, respeitando disponibilidade e capacidade.

## Problema e valor

- **Problema:** alunos dependem de canais dispersos e professores controlam interessados manualmente.
- **Para quem:** Aluno; Professor/Admin no cancelamento administrativo e consulta.
- **Valor:** uma fonte única para descoberta e confirmação de presença.

## Evidências de origem

- [PRD-UJ-002](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) e [PRD-UJ-003](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) — descoberta, inscrição e cancelamento.
- [PRD-FR-009](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-9-listagem-de-eventos) a [PRD-FR-017](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-17-minhas-inscrições) e [PRD-FR-022](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-22-cancelamento-de-inscrição-pelo-professoradmin) — requisitos da capacidade.
- [DEC-001](../../../docs/00-governance/decisions.md) — persistência mock/localStorage.

## Escopo

### Incluído

- Lista, calendário, detalhe, inscrição, cancelamento e consulta de inscrições.
- Validação de disponibilidade, duplicidade e capacidade conforme decisões de produto.

### Fora do escopo

- Lista de espera, notificações e calendário externo.
- Escolher a modelagem de status ativo/inativo da inscrição sem decisão.

## Desconhecidos e conflitos

- `CONFLICT-002`: unicidade permanente da Arquitetura versus re-inscrição após cancelamento no PRD.
- `Q-ARCH-004`, `Q-ARCH-005`, `Q-ARCH-007`: tempo, cancelamento e modelo de dados.
- Capacidade/vagas e estados visuais específicos ainda não possuem contrato UX/aprovação arquitetural.

## Features

- [F04](../features/F04-event-discovery.md) — Descoberta de eventos — `blocked`.
- [F05](../features/F05-enrollments.md) — Inscrições — `blocked`.
