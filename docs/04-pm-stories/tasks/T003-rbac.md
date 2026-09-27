---
id: T003
parent_story: S03
parent_epic: E01
status: done
type: frontend | test
priority: P1
order: 3
owner: "A definir"
sources: [PRD-FR-003, ARCH-001, DEC-001, DEC-004, DEC-008, UX-002]
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

## Resultado da execução

- `src/models/domain.js` centraliza Roles e Permissions e aplica autorização também para operações diretas.
- `ADMIN` usa a mesma matriz de capacidades do `PROFESSOR`, conforme `DEC-004`.
- A navegação da UI filtra ações conforme a permissão do usuário.
- Validação: teste direcionado T003, suíte completa, lint e build.

## Bloqueio

Resolvido por `DEC-004`, `DEC-008` e `DEC-009`.
