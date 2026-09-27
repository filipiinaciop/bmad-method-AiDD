---
id: T003
parent_story: S03
parent_epic: E01
status: blocked
type: frontend | test
priority: P1
order: 3
owner: "A definir"
sources: [PRD-FR-003, ARCH-001, DEC-001, UX-001]
acceptance_criteria: [AC-S03-01, AC-S03-02]
depends_on: [DEP-002, DEP-003, DEP-012]
blocks: []
---

# T003 — Aplicar matriz RBAC nos fluxos mockados

## Objetivo

Aplicar Roles e Permissions às capacidades sem inventar permissões do `ADMIN` nem contratos de rota.

## Escopo

- Inspecionar os fluxos existentes.
- Aplicar apenas a matriz RBAC confirmada.
- Negar acesso do Aluno a capacidades protegidas.
- Validar acesso autorizado e acesso direto indevido.

## Resultado e validação

Cenários de Aluno, Professor/Admin e `ADMIN` somente após decisão; evidência ligada aos critérios `AC-S03-*`.

## Bloqueio

`Q-ARCH-002` e `Q-ARCH-003` abertas; UX de navegação/erro não aprovada.
