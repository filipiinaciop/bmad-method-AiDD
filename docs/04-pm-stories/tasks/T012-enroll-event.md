---
id: T012
parent_story: S12
parent_epic: E03
status: blocked
type: frontend | data | test
priority: P1
order: 12
owner: "A definir"
sources: [PRD-FR-012, PRD-FR-014, DEC-001]
acceptance_criteria: [AC-S12-01, AC-S12-02]
depends_on: [DEP-004, DEP-008, DEP-009]
blocks: [S13, S14]
---

# T012 — Persistir inscrição de aluno

## Objetivo

Registrar a inscrição de um Aluno em evento aberto e negar evento indisponível.

## Escopo

- Validar usuário, evento e estado aprovado.
- Persistir registro local.
- Não definir novamente status ou capacidade.

## Resultado e validação

Cenários de inscrição aceita e evento indisponível.

## Bloqueio

Estados de Evento e inscrição, capacidade e contratos de dados ainda não reconciliados.
