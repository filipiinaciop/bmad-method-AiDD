# Registro de decisões — PM / Stories

| ID | Data | Decisão | Impacto | Responsável | Status |
|---|---|---|---|---|---|
| `DEC-001` | 2026-09-16 | A entrega acadêmica usará dados mockados e `localStorage` para persistência local no navegador. PostgreSQL/Aiven não será usado no MVP atual. | Atualiza a estratégia de persistência da arquitetura e bloqueia tarefas que dependam de banco remoto, migrações ou FK como implementação. | Grupo 3 | confirmada |
| `DEC-002` | 2026-09-16 | A decomposição adotará a hierarquia formal `Epic → Feature → Story → Task`. | Features serão artefatos formais entre épicos e stories. | Grupo 3 | confirmada |

## Regras

- Uma decisão confirmada deve ser refletida na fonte canônica afetada e nos artefatos dependentes.
- `DEC-001` está refletida em `docs/01-inputs/architecture.md` como `ARCH-DEC-017`.
- As decisões ainda não resolvem os conflitos de ciclo de vida dos eventos nem as perguntas `ARCH-OQ-*` restantes.
