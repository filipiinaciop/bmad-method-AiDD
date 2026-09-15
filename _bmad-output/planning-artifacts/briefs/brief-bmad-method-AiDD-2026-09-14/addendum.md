# Addendum: Germinare Tech

Material de apoio levantado durante a conversa que não entrou no brief principal, mas pode ser útil no PRD ou na arquitetura.

## Sistemas comparáveis (pesquisa de mercado)

Não são concorrentes diretos — a escola provavelmente não usa nenhum hoje — mas mostram o que soluções maduras de eventos escolares/institucionais costumam oferecer:

- **Minga** (minga.io) — plataforma escolar combinando gerenciamento de eventos, check-in e acompanhamento de engajamento do aluno.
- **SignUpGenius / SignUp.com** — inscrição por vaga, muito usada por associações de pais (PTA/PTO), com links compartilháveis e lembretes automáticos, sem exigir login.
- **Membership Toolkit** — conjunto voltado a PTA/PTO com inscrições, pagamentos, lembretes e redução de no-show.
- **CampusGroups (Ready Education)** — plataforma de eventos universitários com fluxo de aprovação, assinatura por chefe de departamento e reserva centralizada de sala/recurso.
- **Eventbrite / Planning Pod / Sched** — ferramentas genéricas de inscrição/ticketing que escolas às vezes reaproveitam por falta de sistema dedicado.
- **college-event-management-system** (`github.com/aakarsh15/college-event-management-system`) — projeto acadêmico público com escopo parecido: combina fluxo de aprovação com notificação por e-mail e atribuição de professor responsável.

## Funcionalidades vistas em outras soluções, deliberadamente fora do escopo inicial

Registradas aqui para não se perderem, e para servirem de referência caso o PRD ou uma versão futura queira reconsiderá-las:

- Lembretes automáticos por e-mail/SMS (quase universal nas ferramentas de PTA/PTO)
- Lista de espera automática quando um evento lota
- Sincronização/exportação de calendário (Google Calendar, iCal)
- Cobrança/ticketing para eventos pagos (rifas, viagens, feiras)
- Check-in/presença (QR code, totem)
- Eventos recorrentes / em série
- Aprovação em múltiplos níveis (mais de um aprovador)

## Riscos identificados na pesquisa (não é uma lista de funcionalidades, é o que observar)

- **Fadiga de aprovação**: se o volume de sugestões de alunos crescer, uma fila com um único revisor tende a virar gargalo ou "carimbo automático" sem revisão real. Vale observar se isso acontece durante o uso do sistema.
- **Rejeição silenciosa**: rejeitar uma sugestão sem registrar motivo e sem notificar o aluno é uma **decisão consciente da v1** (confirmada com o autor do brief), não um esquecimento. O risco real é o aluno não saber o desfecho da própria sugestão, o que pode gerar desconfiança e reenvios duplicados. Vale reavaliar se esse padrão de desconfiança/reenvio se confirmar recorrente no uso real.
- **Adoção**: ferramentas escolares tendem a falhar mais por falta de suporte/treinamento contínuo e apoio de um "campeão" engajado (ex: um professor que defende o uso) do que por falta de funcionalidades. É relevante que o PRD pense em onboarding, não só em funcionalidades.

## Decisões de escopo e o raciocínio por trás delas

- **Professor e Admin como um único perfil**: decisão explícita do usuário para a primeira versão — simplifica o modelo de permissões, mas o PRD/arquitetura devem deixar essa separação factível de adicionar depois (ex: não hardcode permissões assumindo perfil único para sempre).
- **Lista de espera indefinida**: não foi rejeitada, apenas adiada — o PRD deve decidir se resolve isso na v1 ou documenta como "fora do escopo, decisão pendente".
- **Sem notificações automáticas no MVP**: decisão deliberada para reduzir escopo técnico inicial; atualizações in-app substituem, por ora, e-mail/push. Se/quando notificações automáticas forem adicionadas no futuro, o volume deve ser calibrado para não cansar o usuário (fadiga de notificação é um padrão comum nas ferramentas pesquisadas).
