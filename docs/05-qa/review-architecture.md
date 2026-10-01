---
id: QA-REVIEW-ARCH
type: qa-review
status: done
owner: "Integrante 5 — QA / Validation"
sources: [ARCH-001, ARCH-DEC-001..ARCH-DEC-017, ARCH-OQ-001..ARCH-OQ-008, DEC-001, DEC-004, DEC-005, DEC-006, DEC-007, DEC-009]
depends_on: [ARCH-001]
---

# Revisão da arquitetura

Revisão de [`architecture.md`](../01-inputs/architecture.md) — fonte canônica declarada por [`AGENTS.md`](../../AGENTS.md) — confrontada com as decisões de `decisions.md` e com o código entregue.

Esta revisão fecha formalmente o item do checklist de promoção que exige *"o Integrante 3 e o Integrante 5 validarem o handoff"* ([`architecture.md:297`](../01-inputs/architecture.md)). O parecer está na última seção.

## Veredito

As decisões arquiteturais são coerentes, proporcionais ao escopo e foram respeitadas pela implementação sem exceção. Nenhuma camada supérflua foi criada, nenhuma dependência além de `express@4.22.3` foi introduzida, e a restrição de não expor API REST pública foi cumprida literalmente.

O problema não está nas decisões — está na manutenção do documento. A arquitetura canônica **não foi atualizada** para refletir `DEC-006` e `DEC-007`, o que deixa três estruturas de dados centrais fora da fonte que `AGENTS.md` manda seguir ([`QA-018`](findings.md#qa-018)).

## Decisões técnicas

As dezessete decisões de `ARCH-SEC-012` foram verificadas contra o repositório.

| Decisão | Conteúdo | Situação |
|---|---|---|
| `ARCH-DEC-001` | Stack de execução | respeitada |
| `ARCH-DEC-002` | MVC no mesmo projeto, sem Repository/Service | respeitada — `src/models`, `src/views`, `src/controllers` |
| `ARCH-DEC-003` / `ARCH-DEC-014` | Sem integrações externas | respeitada — única dependência é `express` |
| `ARCH-DEC-004` | Não criar Repository/Service sem necessidade | respeitada |
| `ARCH-DEC-005` a `ARCH-DEC-009` | HTML, CSS, JavaScript, Node, Express, MVC | respeitadas |
| `ARCH-DEC-010` / `ARCH-DEC-011` | PostgreSQL e Aiven deferidos | respeitadas |
| `ARCH-DEC-012` | Autenticação por e-mail e senha | respeitada — `authenticate` |
| `ARCH-DEC-013` | Autorização por RBAC | respeitada — `ROLE_PERMISSIONS` + `assertActor` |
| `ARCH-DEC-015` | Frontend e backend no mesmo projeto | respeitada |
| `ARCH-DEC-016` | Sem API REST independente ou pública | respeitada — ver abaixo |
| `ARCH-DEC-017` | Dados mockados e `localStorage` | respeitada |

`ARCH-DEC-016` merece destaque porque é fácil de violar sem perceber. O servidor tem 25 linhas, serve arquivos estáticos, uma rota `GET /` e um 404. Não há nenhuma rota de dados — toda a lógica roda no navegador sobre `localStorage`. A decisão foi cumprida na forma e na intenção.

Um detalhe não exigido por nenhuma fonte e implementado corretamente: `app.disable('x-powered-by')` em `server.js:10`, verificado no smoke HTTP. Reduz superfície de reconhecimento sem custo.

## Modelo de dados

É aqui que está a divergência principal. Comparação entre o modelo canônico, as decisões e o que foi implementado:

| Entidade | `architecture.md` | Decisões | Implementação |
|---|---|---|---|
| `USER` | `ARCH-DATA-001` | — | alinhado |
| `ROLE` | `ARCH-DATA-002` | `DEC-004` | alinhado |
| `PERMISSION` | `ARCH-DATA-003` | `DEC-004`, `DEC-010` | alinhado |
| `ROLE_PERMISSIONS` | `ARCH-DATA-004` | `DEC-004`, `DEC-010` | alinhado |
| `EVENTO` | `ARCH-DATA-005` | `DEC-006` acrescenta `capacidade` e autor | **arquitetura desatualizada** |
| `INSCRICAO` | `ARCH-DATA-006` | `DEC-007` acrescenta `status` e histórico | **arquitetura desatualizada** |
| `SUGESTAO` | **ausente** | `DEC-006` cria a entidade | **arquitetura desatualizada** |

Detalhe completo em [`QA-018`](findings.md#qa-018).

A implementação está correta — segue as decisões. A arquitetura está incompleta — não as absorveu. Como `decisions.md` estabelece que "uma decisão confirmada deve ser refletida na fonte canônica afetada", a lacuna é de manutenção documental, não de construção.

Há ainda um resíduo textual: `ARCH-DATA-006` declara que cancelamento, histórico e re-inscrição "permanecem abertos em `CONFLICT-002`", conflito que `DEC-007` resolveu e que está implementado e testado (`TEST-S14-01`, `TEST-S15-02`).

## Autorização

A matriz RBAC de `ARCH-SEC-007` lista, para o Aluno: visualizar eventos, calendário, próximos eventos, detalhes, **criar evento**, inscrever-se e cancelar inscrição. Para o Professor: criar, validar, editar, cancelar evento e ver inscritos.

A implementação corresponde exatamente, incluindo as ampliações de `DEC-010` (Professor/Admin com capacidades de descoberta e criação de contas de qualquer Role) e a equiparação de `ADMIN` a `PROFESSOR` de `DEC-004`.

Duas observações sobre a matriz em si, não sobre sua implementação:

1. O Aluno recebe `CRIAR_EVENTO` sem `EDITAR_EVENTO` nem `CANCELAR_EVENTO`. É fiel à arquitetura, e é a origem de [`QA-011`](findings.md#qa-011) — o autor não consegue corrigir nem retirar a própria proposta. A matriz foi desenhada da perspectiva administrativa; o Aluno como autor de evento não foi considerado.
2. `ARCH-SEC-007` diz que "apenas eventos aprovados ficam disponíveis como eventos válidos para os alunos", o que a implementação cumpre. A consequência — o autor perde de vista o próprio evento `PENDENTE` — é [`QA-009`](findings.md#qa-009), e precisa de decisão de produto, não de arquitetura.

O ponto forte do desenho: a verificação de permissão está em `assertActor`, chamada no início de todas as operações mutantes do domínio. Não há caminho de escrita que escape da verificação. Para um projeto deste porte, é a decisão de segurança mais importante e foi tomada corretamente.

## Validações

`ARCH-SEC-010` especifica validações de Usuário, Evento e Inscrição. Confronto item a item:

| Validação | Situação | Implementação |
|---|---|---|
| Nome, e-mail, senha obrigatórios | atendida | `required()` em `createAccount` |
| E-mail válido e único | atendida | `validEmail` + verificação case-insensitive |
| Senha com tamanho mínimo | atendida | `MIN_PASSWORD_LENGTH = 8`, por `DEC-003` |
| Campos obrigatórios do evento | atendida | `assertEventData` |
| Datas válidas, `dataInicio` ≤ `dataFim` | atendida | `validDate` + comparação |
| Evento de aluno inicia `PENDENTE` | atendida | `createEvent` decide pelo papel do ator |
| Só professor autorizado valida | atendida | `VALIDAR_EVENTO` |
| Validação resulta em `APROVADO` ou `NEGADO` | atendida | `validateEvent` recusa qualquer outro valor |
| Evento negado não fica disponível como aprovado | atendida | `enroll` exige `APROVADO` |
| Evento cancelado não aceita novas inscrições | atendida | mesma guarda |
| Aluno não se inscreve duas vezes no mesmo evento | atendida | `DUPLICATE_ENROLLMENT` sobre inscrição ativa |
| Não é possível inscrever em evento cancelado | atendida | `UNAVAILABLE_EVENT` |
| `data_inscricao` automática | atendida | `now()` |

Cobertura integral. A única validação ausente não está na lista: `createEvent` aceita data no passado ([`QA-012`](findings.md#qa-012)) — e, de fato, `ARCH-SEC-010` nunca exigiu o contrário.

## Questões arquiteturais abertas

| ID | Status declarado | Verificação |
|---|---|---|
| `ARCH-OQ-001` | `resolved-by-DEC-003` | correto — `DEC-003` define autenticação mockada |
| `ARCH-OQ-002` | `resolved-by-DEC-004` | correto |
| `ARCH-OQ-003` | `resolved-by-DEC-009` | **parcial** — ver abaixo |
| `ARCH-OQ-004` | `resolved-by-DEC-003` | **frágil** — ver abaixo |
| `ARCH-OQ-005` | `resolved-by-DEC-005/DEC-007` | correto |
| `ARCH-OQ-006` | `resolved-by-DEC-003` | correto — mínimo de 8 caracteres |
| `ARCH-OQ-007` | `deferred-mvp` | correto — FK não se aplica a `localStorage` |
| `ARCH-OQ-008` | `resolved-by-DEC-009` | correto — comandos oficiais definidos |

**`ARCH-OQ-003`** pergunta por "rotas, métodos, payloads, respostas, erros e fronteiras View/Controller". `DEC-009` responde a metade: define os comandos oficiais e que não há API REST pública. Não define a fronteira View/Controller. Na prática a fronteira existe e é consistente — `app-controller.js` não contém regra de negócio, apenas orquestra `domain.js` e monta HTML — mas isso é `derived` da leitura do código, não `confirmed` por uma fonte. Risco baixo, escopo pequeno.

**`ARCH-OQ-004`** pergunta qual referência temporal será usada para datas e encerramento. Está marcada como resolvida por `DEC-003`, que trata de autenticação mockada e não menciona datas. A resposta real está nas "Regras adicionais do MVP" de `decisions.md` — *"datas são armazenadas como strings ISO e interpretadas no horário local do navegador"* — que não tem ID de decisão. O apontamento para `DEC-003` é impreciso; o conteúdo existe, mas em uma regra sem identificador citável. Observação de rastreabilidade, risco baixo.

## Parecer sobre a promoção a `approved`

`architecture.md` lista nove critérios para deixar de ser `proposed`. Avaliação de QA:

| Critério | Situação |
|---|---|
| Responsável e versão confirmados | **não atendido** — [`QA-006`](findings.md#qa-006) |
| Decisões de persistência refletidas | atendido — `ARCH-DEC-017` |
| Modelo de dados coerente com as decisões do MVP | **não atendido** — [`QA-018`](findings.md#qa-018) |
| Questões abertas resolvidas ou deferidas com registro | atendido com ressalva em `ARCH-OQ-003`/`ARCH-OQ-004` |
| Validação do handoff pelos Integrantes 3 e 5 | **atendido pelo lado de QA** com este documento |

**Parecer: não promover ainda.** A arquitetura é tecnicamente sólida e foi integralmente respeitada pela implementação — o bloqueio é documental e tem correção barata. Fechar [`QA-018`](findings.md#qa-018) e [`QA-006`](findings.md#qa-006) torna a promoção defensável.

Promover com `QA-018` aberto significaria carimbar como aprovada uma fonte que não descreve um terço das entidades do sistema entregue.

## Fontes lidas

- [`architecture.md`](../01-inputs/architecture.md) — `ARCH-SEC-001` a `ARCH-SEC-012`, `ARCH-DATA-000` a `ARCH-DATA-006`, `ARCH-DEC-001` a `ARCH-DEC-017`, `ARCH-OQ-001` a `ARCH-OQ-008`
- [`project-context.md`](../01-inputs/project-context.md)
- [`decisions.md`](../00-governance/decisions.md) — `DEC-001` a `DEC-012` e regras adicionais do MVP
- [`AGENTS.md`](../../AGENTS.md) — regras arquiteturais do workspace
- `server.js`, `src/models/domain.js`, `src/models/store.js`, `src/controllers/app-controller.js`
