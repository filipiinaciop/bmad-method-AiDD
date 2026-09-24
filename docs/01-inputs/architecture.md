---
id: ARCH-001
type: architecture
title: "Architecture Artifact — Gerenciador de Eventos Escolares"
status: proposed
version: "1.0-proposed"
owner: "Integrante 3 — Architect (a confirmar)"
source: "promoted-from-user-provided-architecture-artifact"
---

# ARCH-001 — Architecture Artifact: Gerenciador de Eventos Escolares

> Esta fonte foi promovida a partir do artefato de arquitetura fornecido pelo usuário para análise. A pasta temporária de origem foi removida; este arquivo é a fonte arquitetural canônica do fluxo BMAD.

## Estado da arquitetura

- **Status:** `proposed`
- **Classificação:** decisões abaixo são `confirmed` no artefato recebido; lacunas estão registradas como `unknown` em `ARCH-OQ-*`.
- **Regra:** não implementar uma lacuna arquitetural por inferência. Promova uma decisão `ARCH-DEC-*` antes de marcar um item dependente como `ready`.
- **Escopo:** uma escola específica, frontend e backend no mesmo projeto Node.js + Express, sem API REST pública independente.

## ARCH-SEC-001 — Visão geral

O Gerenciador de Eventos Escolares é um sistema web destinado a uma escola específica para centralizar seus eventos e permitir que alunos acompanhem e se inscrevam nas atividades disponíveis.

## ARCH-SEC-002 — Stack

### Frontend

- HTML
- CSS
- JavaScript

### Backend

- JavaScript
- Node.js
- Express

### Banco de dados

- PostgreSQL
- Hospedagem: Aiven

**Decisão:** `ARCH-DEC-001` — manter a stack acima como base da solução proposta.

## ARCH-SEC-003 — Arquitetura MVC

O sistema utiliza o padrão arquitetural MVC (Model-View-Controller).

- **Model:** representa os dados e o acesso às informações do sistema.
- **View:** representa a interface apresentada ao usuário.
- **Controller:** recebe as requisições e coordena o processamento da aplicação.

Frontend e backend fazem parte do mesmo projeto Node.js + Express.

**Decisão:** `ARCH-DEC-002` — manter MVC no mesmo projeto; não adicionar camadas Repository ou Service sem necessidade real documentada.

## ARCH-SEC-004 — Banco de dados

### ARCH-DATA-001 — USER

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `nome` | `varchar` | obrigatório |
| `email` | `varchar` | obrigatório, UNIQUE |
| `senha` | `varchar` | obrigatório |
| `role_id` | `int` | FK |

### ARCH-DATA-002 — ROLE

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `nome` | `varchar` | obrigatório |

Roles previstas: `ALUNO`, `PROFESSOR` e `ADMIN`.

### ARCH-DATA-003 — PERMISSION

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `nome` | `varchar` | obrigatório |

### ARCH-DATA-004 — ROLE_PERMISSIONS

Tabela intermediária entre Role e Permission.

| Campo | Tipo | Restrição |
|---|---|---|
| `role_id` | `int` | PK, FK |
| `permission_id` | `int` | PK, FK |

A chave primária é composta por `(role_id, permission_id)`.

### ARCH-DATA-005 — EVENTO

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `titulo` | `varchar` | obrigatório |
| `dataInicio` | `date` | obrigatório |
| `dataFim` | `date` | obrigatório |
| `hora` | `time` | obrigatório |
| `localizacao` | `varchar` | obrigatório |
| `descricao` | `text` | obrigatório |
| `status` | `text` | obrigatório |

### ARCH-DATA-006 — INSCRICAO

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `aluno_id` | `int` | FK |
| `evento_id` | `int` | FK |
| `data_inscricao` | `datetime` | obrigatório |

A combinação `(aluno_id, evento_id)` deve ser única para impedir inscrições duplicadas.

> `ARCH-OQ-004` registra a confirmação necessária sobre o tipo de data/hora e timezone no PostgreSQL. O conteúdo original usa `datetime`; isso não deve ser corrigido silenciosamente.

## ARCH-SEC-005 — Relacionamentos

- `ARCH-RULE-001`: uma `ROLE` pode estar associada a vários `USER`.
- `ARCH-RULE-002`: um `USER` possui uma `ROLE`.
- `ARCH-RULE-003`: uma `ROLE` pode possuir várias `PERMISSION` por meio de `ROLE_PERMISSIONS`.
- `ARCH-RULE-004`: uma `PERMISSION` pode estar associada a várias `ROLE` por meio de `ROLE_PERMISSIONS`.
- `ARCH-RULE-005`: um `USER` pode possuir várias `INSCRICOES`.
- `ARCH-RULE-006`: um `EVENTO` pode possuir várias `INSCRICOES`.

## ARCH-SEC-006 — Autenticação

A autenticação será realizada por e-mail e senha.

`ARCH-OQ-001` detalha as decisões ainda ausentes sobre hash, sessão, expiração, cookies/tokens, recuperação de senha, proteção de transporte e segredos.

## ARCH-SEC-007 — Autorização

O sistema utiliza RBAC (Role-Based Access Control). As permissões de acesso são determinadas pela Role do usuário e pelas Permissions associadas a essa Role.

### Aluno

- visualizar eventos;
- visualizar calendário;
- visualizar lista de próximos eventos;
- consultar detalhes;
- criar evento;
- inscrever-se;
- cancelar inscrição.

### Professor

- criar evento;
- validar evento;
- editar evento;
- cancelar/excluir evento;
- visualizar inscritos.

### Admin

Role prevista no modelo RBAC para permitir diferenciação de permissões administrativas.

`ARCH-OQ-002` registra que as permissões concretas do Admin ainda precisam ser definidas.

## Fluxo de validação de eventos

1. O aluno cria um evento.
2. O evento é registrado com status `PENDENTE`.
3. O professor recebe uma solicitação de validação.
4. O professor executa a ação `VALIDAR_EVENTO`.
5. O professor pode aprovar ou negar o evento.
6. Se aprovado, o status passa para `APROVADO`.
7. Se negado, o status passa para `NEGADO`.
8. Apenas eventos aprovados ficam disponíveis como eventos válidos para os alunos.

### Solicitação de validação

O professor possui uma área de solicitações onde pode visualizar os eventos que estão com status `PENDENTE` e aguardam sua validação.

### Status possíveis

- `PENDENTE`
- `APROVADO`
- `NEGADO`
- `CANCELADO`

## ARCH-SEC-008 — API e rotas

Não será desenvolvida uma API REST independente ou pública. Frontend e backend estarão no mesmo projeto Node.js + Express. As rotas e endpoints necessários serão processados diretamente pelo servidor da aplicação e utilizados pelo frontend do próprio projeto.

`ARCH-OQ-003` registra que caminhos, métodos, payloads, respostas, erros e limites entre View e Controller ainda não estão especificados.

## ARCH-SEC-009 — Integrações

Não haverá integrações com sistemas externos. A aplicação utilizará seus próprios componentes e o PostgreSQL hospedado no Aiven.

**Decisão:** `ARCH-DEC-003` — não incluir integrações externas na v1 proposta.

## ARCH-SEC-010 — Validações

### Usuário

- nome obrigatório;
- e-mail obrigatório e válido;
- e-mail único;
- senha obrigatória;
- senha com tamanho mínimo definido pelo sistema.

### Evento

- título obrigatório;
- descrição obrigatória;
- data de início obrigatória;
- data de fim obrigatória;
- horário obrigatório;
- local obrigatório;
- datas válidas;
- `dataInicio` igual ou anterior a `dataFim`;
- eventos criados por alunos devem iniciar com status `PENDENTE`;
- apenas um professor autorizado pode validar um evento;
- a validação pode resultar em `APROVADO` ou `NEGADO`;
- eventos negados não devem ser disponibilizados como eventos aprovados;
- eventos cancelados não devem permitir novas inscrições.

### Inscrição

- `aluno_id` obrigatório;
- `evento_id` obrigatório;
- um aluno não pode se inscrever duas vezes no mesmo evento;
- não é possível realizar inscrição em evento cancelado;
- `data_inscricao` registrada automaticamente.

`ARCH-OQ-005` registra que o valor do tamanho mínimo da senha e a política de cancelamento/exclusão/status do evento ainda precisam de decisão detalhada.

## ARCH-SEC-011 — Padrões

O principal padrão arquitetural é MVC. Para o acesso ao banco será utilizada uma estrutura simples de conexão, sem criar camadas Repository ou Service apenas para aumentar a complexidade.

**Decisão:** `ARCH-DEC-004` — não criar Repository ou Service sem necessidade real documentada.

## ARCH-SEC-012 — Decisões técnicas

1. `ARCH-DEC-005`: HTML e CSS serão utilizados no frontend.
2. `ARCH-DEC-006`: JavaScript será utilizado no frontend e no backend.
3. `ARCH-DEC-007`: Node.js será utilizado para execução do backend.
4. `ARCH-DEC-008`: Express será utilizado para organização do servidor e das rotas.
5. `ARCH-DEC-009`: MVC será utilizado para separar responsabilidades.
6. `ARCH-DEC-010`: PostgreSQL será utilizado para os dados estruturados e relacionamentos.
7. `ARCH-DEC-011`: o PostgreSQL será hospedado no Aiven.
8. `ARCH-DEC-012`: a autenticação será feita por e-mail e senha.
9. `ARCH-DEC-013`: a autorização será baseada em RBAC.
10. `ARCH-DEC-014`: não haverá integrações externas.
11. `ARCH-DEC-015`: frontend e backend permanecerão no mesmo projeto.
12. `ARCH-DEC-016`: não será criada uma API REST independente ou pública.

## Perguntas arquiteturais abertas

Estas perguntas foram extraídas do artefato recebido. Elas não devem ser resolvidas por inferência.

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| `ARCH-OQ-001` | Como senhas serão armazenadas com segurança? Como funcionarão sessão, expiração, cookies/tokens, recuperação e proteção de transporte? | Autenticação e segurança | `open` |
| `ARCH-OQ-002` | Quais permissões concretas o `ADMIN` terá e como diferem de `PROFESSOR`? | RBAC e telas protegidas | `open` |
| `ARCH-OQ-003` | Quais rotas, métodos, payloads, respostas, erros e fronteiras View/Controller existirão? | UX, implementação e testes | `open` |
| `ARCH-OQ-004` | O banco usará `timestamp`, `timestamp with time zone` ou outro tipo? Qual timezone será a referência? | Datas, inscrições e encerramento | `open` |
| `ARCH-OQ-005` | Evento cancelado será marcado por status/flag ou excluído? O que acontece com inscrições e histórico? | Integridade, auditoria e UX | `open` |
| `ARCH-OQ-006` | Qual é o tamanho mínimo da senha e quais são as regras de validação de credenciais? | Autenticação e segurança | `open` |
| `ARCH-OQ-007` | Quais políticas de FK (`ON DELETE`, nulabilidade e atualização) serão usadas? Qual convenção de nomes será adotada? | Banco e migrações | `open` |
| `ARCH-OQ-008` | Quais comandos de instalação, execução, migração, seed, lint, testes, build e deploy validam a solução? | Execução e DoD | `open` |

## Critérios para promoção a `approved`

A arquitetura pode ser promovida de `proposed` para `approved` quando:

- [ ] responsável e versão forem confirmados;
- [ ] `ARCH-DEC-*`, `ARCH-DATA-*`, `ARCH-RULE-*` e `ARCH-OQ-*` estiverem rastreáveis;
- [ ] as perguntas bloqueadoras forem resolvidas por `DEC-*`;
- [ ] o contrato de rotas, segurança e timezone estiver definido;
- [ ] políticas de evento cancelado, FKs e nomes estiverem definidas;
- [ ] comandos de validação forem confirmados;
- [ ] não houver conflito não registrado com PRD ou UX;
- [ ] o Integrante 3 e o Integrante 5 validarem o handoff.
