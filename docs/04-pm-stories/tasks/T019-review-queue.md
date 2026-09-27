---
id: T019
parent_story: S19
parent_epic: E04
status: blocked
type: frontend | test
priority: P1
order: 19
owner: "A definir"
sources: [PRD-FR-019, ARCH-001, DEC-001]
acceptance_criteria: [AC-S19-01, AC-S19-02]
depends_on: [DEP-002, DEP-010, DEP-011]
blocks: [S20, S21]
---

# T019 — Criar fila de análise mockada

## Objetivo

Exibir somente pendências para usuário autorizado.

## Escopo

- Ler sugestões locais.
- Filtrar status pendente conforme decisão.
- Aplicar RBAC.
- Não alterar status neste task.

## Resultado e validação

Cenários de fila preenchida, vazia e acesso de Aluno.

## Bloqueio

Sugestão e permissões ainda não definidas.
