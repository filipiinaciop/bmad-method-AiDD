'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Domain = require('../src/models/domain');
const Store = require('../src/models/store');

const fresh = () => Domain.createSeedData();
const throwsCode = (fn, code) => assert.throws(fn, (error) => error instanceof Domain.DomainError && error.code === code);

test('T001 autentica conta válida e rejeita credencial sem enumeração', () => {
  const data = fresh();
  assert.equal(Domain.authenticate(data, 'aluna@germinare.edu.br', 'aluna123').role, Domain.ROLES.STUDENT);
  assert.equal(Domain.authenticate(data, 'nao-existe@germinare.edu.br', 'aluna123'), null);
  assert.equal(Domain.authenticate(data, 'aluna@germinare.edu.br', 'senha-incorreta'), null);
});

test('T002 cria conta válida e impede e-mail duplicado', () => {
  const data = fresh();
  const account = Domain.createAccount(data, 3, { nome: 'Nova Aluna', email: 'nova@germinare.edu.br', senha: 'novasenha', role: Domain.ROLES.STUDENT });
  assert.equal(account.email, 'nova@germinare.edu.br');
  assert.equal(Domain.authenticate(data, account.email, 'novasenha').id, account.id);
  throwsCode(() => Domain.createAccount(data, 3, { nome: 'Outra', email: account.email, senha: 'outrasenha', role: Domain.ROLES.STUDENT }), 'DUPLICATE_EMAIL');
});

test('T003 aplica RBAC, inclusive para acesso direto', () => {
  const data = fresh();
  assert.equal(Domain.hasPermission(data.users[0], Domain.PERMISSIONS.VALIDATE_EVENT), false);
  throwsCode(() => Domain.validateEvent(data, 1, 3, Domain.EVENT_STATUS.APPROVED), 'FORBIDDEN');
  assert.equal(Domain.hasPermission(data.users[1], Domain.PERMISSIONS.VALIDATE_EVENT), true);
});

test('T004 permite redefinição autorizada e login com a nova senha', () => {
  const data = fresh();
  Domain.resetPassword(data, 3, 1, 'senha-nova');
  assert.equal(Domain.authenticate(data, 'aluna@germinare.edu.br', 'senha-nova').id, 1);
  assert.equal(Domain.sanitizeUser(data.users[0]).senha, undefined);
  throwsCode(() => Domain.resetPassword(data, 1, 2, 'outrasenha'), 'FORBIDDEN');
});

test('T005 cria evento com status por papel e valida campos', () => {
  const data = fresh();
  const studentEvent = Domain.createEvent(data, 1, { titulo: 'Evento aluno', descricao: 'Descrição', dataInicio: Domain.dayOffset(31), dataFim: Domain.dayOffset(31), hora: '09:00', localizacao: 'Sala 1', capacidade: 5 });
  const teacherEvent = Domain.createEvent(data, 2, { titulo: 'Evento professor', descricao: 'Descrição', dataInicio: Domain.dayOffset(32), dataFim: Domain.dayOffset(33), hora: '09:00', localizacao: 'Sala 2', capacidade: '' });
  assert.equal(studentEvent.status, Domain.EVENT_STATUS.PENDING);
  assert.equal(teacherEvent.status, Domain.EVENT_STATUS.APPROVED);
  throwsCode(() => Domain.createEvent(data, 2, { titulo: '', descricao: 'x', dataInicio: Domain.dayOffset(32), dataFim: Domain.dayOffset(32), hora: '09:00', localizacao: 'x' }), 'REQUIRED');
  throwsCode(() => Domain.createEvent(data, 2, { titulo: 'x', descricao: 'x', dataInicio: Domain.dayOffset(33), dataFim: Domain.dayOffset(32), hora: '09:00', localizacao: 'x' }), 'INVALID_DATE');
});

test('T006 edita evento e não reduz capacidade abaixo de inscrições', () => {
  const data = fresh();
  throwsCode(() => Domain.updateEvent(data, 2, 1, { titulo: 'Atualizado', descricao: 'Descrição', dataInicio: Domain.dayOffset(14), dataFim: Domain.dayOffset(14), hora: '14:00', localizacao: 'Auditório', capacidade: 0 }), 'INVALID_CAPACITY');
  const updated = Domain.updateEvent(data, 2, 1, { titulo: 'Atualizado', descricao: 'Descrição', dataInicio: Domain.dayOffset(14), dataFim: Domain.dayOffset(14), hora: '14:00', localizacao: 'Auditório', capacidade: 2 });
  assert.equal(updated.titulo, 'Atualizado');
});

test('T007 cancela evento sem apagar histórico e bloqueia inscrição', () => {
  const data = fresh();
  Domain.cancelEvent(data, 2, 1);
  assert.equal(data.events.find((event) => event.id === 1).status, Domain.EVENT_STATUS.CANCELLED);
  throwsCode(() => Domain.enroll(data, 1, 1), 'UNAVAILABLE_EVENT');
});

test('T008 lista inscritos somente para papel autorizado e preserva cancelamento', () => {
  const data = fresh();
  assert.equal(Domain.listSubscribers(data, 2, 1).length, 1);
  throwsCode(() => Domain.listSubscribers(data, 1, 1), 'FORBIDDEN');
  Domain.cancelEnrollment(data, 2, 1, true);
  assert.equal(Domain.listSubscribers(data, 2, 1)[0].status, Domain.ENROLLMENT_STATUS.CANCELLED);
});

test('T009-T011 lista, filtra, calcula detalhe e trata registro ausente', () => {
  const data = fresh();
  assert.equal(Domain.listEvents(data, { status: Domain.EVENT_STATUS.APPROVED }).length, 2);
  assert.equal(Domain.listEvents(data, { status: Domain.EVENT_STATUS.APPROVED, search: 'tecnologia' })[0].id, 1);
  assert.equal(Domain.getEvent(data, 999), null);
  assert.equal(Domain.getEvent(data, 1).vagasRestantes, 2);
});

test('T012-T013 aceita inscrição, rejeita duplicidade e respeita capacidade', () => {
  const data = fresh();
  Domain.createEvent(data, 2, { titulo: 'Lotado', descricao: 'x', dataInicio: Domain.dayOffset(61), dataFim: Domain.dayOffset(61), hora: '10:00', localizacao: 'x', capacidade: 1 });
  Domain.createAccount(data, 3, { nome: 'Aluno Dois', email: 'dois@germinare.edu.br', senha: 'senhadois', role: Domain.ROLES.STUDENT });
  const enrollment = Domain.enroll(data, 4, 4);
  assert.equal(enrollment.status, Domain.ENROLLMENT_STATUS.ACTIVE);
  throwsCode(() => Domain.enroll(data, 4, 4), 'DUPLICATE_ENROLLMENT');
  throwsCode(() => Domain.enroll(data, 1, 4), 'EVENT_FULL');
});

test('T014-T016 cancela própria inscrição, permite reinscrição e restringe cancelamento administrativo', () => {
  const data = fresh();
  Domain.cancelEnrollment(data, 1, 1);
  assert.equal(data.enrollments[0].status, Domain.ENROLLMENT_STATUS.CANCELLED);
  Domain.enroll(data, 1, 1);
  throwsCode(() => Domain.cancelEnrollment(data, 1, 2, true), 'FORBIDDEN');
  Domain.cancelEnrollment(data, 2, 2, true);
  assert.equal(data.enrollments[1].status, Domain.ENROLLMENT_STATUS.CANCELLED);
  assert.equal(Domain.listMyEnrollments(data, 1).length, 3);
});

test('T017-T021 persiste sugestões, filtra fila e abre decisões sem mutar indevidamente', () => {
  const data = fresh();
  const suggestion = Domain.submitSuggestion(data, 1, { titulo: 'Nova sugestão', descricao: 'Descrição da ideia' });
  assert.equal(suggestion.status, Domain.SUGGESTION_STATUS.PENDING);
  assert.equal(Domain.listSuggestionQueue(data, 2).some((item) => item.id === suggestion.id), true);
  throwsCode(() => Domain.listSuggestionQueue(data, 1), 'FORBIDDEN');
  const approved = Domain.reviewSuggestion(data, 2, suggestion.id, Domain.SUGGESTION_STATUS.APPROVED);
  assert.equal(approved.status, Domain.SUGGESTION_STATUS.APPROVED);
  assert.equal(Domain.listSuggestionQueue(data, 2).some((item) => item.id === suggestion.id), false);
  const rejected = Domain.reviewSuggestion(data, 2, 1, Domain.SUGGESTION_STATUS.REJECTED);
  assert.equal(rejected.status, Domain.SUGGESTION_STATUS.REJECTED);
});

test('persistência recupera seed quando localStorage está ausente ou corrompido', () => {
  const storage = Store.createMemoryStorage({ [Store.DATA_KEY]: '{corrompido' });
  const store = Store.createStore(storage);
  assert.equal(store.read().users.length, 3);
  store.transact((data) => { data.events[0].titulo = 'Persistido'; });
  assert.equal(store.read().events[0].titulo, 'Persistido');
});

test('T013 concorrência repetida nunca excede a capacidade', () => {
  const data = fresh();
  const event = Domain.createEvent(data, 2, { titulo: 'Evento concorrente', descricao: 'x', dataInicio: Domain.dayOffset(70), dataFim: Domain.dayOffset(70), hora: '10:00', localizacao: 'x', capacidade: 1 });
  const students = Array.from({ length: 10 }, (_, index) => Domain.createAccount(data, 3, { nome: `Aluno ${index}`, email: `concorrente${index}@germinare.edu.br`, senha: 'senhasegura', role: Domain.ROLES.STUDENT }));
  const accepted = students.filter((student) => {
    try { Domain.enroll(data, student.id, event.id); return true; } catch (_error) { return false; }
  });
  assert.equal(accepted.length, 1);
  assert.equal(data.enrollments.filter((item) => item.eventoId === event.id && item.status === Domain.ENROLLMENT_STATUS.ACTIVE).length, 1);
});

test('regras revisadas mantêm capacidades administrativas e transições válidas', () => {
  const data = fresh();
  assert.equal(Domain.hasPermission(data.users[1], Domain.PERMISSIONS.VIEW_EVENTS), true);
  assert.equal(Domain.hasPermission(data.users[2], Domain.PERMISSIONS.VIEW_CALENDAR), true);
  const adminAccount = Domain.createAccount(data, 2, { nome: 'Novo Admin', email: 'novo.admin@germinare.edu.br', senha: 'senhanova', role: Domain.ROLES.ADMIN });
  assert.equal(adminAccount.role, Domain.ROLES.ADMIN);
  throwsCode(() => Domain.cancelEvent(data, 2, 3), 'INVALID_TRANSITION');
});
