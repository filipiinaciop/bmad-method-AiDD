---
id: E01
status: done
priority: P1
owner: "Integrante 4 — PM / Stories"
sources:
  - PRD-USER-001
  - PRD-FR-001
  - PRD-FR-002
  - PRD-FR-003
  - PRD-FR-023
  - ARCH-001
  - DEC-001
depends_on: [DEP-001, DEP-002, DEP-003]
blocks: [E02, E03, E04]
---

# E01 — Acesso e Contas

## Outcome

Permitir que Aluno e Professor/Admin acessem o Germinare Tech com conta mockada e que as telas sejam protegidas por perfil.

## Problema e valor

- **Problema:** o sistema precisa distinguir os fluxos do aluno e do Professor/Admin.
- **Para quem:** Aluno e Professor/Admin.
- **Valor:** cada usuário acessa somente as capacidades compatíveis com seu papel.

## Evidências de origem

- [PRD-USER-001](../../../docs/01-inputs/prd.md#mapa-de-requirements) — define Aluno e Professor/Admin como usuários.
- [PRD-FR-001](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-1-login-por-credenciais) — login por e-mail e senha.
- [PRD-FR-002](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-2-criação-manual-de-conta) — criação manual de conta.
- [PRD-FR-003](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-3-controle-de-acesso-por-perfil) — controle por perfil.
- [PRD-FR-023](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-23-redefinição-de-senha-de-conta-existente) — redefinição administrativa.
- [ARCH-001](../../../docs/01-inputs/architecture.md#arch-sec-007--autorização) — RBAC.
- [DEC-001](../../../docs/00-governance/decisions.md) — dados mockados e `localStorage`.

## Escopo

### Incluído

- Login usando usuários mockados.
- Criação manual de contas no escopo do produto.
- Proteção de capacidades por Role/Permission.
- Redefinição de senha conforme o PRD.

### Fora do escopo

- Autocadastro público, importação CSV e integração acadêmica externa.
- Decidir política real de sessão, hash ou recuperação fora do escopo confirmado.

## Critérios de sucesso do epic

- [x] Usuários mockados acessam os fluxos permitidos e são impedidos de acessar capacidades protegidas — verificado em `T001`, `T003` e pelos cenários `TEST-S01-*` e `TEST-S03-*`.
- [x] Os dados de demonstração persistem em `localStorage` durante a execução — verificado em `T002` e pelo cenário `TEST-NFR-02`.

## Desconhecidos e conflitos

- `ARCH-OQ-001` e `ARCH-OQ-006` (segurança e senha): resolvidos por `DEC-003`.
- `ARCH-OQ-002` (capacidades do Admin): resolvido por `DEC-004` e `DEC-010`.
- `ARCH-OQ-003` (contratos View/Controller): resolvido por `DEC-009`.
- UX de login, loading, erro e acessibilidade: contratada por `DEC-008` em `UX-002`.

## Features

- [F01](../features/F01-authentication.md) — Autenticação e contas — `done`.
- [F02](../features/F02-rbac.md) — Autorização por perfil — `done`.

## Rastreabilidade

Matriz atualizada após a criação dos filhos: `sim`. As dependências de decisão foram resolvidas por `DEC-003`, `DEC-004`, `DEC-008`, `DEC-009` e `DEC-010`, e o epic está `done`.
