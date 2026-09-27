---
id: T006
parent_story: S06
parent_epic: E02
status: done
type: frontend | data | test
priority: P1
order: 6
owner: "A definir"
sources: [PRD-FR-005, ARCH-001, DEC-001, DEC-005, DEC-006, DEC-008, UX-002]
acceptance_criteria: [AC-S06-01, AC-S06-02]
depends_on: [DEP-004, DEP-005, DEP-006]
blocks: []
---

# T006 — Preparar edição de evento

## Objetivo

Atualizar evento existente sem invalidar inscrições ou transições de status por inferência.

## Escopo

- Carregar registro local.
- Validar alteração conforme contrato aprovado.
- Persistir somente alterações aceitas.
- Não decidir política de estado terminal ou capacidade.

## Resultado e validação

Cenário de edição válida e tentativa de capacidade incompatível.

## Resultado da execução

- `Domain.updateEvent` carrega, valida e persiste alterações de eventos.
- A capacidade não pode ficar abaixo das inscrições ativas.
- Eventos `CANCELADO` não podem ser editados.
- Validação: teste direcionado T006, suíte completa, lint e build.

## Bloqueio

Resolvido por `DEC-005`, `DEC-006`, `DEC-008` e `DEC-009`.
