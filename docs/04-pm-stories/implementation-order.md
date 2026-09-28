# Ordem de implementação

A ordem planejada foi executada no MVP. Incremento `0` representa as decisões e fundações registradas antes da primeira Task.

| Ordem | Incremento/fatia vertical | Stories | Tasks | Predecessoras | Valor ou risco reduzido | Status |
|---:|---|---|---|---|---|---|
| 0 | Contratos e decisões bloqueadoras | `S01–S05` | Base + `T001–T005` | `DEC-003` a `DEC-009` | Reduziu divergência de segurança, estado, dados e UX | done |
| 1 | Acesso e autorização demonstráveis | `S01–S04` | `T001–T004` | Incremento 0 | Habilitou todos os fluxos protegidos | done |
| 2 | Gestão e validação do evento | `S05–S08`, `S19–S21` | `T005–T008`, `T019–T021` | Incremento 0 | Entregou o núcleo do produto e reduziu risco do ciclo de vida | done |
| 3 | Descoberta | `S09–S11` | `T009–T011` | `T005`, `DEC-003/005/008` | Tornou eventos encontráveis e demonstráveis | done |
| 4 | Inscrições | `S12–S16` | `T012–T016` | `T005`, `DEC-005/007/008` | Validou o caminho Aluno → inscrição → cancelamento | done |
| 5 | Sugestões e análise | `S17–S21` | `T017–T021` | `T005`, `DEC-005/006/008` | Completou participação e curadoria | done |

## Resultado

Todas as Tasks T001–T021 possuem uma evidência em `_bmad-output/implementation-artifacts/verification/` e um commit dedicado. `PRD-FR-007` foi deferido explicitamente para fora do MVP por `DEC-005`.
