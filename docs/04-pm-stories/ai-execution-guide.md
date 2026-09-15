# Guia de execução por IA

Este documento define o pacote mínimo que deve ser entregue a uma IA para executar uma task com segurança e previsibilidade. O protocolo complementar de classificação e bloqueio está em [`docs/00-governance/evidence-protocol.md`](../00-governance/evidence-protocol.md).

O mapa completo de leitura do repositório está em [`docs/00-governance/bmad-reading-map.md`](../00-governance/bmad-reading-map.md). Ele separa método/runtime (`_bmad`, `.agents/skills`, `.claude/skills`), fontes de produto (`_bmad-output/planning-artifacts`, `docs/01-inputs`) e governança/execução (`docs`).

## Pacote de leitura por etapa

Não leia todos os arquivos do `_bmad` sem objetivo. Leia primeiro a camada correspondente e registre as fontes usadas.

| Etapa | Leitura obrigatória | Leitura condicional | Não tratar como requisito |
|---|---|---|---|
| Orientação | `README.md`, `bmad-reading-map.md`, `_bmad/config.toml`, `_bmad/_config/bmad-help.csv` | `_bmad/config.user.toml`, `_bmad/custom/` | Configuração e manifestos |
| Requirements | `docs/01-inputs/prd.md` e o PRD completo em `_bmad-output/planning-artifacts/prds/` | Brief em `_bmad-output/planning-artifacts/briefs/`, `addendum.md`, `reconcile-*.md`, `review-*.md` | Reviews, reconciliações, addenda e memlogs isolados |
| UX | PRD + `docs/01-inputs/ux.md` ou `DESIGN.md`/`EXPERIENCE.md` existente | Skill UX e referências relacionadas | Mock ou screenshot sem contrato aprovado |
| Arquitetura | PRD + UX disponível + `docs/01-inputs/architecture.md` ou architecture spine | Skill Architecture, decisões e código existente | Template ou sugestão de stack |
| PM/Stories | `evidence-protocol.md`, `intake-menu.md`, `docs/04-pm-stories/README.md`, fontes relevantes | Templates, dependências, ordem, DoD e matriz | Intenção curta ou placeholder |
| Execução | Task → Story → Epic → ACs → fontes/decisões → dependências → código | Testes, project context, skills de build/review/QA | PRD inteiro indiscriminadamente ou review como autorização de escopo |

No estado atual, Brief e PRD estão disponíveis; UX, Arquitetura, Epics, Stories, Tasks e implementation artifacts ainda podem estar ausentes. Ausência de fonte deve ser registrada como `unknown`/`blocked` conforme o impacto, nunca preenchida pela IA.

## Ordem mínima antes de criar um artefato

1. Ler o `evidence-protocol.md` e o `intake-menu.md`.
2. Ler `docs/01-inputs/prd.md` para localizar IDs.
3. Ler o Brief e o PRD completo nas fontes de `_bmad-output/planning-artifacts/`.
4. Ler UX e Arquitetura quando existirem e forem relevantes ao artefato.
5. Ler o template correspondente apenas para aplicar a forma.
6. Ler dependências, ordem, DoD e matriz de rastreabilidade.
7. Apresentar o resumo do intake e aguardar confirmação explícita.

## Fontes normativas e fontes de apoio

- `_bmad`, `.agents/skills` e `.claude/skills` explicam o processo da IA; não definem comportamento do produto.
- Brief e PRD definem produto e requisitos conforme o assunto de cada documento.
- UX e Arquitetura definem suas respectivas decisões quando estiverem aprovadas.
- Templates definem formato; não fornecem conteúdo.
- `addendum.md`, `.memlog.md`, `reconcile-*.md` e `review-*.md` fornecem contexto, auditoria ou achados. Só podem sustentar implementação quando um requisito/decisão for promovido e rastreado.
- Conflitos entre fontes devem ser classificados como `conflict` e bloqueiam os itens afetados até `DEC-*` ou atualização aprovada da fonte.

## Regra principal

A IA executa somente tasks com status `ready` ou `in-progress`. Ela não deve inventar requisito, alterar escopo ou resolver uma pergunta aberta por conta própria.

Se encontrar ambiguidade, fonte ausente, conflito ou comportamento não especificado, deve parar, registrar a dúvida e marcar a task como `blocked`. Uma resposta plausível não substitui uma decisão do projeto.

## Gate de criação de artefatos

Antes de criar ou alterar Epic, Feature, Story, Spec, Task, Decision ou Dependency, a IA deve abrir o [`intake-menu.md`](intake-menu.md).

O menu deve:

1. identificar a operação e o tipo de artefato;
2. coletar perguntas comuns e específicas do tipo escolhido;
3. exigir fontes com ID, caminho e seção;
4. separar `confirmed`, `derived`, `unknown` e `conflict`;
5. mostrar escopo, dependências e validação proposta;
6. pedir confirmação explícita antes de criar ou alterar arquivos.

Se faltarem informações, a IA deve oferecer `draft`, `blocked` ou cancelamento. Ela não deve transformar uma intenção curta em requisitos ou decisões silenciosas.

## Contrato de uma task executável

Uma task só está `ready` quando responde claramente:

- **O quê:** qual resultado deve existir ao final?
- **Por quê:** qual requisito, story, decisão ou critério motivou o trabalho?
- **Onde:** quais arquivos, módulos, telas, endpoints ou dados são afetados?
- **Como validar:** qual comando, inspeção ou cenário comprova o resultado?
- **Limites:** o que está fora do escopo?
- **Dependências:** o que precisa estar concluído antes?
- **Fatos:** quais informações foram confirmadas e onde?
- **Desconhecidos:** o que não foi definido e por que não bloqueia, ou qual item bloqueia?
- **Falha segura:** o que fazer quando uma informação necessária não existir?

## Contexto mínimo a fornecer

Para cada task, a IA deve receber ou conseguir localizar:

1. a task completa;
2. a story pai e seu epic;
3. os critérios de aceitação relacionados;
4. as fontes do Product Brief/PRD/UX/Arquitetura, com IDs e seções;
5. dependências concluídas e decisões aplicáveis;
6. definição de pronto;
7. restrições do projeto e arquivos relevantes;
8. comandos, cenários e evidências esperadas para validação.

Um caminho de arquivo sem ID, seção ou conteúdo confirmado é apenas um ponteiro de busca, não uma evidência.

## Preflight obrigatório antes de alterar arquivos

A IA deve produzir internamente ou registrar no relatório:

```text
Fontes lidas:
- [ID](caminho#seção) — afirmação utilizada

Fatos confirmados:
- [ID] — fato observado

Decisões derivadas:
- [DEC/ID] — decomposição feita sem adicionar comportamento

Desconhecidos:
- [Q/ID] — informação ausente e impacto

Conflitos:
- [ID] versus [ID] — decisão necessária ou "nenhum"

Arquivos inspecionados:
- caminho — padrão/contrato observado

Arquivos planejados para alteração:
- caminho — motivo

Status do preflight: aprovado | blocked
```

O preflight deve ser `blocked` quando uma condição de parada for encontrada. Nesse caso, não altere o código para tentar adivinhar a solução.

## Condições obrigatórias para bloquear

Pare e marque a task como `blocked` quando:

- a fonte ou seção obrigatória não existir;
- o ID citado não puder ser encontrado;
- houver conflito entre PRD, UX, Arquitetura ou código existente;
- uma regra de negócio, permissão ou contrato necessário estiver indefinido;
- for necessário escolher entre comportamentos não especificados;
- não houver critério de aceitação observável;
- não houver validação possível para o resultado;
- uma dependência `hard` ou `decision` estiver aberta;
- a mudança necessária ultrapassar o escopo da task.

Registre a causa em `Q-*`, `DEP-*` ou `DEC-*`. Nunca resolva a condição silenciosamente.

## Instrução operacional para a IA

1. Leia a task, a story pai, o epic e todas as fontes referenciadas.
2. Confirme que os IDs citados existem e que os links levam às seções corretas.
3. Separe fatos confirmados, decisões derivadas, desconhecidos e conflitos.
4. Verifique se dependências estão concluídas e se não há perguntas abertas bloqueadoras.
5. Inspecione o repositório antes de propor alterações.
6. Explique brevemente a abordagem e os arquivos afetados.
7. Implemente apenas o escopo da task.
8. Execute a validação indicada na task e qualquer validação relevante existente.
9. Revise o diff procurando alterações fora do escopo.
10. Relate arquivos alterados, resultado dos checks, limitações e próximos bloqueios.
11. Atualize o status somente quando a evidência corresponder ao estado.

## Saída esperada da IA

```text
Task: T001
Status: done | blocked
Fontes realmente lidas: <IDs, caminhos e seções>
Fatos confirmados usados: <lista>
Decisões derivadas: <lista ou "nenhuma">
Desconhecidos/conflitos: <lista ou "nenhum">
Resultado: <o que foi entregue>
Arquivos inspecionados: <lista>
Arquivos alterados: <lista>
Validação: <comandos/cenários e resultados reais>
Critérios atendidos: <IDs AC...>
Dúvidas, riscos ou dependências: <ou "nenhum">
Rastreabilidade atualizada: sim | não — motivo
```

A execução de uma task não encerra automaticamente a story. A story só pode ser marcada como `done` quando todos os critérios de aceitação, evidências e o DoD específico/global forem verificados.
