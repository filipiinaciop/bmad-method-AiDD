---
id: ARCH-CONTEXT-001
type: project-context
status: derived
owner: "Integrante 3 — Architect (a confirmar)"
source: "promoted-from-user-provided-project-context-artifact"
architecture: "./architecture.md"
---

# ARCH-CONTEXT-001 — Project Context: Gerenciador de Eventos Escolares

Este é um resumo operacional derivado da arquitetura canônica [`ARCH-001`](./architecture.md). Em caso de divergência, a arquitetura canônica e as decisões `ARCH-DEC-*` prevalecem; este arquivo não deve se tornar uma segunda fonte de decisões.

## Sistema

Gerenciador de Eventos Escolares.

## Objetivo

Centralizar os eventos de uma escola específica e permitir que alunos acompanhem e se inscrevam nas atividades disponíveis.

## Usuários

### Aluno

- visualizar eventos;
- visualizar calendário;
- visualizar próximos eventos;
- consultar detalhes;
- inscrever-se;
- cancelar inscrição.

### Professor

- criar evento;
- editar evento;
- cancelar/excluir evento;
- visualizar inscritos.

### Admin

Existe como Role no modelo RBAC para permitir permissões administrativas diferenciadas. As permissões concretas ainda estão em `ARCH-OQ-002`.

## Stack

- Frontend: HTML, CSS e JavaScript.
- Backend: JavaScript, Node.js e Express.
- Banco: PostgreSQL.
- Hospedagem do banco: Aiven.

## Arquitetura

O sistema utiliza MVC (Model-View-Controller). Frontend e backend fazem parte do mesmo projeto Node.js + Express.

## Banco de dados

Entidades:

- `USER`
- `ROLE`
- `PERMISSION`
- `ROLE_PERMISSIONS`
- `EVENTO`
- `INSCRICAO`

O usuário possui uma Role por meio de `role_id`. `ROLE_PERMISSIONS` relaciona Roles e Permissions. `INSCRICAO` relaciona alunos e eventos.

## Autenticação e autorização

A autenticação será feita por e-mail e senha. O sistema utiliza RBAC (Role-Based Access Control), no qual as permissões são determinadas pela Role do usuário.

Detalhes de hash, sessão, transporte e credenciais permanecem em `ARCH-OQ-001`.

## API e integrações

Não haverá uma API REST independente ou pública. As rotas/endpoints necessários serão processados diretamente pelo servidor Express no mesmo projeto do frontend.

Não haverá integrações com sistemas externos.

## Regras e restrições

- Manter a solução simples e adequada ao escopo escolar.
- Não adicionar camadas, tecnologias ou padrões desnecessários.
- Não criar Repository ou Service separado sem necessidade real.
- Respeitar a arquitetura MVC.
- Manter frontend e backend no mesmo projeto.
- Utilizar PostgreSQL hospedado no Aiven.
- Não alterar decisões arquiteturais sem documentar a mudança.

## Comandos e execução

Ainda não foram fornecidos comandos oficiais de instalação, execução, migração, seed, lint, testes, build ou deploy. Consulte `ARCH-OQ-008`; não invente scripts.
