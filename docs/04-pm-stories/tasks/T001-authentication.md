---
id: T001
parent_story: S01
parent_epic: E01
status: blocked
type: frontend | data | test
priority: P1
order: 1
owner: "A definir"
sources: [PRD-FR-001, ARCH-001, DEC-001]
acceptance_criteria: [AC-S01-01, AC-S01-02]
depends_on: [DEP-001, DEP-003]
blocks: [S03]
---

# T001 — Preparar autenticação mockada

## Objetivo

Implementar o fluxo de login com usuários mockados, persistência local e feedback de credencial inválida, sem definir sessão ou política de senha por inferência.

## Escopo

### Fazer

1. Inspecionar a estrutura MVC existente.
2. Preparar dados mockados de usuários e leitura/escrita em `localStorage`.
3. Implementar a menor unidade de autenticação compatível com os contratos aprovados.
4. Cobrir os dois critérios de `S01`.

### Não fazer

- Não conectar PostgreSQL/Aiven.
- Não escolher hash, cookie, token, expiração ou política de senha.
- Não criar rotas não definidas em `ARCH-OQ-003`.

## Resultado e validação

- Resultado: usuário válido é reconhecido e inválido é rejeitado sem enumeração.
- Validação: cenário manual no navegador + testes definidos após `ARCH-OQ-008`.
- Evidência: registro do cenário, estado do `localStorage` e saída dos testes.

## Bloqueio

`Q-ARCH-001`, `Q-ARCH-003` e `Q-ARCH-006` estão abertas. Parar sem alterar código até decisão.
