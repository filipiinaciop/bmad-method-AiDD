# AGENTS.md

## Escopo

Estas instruções se aplicam ao workspace do Gerenciador de Eventos. Antes de realizar alterações relevantes, leia o contexto canônico e consulte a arquitetura canônica:

- [`docs/01-inputs/project-context.md`](docs/01-inputs/project-context.md)
- [`docs/01-inputs/architecture.md`](docs/01-inputs/architecture.md)
- [`docs/00-governance/evidence-protocol.md`](docs/00-governance/evidence-protocol.md)
- [`docs/00-governance/bmad-reading-map.md`](docs/00-governance/bmad-reading-map.md)

A arquitetura recebida para análise foi promovida para `docs/01-inputs/architecture.md`. Essa fonte canônica é a única referência arquitetural; não mantenha cópias ou arquiteturas paralelas.

## Regras arquiteturais

- Respeite a arquitetura MVC definida em `ARCH-001`.
- Respeite a stack: HTML, CSS, JavaScript, Node.js, Express e PostgreSQL.
- Considere o PostgreSQL hospedado no Aiven como o banco de dados do projeto.
- Mantenha frontend e backend no mesmo projeto.
- Não crie uma API REST independente ou pública.
- Respeite o modelo de autorização RBAC baseado em Roles e Permissions.
- Respeite as entidades e relacionamentos definidos em `ARCH-DATA-*`.
- Não adicione tecnologias, camadas ou padrões desnecessários para um projeto de escopo simples.
- Não crie Repository ou Service separado sem uma necessidade real do projeto.
- Não implemente `ARCH-OQ-*` por inferência; registre uma decisão antes.
- Ao propor uma alteração arquitetural, explique a necessidade, atualize a arquitetura canônica e registre o impacto nos artefatos dependentes.

## Regras contra alucinação

- Uma fonte ausente, conflito ou contrato indefinido deve ser marcado como `unknown`/`conflict` e pode bloquear a Task.
- Não trate `project-context.md`, templates, comentários ou código existente como autorização para expandir o escopo.
- Antes de criar ou alterar Epic, Feature, Story, Spec ou Task, use o intake e aguarde confirmação explícita.
