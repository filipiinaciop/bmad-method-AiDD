---
id: S06
parent_epic: E02
parent_feature: F03
status: done
priority: P1
order: 6
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-005, ARCH-001, DEC-001, DEC-005, DEC-006, DEC-008, UX-002]
depends_on: [DEP-004, DEP-005, DEP-006]
---

# S06 — Editar evento

## Narrativa

**Como** Professor/Admin autorizado, **quero** editar os dados de um evento, **para** manter as informações corretas.

## Critérios de aceitação

### AC-S06-01 — Edição válida
- Fonte: [PRD-FR-005](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-5-edição-de-evento)
- **Dado** um evento existente e dados válidos
- **Quando** o usuário autorizado salvar
- **Então** os dados devem ser atualizados no registro persistido.

### AC-S06-02 — Capacidade incompatível
- **Quando** a nova capacidade for menor que inscrições confirmadas
- **Então** a alteração deve ser recusada conforme o comportamento aprovado.

## Bloqueios

Resolvidos por `DEC-005`, `DEC-006`, `DEC-008` e `DEC-009`.

## Task

- `T006` — Preparar edição de evento — `done`.
