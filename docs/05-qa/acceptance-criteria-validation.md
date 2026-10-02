---
id: QA-AC-VALIDATION
type: qa-validation
status: done
owner: "Integrante 5 — QA / Validation"
sources: [S01, S21, AC-S01-01, AC-S21-02, DEC-009]
depends_on: [QA-TEST-SCENARIOS]
---

# Validação dos critérios de aceitação

Confronto dos 38 critérios `AC-*` das 21 Stories contra evidência executada. Nenhum critério foi dado como atendido por inspeção visual de código isolada: cada linha aponta teste automatizado, saída de comando ou — quando a verificação depende de DOM — a superfície exata que precisa de walkthrough manual.

## Resultado

| Classificação | Quantidade |
|---|---:|
| Atendido com evidência automatizada | 31 |
| Atendido com evidência parcial (domínio automatizado, superfície visual pendente) | 6 |
| Atendido com desvio registrado | 1 |
| Não atendido | 0 |
| **Total** | **38** |

Nenhum critério de aceitação foi reprovado. O único desvio (`AC-S05-02`) é de apresentação, não de regra: a persistência é corretamente impedida, mas a mensagem aparece fora do contexto da ação.

## Convenção

- `automatizado` — verificado por caso da suíte, com ID citado.
- `parcial` — a regra de domínio está automatizada; a parte do critério que descreve renderização exige walkthrough.
- `desvio` — atendido no essencial, com comportamento divergente registrado como achado.

## E01 — Acesso e contas

| AC | Critério | Situação | Evidência |
|---|---|---|---|
| `AC-S01-01` | Credencial válida reconhece o usuário e exibe a área do perfil | parcial | `TEST-S01-01`, `TEST-S01-03` — identidade e papel conferidos; a troca de tela é DOM |
| `AC-S01-02` | Credencial inválida rejeita sem revelar se o e-mail existe | automatizado | `TEST-S01-02` |
| `AC-S02-01` | Conta criada é persistida e pode ser usada no login | automatizado | `TEST-S02-01`, `TEST-S02-03` |
| `AC-S02-02` | E-mail duplicado é rejeitado sem duplicar registro | automatizado | `TEST-S02-02` |
| `AC-S03-01` | Aluno é negado inclusive em acesso direto | automatizado | `TEST-S03-01`, `TEST-S12-03` |
| `AC-S03-02` | Usuário autorizado só executa o previsto na matriz RBAC | automatizado | `TEST-S03-02`, `TEST-S03-03` |
| `AC-S04-01` | Nova senha permite login | automatizado | `TEST-S04-01` |
| `AC-S04-02` | Senha atual nunca é exibida | automatizado | `TEST-S04-02` |

`AC-S01-02` é o critério mais forte do bloco e está atendido na origem, não na interface: `authenticate` devolve `null` para e-mail inexistente e para senha errada, sem ramo distinto. `createAccount` segue a mesma disciplina ao recusar duplicidade com mensagem genérica.

`AC-S03-01` exige negação *"inclusive quando o acesso for tentado diretamente"*. `TEST-S03-01` chama cada operação administrativa com o ator Aluno, ignorando a interface, e confirma `FORBIDDEN` em todas. É a leitura correta do critério.

## E02 — Ciclo de vida do evento

| AC | Critério | Situação | Evidência |
|---|---|---|---|
| `AC-S05-01` | Evento válido é criado no estado definido pelo ciclo de vida | automatizado | `TEST-S05-01`, `TEST-S05-03` |
| `AC-S05-02` | Campo ausente impede criação e apresenta erro sem persistir | desvio | `TEST-S05-02` — persistência corretamente impedida · [`QA-013`](findings.md#qa-013) |
| `AC-S06-01` | Edição válida atualiza o registro persistido | automatizado | `TEST-S06-01`, `TEST-S06-03` |
| `AC-S06-02` | Capacidade menor que inscrições confirmadas é recusada | automatizado | `TEST-S06-02` |
| `AC-S07-01` | Evento cancelável assume o estado e fecha novas inscrições | automatizado | `TEST-S07-01`, `TEST-S07-02` |
| `AC-S07-02` | Inscrições seguem a política de histórico, sem exclusão silenciosa | automatizado | `TEST-S07-03` |
| `AC-S08-01` | Lista exibe alunos conforme o estado persistido | automatizado | `TEST-S08-01` |

`AC-S05-02` tem duas exigências. *"A criação deve ser impedida... sem persistir registro incompleto"* está cumprida e verificada — `TEST-S05-02` confirma que nenhum registro parcial entra no store. *"O erro deve ser apresentado"* está cumprida com desvio: a mensagem vai para `#feedback`, no topo da área de conteúdo, enquanto o formulário renderiza um `#form-feedback` que nunca recebe conteúdo.

Classificação: atendido com desvio. A regra de integridade — que é o que o critério protege — funciona. O desvio é de localização da mensagem.

`AC-S06-02` foi verificado nos dois lados da fronteira: capacidade abaixo das ativas recusada, capacidade exatamente igual aceita.

## E03 — Descoberta e inscrições

| AC | Critério | Situação | Evidência |
|---|---|---|---|
| `AC-S09-01` | Eventos e status apresentados conforme o filtro aprovado | parcial | `TEST-S09-02` — filtro e busca no domínio; composição da lista é DOM |
| `AC-S10-01` | Cada evento aparece na data correspondente do mês | parcial | walkthrough manual — `renderCalendar` é DOM puro |
| `AC-S10-02` | Lista e calendário mantêm o mesmo conjunto e status | automatizado | `TEST-S10-01` |
| `AC-S11-01` | Detalhe exibe descrição, data/hora, local, status e vagas | parcial | `TEST-S11-01` — `vagasRestantes` conferido; renderização é DOM |
| `AC-S11-02` | Evento inexistente apresenta erro seguro sem alterar dados | automatizado | `TEST-S11-02` |
| `AC-S12-01` | Inscrição persistida e disponibilidade atualizada | automatizado | `TEST-S12-01` |
| `AC-S12-02` | Evento não aberto rejeita a inscrição | automatizado | `TEST-S12-02` |
| `AC-S13-01` | Segunda inscrição ativa rejeitada sem registro duplicado | automatizado | `TEST-S13-01` |
| `AC-S13-02` | Disputa pela última vaga não excede a capacidade | automatizado | `TEST-S13-03` |
| `AC-S14-01` | Cancelamento recalcula vaga sem apagar histórico | automatizado | `TEST-S14-01` |
| `AC-S14-02` | Aluno não cancela inscrição de outra pessoa | automatizado | `TEST-S14-02` |
| `AC-S15-01` | Somente as próprias inscrições são exibidas | automatizado | `TEST-S15-01` |
| `AC-S15-02` | Cancelamentos refletem o estado atual ao recarregar | automatizado | `TEST-S15-02`, `TEST-NFR-02` |
| `AC-S16-01` | Cancelamento administrativo atualiza inscrição e recalcula vaga | automatizado | `TEST-S16-01` |

`AC-S13-02` fala em *"múltiplas tentativas disputarem a última vaga"*. `DEC-012` delimita o que o MVP promete: consistência em chamadas repetidas no mesmo store, não atomicidade entre abas. `TEST-S13-03` exercita doze tentativas sequenciais contra duas vagas restantes e confirma que exatamente duas são aceitas — que é o escopo real da garantia. Verificar concorrência entre abas exigiria um mecanismo que `DEC-012` declara explicitamente fora do MVP.

`AC-S14-01` é o critério com mais partes móveis — estado aprovado, vaga recalculada, histórico preservado — e todas foram verificadas no mesmo cenário encadeado, incluindo a reinscrição posterior permitida por `DEC-007`.

## E04 — Sugestões e análise

| AC | Critério | Situação | Evidência |
|---|---|---|---|
| `AC-S17-01` | Sugestão persistida com status inicial e visível como pendente | automatizado | `TEST-S17-01`, `TEST-S19-01` |
| `AC-S17-02` | Dado obrigatório ausente bloqueia o envio sem persistir | automatizado | `TEST-S17-02` |
| `AC-S18-01` | Somente as próprias sugestões e seus status são exibidos | automatizado | `TEST-S18-01` |
| `AC-S19-01` | Fila exibe título, descrição e autor | automatizado | `TEST-S19-01` |
| `AC-S19-02` | Aluno tem o acesso à fila negado | automatizado | `TEST-S19-01` |
| `AC-S20-01` | Aprovação muda o estado e abre criação pré-preenchida, sem publicação automática | automatizado | `TEST-S20-01` + `app-controller.js:92` |
| `AC-S20-02` | Vínculo entre sugestão e evento é preservado | automatizado | `TEST-S20-02` |
| `AC-S21-01` | Rejeição sem motivo sai da fila e mantém histórico | automatizado | `TEST-S21-01` |
| `AC-S21-02` | A ação é decisão explícita do revisor, não aprovação automática | automatizado | `TEST-S21-02` |

`AC-S20-01` tem três exigências e todas se confirmam. A mudança de estado e a ausência de publicação automática são verificadas por `TEST-S20-01`, que confirma que `reviewSuggestion` não cria evento algum. O pré-preenchimento ocorre em `app-controller.js:92`, que ao aprovar monta `state.draftEvent` com título, descrição e `suggestionId` e navega para a criação — sem persistir nada. É exatamente o que `FR-20` do PRD pede.

`AC-S20-02` depende do pré-preenchimento ter carregado `suggestionId`: `createEvent` grava `evento.suggestionId` e, se a sugestão estiver aprovada, escreve `sugestao.eventoId` de volta. `TEST-S20-02` confirma os dois sentidos do vínculo.

`AC-S21-02` protege contra aprovação automática. `TEST-S21-02` verifica que `reviewSuggestion` exige a permissão correspondente à decisão — `APROVAR_SUGESTAO` ou `REJEITAR_SUGESTAO` — e recusa qualquer valor fora do par previsto. Corresponde à contra-métrica `PRD-SM-C1`.

## Critérios com verificação parcial

Seis critérios têm a regra de domínio automatizada e a parte de renderização pendente de walkthrough:

| AC | O que já está verificado | O que exige walkthrough |
|---|---|---|
| `AC-S01-01` | identidade e papel retornados no login | troca da tela de auth para o shell autenticado |
| `AC-S09-01` | filtro por status e busca textual | composição visual da lista e contagem exibida |
| `AC-S10-01` | — | posicionamento de cada evento na célula do dia |
| `AC-S11-01` | cálculo de `vagasRestantes` | exibição de descrição, data, local e status |

`AC-S10-01` é o único critério sem nenhuma cobertura automatizada. `renderCalendar` calcula o primeiro dia do mês, o número de dias e distribui eventos por célula — lógica de data que erra com facilidade em meses de borda, e que só é observável no DOM.

Recomendação para o walkthrough: verificar um mês com evento no dia 1 e um com evento no último dia, além do mês corrente do seed (`2026-10`).

## Evidência de execução

```text
$ npm test
1..68
# pass 68
# fail 0
# duration_ms 148.02625

$ npm run lint
Lint OK: 6 arquivos JavaScript verificados.

$ npm run build
Build OK: baseline MVC, assets e referências da aplicação estão completos.
```

Smoke HTTP com o servidor ativo:

```text
/                               -> 200
/models/domain.js               -> 200
/models/store.js                -> 200
/controllers/app-controller.js  -> 200
/public/styles.css              -> 200
/rota-inexistente               -> 404
x-powered-by ausente (OK)
```

Os quatro comandos são os oficiais definidos por `DEC-009`.

## Fontes lidas

- [`stories/`](../04-pm-stories/stories/) — 38 critérios `AC-*` em 21 Stories
- [`definition-of-done.md`](../04-pm-stories/definition-of-done.md) — seção "Evidências mínimas"
- [`decisions.md`](../00-governance/decisions.md) — `DEC-007`, `DEC-009`, `DEC-012`
- [`tests/qa-scenarios.test.js`](../../tests/qa-scenarios.test.js)
- `src/models/domain.js`, `src/controllers/app-controller.js`
