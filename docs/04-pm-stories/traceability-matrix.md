# Matriz de rastreabilidade

Esta matriz liga a intenção à execução e permite encontrar tanto requisitos sem implementação quanto trabalho sem justificativa. Ela também registra a evidência usada para cada relação.

## Registro

| Fonte/ID | Link e seção | Classe da evidência | Afirmação sustentada | Epic | Story | Critério de aceitação | Task | Teste/evidência de execução | Status | Lacuna/observação |
|---|---|---|---|---|---|---|---|---|---|---|
| `PB-...` / `PRD-...` / `UX-...` / `ARCH-...` | `[fonte](caminho#seção)` | `confirmed` / `derived` / `unknown` / `conflict` | `A preencher` | `E...` | `S...` | `AC-S...` | `T...` | `TEST...` ou link | não iniciado | `A preencher` |

## Regras de uso

- Uma linha representa uma relação rastreável; não agrupe fontes diferentes sem listar todos os IDs.
- Toda fonte usada deve ter ID, caminho relativo e seção/âncora localizável.
- Toda afirmação usada deve ser classificada como `confirmed`, `derived`, `unknown` ou `conflict`.
- `derived` deve apontar para a fonte confirmada que autorizou a decomposição e não pode adicionar comportamento novo.
- `unknown` não pode sustentar uma implementação `ready`; deve apontar para `Q-*` ou `ASM-*`.
- `conflict` bloqueia o item até uma decisão `DEC-*` ser registrada.
- Toda story e task deve ter pelo menos uma fonte ou uma decisão registrada que justifique sua existência.
- Todo requisito obrigatório deve chegar a pelo menos um epic, story e critério de aceitação.
- Todo critério de aceitação deve chegar a uma task e a uma evidência/teste antes de a story ficar `done`.
- Quando não houver teste ou evidência ainda, use `pendente`, não invente um link.
- Atualize a matriz durante o refinamento, não apenas no final.

## Auditoria bidirecional

### Fonte para execução

Para cada `PB-*`, `PRD-*`, `UX-*` e `ARCH-*`, pergunte:

1. O arquivo e a seção existem?
2. A afirmação foi realmente confirmada?
3. Existe epic, story, critério, task e validação?
4. Há alguma lacuna, pergunta ou conflito?

Se a resposta de qualquer item for não, registre a lacuna e não marque a entrega como `ready` ou `done` sem uma justificativa válida.

### Execução para fonte

Para cada `E*`, `S*` e `T*`, pergunte:

1. Qual fonte ou decisão motivou este item?
2. O link aponta para uma seção verificável?
3. O item adiciona comportamento que não está na origem?
4. Qual evidência comprova o resultado?

Se não houver resposta, remova a invenção, registre uma decisão autorizadora ou bloqueie o item.
