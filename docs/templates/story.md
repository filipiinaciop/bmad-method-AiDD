---
id: S01
parent_epic: E01
status: draft
priority: P1
order: 1
owner: "A definir"
sources: []
depends_on: []
blocks: []
---

# S01 — Título da story

## Intenção

Descreva a capacidade vertical e demonstrável que será entregue.

## Narrativa

**Como** `<persona>`, **quero** `<capacidade>`, **para** `<valor>`.

## Contexto

Qual problema, fluxo ou decisão originou esta story? Aponte para a fonte e a seção correspondente.

## Evidências de origem

Os links abaixo são exemplos para o arquivo depois de copiado para `docs/04-pm-stories/stories/E##/`; ajuste o prefixo relativo se o destino for diferente.

### Fatos confirmados

| ID e link | Fato observado | Classificação |
|---|---|---|
| `[PRD-...](../../01-inputs/prd.md#...)` | A preencher | `confirmed` |

### Decisões derivadas

- `A preencher` — decomposição autorizada por `[ID](../../01-inputs/arquivo.md#seção)`.
- Se não houver: `Nenhuma`.

### Desconhecidos e conflitos

| ID | Informação ausente/conflito | Impacto | Bloqueia? |
|---|---|---|---|
| `Q-...` | A preencher | A preencher | `sim` ou `não` |

Se não houver: `Nenhum — verificar antes de marcar como ready`.

## Critérios de aceitação

Use IDs estáveis e comportamento observável. Evite prescrever implementação sem justificativa. Cada critério deve ser rastreável a uma fonte ou decisão.

### AC-S01-01 — Caminho principal

- Fonte: `[ID](../../01-inputs/arquivo.md#seção)`
- **Dado** `<contexto inicial>`
- **Quando** `<ação do usuário/sistema>`
- **Então** `<resultado observável>`

### AC-S01-02 — Erro ou caso-limite

- Fonte: `[ID](../../01-inputs/arquivo.md#seção)` ou `DEC-*`
- **Dado** `<contexto>`
- **Quando** `<ação>`
- **Então** `<comportamento seguro e mensagem/estado esperado>`

## Regras de negócio

- `BR-...` — `<regra>` — fonte: `[ID](caminho#seção)`
- Se não houver: `N/A — confirmar com Product antes de ficar ready.`

## UX, estados e acessibilidade

- Fluxo/tela: `UX-...` — `[link](../../01-inputs/ux.md#...)`
- Loading: `<comportamento e fonte>`
- Vazio: `<comportamento e fonte>`
- Erro: `<comportamento e fonte>`
- Permissões: `<comportamento e fonte>`
- Acessibilidade: `<requisito e fonte>`

## Dados, API e arquitetura

- Contratos/dados: `ARCH-...` — `[link](../../01-inputs/architecture.md#...)`
- Entradas e saídas: `<descrever>`
- Restrições: `<descrever>`
- Conflitos com outras fontes: `Nenhum` ou `Q-...`/`DEC-...`

## Condições para bloquear

A story não pode ficar `ready` e a IA deve parar se:

- uma fonte ou seção obrigatória não existir;
- um ID citado não puder ser encontrado;
- PRD, UX, Arquitetura ou código existente apresentarem conflito;
- uma regra, permissão, estado ou contrato necessário estiver indefinido;
- algum critério de aceitação não puder ser validado;
- uma dependência `hard` ou `decision` estiver aberta;
- for necessário inventar comportamento para completar a story.

Registre a causa em `Q-*`, `DEP-*` ou `DEC-*`.

## Tasks

- [ ] `T001` — `<task>` — `draft` — fonte/critério: `AC-S01-01`

Cada task deve ter seu próprio preflight, escopo, resultado verificável e validação.

## Dependências e decisões abertas

- Dependências: `DEP-...` ou `Nenhuma conhecida`
- Perguntas: `Q-...` ou `Nenhuma`
- Decisões: `DEC-...` ou `Nenhuma`

## DoD específico

- [ ] Critérios `AC-S01-*` verificados com evidência.
- [ ] Teste/evidência: `TEST-S01-*` ou link verificável.
- [ ] Fatos, desconhecidos, conflitos e decisões atualizados.
- [ ] Diff/artefato revisado contra o escopo.
- [ ] `<condição específica>`

## Rastreabilidade

- Fontes: `PB-...`, `PRD-...`, `UX-...`, `ARCH-...` com links e seções.
- Epic: `E01`
- Critérios ligados a tasks: `sim | não`
- Evidências ligadas aos critérios: `sim | não`
- Matriz atualizada: `sim | não`
