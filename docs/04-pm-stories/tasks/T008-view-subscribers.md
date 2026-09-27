---
id: T008
parent_story: S08
parent_epic: E02
status: blocked
type: frontend | test
priority: P1
order: 8
owner: "A definir"
sources: [PRD-FR-008, ARCH-001, DEC-001]
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

## Bloqueio

Modelo ativo/inativo e permissões de Admin ainda abertos.
