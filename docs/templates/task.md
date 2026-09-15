---
id: T001
parent_story: S01
parent_epic: E01
status: draft
type: frontend | backend | data | ux | infra | test | documentation | product
priority: P1
order: 1
owner: "A definir"
sources: []
acceptance_criteria: []
depends_on: []
blocks: []
---

# T001 — Verbo + resultado

## Objetivo

Descreva uma única unidade de trabalho e o resultado que deverá existir ao final.

## Motivação e rastreabilidade

- Story: `S01`
- Epic: `E01`
- Requisito/decisão: `PRD-...` / `UX-...` / `ARCH-...` / `DEC-...`
- Critérios atendidos: `AC-S01-01`
- Referências completas: `[ID](caminho-relativo#seção-ou-âncora)`

## Evidências de origem

Registre o que é conhecido antes de propor a implementação. Um caminho sem seção/ID não é evidência. Os links abaixo são exemplos para o arquivo depois de copiado para `docs/04-pm-stories/tasks/`; ajuste o prefixo relativo se o destino for diferente.

### Fatos confirmados

| ID e link | Fato observado | Classificação |
|---|---|---|
| `[PRD-...](../../01-inputs/prd.md#...)` | A preencher | `confirmed` |

### Decisões derivadas

- `A preencher` — decomposição autorizada por `[ID](caminho#seção)` sem adicionar comportamento.
- Se não houver: `Nenhuma`.

### Desconhecidos e conflitos

| ID | Informação ausente/conflito | Impacto | Bloqueia? |
|---|---|---|---|
| `Q-...` | A preencher | A preencher | sim | não |

Se não houver: `Nenhum — verificar antes de marcar como ready`.

## Contexto de execução

Inclua apenas o contexto necessário para a IA agir sem adivinhação. Aponte para a story e fontes em vez de repetir requisitos sem referência.

## Escopo

### Fazer

1. A preencher

### Não fazer

- A preencher

## Arquivos, componentes ou contratos esperados

- Inspecionar antes: `<caminho ou componente>`
- Criar/alterar: `<caminho ou componente>`
- Não alterar: `<limite>`

## Pré-requisitos e dependências

- `DEP-...` ou `Nenhuma`
- Estado esperado do repositório: `<descrever>`
- Dependências `hard`/`decision` abertas: `Nenhuma` para `ready`.

## Condições para bloquear

Marque como `blocked` sem alterar o escopo se:

- a fonte ou seção obrigatória não existir;
- o ID citado não puder ser encontrado;
- houver conflito entre fontes ou entre fonte e código existente;
- for necessário inventar regra, permissão, contrato ou comportamento;
- não houver validação possível;
- a mudança necessária ultrapassar o escopo.

Registre a causa em `Q-*`, `DEP-*` ou `DEC-*`.

## Preflight da IA

Antes de implementar, registrar:

- [ ] Fontes e IDs realmente lidos.
- [ ] Fatos confirmados separados de desconhecidos.
- [ ] Conflitos verificados.
- [ ] Arquivos existentes inspecionados.
- [ ] Abordagem e arquivos planejados descritos.
- [ ] Status do preflight: `aprovado` ou `blocked`.

## Procedimento sugerido

1. Inspecionar os arquivos e padrões existentes.
2. Confirmar as fontes e os contratos referenciados.
3. Implementar a menor mudança que atende ao objetivo.
4. Manter compatibilidade com os contratos confirmados.
5. Executar a validação abaixo.
6. Revisar o diff para detectar alterações fora do escopo.

## Resultado verificável

Ao final, deve ser possível observar/verificar:

- [ ] `<resultado concreto>`

## Validação

- Comando: `<comando ou N/A com justificativa>`
- Cenário: `<passos e resultado esperado>`
- Evidência esperada: `<saída, teste, screenshot, log ou link>`
- Resultado real: `A preencher antes de done`

"Funcionou" sem comando, cenário, teste ou artefato verificável não é evidência suficiente.

## Riscos e falha segura

- Se `<condição>`: `<comportamento>`
- Não inventar: `<informação que exige decisão>`
- Fora do escopo identificado: `<registrar e não implementar>`

## Definition of Done da task

- [ ] Escopo atendido.
- [ ] Critérios relacionados verificados.
- [ ] Validação executada e resultado real registrado.
- [ ] Fatos, desconhecidos e decisões atualizados.
- [ ] Diff revisado contra o escopo.
- [ ] Documentação/rastreabilidade atualizada.
- [ ] Limitações registradas.
