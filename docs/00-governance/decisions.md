# Registro de decisões — PM / Stories

| ID | Data | Decisão | Impacto | Responsável | Status |
|---|---|---|---|---|---|
| `DEC-001` | 2026-09-16 | A entrega acadêmica usará dados mockados e `localStorage` para persistência local no navegador. PostgreSQL/Aiven não será usado no MVP atual. | Atualiza a estratégia de persistência da arquitetura e bloqueia tarefas que dependam de banco remoto, migrações ou FK como implementação. | Grupo 3 | confirmada |
| `DEC-002` | 2026-09-16 | A decomposição adotará a hierarquia formal `Epic → Feature → Story → Task`. | Features serão artefatos formais entre épicos e stories. | Grupo 3 | confirmada |

## Regras

- Uma decisão confirmada deve ser refletida na fonte canônica afetada e nos artefatos dependentes.
- `DEC-001` está refletida em `docs/01-inputs/architecture.md` como `ARCH-DEC-017`.
- As decisões ainda não resolvem os conflitos de ciclo de vida dos eventos nem as perguntas `ARCH-OQ-*` restantes.

| `DEC-003` | 2026-09-04 | A autenticação do MVP é mockada: contas seed e contas criadas ficam em `localStorage`; a sessão corrente também fica localmente; não há autenticação de produção. A senha mínima de demonstração é de 8 caracteres e usuários são sanitizados antes de serem exibidos. | Desbloqueia T001, T002 e T004 sem criar infraestrutura de autenticação externa. | Grupo 3 | confirmada |
| `DEC-004` | 2026-09-04 | `ADMIN` terá as mesmas capacidades do `PROFESSOR` no MVP, mantendo Role separada para futura diferenciação. `VALIDAR_EVENTO` continua sendo a permissão única para decidir `APROVADO` ou `NEGADO`. | Desbloqueia T003, T008, T016 e T019. | Grupo 3 | confirmada |
| `DEC-005` | 2026-09-04 | Ciclo de Evento: Aluno cria como `PENDENTE`; Professor/Admin cria como `APROVADO`; Professor/Admin valida `PENDENTE` para `APROVADO` ou `NEGADO`; cancelamento produz `CANCELADO`; eventos cancelados não reabrem nem aceitam inscrição. `ENCERRADO` fica fora do MVP. | Resolve `CONFLICT-001` e desbloqueia T005–T012/T020. | Grupo 3 | confirmada |
| `DEC-006` | 2026-09-04 | O modelo lógico do MVP inclui capacidade opcional no Evento, autor da criação, entidade Sugestão com autor/status e vínculo opcional com Evento. | Resolve `CONFLICT-003` e desbloqueia T005, T006 e T017–T021. | Grupo 3 | confirmada |
| `DEC-007` | 2026-09-04 | Inscrições possuem `ATIVA` ou `CANCELADA`; o histórico permanece; somente uma inscrição ativa por Aluno/Evento; após cancelar, o Aluno pode se inscrever novamente; cancelamentos liberam capacidade. | Resolve `CONFLICT-002` e desbloqueia T012–T016. | Grupo 3 | confirmada |
| `DEC-008` | 2026-09-04 | UX-002 define shell autenticado, navegação por permissão, lista/calendário/detalhe, formulários, fila, estados de loading/vazio/erro, feedback e requisitos responsivos/acessíveis usando UX-001. | Desbloqueia Tasks de UI e validação visual. | Grupo 3 | confirmada |
| `DEC-009` | 2026-09-04 | Comandos oficiais do MVP: `npm install`, `npm start`, `npm test`, `npm run lint`, `npm run build`; o servidor Express serve a aplicação no mesmo projeto e não expõe API REST pública. | Resolve `ARCH-OQ-008` e define a validação de execução. | Grupo 3 | confirmada |

## Regras adicionais do MVP

- Datas são armazenadas como strings ISO de data/hora e interpretadas no horário local do navegador; não há suporte multi-timezone nesta versão.
- Dados inválidos ou corrompidos no `localStorage` devem restaurar o seed mockado sem quebrar a aplicação.

| `DEC-010` | 2026-09-04 | Professor/Admin possuem capacidades de descoberta e podem criar contas de qualquer Role prevista no MVP, incluindo ADMIN; a diferenciação futura fica fora do MVP. | Corrige a matriz positiva de RBAC e mantém o perfil administrativo unificado. | Grupo 3 | confirmada |
| `DEC-011` | 2026-09-04 | Somente eventos `APROVADO` podem ser cancelados; `PENDENTE` e `NEGADO` permanecem fora dessa transição. | Mantém o ciclo de vida explícito e impede transições inválidas. | Grupo 3 | confirmada |
| `DEC-012` | 2026-09-04 | A garantia de capacidade do MVP cobre chamadas repetidas no mesmo store/página; atomicidade entre abas do navegador não é prometida por `localStorage` e fica como evolução futura. | Evita declarar uma garantia transacional que o mecanismo local não fornece. | Grupo 3 | confirmada |
