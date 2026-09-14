# Ordem de implementação

A ordem deve privilegiar valor cedo, redução de risco e desbloqueio de trabalho posterior. Não ordene apenas pela facilidade técnica.

## Incrementos

| Ordem | Incremento/fatia vertical | Stories | Tasks | Predecessoras | Valor ou risco reduzido | Status |
|---:|---|---|---|---|---|---|
| 1 | A definir após recebimento das fontes | `S...` | `T...` | — | A preencher | planejado |

## Critérios de ordenação

1. decisões e fundações que bloqueiam várias entregas;
2. caminho mínimo de valor demonstrável;
3. validações de domínio, permissões e erros;
4. integrações e migrações;
5. observabilidade, segurança, acessibilidade e performance;
6. refinamentos e melhorias não bloqueadoras.

## Regras

- Cada item precisa apontar para stories e tasks existentes.
- Uma task só pode iniciar quando suas predecessoras estiverem `done` ou quando a dependência for explicitamente informativa.
- Se a ordem mudar, registre o motivo na descrição do incremento ou em uma decisão.
- A ordem é uma hipótese de execução e pode evoluir; os IDs não devem ser renumerados.
