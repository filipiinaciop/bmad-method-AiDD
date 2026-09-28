---
id: S03
parent_epic: E01
parent_feature: F02
status: done
priority: P1
order: 3
owner: "Integrante 4 — PM / Stories"
sources: [PRD-FR-003, ARCH-001, DEC-001, DEC-004, DEC-008, UX-002]
depends_on: [DEP-002, DEP-003, DEP-012]
---

# S03 — Restringir capacidades por perfil

## Narrativa

**Como** usuário autenticado, **quero** que o sistema respeite minha Role e Permissions, **para** não acessar ações de outro perfil.

## Critérios de aceitação

### AC-S03-01 — Aluno
- Fonte: [PRD-FR-003](../../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-3-controle-de-acesso-por-perfil)
- **Dado** um usuário com perfil Aluno
- **Quando** tentar abrir uma capacidade exclusiva de Professor/Admin
- **Então** o sistema deve negar a ação, inclusive quando o acesso for tentado diretamente.

### AC-S03-02 — Professor/Admin
- **Dado** um usuário com permissão confirmada
- **Quando** abrir uma capacidade administrativa
- **Então** o sistema deve permitir somente as ações previstas na matriz RBAC aprovada.

## Bloqueios

Resolvidos por `DEC-004`, `DEC-008` e `DEC-009`.

## Task

- `T003` — Aplicar matriz RBAC nos fluxos mockados — `done`.
