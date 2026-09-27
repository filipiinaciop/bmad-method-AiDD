# Premissas e perguntas abertas

Este é o registro oficial de informações que ainda não são decisões confirmadas. Não esconda incertezas em uma story ou task.

## Premissas

| ID | Premissa | Impacto se estiver errada | Responsável por confirmar | Status | Data |
|---|---|---|---|---|---|
| ASM-001 | Nenhum requisito de produto foi confirmado neste repositório. | Artefatos de PM podem ser apenas templates até o recebimento das fontes. | Integrante 1 | rejeitada — PRD e Brief foram recebidos | 2026-09-14 |

## Perguntas abertas

| ID | Pergunta | Contexto/fonte | Bloqueia | Responsável | Prazo | Status |
|---|---|---|---|---|---|---|
| Q-001 | Qual é o produto e qual problema prioritário será resolvido? | Resolvido pelo Product Brief final do Germinare Tech. | Todos os epics | Integrante 1 | 2026-09-14 | resolvida |
| Q-ARCH-001 | Como serão armazenadas as senhas e gerenciadas as sessões, expiração, cookies/tokens, recuperação e proteção de transporte? | `ARCH-OQ-001` em `docs/01-inputs/architecture.md` | Autenticação e segurança | Integrante 3 | A definir | aberta |
| Q-ARCH-002 | Quais permissões concretas o `ADMIN` terá e como diferem de `PROFESSOR`? | `ARCH-OQ-002` em `docs/01-inputs/architecture.md` | RBAC e telas protegidas | Integrante 3 | A definir | aberta |
| Q-ARCH-003 | Quais rotas, métodos, payloads, respostas, erros e fronteiras View/Controller existirão? | `ARCH-OQ-003` em `docs/01-inputs/architecture.md` | UX, implementação e testes | Integrante 3 | A definir | aberta |
| Q-ARCH-004 | Qual referência temporal será usada para datas e encerramento no `localStorage`? | `ARCH-OQ-004` em `docs/01-inputs/architecture.md` | Datas, inscrições e encerramento | Integrante 3 | A definir | aberta |
| Q-ARCH-005 | Evento cancelado será marcado por status/flag ou excluído? O que acontece com inscrições e histórico? | `ARCH-OQ-005` em `docs/01-inputs/architecture.md` | Integridade, auditoria e UX | Integrante 3 | A definir | aberta |
| Q-ARCH-006 | Qual é o tamanho mínimo da senha e quais regras de credenciais serão usadas? | `ARCH-OQ-006` em `docs/01-inputs/architecture.md` | Autenticação e segurança | Integrante 3 | A definir | aberta |
| Q-ARCH-007 | Quais políticas de FK, nulabilidade e convenção de nomes serão usadas em uma futura persistência relacional? | `ARCH-OQ-007` em `docs/01-inputs/architecture.md` | Banco e migrações futuras | Integrante 3 | A definir | deferred-mvp |
| Q-ARCH-008 | Quais comandos oficiais validam instalação, execução, migração, seed, lint, testes, build e deploy? | `ARCH-OQ-008` em `docs/01-inputs/architecture.md` | Execução e DoD | Integrante 3 | A definir | aberta |

## Regras

- `ativa`/`aberta`: pode influenciar o planejamento e deve aparecer nos artefatos afetados.
- Uma premissa (`ASM-*`) é hipótese de trabalho, não requisito confirmado; ela não pode ser a única base para marcar uma story como `ready`.
- Uma pergunta (`Q-*`) continua sendo `unknown` até o responsável responder e a decisão ser registrada.
- `resolvida`: registre a decisão, a data, a fonte/evidência e atualize os artefatos afetados.
- `rejeitada`: registre o motivo; não remova o histórico.
- Conflitos entre fontes devem virar uma decisão `DEC-*`; não escolha uma versão silenciosamente.
- Pergunta que bloqueia uma task deve aparecer também em `dependencies.md`.
- Quando a resposta não puder ser verificada por uma fonte, decisão ou validação, mantenha o item `draft` ou `blocked`.
