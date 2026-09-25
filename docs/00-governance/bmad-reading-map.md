# Mapa de leitura do BMAD

Este documento define quais pastas devem ser lidas em cada etapa do projeto. O objetivo não é fazer a IA ler todos os arquivos do repositório indiscriminadamente, mas separar método, fontes de produto, governança e outputs.

## Regra central

```text
_bmad/.agents/.claude = como a IA trabalha.
_bmad-output/planning-artifacts = o que foi decidido sobre o produto.
docs = como o projeto organiza, rastreia e valida as decisões.
```

Configurações, skills, templates, scripts e reviews orientam o processo ou ajudam na validação. Eles não viram requisitos de produto automaticamente.

## Camadas do repositório

### 1. Método, runtime e skills

Leia quando precisar entender o fluxo BMAD, executar uma skill ou resolver um problema de configuração:

| Caminho | Papel | Tratamento |
|---|---|---|
| `_bmad/config.toml` | Configuração instalada do BMAD | Ler para conhecer caminhos e módulos; tratar como read-only. |
| `_bmad/config.user.toml` | Configurações do usuário | Ler quando houver comportamento específico do ambiente. |
| `_bmad/core/` | Recursos e configuração central do BMAD | Ler apenas para entender o runtime/roteamento necessário. |
| `_bmad/bmm/` | Módulo BMM, skills e configuração do método | Ler a skill/workflow relacionado à etapa atual. |
| `_bmad/_config/` | Manifestos, catálogos e routing de skills | Ler `bmad-help.csv`/`module-help.csv` para localizar a skill correta; não é fonte de requisito. |
| `_bmad/custom/` | Customizações duráveis do projeto | Ler quando uma customização estiver relacionada à etapa ou ao comportamento observado. |
| `_bmad/scripts/` | Resolução de configuração, renderização, memlog e utilitários | Ler somente para diagnosticar execução/configuração; não é fonte de produto. |
| `.agents/skills/` | Skills para o harness de agentes | Ler a skill ativa e seus assets/steps/references. |
| `.claude/skills/` | Skills para o harness Claude | Ler a skill ativa e seus assets/steps/references. |
| `git-specialist` | Skill Git espelhada em `_bmad/bmm/ship/git-specialist/`, `.agents/skills/` e `.claude/skills/` | Ler antes de criar branch, commit ou PR; aplicar as confirmações e bloqueios definidos. |

Não existe uma política de precedência registrada entre `.agents/skills/` e `.claude/skills/`. Se o harness ativo não estiver claro, compare a skill correspondente nos dois caminhos e registre qualquer conflito; não escolha silenciosamente uma versão.

`_bmad/bmm/v6-shims/` é compatibilidade legada. Só deve ser lido quando um comando ou referência antiga exigir; não é o protocolo primário.

### 2. Fontes de produto e requisitos

São as fontes normativas para entender o que o produto deve fazer:

| Caminho | Papel | O que ler |
|---|---|---|
| `_bmad-output/planning-artifacts/briefs/<projeto>/brief.md` | Product Brief final | Problema, visão, personas, escopo, fora de escopo e sucesso. |
| `_bmad-output/planning-artifacts/briefs/<projeto>/addendum.md` | Contexto e racional do Brief | Riscos, pesquisa e decisões adiadas; não promover automaticamente a requisito. |
| `_bmad-output/planning-artifacts/prds/<projeto>/prd.md` | PRD final | Visão operacional, jornadas, glossário, FRs, NFRs, escopo, non-goals, questões e suposições. |
| `docs/01-inputs/prd.md` | Entrypoint canônico do PRD | Mapa de IDs padrão e link para o PRD completo; não substitui a leitura do PRD. |
| `docs/01-inputs/ux.md` | UX aprovada, quando existir | Fluxos, telas, estados, acessibilidade e contratos de experiência. |
| `docs/01-inputs/architecture.md` | Arquitetura aprovada, quando existir | Stack, entidades, APIs, invariantes, segurança e decisões técnicas. |

Estado atual deste repositório:

- Product Brief final existe em `_bmad-output/planning-artifacts/briefs/`.
- PRD final existe em `_bmad-output/planning-artifacts/prds/`.
- `docs/01-inputs/prd.md` é o entrypoint para esse PRD.
- UX e Arquitetura ainda não estão presentes como fontes preenchidas em `docs/01-inputs/`.
- A ausência de UX/Arquitetura bloqueia somente os artefatos que dependem dessas informações; não autoriza a IA a inventar estados, contratos ou decisões técnicas.

### 3. Governança e planejamento

Leia sempre que for criar, alterar ou revisar um artefato:

- `docs/00-governance/evidence-protocol.md` — evidência, classificação, intake e bloqueios.
- `docs/00-governance/bmad-reading-map.md` — este mapa de leitura.
- `docs/00-governance/assumptions-and-open-questions.md` — lacunas, premissas e perguntas.
- `docs/00-governance/glossary.md` — vocabulário aprovado.
- `docs/04-pm-stories/intake-menu.md` — perguntas e confirmação antes da criação.
- `docs/04-pm-stories/README.md` — processo, IDs e status.
- `docs/04-pm-stories/ai-execution-guide.md` — execução segura por IA.
- `docs/04-pm-stories/dependencies.md` — bloqueios e dependências.
- `docs/04-pm-stories/implementation-order.md` — sequência de implementação.
- `docs/04-pm-stories/definition-of-done.md` — condições de conclusão.
- `docs/04-pm-stories/traceability-matrix.md` — ligação entre fontes e execução.
- `docs/templates/` — forma do artefato; templates não são requisitos.

### 4. Outputs de implementação

Leia somente quando a etapa já tiver chegado ao planejamento executável ou à implementação:

- `_bmad-output/implementation-artifacts/` — sprint status, contexto de implementação e artefatos de execução, quando existirem.
- Epics, Stories e Tasks concretos em `docs/04-pm-stories/epics/`, `stories/` e `tasks/`.
- Código, testes e configuração reais do projeto durante uma Task `ready`/`in-progress`.

A presença de um arquivo de output não prova que o conteúdo foi aprovado. Use status, evidência, DoD e rastreabilidade.

## Ordem de leitura por etapa

| Etapa | Ler primeiro | Ler depois/condicionalmente | Não tratar como requisito |
|---|---|---|---|
| Orientação inicial | `README.md`, este mapa, `_bmad/config.toml`, `_bmad/_config/bmad-help.csv` | Configuração de usuário e customizações | Configuração e manifestos |
| Brief/discovery | Brief completo | Addendum e memlog para contexto/auditoria | Pesquisa e memlog isolados |
| Requirements/PRD | `docs/01-inputs/prd.md`, depois `prd.md` completo | Reconciliações, reviews e addendum para identificar gaps | Review, reconciliação e `[ASSUMPTION]` sem promoção explícita |
| UX | PRD + `docs/01-inputs/ux.md` ou output UX | Skill UX, referências e reviews UX | Mock ou screenshot sem contrato aprovado |
| Arquitetura | PRD + UX disponíveis + `docs/01-inputs/architecture.md` ou spine | Skill Architecture, decisões e código existente | Template, research ou sugestão de stack |
| PM/Stories | Evidence Protocol, Intake Menu, PRD, UX/Arquitetura disponíveis | Templates, dependências, ordem, DoD e matriz | Intenção curta ou template preenchido |
| Readiness/Sprint | Epics, Stories, Tasks, dependências, DoD e matriz | Skill de sprint/readiness e QA | Status de template ou arquivo vazio |
| Build/Review/QA | Task pronta, Story/Epic pai, ACs, fontes e código | Skills de build, code review, QA e walkthrough | Review como autorização para mudar escopo |

## Precedência por assunto

Não use uma regra simplista de “o arquivo mais recente sempre vence”. A autoridade é definida pelo assunto:

1. **Brief:** problema, visão, personas e escopo de alto nível.
2. **PRD:** requisitos funcionais, regras, NFRs, jornadas, escopo e non-goals.
3. **UX:** experiência, fluxos, telas, estados e acessibilidade.
4. **Arquitetura:** contratos técnicos, invariantes, dados, segurança e decisões de implementação.
5. **Epic/Story/Task:** decomposição executável; não pode adicionar comportamento sem fonte ou decisão.
6. **QA/Reviews:** validação, achados e evidências; não alteram o produto sozinhos.

Quando houver conflito, classifique como `conflict`, registre `Q-*`/`DEC-*` e bloqueie apenas os itens afetados. Nunca faça overwrite silencioso.

## O que não é fonte normativa automaticamente

Os itens abaixo podem informar uma investigação, mas não autorizam uma implementação sem promoção rastreável:

- `_bmad` e skills: instruções de processo, não comportamento do produto;
- `.agents/skills` e `.claude/skills`: instruções para harnesses, não requisitos;
- templates em `docs/templates/`: estrutura, não conteúdo aprovado;
- `addendum.md`: contexto e racional, salvo decisão/requisito promovido;
- `.memlog.md`: auditoria da sessão, não decisão aprovada isoladamente;
- `review-*.md` e `reconcile-*.md`: achados e comparação, não novos requisitos;
- README, comentários e exemplos: orientação, salvo quando referenciados como decisão oficial;
- código ou comportamento existente: evidência do estado atual, não autorização automática para manter ou expandir escopo.

## Relatório mínimo de leitura

Antes de criar ou executar um artefato, registre:

```text
Fontes normativas lidas:
- <caminho> — <IDs/seções>

Fontes condicionais lidas:
- <caminho> — <motivo>

Fontes não normativas consultadas:
- <caminho> — <qual informação foi extraída>

Fontes ausentes:
- <caminho> — <impacto>

Unknowns/conflicts:
- <Q/DEC> — <impacto>

Status de leitura: aprovado | draft | blocked
```
