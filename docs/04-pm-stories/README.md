# PM / Stories — Integrante 4

## Objetivo

Transformar Product Brief, PRD, UX e Arquitetura em trabalho pequeno, ordenado, rastreável e executável por uma IA sem exigir que ela adivinhe contexto ou decisões.

## Artefatos

| Artefato | Finalidade |
|---|---|
| `epics/` | Agrupar resultados/capacidades de negócio relacionadas. |
| `stories/` | Descrever unidades verticais de valor e aceite. |
| `tasks/` | Descrever trabalho executável e verificável. |
| `dependencies.md` | Registrar bloqueios e dependências explícitas. |
| `implementation-order.md` | Definir a sequência de implementação e o motivo. |
| `definition-of-done.md` | Definir quando uma entrega está concluída. |
| `traceability-matrix.md` | Ligar fonte, entrega, task, aceite e teste. |
| `ai-execution-guide.md` | Definir como preparar e executar uma task com IA. |

## IDs e status

### IDs

- Fontes: `PB-001`, `PRD-001`, `UX-001`, `ARCH-001`.
- Entregas: `E01`, `E02`...
- Stories: `S01`, `S02`...
- Tasks: `T001`, `T002`...
- Critérios de aceitação: `AC-S01-01`, `AC-S01-02`...
- Testes: `TEST-S01-01` ou ID equivalente definido pelo QA.

IDs não mudam quando o título, a prioridade ou a ordem mudar.

### Status permitido

`draft` → `ready` → `in-progress` → `done`

Estados alternativos: `blocked`, `cancelled`.

- `draft`: ainda falta contexto, decisão, detalhamento ou revisão.
- `ready`: pode ser executado sem adivinhação relevante.
- `in-progress`: execução iniciada.
- `blocked`: não pode avançar; a causa deve estar em `dependencies.md`.
- `done`: critérios e DoD foram verificados.
- `cancelled`: não será implementado; registre o motivo e a decisão.

## Critérios para uma story `ready`

- possui epic pai e fontes rastreáveis;
- expressa uma capacidade de uma persona e um valor observável;
- cabe em uma entrega vertical demonstrável;
- critérios de aceitação são testáveis e cobrem o caminho principal e casos relevantes;
- regras de negócio, permissões, estados de interface e contratos aplicáveis estão descritos;
- dependências e decisões em aberto estão registradas;
- tasks filhas têm resultado verificável e ordem suficiente;
- DoD específico está definido;
- a matriz de rastreabilidade foi atualizada.

## Processo do Integrante 4

1. **Receber:** catalogar fontes em `docs/01-inputs/` e conferir IDs.
2. **Extrair:** identificar outcomes, requisitos, regras, fluxos, restrições e decisões.
3. **Agrupar:** criar epics sem misturar resultados não relacionados.
4. **Decompor:** criar stories verticais, pequenas e demonstráveis.
5. **Detalhar:** criar tasks com instruções, arquivos/componentes esperados e verificação.
6. **Ordenar:** explicitar predecessoras, dependências e fatias de entrega.
7. **Rastrear:** atualizar a matriz em ambos os sentidos — fonte para entrega e entrega para fonte.
8. **Revisar:** aplicar a checklist de `definition-of-done.md` e encaminhar ao Integrante 5.

Nunca converta uma dúvida em uma decisão silenciosa. Se uma story não puder ser descrita com precisão, mantenha-a `draft` ou `blocked`.
