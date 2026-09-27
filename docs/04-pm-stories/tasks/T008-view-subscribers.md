---
id: T008
parent_story: S08
parent_epic: E02
status: done
type: frontend | test
priority: P1
order: 8
owner: "A definir"
sources: [PRD-FR-008, ARCH-001, DEC-004, DEC-007, DEC-008, UX-002]
acceptance_criteria: [AC-S08-01]
depends_on: [DEP-005, DEP-006, DEP-009]
blocks: []
---

# T008 — Exibir inscritos persistidos

## Objetivo

Exibir aos usuários autorizados a lista de Alunos inscritos conforme o estado local.

## Escopo

- Ler inscrições do `localStorage`.
- Filtrar pelo evento selecionado.
- Aplicar autorização confirmada.
- Não expor dados para Aluno ou perfil sem permissão.

## Resultado e validação

Cenário com inscrições e cancelamentos, ligado a `AC-S08-01`.

## Resultado da execução

- `Domain.listSubscribers` filtra o evento e exige `VIEW_SUBSCRIBERS`.
- Professor/Admin visualiza inscritos ativos e cancelados, preservando histórico.
- Aluno não consegue acessar a operação protegida.
- Validação: teste direcionado T008, suíte completa, lint e build.

## Bloqueio

Resolvido por `DEC-004`, `DEC-007`, `DEC-008` e `DEC-009`.
