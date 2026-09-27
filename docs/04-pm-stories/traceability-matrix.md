# Matriz de rastreabilidade

Estado desta matriz: artefatos criados após intake confirmado, mas ainda `blocked`. Nenhum item está `ready` ou `done`.

| Fonte/ID | Link e seção | Classe | Afirmação sustentada | Epic | Feature | Story | Critério | Task | Teste/evidência | Status | Lacuna |
|---|---|---|---|---|---|---|---|---|---|---|---|
| PRD-FR-001 | [login](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-1-login-por-credenciais) | confirmed | Login por e-mail/senha | E01 | F01 | S01 | AC-S01-01/02 | T001 | [_bmad-output/implementation-artifacts/verification/T001.md](../../_bmad-output/implementation-artifacts/verification/T001.md) | done | DEC-003/009 |
| PRD-FR-002 | [conta](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-2-criação-manual-de-conta) | confirmed | Professor/Admin cria conta | E01 | F01 | S02 | AC-S02-01/02 | T002 | [_bmad-output/implementation-artifacts/verification/T002.md](../../_bmad-output/implementation-artifacts/verification/T002.md) | done | DEC-003/004 |
| PRD-FR-003 | [RBAC](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-3-controle-de-acesso-por-perfil) | confirmed | Acesso por perfil | E01 | F02 | S03 | AC-S03-01/02 | T003 | [_bmad-output/implementation-artifacts/verification/T003.md](../../_bmad-output/implementation-artifacts/verification/T003.md) | done | DEC-004/008 |
| PRD-FR-004 | [criação](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-4-criação-de-evento) | mixed | Criar Evento | E02 | F03 | S05 | AC-S05-01/02 | T005 | [_bmad-output/implementation-artifacts/verification/T005.md](../../_bmad-output/implementation-artifacts/verification/T005.md) | done | DEC-005/006 |
| PRD-FR-005 | [edição](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-5-edição-de-evento) | mixed | Editar Evento | E02 | F03 | S06 | AC-S06-01/02 | T006 | [_bmad-output/implementation-artifacts/verification/T006.md](../../_bmad-output/implementation-artifacts/verification/T006.md) | done | DEC-005/006 |
| PRD-FR-006 | [cancelamento](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-6-cancelamento-de-evento) | mixed | Cancelar Evento | E02 | F03 | S07 | AC-S07-01/02 | T007 | pendente | blocked | DEP-005 |
| PRD-FR-007 | [encerramento](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-7-encerramento-automático-de-evento) | conflict | Encerramento temporal | E02 | F03 | S07 | AC-S07-01 | T007 | pendente | blocked | DEP-004/007 |
| PRD-FR-008 | [inscritos](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-8-visualização-de-inscritos) | confirmed | Professor/Admin vê inscritos | E02 | F03 | S08 | AC-S08-01 | T008 | pendente | blocked | DEP-002/005/009 |
| PRD-FR-009 | [lista](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-9-listagem-de-eventos) | mixed | Aluno vê lista | E03 | F04 | S09 | AC-S09-01 | T009 | pendente | blocked | DEP-004/008 |
| PRD-FR-010 | [calendário](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-10-listagem-de-eventos-em-calendário) | mixed | Aluno vê calendário | E03 | F04 | S10 | AC-S10-01/02 | T010 | pendente | blocked | DEP-004/007/008 |
| PRD-FR-011 | [detalhe](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-11-detalhe-do-evento) | mixed | Detalhe e vagas | E03 | F04 | S11 | AC-S11-01/02 | T011 | pendente | blocked | DEP-006/007/008 |
| PRD-FR-012 | [inscrição](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-12-inscrição-em-evento) | confirmed | Aluno se inscreve | E03 | F05 | S12 | AC-S12-01/02 | T012 | pendente | blocked | DEP-004/005/009 |
| PRD-FR-013 | [duplicidade](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-13-prevenção-de-inscrição-duplicada) | conflict | Uma inscrição ativa | E03 | F05 | S13 | AC-S13-01 | T013 | pendente | blocked | DEP-009 |
| PRD-FR-014 | [indisponível](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-14-bloqueio-de-inscrição-em-evento-indisponível) | conflict | Bloquear evento fechado | E03 | F05 | S12 | AC-S12-02 | T012 | pendente | blocked | DEP-004 |
| PRD-FR-015 | [capacidade](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-15-respeito-ao-limite-de-vaga) | unknown | Respeitar vagas | E03 | F05 | S13 | AC-S13-02 | T013 | pendente | blocked | DEP-006/009 |
| PRD-FR-016 | [cancelar própria](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-16-cancelamento-da-própria-inscrição) | conflict | Aluno cancela inscrição | E03 | F05 | S14 | AC-S14-01/02 | T014 | pendente | blocked | DEP-005/009 |
| PRD-FR-017 | [minhas inscrições](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-17-minhas-inscrições) | mixed | Consulta própria | E03 | F05 | S15 | AC-S15-01/02 | T015 | pendente | blocked | DEP-005/008/009 |
| PRD-FR-018 | [sugestão](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-18-envio-de-sugestão) | conflict | Aluno envia sugestão | E04 | F06 | S17 | AC-S17-01/02 | T017 | pendente | blocked | DEP-006/010/011 |
| PRD-FR-019 | [fila](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-19-visualização-da-fila-de-análise) | conflict | Revisor vê pendentes | E04 | F07 | S19 | AC-S19-01/02 | T019 | pendente | blocked | DEP-002/010/011 |
| PRD-FR-020 | [aprovação](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-20-aprovação-de-sugestão) | conflict | Pré-preencher criação | E04 | F07 | S20 | AC-S20-01/02 | T020 | pendente | blocked | DEP-004/006/011 |
| PRD-FR-021 | [rejeição](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-21-rejeição-de-sugestão) | conflict | Rejeitar sem motivo | E04 | F07 | S21 | AC-S21-01/02 | T021 | pendente | blocked | DEP-006/011 |
| PRD-FR-022 | [cancelamento admin](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-22-cancelamento-de-inscrição-pelo-professoradmin) | unknown | Professor/Admin cancela inscrição | E03 | F05 | S16 | AC-S16-01 | T016 | pendente | blocked | DEP-002/005/009 |
| PRD-FR-023 | [senha](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-23-redefinição-de-senha-de-conta-existente) | unknown | Redefinir senha | E01 | F01 | S04 | AC-S04-01/02 | T004 | [_bmad-output/implementation-artifacts/verification/T004.md](../../_bmad-output/implementation-artifacts/verification/T004.md) | done | DEC-003/004 |
| PRD-FR-024 | [minhas sugestões](../../_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md#fr-24-minhas-sugestões) | conflict | Consulta própria | E04 | F06 | S18 | AC-S18-01 | T018 | pendente | blocked | DEP-010/011 |
| DEC-001 | [decisão](../../docs/00-governance/decisions.md) | confirmed | Persistência mock/localStorage | Todos | Todas | transversal | T001–T021 | pendente | blocked | Contratos ainda necessários |
| UX-001 | [fundação visual](../../docs/01-inputs/ux.md) | confirmed | Tokens e componentes visuais | Todos | Todas | transversal | T001–T021 | pendente | blocked | UX específica ausente |

## Auditoria

- Cobertura dos `PRD-FR-001` a `PRD-FR-024`: registrada.
- Cada Story possui Task correspondente: sim.
- Critérios de aceitação possuem evidência executada: T001 validada; T002–T021 pendentes.
- Nenhum artefato além de T001/S01 foi marcado `done` nesta etapa.
