---
id: S21
parent_epic: E04
parent_feature: F07
status: done
priority: P1
order: 21
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-006, PRD-FR-021, PRD-SM-C1, DEC-001]
depends_on: [DEP-010, DEP-011]
---

# S21 — Rejeitar sugestão

## Narrativa

**Como** Professor/Admin, **quero** rejeitar uma sugestão sem preencher motivo, **para** encerrar rapidamente uma proposta fora do escopo.

## Critérios de aceitação

### AC-S21-01 — Rejeição sem motivo
- Fonte: [PRD-FR-021](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-21-rejeição-de-sugestão)
- **Dado** uma sugestão pendente
- **Quando** o Professor/Admin rejeitar sem informar motivo
- **Então** a sugestão deve sair da fila e manter o estado/histórico definido pelo contrato aprovado.

### AC-S21-02 — Curadoria
- Fonte: [PRD-SM-C1](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#7-critérios-de-sucesso)
- **Então** a ação deve representar uma decisão explícita do revisor, não uma aprovação automática.

## Bloqueios

A arquitetura não define entidade/histórico de Sugestão; o contrato UX de feedback também está ausente.

## Task

- `T021` — Persistir rejeição de sugestão — `blocked`.
