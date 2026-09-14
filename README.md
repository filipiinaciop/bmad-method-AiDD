# bmad-method-AiDD

Repositório para organizar um processo de desenvolvimento orientado por requisitos, experiência, arquitetura e execução assistida por IA.

## Objetivo

Este repositório separa as responsabilidades dos cinco integrantes e transforma as decisões de produto em trabalho executável, rastreável e validável pela IA.

O foco inicial do **Integrante 4 — PM / Stories** é converter as entradas dos Integrantes 1, 2 e 3 em:

- epics orientados a resultado;
- stories pequenas, verticais e demonstráveis;
- tasks executáveis por uma pessoa ou agente de IA;
- dependências e ordem de implementação;
- definição de pronto;
- rastreabilidade de `Requirement -> Epic -> Story -> Task`;
- evidências suficientes para impedir que lacunas sejam preenchidas por suposição.

## Responsabilidades dos integrantes

| Integrante | Responsabilidade | Entrada/saída principal |
|---|---|---|
| 1 | Product / Requirements | Product Brief, PRD, requisitos e regras de negócio |
| 2 | UX / Product Experience | Fluxos, telas, estados e experiência |
| 3 | Architect | Stack, arquitetura, dados, API, segurança e decisões técnicas |
| 4 | PM / Stories | Epics, stories, tasks, dependências, ordem e rastreabilidade |
| 5 | QA / Validation | Revisões, cenários, critérios e Implementation Readiness |

## Estrutura

```text
docs/
├── 00-governance/                 # Convenções, glossário, evidências e dúvidas
│   └── evidence-protocol.md       # Classificação, preflight e condições de bloqueio
├── 01-inputs/                     # Entradas dos Integrantes 1, 2 e 3
├── 04-pm-stories/                 # Artefatos produzidos pelo Integrante 4
│   ├── intake-menu.md             # Perguntas e confirmação antes de criar artefatos
│   ├── epics/
│   ├── stories/
│   ├── tasks/
│   ├── dependencies.md
│   ├── implementation-order.md
│   ├── definition-of-done.md
│   ├── traceability-matrix.md
│   └── ai-execution-guide.md
└── templates/                     # Modelos para novos artefatos
```

## Fluxo de trabalho

1. Os Integrantes 1–3 versionam as fontes em `docs/01-inputs/`.
2. Cada fonte recebe IDs estáveis, como `PB-001`, `PRD-001`, `UX-001` e `ARCH-001`, localizáveis no conteúdo.
3. O Integrante 4 registra caminho, seção e afirmação sustentada para cada fonte usada.
4. Fatos confirmados, decisões derivadas, desconhecidos e conflitos são separados explicitamente.
5. O Integrante 4 agrupa capacidades em epics (`E01`, `E02`...).
6. Cada epic é decomposto em stories (`S01`, `S02`...) com critérios de aceitação observáveis.
7. Cada story é decomposta em tasks (`T001`, `T002`...) com instruções suficientes para execução pela IA.
8. Dependências, condições de bloqueio e ordem são registradas antes de iniciar uma implementação.
9. O Integrante 5 revisa fontes, evidências, UX, arquitetura, stories e critérios antes de uma story ser marcada como `ready`.
10. A IA só deve executar tasks `ready` ou `in-progress`; itens `draft` e `blocked` exigem refinamento ou desbloqueio.
11. Nenhuma entrega é marcada como `done` sem validação e evidência real.

## Convenções essenciais

- Markdown é o formato padrão dos artefatos.
- IDs são imutáveis; títulos e nomes de arquivo podem mudar.
- Use nomes de arquivo em `kebab-case`.
- Use datas no formato ISO 8601 (`YYYY-MM-DD`).
- Referencie fontes por links relativos, IDs e seções; um caminho isolado não é evidência.
- Classifique informações como `confirmed`, `derived`, `unknown` ou `conflict`.
- Desconhecido não é decisão; conflitos bloqueiam até uma decisão `DEC-*` ser registrada.
- Diferencie claramente requisito, critério de aceitação, task e teste.
- Dúvidas e conflitos ficam registrados em `docs/00-governance/assumptions-and-open-questions.md`.
- `N/A` sempre exige justificativa.
- Sem fonte não existe story; sem critério não existe task; sem validação não está concluído.

## Começando

1. Preencha `docs/01-inputs/README.md` e adicione os documentos de entrada.
2. Leia `docs/00-governance/evidence-protocol.md`.
3. Use `docs/04-pm-stories/intake-menu.md` antes de criar ou alterar qualquer Epic, Feature, Story, Spec, Task, Decision ou Dependency.
4. Leia `docs/04-pm-stories/README.md` e `docs/04-pm-stories/ai-execution-guide.md`.
5. Copie os modelos de `docs/templates/` para criar novos epics, stories e tasks.
6. Atualize `traceability-matrix.md`, `dependencies.md` e `implementation-order.md` a cada refinamento.
7. Execute o preflight de evidências e a checklist de prontidão antes de entregar o pacote ao Integrante 5.

Este repositório contém apenas a estrutura de planejamento neste momento. Nenhum requisito de produto é inventado até que os documentos dos Integrantes 1–3 sejam adicionados.
