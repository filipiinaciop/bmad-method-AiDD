---
id: T005
parent_story: S05
parent_epic: E02
status: blocked
type: frontend | data | test
priority: P1
order: 5
owner: "A definir"
sources: [PRD-FR-004, ARCH-001, DEC-001, UX-001]
acceptance_criteria: [AC-S05-01, AC-S05-02]
depends_on: [DEP-004, DEP-005, DEP-006, DEP-007]
blocks: [S09, S12, S20]
---

# T005 — Implementar criação de evento após resolução do ciclo de vida

## Objetivo

Criar e persistir evento com validação de campos obrigatórios conforme o fluxo que for aprovado.

## Escopo

- Validar dados do formulário.
- Persistir em `localStorage`.
- Aplicar status somente após decisão `DEC-*`.
- Não adicionar capacidade, campos ou rotas não confirmados.

## Resultado e validação

Cenário de criação válida, campo ausente e leitura do registro local.

## Bloqueio

`CONFLICT-001`, `Q-ARCH-003`, `Q-ARCH-004` e ausência de decisão sobre capacidade/campos.
