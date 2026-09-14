# Dependências

Registre aqui tudo que impede ou condiciona a execução de uma story/task. Uma dependência deve ter proprietário e condição de desbloqueio.

## Tipos permitidos

- `hard`: a origem precisa terminar antes do destino.
- `decision`: depende de decisão de produto, UX ou arquitetura.
- `external`: depende de sistema, pessoa, acesso ou fornecedor externo.
- `informational`: relação útil, mas não bloqueadora.

## Registro

| ID | De | Para | Tipo | Motivo | Condição de desbloqueio | Responsável | Status | Fonte |
|---|---|---|---|---|---|---|---|---|
| DEP-001 | `A preencher` | `A preencher` | `decision` | `A preencher` | `A preencher` | `A definir` | aberta | `Q-...` |

## Regras

- `De` é o item que precisa acontecer ou ser decidido primeiro; `Para` é o item afetado.
- Use IDs de epic, story, task ou pergunta aberta, nunca apenas nomes.
- `aberta`, `em andamento`, `resolvida`, `cancelada` são os status permitidos.
- Toda dependência `hard` ou `decision` aberta deve impedir o destino de ficar `ready`.
- Ao resolver uma dependência, atualize o item bloqueado e a matriz de rastreabilidade.
