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

- [PRD-USER-001](../../../docs/01-inputs/prd.md#prd-user-001) — define Aluno e Professor/Admin como usuários.
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

- [ ] Usuários mockados acessam os fluxos permitidos e são impedidos de acessar capacidades protegidas.
- [ ] Os dados de demonstração persistem em `localStorage` durante a execução.

## Desconhecidos e conflitos

- `Q-ARCH-001`, `Q-ARCH-002`, `Q-ARCH-003`, `Q-ARCH-006`: segurança, Admin, contratos e senha.
- UX específica de login, loading, erro e acessibilidade ainda não possui contrato `UX-*`.

## Features

- [F01](../features/F01-authentication.md) — Autenticação e contas — `blocked`.
- [F02](../features/F02-rbac.md) — Autorização por perfil — `blocked`.

## Rastreabilidade

Matriz atualizada após a criação dos filhos: `sim`. O epic permanece `blocked` enquanto as dependências decision estiverem abertas.
