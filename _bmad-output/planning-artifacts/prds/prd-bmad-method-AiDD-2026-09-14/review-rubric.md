# PRD Quality Review — PRD: Germinare Tech

## Overall verdict

This is a strong fast-path PRD: it has a real thesis (professor-curated centralization, not a generic events tool), FRs carry testable consequences rather than adjectives, and IDs/glossary/cross-references are clean enough for UX, architecture, and story-writing to source-extract directly. The risks are narrow and fixable — a handful of unbounded "tempo real" claims in done-ness-critical FRs, one silently un-addressed capability (admin-side cancellation of a student's inscription), and a structural quirk that let one `[ASSUMPTION]` fall outside the Assumptions Index. None of these require reshaping the document.

## Decision-readiness — strong

Decisions are stated as decisions, not softened into "considerations": "decisão consciente da v1" appears at UJ-4, UJ-6, FR-21, and is echoed in §5/§6.2 with the actual cost named each time (e.g., FR-21's `[NOTE FOR PM]`: "risco de desconfiança e reenvio duplicado do Aluno está registrado como item a observar em §8"). The counter-metric SM-C1 is a genuine trade-off surfaced against the PRD's own thesis (fast approval must not become "carimbo automático"), not a hedge. `[NOTE FOR PM]` callouts land on real tensions — the multi-school extensibility guardrail in §5 and the waitlist deferral in §6.2 — rather than safe checkpoints.

One Open Question undercuts its own openness: §8 Q2 ("Recuperação de senha") asks whether v1 depends entirely on manual admin password resets, then immediately answers itself inline — `[ASSUMPTION: sim, redefinição é manual pelo Professor/Admin na v1 — sem fluxo de self-service]`. This is the rhetorical-question pattern the rubric warns about, even though the underlying content (deferring self-service password recovery) is reasonable.

### Findings
- **medium** Self-answered Open Question (§8, Questão 2) — The question is posed and then resolved by an inline `[ASSUMPTION]` in the same bullet, so it reads as already decided rather than genuinely open, which blurs the signal for whoever triages Open Questions at Finalize. *Fix:* either move this fully into §9 as a confirmed assumption and drop it from §8, or keep it in §8 but phrase it as "confirm this assumption" without supplying the answer in the same breath.

## Substance over theater — strong

No findings needed. Two personas (Fernanda, Lucas), each driving multiple UJs and FRs directly — no persona theater. The Vision (§1) names the specific tools it replaces ("grupos de mensagens, avisos verbais e planilhas manuais") and the specific competitors it deliberately doesn't chase (Eventbrite, Sched, SignUpGenius, Membership Toolkit), with the differentiation tied to a concrete mechanism ("professor no centro da curadoria") rather than a swappable claim. Cross-Cutting NFRs avoid boilerplate: "Desempenho" explicitly disclaims a formal SLA and bounds expected load ("dezenas a poucas centenas de contas") instead of asserting genetic "scalability."

## Strategic coherence — strong

The thesis — centralize the event lifecycle while keeping human curation as the gate on student-proposed events — runs consistently from Vision through UJ-4/5/6 into SM-C1's counter-metric, which exists specifically to stop the curation step from degrading into a rubber stamp. Feature grouping in §4 follows the thesis (auth → event management → discovery → subscription → suggestion → curation queue), not an arbitrary backlog order.

### Findings
- **low** SM-2 is a process/schedule metric, not a product-validation metric (§7) — "Entrega do processo BMAD completo... dentro do cronograma da disciplina" measures course delivery, not whether the product thesis holds. This is defensible given the academic stakes (grading requires full process completion) but is a different kind of metric than SM-1/SM-3 and could be misread as validating the product. *Fix:* label it explicitly as a course/process metric, or move it out of the Success Metrics list into a short "critérios de entrega acadêmica" note.

## Done-ness clarity — adequate

Most FRs earn their "testável" label: FR-13, FR-14, FR-15, and FR-16 all specify the actual boundary condition (duplicate rejection, status gating, concurrent-request race handling, single-owner cancellation), and FR-11's "vagas restantes... atualizado a cada carregamento da tela" is a good example of bounding an update mechanism instead of asserting freshness. That precision slips in a few places where "tempo real" stands in without a bound.

### Findings
- **medium** Unbounded "tempo real" in two done-ness-bearing FRs (§4.2 FR-8, §4.4 FR-17) — FR-8: "reflete inscrições/cancelamentos em tempo real (sem cache desatualizado perceptível ao usuário)"; FR-17: "Lista reflete inscrições e cancelamentos do próprio Aluno em tempo real." Neither states a mechanism (push vs. refresh-on-load vs. polling) or a bound, and "perceptível ao usuário" is a subjective proxy. FR-11 shows the fix already used elsewhere in the same PRD. *Fix:* restate both as "atualizado a cada carregamento da tela" (or whatever the intended mechanism actually is) to match FR-11's pattern.
- **low** Vague performance adjective in Cross-Cutting NFRs ("Desempenho") — "a experiência deve ser fluida" is exactly the kind of adjective the rubric flags, even though the same sentence correctly disclaims a formal SLA and bounds the expected account volume. *Fix:* drop the adjective (the disclaimer + volume bound already carry the intent) or replace it with an observable proxy.
- **low** "Mensagem clara" in FR-13's consequence is a soft descriptor with no verifiable content. *Fix:* low priority; either specify what the message must communicate or drop the qualifier since the testable part (no duplicate record created) already carries the FR.

## Scope honesty — strong

§5 and §6.2 do real work distinguishing permanent exclusions from deferred decisions — the waitlist item is explicitly marked "decisão explicitamente adiada, não uma exclusão permanente" with a `[NOTE FOR PM]` on when to revisit, which is exactly the honesty the rubric asks for. The assumption density (roughly 15 inline `[ASSUMPTION]` tags + 5 Open Questions + 3 `[NOTE FOR PM]`) is high for a ~400-line PRD, but this is expected and already confirmed for a fast-path PRD at Internal/Academic stakes — not treated as a defect here.

### Findings
- **medium** Admin-side cancellation of a student's inscription is neither an FR nor a stated Non-Goal (§4.4, §5) — FR-16 states "Aluno só pode cancelar a própria Inscrição, nunca a de outro Aluno," which read literally forecloses any admin-initiated correction (freeing a slot for a no-show, cancelling on a student's behalf when asked in person) without saying so as a deliberate scope decision. It is absent from both §4.2 (Professor/Admin capabilities) and §5 (Non-Goals). *Fix:* either add an FR for admin-initiated cancellation, or add an explicit Non-Goal line stating that only self-service cancellation exists in v1, so the omission reads as a decision rather than an oversight.

## Downstream usability — strong

No findings needed. Glossary terms (Evento, Inscrição, Vaga, Sugestão de Evento, Fila de Análise, Conta) are used consistently across UJs, FRs, and Non-Goals. FR numbering (FR-1…FR-21), UJ numbering (UJ-1…UJ-6), and SM numbering (SM-1…SM-3, SM-C1) are contiguous with no gaps or duplicates. Cross-references resolve: FR-6 → FR-14, FR-20 → FR-4, and every UJ referenced by an FR ("Realiza UJ-1", etc.) exists. Given §0's explicit statement that this PRD is chain-top (feeds UX → architecture → épicos/histórias), this traceability is load-bearing and it holds up.

## Shape fit — strong

This is a genuine multi-role product with meaningful end-user UX (students discovering and self-serving event registration), so named-protagonist UJs are correctly load-bearing rather than overhead — and the PRD keeps them proportionate (2 personas, 6 UJs, each tied to specific FRs) rather than over-formalizing a small feature set. The single-school, single-operator-role framing (§2.2, §5) is matched by capability-spec-style FRs for the Professor/Admin side rather than forcing multi-stakeholder UJ machinery where it isn't needed.

## Mechanical notes

- **Assumptions Index roundtrip gap**: the `[ASSUMPTION: responsivo o suficiente para uso confortável no celular...]` tag under Cross-Cutting NFRs → "Plataforma" (near the end of the document) is not listed in §9 Índice de Suposições. This is a structural artifact — §9 appears *before* the trailing "Constraints and Guardrails" and "Cross-Cutting NFRs" sections in document order, so any assumption introduced in those later sections can't be captured by an index that precedes them. Consider moving §9 to the very end of the document, or sweeping it once more after the trailing sections are added.
- **Glossary case drift (cosmetic)**: defined terms are capitalized in the Glossário and FRs ("Vaga", "Evento") but appear lowercase in UJ prose (e.g., §2.3 UJ-1: "vaga limite de 40"; UJ headings use lowercase "evento"). Low severity, doesn't impede extraction since context makes the referent unambiguous.
- **UJ format inconsistency**: UJ-3 and UJ-6 are written as compressed prose instead of the Persona/Estado inicial/Caminho/Clímax/Resolução structure used by UJ-1, UJ-2, UJ-4, UJ-5. This appears deliberate (UJ-3 is explicitly labeled "forma leve por ser variação direta de UJ-2"), so it's informational rather than a defect — flagging only so downstream readers don't expect the same fields to be present.
- **Unresolved document title**: the H1 carries "*Working title — confirmar com o autor do brief.*" (line 9), a residual open item that sits outside both §8 Open Questions and §9 Assumptions Index. Worth folding into one of those two tracking mechanisms before Finalize closes, or resolving directly.
- **ID continuity**: verified clean. UJ-1…UJ-6, FR-1…FR-21, and SM-1…SM-3 + SM-C1 are all contiguous with no gaps or duplicates.
