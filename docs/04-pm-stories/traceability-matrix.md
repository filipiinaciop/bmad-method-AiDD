# Matriz de rastreabilidade

Esta matriz liga a intenção à execução e permite encontrar tanto requisitos sem implementação quanto trabalho sem justificativa.

## Registro

| Fonte/ID | Seção da fonte | Epic | Story | Critério de aceitação | Task | Teste/evidência | Status | Lacuna/observação |
|---|---|---|---|---|---|---|---|---|
| `PB-...` / `PRD-...` / `UX-...` / `ARCH-...` | `A preencher` | `E...` | `S...` | `AC-S...` | `T...` | `TEST...` ou link | não iniciado | `A preencher` |

## Regras de uso

- Uma linha representa uma relação rastreável; não agrupe fontes diferentes sem listar todos os IDs.
- Toda story e task deve ter pelo menos uma fonte ou uma decisão registrada que justifique sua existência.
- Todo requisito obrigatório deve chegar a pelo menos um epic, story e critério de aceitação.
- Todo critério de aceitação deve chegar a uma task e a uma evidência/teste antes de a story ficar `done`.
- Quando não houver teste ou evidência ainda, use `pendente`, não invente um link.
- Atualize a matriz durante o refinamento, não apenas no final.

## Auditoria bidirecional

### Fonte para execução

Para cada `PB-*`, `PRD-*`, `UX-*` e `ARCH-*`, pergunte: existe epic, story, critério, task e validação? Se não, registre a lacuna.

### Execução para fonte

Para cada `E*`, `S*` e `T*`, pergunte: qual fonte ou decisão motivou este item? Se não houver resposta, remova a invenção ou registre a decisão que autorizou o trabalho.
