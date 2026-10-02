---
id: S11
parent_epic: E03
parent_feature: F04
status: done
priority: P1
order: 11
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-011, DEC-001, UX-001]
depends_on: [DEP-004, DEP-008, DEP-009]
---

# S11 — Consultar detalhe do evento

## Narrativa

**Como** Aluno, **quero** abrir o detalhe de um evento, **para** decidir se vou me inscrever.

## Critérios de aceitação

### AC-S11-01 — Informações do evento
- Fonte: [PRD-FR-011](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-11-detalhe-do-evento)
- **Dado** um evento existente
- **Quando** o Aluno abrir seu detalhe
- **Então** deve visualizar descrição, data/hora, local, status e vagas restantes quando houver limite.

### AC-S11-02 — Dados indisponíveis
- **Quando** o evento não existir ou não puder ser consultado
- **Então** o sistema deve apresentar erro seguro sem criar ou alterar dados.

## Bloqueios

Resolvidos por `DEC-005`, `DEC-006` e `DEC-008`.

## Task

- `T011` — Exibir detalhe do evento — `done`. Evidência: [`T011.md`](../../../../_bmad-output/implementation-artifacts/verification/T011.md).
