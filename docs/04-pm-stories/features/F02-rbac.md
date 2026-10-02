---
id: F02
parent_epic: E01
status: done
priority: P1
sources: [PRD-FR-003, ARCH-001, DEC-001]
depends_on: [DEP-002, DEP-003]
---

# F02 — Autorização por perfil

## Capacidade

Aplicar Roles e Permissions aos fluxos de Aluno e Professor/Admin, usando o modelo RBAC aprovado.

## Stories

- `S03` Restringir capacidades por perfil — `done`.

## Critério de conclusão

A matriz de permissões foi decidida por `DEC-004` e `DEC-010`, que resolvem `ARCH-OQ-002` e igualam `ADMIN` a `PROFESSOR` no MVP. `DEC-014` e `DEC-015` acrescentam as permissões de autoria do Aluno. Contratos de navegação e erro vêm de `DEC-008`. Verificado em `T003`.
