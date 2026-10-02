---
id: QA-FINDINGS
type: qa-findings
status: done
owner: "Integrante 5 — QA / Validation"
sources: [PRD-001, UX-001, ARCH-001, DEC-001, DEC-005, DEC-009, DEC-011, E01, E02, E03, E04]
---

# Achados de validação

Registro dos problemas identificados na revisão de PRD, UX, Arquitetura, Stories e implementação. Cada achado aponta evidência localizável e um responsável pela decisão.

Os achados de produto foram corrigidos na rodada autorizada por `DEC-013` a `DEC-016`, e os achados de interface `QA-020` a `QA-022` na rodada autorizada por `DEC-017` a `DEC-019`. Ambas estão registradas em [`correction-validation.md`](correction-validation.md). O corpo de cada achado preserva a evidência original do defeito: ele descreve o estado no momento da detecção, não o estado atual.

## Resumo

| Severidade | Quantidade | Abertos | Revalidados |
|---|---:|---:|---:|
| Alta | 7 | 0 | 7 |
| Média | 11 | 0 | 11 |
| Baixa | 4 | 0 | 4 |
| **Total** | **22** | **0** | **22** |

Nenhum achado permanece aberto. `QA-015` e `QA-016` foram resolvidos dentro da entrega de QA por serem de infraestrutura de validação; os demais foram corrigidos pelos responsáveis após o registro das decisões correspondentes. `QA-020` a `QA-022` foram levantados por inspeção da aplicação em execução, depois da rodada de correções de produto.

## Índice

| ID | Severidade | Título | Responsável | Status |
|---|---|---|---|---|
| [QA-001](#qa-001) | Alta | Cascata `done` → `blocked` em Epics, Features e Stories | Integrante 4 | revalidado |
| [QA-002](#qa-002) | Alta | Stories `done` declaram a Task como `blocked` | Integrante 4 | revalidado |
| [QA-003](#qa-003) | Média | Seção "Bloqueios" descreve conflitos já resolvidos | Integrante 4 | revalidado |
| [QA-004](#qa-004) | Média | `DEC-003`–`DEC-012` fora de tabela válida em `decisions.md` | Integrante 4 | revalidado |
| [QA-005](#qa-005) | Média | `ux.md` declara dois status incompatíveis no mesmo arquivo | Integrante 2 | revalidado |
| [QA-006](#qa-006) | Baixa | Responsável da arquitetura permanece "a confirmar" | Integrante 3 | revalidado |
| [QA-018](#qa-018) | Alta | Arquitetura canônica não reflete `DEC-006` e `DEC-007` | Integrante 3 | revalidado |
| [QA-007](#qa-007) | Alta | "Cancelar evento" é oferecido em estados que o domínio recusa | Integrantes 2 e 3 | revalidado |
| [QA-008](#qa-008) | Alta | "Editar" é oferecido em evento cancelado, que o domínio recusa | Integrantes 2 e 3 | revalidado |
| [QA-009](#qa-009) | Alta | Aluno autor não tem superfície para acompanhar a própria proposta | Integrante 1 | revalidado |
| [QA-010](#qa-010) | Média | Evento `NEGADO` permanece editável sem regra de origem | Integrantes 1 e 3 | revalidado |
| [QA-011](#qa-011) | Média | Aluno não pode editar nem cancelar o evento que criou | Integrante 1 | revalidado |
| [QA-012](#qa-012) | Média | Evento com data passada continua aberto a inscrição | Integrante 1 | revalidado |
| [QA-013](#qa-013) | Média | Erro de formulário aparece fora do contexto da ação | Integrante 2 | revalidado |
| [QA-014](#qa-014) | Baixa | Foco programático em elemento não focável | Integrante 2 | revalidado |
| [QA-015](#qa-015) | Alta | Comando oficial de teste não cobria toda a pasta `tests/` | QA / Validation | revalidado |
| [QA-016](#qa-016) | Média | Lacunas de cobertura automatizada em regras já exigidas | QA / Validation | revalidado |
| [QA-017](#qa-017) | Baixa | Contagem de evidência incorreta na matriz de rastreabilidade | Integrante 4 | revalidado |
| [QA-019](#qa-019) | Média | Âncoras `PRD-USER-001` e `SM-C1` não existem como cabeçalho | Integrante 4 | revalidado |
| [QA-020](#qa-020) | Média | Feedback global permanece na tela indefinidamente | Integrante 2 | revalidado |
| [QA-021](#qa-021) | Média | Botão de retorno volta para destino fixo, não para a tela anterior | Integrante 2 | revalidado |
| [QA-022](#qa-022) | Baixa | Credenciais permanecem nos campos de login após logout | Integrante 2 | revalidado |

---

## Rastreabilidade e consistência documental

### QA-001

**Severidade:** Alta · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

As sete Features declaram `status: done` no front-matter, mas o corpo de cada uma lista **todas** as suas Stories como `blocked`.

**Evidência**

```text
docs/04-pm-stories/features/F01-authentication.md:4   status: done
docs/04-pm-stories/features/F01-authentication.md:16  - `S01` Login por credenciais — `blocked`.
docs/04-pm-stories/features/F01-authentication.md:22  Enquanto `ARCH-OQ-001` e `ARCH-OQ-006` estiverem abertos, a Feature permanece `blocked`.
```

O mesmo padrão ocorre em `F02` a `F07`: 7 de 7 Features `done`, 21 de 21 Stories listadas como `blocked`. `F01` chega a afirmar textualmente que a Feature "permanece `blocked`" enquanto o front-matter diz `done`.

O defeito se repete um nível acima. Os quatro Epics declaram `status: done` e listam **todas** as suas Features como `blocked`:

```text
docs/04-pm-stories/epics/E03-discovery-and-enrollments.md:2   status: done
docs/04-pm-stories/epics/E03-discovery-and-enrollments.md     - [F04] — Descoberta de eventos — `blocked`.
docs/04-pm-stories/epics/E03-discovery-and-enrollments.md     - [F05] — Inscrições — `blocked`.
```

Totalizando a cascata: 4 Epics `done` apontando 8 Features `blocked`, 7 Features `done` apontando 21 Stories `blocked`, e 13 Stories `done` apontando Task `blocked` (ver [`QA-002`](#qa-002)). Nenhum nível da hierarquia `DEC-002` é internamente consistente.

As questões citadas estão resolvidas: `ARCH-OQ-001` e `ARCH-OQ-006` constam como `resolved-by-DEC-003` em [`architecture.md`](../01-inputs/architecture.md#perguntas-arquiteturais-abertas).

**Impacto**

A camada Feature foi formalizada por `DEC-002` justamente para ser o elo entre Epic e Story. Hoje ela afirma duas coisas incompatíveis sobre o mesmo item. Qualquer leitura automatizada ou humana de prontidão a partir das Features produz um resultado errado.

**Condição de fechamento**

Atualizar o status de cada Feature listada em `E01`–`E04`, de cada Story listada em `F01`–`F07` e os critérios de conclusão, refletindo as decisões `DEC-003`–`DEC-012`.

---

### QA-002

**Severidade:** Alta · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Treze Stories declaram `status: done` no front-matter, mas registram a Task filha como `blocked` na última seção.

**Evidência**

```text
docs/04-pm-stories/stories/E03/S12-enroll-event.md:5   status: done
docs/04-pm-stories/stories/E03/S12-enroll-event.md:36  - `T012` — Persistir inscrição de aluno — `blocked`.
```

Afeta `S09` a `S21`. As Stories `S01`–`S08` já foram atualizadas e registram a Task como `done` — a atualização de status parou em `S08`.

A contradição é confirmada por [`sprint-status.yaml`](../../_bmad-output/sprint-status.yaml), que lista `T001`–`T021` em `completed_items`, e por `_bmad-output/implementation-artifacts/verification/T009.md` a `T021.md`, que existem e descrevem execução concluída.

**Impacto**

[`definition-of-done.md`](../04-pm-stories/definition-of-done.md) exige, para uma Story: *"tasks filhas estão `done` ou canceladas com justificativa"*. Treze Stories estão `done` violando a própria DoD do projeto.

**Condição de fechamento**

Atualizar o status da Task em `S09`–`S21` para `done`, apontando a verification correspondente.

---

### QA-003

**Severidade:** Média · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

As mesmas treze Stories mantêm a seção `## Bloqueios` descrevendo conflitos já resolvidos como se estivessem abertos.

**Evidência**

```text
docs/04-pm-stories/stories/E03/S13-enrollment-integrity.md:
  "A arquitetura não define capacidade nem status ativo/inativo; a implementação de
   concorrência no localStorage ainda precisa de estratégia validada."
```

`DEC-006` define capacidade opcional, `DEC-007` define `ATIVA`/`CANCELADA` e `DEC-012` define a garantia de concorrência adotada. As três são `confirmada` em [`decisions.md`](../00-governance/decisions.md).

Em `S09`–`S21` o texto descreve o bloqueio original. Em `S01`–`S08` o texto já foi substituído por "Resolvidos por `DEC-...`", o que confirma que o padrão de atualização existe e não foi aplicado até o fim.

**Impacto**

[`evidence-protocol.md`](../00-governance/evidence-protocol.md#condições-obrigatórias-de-bloqueio) determina que um `conflict` registrado bloqueia o item. Uma leitura literal das Stories `S09`–`S21` bloqueia metade do MVP que já está implementado e testado.

**Condição de fechamento**

Substituir o texto da seção por referência às decisões que resolveram cada bloqueio, preservando o histórico.

---

### QA-004

**Severidade:** Média · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Em `decisions.md`, as decisões `DEC-003` a `DEC-012` estão escritas como linhas de tabela, mas sem cabeçalho e separador precedentes. Em Markdown elas não renderizam como tabela.

**Evidência**

```text
docs/00-governance/decisions.md:3    | ID | Data | Decisão | Impacto | Responsável | Status |
docs/00-governance/decisions.md:4    |---|---|---|---|---|---|
docs/00-governance/decisions.md:5-6  DEC-001, DEC-002          <- dentro da tabela
docs/00-governance/decisions.md:8    ## Regras                 <- encerra a tabela
docs/00-governance/decisions.md:14-20 DEC-003 .. DEC-009       <- linhas órfãs
docs/00-governance/decisions.md:22   ## Regras adicionais do MVP
docs/00-governance/decisions.md:27-29 DEC-010 .. DEC-012       <- linhas órfãs
```

Dez das doze decisões do projeto ficam fora da tabela, exibidas como texto corrido com barras verticais.

**Impacto**

`decisions.md` é a fonte canônica que resolve todos os `CONFLICT-*` e `ARCH-OQ-*`. É o documento mais citado pelas Stories e pela matriz de rastreabilidade, e é o menos legível do repositório.

**Condição de fechamento**

Mover `DEC-003`–`DEC-012` para a tabela principal ou abrir uma nova tabela com cabeçalho próprio para cada bloco.

---

### QA-005

**Severidade:** Média · **Responsável:** Integrante 2 — UX / Product Experience · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

`docs/01-inputs/ux.md` declara dois status incompatíveis para o próprio conteúdo.

**Evidência**

```text
docs/01-inputs/ux.md:3   status: draft                  <- front-matter do arquivo
docs/01-inputs/ux.md:54  **Status:** `confirmed`.       <- seção "UX-002 — Contratos específicos"
```

O arquivo também afirma, em `UX-004`, que "empty states, loading, erros, navegação, fluxos de autenticação ou telas específicas" permanecem `unknown`, enquanto a seção `UX-002` especifica exatamente esses itens.

A matriz de rastreabilidade consome a fonte como confirmada:

```text
docs/04-pm-stories/traceability-matrix.md (última linha)
| UX-001/UX-002 | [UX](../../docs/01-inputs/ux.md) | confirmed | ... | done | DEC-008 |
```

**Impacto**

[`evidence-protocol.md`](../00-governance/evidence-protocol.md#classificação-da-informação) classifica como `conflict` duas fontes incompatíveis — aqui o conflito está dentro do mesmo arquivo. Vinte e uma Stories citam `UX-002` como fonte; todas herdam a ambiguidade.

**Condição de fechamento**

Promover o front-matter para `confirmed` e reconciliar o texto de `UX-004`, ou registrar explicitamente qual parte do documento continua `draft`.

---

### QA-006

**Severidade:** Baixa · **Responsável:** Integrante 3 — Architect · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

A fonte arquitetural canônica não tem responsável confirmado e mantém a maioria dos critérios de promoção desmarcados.

**Evidência**

```text
docs/01-inputs/architecture.md:6    owner: "Integrante 3 — Architect (a confirmar)"
docs/01-inputs/architecture.md:289  - [ ] responsável e versão forem confirmados;
docs/01-inputs/architecture.md:297  - [ ] o Integrante 3 e o Integrante 5 validarem o handoff.
```

Dos nove critérios da seção "Critérios para promoção a `approved`", apenas um está marcado.

**Impacto**

A arquitetura permanece `proposed`. Como `AGENTS.md` a define como "a única referência arquitetural", o projeto opera sobre uma fonte formalmente não aprovada.

**Condição de fechamento**

Confirmar responsável e versão, e reavaliar os critérios à luz de `DEC-003`–`DEC-012`. O critério de validação do handoff por esta camada é atendido por [`implementation-readiness.md`](implementation-readiness.md).

---

### QA-018

**Severidade:** Alta · **Responsável:** Integrante 3 — Architect · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

A arquitetura canônica não foi atualizada para refletir `DEC-006` e `DEC-007`. Três estruturas de dados centrais do MVP implementado não existem na fonte arquitetural.

**Evidência**

As palavras `capacidade`, `sugestão` e `ATIVA` não aparecem uma única vez em `docs/01-inputs/architecture.md`.

```text
grep -niE "capacidade|sugest|ATIVA|CANCELADA|criadoPor|autor" docs/01-inputs/architecture.md
→ nenhuma ocorrência relacionada a modelo de dados
```

Divergências concretas:

| Elemento | `DEC-006`/`DEC-007` | `architecture.md` | Implementação |
|---|---|---|---|
| `EVENTO.capacidade` | capacidade opcional no Evento | ausente em `ARCH-DATA-005` | implementado |
| `EVENTO.criadoPor` | autor da criação | ausente em `ARCH-DATA-005` | implementado |
| Entidade `SUGESTAO` | autor, status e vínculo opcional com Evento | **não existe** — o modelo vai de `ARCH-DATA-000` a `ARCH-DATA-006` | implementado |
| `INSCRICAO.status` | `ATIVA` / `CANCELADA` | ausente em `ARCH-DATA-006` | implementado |

O texto de `ARCH-DATA-006` ainda declara o conflito como aberto:

```text
docs/01-inputs/architecture.md:131
"A forma de suportar cancelamento, histórico e re-inscrição permanece aberta
 em CONFLICT-002/Q-ARCH-005."
```

`CONFLICT-002` foi resolvido por `DEC-007`, registrado como `confirmada` em [`decisions.md`](../00-governance/decisions.md).

**Impacto**

[`decisions.md`](../00-governance/decisions.md) estabelece como regra que *"uma decisão confirmada deve ser refletida na fonte canônica afetada e nos artefatos dependentes"* — e exemplifica com `DEC-001`, corretamente refletida como `ARCH-DEC-017`. `DEC-006` e `DEC-007` não receberam o mesmo tratamento.

`AGENTS.md` instrui a respeitar "as entidades e relacionamentos definidos em `ARCH-DATA-*`". Um agente ou pessoa que siga essa instrução literalmente não encontra a entidade Sugestão, não encontra capacidade de evento e não encontra o ciclo de vida da inscrição — um terço do MVP entregue.

É o achado que mais ameaça a utilidade futura do repositório: a implementação está correta, a decisão está correta, e a fonte que `AGENTS.md` declara canônica está desatualizada.

**Condição de fechamento**

Atualizar `ARCH-DATA-005` com `capacidade` e `criadoPor`, `ARCH-DATA-006` com `status`/`canceladoEm`/`canceladoPor`, criar `ARCH-DATA-007 — SUGESTAO`, e substituir a referência a `CONFLICT-002` pela decisão que o resolveu. Adicionar as relações correspondentes em `ARCH-SEC-005`.

---

## Comportamento do produto

### QA-007

**Severidade:** Alta · **Responsável:** Integrantes 2 e 3 · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

A tela de gestão oferece "Cancelar evento" para eventos `PENDENTE` e `NEGADO`. O domínio recusa a operação nos dois casos.

**Evidência**

A interface condiciona o botão apenas a não estar cancelado:

```js
// src/controllers/app-controller.js — eventCard()
if (options.manage && can(Domain.PERMISSIONS.CANCEL_EVENT, user)
    && event.status !== Domain.EVENT_STATUS.CANCELLED)
  actions.push('<button ... data-action="cancel-event" ...>Cancelar evento</button>');
```

O domínio aplica a regra de `DEC-011`:

```js
// src/models/domain.js — cancelEvent()
if (event.status !== EVENT_STATUS.APPROVED)
  throw new DomainError('INVALID_TRANSITION', 'Somente eventos aprovados podem ser cancelados.');
```

Comportamento observado em execução direta do domínio:

```text
cancelEvent(PENDENTE) -> INVALID_TRANSITION — Somente eventos aprovados podem ser cancelados.
cancelEvent(NEGADO)   -> INVALID_TRANSITION — Somente eventos aprovados podem ser cancelados.
```

Coberto por `TEST-S07-02`.

**Impacto**

`UX-002` → Estados comportamentais → Permissão determina: *"ocultar ações não permitidas e negar também a operação de domínio"*. A segunda metade está implementada; a primeira não. O usuário recebe uma mensagem de erro por uma ação que a própria interface ofereceu.

A tela de gestão lista todos os eventos sem filtro de status, então `PENDENTE` e `NEGADO` aparecem ali com o botão habilitado.

**Condição de fechamento**

Condicionar o botão a `event.status === APROVADO`, alinhando a interface a `DEC-011`.

---

### QA-008

**Severidade:** Alta · **Responsável:** Integrantes 2 e 3 · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Mesma classe de problema de `QA-007`: a ação "Editar" é oferecida sem nenhuma verificação de status, inclusive para eventos cancelados.

**Evidência**

```js
// src/controllers/app-controller.js — eventCard()
if (options.manage && can(Domain.PERMISSIONS.EDIT_EVENT, user))
  actions.push('<button ... data-action="edit-event" ...>Editar</button>');
```

Não há cláusula de status, ao contrário do botão de cancelamento, que ao menos exclui `CANCELADO`. O domínio recusa:

```js
// src/models/domain.js — updateEvent()
if (event.status === EVENT_STATUS.CANCELLED)
  throw new DomainError('TERMINAL_EVENT', 'Eventos cancelados não podem ser alterados.');
```

Coberto por `TEST-S06-03`.

**Impacto**

Mesmo de `QA-007`. Agravante: ao clicar em "Editar" o usuário é levado ao formulário preenchido e só descobre o bloqueio ao tentar salvar, depois de digitar.

**Condição de fechamento**

Condicionar o botão aos estados que `updateEvent` aceita, considerando a decisão que resultar de `QA-010`.

---

### QA-009

**Severidade:** Alta · **Responsável:** Integrante 1 — Product / Requirements · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Um Aluno pode criar um evento, que nasce `PENDENTE`, mas não existe nenhuma tela em que ele consiga vê-lo depois. A proposta desaparece da perspectiva do autor.

**Evidência**

O Aluno tem a permissão de criação:

```js
// src/models/domain.js — ROLE_PERMISSIONS
[ROLES.STUDENT]: [ ..., PERMISSIONS.CREATE_EVENT, ... ]
```

A lista de eventos filtra os estados visíveis:

```js
// src/controllers/app-controller.js — renderEvents()
.filter((event) => [Domain.EVENT_STATUS.APPROVED, Domain.EVENT_STATUS.CANCELLED].includes(event.status))
```

As demais telas que exibem `PENDENTE` exigem permissões que o Aluno não possui — `validation` requer `VALIDAR_EVENTO` e `management` requer `EDITAR_EVENTO`. Não há equivalente de "Minhas propostas" para eventos, embora exista "Minhas sugestões" e "Minhas inscrições".

Comportamento observado:

```text
Aluno cria evento -> id 4, status PENDENTE
Eventos visíveis na lista -> [1, 2]
Evento do autor aparece? false
```

Coberto por `TEST-S09-01` (caracterização).

**Impacto**

`AGENTS.md` estabelece que "alunos podem criar eventos" e que esses eventos "devem passar pelo fluxo de validação". O fluxo existe do lado do revisor e não existe do lado do autor: ele não sabe se foi aprovado, negado, nem que a proposta ainda existe.

É um requisito faltante, não um defeito de implementação — nenhuma fonte descreve a superfície de acompanhamento do autor. O PRD não previa criação de evento por Aluno; esse comportamento entrou pela arquitetura e foi confirmado por `DEC-005`, sem o requisito de produto correspondente.

**Condição de fechamento**

Decidir e registrar: ou o Aluno ganha uma superfície de acompanhamento da própria proposta, ou fica documentado que ele não acompanha o desfecho — simétrico à decisão já tomada para sugestões rejeitadas em `FR-21`.

---

### QA-010

**Severidade:** Média · **Responsável:** Integrantes 1 e 3 · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

`updateEvent` bloqueia apenas eventos `CANCELADO`. Um evento `NEGADO` pode ser editado livremente, e nenhuma fonte define esse comportamento.

**Evidência**

```js
// src/models/domain.js — updateEvent()
if (event.status === EVENT_STATUS.CANCELLED)
  throw new DomainError('TERMINAL_EVENT', 'Eventos cancelados não podem ser alterados.');
```

Comportamento observado:

```text
validateEvent(ev3, NEGADO) -> status NEGADO
updateEvent(ev3, { titulo: 'HACK' }) -> permitido; titulo = HACK, status = NEGADO
```

`DEC-005` descreve `NEGADO` como resultado da validação, mas não diz se é terminal. `DEC-011` declara terminalidade apenas para a transição de cancelamento. O PRD trata de `Cancelado`/`Encerrado` como terminais e não possui o estado `NEGADO`, que nasceu na arquitetura.

Coberto por `TEST-S06-04` (caracterização).

**Impacto**

Um evento negado pode ser alterado e permanece negado, então não há escalada de privilégio. Mas o estado é um vazio normativo: nada impede edições em um registro que o fluxo de validação já recusou, e nenhuma fonte autoriza ou proíbe.

**Condição de fechamento**

Registrar uma decisão declarando `NEGADO` terminal para edição ou explicitamente editável — e, no segundo caso, definir se a edição devolve o evento para `PENDENTE`.

---

### QA-011

**Severidade:** Média · **Responsável:** Integrante 1 — Product / Requirements · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

O Aluno tem `CRIAR_EVENTO`, mas não tem `EDITAR_EVENTO` nem `CANCELAR_EVENTO`. Ele não consegue corrigir um erro de digitação na própria proposta nem retirá-la.

**Evidência**

```text
ROLE_PERMISSIONS[ALUNO] contém CRIAR_EVENTO
ROLE_PERMISSIONS[ALUNO] não contém EDITAR_EVENTO nem CANCELAR_EVENTO

updateEvent(aluno, evento_do_proprio_aluno) -> FORBIDDEN
cancelEvent(aluno, evento_do_proprio_aluno) -> FORBIDDEN
```

Coberto por `TEST-S03-01`.

**Impacto**

Combinado com `QA-009`, o Aluno cria uma proposta que não vê, não corrige e não retira. A matriz RBAC de `DEC-004`/`DEC-010` foi definida para o perfil administrativo e não tratou do Aluno como autor de evento.

**Condição de fechamento**

Decidir se o autor pode editar ou retirar a própria proposta enquanto ela estiver `PENDENTE`, e registrar na matriz RBAC.

---

### QA-012

**Severidade:** Média · **Responsável:** Integrante 1 — Product / Requirements · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Um evento cuja data já passou permanece `APROVADO` e continua aceitando inscrições.

**Evidência**

```text
createEvent(professor, { dataInicio: '2020-01-01' }) -> status APROVADO
enroll(aluno, evento_passado) -> inscrição ATIVA
```

Coberto por `TEST-NFR-04` (caracterização).

É consequência direta e conhecida de `DEC-005`, que deferiu `ENCERRADO` do MVP, e de `PRD-FR-007`, marcado como `deferred` na matriz de rastreabilidade. Nada no sistema recalcula status por tempo, e `createEvent` não valida data no passado.

**Impacto**

Não contradiz nenhuma decisão — o deferimento é explícito e rastreável. Mas o efeito colateral não está registrado em lugar nenhum: a lista de eventos mistura passado e futuro sem distinção, e o seed usa datas de outubro de 2026, que ficarão no passado em uma demonstração futura.

**Condição de fechamento**

Registrar o efeito colateral do deferimento de `PRD-FR-007` no escopo do MVP, e decidir se `createEvent` deve recusar datas passadas como validação de entrada — o que é independente do estado `ENCERRADO`.

---

### QA-013

**Severidade:** Média · **Responsável:** Integrante 2 — UX / Product Experience · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

O formulário de evento renderiza um container de erro dedicado que nunca recebe mensagem. Todos os erros vão para o feedback global, no topo da área de conteúdo.

**Evidência**

```js
// src/controllers/app-controller.js — renderCreateEvent()
<form class="card panel" id="event-form">
  <div id="form-feedback" class="feedback" role="alert"></div>
```

`#form-feedback` aparece uma única vez no arquivo — na criação. Nenhuma função escreve nele. O tratamento de erro usa o elemento global:

```js
// src/controllers/app-controller.js — setFeedback()
const element = $('#feedback');
```

**Impacto**

`UX-002` → Estados comportamentais → Erro determina: *"preservar dados válidos, mostrar mensagem compreensível e manter foco no contexto da ação"*. Em um formulário longo, a mensagem aparece fora do campo de visão de quem está no fim do formulário. O `role="alert"` do container vazio é código morto que sugere um comportamento inexistente.

**Condição de fechamento**

Direcionar erros de formulário para `#form-feedback`, ou remover o container não utilizado.

---

### QA-014

**Severidade:** Baixa · **Responsável:** Integrante 2 — UX / Product Experience · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

O feedback global tenta receber foco programático, mas o elemento não é focável.

**Evidência**

```js
// src/controllers/app-controller.js — setFeedback()
if (message) element.focus?.();
```

```html
<!-- src/views/index.html:38 -->
<div id="feedback" class="feedback" role="status" aria-live="polite"></div>
```

Sem `tabindex="-1"`, `HTMLElement.focus()` em uma `div` não move o foco. O encadeamento opcional `?.` mascara a ausência de efeito: o método existe e não lança erro, apenas não faz nada.

**Impacto**

Baixo. O `aria-live="polite"` já garante o anúncio por leitor de tela, que é o requisito de `UX-002`. O problema é a instrução que não produz efeito e sugere um comportamento de gestão de foco que não existe.

**Condição de fechamento**

Adicionar `tabindex="-1"` ao elemento se a movimentação de foco for desejada, ou remover a chamada.

---

## Infraestrutura de validação

### QA-015

**Severidade:** Alta · **Responsável:** QA / Validation · **Status:** revalidado

O comando oficial de teste de `DEC-009` referenciava um arquivo específico em vez da pasta de testes.

**Evidência — antes**

```json
"test": "node --test tests/domain.test.js"
```

Qualquer arquivo de teste adicionado a `tests/` não seria executado por `npm test`, nem por qualquer verificação que dependa dele. Como `DEC-009` define `npm test` como o comando que valida a entrega, um teste fora dele não é evidência verificável.

**Impacto**

Bloqueava a própria entrega de QA: os 53 cenários desta revisão nasceriam sem execução pelo comando oficial.

**Correção aplicada**

```json
"test": "node --test tests/domain.test.js tests/qa-scenarios.test.js"
```

A forma `node --test tests/` foi testada e recusada: nesta versão do Node (v22.23.2) o runner tenta resolver o diretório como módulo e falha com `MODULE_NOT_FOUND`. A listagem explícita é determinística.

**Evidência de reteste**

```text
npm test -> 68 tests, 68 pass, 0 fail
            (15 cenários de tests/domain.test.js + 53 de tests/qa-scenarios.test.js)
```

Alteração de infraestrutura de validação, sem efeito sobre o comportamento do produto. Registrada como exceção em [`README.md`](README.md#exceção-registrada-nesta-entrega).

---

### QA-016

**Severidade:** Média · **Responsável:** QA / Validation · **Status:** revalidado

Regras já exigidas pelas fontes normativas não possuíam cobertura automatizada.

**Lacunas identificadas**

| Regra | Fonte | Situação anterior |
|---|---|---|
| Isolamento de sugestões entre alunos distintos | `PRD-FR-024`, NFR de `FR-18` | Testes usavam um único aluno; vazamento entre autores nunca exercitado |
| Isolamento de inscrições entre alunos distintos | `PRD-FR-017` | Mesma limitação |
| Volume de referência sem capacidade (1000 inscrições) | `PRD-FR-004` | Convenção de teste explícita no PRD, sem teste |
| Senha nunca exposta em superfície de leitura | `PRD-FR-23`, `DEC-003` | `sanitizeUser` não verificado nas listas derivadas |
| `cancelEvent` em evento `NEGADO` | `DEC-011` | Apenas `PENDENTE` era exercitado |
| Recusa não produz efeito colateral no estado | `PRD-NFR-004` | Sem verificação de integridade pós-erro |
| Seed restaurado para dados inválidos além de corrompidos | `DEC-001` | Apenas JSON malformado era testado |

**Correção aplicada**

Criado `tests/qa-scenarios.test.js` com 53 cenários. Ver [`test-scenarios.md`](test-scenarios.md) para o mapeamento completo.

**Evidência de reteste**

```text
node --test tests/qa-scenarios.test.js -> 53 tests, 53 pass, 0 fail
```

Nenhuma lacuna fechada revelou defeito: todos os comportamentos verificados estavam corretos. A cobertura que faltava era de verificação, não de implementação.

---

### QA-017

**Severidade:** Baixa · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

A matriz de rastreabilidade declara uma contagem de evidência que não corresponde à suíte.

**Evidência**

```text
docs/04-pm-stories/traceability-matrix.md — seção Auditoria
"Critérios de aceitação possuem evidência executada: 14 testes de domínio, lint,
 build e smoke HTTP"
```

A suíte original continha quinze cenários:

```text
node --test tests/domain.test.js -> 1..15, # tests 15, # pass 15
```

**Impacto**

Baixo em consequência, relevante em natureza: é uma imprecisão numérica em um documento cuja função é ser a fonte confiável de evidência. Com a adição de `tests/qa-scenarios.test.js`, a contagem correta passa a ser 68.

**Condição de fechamento**

Atualizar a seção de auditoria para refletir a contagem real e incluir a suíte de cenários de QA entre as evidências.

---

### QA-019

**Severidade:** Média · **Responsável:** Integrante 4 — PM / Stories · **Status:** revalidado

**Correção:** reteste registrado em [`correction-validation.md`](correction-validation.md#registro-de-revalidações).

Dois links de evidência apontam para âncoras que não existem no arquivo de destino. O arquivo resolve, mas o leitor cai no topo do documento, sem chegar à afirmação citada.

**Evidência**

Detectado por varredura das 105 âncoras relativas de `docs/`, ignorando blocos e trechos de código:

```text
docs/04-pm-stories/epics/E01-access-and-accounts.md
  -> ../../../docs/01-inputs/prd.md#prd-user-001

docs/04-pm-stories/epics/E04-suggestions-and-review.md
  -> .../prd-bmad-method-AiDD-2026-09-14/prd.md#pr-d-sm-c1
```

`PRD-USER-001` existe apenas como célula da tabela em `docs/01-inputs/prd.md:35`, e `SM-C1` apenas como item de lista em `§7` do PRD de origem. Markdown não gera âncora para linha de tabela nem para item de lista, então nenhum dos dois identificadores é endereçável.

**Impacto**

[`evidence-protocol.md`](../00-governance/evidence-protocol.md) exige que toda fonte aponte para `caminho-relativo#seção-ou-âncora` e que a localização seja reproduzível. Uma âncora inexistente falha silenciosamente: o link funciona, a navegação não leva à evidência, e quem revisa precisa procurar manualmente.

Não foi detectado na primeira revisão porque a verificação de links checava existência de arquivo, não resolução de âncora.

**Condição de fechamento**

Apontar para o cabeçalho que contém a afirmação citada, preservando o ID no texto do link.

---

### QA-020

| Campo | Valor |
|---|---|
| Severidade | Média |
| Responsável | Integrante 2 — UX |
| Estado | `revalidado` — ver [`correction-validation.md`](correction-validation.md) |
| Decisão que fecha | `DEC-017` |

**Problema**

A mensagem de feedback no topo da tela não tinha tempo de vida. Uma vez exibida, permanecia visível até que outra ação a sobrescrevesse ou a página fosse recarregada.

**Evidência**

Em `src/controllers/app-controller.js`, `setFeedback` escrevia o texto e a classe no elemento e encerrava. Não havia `setTimeout`, nem limpeza em troca de tela:

```js
const setFeedback = (message, type = 'success') => {
  const element = $('#feedback');
  element.textContent = message || '';
  element.className = message ? `feedback ${type}` : 'feedback';
};
```

O erro de autenticação era pior: escrevia direto em `#auth-feedback` sem passar por `setFeedback`, logo não seria coberto nem se o temporizador existisse.

**Impacto**

[`UX-002`](../01-inputs/ux.md#ux-002--contratos-específicos-do-produto) exige mensagem compreensível no ponto da ação, mas não definia duração. Sem expiração, uma mensagem de sucesso de uma ação já concluída continua afirmando algo sobre o estado atual da tela. Em `role="status"` com `aria-live="polite"`, isso também deixa o leitor de tela com um anúncio que não corresponde mais ao contexto.

**Condição de fechamento**

Definir duração por tipo de mensagem, cancelar o temporizador anterior ao exibir uma nova, e aplicar a mesma regra ao feedback de formulário e ao de autenticação.

---

### QA-021

| Campo | Valor |
|---|---|
| Severidade | Média |
| Responsável | Integrante 2 — UX |
| Estado | `revalidado` — ver [`correction-validation.md`](correction-validation.md) |
| Decisão que fecha | `DEC-018` |

**Problema**

Os botões de retorno não voltavam para a tela anterior. Cada um apontava para um destino fixo, então entrar em um fluxo a partir de qualquer tela que não fosse a lista de eventos e clicar em voltar levava o usuário para a lista de eventos.

**Evidência**

Em `src/controllers/app-controller.js`, os botões de retorno eram `data-view="events"`, tratados pelo mesmo ramo que a navegação lateral:

```js
if (target.dataset.view) { state.view = target.dataset.view; render(); return; }
```

`state` não guardava histórico. Reprodução: Calendário → clicar em um evento → "← Voltar" caía em Eventos, não em Calendário.

**Impacto**

[`UX-002`](../01-inputs/ux.md#ux-002--contratos-específicos-do-produto) define a navegação por permissão, mas não o comportamento de retorno. O usuário que abre um detalhe a partir do calendário perde o contexto do mês que estava consultando e precisa refazer a navegação.

**Condição de fechamento**

Manter pilha de histórico de telas e fazer o botão de retorno consumir a entrada anterior, com destino fixo apenas como fallback de pilha vazia.

---

### QA-022

| Campo | Valor |
|---|---|
| Severidade | Baixa |
| Responsável | Integrante 2 — UX |
| Estado | `revalidado` — ver [`correction-validation.md`](correction-validation.md) |
| Decisão que fecha | `DEC-019` |

**Problema**

Após o logout, os campos de e-mail e senha do formulário de login continuavam preenchidos com as credenciais do usuário que saiu.

**Evidência**

Em `src/controllers/app-controller.js`, o logout limpava a sessão e o estado de view, mas não tocava no formulário:

```js
if (target.id === 'logout-button') { Store.setSession(storage, null); state.view = 'events'; render(); return; }
```

O formulário em `src/views/index.html` não declarava `autocomplete`, então o navegador também era livre para repreencher os campos.

**Impacto**

O formulário de autenticação nunca é removido do DOM — `render` apenas alterna `hidden` entre `#auth-view` e `#app-view`. Em máquina compartilhada, o próximo usuário vê o e-mail do anterior e um campo de senha preenchido, bastando um clique em Entrar. Contraria a intenção de `PRD-NFR-001` e o modelo de sessão de `DEC-003`.

**Condição de fechamento**

Limpar programaticamente os campos e o feedback de credencial no logout, e declarar `autocomplete` restritivo no formulário e nos campos.
