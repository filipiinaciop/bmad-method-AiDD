---
id: S17
parent_epic: E04
parent_feature: F06
status: done
priority: P1
order: 17
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-004, PRD-FR-018, DEC-001, UX-001]
depends_on: [DEP-010, DEP-011]
---

# S17 — Enviar sugestão de evento

## Narrativa

**Como** Aluno, **quero** enviar uma sugestão de evento, **para** registrar formalmente uma ideia para a escola analisar.

## Critérios de aceitação

### AC-S17-01 — Envio
- Fonte: [PRD-FR-018](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-18-envio-de-sugestão)
- **Dado** título e descrição válidos conforme contrato aprovado
- **Quando** o Aluno enviar
- **Então** a sugestão deve ser persistida com o status inicial definido e aparecer como pendente para análise.

### AC-S17-02 — Validação
- **Quando** faltar dado obrigatório
- **Então** o envio deve ser bloqueado sem persistir registro inválido.

## Bloqueios

Resolvidos por `DEC-006`.

## Task

- `T017` — Persistir sugestão de aluno — `done`. Evidência: [`T017.md`](../../../../_bmad-output/implementation-artifacts/verification/T017.md).
