# Ordem de implementação

A ordem abaixo é uma sequência planejada. Todos os incrementos estão `blocked` até suas dependências decision/hard serem resolvidas.

| Ordem | Incremento/fatia vertical | Stories | Tasks | Predecessoras | Valor ou risco reduzido | Status |
|---:|---|---|---|---|---|---|
| 0 | Contratos e decisões bloqueadoras | `S01–S05` como referências de impacto | `T001–T005` após decisões | `DEP-001` a `DEP-008` | Reduz divergência de segurança, estado, dados e UX antes do código | blocked |
| 1 | Acesso e autorização demonstráveis | `S01–S04` | `T001–T004` | Incremento 0 | Habilita todos os fluxos protegidos | blocked |
| 2 | Gestão e validação do evento | `S05–S08`, `S19–S21` | `T005–T008`, `T019–T021` | `DEP-004`, `DEP-005`, `DEP-006`, `DEP-010`, `DEP-011` | Entrega o núcleo do produto e reduz risco do ciclo de vida | blocked |
| 3 | Descoberta | `S09–S11` | `T009–T011` | `DEP-004`, `DEP-007`, `DEP-008` | Torna eventos encontráveis e demonstráveis | blocked |
| 4 | Inscrições | `S12–S16` | `T012–T016` | `DEP-005`, `DEP-008`, `DEP-009` | Valida o caminho principal Aluno → inscrição → cancelamento | blocked |
| 5 | Sugestões e análise | `S17–S21` | `T017–T021` | `DEP-004`, `DEP-006`, `DEP-010`, `DEP-011` | Completa o canal de participação e a curadoria | blocked |

## Critérios de ordenação

1. Resolver decisões que bloqueiam várias entregas.
2. Implementar primeiro o caminho mínimo de valor demonstrável.
3. Validar domínio, permissões, persistência local e erros.
4. Cobrir responsividade, acessibilidade, privacidade e integridade.
5. Atualizar a matriz após cada fatia.

A ordem não autoriza iniciar uma task bloqueada nem escolher um contrato ausente.
