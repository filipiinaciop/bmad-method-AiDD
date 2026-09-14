# Tasks

Crie uma task por arquivo usando `docs/templates/task.md`.

Nome sugerido: `T001-kebab-case-da-task.md`.

A task deve ser específica o bastante para uma IA executar, validar e relatar sem adivinhar requisitos. Ela não deve substituir o contexto da story pai.

## Checklist mínimo antes de `ready`

- [ ] Cada fonte tem ID, caminho e seção/âncora verificável.
- [ ] Fatos confirmados estão separados de decisões derivadas.
- [ ] Desconhecidos, perguntas e conflitos estão explícitos.
- [ ] O escopo Fazer/Não fazer está preenchido.
- [ ] Arquivos existentes a inspecionar estão indicados.
- [ ] Critérios de aceitação relacionados estão ligados.
- [ ] Existe resultado observável e validação com evidência esperada.
- [ ] Condições para bloquear estão definidas.
- [ ] Dependências `hard` e `decision` estão resolvidas.
- [ ] A matriz de rastreabilidade foi atualizada.

## Regra de parada

Se a IA não conseguir encontrar a fonte, confirmar o ID, entender o comportamento ou validar o resultado, ela deve marcar a task como `blocked` e registrar `Q-*`, `DEP-*` ou `DEC-*`. Não deve preencher a lacuna com uma implementação plausível.

## Referência válida

Prefira:

```text
[PRD-001](../../01-inputs/prd.md#prd-001) — seção "Nome" — afirmação sustentada
```

Evite usar apenas:

```text
docs/01-inputs/prd.md
```

Um caminho sem seção, ID ou afirmação não permite verificar o contexto.
