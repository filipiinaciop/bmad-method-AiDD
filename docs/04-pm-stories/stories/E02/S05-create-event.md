---
id: S05
parent_epic: E02
parent_feature: F03
status: done
priority: P1
order: 5
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-001, PRD-FR-004, ARCH-001, DEC-001, DEC-005, DEC-006, DEC-008, UX-002]
depends_on: [DEP-004, DEP-005, DEP-006, DEP-007]
---

# S05 — Criar evento

## Narrativa

**Como** responsável autorizado, **quero** criar um evento com seus dados básicos, **para** centralizar a divulgação e as inscrições.

## Critérios de aceitação

### AC-S05-01 — Dados válidos
- Fonte: [PRD-FR-004](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-4-criação-de-evento)
- **Dado** título, data/hora e local válidos, com descrição e vaga conforme o contrato aprovado
- **Quando** o usuário autorizado confirmar
- **Então** o evento deve ser criado e persistido em `localStorage` no estado definido pela decisão de ciclo de vida.

### AC-S05-02 — Campo obrigatório ausente
- **Quando** um campo obrigatório não for informado
- **Então** a criação deve ser impedida e o erro deve ser apresentado sem persistir registro incompleto.

## Bloqueios

Resolvidos por `DEC-005`, `DEC-006`, `DEC-008` e `DEC-009`.

## Task

- `T005` — Implementar criação de evento após resolução do ciclo de vida — `done`. Evidência: [`T005.md`](../../../../_bmad-output/implementation-artifacts/verification/T005.md).
