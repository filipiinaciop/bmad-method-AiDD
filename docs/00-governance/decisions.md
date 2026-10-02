# Registro de decisões — PM / Stories

| ID | Data | Decisão | Impacto | Responsável | Status |
|---|---|---|---|---|---|
| `DEC-001` | 2026-09-16 | A entrega acadêmica usará dados mockados e `localStorage` para persistência local no navegador. PostgreSQL/Aiven não será usado no MVP atual. | Atualiza a estratégia de persistência da arquitetura e bloqueia tarefas que dependam de banco remoto, migrações ou FK como implementação. | Grupo 3 | confirmada |
| `DEC-002` | 2026-09-16 | A decomposição adotará a hierarquia formal `Epic → Feature → Story → Task`. | Features serão artefatos formais entre épicos e stories. | Grupo 3 | confirmada |
| `DEC-003` | 2026-09-04 | A autenticação do MVP é mockada: contas seed e contas criadas ficam em `localStorage`; a sessão corrente também fica localmente; não há autenticação de produção. A senha mínima de demonstração é de 8 caracteres e usuários são sanitizados antes de serem exibidos. | Desbloqueia T001, T002 e T004 sem criar infraestrutura de autenticação externa. | Grupo 3 | confirmada |
| `DEC-004` | 2026-09-04 | `ADMIN` terá as mesmas capacidades do `PROFESSOR` no MVP, mantendo Role separada para futura diferenciação. `VALIDAR_EVENTO` continua sendo a permissão única para decidir `APROVADO` ou `NEGADO`. | Desbloqueia T003, T008, T016 e T019. | Grupo 3 | confirmada |
| `DEC-005` | 2026-09-04 | Ciclo de Evento: Aluno cria como `PENDENTE`; Professor/Admin cria como `APROVADO`; Professor/Admin valida `PENDENTE` para `APROVADO` ou `NEGADO`; cancelamento produz `CANCELADO`; eventos cancelados não reabrem nem aceitam inscrição. `ENCERRADO` fica fora do MVP. | Resolve `CONFLICT-001` e desbloqueia T005–T012/T020. | Grupo 3 | confirmada |
| `DEC-006` | 2026-09-04 | O modelo lógico do MVP inclui capacidade opcional no Evento, autor da criação, entidade Sugestão com autor/status e vínculo opcional com Evento. | Resolve `CONFLICT-003` e desbloqueia T005, T006 e T017–T021. | Grupo 3 | confirmada |
| `DEC-007` | 2026-09-04 | Inscrições possuem `ATIVA` ou `CANCELADA`; o histórico permanece; somente uma inscrição ativa por Aluno/Evento; após cancelar, o Aluno pode se inscrever novamente; cancelamentos liberam capacidade. | Resolve `CONFLICT-002` e desbloqueia T012–T016. | Grupo 3 | confirmada |
| `DEC-008` | 2026-09-04 | UX-002 define shell autenticado, navegação por permissão, lista/calendário/detalhe, formulários, fila, estados de loading/vazio/erro, feedback e requisitos responsivos/acessíveis usando UX-001. | Desbloqueia Tasks de UI e validação visual. | Grupo 3 | confirmada |
| `DEC-009` | 2026-09-04 | Comandos oficiais do MVP: `npm install`, `npm start`, `npm test`, `npm run lint`, `npm run build`; o servidor Express serve a aplicação no mesmo projeto e não expõe API REST pública. | Resolve `ARCH-OQ-008` e define a validação de execução. | Grupo 3 | confirmada |
| `DEC-010` | 2026-09-04 | Professor/Admin possuem capacidades de descoberta e podem criar contas de qualquer Role prevista no MVP, incluindo ADMIN; a diferenciação futura fica fora do MVP. | Corrige a matriz positiva de RBAC e mantém o perfil administrativo unificado. | Grupo 3 | confirmada |
| `DEC-011` | 2026-09-04 | Somente eventos `APROVADO` podem ser cancelados; `PENDENTE` e `NEGADO` permanecem fora dessa transição. | Mantém o ciclo de vida explícito e impede transições inválidas. Escopo ajustado por `DEC-014` para o autor da proposta. | Grupo 3 | confirmada |
| `DEC-012` | 2026-09-04 | A garantia de capacidade do MVP cobre chamadas repetidas no mesmo store/página; atomicidade entre abas do navegador não é prometida por `localStorage` e fica como evolução futura. | Evita declarar uma garantia transacional que o mecanismo local não fornece. | Grupo 3 | confirmada |
| `DEC-013` | 2026-10-01 | `NEGADO` é terminal para edição. `EVENTO.updateEvent` recusa alterações em eventos `CANCELADO` e `NEGADO`; a interface só oferece "Editar" nos estados que o domínio aceita. | Fecha `QA-010` e a dependência de `QA-008`. Alinha a interface de gestão ao domínio. | Grupo 3 | confirmada |
| `DEC-014` | 2026-10-01 | O Aluno autor pode retirar a própria proposta enquanto ela estiver `PENDENTE`, por meio da permissão `CANCELAR_PROPRIO_EVENTO`, com verificação de autoria em `EVENTO.criadoPor`. O Aluno continua sem `EDITAR_EVENTO` e sem `CANCELAR_EVENTO`. Retirar a proposta produz `CANCELADO`. | Fecha `QA-011`. Ajusta o escopo de `DEC-011`: a restrição "somente `APROVADO` pode ser cancelado" permanece para a capacidade administrativa; o autor atua apenas sobre a própria proposta `PENDENTE`. | Grupo 3 | confirmada |
| `DEC-015` | 2026-10-01 | O Aluno autor possui a superfície "Minhas propostas", pela permissão `VISUALIZAR_MINHAS_PROPOSTAS`, listando os eventos que criou com o status atual, simétrica a "Minhas sugestões" e "Minhas inscrições". | Fecha `QA-009`. Completa o fluxo de validação do lado do autor, exigido por `AGENTS.md`. | Grupo 3 | confirmada |
| `DEC-016` | 2026-10-01 | `createEvent` recusa data de início anterior ao dia corrente, como validação de entrada. A edição não aplica essa regra, para permitir correções em eventos já iniciados. Os dados mockados passam a usar datas relativas ao dia de execução. | Fecha `QA-012` sem reintroduzir `ENCERRADO`, que permanece deferido por `DEC-005`. Evita que a demonstração apodreça com datas fixas. | Grupo 3 | confirmada |
| `DEC-017` | 2026-10-01 | O feedback global é temporário: mensagens de sucesso desaparecem após 5 segundos e mensagens de erro após 10 segundos. Uma nova mensagem cancela o temporizador da anterior. O feedback de formulário segue a mesma regra. | Fecha `QA-020`. Complementa o contrato de `UX-002`, que exigia mensagem compreensível mas não definia duração. | Grupo 3 | confirmada |
| `DEC-018` | 2026-10-01 | A navegação mantém uma pilha de histórico interno. O botão de retorno volta para a tela anterior real, não para um destino fixo. A pilha é limitada a 20 entradas e é zerada no login e no logout. | Fecha `QA-021`. Complementa `UX-002`, que definia a navegação por permissão mas não o comportamento de retorno. | Grupo 3 | confirmada |
| `DEC-019` | 2026-10-01 | O logout limpa os campos do formulário de autenticação e o feedback de credencial. Os campos usam `autocomplete="off"`; como navegadores podem ignorar essa dica em campos de senha, a limpeza programática é a defesa principal. | Fecha `QA-022`. Evita que credenciais permaneçam visíveis para o próximo usuário em máquina compartilhada, conforme a intenção de `PRD-NFR-001` e `DEC-003`. | Grupo 3 | confirmada |

## Regras

- Uma decisão confirmada deve ser refletida na fonte canônica afetada e nos artefatos dependentes.
- `DEC-001` está refletida em `docs/01-inputs/architecture.md` como `ARCH-DEC-017`.
- `DEC-006` e `DEC-007` estão refletidas em `ARCH-DATA-005`, `ARCH-DATA-006`, `ARCH-DATA-007` e `ARCH-SEC-005`.
- `DEC-013` a `DEC-016` estão refletidas em `ARCH-DATA-005`, `ARCH-SEC-004` e `ARCH-SEC-005`.
- `DEC-017` a `DEC-019` estão refletidas em `UX-002`, nas seções de estados comportamentais e navegação.
- As decisões do MVP resolvem os conflitos de ciclo de vida, segurança, RBAC, UX, dados e execução; limitações futuras permanecem registradas em `DEC-012` e no escopo deferido.

## Regras adicionais do MVP

- Datas são armazenadas como strings ISO de data/hora e interpretadas no horário local do navegador; não há suporte multi-timezone nesta versão.
- Dados inválidos ou corrompidos no `localStorage` devem restaurar o seed mockado sem quebrar a aplicação.
- O estado terminal de um evento depende da origem da transição: `CANCELADO` encerra qualquer fluxo; `NEGADO` encerra a edição por `DEC-013`, mas permanece visível para o autor por `DEC-015`.

## Origem de `DEC-013` a `DEC-016`

As quatro decisões foram registradas a partir dos achados abertos em [`docs/05-qa/findings.md`](../05-qa/findings.md). A camada de QA não decide — ela apresentou o vazio normativo, e o Grupo 3 escolheu a alternativa registrada acima antes de qualquer alteração em `src/`.
