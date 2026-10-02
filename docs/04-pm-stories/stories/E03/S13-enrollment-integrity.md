---
id: S13
parent_epic: E03
parent_feature: F05
status: done
priority: P1
order: 13
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-013, PRD-FR-015, ARCH-001, DEC-001]
depends_on: [DEP-005, DEP-009]
---

# S13 — Impedir duplicidade e excedente de vagas

## Narrativa

**Como** sistema, **quero** validar duplicidade e capacidade, **para** preservar a integridade das inscrições.

## Critérios de aceitação

### AC-S13-01 — Duplicidade ativa
- Fonte: [PRD-FR-013](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-13-prevenção-de-inscrição-duplicada)
- **Dado** um Aluno com inscrição ativa
- **Quando** tentar se inscrever novamente
- **Então** a segunda inscrição deve ser rejeitada sem registro duplicado.

### AC-S13-02 — Capacidade concorrente
- Fonte: [PRD-FR-015](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-15-respeito-ao-limite-de-vaga)
- **Quando** múltiplas tentativas disputarem a última vaga
- **Então** a quantidade aceita não pode exceder a capacidade.

## Bloqueios

Resolvidos por `DEC-006`, `DEC-007` e `DEC-012`.

## Task

- `T013` — Garantir integridade de inscrições mockadas — `done`. Evidência: [`T013.md`](../../../../_bmad-output/implementation-artifacts/verification/T013.md).
