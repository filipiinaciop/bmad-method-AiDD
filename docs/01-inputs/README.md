# Entradas dos Integrantes 1–3

Esta pasta contém as fontes que o Integrante 4 transforma em trabalho executável. Substitua ou complemente os arquivos indicados abaixo quando os responsáveis entregarem seus artefatos.

O mapa de leitura das pastas BMAD está em [`../00-governance/bmad-reading-map.md`](../00-governance/bmad-reading-map.md). Ele distingue fontes normativas de skills, templates, reviews, memlogs e outputs de apoio.

## Estado atual das fontes

- **Brief:** disponível em `_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/brief.md`.
- **PRD:** disponível em `_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md`; `prd.md` nesta pasta é o entrypoint/mapa de IDs.
- **UX:** `ux.md` ainda não está preenchido.
- **Arquitetura:** canonizada em `docs/01-inputs/architecture.md`, com status `proposed` e perguntas `ARCH-OQ-*` abertas.
- **Project context:** resumo operacional canonizado em `docs/01-inputs/project-context.md`.
- **Agentes:** instruções de workspace em `AGENTS.md`.

Não trate uma fonte ausente como autorização para completar o conteúdo. Registre a dependência e bloqueie somente os artefatos que dependerem dela.

| Arquivo | Responsável | IDs esperados | Fonte de verdade |
|---|---|---|---|
| `product-brief.md` | Integrante 1 | `PB-001`, `PB-002`... | A preencher |
| `prd.md` | Integrante 1 | `PRD-001`, `PRD-FR-*`, `PRD-UJ-*`, `PRD-NFR-*`, `PRD-OQ-*`, `PRD-ASM-*` | [`_bmad-output/.../prd.md`](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md) |
| `ux.md` | Integrante 2 | `UX-001`, `UX-002`... | A preencher |
| `architecture.md` | Integrante 3 | `ARCH-001`, `ARCH-DEC-*`, `ARCH-DATA-*`, `ARCH-RULE-*`, `ARCH-OQ-*` | [`architecture.md`](./architecture.md) |
| `project-context.md` | Integrante 3 | `ARCH-CONTEXT-001` | [`project-context.md`](./project-context.md), derivado de `architecture.md` |

## Regras de recebimento

1. Não altere o conteúdo de uma fonte sem registrar o responsável e a data da mudança.
2. Cada requisito, fluxo, decisão ou restrição que precisar de rastreabilidade deve ter um ID estável.
3. Cada ID deve ser localizável no conteúdo da fonte, preferencialmente como uma âncora ou título único.
4. O Integrante 4 deve apontar para a fonte, seu ID, caminho relativo e seção, não apenas para o nome do arquivo.
5. A afirmação ligada ao ID deve ser classificada como `confirmed`, `derived`, `unknown` ou `conflict` nos artefatos de PM.
6. Conflitos entre documentos devem ser registrados em `../00-governance/assumptions-and-open-questions.md` e não resolvidos por inferência.
7. Uma fonte ausente não deve ser preenchida por suposição; registre a dependência e bloqueie o trabalho que precisar dela.
8. Mudanças na fonte devem preservar IDs ou registrar explicitamente a migração de referências.

## Checklist de handoff

- [ ] Documento possui propósito, escopo e versão/data.
- [ ] IDs estão definidos, não se repetem e podem ser encontrados no conteúdo.
- [ ] Seções têm títulos estáveis para permitir links reproduzíveis.
- [ ] Termos importantes estão no glossário.
- [ ] Decisões e dúvidas estão separadas de requisitos confirmados.
- [ ] Links internos funcionam.
- [ ] Conflitos conhecidos estão registrados.
- [ ] O responsável está disponível para responder perguntas abertas.
