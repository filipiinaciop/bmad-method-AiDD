# Menu de intake e confirmação

Este menu deve ser usado antes de criar, alterar ou decompor qualquer artefato de planejamento. Ele impede que uma descrição curta seja transformada automaticamente em requisito, decisão ou implementação sem confirmação suficiente.

## Regra do gate

A IA não cria o artefato final imediatamente após o pedido. Primeiro apresenta o menu, coleta as respostas, separa fatos de desconhecidos, mostra um resumo e pede confirmação explícita.

```text
Sem intake concluído, não há criação.
Sem confirmação explícita, não há publicação.
Sem fonte ou decisão, o item permanece draft ou blocked.
```

Uma resposta como "crie um épico de login" é uma intenção inicial, não um conjunto completo de requisitos.

## Menu principal

Ao receber um pedido de criação ou alteração, mostre:

```text
O que você deseja fazer?

[1] Criar Epic
[2] Criar Feature / Capability
[3] Criar Story
[4] Criar Spec
[5] Criar Task
[6] Registrar Decision
[7] Registrar Dependency
[8] Alterar um artefato existente
[9] Revisar prontidão de um artefato
[0] Não sei qual artefato preciso

Responda com o número e, se quiser, uma breve descrição da intenção.
```

### Como interpretar os tipos

| Opção | Artefato | Quando usar | Saída esperada |
|---:|---|---|---|
| 1 | `Epic` | Resultado ou capacidade ampla que agrupa trabalho relacionado. | `E##-slug.md` |
| 2 | `Feature / Capability` | Capacidade de produto percebida pelo usuário ou pelo negócio. | Feature registrada e ligada a um Epic; normalmente gera uma ou mais Stories. |
| 3 | `Story` | Unidade vertical de valor com critérios de aceitação observáveis. | `S##-slug.md` |
| 4 | `Spec` | Especificação formal de produto, UX, arquitetura ou implementação. | Spec ligada às fontes e artefatos afetados. |
| 5 | `Task` | Trabalho executável com resultado e validação verificáveis. | `T###-slug.md` |
| 6 | `Decision` | Escolha aprovada entre alternativas ou resolução de conflito. | `DEC-###` no registro apropriado. |
| 7 | `Dependency` | Relação que bloqueia ou condiciona outro item. | `DEP-###` em `dependencies.md`. |
| 8 | `Alterar` | Mudança de escopo, fonte, prioridade, status ou conteúdo existente. | Diff planejado e impacto rastreado. |
| 9 | `Revisar` | Verificar evidências, completude, dependências e readiness. | Relatório sem alterar o artefato por padrão. |
| 0 | `Não sei` | O pedido ainda não permite escolher o nível correto. | A IA explica as opções e faz perguntas de descoberta. |

### Feature não é Story automaticamente

Uma Feature descreve uma capacidade de produto. Uma Story descreve uma fatia vertical de valor que pode ser aceita e validada.

Se o projeto não adotar uma camada formal de Feature, a IA deve perguntar:

```text
Esta capacidade deve existir como uma Feature entre Epic e Story,
ou devo decompô-la diretamente em uma ou mais Stories do Epic?
```

A IA não deve criar uma hierarquia nova sem confirmação.

### Spec precisa de categoria

Quando a opção `4` for escolhida, perguntar:

```text
Qual tipo de Spec você quer criar?

[1] Product / Requirements
[2] UX / Experience
[3] Architecture / Technical
[4] Implementation / Engineering
[5] Validation / QA
[6] Outra — descreva
```

Uma Spec não substitui PRD, UX ou Arquitetura existentes. Ela deve indicar se complementa, atualiza ou contradiz uma fonte anterior.

## Perguntas comuns obrigatórias

Faça estas perguntas antes das perguntas específicas. Se a resposta não se aplicar, registrar `N/A — justificativa`.

| ID | Pergunta | Por que é necessária |
|---|---|---|
| IN-01 | O que você quer fazer: criar, alterar, revisar ou cancelar? | Define a operação e o impacto esperado. |
| IN-02 | Qual tipo de artefato deve ser produzido? | Evita criar Story quando é necessário um Epic, Spec ou Decision. |
| IN-03 | Qual é o título provisório e o objetivo em uma frase? | Define a intenção sem fingir que já é requisito completo. |
| IN-04 | Qual problema está sendo resolvido e para quem? | Liga a intenção a uma persona, usuário ou stakeholder. |
| IN-05 | Qual valor ou resultado observável é esperado? | Evita trabalho sem outcome verificável. |
| IN-06 | Quais fontes sustentam o pedido? Informe ID, arquivo e seção. | Permite rastreabilidade e confirmação. |
| IN-07 | Quais fatos estão confirmados diretamente nas fontes? | Separa evidência de interpretação. |
| IN-08 | O que ainda é desconhecido, assumido ou conflitante? | Expõe lacunas antes da criação. |
| IN-09 | O que está dentro e fora do escopo? | Impede expansão silenciosa. |
| IN-10 | Qual prioridade, responsável e prazo existem? | Permite ordenar e atribuir o trabalho. |
| IN-11 | Quais itens existentes são pai, filho, relacionados ou bloqueadores? | Mantém a hierarquia e as dependências. |
| IN-12 | Como o resultado será aceito e validado? | Define evidência antes da execução. |
| IN-13 | Há restrições de produto, UX, arquitetura, segurança, dados ou operação? | Evita soluções incompatíveis. |
| IN-14 | Quem precisa revisar ou aprovar este artefato? | Define o handoff e a autoridade da decisão. |

### Formato esperado para fontes

Não aceite apenas o nome do arquivo. Peça:

```text
[PRD-004](../../01-inputs/prd.md#prd-004)
Seção: Aprovação de sugestões
Afirmação: o professor pode aprovar ou rejeitar uma sugestão.
Classificação: confirmed
```

Se a pessoa não tiver o ID ou a seção, registre a resposta como `unknown` e pergunte se deve:

```text
[1] localizar a fonte antes de continuar;
[2] salvar o pedido como draft;
[3] registrar uma pergunta aberta e bloquear o item.
```

## Perguntas específicas por artefato

### 1. Epic

Além das perguntas comuns, confirme:

- Qual outcome amplo o Epic precisa produzir?
- Qual problema de negócio ou usuário ele resolve?
- Quais personas, áreas ou sistemas são afetados?
- Quais capacidades pertencem ao Epic?
- O que explicitamente fica fora do Epic?
- Como o sucesso do Epic será medido?
- Quais Features/Stories provavelmente serão filhas?
- Quais fontes ou decisões justificam a existência do Epic?
- Qual dependência pode bloquear todo o Epic?

Não crie um Epic se ele for apenas uma lista de tarefas técnicas sem resultado.

### 2. Feature / Capability

Além das perguntas comuns, confirme:

- Qual capacidade o usuário ou negócio perceberá?
- Qual é o Epic pai?
- A Feature será uma camada formal entre Epic e Story neste projeto?
- Qual persona inicia o fluxo e qual valor recebe?
- Quais comportamentos fazem parte da Feature?
- Quais estados, permissões, erros e casos-limite são necessários?
- Quais Stories verticais demonstrariam a Feature?
- Qual é o critério para considerar a Feature completa?

Se a camada Feature não estiver aprovada, não crie arquivos em uma hierarquia nova; registre a decisão necessária.

### 3. Story

Além das perguntas comuns, confirme:

- Qual é a narrativa `Como / quero / para`?
- Qual é o Epic pai e, se existir, a Feature pai?
- Qual caminho principal deve funcionar?
- Quais erros, vazios, loading, permissões e acessibilidade se aplicam?
- Quais critérios `Given / When / Then` são observáveis?
- Quais regras de negócio e contratos de dados/API são relevantes?
- Quais Tasks são necessárias para entregar uma fatia vertical?
- Que evidência comprovará cada critério?

Uma Story não fica `ready` com apenas uma descrição de intenção.

### 4. Spec

Além das perguntas comuns, confirme:

- Qual categoria de Spec foi escolhida: Product, UX, Architecture, Implementation ou QA?
- A Spec cria uma decisão nova, detalha uma decisão existente ou altera uma fonte?
- Qual é o público consumidor da Spec?
- Quais entradas, requisitos e restrições ela deve considerar?
- Quais interfaces, contratos, estados ou exemplos precisam ser definidos?
- Quais alternativas foram consideradas e por que foram descartadas?
- O que está explicitamente fora da Spec?
- Quais artefatos serão atualizados quando a Spec for aprovada?
- Quem aprova a Spec e qual evidência demonstra que ela está completa?

Se a Spec conflitar com PRD, UX ou Arquitetura, ela deve ficar `blocked` até existir uma `DEC-*`.

### 5. Task

Além das perguntas comuns, confirme:

- Qual Story e Epic são os pais?
- Qual resultado concreto deve existir ao terminar?
- Quais arquivos, componentes, endpoints, tabelas ou documentos devem ser inspecionados?
- O que deve ser feito e o que não deve ser feito?
- Quais dependências precisam estar concluídas?
- Qual comando, cenário ou teste será executado?
- Qual evidência real será registrada?
- Em que situações a IA deve parar sem alterar o escopo?

Uma Task sem resultado e validação verificáveis fica `draft`.

### 6. Decision

Além das perguntas comuns, confirme:

- Qual contexto ou conflito exige uma decisão?
- Quais opções foram consideradas?
- Quais critérios e evidências sustentam cada opção?
- Qual opção foi escolhida e por quê?
- Quem tem autoridade para aprovar?
- Quais consequências, riscos e itens afetados existem?
- Quais documentos, dependências e perguntas devem ser atualizados?

A IA pode organizar alternativas, mas não pode registrar uma decisão como aprovada sem confirmação do responsável.

### 7. Dependency

Além das perguntas comuns, confirme:

- Qual item é a origem (`De`) e qual item é afetado (`Para`)?
- O tipo é `hard`, `decision`, `external` ou `informational`?
- Por que a relação existe?
- Qual condição objetiva desbloqueia o item?
- Quem é responsável por resolver?
- Qual fonte, pergunta ou decisão comprova a dependência?
- O destino deve ficar `blocked` enquanto ela estiver aberta?

Uma dependência sem condição de desbloqueio não está suficientemente especificada.

### 8. Alterar artefato existente

Antes de alterar, confirme:

- Qual ID e arquivo serão alterados?
- O que mudou desde a versão anterior?
- Qual fonte, decisão ou feedback causou a mudança?
- O que permanece inalterado?
- Quais Stories, Tasks, dependências, testes e documentos podem ser impactados?
- A mudança é compatível ou exige replanejamento?
- Quem revisará e aprovará a alteração?

Não sobrescreva uma decisão anterior sem registrar o histórico e o impacto.

### 9. Revisar prontidão

Para revisar um artefato, confirme:

- Qual ID ou conjunto de arquivos será revisado?
- O objetivo é revisão de conteúdo, evidência, dependência, UX, arquitetura, QA ou readiness completo?
- Quais fontes devem ser comparadas?
- Qual critério define aprovação?
- A revisão pode alterar o artefato ou apenas produzir relatório?

Por padrão, a opção `Revisar` não altera arquivos.

## Resumo para confirmação

Depois de coletar as respostas, a IA deve apresentar exatamente este tipo de resumo:

```text
RESUMO DO INTAKE

Operação: criar | alterar | revisar | cancelar
Tipo: <Epic | Feature | Story | Spec | Task | Decision | Dependency>
Título: <título>
Pai/relacionamentos: <IDs>
Objetivo/outcome: <resumo>
Persona/consumidor: <resumo>

FATOS CONFIRMADOS
- [ID](caminho#seção) — <afirmação>

DECISÕES DERIVADAS
- <decomposição autorizada> — fonte: <ID>

DESCONHECIDOS E CONFLITOS
- <Q/ASM/CONFLICT> — <impacto>

ESCOPO
Incluído: <lista>
Fora do escopo: <lista>

DEPENDÊNCIAS
- <DEP/DEC> — condição de desbloqueio: <condição>

VALIDAÇÃO E EVIDÊNCIA
- Critério/resultado: <como validar>
- Evidência esperada: <teste, comando, cenário ou artefato>

STATUS PROPOSTO: ready | draft | blocked
MOTIVO DO STATUS: <justificativa>
ARQUIVOS QUE SERÃO CRIADOS/ALTERADOS: <lista>

Confirme uma opção:
[1] CONFIRMAR CRIAÇÃO
[2] EDITAR RESPOSTAS
[3] SALVAR COMO DRAFT
[4] REGISTRAR PERGUNTAS E BLOQUEAR
[5] CANCELAR
```

## Regras da confirmação

- Só crie ou altere arquivos após `CONFIRMAR CRIAÇÃO` ou confirmação equivalente inequívoca do usuário.
- `CONFIRMAR CRIAÇÃO` não transforma `unknown` ou `conflict` em `confirmed`.
- Se houver condição obrigatória de bloqueio, a única opção válida é salvar como `draft` ou registrar e bloquear.
- Se o usuário editar uma resposta, refaça o resumo inteiro; não aplique apenas a alteração local.
- Se o usuário cancelar, não crie arquivo nem altere status.
- Registre as respostas importantes na rastreabilidade ou no registro de perguntas abertas.

## Saída quando faltam informações

Quando não houver dados suficientes, responda:

```text
Ainda não posso criar este artefato com segurança.

Faltam:
- <informação>

Por que isso importa:
- <impacto>

Escolha:
[1] fornecer a informação;
[2] salvar como draft;
[3] registrar como blocked com pergunta <Q-...>;
[4] cancelar.
```

Nunca substitua esse fluxo por uma implementação plausível.
