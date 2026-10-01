---
id: QA-REVIEW-UX
type: qa-review
status: done
owner: "Integrante 5 — QA / Validation"
sources: [UX-001, UX-002, DEC-008, PRD-001]
depends_on: [UX-001]
---

# Revisão de UX

Revisão de [`ux.md`](../01-inputs/ux.md) — `UX-001` (fundação visual) e `UX-002` (contratos específicos do produto), confirmado por `DEC-008` — confrontada com `src/views/index.html`, `src/public/styles.css` e `src/controllers/app-controller.js`.

## Veredito

Os contratos de `UX-002` estão majoritariamente implementados, e com qualidade acima do esperado em acessibilidade visual: `:focus-visible` com contorno de 3px, alvos de toque de 44px nos botões e 46px nos inputs, dois breakpoints responsivos e empty state próprio em cada uma das nove superfícies.

O que falha é o contrato de **erro**: a regra "manter foco no contexto da ação" não é cumprida em nenhum formulário interno, e existe um container de erro renderizado que nunca recebe conteúdo. Além disso, o contrato de **permissão** é cumprido pela metade — a operação é negada no domínio, mas as ações não permitidas continuam visíveis.

## Status do documento

[`QA-005`](findings.md#qa-005) — o arquivo declara `status: draft` no front-matter e `**Status:** confirmed` na seção `UX-002`. A matriz de rastreabilidade consome a fonte como confirmada, e vinte e uma Stories a citam. É um conflito interno que precisa de decisão antes da promoção da arquitetura.

A tensão aparece também no conteúdo: `UX-004` afirma que "empty states, loading, erros, navegação, fluxos de autenticação ou telas específicas permanecem `unknown`", enquanto `UX-002`, no mesmo arquivo, especifica exatamente esses itens. A leitura correta é cronológica — `UX-001` foi escrito a partir dos assets visuais, `UX-002` foi acrescentado depois com os contratos de produto — mas essa ordem não está declarada em lugar nenhum.

## Fluxos e superfícies

| Contrato `UX-002` | Situação | Evidência |
|---|---|---|
| Autenticação dividida entre bloco pastel e formulário branco | atendido | `index.html:12-29`, `.auth-layout` em `styles.css:15` |
| Feedback de credencial inválida sem revelar se o e-mail existe | atendido | `app-controller.js:69` — mensagem única `Não foi possível entrar com essas credenciais.` |
| Shell autenticado com identidade e saída | atendido | `index.html:32-35` |
| Navegação mostra somente capacidades permitidas pela Role | atendido | `renderNav` filtra por `can(item[2])` |
| Eventos: lista com busca/filtro, calendário, detalhe, criação/edição, gestão | atendido | `renderEvents`, `renderCalendar`, `renderDetail`, `renderCreateEvent`, `renderManagement` |
| Validação, gestão e inscritos conforme permissão | atendido | `renderValidation`, `renderSubscribers` |
| Inscrição oferecida quando o evento está `APROVADO` e disponível | atendido | `canEnroll` exige `APPROVED`, ausência de inscrição ativa e vaga disponível |
| `Minhas inscrições` mostra `ATIVA`/`CANCELADA` | atendido | `renderMyEnrollments` com `statusBadge` |
| Aluno envia e consulta suas sugestões | atendido | `renderMySuggestions` |
| Professor/Admin vê a fila e aprova/rejeita explicitamente | atendido | `renderSuggestionQueue` — só itens `PENDENTE` |

O contrato de fluxos está integralmente implementado. A única superfície prevista por nenhum contrato e necessária pelo comportamento real é o acompanhamento do evento proposto pelo Aluno — ver [`QA-009`](findings.md#qa-009), de responsabilidade de Requirements, não de UX.

## Estados comportamentais

### Vazio — atendido

Nove superfícies possuem `.empty-state` com título e próxima ação sugerida, conforme a regra "explicar o que está vazio e oferecer a próxima ação quando houver". Exemplos: lista de eventos (`Ajuste os filtros ou volte mais tarde`), fila de sugestões (`Fila vazia`), inscritos (`Este evento ainda não possui alunos inscritos`).

### Erro — não atendido

A regra tem três partes. Duas são cumpridas:

- *preservar dados válidos* — `run()` não limpa o formulário em caso de falha; o `render()` só ocorre no caminho de sucesso;
- *mostrar mensagem compreensível* — `DomainError.message` é escrito em texto humano em português e reaproveitado diretamente.

A terceira — *manter foco no contexto da ação* — não é cumprida. Todo erro vai para `#feedback`, no topo da área de conteúdo:

```js
// app-controller.js:20
catch (error) {
  setFeedback(error instanceof Domain.DomainError ? error.message : 'Não foi possível concluir a ação.', 'error');
}
```

O formulário de evento renderiza um container próprio que nunca é escrito ([`QA-013`](findings.md#qa-013)), e a tentativa de mover o foco para o feedback global é um no-op ([`QA-014`](findings.md#qa-014)). O resultado prático: em um formulário de sete campos, a mensagem de erro aparece acima da área visível de quem está preenchendo o fim do formulário.

A tela de login é a exceção correta — escreve em `#auth-feedback`, que está dentro do cartão de autenticação, ao lado do formulário. O padrão certo existe no código e não foi generalizado.

### Permissão — atendido pela metade

A regra exige *"ocultar ações não permitidas e negar também a operação de domínio"*.

A negação no domínio está completa: `assertActor` valida a permissão em todas as 17 operações mutantes. A ocultação está correta para permissões de Role — `renderNav` e `eventCard` consultam `can()` antes de renderizar.

O que falta é a condição de **estado**: os botões "Cancelar evento" e "Editar" são renderizados por permissão sem verificar se a transição é válida para o status atual do evento. Ver [`QA-007`](findings.md#qa-007) e [`QA-008`](findings.md#qa-008).

A tela de gestão lista todos os eventos sem filtro de status, então `PENDENTE` e `NEGADO` aparecem ali com botões que o domínio recusa. Não é falha de segurança — é exatamente a situação que a regra queria evitar: oferecer ao usuário uma ação que vai falhar.

### Persistência — atendido

*"Após recarregar a página, dados válidos de `localStorage` continuam disponíveis; dados corrompidos retornam ao seed."* Verificado por `TEST-NFR-01` e `TEST-NFR-02`, incluindo o caso de JSON válido mas estruturalmente inválido, que também restaura o seed.

### Loading — não aplicável no MVP

Nenhuma superfície apresenta estado de carregamento. Não é defeito: toda operação é síncrona sobre `localStorage`, sem latência observável nem janela em que um indicador faria sentido. A regra foi escrita prevendo persistência remota, que `DEC-001` deferiu.

Classificação: `derived` — não atendido por não ter objeto. Deve voltar à pauta se a persistência remota for retomada.

## Acessibilidade e responsividade

| Exigência `UX-002` | Situação | Evidência |
|---|---|---|
| Labels associados a inputs | atendido | `index.html:25-26` usa `for`/`id`; views dinâmicas usam associação implícita com `<label>` envolvendo o controle |
| `aria-live` para feedback | atendido | `#feedback` `role="status" aria-live="polite"`; `#auth-feedback` `role="alert" aria-live="polite"` |
| `:focus-visible` perceptível | atendido | `styles.css:12` — `outline: 3px solid var(--black); outline-offset: 3px` |
| Alvos de toque ≥ 44px | atendido | `.button` e `.nav-button` com `min-height: 44px`; inputs com 46px |
| Reorganizar navegação e formulários em telas menores | atendido | breakpoints em 850px (sidebar vira barra horizontal rolável) e 560px (grid de formulário vira coluna única) |
| Manter paleta e tipografia de `UX-001` | atendido | tokens aplicados via custom properties; classes `pastel-*` por seção |

Dois pontos adicionais verificados e corretos, embora não exigidos explicitamente:

- `type="button"` está presente em **todos** os botões que não são de submit — não há submit acidental de formulário;
- `escapeHtml` é aplicado a todo conteúdo de origem do usuário interpolado em template string, incluindo atributos `title` e `value`. A superfície é construída por concatenação de HTML, então essa disciplina é o que separa o projeto de um XSS armazenado. Vale registrar como ponto a proteger em qualquer alteração futura de UI.

Observação menor sobre `UX-001`: a regra "Magenta `#ff3d8b` é reservado para um destaque pontual, não para uso geral" não tem como ser verificada automaticamente e não foi violada nos arquivos inspecionados.

## Fontes lidas

- [`ux.md`](../01-inputs/ux.md) — `UX-001` a `UX-004` e seção `UX-002 — Contratos específicos do produto`
- [`decisions.md`](../00-governance/decisions.md) — `DEC-008`
- `src/views/index.html`, `src/public/styles.css`, `src/controllers/app-controller.js`
