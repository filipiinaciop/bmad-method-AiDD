# Addendum: PRD Germinare Tech

Material de apoio que não entrou no corpo do PRD, mas é referência útil para arquitetura, UX ou revisões futuras. Reproduzido/condensado do `addendum.md` original do Product Brief (2026-09-14), que o PRD cita mas não reproduz por extenso.

## Sistemas comparáveis (pesquisa de mercado, herdada do brief)

Não são concorrentes diretos — mostram o que soluções maduras de eventos escolares/institucionais costumam oferecer, e onde o Germinare Tech deliberadamente não vai atrás:

- **Minga** (minga.io) — plataforma escolar combinando gerenciamento de eventos, check-in e acompanhamento de engajamento do aluno.
- **SignUpGenius / SignUp.com** — inscrição por vaga, muito usada por associações de pais (PTA/PTO), com links compartilháveis e lembretes automáticos, sem exigir login.
- **Membership Toolkit** — conjunto voltado a PTA/PTO com inscrições, pagamentos, lembretes e redução de no-show.
- **CampusGroups (Ready Education)** — plataforma de eventos universitários com fluxo de aprovação, assinatura por chefe de departamento e reserva centralizada de sala/recurso.
- **Eventbrite / Planning Pod / Sched** — ferramentas genéricas de inscrição/ticketing que escolas às vezes reaproveitam por falta de sistema dedicado.
- **college-event-management-system** (`github.com/aakarsh15/college-event-management-system`) — projeto acadêmico público com escopo parecido: combina fluxo de aprovação com notificação por e-mail e atribuição de professor responsável.

## Risco de adoção (herdado do brief, não coberto em nenhuma seção do PRD)

Ferramentas escolares tendem a falhar mais por falta de suporte/treinamento contínuo e apoio de um "campeão" engajado (ex: um professor que defende o uso ativamente) do que por falta de funcionalidades. O PRD em si não trata onboarding — fica registrado aqui como ponto de atenção para quem for planejar o rollout na escola-piloto, fora do escopo de requisitos funcionais.

## Decisões de escopo e o raciocínio por trás delas (herdado do brief)

- **Professor e Admin como um único perfil**: decisão explícita do autor do brief para a primeira versão — simplifica o modelo de permissões. O PRD (§ Constraints and Guardrails → Guardrails de extensibilidade) já registra que a arquitetura não deve tornar essa separação futura inviável.
- **Lista de espera indefinida**: não foi rejeitada, apenas adiada — ver PRD §8 Questão 1.
- **Sem notificações automáticas no MVP**: decisão deliberada para reduzir escopo técnico inicial — ver PRD §5. Se/quando notificações automáticas forem adicionadas no futuro, calibrar o volume para não gerar fadiga de notificação (padrão comum nas ferramentas pesquisadas acima).
