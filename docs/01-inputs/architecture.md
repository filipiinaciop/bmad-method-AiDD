---
id: ARCH-001
type: architecture
title: "Architecture Artifact — Gerenciador de Eventos Escolares"
status: approved
version: "1.1-approved"
owner: "Integrante 3 — Architect"
source: "promoted-from-user-provided-architecture-artifact"
---

# ARCH-001 — Architecture Artifact: Gerenciador de Eventos Escolares

> Esta fonte foi promovida a partir do artefato de arquitetura fornecido pelo usuário para análise. A pasta temporária de origem foi removida; este arquivo é a fonte arquitetural canônica do fluxo BMAD.

## Estado da arquitetura

- **Status:** `approved` — decisões do MVP reconciliadas, modelo de dados alinhado a `DEC-006`/`DEC-007` e handoff validado por [`docs/05-qa/implementation-readiness.md`](../05-qa/implementation-readiness.md).
- **Classificação:** decisões abaixo são `confirmed` no artefato recebido ou confirmadas pelo Grupo 3 em `DEC-003`–`DEC-016`; lacunas futuras permanecem em `ARCH-OQ-*`.
- **Regra:** não implementar uma lacuna arquitetural por inferência. Promova uma decisão `ARCH-DEC-*` antes de marcar um item dependente como `ready`.
- **Escopo:** uma escola específica, frontend e backend no mesmo projeto Node.js + Express, sem API REST pública independente.
- **Persistência da entrega atual:** dados mockados inicializados no navegador e persistidos em `localStorage`, conforme `DEC-001`/`ARCH-DEC-017`. PostgreSQL/Aiven fica deferido e não será usado no MVP acadêmico.

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

### Persistência do MVP

- Dados mockados inicializados no navegador.
- `localStorage` como persistência local.

### Persistência futura

- PostgreSQL/Aiven permanece apenas como possibilidade futura e não participa do MVP atual.

**Decisão:** `ARCH-DEC-001` define a stack de execução; `ARCH-DEC-017` define a persistência efetivamente usada nesta entrega.

## ARCH-SEC-003 — Arquitetura MVC

O sistema utiliza o padrão arquitetural MVC (Model-View-Controller).

- **Model:** representa os dados e o acesso às informações do sistema.
- **View:** representa a interface apresentada ao usuário.
- **Controller:** recebe as requisições e coordena o processamento da aplicação.

Frontend e backend fazem parte do mesmo projeto Node.js + Express.

**Decisão:** `ARCH-DEC-002` — manter MVC no mesmo projeto; não adicionar camadas Repository ou Service sem necessidade real documentada.

## ARCH-SEC-004 — Banco de dados

### ARCH-DATA-000 — Modelo lógico e persistência do MVP

As entidades e relacionamentos abaixo continuam sendo o modelo lógico de domínio. Nesta entrega, os registros são representados por dados mockados e persistidos no `localStorage` do navegador. Nenhuma migração PostgreSQL, conexão Aiven ou política de FK é necessária para o MVP atual. A futura adoção de banco relacional permanece uma decisão posterior.

**Decisão:** `ARCH-DEC-017` — usar dados mockados e `localStorage` para a persistência da entrega acadêmica atual.

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
| `capacidade` | `int` | opcional; inteiro positivo, ou nulo para capacidade ilimitada |
| `criadoPor` | `int` | FK para `USER`, obrigatório |
| `criadoEm` | `datetime` | obrigatório |
| `validadoPor` | `int` | FK para `USER`, preenchido na validação |
| `validadoEm` | `datetime` | preenchido na validação |
| `canceladoPor` | `int` | FK para `USER`, preenchido no cancelamento |
| `canceladoEm` | `datetime` | preenchido no cancelamento |

`capacidade` e `criadoPor` existem por `DEC-006`. Os campos de validação e cancelamento registram a autoria das transições definidas em `DEC-005`, `DEC-011` e `DEC-014`.

`criadoPor` é o eixo de autoria usado por `DEC-014` e `DEC-015`: habilita a retirada da própria proposta e a superfície "Minhas propostas" sem substituir o RBAC por Role descrito em `ARCH-SEC-007`.

### ARCH-DATA-006 — INSCRICAO

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `aluno_id` | `int` | FK |
| `evento_id` | `int` | FK |
| `data_inscricao` | `datetime` | obrigatório |
| `status` | `text` | obrigatório; `ATIVA` ou `CANCELADA` |
| `canceladoEm` | `datetime` | preenchido no cancelamento |
| `canceladoPor` | `int` | FK para `USER`, preenchido no cancelamento |

A combinação `(aluno_id, evento_id)` representa a restrição lógica de duplicidade **apenas entre inscrições `ATIVA`**. `DEC-007` resolveu `CONFLICT-002`/`Q-ARCH-005`: o cancelamento preserva o histórico alterando o `status` em vez de remover o registro, libera a vaga na contagem de capacidade e permite que o mesmo aluno se inscreva novamente no mesmo evento.

### ARCH-DATA-007 — SUGESTAO

| Campo | Tipo | Restrição |
|---|---|---|
| `id` | `int` | PK |
| `titulo` | `varchar` | obrigatório |
| `descricao` | `text` | obrigatório |
| `autorId` | `int` | FK para `USER`, obrigatório |
| `status` | `text` | obrigatório; `PENDENTE`, `APROVADA` ou `REJEITADA` |
| `criadoEm` | `datetime` | obrigatório |
| `revisadoPor` | `int` | FK para `USER`, preenchido na análise |
| `revisadoEm` | `datetime` | preenchido na análise |
| `evento_id` | `int` | FK para `EVENTO`, opcional |

Entidade definida por `DEC-006`. O vínculo com `EVENTO` é opcional e só é preenchido quando uma sugestão aprovada origina um evento concreto. Uma sugestão analisada permanece registrada para consulta do autor.

> `ARCH-OQ-004` está resolvida: a referência temporal do MVP é o horário local do navegador, conforme `DEC-003` e as regras adicionais de [`decisions.md`](../00-governance/decisions.md). Os dados mockados usam datas relativas ao dia de execução, por `DEC-016`. O estado `ENCERRADO` permanece deferido por `DEC-005`, então não há recálculo de status por tempo.

## ARCH-SEC-005 — Relacionamentos

- `ARCH-RULE-001`: uma `ROLE` pode estar associada a vários `USER`.
- `ARCH-RULE-002`: um `USER` possui uma `ROLE`.
- `ARCH-RULE-003`: uma `ROLE` pode possuir várias `PERMISSION` por meio de `ROLE_PERMISSIONS`.
- `ARCH-RULE-004`: uma `PERMISSION` pode estar associada a várias `ROLE` por meio de `ROLE_PERMISSIONS`.
- `ARCH-RULE-005`: um `USER` pode possuir várias `INSCRICOES`.
- `ARCH-RULE-006`: um `EVENTO` pode possuir várias `INSCRICOES`.
- `ARCH-RULE-007`: um `USER` pode ser autor de vários `EVENTO`, por meio de `EVENTO.criadoPor`.
- `ARCH-RULE-008`: um `USER` pode ser autor de várias `SUGESTAO`, por meio de `SUGESTAO.autorId`.
- `ARCH-RULE-009`: uma `SUGESTAO` pode originar no máximo um `EVENTO`, por meio de `SUGESTAO.evento_id`, que é opcional.
- `ARCH-RULE-010`: um `USER` pode ter no máximo uma `INSCRICAO` com status `ATIVA` por `EVENTO`; inscrições `CANCELADA` não contam para essa restrição.

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
- visualizar as próprias propostas (`VISUALIZAR_MINHAS_PROPOSTAS`, por `DEC-015`);
- retirar a própria proposta enquanto estiver `PENDENTE` (`CANCELAR_PROPRIO_EVENTO`, por `DEC-014`);
- inscrever-se;
- cancelar a própria inscrição;
- enviar sugestão e acompanhar as próprias sugestões.

O Aluno **não** possui `EDITAR_EVENTO` nem `CANCELAR_EVENTO`. `CANCELAR_PROPRIO_EVENTO` é uma permissão distinta, verificada contra `EVENTO.criadoPor`, e não concede capacidade administrativa sobre eventos de terceiros.

### Professor

- criar evento;
- validar evento;
- editar evento;
- cancelar evento;
- visualizar inscritos;
- cancelar inscrição de aluno;
- criar conta e redefinir senha;
- revisar, aprovar e rejeitar sugestões;
- capacidades de descoberta equivalentes às do Aluno, por `DEC-010`.

### Admin

Role prevista no modelo RBAC para permitir diferenciação de permissões administrativas.

Por `DEC-004` e `DEC-010`, o `ADMIN` possui no MVP as mesmas capacidades do `PROFESSOR`, mantendo a Role separada para diferenciação futura. `ARCH-OQ-002` está resolvida.

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

### Terminalidade por status

| Status | Edição | Cancelamento administrativo | Retirada pelo autor | Inscrição |
|---|---|---|---|---|
| `PENDENTE` | permitida | recusada (`DEC-011`) | permitida ao autor (`DEC-014`) | recusada |
| `APROVADO` | permitida | permitida (`DEC-011`) | recusada | permitida |
| `NEGADO` | recusada (`DEC-013`) | recusada (`DEC-011`) | recusada | recusada |
| `CANCELADO` | recusada (`DEC-005`) | recusada | recusada | recusada |

A interface só oferece a ação nos estados em que o domínio a aceita. Oferecer uma ação que o domínio recusa é defeito de interface, não validação.

## ARCH-SEC-008 — API e rotas

Não será desenvolvida uma API REST independente ou pública. Frontend e backend estarão no mesmo projeto Node.js + Express. As rotas e endpoints necessários serão processados diretamente pelo servidor da aplicação e utilizados pelo frontend do próprio projeto.

`ARCH-OQ-003` registra que caminhos, métodos, payloads, respostas, erros e limites entre View e Controller ainda não estão especificados.

## ARCH-SEC-009 — Integrações

Não haverá integrações com sistemas externos. A entrega atual utiliza dados mockados e `localStorage`; PostgreSQL/Aiven fica deferido para uma evolução futura.

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
- na **criação**, `dataInicio` não pode ser anterior ao dia corrente (`DEC-016`); a **edição** não aplica essa regra, para permitir correções em eventos já iniciados;
- capacidade opcional; quando informada, inteiro positivo;
- a edição não pode reduzir a capacidade abaixo do número de inscrições `ATIVA`;
- eventos criados por alunos devem iniciar com status `PENDENTE`;
- apenas um professor autorizado pode validar um evento;
- a validação pode resultar em `APROVADO` ou `NEGADO`;
- eventos negados não devem ser disponibilizados como eventos aprovados;
- eventos negados não podem ser editados (`DEC-013`);
- eventos cancelados não devem permitir novas inscrições.

### Inscrição

- `aluno_id` obrigatório;
- `evento_id` obrigatório;
- um aluno não pode ter duas inscrições `ATIVA` no mesmo evento;
- após cancelar, o aluno pode se inscrever novamente no mesmo evento (`DEC-007`);
- não é possível realizar inscrição em evento que não esteja `APROVADO`;
- `data_inscricao` registrada automaticamente.

`ARCH-OQ-005` está resolvida por `DEC-005` e `DEC-007`: o cancelamento é marcado por status, não por exclusão, e o histórico é preservado. O tamanho mínimo da senha é definido por `DEC-003`.

## ARCH-SEC-011 — Padrões

O principal padrão arquitetural é MVC. Para a persistência do MVP será utilizada uma estrutura simples de leitura/escrita em `localStorage`, sem criar camadas Repository ou Service apenas para aumentar a complexidade.

**Decisão:** `ARCH-DEC-004` — não criar Repository ou Service sem necessidade real documentada.

## ARCH-SEC-012 — Decisões técnicas

1. `ARCH-DEC-005`: HTML e CSS serão utilizados no frontend.
2. `ARCH-DEC-006`: JavaScript será utilizado no frontend e no backend.
3. `ARCH-DEC-007`: Node.js será utilizado para execução do backend.
4. `ARCH-DEC-008`: Express será utilizado para organização do servidor e das rotas.
5. `ARCH-DEC-009`: MVC será utilizado para separar responsabilidades.
6. `ARCH-DEC-010`: PostgreSQL permanece como modelo lógico futuro para dados estruturados e relacionamentos, mas não será usado no MVP atual.
7. `ARCH-DEC-011`: Aiven fica deferido e não participa da entrega acadêmica atual.
8. `ARCH-DEC-012`: a autenticação será feita por e-mail e senha.
9. `ARCH-DEC-013`: a autorização será baseada em RBAC.
10. `ARCH-DEC-014`: não haverá integrações externas.
11. `ARCH-DEC-015`: frontend e backend permanecerão no mesmo projeto.
12. `ARCH-DEC-016`: não será criada uma API REST independente ou pública.
13. `ARCH-DEC-017`: a entrega atual usará dados mockados e `localStorage` para persistência local no navegador, sem conexão com PostgreSQL/Aiven.
14. `ARCH-DEC-018`: `NEGADO` é terminal para edição — reflete `DEC-013`.
15. `ARCH-DEC-019`: a autoria registrada em `EVENTO.criadoPor` habilita a retirada da própria proposta `PENDENTE` por meio de `CANCELAR_PROPRIO_EVENTO`, sem alterar a matriz RBAC por Role — reflete `DEC-014`.
16. `ARCH-DEC-020`: a superfície "Minhas propostas" é derivada de `EVENTO.criadoPor` por meio de `VISUALIZAR_MINHAS_PROPOSTAS` — reflete `DEC-015`.
17. `ARCH-DEC-021`: a criação de evento recusa `dataInicio` anterior ao dia corrente, como validação de entrada, sem reintroduzir o estado `ENCERRADO` deferido por `DEC-005`; os dados mockados usam datas relativas ao dia de execução — reflete `DEC-016`.

## Perguntas arquiteturais abertas

Estas perguntas foram extraídas do artefato recebido. Elas não devem ser resolvidas por inferência.

| ID | Pergunta | Impacto | Status |
|---|---|---|---|
| `ARCH-OQ-001` | Como senhas serão armazenadas com segurança? Como funcionarão sessão, expiração, cookies/tokens, recuperação e proteção de transporte? | Autenticação e segurança do MVP mockado | `resolved-by-DEC-003` |
| `ARCH-OQ-002` | Quais permissões concretas o `ADMIN` terá e como diferem de `PROFESSOR`? | RBAC e telas protegidas | `resolved-by-DEC-004` |
| `ARCH-OQ-003` | Quais rotas, métodos, payloads, respostas, erros e fronteiras View/Controller existirão? | UX, implementação e testes | `resolved-by-DEC-009` |
| `ARCH-OQ-004` | Qual referência temporal será usada para datas e encerramento no `localStorage`? | Datas, inscrições e encerramento no MVP | `resolved-by-DEC-003` |
| `ARCH-OQ-005` | Evento cancelado será marcado por status/flag ou excluído? O que acontece com inscrições e histórico? | Integridade, auditoria e UX | `resolved-by-DEC-005/DEC-007` |
| `ARCH-OQ-006` | Qual é o tamanho mínimo da senha e quais são as regras de validação de credenciais? | Autenticação e segurança | `resolved-by-DEC-003` |
| `ARCH-OQ-007` | Quais políticas de FK (`ON DELETE`, nulabilidade e atualização) serão usadas? Qual convenção de nomes será adotada? | Banco e migrações futuras | `deferred-mvp` |
| `ARCH-OQ-008` | Quais comandos de instalação, execução, migração, seed, lint, testes, build e deploy validam a solução? | Execução e DoD | `resolved-by-DEC-009` |

## Critérios para promoção a `approved`

A arquitetura foi promovida de `proposed` para `approved` com os critérios abaixo atendidos:

- [x] responsável e versão confirmados — `Integrante 3 — Architect`, versão `1.1-approved`;
- [x] `ARCH-DEC-*`, `ARCH-DATA-*`, `ARCH-RULE-*` e `ARCH-OQ-*` rastreáveis;
- [x] perguntas bloqueadoras resolvidas por `DEC-*` — `ARCH-OQ-001` a `ARCH-OQ-006` e `ARCH-OQ-008` resolvidas; `ARCH-OQ-007` permanece `deferred-mvp` e não é bloqueadora, porque o MVP não usa banco relacional;
- [x] contrato de rotas, segurança e timezone definido — `DEC-009` para rotas e comandos, `DEC-003` para segurança, horário local do navegador por `decisions.md`;
- [x] políticas de evento cancelado, FKs e nomes definidas — cancelamento por `DEC-005`, `DEC-011`, `DEC-013` e `DEC-014`; políticas de FK deferidas com `ARCH-OQ-007`, por ausência de banco relacional no MVP;
- [x] comandos de validação confirmados — `DEC-009`;
- [x] nenhum conflito não registrado com PRD ou UX — os conflitos encontrados estão em [`docs/05-qa/findings.md`](../05-qa/findings.md) e foram resolvidos por `DEC-013` a `DEC-016`;
- [x] decisões do MVP confirmadas em `DEC-003` a `DEC-016`;
- [x] handoff validado pelo Integrante 3 e pelo Integrante 5 — veredito em [`docs/05-qa/implementation-readiness.md`](../05-qa/implementation-readiness.md).
