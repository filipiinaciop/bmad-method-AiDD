---
id: T017
parent_story: S17
parent_epic: E04
status: blocked
type: frontend | data | test
priority: P1
order: 17
owner: "A definir"
sources: [PRD-FR-018, DEC-001, UX-001]
acceptance_criteria: [AC-S17-01, AC-S17-02]
depends_on: [DEP-010, DEP-011]
blocks: [S18, S19]
---

# T017 — Persistir sugestão de aluno

## Objetivo

Registrar sugestão válida do Aluno com status inicial aprovado após a decisão de modelo.

## Escopo

- Validar campos definidos.
- Persistir dados mockados em `localStorage`.
- Não inventar entidade, status ou vínculo com Evento.

## Resultado e validação

Cenários de envio válido e campo ausente.

## Bloqueio

`CONFLICT-003`: Arquitetura não define Sugestão.
