---
id: S14
parent_epic: E03
parent_feature: F05
status: blocked
priority: P1
order: 14
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-003, PRD-FR-016, DEC-001]
depends_on: [DEP-005, DEP-009]
---

# S14 — Cancelar própria inscrição

## Narrativa

**Como** Aluno inscrito, **quero** cancelar minha inscrição, **para** liberar a vaga quando mudar de planos.

## Critérios de aceitação

### AC-S14-01 — Cancelamento próprio
- Fonte: [PRD-FR-016](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-16-cancelamento-da-própria-inscrição)
- **Dado** uma inscrição ativa do Aluno
- **Quando** ele cancelar
- **Então** a inscrição deve assumir o estado aprovado e a vaga deve ser recalculada sem apagar histórico, conforme decisão.

### AC-S14-02 — Outro aluno
- **Quando** o Aluno tentar cancelar inscrição de outra pessoa
- **Então** a ação deve ser rejeitada.

## Bloqueios

`CONFLICT-002` e `Q-ARCH-005` impedem escolher o modelo histórico.

## Task

- `T014` — Implementar cancelamento próprio — `blocked`.
