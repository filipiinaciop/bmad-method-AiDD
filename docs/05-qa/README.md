---
id: QA-000
type: qa-index
status: done
owner: "Integrante 5 — QA / Validation"
sources: [PRD-001, UX-001, ARCH-001, E01, E02, E03, E04]
---

# QA / Validation

Esta camada revisa as fontes normativas e a implementação do Germinare Tech, produz cenários de teste executáveis, valida critérios de aceitação e regras de negócio, e executa o gate de Implementation Readiness.

## Autoridade e limites

[`docs/00-governance/bmad-reading-map.md`](../00-governance/bmad-reading-map.md#precedência-por-assunto) define, na precedência por assunto:

> **QA/Reviews:** validação, achados e evidências; não alteram o produto sozinhos.

Em consequência, esta camada:

- **faz** — lê fontes, executa comandos, observa comportamento real, registra achados com evidência, escreve cenários de teste e emite veredito de prontidão;
- **não faz** — corrigir `src/`, alterar requisitos, resolver `conflict`/`unknown` por conta própria ou promover uma fonte a `approved`.

Todo achado recebe um responsável. A correção é decisão de quem detém a autoridade sobre o assunto e deve ser registrada como `DEC-*` antes de ser implementada.

### Exceção registrada nesta entrega

`QA-015` apontou que `npm test` executava apenas `tests/domain.test.js`. Como a suíte de cenários nasceria sem execução pelo comando oficial de `DEC-009` — ou seja, evidência que não é verificável —, o script `test` do `package.json` foi ajustado para incluir os dois arquivos. A alteração é de infraestrutura de validação, não de comportamento de produto, e está detalhada em [`findings.md`](findings.md#qa-015).

## Artefatos

| Arquivo | Conteúdo |
|---|---|
| [`review-prd.md`](review-prd.md) | Revisão do PRD e dos requisitos funcionais |
| [`review-ux.md`](review-ux.md) | Revisão de UX-001/UX-002 e dos contratos de experiência |
| [`review-architecture.md`](review-architecture.md) | Revisão de ARCH-001, decisões e questões abertas |
| [`review-stories.md`](review-stories.md) | Revisão de Epics, Features, Stories e Tasks |
| [`findings.md`](findings.md) | Registro `QA-###` com severidade, evidência e responsável |
| [`test-scenarios.md`](test-scenarios.md) | Cenários `TEST-*` e mapeamento para a suíte automatizada |
| [`acceptance-criteria-validation.md`](acceptance-criteria-validation.md) | Cada `AC-*` confrontado com evidência executada |
| [`business-rules-verification.md`](business-rules-verification.md) | Verificação de `DEC-001`–`DEC-012` e das regras de `AGENTS.md` |
| [`implementation-readiness.md`](implementation-readiness.md) | Gate de prontidão e veredito |
| [`correction-validation.md`](correction-validation.md) | Protocolo e registro de reteste após correções |

## Convenções de ID

| Prefixo | Significado | Exemplo |
|---|---|---|
| `QA-###` | Achado de validação | `QA-007` |
| `TEST-S##-##` | Cenário de teste ligado a uma Story | `TEST-S13-03` |
| `TEST-NFR-##` | Cenário transversal, ligado a um NFR | `TEST-NFR-04` |

## Severidade

| Severidade | Critério |
|---|---|
| `Alta` | Quebra um fluxo de usuário, contradiz uma decisão confirmada ou torna a rastreabilidade não confiável. |
| `Média` | Comportamento não especificado, divergência entre fonte e implementação, ou lacuna de cobertura. |
| `Baixa` | Imprecisão, inconsistência de metadado ou efeito sem impacto funcional observável. |

Severidade descreve o impacto no gate de prontidão. Não é prioridade de backlog — a priorização pertence ao Integrante 4.

## Status de um achado

`aberto` → `em-correção` → `revalidado` ou `aceito-com-registro`.

Um achado só passa a `revalidado` com evidência de reteste em [`correction-validation.md`](correction-validation.md). `aceito-com-registro` exige uma `DEC-*` que assuma o comportamento conscientemente.

## Evidência desta revisão

Comandos oficiais de `DEC-009`, executados na raiz do projeto:

```text
npm ci                → added 73 packages, found 0 vulnerabilities
npm test              → 68 tests, 68 pass, 0 fail
npm run lint          → Lint OK: 6 arquivos JavaScript verificados
npm run build         → Build OK: baseline MVC, assets e referências completos
npm start (PORT=3999) → / 200 · /models/domain.js 200 · /models/store.js 200
                        /controllers/app-controller.js 200 · /public/styles.css 200
                        /rota-inexistente 404 · x-powered-by ausente
```

Observações de comportamento que não são cobertas por comando foram obtidas por execução direta do domínio e estão citadas no achado correspondente com arquivo e função.
