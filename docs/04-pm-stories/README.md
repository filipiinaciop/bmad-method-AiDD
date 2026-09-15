# PM / Stories — Integrante 4

## Objetivo

Transformar Product Brief, PRD, UX e Arquitetura em trabalho pequeno, ordenado, rastreável e executável por uma IA sem exigir que ela adivinhe contexto ou decisões.

O planejamento deve controlar a incerteza, não escondê-la. Cada item precisa deixar claro o que é fato confirmado, o que é decomposição derivada e o que ainda é desconhecido.

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
| `intake-menu.md` | Coletar e confirmar informações antes de criar ou alterar qualquer artefato. |
| `../00-governance/evidence-protocol.md` | Definir evidências, classificação e condições de bloqueio. |

## IDs e status

### IDs

- Fontes: `PB-001`, `PRD-001`, `PRD-FR-001`, `PRD-UJ-001`, `PRD-NFR-001`, `UX-001`, `ARCH-001`.
- Decisões: `DEC-001`, `DEC-002`...
- Entregas: `E01`, `E02`...
- Stories: `S01`, `S02`...
- Tasks: `T001`, `T002`...
- Critérios de aceitação: `AC-S01-01`, `AC-S01-02`...
- Testes: `TEST-S01-01` ou ID equivalente definido pelo QA.
- Dependências: `DEP-001`, `DEP-002`...
- Perguntas: `Q-001`, `Q-002`...

IDs não mudam quando o título, a prioridade ou a ordem mudar.

### Status permitido

`draft` → `ready` → `in-progress` → `done`

Estados alternativos: `blocked`, `cancelled`.

- `draft`: ainda falta contexto, decisão, detalhamento ou revisão.
- `ready`: evidências, escopo, critérios, dependências e validação são suficientes para execução sem adivinhação relevante.
- `in-progress`: execução iniciada.
- `blocked`: não pode avançar; a causa deve estar em `dependencies.md` e, quando aplicável, no registro de perguntas abertas.
- `done`: critérios, evidências e DoD foram verificados.
- `cancelled`: não será implementado; registre o motivo e a decisão.

## Critérios para uma story `ready`

- possui epic pai e fontes rastreáveis por ID, caminho e seção;
- cada comportamento importante está classificado como confirmado, derivado, desconhecido ou conflito;
- expressa uma capacidade de uma persona e um valor observável;
- cabe em uma entrega vertical demonstrável;
- critérios de aceitação são testáveis e cobrem o caminho principal e casos relevantes;
- regras de negócio, permissões, estados de interface e contratos aplicáveis estão descritos;
- dependências e decisões em aberto estão registradas;
- nenhuma pergunta ou conflito bloqueador foi transformado em decisão silenciosa;
- tasks filhas têm resultado verificável, escopo limitado e ordem suficiente;
- cada task possui condições explícitas para bloquear a execução;
- DoD específico está definido;
- a matriz de rastreabilidade foi atualizada.

## Regras anti-alucinação

- **Sem fonte, não existe story:** toda story deve apontar para uma fonte ou decisão registrada.
- **Caminho não é evidência:** `docs/arquivo.md` precisa ser acompanhado por ID, seção e afirmação sustentada.
- **Desconhecido não é decisão:** lacunas ficam em `Q-*` ou `ASM-*`; não devem ser preenchidas por uma suposição escondida.
- **Conflito bloqueia:** fontes incompatíveis exigem `DEC-*` antes de a implementação ficar `ready`.
- **Sem critério, não existe task:** trabalho sem comportamento observável permanece `draft`.
- **Sem validação, não está concluído:** `done` exige comando, cenário, teste ou outra evidência verificável.

O protocolo completo está em [`docs/00-governance/evidence-protocol.md`](../00-governance/evidence-protocol.md).

## Processo do Integrante 4

0. **Abrir o intake:** mostrar [`intake-menu.md`](intake-menu.md), escolher o tipo de artefato e coletar as respostas comuns e específicas.
1. **Confirmar:** apresentar o resumo do intake, separar fatos, decisões derivadas, desconhecidos e conflitos e aguardar confirmação explícita.
2. **Receber:** catalogar fontes em `docs/01-inputs/` e conferir IDs.
3. **Extrair:** identificar outcomes, requisitos, regras, fluxos, restrições e decisões.
4. **Ancorar:** registrar cada afirmação usada com ID, caminho, seção e classificação da evidência.
5. **Separar:** listar fatos confirmados, decomposições derivadas, desconhecidos e conflitos.
6. **Agrupar:** criar epics sem misturar resultados não relacionados.
7. **Decompor:** criar stories verticais, pequenas e demonstráveis.
8. **Detalhar:** criar tasks com instruções, arquivos/componentes esperados, condições de bloqueio e verificação.
9. **Ordenar:** explicitar predecessoras, dependências e fatias de entrega.
10. **Rastrear:** atualizar a matriz em ambos os sentidos — fonte para entrega e entrega para fonte.
11. **Revisar:** aplicar o preflight do protocolo e a checklist de `definition-of-done.md` antes de encaminhar ao Integrante 5.

Nunca converta uma dúvida em uma decisão silenciosa. Se uma story não puder ser descrita com precisão ou evidência suficiente, mantenha-a `draft` ou `blocked`.
