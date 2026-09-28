---
id: T013
parent_story: S13
parent_epic: E03
status: done
type: data | test
priority: P1
order: 13
owner: "A definir"
sources: [PRD-FR-013, PRD-FR-015, ARCH-001, DEC-001]
acceptance_criteria: [AC-S13-01, AC-S13-02]
depends_on: [DEP-005, DEP-009]
blocks: []
---

# T013 — Garantir integridade de inscrições mockadas

## Objetivo

Impedir duplicidade ativa e excedente de capacidade sem assumir mecanismo de concorrência não definido.

## Escopo

- Modelar a regra somente após aprovação de inscrição ativa/inativa.
- Cobrir tentativa duplicada e disputa pela última vaga.
- Registrar validação adequada ao ambiente local.

## Resultado e validação

Testes determinísticos e cenário concorrente definido pelo contrato.

## Bloqueio

`CONFLICT-002` e ausência de modelo de capacidade na arquitetura.
