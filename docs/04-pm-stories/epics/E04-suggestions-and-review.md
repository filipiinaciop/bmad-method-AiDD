---
id: E04
status: blocked
priority: P1
owner: "Integrante 4 — PM / Stories"
sources:
  - PRD-UJ-004
  - PRD-UJ-005
  - PRD-UJ-006
  - PRD-FR-018
  - PRD-FR-019
  - PRD-FR-020
  - PRD-FR-021
  - PRD-FR-024
  - PRD-SM-C1
  - DEC-001
depends_on: [DEP-004, DEP-006, DEP-010, DEP-011]
blocks: []
---

# E04 — Sugestões e Análise

## Outcome

Dar ao Aluno um canal formal para sugerir eventos e ao Professor/Admin uma fila para analisar essas sugestões.

## Problema e valor

- **Problema:** ideias de alunos se perdem em conversas informais.
- **Para quem:** Aluno e Professor/Admin.
- **Valor:** sugestões são registradas e passam por curadoria antes de originar um evento.

## Evidências de origem

- [PRD-UJ-004](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) a [PRD-UJ-006](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) — jornadas de sugestão e análise.
- [PRD-FR-018](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-18-envio-de-sugestão) a [PRD-FR-021](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-21-rejeição-de-sugestão) e [PRD-FR-024](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-24-minhas-sugestões) — requisitos.
- [PRD-SM-C1](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#pr-d-sm-c1) — contra-métrica de curadoria real.

## Escopo

### Incluído

- Envio e acompanhamento de sugestões próprias.
- Fila de pendentes, aprovação com pré-preenchimento e rejeição sem motivo.

### Fora do escopo

- Notificação automática, motivo de rejeição ou aprovação multinível.
- Criar entidade ou vínculo Sugestão–Evento sem decisão arquitetural.

## Desconhecidos e conflitos

- `CONFLICT-003`: PRD exige Sugestão persistida e vínculo com Evento; Arquitetura não define entidade Sugestão.
- `CONFLICT-001`: fluxo de criação/aprovação de Evento diverge entre PRD e Arquitetura.
- `Q-ARCH-003`, `Q-ARCH-005`: contratos e persistência/histórico.

## Features

- [F06](../features/F06-suggestions.md) — Sugestões do aluno — `blocked`.
- [F07](../features/F07-event-validation.md) — Fila e análise de eventos/sugestões — `blocked`.
