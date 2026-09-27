---
id: UX-001
type: ux-foundation
status: draft
owner: "Integrante 2 — UX / Product Experience"
sources:
  - ".agents/skills/bmad-agent-ux-designer/assets/design-tokens.json"
  - ".agents/skills/bmad-agent-ux-designer/assets/ui-style-guide.md"
---

# UX-001 — Fundação visual do Germinare Tech

Este documento registra como o projeto deve aplicar os assets visuais fornecidos pelo grupo. Ele não inventa fluxos, telas ou estados de produto; esses itens devem ser definidos em contratos UX posteriores.

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
- Os assets não definem ainda empty states, loading, erros, navegação, fluxos de autenticação ou telas específicas do Germinare Tech; esses itens permanecem `unknown` até uma especificação UX aprovada.

## Fonte

A aplicação deste documento é uma adaptação dos arquivos fornecidos em `.agents/skills/bmad-agent-ux-designer/assets/`. O design visual não autoriza alterar requisitos, permissões, estados de evento ou contratos de arquitetura.

## UX-002 — Contratos específicos do produto

**Status:** `unknown` / `blocked`.

Os assets fornecidos definem fundação visual, mas ainda não definem telas, navegação, loading, estados vazios, erros, permissões visuais, foco ou fluxos específicos do Germinare Tech. Esses contratos devem ser publicados pelo Integrante 2 antes de as Stories dependentes ficarem `ready`.
