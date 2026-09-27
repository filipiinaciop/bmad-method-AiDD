---
id: S05
parent_epic: E02
parent_feature: F03
status: blocked
priority: P1
order: 5
owner: "Integrante 4 — PM / Stories"
sources: [PRD-UJ-001, PRD-FR-004, ARCH-001, DEC-001, UX-001]
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

`CONFLICT-001` impede escolher entre publicação direta pelo Professor/Admin e criação `PENDENTE` pelo Aluno. Campos obrigatórios e capacidade também divergem entre PRD e Arquitetura.

## Task

- `T005` — Implementar criação de evento após resolução do ciclo de vida — `blocked`.
