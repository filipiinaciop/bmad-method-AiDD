---
id: S12
parent_epic: E03
parent_feature: F05
status: blocked
priority: P1
order: 12
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-002, PRD-FR-012, PRD-FR-014, DEC-001]
depends_on: [DEP-004, DEP-008, DEP-009]
---

# S12 — Inscrever-se em evento

## Narrativa

**Como** Aluno, **quero** me inscrever em um evento disponível, **para** confirmar minha participação.

## Critérios de aceitação

### AC-S12-01 — Inscrição aceita
- Fonte: [PRD-FR-012](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-12-inscrição-em-evento)
- **Dado** um evento que esteja aberto para inscrição e um Aluno autenticado
- **Quando** ele confirmar a inscrição
- **Então** uma inscrição deve ser persistida e a disponibilidade deve ser atualizada.

### AC-S12-02 — Evento indisponível
- Fonte: [PRD-FR-014](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-14-bloqueio-de-inscrição-em-evento-indisponível)
- **Quando** o evento não estiver aberto
- **Então** a inscrição deve ser rejeitada.

## Bloqueios

Estados do evento, status de inscrição e capacidade não estão reconciliados.

## Task

- `T012` — Persistir inscrição de aluno — `blocked`.
