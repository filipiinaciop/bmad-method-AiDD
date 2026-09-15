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
- Registre a fonte da dependência com ID, caminho e seção quando ela vier de um documento.
- `aberta`, `em andamento`, `resolvida`, `cancelada` são os status permitidos.
- Toda dependência `hard` ou `decision` aberta deve impedir o destino de ficar `ready`.
- Uma dependência sem condição verificável de desbloqueio mantém o destino `blocked`.
- Ao resolver uma dependência, atualize o item bloqueado, a evidência usada e a matriz de rastreabilidade.
- Não feche uma dependência por inferência; a resolução precisa ser confirmada por fonte, decisão ou validação.
