---
id: UX-001
type: ux-foundation
status: confirmed
owner: "Integrante 2 — UX / Product Experience"
sources:
  - ".agents/skills/bmad-agent-ux-designer/assets/design-tokens.json"
  - ".agents/skills/bmad-agent-ux-designer/assets/ui-style-guide.md"
---

# UX-001 — Fundação visual do Germinare Tech

Este documento registra como o projeto deve aplicar os assets visuais fornecidos pelo grupo. `UX-001` cobre a fundação visual derivada dos assets; `UX-002` registra os contratos de fluxo, tela e estado do produto, confirmados por `DEC-008`. Nenhuma das duas seções autoriza alterar requisitos, permissões ou estados de evento, que pertencem ao PRD e à arquitetura.

## UX-001 — Tokens visuais

- Superfícies principais: branco (`#ffffff`) e preto (`#000000`).
- Texto principal: preto em superfícies claras e branco em superfícies escuras.
- Bordas: hairline `#e6e6e6` e hairline-soft `#f1f1f1`.
- Superfície suave: `#f7f7f5`.
- Blocos de cor permitidos: lime, lilac, cream, pink, mint, coral e navy.
- Magenta `#ff3d8b` é reservado para um destaque pontual, não para uso geral.
- Sucesso usa `#1ea64a`.

## UX-002 — Tipografia e ritmo

- Usar a família sans indicada pelos assets, com fallback para `system-ui`/Helvetica.
- Usar a família mono somente para labels de categoria, eyebrows e captions.
- Manter a hierarquia de display, headline, body e caption conforme `design-tokens.json`.
- Usar espaçamento baseado nos tokens de 4, 8, 12, 16, 24, 32, 48 e 96px.

## UX-003 — Componentes

- Ações primárias e secundárias usam botões em formato pill.
- Ações iconográficas usam botões circulares.
- Inputs usam fundo branco, borda hairline, padding consistente e raio médio.
- Cards usam superfície branca ou suave, borda discreta e raio médio/grande.
- Blocos narrativos podem usar uma única cor pastel por seção, sem sombras desnecessárias.

## UX-004 — Responsividade e acessibilidade visual

- A interface deve ser utilizável em desktop, tablet e celular.
- Alvos de toque devem respeitar pelo menos 44px quando aplicável.
- Contraste e foco devem ser verificados durante a implementação.
- Os assets de `UX-001` não definem, sozinhos, empty states, loading, erros, navegação, fluxos de autenticação ou telas específicas do Germinare Tech. Esses itens foram especificados em [`UX-002`](#ux-002--contratos-específicos-do-produto) e confirmados por `DEC-008`; nenhum item permanece `unknown`.

## Fonte

A aplicação deste documento é uma adaptação dos arquivos fornecidos em `.agents/skills/bmad-agent-ux-designer/assets/`. O design visual não autoriza alterar requisitos, permissões, estados de evento ou contratos de arquitetura.

## UX-002 — Contratos específicos do produto

**Status:** `confirmed`.

A experiência do MVP deve usar os assets visuais e os fluxos abaixo.

### Fluxos e superfícies

- **Autenticação:** tela dividida entre apresentação em bloco pastel e formulário branco; feedback de credencial inválida é visível, acessível e não revela se o e-mail existe. O logout limpa os campos de e-mail e senha e o feedback de credencial, e o formulário declara `autocomplete` restritivo, por `DEC-019`.
- **Shell autenticado:** topo com identidade do usuário e saída; navegação mostra somente capacidades permitidas pela Role. O botão de retorno dentro de um fluxo volta para a tela anterior real, não para um destino fixo, por `DEC-018`.
- **Eventos:** lista com busca/filtro, calendário mensal, detalhe, criação/edição e gerenciamento; Professor/Admin possui validação, gestão e inscritos conforme permissão.
- **Inscrições:** detalhe oferece inscrição quando o evento está `APROVADO` e disponível; `Minhas inscrições` mostra estados `ATIVA`/`CANCELADA`.
- **Sugestões:** Aluno envia e consulta suas sugestões; Professor/Admin vê a fila e aprova/rejeita explicitamente.

### Estados comportamentais

- Loading: usar feedback textual ou estado de carregamento sem bloquear o teclado.
- Vazio: explicar o que está vazio e oferecer a próxima ação quando houver.
- Erro: preservar dados válidos, mostrar mensagem compreensível e manter foco no contexto da ação.
- Feedback temporário: mensagens de sucesso desaparecem após 5 segundos e mensagens de erro após 10 segundos; uma nova mensagem cancela o temporizador da anterior. Vale para o feedback global, o de formulário e o de autenticação, por `DEC-017`.
- Permissão: ocultar ações não permitidas e negar também a operação de domínio.
- Persistência: após recarregar a página, dados válidos de `localStorage` continuam disponíveis; dados corrompidos retornam ao seed.

### Acessibilidade e responsividade

- Usar labels associados a inputs, `aria-live` para feedback e `:focus-visible` perceptível.
- Manter alvos de toque de pelo menos 44px.
- Reorganizar a navegação e formulários para telas menores sem perder ações essenciais.
- Manter a paleta e tipografia de UX-001, sem introduzir cores ou componentes fora do guia.
