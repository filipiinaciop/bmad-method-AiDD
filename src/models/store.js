'use strict';

(function attachStore(root, factory) {
  const domain = (root && root.GerminareDomain) || (typeof require === 'function' ? require('./domain') : null);
  const api = factory(domain);
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (root) root.GerminareStore = api;
})(typeof window !== 'undefined' ? window : globalThis, function createStoreApi(domain) {
  const DATA_KEY = 'germinare-tech:data:v1';
  const SESSION_KEY = 'germinare-tech:session:v1';
  const copy = (value) => JSON.parse(JSON.stringify(value));
  const validData = (data) => Boolean(data && data.version === 1 && Array.isArray(data.users) && Array.isArray(data.events) && Array.isArray(data.enrollments) && Array.isArray(data.suggestions) && data.nextIds);
  function createMemoryStorage(initial = {}) {
    const values = new Map(Object.entries(initial));
    return { getItem: (key) => values.has(key) ? values.get(key) : null, setItem: (key, value) => values.set(key, String(value)), removeItem: (key) => values.delete(key), clear: () => values.clear() };
  }
  function createStore(storage) {
    if (!storage || typeof storage.getItem !== 'function') throw new TypeError('Um armazenamento compatível é necessário.');
    function read() {
      try { const parsed = JSON.parse(storage.getItem(DATA_KEY) || 'null'); return validData(parsed) ? parsed : domain.createSeedData(); } catch (_error) { return domain.createSeedData(); }
    }
    function write(data) { storage.setItem(DATA_KEY, JSON.stringify(data)); return data; }
    function ensure() { const data = read(); if (!storage.getItem(DATA_KEY)) write(data); return data; }
    function transact(mutator) { const data = copy(read()); const result = mutator(data); write(data); return result; }
    function reset() { return write(domain.createSeedData()); }
    return { read, write, ensure, transact, reset, dataKey: DATA_KEY };
  }
  function getSession(storage) { try { return JSON.parse(storage.getItem(SESSION_KEY) || 'null'); } catch (_error) { return null; } }
  function setSession(storage, user) { if (user) storage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id })); else storage.removeItem(SESSION_KEY); }
  return { DATA_KEY, SESSION_KEY, createMemoryStorage, createStore, getSession, setSession };
});
