# Dependências

Estas dependências foram registradas após o intake confirmado e foram resolvidas pelas decisões `DEC-003`–`DEC-009`. Dependências futuras ou fora do MVP permanecem explicitamente documentadas.

| ID | De | Para | Tipo | Motivo | Condição de desbloqueio | Responsável | Status | Fonte |
|---|---|---|---|---|---|---|---|---|
| DEP-001 | `Q-ARCH-001` | `E01`, `S01`, `S02`, `S04` | decision | Sessão, armazenamento de credencial e proteção de transporte não definidos. | Registrar decisão arquitetural e contrato de autenticação. | Integrante 3 | resolvida | [ARCH-OQ-001](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-002 | `Q-ARCH-002` | `E01`, `S03`, `S16`, `S19` | decision | Permissões concretas de ADMIN não definidas. | Confirmar matriz Role/Permission. | Integrante 3 | resolvida | [ARCH-OQ-002](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-003 | `Q-ARCH-003` | `E01`, `S01`, `S03`, `S04` | decision | Rotas, respostas, erros e fronteiras View/Controller não definidos. | Publicar contrato de interação compatível com MVC. | Integrante 3 | resolvida | [ARCH-OQ-003](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-004 | `CONFLICT-001` | `E02`, `E03`, `E04`, `S05`, `S09`, `S12`, `S20` | decision | PRD e Arquitetura divergem sobre ator e ciclo de vida do Evento. | Registrar `DEC-*` ou atualizar fontes conflitantes. | Integrantes 1 e 3 | resolvida | PRD §3/§4 versus [ARCH-SEC-007](../01-inputs/architecture.md#arch-sec-007--autorização) |
| DEP-005 | `Q-ARCH-005` | `E02`, `E03`, `S06`, `S07`, `S13`, `S14`, `S15`, `S16` | decision | Política de cancelamento, histórico e inscrição não definida. | Registrar política de transição e retenção. | Integrante 3 | resolvida | [ARCH-OQ-005](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-006 | `CONFLICT-003` | `E02`, `E04`, `S05`, `S06`, `S20`, `S21` | decision | Capacidade e entidade Sugestão exigidas no PRD não estão no modelo arquitetural. | Promover entidades/campos ou atualizar PRD. | Integrantes 1 e 3 | resolvida | [ARCH-DATA-001–006](../01-inputs/architecture.md#arch-sec-004--banco-de-dados) versus PRD §4 |
| DEP-007 | `Q-ARCH-004` | `E02`, `S05`, `S09`, `S10`, `S11` | decision | Tipo de data e timezone não definidos para comportamento temporal. | Registrar referência temporal do MVP. | Integrante 3 | resolvida | [ARCH-OQ-004](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-008 | `UX-002` | `E03`, `S09`, `S10`, `S11`, `S15`, `S18` | hard | Assets visuais existem, mas fluxos, telas e estados de produto ainda não estão especificados. | Publicar UX específica com IDs e estados observáveis. | Integrante 2 | resolvida | [UX-001](../01-inputs/ux.md) |
| DEP-009 | `CONFLICT-002` | `E03`, `S12`, `S13`, `S14`, `S15`, `S16` | decision | PRD permite re-inscrição após cancelamento; arquitetura tem unicidade permanente. | Decidir modelo de inscrição ativa/inativa. | Integrantes 1 e 3 | resolvida | PRD FR-13/FR-16 versus [ARCH-DATA-006](../01-inputs/architecture.md#arch-data-006--inscricao) |
| DEP-010 | `Q-ARCH-003` | `E04`, `S17`, `S18`, `S19`, `S20`, `S21` | decision | Contratos e persistência da Sugestão não definidos. | Especificar entidade, estados, permissões e interação. | Integrantes 2 e 3 | resolvida | [ARCH-OQ-003](../01-inputs/architecture.md#perguntas-arquiteturais-abertas) |
| DEP-011 | `CONFLICT-003` | `E04`, `S17`, `S18`, `S19`, `S20`, `S21` | decision | PRD exige histórico de Sugestão e vínculo com Evento sem entidade arquitetural. | Registrar decisão de dados e vínculo. | Integrantes 1 e 3 | resolvida | PRD Glossário/FR-20/FR-21 versus [ARCH-001](../01-inputs/architecture.md) |
| DEP-012 | `Q-ARCH-002` | `S03` | decision | Matriz de autorização ainda não permite teste completo de perfis. | Aprovar matriz RBAC e casos de negação. | Integrante 3 | resolvida | [ARCH-SEC-007](../01-inputs/architecture.md#arch-sec-007--autorização) |

## Decisão de persistência

`DEC-001` está resolvida: o MVP usa dados mockados e `localStorage`. Ela não desbloqueia automaticamente as dependências de modelo, status, segurança ou UX.
