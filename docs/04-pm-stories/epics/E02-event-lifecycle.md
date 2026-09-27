---
id: E02
status: blocked
priority: P1
owner: "Integrante 4 — PM / Stories"
sources:
  - PRD-UJ-001
  - PRD-FR-004
  - PRD-FR-005
  - PRD-FR-006
  - PRD-FR-007
  - PRD-FR-008
  - ARCH-001
  - DEC-001
depends_on: [DEP-004, DEP-005, DEP-006, DEP-007]
blocks: [E03, E04]
---

# E02 — Gestão do Ciclo de Eventos

## Outcome

Permitir que a comunidade escolar crie, valide, edite, cancele e acompanhe eventos dentro do fluxo aprovado.

## Problema e valor

- **Problema:** eventos são organizados por mensagens e planilhas dispersas.
- **Para quem:** Professor/Admin e, conforme a decisão de fluxo, Aluno.
- **Valor:** um evento possui um registro central e uma situação visível.

## Evidências de origem

- [PRD-UJ-001](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#23-principais-jornadas-de-usuário) — jornada de criação.
- [PRD-FR-004](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-4-criação-de-evento) a [PRD-FR-008](../../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-8-visualização-de-inscritos) — gestão do evento.
- [ARCH-001](../../../docs/01-inputs/architecture.md#fluxo-de-validação-de-eventos) — fluxo arquitetural de validação.
- [UX-001](../../../docs/01-inputs/ux.md) — fundação visual fornecida.

## Escopo

### Incluído

- Criação, edição, cancelamento e visualização de inscritos.
- Validação de eventos quando o fluxo arquitetural for reconciliado.
- Dados mockados persistidos em `localStorage`.

### Fora do escopo

- Resolver por inferência os estados `Publicado/Encerrado` versus `PENDENTE/APROVADO/NEGADO/CANCELADO`.
- Banco remoto, migrações e jobs externos.

## Desconhecidos e conflitos

- `CONFLICT-001`: PRD e Arquitetura divergem sobre ator inicial e estados do Evento.
- `Q-ARCH-003`, `Q-ARCH-004`, `Q-ARCH-005`: contratos, datas e cancelamento.
- Modelo de capacidade/vagas não está na arquitetura canônica.

## Features

- [F03](../features/F03-event-management.md) — Gestão de eventos — `blocked`.
- [F07](../features/F07-event-validation.md) — Validação de eventos — `blocked`.
