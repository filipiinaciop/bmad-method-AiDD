# Guia de execução por IA

Este documento define o pacote mínimo que deve ser entregue a uma IA para executar uma task com segurança e previsibilidade.

## Regra principal

A IA executa somente tasks com status `ready` ou `in-progress`. Ela não deve inventar requisito, alterar escopo ou resolver uma pergunta aberta por conta própria. Se encontrar ambiguidade, deve parar, registrar a dúvida e marcar a task como `blocked`.

## Contexto mínimo a fornecer

Para cada task, a IA deve receber ou conseguir localizar:

1. a task completa;
2. a story pai e seu epic;
3. os critérios de aceitação relacionados;
4. as fontes do Product Brief/PRD/UX/Arquitetura;
5. dependências concluídas e decisões aplicáveis;
6. definição de pronto;
7. restrições do projeto e arquivos relevantes.

## Contrato de uma task executável

Uma task só está `ready` quando responde claramente:

- **O quê:** qual resultado deve existir ao final?
- **Por quê:** qual requisito, story ou critério motivou o trabalho?
- **Onde:** quais arquivos, módulos, telas, endpoints ou dados são afetados?
- **Como validar:** qual comando, inspeção ou cenário comprova o resultado?
- **Limites:** o que está fora do escopo?
- **Dependências:** o que precisa estar concluído antes?
- **Falha segura:** o que fazer quando uma informação necessária não existir?

## Instrução operacional para a IA

Use este roteiro ao iniciar uma task:

1. Leia a task, a story pai, o epic e todas as fontes referenciadas.
2. Verifique se dependências estão concluídas e se não há perguntas abertas bloqueadoras.
3. Inspecione o repositório antes de propor alterações.
4. Explique brevemente a abordagem e os arquivos afetados.
5. Implemente apenas o escopo da task.
6. Execute a validação indicada na task e qualquer validação relevante existente.
7. Relate arquivos alterados, resultado dos checks, limitações e próximos bloqueios.
8. Atualize o status somente quando a evidência corresponder ao estado.

## Saída esperada da IA

```text
Task: T001
Status: done | blocked
Resultado: <o que foi entregue>
Arquivos alterados: <lista>
Validação: <comandos/cenários e resultados>
Critérios atendidos: <IDs AC...>
Dúvidas ou riscos: <ou "nenhum">
Rastreabilidade atualizada: sim | não — motivo
```

A execução de uma task não encerra automaticamente a story. A story só pode ser marcada como `done` quando todos os critérios de aceitação e o DoD específico/global forem verificados.
