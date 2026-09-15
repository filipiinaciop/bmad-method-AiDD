# Reconciliação: addendum.md (brief) x prd.md

**Input fonte:** `_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/addendum.md`
**Documento derivado:** `_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md`
**Observação preliminar:** não existe ainda um `addendum.md` próprio do PRD nesta pasta (`prds/prd-bmad-method-AiDD-2026-09-14/` contém apenas `prd.md` e `.memlog.md`). Qualquer conteúdo do addendum do brief que não caiba no PRD e não seja silenciosamente descartável deveria migrar para um addendum.md do PRD — que hoje não existe.

---

## 1. O que foi carregado corretamente (sem gap)

| Item do addendum | Onde aparece no PRD |
|---|---|
| Fadiga de aprovação (risco 1) | §7 SM-C1 (contra-métrica) e §8 Questão 3 — ambos citam explicitamente "addendum do brief" |
| Rejeição silenciosa → desconfiança/reenvio (risco 2) | §4.6 FR-21 `[NOTE FOR PM]`, §8 Questão 4 — cita "risco identificado no addendum" |
| Perfil único Professor/Admin — racional (permissões devem continuar separáveis no futuro) | §5 Non-Goals, §3 Glossário, e principalmente "Guardrails de extensibilidade" (Constraints) — carrega bem o *porquê*, não só o limite |
| Lista de espera adiada, não rejeitada | §6.2 (`[NOTE FOR PM]` explícito: "decisão explicitamente adiada, não uma exclusão permanente") e §8 Questão 1 |
| Sem notificações automáticas — decisão deliberada para reduzir escopo técnico | §5, §6.2 |
| Subconjunto da pesquisa de mercado (comparáveis) | §1 Visão cita Eventbrite, Sched, SignUpGenius, Membership Toolkit como referência de não-concorrência |

Esses pontos mostram que o PRD fez um trabalho consciente de preservar risco e racional, não só o limite de escopo — inclusive citando "addendum do brief" nominalmente em 4 lugares.

---

## 2. Gaps encontrados

### Gap A — Risco de adoção/onboarding (risco 3 do addendum): SEM RASTRO no PRD
O addendum é explícito: ferramentas escolares tendem a falhar mais por falta de suporte/treinamento contínuo e de um "professor-campeão" engajado do que por falta de funcionalidades, e pede que "o PRD pense em onboarding, não só em funcionalidades".

Busquei no PRD por: "onboarding", "adoção", "campeão", "treinamento", "suporte contínuo" — nenhuma ocorrência. Não há menção em §7 (Critérios de Sucesso), §8 (Questões em Aberto), §5 (Non-Goals) nem em nenhum `[NOTE FOR PM]`. Ao contrário dos outros dois riscos do addendum (fadiga de aprovação, rejeição silenciosa), que foram citados nominalmente em múltiplos pontos, este terceiro risco foi silenciosamente descartado.

**Recomendação:** adicionar pelo menos uma Questão em Aberto em §8 (ex.: "há um plano de onboarding/professor-champion para a escola-piloto, ou o sucesso do projeto depende de um usuário engajado que hoje não está garantido?") e/ou uma contra-métrica em §7 paralela à SM-C1, já que o risco é da mesma natureza (observação pós-lançamento, não requisito funcional). Alternativamente, registrar em um futuro addendum.md do PRD.

### Gap B — Duas funcionalidades "deliberadamente fora de escopo" do addendum não aparecem em §5/§6.2
O addendum lista 7 funcionalidades vistas em soluções comparáveis e deliberadamente fora do escopo inicial. O PRD cobre lembretes automáticos, lista de espera, cobrança/ticketing e check-in/presença — mas dois itens da lista do addendum não aparecem em nenhum lugar do PRD (nem em §5 Non-Goals, nem em §6.2 Fora do Escopo, nem no Glossário):
- **Sincronização/exportação de calendário** (Google Calendar, iCal) — não confundir com FR-10 (visão de calendário in-app), que é uma feature diferente e está dentro do escopo.
- **Eventos recorrentes / em série** — nenhuma menção.

Como eram "decisões" e não apenas ausências, essa omissão silenciosa enfraquece o rastro de decisão do addendum — alguém lendo só o PRD não saberá que essas duas ficaram de fora conscientemente, e pode reabrir a discussão sem saber que ela já ocorreu.

**Recomendação:** acrescentar as duas linhas a §6.2 (mesmo padrão das demais: "Sincronização com calendário externo (Google Calendar/iCal)" e "Eventos recorrentes/em série — funcionalidades vistas em soluções comparáveis, fora do escopo da v1").

### Gap C — "Aprovação em múltiplos níveis" citada apenas implicitamente
O addendum lista "aprovação em múltiplos níveis (mais de um aprovador)" como funcionalidade vista em soluções comparáveis e deixada fora do escopo. O PRD não nomeia isso explicitamente em §5/§6.2 — fica apenas implícito pelo fato de o perfil Professor/Admin ser único e sem hierarquia (§5: "não diferencia permissões entre professor e administração/coordenação"). É uma lacuna menor porque a decisão de perfil único já cobre o efeito prático, mas a razão específica ("aprovação em múltiplos níveis é um padrão visto em CampusGroups e não foi adotado") não está registrada.

**Recomendação:** opcional — mencionar de passagem em §6.2 junto do item de perfil único, ou deixar para um addendum.md do PRD já que é nuance de pesquisa de mercado, não uma decisão de produto isolada.

### Gap D — Nuance futura sobre "fadiga de notificação" não carregada
O addendum, ao justificar a ausência de notificações automáticas no MVP, acrescenta uma orientação prospectiva: "se/quando notificações automáticas forem adicionadas no futuro, o volume deve ser calibrado para não cansar o usuário (fadiga de notificação é um padrão comum nas ferramentas pesquisadas)". O PRD (§5, §6.2) registra a decisão atual (sem notificações automáticas, para reduzir escopo técnico) mas não carrega essa orientação para uma eventual v2 — diferente do tratamento dado à lista de espera, que ganhou um `[NOTE FOR PM]` explícito de "revisitar se o padrão se mostrar recorrente".

**Recomendação:** menor prioridade — poderia virar um `[NOTE FOR PM]` em §6.2 no item de notificações automáticas, espelhando o tratamento já dado à lista de espera, ou ficar reservado para um futuro addendum.md do PRD.

### Gap E — Pesquisa de mercado (sistemas comparáveis) parcialmente descartada
O addendum lista 6 sistemas comparáveis com notas específicas (ex.: Minga combina check-in e engajamento; CampusGroups tem fluxo de aprovação com assinatura por chefe de departamento e reserva de sala; Membership Toolkit foca em redução de no-show; o projeto acadêmico `college-event-management-system` tem escopo parecido com atribuição de professor responsável). O PRD (§1) cita apenas 4 desses nomes (Eventbrite, Sched, SignUpGenius, Membership Toolkit) e só para justificar não-concorrência — perde as notas específicas de cada um e os outros 2 comparáveis (Minga, CampusGroups, e a referência ao projeto acadêmico) desaparecem por completo.

Isso é conteúdo de pesquisa/referência, não um risco ou decisão de escopo — portanto o risco de "perda" é baixo para o PRD em si (que não precisa ser um repositório de pesquisa de mercado), mas é exatamente o tipo de material que o autor do addendum pediu para não se perder. **Não é uma lacuna do PRD em si**, mas é candidato natural a um addendum.md do PRD (hoje inexistente) para não se perder de vez, já que o addendum do brief é insumo de uma etapa anterior e não é referenciado diretamente pelas próximas etapas (arquitetura, épicos).

---

## 3. Resumo por eixo pedido

- **Risco/racional do addendum sem nenhum rastro no PRD:** Gap A (risco de adoção/onboarding) — o único dos 3 riscos do addendum totalmente ausente.
- **Conteúdo que deveria migrar para um futuro addendum.md do PRD, em vez de ser descartado silenciosamente:** Gaps B, D e E (funcionalidades fora de escopo não nomeadas, nuance de fadiga de notificação futura, notas detalhadas da pesquisa de sistemas comparáveis) — e note-se que esse addendum.md do PRD ainda não existe.
- **Risco de onboarding/adoção (3º risco do addendum) — confirmado:** não aparece em nenhuma seção do PRD (§5, §6.2, §7, §8, ou qualquer `[NOTE FOR PM]`).
