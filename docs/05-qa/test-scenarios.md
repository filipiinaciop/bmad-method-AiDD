---
id: QA-TEST-SCENARIOS
type: qa-test-scenarios
status: done
owner: "Integrante 5 — QA / Validation"
sources: [S01, S21, AC-S01-01, AC-S21-02, DEC-009]
depends_on: [QA-REVIEW-STORIES]
---

# Cenários de teste

Catálogo dos cenários criados por esta camada, com o mapeamento para critérios de aceitação, decisões e achados. Todos são automatizados em [`tests/qa-scenarios.test.js`](../../tests/qa-scenarios.test.js) e executados pelo comando oficial de `DEC-009`.

## Execução

```text
$ npm test

1..68
# tests 68
# suites 0
# pass 68
# fail 0
# cancelled 0
# skipped 0
# todo 0
# duration_ms 148.02625
```

68 casos no total: 15 da suíte original `tests/domain.test.js` e 53 desta camada.

O comando passou a cobrir os dois arquivos como parte desta entrega — ver [`QA-015`](findings.md#qa-015).

## Convenções

- `TEST-S##-##` — cenário vinculado a uma Story.
- `TEST-NFR-##` — cenário transversal, vinculado a um requisito não funcional ou a uma decisão.
- `[caracterização QA-###]` no nome do teste indica que o cenário **documenta o comportamento atual**, não o comportamento desejado. Ver a seção própria abaixo.

Cada cenário exercita o domínio diretamente, sem mocks de regra de negócio. O estado é reconstruído a partir do seed em cada caso, via `fresh()`.

## Cenários por Story

### E01 — Acesso e contas

| ID | Cenário | Verifica | Linha |
|---|---|---|---|
| `TEST-S01-01` | Cada papel do seed autentica e recebe a identidade correspondente | `AC-S01-01` | 46 |
| `TEST-S01-02` | E-mail inexistente e senha incorreta são indistinguíveis | `AC-S01-02` | 60 |
| `TEST-S01-03` | E-mail é normalizado por caixa e espaços no login | `AC-S01-01` | 69 |
| `TEST-S02-01` | Conta criada autentica imediatamente com a senha inicial | `AC-S02-01` | 74 |
| `TEST-S02-02` | E-mail duplicado é rejeitado mesmo com caixa diferente | `AC-S02-02` | 86 |
| `TEST-S02-03` | Dados inválidos de conta são rejeitados sem persistir | `AC-S02-01` | 98 |
| `TEST-S02-04` | Senha do seed respeita o mínimo de 8 caracteres | `DEC-003` | 109 |
| `TEST-S03-01` | Aluno é negado em toda capacidade administrativa, inclusive por chamada direta | `AC-S03-01` | 115 |
| `TEST-S03-02` | `ADMIN` tem paridade de capacidades com `PROFESSOR` | `AC-S03-02`, `DEC-004` | 126 |
| `TEST-S03-03` | `VALIDAR_EVENTO` é a permissão única para aprovar e para negar | `DEC-004` | 141 |
| `TEST-S04-01` | Senha redefinida permite login e invalida a anterior | `AC-S04-01` | 148 |
| `TEST-S04-02` | Nenhuma superfície de leitura expõe a senha persistida | `AC-S04-02`, `PRD-NFR-001` | 155 |

`TEST-S03-01` é o cenário de segurança mais relevante do bloco: não testa a ausência do botão na interface, e sim a chamada direta de cada operação administrativa com o ator Aluno. Verifica que a negação está no domínio, não apenas na renderização.

`TEST-S04-02` percorre sete superfícies de leitura — `authenticate`, `createAccount`, `resetPassword`, `listSubscribers`, `listMyEnrollments`, `listMySuggestions`, `listSuggestionQueue` — confirmando que nenhuma devolve o campo `senha`.

### E02 — Ciclo de vida do evento

| ID | Cenário | Verifica | Linha |
|---|---|---|---|
| `TEST-S05-01` | Status inicial do evento depende do papel do autor | `AC-S05-01`, `DEC-005` | 177 |
| `TEST-S05-02` | Evento inválido é recusado sem persistir registro incompleto | `AC-S05-02` | 184 |
| `TEST-S05-03` | Capacidade vazia é tratada como ilimitada | `AC-S05-01`, `DEC-006` | 198 |
| `TEST-S06-01` | Edição válida atualiza o registro persistido | `AC-S06-01` | 205 |
| `TEST-S06-02` | Capacidade abaixo das inscrições ativas é recusada, mas o limite exato é aceito | `AC-S06-02` | 213 |
| `TEST-S06-03` | Evento `CANCELADO` é terminal para edição | `AC-S06-01`, `DEC-005` | 224 |
| `TEST-S06-04` | Evento `NEGADO` permanece editável | caracterização [`QA-010`](findings.md#qa-010) | 230 |
| `TEST-S07-01` | Cancelamento de evento `APROVADO` registra autor e data | `AC-S07-01` | 238 |
| `TEST-S07-02` | Somente evento `APROVADO` pode ser cancelado | `DEC-011` | 246 |
| `TEST-S07-03` | Cancelar evento preserva as inscrições e fecha novas entradas | `AC-S07-02` | 259 |
| `TEST-S07-04` | Validação só aceita decisões previstas e só a partir de `PENDENTE` | `DEC-005` | 268 |
| `TEST-S08-01` | Lista de inscritos exige permissão e preserva registros cancelados | `AC-S08-01` | 276 |

`TEST-S06-02` cobre os dois lados da fronteira: capacidade abaixo das inscrições ativas é recusada com `CAPACITY_TOO_LOW`, e capacidade exatamente igual ao número de ativas é aceita. O limite exato é o caso que costuma quebrar em refatoração.

`TEST-S07-02` varre `PENDENTE`, `NEGADO` e `CANCELADO` confirmando `INVALID_TRANSITION` em todos, que é a regra de `DEC-011`.

### E03 — Descoberta e inscrições

| ID | Cenário | Verifica | Linha |
|---|---|---|---|
| `TEST-S09-01` | Evento `PENDENTE` do aluno fica fora do filtro da lista | caracterização [`QA-009`](findings.md#qa-009) | 289 |
| `TEST-S09-02` | Busca filtra por título, descrição e local sem diferenciar caixa | `AC-S09-01` | 298 |
| `TEST-S10-01` | Evento permanece íntegro entre lista e detalhe | `AC-S10-02` | 306 |
| `TEST-S11-01` | Vagas restantes refletem apenas inscrições ativas | `AC-S11-01` | 314 |
| `TEST-S11-02` | Evento inexistente retorna ausência sem alterar dados | `AC-S11-02` | 322 |
| `TEST-S12-01` | Inscrição em evento `APROVADO` é persistida e reduz a disponibilidade | `AC-S12-01` | 329 |
| `TEST-S12-02` | Inscrição é recusada em qualquer status fora de `APROVADO` | `AC-S12-02`, `PRD-FR-014` | 339 |
| `TEST-S12-03` | Somente quem tem `INSCREVER_EVENTO` consegue se inscrever | `AC-S03-01` | 353 |
| `TEST-S13-01` | Segunda inscrição ativa do mesmo aluno é rejeitada sem duplicar registro | `AC-S13-01` | 359 |
| `TEST-S13-02` | Evento sem capacidade aceita 1000 inscrições | `PRD-FR-004` (convenção de teste) | 366 |
| `TEST-S13-03` | Disputa pela última vaga aceita exatamente a capacidade restante | `AC-S13-02`, `DEC-012` | 377 |
| `TEST-S14-01` | Aluno cancela a própria inscrição, libera vaga e pode se reinscrever | `AC-S14-01`, `DEC-007` | 388 |
| `TEST-S14-02` | Aluno não cancela inscrição de outro aluno nem repete cancelamento | `AC-S14-02` | 401 |
| `TEST-S15-01` | Lista de inscrições isola alunos distintos | `AC-S15-01` | 410 |
| `TEST-S15-02` | Inscrições canceladas permanecem visíveis com o estado atual | `AC-S15-02`, `PRD-NFR-005` | 420 |
| `TEST-S16-01` | Cancelamento administrativo libera vaga e exige permissão própria | `AC-S16-01` | 429 |

`TEST-S13-02` existe porque o `FR-4` do PRD declara uma convenção explícita — *"na ausência de limite, o número de inscritos é ilimitado para efeito de teste, ao menos 1000"* — que nenhuma Story transformou em critério. É um requisito escrito na fonte e não decomposto.

`TEST-S14-01` encadeia o ciclo completo de `DEC-007`: inscrever, cancelar, verificar que a vaga voltou, reinscrever e confirmar que o registro cancelado permanece como histórico.

### E04 — Sugestões e análise

| ID | Cenário | Verifica | Linha |
|---|---|---|---|
| `TEST-S17-01` | Sugestão nasce `PENDENTE`, com autor e sem vínculo de evento | `AC-S17-01`, `DEC-006` | 443 |
| `TEST-S17-02` | Sugestão inválida é recusada sem persistir | `AC-S17-02` | 452 |
| `TEST-S18-01` | Lista de sugestões isola alunos distintos | `AC-S18-01`, `PRD-FR-018` | 460 |
| `TEST-S19-01` | Fila mostra somente pendentes, com autor, e é negada ao aluno | `AC-S19-01`, `AC-S19-02` | 470 |
| `TEST-S20-01` | Aprovar sugestão não publica evento automaticamente | `AC-S20-01`, `PRD-FR-020` | 478 |
| `TEST-S20-02` | Evento criado a partir de sugestão aprovada guarda vínculo bidirecional | `AC-S20-02` | 488 |
| `TEST-S21-01` | Rejeição dispensa motivo, sai da fila e não é reaberta | `AC-S21-01` | 496 |
| `TEST-S21-02` | Revisão é decisão explícita de quem tem permissão | `AC-S21-02`, `PRD-SM-C1` | 505 |

`TEST-S20-01` protege a regra mais fácil de violar por conveniência: o PRD é explícito em `FR-20` que aprovar **não** publica evento. Um refactor que "automatize" esse passo quebra o requisito, e o teste falha.

### Transversais

| ID | Cenário | Verifica | Linha |
|---|---|---|---|
| `TEST-NFR-01` | Dados ausentes, inválidos ou corrompidos restauram o seed | `DEC-001`, `UX-002` | 517 |
| `TEST-NFR-02` | Estado persistido sobrevive à releitura e a sessão é limpa no logout | `UX-002` | 527 |
| `TEST-NFR-03` | Operação recusada não deixa efeito colateral no estado | `PRD-NFR-004` | 540 |
| `TEST-NFR-04` | Evento com data passada continua `APROVADO` e aberto a inscrição | caracterização [`QA-012`](findings.md#qa-012) | 549 |
| `TEST-NFR-05` | Leitura do domínio não expõe referência mutável do estado | `PRD-NFR-004` | 558 |

`TEST-NFR-01` cobre três formas de corrupção: chave ausente, JSON sintaticamente inválido e JSON válido com estrutura incompatível. A terceira é a que normalmente escapa — restaurar o seed quando o `JSON.parse` falha é intuitivo; fazê-lo quando o parse funciona mas o conteúdo não serve, não é.

`TEST-NFR-05` verifica que mutar o retorno de `getEvent` ou `listEvents` não altera o estado interno. Protege a disciplina de `clone()` aplicada em todo o domínio.

## Testes de caracterização

Três cenários registram o comportamento atual sem afirmar que ele é correto:

| ID | Achado | O que o teste fixa |
|---|---|---|
| `TEST-S06-04` | [`QA-010`](findings.md#qa-010) | Evento `NEGADO` pode ser editado |
| `TEST-S09-01` | [`QA-009`](findings.md#qa-009) | Evento `PENDENTE` do aluno não aparece na lista |
| `TEST-NFR-04` | [`QA-012`](findings.md#qa-012) | Evento com data passada aceita inscrição |

A distinção importa. Um teste normal falha quando o código quebra. Estes falham quando o comportamento **muda** — inclusive quando muda para melhor. São marcadores de decisão pendente, não validação de requisito.

Quando os achados correspondentes forem decididos, cada um desses cenários deve ser reescrito para afirmar a regra nova, ou removido se a decisão for manter o comportamento e registrá-lo em `DEC-*`. O protocolo está em [`correction-validation.md`](correction-validation.md).

## Cobertura não automatizada

Os cenários acima exercitam o domínio. Três áreas permanecem fora do alcance da suíte e dependem de walkthrough manual:

| Área | Motivo | Critério afetado |
|---|---|---|
| Renderização do calendário mensal | depende de DOM; sem ambiente de navegador na suíte | `AC-S10-01` |
| Estados visuais de vazio, erro e foco | depende de DOM e de avaliação visual | `UX-002` — estados comportamentais |
| Responsividade em 850px e 560px | depende de viewport real | `UX-002` — acessibilidade e responsividade |

A implicação está registrada em [`implementation-readiness.md`](implementation-readiness.md): o gate não pode ser fechado apenas com a suíte automatizada.

## Fontes lidas

- [`stories/`](../04-pm-stories/stories/) — 38 critérios `AC-*`
- [`decisions.md`](../00-governance/decisions.md) — `DEC-001` a `DEC-012`
- [`definition-of-done.md`](../04-pm-stories/definition-of-done.md) — evidências mínimas
- `src/models/domain.js`, `src/models/store.js` — comportamento exercitado
