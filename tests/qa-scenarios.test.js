'use strict';

// Cenários de QA / Validation — TEST-S##-## e TEST-NFR-##.
// Cada cenário referencia a Story, o critério de aceitação e a fonte normativa que valida.
// As datas são relativas ao dia de execução por DEC-016: a suíte não depende de um calendário fixo.
// Ver docs/05-qa/test-scenarios.md e docs/05-qa/findings.md.

const test = require('node:test');
const assert = require('node:assert/strict');
const Domain = require('../src/models/domain');
const Store = require('../src/models/store');

const fresh = () => Domain.createSeedData();
const SEED_STUDENT = 1;
const SEED_TEACHER = 2;
const SEED_ADMIN = 3;
const EVENT_APPROVED_WITH_CAPACITY = 1;
const EVENT_APPROVED_NO_CAPACITY = 2;
const EVENT_PENDING_BY_STUDENT = 3;

const throwsCode = (fn, code) => assert.throws(fn, (error) => error instanceof Domain.DomainError && error.code === code);

const validEventInput = (overrides = {}) => ({
  titulo: 'Evento de teste',
  descricao: 'Descrição do evento de teste.',
  dataInicio: Domain.dayOffset(60),
  dataFim: Domain.dayOffset(60),
  hora: '10:00',
  localizacao: 'Sala 1',
  capacidade: null,
  ...overrides
});

const addStudent = (data, suffix) => Domain.createAccount(data, SEED_TEACHER, {
  nome: `Aluno ${suffix}`,
  email: `aluno.${suffix}@germinare.edu.br`,
  senha: 'senhasegura',
  role: Domain.ROLES.STUDENT
});

// ---------------------------------------------------------------------------
// E01 — Acesso e contas
// ---------------------------------------------------------------------------

test('TEST-S01-01 cada papel do seed autentica e recebe a identidade correspondente', () => {
  const data = fresh();
  const cases = [
    ['aluna@germinare.edu.br', 'aluna123', Domain.ROLES.STUDENT],
    ['professor@germinare.edu.br', 'prof1234', Domain.ROLES.TEACHER],
    ['admin@germinare.edu.br', 'admin123', Domain.ROLES.ADMIN]
  ];
  for (const [email, senha, role] of cases) {
    const session = Domain.authenticate(data, email, senha);
    assert.ok(session, `credencial válida deveria autenticar: ${email}`);
    assert.equal(session.role, role);
  }
});

test('TEST-S01-02 e-mail inexistente e senha incorreta são indistinguíveis (sem enumeração)', () => {
  const data = fresh();
  const unknownEmail = Domain.authenticate(data, 'ninguem@germinare.edu.br', 'aluna123');
  const wrongPassword = Domain.authenticate(data, 'aluna@germinare.edu.br', 'senhaerrada');
  assert.equal(unknownEmail, null);
  assert.equal(wrongPassword, null);
  assert.deepEqual(unknownEmail, wrongPassword);
});

test('TEST-S01-03 e-mail é normalizado por caixa e espaços no login', () => {
  const data = fresh();
  assert.ok(Domain.authenticate(data, '  ALUNA@GERMINARE.EDU.BR  ', 'aluna123'));
});

test('TEST-S02-01 conta criada autentica imediatamente com a senha inicial', () => {
  const data = fresh();
  const created = Domain.createAccount(data, SEED_TEACHER, {
    nome: 'Novo Aluno',
    email: 'novo.aluno@germinare.edu.br',
    senha: 'senhasegura',
    role: Domain.ROLES.STUDENT
  });
  assert.equal(created.role, Domain.ROLES.STUDENT);
  assert.ok(Domain.authenticate(data, 'novo.aluno@germinare.edu.br', 'senhasegura'));
});

test('TEST-S02-02 e-mail duplicado é rejeitado mesmo com caixa diferente', () => {
  const data = fresh();
  const before = data.users.length;
  throwsCode(() => Domain.createAccount(data, SEED_TEACHER, {
    nome: 'Clone',
    email: 'ALUNA@germinare.edu.br',
    senha: 'senhasegura',
    role: Domain.ROLES.STUDENT
  }), 'DUPLICATE_EMAIL');
  assert.equal(data.users.length, before, 'nenhum registro deve ser criado na rejeição');
});

test('TEST-S02-03 dados inválidos de conta são rejeitados sem persistir', () => {
  const data = fresh();
  const before = data.users.length;
  const base = { nome: 'X', email: 'x@germinare.edu.br', senha: 'senhasegura', role: Domain.ROLES.STUDENT };
  throwsCode(() => Domain.createAccount(data, SEED_TEACHER, { ...base, nome: '   ' }), 'REQUIRED');
  throwsCode(() => Domain.createAccount(data, SEED_TEACHER, { ...base, email: 'sem-arroba' }), 'INVALID_EMAIL');
  throwsCode(() => Domain.createAccount(data, SEED_TEACHER, { ...base, senha: '1234567' }), 'WEAK_PASSWORD');
  throwsCode(() => Domain.createAccount(data, SEED_TEACHER, { ...base, role: 'DIRETOR' }), 'INVALID_ROLE');
  assert.equal(data.users.length, before);
});

test('TEST-S02-04 senha do seed respeita o mínimo de DEC-003', () => {
  for (const user of fresh().users) {
    assert.ok(user.senha.length >= Domain.MIN_PASSWORD_LENGTH, `${user.email} viola o mínimo de senha`);
  }
});

test('TEST-S03-01 aluno é negado em toda capacidade administrativa, inclusive por chamada direta', () => {
  const data = fresh();
  throwsCode(() => Domain.createAccount(data, SEED_STUDENT, validEventInput()), 'FORBIDDEN');
  throwsCode(() => Domain.resetPassword(data, SEED_STUDENT, SEED_TEACHER, 'senhasegura'), 'FORBIDDEN');
  throwsCode(() => Domain.updateEvent(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY, validEventInput()), 'FORBIDDEN');
  throwsCode(() => Domain.cancelEvent(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'FORBIDDEN');
  throwsCode(() => Domain.validateEvent(data, SEED_STUDENT, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.APPROVED), 'FORBIDDEN');
  throwsCode(() => Domain.listSubscribers(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'FORBIDDEN');
  throwsCode(() => Domain.listSuggestionQueue(data, SEED_STUDENT), 'FORBIDDEN');
});

test('TEST-S03-02 ADMIN tem paridade de capacidades com PROFESSOR (DEC-004)', () => {
  const data = fresh();
  const teacher = Domain.findUser(data, SEED_TEACHER);
  const admin = Domain.findUser(data, SEED_ADMIN);
  for (const permission of Domain.ROLE_PERMISSIONS[Domain.ROLES.TEACHER]) {
    assert.equal(Domain.hasPermission(admin, permission), true, `ADMIN deveria ter ${permission}`);
  }
  assert.equal(
    Domain.ROLE_PERMISSIONS[Domain.ROLES.ADMIN].length,
    Domain.ROLE_PERMISSIONS[Domain.ROLES.TEACHER].length,
    'DEC-004 exige paridade exata entre ADMIN e PROFESSOR'
  );
  assert.equal(Domain.hasPermission(teacher, Domain.PERMISSIONS.VALIDATE_EVENT), true);
});

test('TEST-S03-03 VALIDAR_EVENTO é a permissão única para aprovar e para negar (DEC-004)', () => {
  const approve = fresh();
  const deny = fresh();
  assert.equal(Domain.validateEvent(approve, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.APPROVED).status, Domain.EVENT_STATUS.APPROVED);
  assert.equal(Domain.validateEvent(deny, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED).status, Domain.EVENT_STATUS.DENIED);
});

test('TEST-S04-01 senha redefinida permite login e invalida a anterior', () => {
  const data = fresh();
  Domain.resetPassword(data, SEED_ADMIN, SEED_STUDENT, 'novasenha123');
  assert.ok(Domain.authenticate(data, 'aluna@germinare.edu.br', 'novasenha123'));
  assert.equal(Domain.authenticate(data, 'aluna@germinare.edu.br', 'aluna123'), null);
});

test('TEST-S04-02 nenhuma superfície de leitura expõe a senha persistida', () => {
  const data = fresh();
  const student = Domain.findUser(data, SEED_STUDENT);
  const surfaces = [
    Domain.sanitizeUser(student),
    Domain.authenticate(data, 'aluna@germinare.edu.br', 'aluna123'),
    Domain.createAccount(data, SEED_TEACHER, { nome: 'Z', email: 'z@germinare.edu.br', senha: 'senhasegura', role: Domain.ROLES.STUDENT }),
    Domain.resetPassword(data, SEED_TEACHER, SEED_STUDENT, 'outrasenha1'),
    ...Domain.listSubscribers(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY).map((item) => item.aluno),
    ...Domain.listMyEnrollments(data, SEED_STUDENT).map((item) => item.aluno),
    ...Domain.listSuggestionQueue(data, SEED_TEACHER).map((item) => item.autor)
  ];
  for (const surface of surfaces) {
    assert.ok(surface, 'superfície de leitura não deveria ser nula');
    assert.equal('senha' in surface, false, `senha vazou em ${JSON.stringify(surface)}`);
  }
});

// ---------------------------------------------------------------------------
// E02 — Ciclo de vida do evento
// ---------------------------------------------------------------------------

test('TEST-S05-01 status inicial do evento depende do papel do autor (DEC-005)', () => {
  const data = fresh();
  assert.equal(Domain.createEvent(data, SEED_STUDENT, validEventInput()).status, Domain.EVENT_STATUS.PENDING);
  assert.equal(Domain.createEvent(data, SEED_TEACHER, validEventInput()).status, Domain.EVENT_STATUS.APPROVED);
  assert.equal(Domain.createEvent(data, SEED_ADMIN, validEventInput()).status, Domain.EVENT_STATUS.APPROVED);
});

test('TEST-S05-02 evento inválido é recusado sem persistir registro incompleto', () => {
  const data = fresh();
  const before = data.events.length;
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ titulo: '  ' })), 'REQUIRED');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ descricao: '' })), 'REQUIRED');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ localizacao: '' })), 'REQUIRED');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ dataInicio: '01/12/2026' })), 'INVALID_DATE');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ dataInicio: Domain.dayOffset(70), dataFim: Domain.dayOffset(60) })), 'INVALID_DATE');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ hora: '10h' })), 'INVALID_TIME');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ capacidade: 0 })), 'INVALID_CAPACITY');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ capacidade: 2.5 })), 'INVALID_CAPACITY');
  assert.equal(data.events.length, before);
});

test('TEST-S05-03 capacidade vazia é tratada como ilimitada', () => {
  const data = fresh();
  for (const capacidade of ['', null, undefined]) {
    assert.equal(Domain.createEvent(data, SEED_TEACHER, validEventInput({ capacidade })).capacidade, null);
  }
});

test('TEST-S05-04 o autor retira a própria proposta enquanto ela está PENDENTE (DEC-014)', () => {
  const data = fresh();
  const own = Domain.createEvent(data, SEED_STUDENT, validEventInput({ titulo: 'Proposta a retirar' }));
  assert.equal(own.status, Domain.EVENT_STATUS.PENDING);

  const withdrawn = Domain.cancelEvent(data, SEED_STUDENT, own.id);
  assert.equal(withdrawn.status, Domain.EVENT_STATUS.CANCELLED);
  assert.equal(withdrawn.canceladoPor, SEED_STUDENT);
  assert.equal(data.events.filter((event) => event.status === Domain.EVENT_STATUS.PENDING).some((event) => event.id === own.id), false, 'a proposta retirada sai da fila de validação');
  throwsCode(() => Domain.validateEvent(data, SEED_TEACHER, own.id, Domain.EVENT_STATUS.APPROVED), 'INVALID_TRANSITION');
});

test('TEST-S05-05 a retirada pelo autor não vira capacidade administrativa (DEC-011/DEC-014)', () => {
  const alheio = fresh();
  throwsCode(() => Domain.cancelEvent(alheio, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'FORBIDDEN');
  throwsCode(() => Domain.cancelEvent(alheio, SEED_STUDENT, 999), 'NOT_FOUND');

  const aprovado = fresh();
  Domain.validateEvent(aprovado, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.APPROVED);
  throwsCode(() => Domain.cancelEvent(aprovado, SEED_STUDENT, EVENT_PENDING_BY_STUDENT), 'INVALID_TRANSITION');

  const negado = fresh();
  Domain.validateEvent(negado, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED);
  throwsCode(() => Domain.cancelEvent(negado, SEED_STUDENT, EVENT_PENDING_BY_STUDENT), 'INVALID_TRANSITION');
});

test('TEST-S06-01 edição válida atualiza o registro persistido', () => {
  const data = fresh();
  const updated = Domain.updateEvent(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY, validEventInput({ titulo: 'Clube de Leitura — nova edição' }));
  assert.equal(updated.titulo, 'Clube de Leitura — nova edição');
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_NO_CAPACITY).titulo, 'Clube de Leitura — nova edição');
  assert.equal(updated.atualizadoPor, SEED_TEACHER);
});

test('TEST-S06-02 capacidade abaixo das inscrições ativas é recusada, mas o limite exato é aceito', () => {
  const data = fresh();
  // Duas inscrições ativas garantem que o limite testado (active - 1) continue sendo uma capacidade válida,
  // isolando CAPACITY_TOO_LOW de INVALID_CAPACITY.
  Domain.enroll(data, addStudent(data, 'capacidade').id, EVENT_APPROVED_WITH_CAPACITY);
  const active = data.enrollments.filter((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY && item.status === Domain.ENROLLMENT_STATUS.ACTIVE).length;
  assert.ok(active >= 2, 'cenário exige ao menos duas inscrições ativas');
  throwsCode(() => Domain.updateEvent(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY, validEventInput({ capacidade: active - 1 })), 'CAPACITY_TOO_LOW');
  assert.equal(Domain.updateEvent(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY, validEventInput({ capacidade: active })).capacidade, active);
});

test('TEST-S06-03 evento CANCELADO é terminal para edição', () => {
  const data = fresh();
  Domain.cancelEvent(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY);
  throwsCode(() => Domain.updateEvent(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY, validEventInput()), 'TERMINAL_EVENT');
});

test('TEST-S06-04 evento NEGADO é terminal para edição (DEC-013)', () => {
  const data = fresh();
  Domain.validateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED);
  throwsCode(() => Domain.updateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, validEventInput({ titulo: 'Título alterado após negar' })), 'TERMINAL_EVENT');
  const event = Domain.getEvent(data, EVENT_PENDING_BY_STUDENT);
  assert.equal(event.status, Domain.EVENT_STATUS.DENIED);
  assert.notEqual(event.titulo, 'Título alterado após negar', 'a recusa preserva o registro original');
});

test('TEST-S07-01 cancelamento de evento APROVADO registra autor e data', () => {
  const data = fresh();
  const cancelled = Domain.cancelEvent(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY);
  assert.equal(cancelled.status, Domain.EVENT_STATUS.CANCELLED);
  assert.equal(cancelled.canceladoPor, SEED_TEACHER);
  assert.ok(cancelled.canceladoEm);
});

test('TEST-S07-02 somente evento APROVADO pode ser cancelado (DEC-011)', () => {
  const pending = fresh();
  throwsCode(() => Domain.cancelEvent(pending, SEED_TEACHER, EVENT_PENDING_BY_STUDENT), 'INVALID_TRANSITION');

  const denied = fresh();
  Domain.validateEvent(denied, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED);
  throwsCode(() => Domain.cancelEvent(denied, SEED_TEACHER, EVENT_PENDING_BY_STUDENT), 'INVALID_TRANSITION');

  const twice = fresh();
  Domain.cancelEvent(twice, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY);
  throwsCode(() => Domain.cancelEvent(twice, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY), 'INVALID_TRANSITION');
});

test('TEST-S07-03 cancelar evento preserva as inscrições e fecha novas entradas', () => {
  const data = fresh();
  const before = data.enrollments.filter((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY).length;
  Domain.cancelEvent(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY);
  assert.equal(data.enrollments.filter((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY).length, before);
  const student = addStudent(data, 'pos-cancelamento');
  throwsCode(() => Domain.enroll(data, student.id, EVENT_APPROVED_WITH_CAPACITY), 'UNAVAILABLE_EVENT');
});

test('TEST-S07-04 validação só aceita decisões previstas e só a partir de PENDENTE', () => {
  const data = fresh();
  throwsCode(() => Domain.validateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.CANCELLED), 'INVALID_TRANSITION');
  throwsCode(() => Domain.validateEvent(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY, Domain.EVENT_STATUS.APPROVED), 'INVALID_TRANSITION');
  Domain.validateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.APPROVED);
  throwsCode(() => Domain.validateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED), 'INVALID_TRANSITION');
});

test('TEST-S08-01 lista de inscritos exige permissão e preserva registros cancelados', () => {
  const data = fresh();
  throwsCode(() => Domain.listSubscribers(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'FORBIDDEN');
  const enrollment = data.enrollments.find((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY);
  Domain.cancelEnrollment(data, SEED_TEACHER, enrollment.id, true);
  const list = Domain.listSubscribers(data, SEED_TEACHER, EVENT_APPROVED_WITH_CAPACITY);
  assert.equal(list.some((item) => item.status === Domain.ENROLLMENT_STATUS.CANCELLED), true);
});

// ---------------------------------------------------------------------------
// E03 — Descoberta e inscrições
// ---------------------------------------------------------------------------

test('TEST-S09-01 a lista pública permanece restrita a APROVADO e CANCELADO', () => {
  const data = fresh();
  const own = Domain.createEvent(data, SEED_STUDENT, validEventInput({ titulo: 'Proposta do aluno' }));
  assert.equal(own.status, Domain.EVENT_STATUS.PENDING);
  // Filtro aplicado por app-controller.js:renderEvents.
  const visible = Domain.listEvents(data).filter((event) => [Domain.EVENT_STATUS.APPROVED, Domain.EVENT_STATUS.CANCELLED].includes(event.status));
  assert.equal(visible.some((event) => event.id === own.id), false, 'proposta pendente não entra na agenda pública');
});

test('TEST-S09-03 o autor acompanha a própria proposta em "Minhas propostas" (DEC-015)', () => {
  const data = fresh();
  const own = Domain.createEvent(data, SEED_STUDENT, validEventInput({ titulo: 'Proposta acompanhada' }));
  const mine = Domain.listMyEvents(data, SEED_STUDENT);
  const found = mine.find((event) => event.id === own.id);
  assert.ok(found, 'o autor enxerga a própria proposta');
  assert.equal(found.status, Domain.EVENT_STATUS.PENDING);

  Domain.validateEvent(data, SEED_TEACHER, own.id, Domain.EVENT_STATUS.DENIED);
  assert.equal(Domain.listMyEvents(data, SEED_STUDENT).find((event) => event.id === own.id).status, Domain.EVENT_STATUS.DENIED, 'o desfecho da validação chega ao autor');

  const outro = addStudent(data, 'sem-propostas');
  assert.equal(Domain.listMyEvents(data, outro.id).length, 0, 'a superfície é isolada por autor');
});

test('TEST-S09-02 busca filtra por título, descrição e local sem diferenciar caixa', () => {
  const data = fresh();
  assert.equal(Domain.listEvents(data, { search: 'BIBLIOTECA' }).length, 1);
  assert.equal(Domain.listEvents(data, { search: 'oficinas' }).length, 1);
  assert.equal(Domain.listEvents(data, { search: 'inexistente' }).length, 0);
  assert.equal(Domain.listEvents(data, { status: Domain.EVENT_STATUS.PENDING }).length, 1);
});

test('TEST-S10-01 evento permanece íntegro entre lista e detalhe', () => {
  const data = fresh();
  const fromList = Domain.listEvents(data).find((event) => event.id === EVENT_APPROVED_WITH_CAPACITY);
  const fromDetail = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY);
  assert.deepEqual(fromList, fromDetail, 'lista e calendário consomem a mesma fonte do detalhe');
  assert.match(fromDetail.dataInicio, /^\d{4}-\d{2}-\d{2}$/, 'data ISO é a referência temporal do MVP');
});

test('TEST-S11-01 vagas restantes refletem apenas inscrições ativas', () => {
  const data = fresh();
  const event = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY);
  const active = data.enrollments.filter((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY && item.status === Domain.ENROLLMENT_STATUS.ACTIVE).length;
  assert.equal(event.vagasRestantes, event.capacidade - active);
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_NO_CAPACITY).vagasRestantes, null, 'sem capacidade não há contagem de vagas');
});

test('TEST-S11-02 evento inexistente retorna ausência sem alterar dados', () => {
  const data = fresh();
  const snapshot = JSON.stringify(data);
  assert.equal(Domain.getEvent(data, 9999), null);
  assert.equal(JSON.stringify(data), snapshot);
});

test('TEST-S12-01 inscrição em evento APROVADO é persistida e reduz a disponibilidade', () => {
  const data = fresh();
  const student = addStudent(data, 'inscricao');
  const before = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes;
  const enrollment = Domain.enroll(data, student.id, EVENT_APPROVED_WITH_CAPACITY);
  assert.equal(enrollment.status, Domain.ENROLLMENT_STATUS.ACTIVE);
  assert.ok(enrollment.data_inscricao);
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes, before - 1);
});

test('TEST-S12-02 inscrição é recusada em qualquer status fora de APROVADO', () => {
  const data = fresh();
  const student = addStudent(data, 'indisponivel');
  throwsCode(() => Domain.enroll(data, student.id, EVENT_PENDING_BY_STUDENT), 'UNAVAILABLE_EVENT');

  Domain.validateEvent(data, SEED_TEACHER, EVENT_PENDING_BY_STUDENT, Domain.EVENT_STATUS.DENIED);
  throwsCode(() => Domain.enroll(data, student.id, EVENT_PENDING_BY_STUDENT), 'UNAVAILABLE_EVENT');

  Domain.cancelEvent(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY);
  throwsCode(() => Domain.enroll(data, student.id, EVENT_APPROVED_NO_CAPACITY), 'UNAVAILABLE_EVENT');

  throwsCode(() => Domain.enroll(data, student.id, 9999), 'NOT_FOUND');
});

test('TEST-S12-03 somente quem tem INSCREVER_EVENTO consegue se inscrever', () => {
  const data = fresh();
  throwsCode(() => Domain.enroll(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY), 'FORBIDDEN');
  throwsCode(() => Domain.enroll(data, SEED_ADMIN, EVENT_APPROVED_NO_CAPACITY), 'FORBIDDEN');
});

test('TEST-S13-01 segunda inscrição ativa do mesmo aluno é rejeitada sem duplicar registro', () => {
  const data = fresh();
  const before = data.enrollments.length;
  throwsCode(() => Domain.enroll(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'DUPLICATE_ENROLLMENT');
  assert.equal(data.enrollments.length, before);
});

test('TEST-S13-02 evento sem capacidade aceita o volume de referência do PRD (1000 inscrições)', () => {
  const data = fresh();
  for (let index = 0; index < 1000; index += 1) {
    const student = addStudent(data, `volume-${index}`);
    Domain.enroll(data, student.id, EVENT_APPROVED_NO_CAPACITY);
  }
  const active = data.enrollments.filter((item) => item.eventoId === EVENT_APPROVED_NO_CAPACITY && item.status === Domain.ENROLLMENT_STATUS.ACTIVE).length;
  assert.ok(active >= 1000, `esperado ao menos 1000 inscrições ativas, obtido ${active}`);
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_NO_CAPACITY).vagasRestantes, null);
});

test('TEST-S13-03 disputa pela última vaga aceita exatamente a capacidade restante', () => {
  const data = fresh();
  const event = Domain.createEvent(data, SEED_TEACHER, validEventInput({ titulo: 'Disputa', capacidade: 2 }));
  const students = Array.from({ length: 12 }, (_, index) => addStudent(data, `disputa-${index}`));
  const accepted = students.filter((student) => {
    try { Domain.enroll(data, student.id, event.id); return true; } catch (_error) { return false; }
  });
  assert.equal(accepted.length, 2);
  assert.equal(Domain.getEvent(data, event.id).vagasRestantes, 0);
});

test('TEST-S14-01 aluno cancela a própria inscrição, libera vaga e pode se reinscrever', () => {
  const data = fresh();
  const enrollment = data.enrollments.find((item) => item.alunoId === SEED_STUDENT && item.eventoId === EVENT_APPROVED_WITH_CAPACITY);
  const before = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes;
  const cancelled = Domain.cancelEnrollment(data, SEED_STUDENT, enrollment.id, false);
  assert.equal(cancelled.status, Domain.ENROLLMENT_STATUS.CANCELLED);
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes, before + 1);

  const again = Domain.enroll(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY);
  assert.equal(again.status, Domain.ENROLLMENT_STATUS.ACTIVE);
  assert.notEqual(again.id, enrollment.id, 'reinscrição cria registro novo e preserva o histórico');
});

test('TEST-S14-02 aluno não cancela inscrição de outro aluno nem repete cancelamento', () => {
  const data = fresh();
  const other = addStudent(data, 'alheio');
  const enrollment = Domain.enroll(data, other.id, EVENT_APPROVED_NO_CAPACITY);
  throwsCode(() => Domain.cancelEnrollment(data, SEED_STUDENT, enrollment.id, false), 'FORBIDDEN');
  Domain.cancelEnrollment(data, other.id, enrollment.id, false);
  throwsCode(() => Domain.cancelEnrollment(data, other.id, enrollment.id, false), 'ALREADY_CANCELLED');
});

test('TEST-S15-01 lista de inscrições isola alunos distintos', () => {
  const data = fresh();
  const other = addStudent(data, 'isolamento-inscricao');
  Domain.enroll(data, other.id, EVENT_APPROVED_NO_CAPACITY);
  const mine = Domain.listMyEnrollments(data, other.id);
  assert.equal(mine.length, 1);
  assert.equal(mine.every((item) => item.alunoId === other.id), true);
  assert.equal(Domain.listMyEnrollments(data, SEED_STUDENT).some((item) => item.alunoId === other.id), false);
});

test('TEST-S15-02 inscrições canceladas permanecem visíveis com o estado atual', () => {
  const data = fresh();
  const enrollment = data.enrollments.find((item) => item.alunoId === SEED_STUDENT);
  Domain.cancelEnrollment(data, SEED_STUDENT, enrollment.id, false);
  const found = Domain.listMyEnrollments(data, SEED_STUDENT).find((item) => item.id === enrollment.id);
  assert.equal(found.status, Domain.ENROLLMENT_STATUS.CANCELLED);
  assert.ok(found.evento, 'a inscrição mantém o vínculo com o evento');
});

test('TEST-S16-01 cancelamento administrativo libera vaga e exige permissão própria', () => {
  const data = fresh();
  const enrollment = data.enrollments.find((item) => item.eventoId === EVENT_APPROVED_WITH_CAPACITY);
  const before = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes;
  throwsCode(() => Domain.cancelEnrollment(data, SEED_STUDENT, enrollment.id, true), 'FORBIDDEN');
  const cancelled = Domain.cancelEnrollment(data, SEED_ADMIN, enrollment.id, true);
  assert.equal(cancelled.canceladoPor, SEED_ADMIN);
  assert.equal(Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).vagasRestantes, before + 1);
});

// ---------------------------------------------------------------------------
// E04 — Sugestões e curadoria
// ---------------------------------------------------------------------------

test('TEST-S17-01 sugestão nasce PENDENTE, com autor e sem vínculo de evento', () => {
  const data = fresh();
  const suggestion = Domain.submitSuggestion(data, SEED_STUDENT, { titulo: 'Torneio de xadrez', descricao: 'Campeonato entre turmas.' });
  assert.equal(suggestion.status, Domain.SUGGESTION_STATUS.PENDING);
  assert.equal(suggestion.autorId, SEED_STUDENT);
  assert.equal(suggestion.eventoId, null);
  assert.equal(suggestion.revisadoPor, null);
});

test('TEST-S17-02 sugestão inválida é recusada sem persistir', () => {
  const data = fresh();
  const before = data.suggestions.length;
  throwsCode(() => Domain.submitSuggestion(data, SEED_STUDENT, { titulo: '  ', descricao: 'x' }), 'REQUIRED');
  throwsCode(() => Domain.submitSuggestion(data, SEED_STUDENT, { titulo: 'x', descricao: '' }), 'REQUIRED');
  assert.equal(data.suggestions.length, before);
});

test('TEST-S18-01 lista de sugestões isola alunos distintos', () => {
  const data = fresh();
  const other = addStudent(data, 'isolamento-sugestao');
  Domain.submitSuggestion(data, other.id, { titulo: 'Ideia da outra pessoa', descricao: 'Conteúdo privado.' });
  const mine = Domain.listMySuggestions(data, SEED_STUDENT);
  assert.equal(mine.every((item) => item.autorId === SEED_STUDENT), true);
  assert.equal(mine.some((item) => item.titulo === 'Ideia da outra pessoa'), false, 'sugestão de colega não pode vazar');
  assert.equal(Domain.listMySuggestions(data, other.id).length, 1);
});

test('TEST-S19-01 fila mostra somente pendentes, com autor, e é negada ao aluno', () => {
  const data = fresh();
  throwsCode(() => Domain.listSuggestionQueue(data, SEED_STUDENT), 'FORBIDDEN');
  const queue = Domain.listSuggestionQueue(data, SEED_TEACHER);
  assert.equal(queue.every((item) => item.status === Domain.SUGGESTION_STATUS.PENDING), true);
  assert.equal(queue.every((item) => Boolean(item.autor && item.autor.nome)), true);
});

test('TEST-S20-01 aprovar sugestão não publica evento automaticamente', () => {
  const data = fresh();
  const eventsBefore = data.events.length;
  const approved = Domain.reviewSuggestion(data, SEED_TEACHER, 1, Domain.SUGGESTION_STATUS.APPROVED);
  assert.equal(approved.status, Domain.SUGGESTION_STATUS.APPROVED);
  assert.equal(approved.revisadoPor, SEED_TEACHER);
  assert.equal(data.events.length, eventsBefore, 'a criação do evento continua sendo um passo explícito');
  assert.equal(Domain.listSuggestionQueue(data, SEED_TEACHER).some((item) => item.id === 1), false);
});

test('TEST-S20-02 evento criado a partir de sugestão aprovada guarda vínculo bidirecional', () => {
  const data = fresh();
  const approved = Domain.reviewSuggestion(data, SEED_TEACHER, 1, Domain.SUGGESTION_STATUS.APPROVED);
  const event = Domain.createEvent(data, SEED_TEACHER, validEventInput({ titulo: approved.titulo, descricao: approved.descricao, suggestionId: approved.id }));
  assert.equal(event.suggestionId, approved.id);
  assert.equal(data.suggestions.find((item) => item.id === approved.id).eventoId, event.id);
});

test('TEST-S21-01 rejeição dispensa motivo, sai da fila e não é reaberta', () => {
  const data = fresh();
  const rejected = Domain.reviewSuggestion(data, SEED_TEACHER, 1, Domain.SUGGESTION_STATUS.REJECTED);
  assert.equal(rejected.status, Domain.SUGGESTION_STATUS.REJECTED);
  assert.ok(rejected.revisadoEm);
  assert.equal(Domain.listSuggestionQueue(data, SEED_TEACHER).some((item) => item.id === 1), false);
  throwsCode(() => Domain.reviewSuggestion(data, SEED_TEACHER, 1, Domain.SUGGESTION_STATUS.APPROVED), 'INVALID_TRANSITION');
});

test('TEST-S21-02 revisão é decisão explícita de quem tem permissão (SM-C1)', () => {
  const data = fresh();
  throwsCode(() => Domain.reviewSuggestion(data, SEED_STUDENT, 1, Domain.SUGGESTION_STATUS.APPROVED), 'FORBIDDEN');
  throwsCode(() => Domain.reviewSuggestion(data, SEED_STUDENT, 1, Domain.SUGGESTION_STATUS.REJECTED), 'FORBIDDEN');
  throwsCode(() => Domain.reviewSuggestion(data, SEED_TEACHER, 1, Domain.SUGGESTION_STATUS.PENDING), 'INVALID_TRANSITION');
  assert.equal(data.suggestions.find((item) => item.id === 1).status, Domain.SUGGESTION_STATUS.PENDING);
});

// ---------------------------------------------------------------------------
// Transversais
// ---------------------------------------------------------------------------

test('TEST-NFR-01 dados ausentes, inválidos ou corrompidos restauram o seed', () => {
  for (const raw of [null, '{corrompido', JSON.stringify({ version: 99 }), JSON.stringify({ version: 1, users: 'x' })]) {
    const storage = Store.createMemoryStorage(raw === null ? {} : { [Store.DATA_KEY]: raw });
    const store = Store.createStore(storage);
    const data = store.read();
    assert.equal(data.users.length, 3, 'seed deve ser restaurado');
    assert.equal(data.events.length, 3);
  }
});

test('TEST-NFR-02 estado persistido sobrevive à releitura e a sessão é limpa no logout', () => {
  const storage = Store.createMemoryStorage();
  const store = Store.createStore(storage);
  store.ensure();
  store.transact((data) => Domain.createEvent(data, SEED_TEACHER, validEventInput({ titulo: 'Persistido entre leituras' })));
  assert.equal(store.read().events.some((event) => event.titulo === 'Persistido entre leituras'), true);

  Store.setSession(storage, { id: SEED_STUDENT });
  assert.deepEqual(Store.getSession(storage), { userId: SEED_STUDENT });
  Store.setSession(storage, null);
  assert.equal(Store.getSession(storage), null);
});

test('TEST-NFR-03 operação recusada não deixa efeito colateral no estado', () => {
  const data = fresh();
  const snapshot = JSON.stringify(data);
  throwsCode(() => Domain.enroll(data, SEED_STUDENT, EVENT_PENDING_BY_STUDENT), 'UNAVAILABLE_EVENT');
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ titulo: '' })), 'REQUIRED');
  throwsCode(() => Domain.cancelEvent(data, SEED_STUDENT, EVENT_APPROVED_WITH_CAPACITY), 'FORBIDDEN');
  assert.equal(JSON.stringify(data), snapshot);
});

test('TEST-NFR-04 criação recusa data de início no passado; edição não aplica a regra (DEC-016)', () => {
  const data = fresh();
  // ENCERRADO continua deferido por DEC-005; a regra aqui é validação de entrada, não recálculo por tempo.
  throwsCode(() => Domain.createEvent(data, SEED_TEACHER, validEventInput({ dataInicio: Domain.dayOffset(-1), dataFim: Domain.dayOffset(1) })), 'PAST_DATE');
  assert.equal(Domain.createEvent(data, SEED_TEACHER, validEventInput({ dataInicio: Domain.today(), dataFim: Domain.today() })).status, Domain.EVENT_STATUS.APPROVED, 'o próprio dia é aceito');

  const updated = Domain.updateEvent(data, SEED_TEACHER, EVENT_APPROVED_NO_CAPACITY, validEventInput({ titulo: 'Correção pós-início', dataInicio: Domain.dayOffset(-5), dataFim: Domain.dayOffset(-5) }));
  assert.equal(updated.dataInicio, Domain.dayOffset(-5), 'a correção de um evento já iniciado permanece possível');

  const seedDates = fresh().events.map((event) => event.dataInicio);
  for (const date of seedDates) assert.ok(date >= Domain.today(), `o dado mockado ${date} deveria estar no futuro`);
});

test('TEST-NFR-05 leitura do domínio não expõe referência mutável do estado', () => {
  const data = fresh();
  const event = Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY);
  event.titulo = 'Mutação externa';
  assert.notEqual(Domain.getEvent(data, EVENT_APPROVED_WITH_CAPACITY).titulo, 'Mutação externa');
});
