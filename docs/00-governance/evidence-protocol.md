# Protocolo de evidências e bloqueio

Este protocolo reduz decisões inventadas ao obrigar que cada afirmação relevante seja classificada, localizada e validada. Ele se aplica aos Integrantes 1–5 e a qualquer IA que leia ou altere o repositório.

## Princípios obrigatórios

```text
Sem fonte, não existe story.
Sem critério de aceitação, não existe task.
Sem validação, não está concluído.
Desconhecido não é decisão.
Caminho de arquivo não é evidência.
```

Um caminho apenas indica onde procurar. Evidência é uma afirmação ligada a um ID, seção, observação real do repositório ou resultado de validação.

## Classificação da informação

| Classe | Significado | Uso permitido |
|---|---|---|
| `confirmed` | Está explícito em uma fonte aprovada ou foi observado diretamente no repositório/validação. | Pode orientar implementação. Deve ter referência. |
| `derived` | Decomposição necessária e lógica de uma informação confirmada. | Pode orientar o trabalho, mas não pode adicionar comportamento não autorizado. Deve apontar para a origem. |
| `unknown` | Informação ausente, não observada ou ainda não decidida. | Deve permanecer explícita; não pode ser tratada como fato. |
| `conflict` | Duas ou mais fontes apresentam instruções incompatíveis. | Bloqueia o item até uma decisão registrada. |

## Formato mínimo de referência

Toda fonte usada por uma story ou task deve apontar para:

```text
[ID](caminho-relativo#seção-ou-âncora) — nome da seção — afirmação sustentada
```

Exemplo:

```text
[PRD-004](../../01-inputs/prd.md#prd-004) — Aprovação de sugestões — professor pode aprovar ou rejeitar uma sugestão.
```

Se a fonte não tiver uma âncora ou ID localizável, ela ainda precisa indicar o arquivo e o título exato da seção. O Integrante 4 deve solicitar a correção da fonte quando a localização não for reproduzível.

## Gate de intake

Antes de criar ou alterar qualquer Epic, Feature, Story, Spec, Task, Decision ou Dependency, use [`docs/04-pm-stories/intake-menu.md`](../04-pm-stories/intake-menu.md).

O intake é obrigatório porque uma intenção curta não contém necessariamente escopo, fontes, dependências, critérios ou validação suficientes. A IA deve coletar as respostas, apresentar o resumo e aguardar confirmação explícita antes de criar/alterar arquivos.

Se houver `unknown`, `conflict`, fonte ausente, contrato indefinido ou validação impossível, o resultado deve ser `draft` ou `blocked`, nunca uma decisão inventada.

## Preflight de evidências

| Verificação | Evidência esperada | Se falhar |
|---|---|---|
| A fonte existe? | Arquivo acessível e link funcionando. | `blocked` |
| O ID existe? | ID encontrado no conteúdo da fonte. | `blocked` |
| A afirmação está explícita? | Trecho/seção ou observação verificável. | `draft` ou `blocked` |
| Há conflito? | Comparação entre fontes relacionadas. | `blocked` até decisão |
| O comportamento está definido? | Critério observável. | `draft` |
| O resultado pode ser validado? | Comando, cenário ou evidência esperada. | `draft` |
| O escopo está limitado? | Seção Fazer/Não fazer preenchida. | `draft` |

## Condições obrigatórias de bloqueio

Marque o item como `blocked` e registre `DEP-*` ou `Q-*` quando:

- uma fonte ou seção obrigatória não existir;
- o ID citado não puder ser encontrado;
- PRD, UX e Arquitetura discordarem;
- uma regra de negócio, permissão ou contrato necessário estiver indefinido;
- a implementação exigir escolher entre comportamentos não especificados;
- não houver critério de aceitação observável;
- não houver maneira conhecida de validar o resultado;
- uma dependência `hard` ou `decision` estiver aberta;
- a mudança exigida ultrapassar o escopo aprovado.

A IA não deve escolher uma alternativa nesses casos. A decisão deve ser feita pelo responsável apropriado e registrada como `DEC-*` ou como resposta à pergunta aberta.

## Protocolo de saída

Toda execução deve informar:

1. fontes e IDs realmente lidos;
2. fatos confirmados usados;
3. informações desconhecidas ou conflitos encontrados;
4. arquivos inspecionados e alterados;
5. validações executadas e seus resultados;
6. critérios atendidos;
7. dúvidas, riscos e dependências restantes.

A ausência de uma informação deve ser reportada como ausência. Nunca substitua `unknown` por uma frase plausível.
