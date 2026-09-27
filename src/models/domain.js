'use strict';

(function attachDomain(root, factory) {
  const api = factory();
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.GerminareDomain = api;
})(typeof window !== 'undefined' ? window : globalThis, function createDomain() {
  const EVENT_STATUS = Object.freeze({ PENDING: 'PENDENTE', APPROVED: 'APROVADO', DENIED: 'NEGADO', CANCELLED: 'CANCELADO' });
  const ENROLLMENT_STATUS = Object.freeze({ ACTIVE: 'ATIVA', CANCELLED: 'CANCELADA' });
  const SUGGESTION_STATUS = Object.freeze({ PENDING: 'PENDENTE', APPROVED: 'APROVADA', REJECTED: 'REJEITADA' });
  const ROLES = Object.freeze({ STUDENT: 'ALUNO', TEACHER: 'PROFESSOR', ADMIN: 'ADMIN' });
  const MIN_PASSWORD_LENGTH = 8;
  const PERMISSIONS = Object.freeze({
    VIEW_EVENTS: 'VISUALIZAR_EVENTOS', VIEW_CALENDAR: 'VISUALIZAR_CALENDARIO', VIEW_NEXT_EVENTS: 'VISUALIZAR_PROXIMOS_EVENTOS', VIEW_DETAIL: 'VISUALIZAR_DETALHE_EVENTO',
    CREATE_EVENT: 'CRIAR_EVENTO', VALIDATE_EVENT: 'VALIDAR_EVENTO', EDIT_EVENT: 'EDITAR_EVENTO', CANCEL_EVENT: 'CANCELAR_EVENTO', VIEW_SUBSCRIBERS: 'VISUALIZAR_INSCRITOS',
    ENROLL: 'INSCREVER_EVENTO', CANCEL_OWN_ENROLLMENT: 'CANCELAR_PROPRIA_INSCRICAO', VIEW_MY_ENROLLMENTS: 'VISUALIZAR_MINHAS_INSCRICOES', ADMIN_CANCEL_ENROLLMENT: 'CANCELAR_INSCRICAO_ADMIN',
    CREATE_ACCOUNT: 'CRIAR_CONTA', RESET_PASSWORD: 'REDEFINIR_SENHA', SUBMIT_SUGGESTION: 'ENVIAR_SUGESTAO', VIEW_MY_SUGGESTIONS: 'VISUALIZAR_MINHAS_SUGESTOES',
    REVIEW_SUGGESTIONS: 'REVISAR_SUGESTOES', APPROVE_SUGGESTION: 'APROVAR_SUGESTAO', REJECT_SUGGESTION: 'REJEITAR_SUGESTAO'
  });
  const ROLE_PERMISSIONS = Object.freeze({
    [ROLES.STUDENT]: [PERMISSIONS.VIEW_EVENTS, PERMISSIONS.VIEW_CALENDAR, PERMISSIONS.VIEW_NEXT_EVENTS, PERMISSIONS.VIEW_DETAIL, PERMISSIONS.CREATE_EVENT, PERMISSIONS.ENROLL, PERMISSIONS.CANCEL_OWN_ENROLLMENT, PERMISSIONS.VIEW_MY_ENROLLMENTS, PERMISSIONS.SUBMIT_SUGGESTION, PERMISSIONS.VIEW_MY_SUGGESTIONS],
    [ROLES.TEACHER]: [PERMISSIONS.CREATE_EVENT, PERMISSIONS.VALIDATE_EVENT, PERMISSIONS.EDIT_EVENT, PERMISSIONS.CANCEL_EVENT, PERMISSIONS.VIEW_SUBSCRIBERS, PERMISSIONS.ADMIN_CANCEL_ENROLLMENT, PERMISSIONS.CREATE_ACCOUNT, PERMISSIONS.RESET_PASSWORD, PERMISSIONS.REVIEW_SUGGESTIONS, PERMISSIONS.APPROVE_SUGGESTION, PERMISSIONS.REJECT_SUGGESTION],
    [ROLES.ADMIN]: [PERMISSIONS.CREATE_EVENT, PERMISSIONS.VALIDATE_EVENT, PERMISSIONS.EDIT_EVENT, PERMISSIONS.CANCEL_EVENT, PERMISSIONS.VIEW_SUBSCRIBERS, PERMISSIONS.ADMIN_CANCEL_ENROLLMENT, PERMISSIONS.CREATE_ACCOUNT, PERMISSIONS.RESET_PASSWORD, PERMISSIONS.REVIEW_SUGGESTIONS, PERMISSIONS.APPROVE_SUGGESTION, PERMISSIONS.REJECT_SUGGESTION]
  });

  class DomainError extends Error {
    constructor(code, message) { super(message); this.name = 'DomainError'; this.code = code; }
  }

  const clone = (value) => JSON.parse(JSON.stringify(value));
  const now = () => new Date().toISOString();
  const nextId = (data, collection) => { const key = collection.slice(0, -1); const id = data.nextIds[key] || 1; data.nextIds[key] = id + 1; return id; };
  const required = (value, label) => { if (typeof value !== 'string' || !value.trim()) throw new DomainError('REQUIRED', `${label} é obrigatório.`); return value.trim(); };
  const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(`${value}T00:00:00Z`));
  const findUser = (data, id) => data.users.find((user) => Number(user.id) === Number(id));
  const findEvent = (data, id) => data.events.find((event) => Number(event.id) === Number(id));
  const findEnrollment = (data, id) => data.enrollments.find((enrollment) => Number(enrollment.id) === Number(id));
  const findSuggestion = (data, id) => data.suggestions.find((suggestion) => Number(suggestion.id) === Number(id));
  const activeEnrollments = (data, eventId) => data.enrollments.filter((item) => Number(item.eventoId) === Number(eventId) && item.status === ENROLLMENT_STATUS.ACTIVE);
  const assertActor = (data, actorId, permission) => { const actor = findUser(data, actorId); if (!actor || !hasPermission(actor, permission)) throw new DomainError('FORBIDDEN', 'Você não tem permissão para executar esta ação.'); return actor; };
  const assertRole = (actor, roles) => { if (!actor || !roles.includes(actor.role)) throw new DomainError('FORBIDDEN', 'Você não tem permissão para executar esta ação.'); };
  const assertEventData = (input) => {
    const title = required(input.titulo, 'Título');
    const description = required(input.descricao, 'Descrição');
    const start = required(input.dataInicio, 'Data de início');
    const end = required(input.dataFim, 'Data de fim');
    const time = required(input.hora, 'Horário');
    const location = required(input.localizacao, 'Local');
    if (!validDate(start) || !validDate(end) || start > end) throw new DomainError('INVALID_DATE', 'Informe datas válidas, com início até o fim.');
    if (!/^\d{2}:\d{2}$/.test(time)) throw new DomainError('INVALID_TIME', 'Informe um horário válido.');
    const capacity = input.capacidade === '' || input.capacidade === null || input.capacidade === undefined ? null : Number(input.capacidade);
    if (capacity !== null && (!Number.isInteger(capacity) || capacity < 1)) throw new DomainError('INVALID_CAPACITY', 'A capacidade deve ser um número inteiro positivo.');
    return { titulo: title, descricao: description, dataInicio: start, dataFim: end, hora: time, localizacao: location, capacidade: capacity };
  };

  function createSeedData() {
    return {
      version: 1,
      nextIds: { user: 4, event: 4, enrollment: 3, suggestion: 3 },
      users: [
        { id: 1, nome: 'Ana Souza', email: 'aluna@germinare.edu.br', senha: 'aluna123', role: ROLES.STUDENT, role_id: 1 },
        { id: 2, nome: 'Prof. Carlos Lima', email: 'professor@germinare.edu.br', senha: 'prof1234', role: ROLES.TEACHER, role_id: 2 },
        { id: 3, nome: 'Admin Germinare', email: 'admin@germinare.edu.br', senha: 'admin123', role: ROLES.ADMIN, role_id: 3 }
      ],
      events: [
        { id: 1, titulo: 'Feira de Tecnologia', descricao: 'Demonstrações de projetos e oficinas criadas pelos estudantes.', dataInicio: '2026-10-15', dataFim: '2026-10-15', hora: '14:00', localizacao: 'Auditório principal', capacidade: 3, status: EVENT_STATUS.APPROVED, criadoPor: 2, criadoEm: '2026-09-01T10:00:00.000Z' },
        { id: 2, titulo: 'Clube de Leitura', descricao: 'Encontro mensal para conversar sobre o livro escolhido pela turma.', dataInicio: '2026-10-20', dataFim: '2026-10-20', hora: '16:00', localizacao: 'Biblioteca', capacidade: null, status: EVENT_STATUS.APPROVED, criadoPor: 2, criadoEm: '2026-09-02T10:00:00.000Z' },
        { id: 3, titulo: 'Oficina de Robótica', descricao: 'Proposta de oficina aguardando validação do professor.', dataInicio: '2026-10-25', dataFim: '2026-10-25', hora: '10:00', localizacao: 'Laboratório maker', capacidade: 10, status: EVENT_STATUS.PENDING, criadoPor: 1, criadoEm: '2026-09-03T10:00:00.000Z' }
      ],
      enrollments: [
        { id: 1, alunoId: 1, eventoId: 1, data_inscricao: '2026-09-04T10:00:00.000Z', status: ENROLLMENT_STATUS.ACTIVE, canceladoEm: null, canceladoPor: null },
        { id: 2, alunoId: 1, eventoId: 2, data_inscricao: '2026-09-04T10:00:00.000Z', status: ENROLLMENT_STATUS.ACTIVE, canceladoEm: null, canceladoPor: null }
      ],
      suggestions: [
        { id: 1, titulo: 'Palestra sobre carreiras digitais', descricao: 'Convidar profissionais para falar sobre suas primeiras experiências.', autorId: 1, status: SUGGESTION_STATUS.PENDING, criadoEm: '2026-09-05T10:00:00.000Z', revisadoEm: null, revisadoPor: null, eventoId: null },
        { id: 2, titulo: 'Mostra de jogos', descricao: 'Uma tarde para apresentar jogos desenvolvidos na escola.', autorId: 1, status: SUGGESTION_STATUS.APPROVED, criadoEm: '2026-09-01T10:00:00.000Z', revisadoEm: '2026-09-02T10:00:00.000Z', revisadoPor: 2, eventoId: null }
      ]
    };
  }

  function hasPermission(user, permission) { return Boolean(user && ROLE_PERMISSIONS[user.role] && ROLE_PERMISSIONS[user.role].includes(permission)); }
  function sanitizeUser(user) { if (!user) return null; const copy = clone(user); delete copy.senha; return copy; }
  function authenticate(data, email, password) {
    const normalized = String(email || '').trim().toLowerCase();
    const user = data.users.find((candidate) => candidate.email.toLowerCase() === normalized && candidate.senha === password);
    return user ? sanitizeUser(user) : null;
  }
  function createAccount(data, actorId, input) {
    const actor = assertActor(data, actorId, PERMISSIONS.CREATE_ACCOUNT);
    const nome = required(input.nome, 'Nome');
    const email = required(input.email, 'E-mail').toLowerCase();
    const senha = required(input.senha, 'Senha');
    if (!validEmail(email)) throw new DomainError('INVALID_EMAIL', 'Informe um e-mail válido.');
    if (senha.length < MIN_PASSWORD_LENGTH) throw new DomainError('WEAK_PASSWORD', `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
    if (data.users.some((user) => user.email.toLowerCase() === email)) throw new DomainError('DUPLICATE_EMAIL', 'Não foi possível criar a conta com os dados informados.');
    const role = input.role || ROLES.STUDENT;
    if (!Object.values(ROLES).includes(role) || (actor.role === ROLES.TEACHER && role === ROLES.ADMIN)) throw new DomainError('INVALID_ROLE', 'Perfil não autorizado para esta conta.');
    const user = { id: nextId(data, 'users'), nome, email, senha, role, role_id: Object.values(ROLES).indexOf(role) + 1 };
    data.users.push(user);
    return sanitizeUser(user);
  }
  function resetPassword(data, actorId, userId, newPassword) {
    assertActor(data, actorId, PERMISSIONS.RESET_PASSWORD);
    const password = required(newPassword, 'Nova senha');
    if (password.length < MIN_PASSWORD_LENGTH) throw new DomainError('WEAK_PASSWORD', `A senha deve ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`);
    const user = findUser(data, userId);
    if (!user) throw new DomainError('NOT_FOUND', 'Conta não encontrada.');
    user.senha = password;
    return sanitizeUser(user);
  }
  function createEvent(data, actorId, input) {
    const actor = assertActor(data, actorId, PERMISSIONS.CREATE_EVENT);
    const fields = assertEventData(input);
    const event = { id: nextId(data, 'events'), ...fields, status: actor.role === ROLES.STUDENT ? EVENT_STATUS.PENDING : EVENT_STATUS.APPROVED, criadoPor: actor.id, criadoEm: now() };
    if (input.suggestionId) event.suggestionId = Number(input.suggestionId);
    data.events.push(event);
    if (event.suggestionId) {
      const suggestion = findSuggestion(data, event.suggestionId);
      if (suggestion && suggestion.status === SUGGESTION_STATUS.APPROVED) suggestion.eventoId = event.id;
    }
    return clone(event);
  }
  function updateEvent(data, actorId, eventId, input) {
    const actor = assertActor(data, actorId, PERMISSIONS.EDIT_EVENT);
    const event = findEvent(data, eventId);
    if (!event) throw new DomainError('NOT_FOUND', 'Evento não encontrado.');
    if (event.status === EVENT_STATUS.CANCELLED) throw new DomainError('TERMINAL_EVENT', 'Eventos cancelados não podem ser alterados.');
    const fields = assertEventData(input);
    if (fields.capacidade !== null && activeEnrollments(data, event.id).length > fields.capacidade) throw new DomainError('CAPACITY_TOO_LOW', 'A capacidade não pode ser menor que as inscrições ativas.');
    Object.assign(event, fields, { atualizadoEm: now(), atualizadoPor: actor.id });
    return clone(event);
  }
  function cancelEvent(data, actorId, eventId) {
    const actor = assertActor(data, actorId, PERMISSIONS.CANCEL_EVENT);
    const event = findEvent(data, eventId);
    if (!event) throw new DomainError('NOT_FOUND', 'Evento não encontrado.');
    if (event.status === EVENT_STATUS.CANCELLED) throw new DomainError('TERMINAL_EVENT', 'O evento já está cancelado.');
    event.status = EVENT_STATUS.CANCELLED;
    event.canceladoEm = now(); event.canceladoPor = actor.id;
    return clone(event);
  }
  function validateEvent(data, actorId, eventId, decision) {
    assertActor(data, actorId, PERMISSIONS.VALIDATE_EVENT);
    const event = findEvent(data, eventId);
    if (!event) throw new DomainError('NOT_FOUND', 'Evento não encontrado.');
    if (event.status !== EVENT_STATUS.PENDING || ![EVENT_STATUS.APPROVED, EVENT_STATUS.DENIED].includes(decision)) throw new DomainError('INVALID_TRANSITION', 'A decisão de validação não é permitida para este evento.');
    event.status = decision; event.validadoEm = now(); event.validadoPor = Number(actorId);
    return clone(event);
  }
  function listEvents(data, filters = {}) {
    return data.events.filter((event) => !filters.status || event.status === filters.status).filter((event) => !filters.search || `${event.titulo} ${event.descricao} ${event.localizacao}`.toLowerCase().includes(String(filters.search).toLowerCase())).map((event) => ({ ...clone(event), vagasRestantes: event.capacidade === null ? null : Math.max(0, event.capacidade - activeEnrollments(data, event.id).length) }));
  }
  function getEvent(data, eventId) { const event = findEvent(data, eventId); return event ? { ...clone(event), vagasRestantes: event.capacidade === null ? null : Math.max(0, event.capacidade - activeEnrollments(data, event.id).length) } : null; }
  function enroll(data, actorId, eventId) {
    const actor = assertActor(data, actorId, PERMISSIONS.ENROLL);
    const event = findEvent(data, eventId);
    if (!event) throw new DomainError('NOT_FOUND', 'Evento não encontrado.');
    if (event.status !== EVENT_STATUS.APPROVED) throw new DomainError('UNAVAILABLE_EVENT', 'Este evento não está disponível para inscrição.');
    if (data.enrollments.some((item) => item.alunoId === actor.id && item.eventoId === event.id && item.status === ENROLLMENT_STATUS.ACTIVE)) throw new DomainError('DUPLICATE_ENROLLMENT', 'Você já está inscrito neste evento.');
    if (event.capacidade !== null && activeEnrollments(data, event.id).length >= event.capacidade) throw new DomainError('EVENT_FULL', 'Não há vagas disponíveis neste evento.');
    const enrollment = { id: nextId(data, 'enrollments'), alunoId: actor.id, eventoId: event.id, data_inscricao: now(), status: ENROLLMENT_STATUS.ACTIVE, canceladoEm: null, canceladoPor: null };
    data.enrollments.push(enrollment);
    return clone(enrollment);
  }
  function cancelEnrollment(data, actorId, enrollmentId, administrative = false) {
    const permission = administrative ? PERMISSIONS.ADMIN_CANCEL_ENROLLMENT : PERMISSIONS.CANCEL_OWN_ENROLLMENT;
    const actor = assertActor(data, actorId, permission);
    const enrollment = findEnrollment(data, enrollmentId);
    if (!enrollment) throw new DomainError('NOT_FOUND', 'Inscrição não encontrada.');
    if (!administrative && enrollment.alunoId !== actor.id) throw new DomainError('FORBIDDEN', 'Você só pode cancelar sua própria inscrição.');
    if (enrollment.status !== ENROLLMENT_STATUS.ACTIVE) throw new DomainError('ALREADY_CANCELLED', 'Esta inscrição já foi cancelada.');
    enrollment.status = ENROLLMENT_STATUS.CANCELLED; enrollment.canceladoEm = now(); enrollment.canceladoPor = actor.id;
    return clone(enrollment);
  }
  function listMyEnrollments(data, actorId) { assertActor(data, actorId, PERMISSIONS.VIEW_MY_ENROLLMENTS); return data.enrollments.filter((item) => item.alunoId === Number(actorId)).map((item) => ({ ...clone(item), evento: getEvent(data, item.eventoId), aluno: sanitizeUser(findUser(data, item.alunoId)) })); }
  function listSubscribers(data, actorId, eventId) { assertActor(data, actorId, PERMISSIONS.VIEW_SUBSCRIBERS); return data.enrollments.filter((item) => item.eventoId === Number(eventId)).map((item) => ({ ...clone(item), aluno: sanitizeUser(findUser(data, item.alunoId)) })); }
  function submitSuggestion(data, actorId, input) {
    const actor = assertActor(data, actorId, PERMISSIONS.SUBMIT_SUGGESTION);
    const suggestion = { id: nextId(data, 'suggestions'), titulo: required(input.titulo, 'Título'), descricao: required(input.descricao, 'Descrição'), autorId: actor.id, status: SUGGESTION_STATUS.PENDING, criadoEm: now(), revisadoEm: null, revisadoPor: null, eventoId: null };
    data.suggestions.push(suggestion);
    return clone(suggestion);
  }
  function listMySuggestions(data, actorId) { assertActor(data, actorId, PERMISSIONS.VIEW_MY_SUGGESTIONS); return data.suggestions.filter((item) => item.autorId === Number(actorId)).map((item) => ({ ...clone(item), autor: sanitizeUser(findUser(data, item.autorId)) })); }
  function listSuggestionQueue(data, actorId) { assertActor(data, actorId, PERMISSIONS.REVIEW_SUGGESTIONS); return data.suggestions.filter((item) => item.status === SUGGESTION_STATUS.PENDING).map((item) => ({ ...clone(item), autor: sanitizeUser(findUser(data, item.autorId)) })); }
  function reviewSuggestion(data, actorId, suggestionId, decision) {
    const permission = decision === SUGGESTION_STATUS.APPROVED ? PERMISSIONS.APPROVE_SUGGESTION : PERMISSIONS.REJECT_SUGGESTION;
    const actor = assertActor(data, actorId, permission);
    const suggestion = findSuggestion(data, suggestionId);
    if (!suggestion) throw new DomainError('NOT_FOUND', 'Sugestão não encontrada.');
    if (suggestion.status !== SUGGESTION_STATUS.PENDING || ![SUGGESTION_STATUS.APPROVED, SUGGESTION_STATUS.REJECTED].includes(decision)) throw new DomainError('INVALID_TRANSITION', 'A sugestão já foi analisada.');
    suggestion.status = decision; suggestion.revisadoEm = now(); suggestion.revisadoPor = actor.id;
    return clone(suggestion);
  }
  return { EVENT_STATUS, ENROLLMENT_STATUS, SUGGESTION_STATUS, ROLES, PERMISSIONS, ROLE_PERMISSIONS, MIN_PASSWORD_LENGTH, DomainError, clone, createSeedData, hasPermission, sanitizeUser, authenticate, createAccount, resetPassword, createEvent, updateEvent, cancelEvent, validateEvent, listEvents, getEvent, enroll, cancelEnrollment, listMyEnrollments, listSubscribers, submitSuggestion, listMySuggestions, listSuggestionQueue, reviewSuggestion, findUser };
});
