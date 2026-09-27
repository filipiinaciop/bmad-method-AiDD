---
title: 'Implement Germinare Tech PM Stories'
type: 'feature'
created: '2026-09-04'
status: 'in-review'
baseline_commit: '140ccba3910339675d9f09fc5a3b413cb3715b8e'
review_loop_iteration: 0
context:
  - 'AGENTS.md'
  - 'docs/01-inputs/architecture.md'
  - 'docs/01-inputs/ux.md'
  - 'docs/04-pm-stories/dependencies.md'
  - 'docs/04-pm-stories/implementation-order.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The Germinare Tech repository contains the approved PM/Stories plan but no executable application, so the group cannot demonstrate the event-management flow required by the academic project.

**Approach:** Implement the approved T001–T021 vertical slices in dependency order as one cohesive MVP: mock authentication/RBAC, event management and validation, event discovery, enrollments, and suggestions. Use the existing MVC boundary, HTML/CSS/JavaScript, Node/Express for serving the same project, mock data, and browser `localStorage` for persistence. Create one traceable commit after each completed Task.

## Boundaries & Constraints

**Always:** Respect the PRD, reconciled decisions, RBAC permissions, event states `PENDENTE`, `APROVADO`, `NEGADO`, `CANCELADO`, the formal `Epic → Feature → Story → Task` traceability, UX-001 tokens and UX-002 product flows, mock data, localStorage persistence, responsive behavior, accessible focus/touch targets, and one commit per completed Task.

**Never:** Use PostgreSQL/Aiven, add public REST APIs, add integrations, add payment, notifications, waitlists, check-in, external calendars, recurring events, multi-school behavior, production authentication, or unapproved Repository/Service layers. Do not mark a Task done without its acceptance evidence and validation.

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Login | Mock account with valid credentials | Authenticated area reflects the account Role | Invalid credentials are rejected without account enumeration |
| Event validation | Student-created event is `PENDENTE` | Professor with `VALIDAR_EVENTO` changes it to `APROVADO` or `NEGADO` | Unauthorized or terminal transition is rejected |
| Enrollment capacity | Multiple students compete for the last optional capacity slot | Active enrollments never exceed capacity | Duplicate or unavailable enrollment is rejected |
| Suggestion review | Student suggestion is pending | Professor/Admin explicitly approves or rejects; approval opens prefilled event creation | Invalid or unauthorized review does not mutate data |
| Persistence | Data is changed, then page is reloaded | Mock records remain available from `localStorage` | Corrupt/missing local data falls back safely to seeded mock data |

</frozen-after-approval>

## Code Map

- `src/` -- currently empty; create the MVC application and browser assets here.
- `tests/` -- currently empty; create automated unit/integration coverage for domain rules and smoke scenarios here.
- `docs/04-pm-stories/tasks/T001-authentication.md` through `T021-reject-suggestion.md` -- authoritative Task scopes, ACs, dependencies and stop conditions.
- `docs/04-pm-stories/stories/` -- Story narratives and acceptance criteria for the vertical slices.
- `docs/01-inputs/architecture.md` -- canonical MVC, RBAC, localStorage and domain-state constraints.
- `docs/01-inputs/ux.md` -- visual tokens and the confirmed product UX contract.
- `docs/04-pm-stories/traceability-matrix.md` -- update every Task, AC, test and commit link as work completes.

## Tasks & Acceptance

**Execution:**
- [x] `package.json`, `server.js`, `src/`, `tests/` -- create the smallest runnable Node/Express MVC baseline with scripts and seeded mock data -- enables T001.
- [x] `T001` -- implement mock authentication with generic invalid-credential feedback and localStorage-backed session -- S01 acceptance criteria.
- [x] `T005–T008` -- implement event creation, editing, cancellation and subscriber views -- E02 acceptance criteria.
- [x] `T009–T011` -- implement list, calendar and event detail -- E03/F04 acceptance criteria.
- [x] `T012–T016` -- implement enrollment, integrity, self-cancel, own-list and administrative cancel -- E03/F05 acceptance criteria.
- [x] `T017–T021` -- implement suggestions, personal suggestions, review queue, approval and rejection -- E04 acceptance criteria.
- [x] Each Task -- run its validation, update evidence/status/rastreability, then create its own commit before starting the next Task.

**Acceptance Criteria:**
- Given the application is started with the documented command, when a user follows the primary flow, then login, event discovery, enrollment/cancellation, suggestion and review work without data loss.
- Given invalid, unauthorized, duplicate, unavailable or over-capacity input, when the action is attempted, then the system rejects it safely and preserves valid state.
- Given data is written and the page is reloaded, when the same user returns, then mock records persist through `localStorage`.
- Given the implementation is complete, when the project validation commands run, then tests and build/lint checks pass and every Task has a linked commit/evidence.

## Implementation Notes

Planning facts: the repository has no application code, test framework, package manifest or official commands. The previous PM/Stories commit is `140ccba`. All user-confirmed architectural decisions are to be recorded before implementation; unresolved ambiguity must stop the affected Task rather than be guessed.

## Verification

**Commands:**
- `npm test` -- expected: all automated tests pass.
- `npm run lint` -- expected: no lint errors.
- `npm run build` -- expected: the application build/check succeeds.

**Manual checks (if no browser automation is available):**
- Start the documented server, exercise the primary student/professor flows, reload the page, and inspect that `localStorage` retains valid mock data.
- Confirm each completed Task has a status, evidence, traceability row and dedicated commit.

Implementation complete: T001–T021 were executed and each received a dedicated commit. The MVP intentionally defers PRD-FR-007 (`ENCERRADO`) according to DEC-005.

## Review Triage Log

- `medium` — Professor/Admin discovery and Admin account provisioning were incomplete; fixed by aligning both roles with DEC-010 and adding regression coverage.
- `medium` — event cards could show a stale enrollment action; fixed by rendering the active enrollment state in the reusable card.
- `medium` — cancellation accepted non-approved source states; fixed by enforcing DEC-011.
- `high-unverified` — cross-tab localStorage atomicity is not available in this MVP; DEC-012 narrows T013 evidence to repeated same-store attempts and records the future limitation.
- `medium` — UI evidence is not browser-automated; verification files now state the manual walkthrough requirement instead of claiming browser automation.
- `low` — verification counts and audit text were stale; updated to 14 tests and T001–T021 commits.

## Final implementation notes

The implementation review patches are outside the frozen intent and preserve the approved MVP scope. The final validation must include the complete domain suite, lint, build, HTTP smoke, and a manual browser walkthrough for the primary student/professor flows.
