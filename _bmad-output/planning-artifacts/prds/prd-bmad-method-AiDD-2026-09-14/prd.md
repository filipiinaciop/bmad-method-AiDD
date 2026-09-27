---
title: "PRD: Germinare Tech"
status: final
created: 2026-09-14
updated: 2026-09-15
---

# PRD: Germinare Tech

## 0. Propósito do Documento

Este PRD traduz o [Product Brief: Germinare Tech](../../briefs/brief-bmad-method-AiDD-2026-09-14/brief.md) (finalizado em 2026-09-14) em requisitos acionáveis para as próximas etapas do método BMAD — UX, arquitetura e épicos/histórias. É dirigido a quem vai desenhar a experiência, definir a arquitetura técnica e quebrar o trabalho em histórias: a equipe do projeto acadêmico (aluno-desenvolvedor e professor-orientador da disciplina — não confundir com os perfis "Professor/Admin" e "Aluno" do próprio Germinare Tech, definidos no Glossário) e qualquer colega que assuma parte da implementação. O vocabulário é ancorado no Glossário (§3); funcionalidades são agrupadas com Requisitos Funcionais (FRs) numerados globalmente; suposições feitas sem confirmação explícita do autor aparecem inline como `[ASSUMPTION]` e estão indexadas em §9. Decisões de escopo já tomadas no brief (perfil único Professor/Admin, sem notificação automática, rejeição sem motivo) são herdadas aqui sem reabrir o debate — o racional de cada uma está em `addendum.md` do brief.

## 1. Visão

Germinare Tech é o sistema que centraliza o ciclo de vida de um evento escolar — da criação pelo professor até a inscrição do aluno — substituindo a combinação hoje usada de grupos de mensagens, avisos verbais e planilhas manuais. Um Professor/Admin cria um evento uma única vez e passa a ter, automaticamente, divulgação, inscrição e visibilidade de quem confirmou centralizadas num único lugar; um Aluno passa a ter uma fonte única de verdade sobre o que está acontecendo na escola, sem depender de estar no grupo certo, e um canal real — não uma conversa que se perde — para propor um evento que gostaria de ver acontecer.

O produto não compete em recursos com plataformas de eventos genéricas (Eventbrite, Sched) nem com ferramentas de associação de pais (SignUpGenius, Membership Toolkit): essas oferecem lembretes automáticos, cobrança e listas de espera que a v1 do Germinare Tech deliberadamente não cobre. A vantagem que o produto persegue é de ajuste — um fluxo desenhado especificamente para a rotina de uma escola, com o professor no centro da curadoria: toda sugestão de aluno passa por aprovação humana antes de existir como evento publicado.

Nasce como entrega de uma disciplina acadêmica (INT, 3º ano, método BMAD), construído para uma escola real e específica, mas com a estrutura pensada para eventualmente ser adaptada a outras escolas — sem que isso seja um requisito da v1.

## 2. Usuário-Alvo

### 2.1 Jobs To Be Done

**Professor/Admin**
- Quando crio um evento escolar, quero divulgá-lo e controlar inscrições em um único lugar, para não recriar comunicação e planilha do zero a cada evento.
- Quero ver, em tempo real, quantos alunos confirmaram presença, sem precisar contar manualmente em mensagens ou planilhas.
- Quero uma forma simples de peneirar ideias de alunos sem precisar responder detalhadamente a cada sugestão recebida.

**Aluno**
- Quero saber o que está acontecendo na escola sem depender de estar no grupo certo de mensagens.
- Quero me inscrever em um evento com um clique, e poder desistir da mesma forma se mudar de ideia.
- Quero ter um canal real para propor um evento que gostaria de ver acontecer, mesmo sabendo que a decisão final é do professor.

### 2.2 Não-Usuários (v1)

- **Pais/responsáveis** — não têm perfil ou acesso ao sistema na v1; comunicação com a família continua fora do Germinare Tech.
- **Público externo à escola** — o sistema não tem cadastro aberto; eventos não são divulgados fora da comunidade escolar autenticada.
- **Outras escolas** — a v1 é construída e operada para uma única escola. Suporte multi-escola é visão de produto (§ Visão de Futuro no brief), não requisito desta versão.

### 2.3 Principais Jornadas de Usuário

*Personas nomeadas ilustram os fluxos que o produto precisa realizar. Numeradas globalmente UJ-1 a UJ-6; FRs referenciam a jornada que realizam.*

- **UJ-1. Fernanda cria um evento e para de recriar planilhas.**
  - **Persona + contexto:** Fernanda é professora e organiza a Feira de Ciências da escola. Hoje ela cria um aviso, uma planilha de interessados e acompanha manualmente quem confirmou.
  - **Estado inicial:** autenticada como Professor/Admin, na tela de eventos.
  - **Caminho:** abre "Criar Evento" → preenche título, descrição, data/hora, local e define Vaga limite de 40 → publica.
  - **Clímax:** o evento aparece imediatamente na lista e no calendário dos alunos; Fernanda não precisa avisar ninguém manualmente.
  - **Resolução:** Fernanda volta à tela do evento ao longo da semana e vê a contagem de inscritos subir sem esforço.
  - **Caso de borda:** se Fernanda tentar publicar sem data/hora, o sistema bloqueia com uma mensagem de campo obrigatório. `[ASSUMPTION: campos obrigatórios mínimos de um evento são título, data/hora e local; descrição e vaga são opcionais]`

- **UJ-2. Lucas descobre a Feira de Ciências e se inscreve num clique.**
  - **Persona + contexto:** Lucas é aluno e não está no grupo de WhatsApp da turma que divulgou o evento.
  - **Estado inicial:** autenticado como Aluno, abre o app pelo celular.
  - **Caminho:** abre a lista de eventos → alterna para visão de calendário → toca no evento "Feira de Ciências" → lê o detalhe (vagas restantes, data, local) → toca em "Inscrever-se".
  - **Clímax:** o botão muda para "Inscrito" e o número de vagas restantes atualiza na hora — Lucas sabe que está confirmado sem precisar perguntar a ninguém.
  - **Resolução:** Lucas encontra depois o evento em "Minhas Inscrições" `[ASSUMPTION: existe uma visão de "meus eventos inscritos" para o aluno acompanhar e cancelar — não descrita explicitamente no brief, mas necessária para viabilizar UJ-3 sem procurar o evento na lista geral novamente]`.
  - **Caso de borda:** se as vagas se esgotarem entre Lucas abrir o detalhe e tocar em inscrever-se, o sistema recusa a inscrição e informa que a vaga esgotou.

- **UJ-3. Lucas desiste e cancela a própria inscrição.**
  - Lucas, tendo mudado de planos, abre "Minhas Inscrições", encontra o evento e toca em "Cancelar inscrição" — a vaga volta a ficar disponível para outro aluno. *Forma leve, por ser variação direta de UJ-2 sem decisão nova a explicitar.*

- **UJ-4. Lucas sugere um evento que gostaria de ver acontecer.**
  - **Persona + contexto:** Lucas quer um torneio de xadrez na escola, mas hoje isso morreria numa conversa de corredor.
  - **Estado inicial:** autenticado como Aluno, na lista de eventos.
  - **Caminho:** toca em "Sugerir evento" → preenche título e descrição da ideia `[ASSUMPTION: campos da sugestão são título + descrição; sem data/local obrigatórios, já que quem decide os detalhes finais é o professor]` → envia.
  - **Clímax:** a sugestão sai da tela de Lucas com confirmação de "enviada para análise" — existe agora, pela primeira vez, um registro formal da ideia.
  - **Resolução:** Lucas não recebe atualização sobre o desfecho — decisão consciente da v1 (ver addendum do brief); ele pode voltar a checar se ela virou evento publicado.

- **UJ-5. Fernanda aprova uma sugestão e a transforma em evento.**
  - **Persona + contexto:** Fernanda revisa periodicamente a fila de sugestões pendentes.
  - **Estado inicial:** autenticada como Professor/Admin, na fila de análise.
  - **Caminho:** abre a fila → lê a sugestão do torneio de xadrez → toca em "Aprovar" → o sistema abre a tela de criação de evento já preenchida com título e descrição da sugestão → Fernanda completa data, local e vaga → publica.
  - **Clímax:** o evento existe e está visível para os alunos; Fernanda decidiu os detalhes finais sem digitar tudo do zero.
  - **Resolução:** a sugestão sai da fila de pendentes.

- **UJ-6. Fernanda rejeita uma sugestão sem fricção.**
  - Fernanda lê uma sugestão fora de escopo (ex.: um evento pago) e toca em "Rejeitar" — a sugestão some da fila, sem exigir que ela escreva um motivo. Decisão consciente da v1: reduz a carga do professor por sugestão, ao custo do aluno não saber o desfecho (risco registrado em §8).

## 3. Glossário

- **Evento** — atividade escolar (feira, palestra, competição, atividade extracurricular) criada por um Professor/Admin. Tem um Status, opcionalmente um limite de Vaga, e zero ou mais Inscrições.
- **Professor/Admin** — perfil único de usuário com poderes de administração: cria, edita e cancela Eventos, visualiza Inscritos, e aprova ou rejeita Sugestões. Sem hierarquia interna na v1 (ver §5).
- **Aluno** — perfil de usuário que navega Eventos, se Inscreve, cancela a própria Inscrição e envia Sugestões.
- **Status do Evento** — um de: *Publicado* (visível e aberto a inscrição, sujeito a Vaga), *Cancelado* (visível, mas fechado a nova inscrição; estado terminal — a passagem do tempo não o transforma em *Encerrado*), *Encerrado* (transição automática a partir de *Publicado* quando a data/hora do evento já passa; fechado a nova inscrição).
- **Vaga** — limite opcional de Inscrições simultâneas em um Evento. Quando não definida, inscrição é ilimitada.
- **Inscrição** — vínculo entre um Aluno e um Evento indicando confirmação de presença. Um Aluno tem no máximo uma Inscrição *ativa* por Evento; uma Inscrição cancelada (FR-16) permanece como registro histórico *inativo*, e o Aluno pode criar uma nova Inscrição ativa no mesmo Evento depois de cancelar.
- **Sugestão de Evento** — proposta de um Aluno para um Evento que ainda não existe. Tem status *pendente*, *aprovada* ou *rejeitada* — os três estados são persistidos como registro histórico; "aprovada"/"rejeitada" apenas tiram a Sugestão da Fila de Análise (§4.6), não implicam exclusão do registro.
- **Fila de Análise** — lista de Sugestões pendentes, visível apenas a Professor/Admin.
- **Conta** — credencial de acesso (Professor/Admin ou Aluno) provisionada previamente pela escola dentro do próprio sistema; não há autocadastro.

## 4. Funcionalidades

### 4.1 Autenticação e Gestão de Contas

**Descrição:** Não há cadastro aberto — toda Conta de Aluno ou Professor/Admin é criada dentro do próprio Germinare Tech por um Professor/Admin já existente `[ASSUMPTION: a primeira conta Professor/Admin da escola é provisionada manualmente fora do fluxo do produto, ex. via seed/setup inicial — não é um FR de usuário]`. Login é feito com e-mail e senha — mecanismo confirmado nesta sessão de PRD junto com a decisão de provisionamento manual de contas (ver FR-2), não especificado no brief original. Controle de acesso por perfil restringe telas e ações desde o primeiro acesso.

**Requisitos Funcionais:**

#### FR-1: Login por credenciais

Aluno ou Professor/Admin pode autenticar-se no sistema com e-mail e senha.

**Consequências (testáveis):**
- Credenciais inválidas retornam erro sem indicar se o e-mail existe (evita enumeração de contas).
- Sessão autenticada é exigida para qualquer tela além do login.

#### FR-2: Criação manual de conta

Professor/Admin pode criar uma nova Conta (Aluno ou Professor/Admin), informando nome, e-mail e senha inicial.

**Consequências (testáveis):**
- Sistema impede duas Contas com o mesmo e-mail.
- Conta criada pode autenticar-se imediatamente com a senha inicial definida.

**Out of Scope:** importação em lote (CSV) e integração com sistema acadêmico externo — decisão confirmada nesta sessão de PRD (registrada em `.memlog.md`), não especificada no brief original, que apenas dizia que contas são "fornecidas previamente pela escola".

#### FR-3: Controle de acesso por perfil

Sistema restringe telas e ações conforme o perfil da Conta autenticada (Aluno vs. Professor/Admin).

**Consequências (testáveis):**
- Aluno não consegue acessar telas de criação/edição/cancelamento de evento, fila de análise ou lista de inscritos de outros alunos, mesmo manipulando a URL diretamente.
- Professor/Admin acessa todas as telas do sistema (perfil único, sem hierarquia interna — ver §5).

### 4.2 Gestão de Eventos (Professor/Admin)

**Descrição:** Professor/Admin cria, edita e cancela Eventos, e controla se há limite de Vaga. Realiza UJ-1.

**Requisitos Funcionais:**

#### FR-4: Criação de evento

Professor/Admin pode criar um Evento com título, descrição, data/hora, local e, opcionalmente, um limite de Vaga. Realiza UJ-1.

**Consequências (testáveis):**
- Evento criado nasce com Status *Publicado*.
- Se Vaga não for definida, o Evento aceita inscrição sem limite de capacidade — convenção de teste: aceitar ao menos 1000 Inscrições sem rejeitar por capacidade.
- Título, data/hora e local são obrigatórios; descrição e Vaga são opcionais. `[ASSUMPTION]`

#### FR-5: Edição de evento

Professor/Admin pode editar os dados de um Evento existente (qualquer Status).

**Consequências (testáveis):**
- Alterar a Vaga para um valor abaixo do número de Inscrições já confirmadas é bloqueado pelo sistema. `[ASSUMPTION: comportamento não descrito no brief; escolhido para não invalidar inscrições existentes silenciosamente — revisar com o autor]`
- Qualquer Professor/Admin pode editar um Evento criado por outro Professor/Admin — consistente com o perfil único sem hierarquia (§3, §5); não há restrição de "dono" do Evento.
- Editar a data/hora de um Evento para o futuro **não** reabre um Evento *Cancelado* nem reverte um Evento *Encerrado* para *Publicado* — essas duas transições são terminais (ver §3 Glossário) e só podem ser desfeitas recriando o Evento. `[ASSUMPTION: comportamento não descrito no brief; escolhido para manter Cancelado/Encerrado como estados terminais simples de raciocinar]`

#### FR-6: Cancelamento de evento

Professor/Admin pode cancelar um Evento *Publicado*, mudando seu Status para *Cancelado*.

**Consequências (testáveis):**
- Evento cancelado permanece visível na lista/calendário e no detalhe, mas não aceita novas Inscrições (ver FR-14).
- Inscrições já existentes não são removidas automaticamente ao cancelar — permanecem como registro histórico. `[ASSUMPTION]`
- *Cancelado* é um estado terminal: nenhuma ação do sistema (incluindo a passagem do tempo, ver FR-7) o transforma em *Encerrado*.

#### FR-7: Encerramento automático de evento

Sistema muda o Status de um Evento *Publicado* para *Encerrado* quando sua data/hora já passou. Aplica-se apenas a Eventos *Publicado*; um Evento *Cancelado* nunca transiciona para *Encerrado* (estado terminal, ver §3 e FR-6).

**Consequências (testáveis):**
- Status é recalculado a cada carregamento de tela que o exibe (mesmo padrão de "não tempo real, mas atualizado no carregamento" usado em FR-8/FR-11/FR-17) — não depende de um job em segundo plano. `[ASSUMPTION: escolhido para evitar declarar um mecanismo de job/cron que a etapa de arquitetura ainda não definiu]`
- `[ASSUMPTION: transição é automática e determinada pela data/hora do evento, não uma ação manual do Professor/Admin — o brief lista "encerrado" como status possível sem descrever o gatilho]`

#### FR-8: Visualização de inscritos

Professor/Admin pode visualizar a lista de Alunos inscritos em um Evento específico.

**Consequências (testáveis):**
- Lista mostra nome do Aluno e é recarregada com o estado atual de inscrições/cancelamentos a cada carregamento da tela (mesmo padrão de FR-11).

### 4.3 Descoberta de Eventos (Aluno)

**Descrição:** Aluno navega os Eventos disponíveis em lista ou calendário e consulta o detalhe de um Evento. Realiza UJ-2.

**Requisitos Funcionais:**

#### FR-9: Listagem de eventos

Aluno pode visualizar os Eventos em formato de lista. Realiza UJ-2.

**Consequências (testáveis):**
- Lista inclui Eventos nos três Status (Publicado, Cancelado, Encerrado), com o Status visível para cada item. `[ASSUMPTION: alunos veem eventos cancelados/encerrados para dar contexto histórico, e não apenas os publicados — confirmar preferência]`

#### FR-10: Listagem de eventos em calendário

Aluno pode visualizar os mesmos Eventos em formato de calendário, navegável por mês. Realiza UJ-2.

**Consequências (testáveis):**
- Um Evento aparece na data correspondente à sua data/hora definida.
- Alternar entre lista e calendário preserva os mesmos Eventos e Status.

#### FR-11: Detalhe do evento

Aluno pode abrir o detalhe de um Evento e ver descrição, data/hora, local, Status e vagas restantes (quando houver limite de Vaga).

**Consequências (testáveis):**
- Vagas restantes exibidas = limite de Vaga menos Inscrições ativas, atualizado a cada carregamento da tela.

### 4.4 Inscrição em Eventos (Aluno)

**Descrição:** Aluno se inscreve e cancela sua própria Inscrição, com o sistema impedindo estados inválidos. Realiza UJ-2, UJ-3.

**Requisitos Funcionais:**

#### FR-12: Inscrição em evento

Aluno pode se inscrever em um Evento com Status *Publicado*. Realiza UJ-2.

**Consequências (testáveis):**
- Inscrição só é aceita se o Evento estiver *Publicado* e (quando houver limite de Vaga) houver vaga disponível no momento da confirmação.

#### FR-13: Prevenção de inscrição duplicada

Sistema impede que o mesmo Aluno se inscreva duas vezes no mesmo Evento.

**Consequências (testáveis):**
- A prevenção de duplicidade se aplica apenas a Inscrições simultaneamente *ativas*: nova tentativa de inscrição enquanto já existe uma Inscrição ativa do mesmo Aluno no mesmo Evento é rejeitada, informando explicitamente que ele já está inscrito neste Evento, sem criar registro duplicado.
- Um Aluno pode se inscrever novamente em um Evento depois de cancelar uma Inscrição anterior nele (FR-16) — isso não é tratado como duplicidade.
- Duas requisições de inscrição simultâneas do mesmo Aluno para o mesmo Evento resultam em no máximo uma Inscrição ativa (mesma garantia de concorrência de FR-15).

#### FR-14: Bloqueio de inscrição em evento indisponível

Sistema impede inscrição em Evento com Status *Cancelado* ou *Encerrado*.

**Consequências (testáveis):**
- Ação de "Inscrever-se" não é oferecida (ou é bloqueada no back-end mesmo se a tela estiver desatualizada) para Eventos fora do Status *Publicado*.

#### FR-15: Respeito ao limite de vaga

Sistema impede inscrição além da capacidade quando o Evento tem limite de Vaga definido.

**Consequências (testáveis):**
- Quando Inscrições ativas = limite de Vaga, novas tentativas de inscrição são rejeitadas.
- Quando N requisições concorrentes disputam a(s) última(s) vaga(s) restante(s), exatamente o número de vagas restantes é aceito e as demais são rejeitadas — a contagem final de Inscrições ativas nunca excede o limite de Vaga, independentemente de quantas requisições concorrentes chegaram. Convenção de teste: simular ao menos 10 requisições concorrentes contra 1 vaga restante.

#### FR-16: Cancelamento da própria inscrição

Aluno pode cancelar sua própria Inscrição em um Evento. Realiza UJ-3.

**Consequências (testáveis):**
- Cancelamento libera uma vaga imediatamente para outros Alunos, quando o Evento tem limite de Vaga.
- Um Aluno só pode cancelar a própria Inscrição, nunca a de outro Aluno — a única exceção é o Professor/Admin, que pode cancelar a Inscrição de qualquer Aluno (FR-22).

#### FR-17: Minhas inscrições

Aluno pode visualizar a lista dos próprios Eventos em que está inscrito. Realiza UJ-2, UJ-3.

**Consequências (testáveis):**
- Lista é recarregada com o estado atual de inscrições e cancelamentos do próprio Aluno a cada carregamento da tela (mesmo padrão de FR-11).
- `[ASSUMPTION: tela não descrita explicitamente no brief — inferida como necessária para o Aluno encontrar e cancelar suas próprias inscrições sem procurar o evento na lista geral]`

### 4.5 Sugestão de Evento (Aluno)

**Descrição:** Qualquer Aluno pode propor um Evento novo. Realiza UJ-4.

**Requisitos Funcionais:**

#### FR-18: Envio de sugestão

Aluno pode enviar uma Sugestão de Evento com título e descrição. Realiza UJ-4.

**Consequências (testáveis):**
- Sugestão enviada aparece imediatamente na Fila de Análise com status *pendente*.
- `[ASSUMPTION: campos da sugestão são apenas título + descrição, sem data/local obrigatórios — o professor decide os detalhes finais na aprovação, conforme §"A Solução" do brief]`

**Feature-specific NFRs:**
- Aluno não tem visibilidade sobre outras Sugestões além das que ele mesmo enviou (evita expor ideias de colegas antes da aprovação). `[ASSUMPTION]` Ver FR-24 para a tela que torna essa visibilidade concreta.

### 4.6 Fila de Análise de Sugestões (Professor/Admin)

**Descrição:** Professor/Admin revisa Sugestões pendentes e decide aprovar ou rejeitar cada uma. Realiza UJ-5, UJ-6.

**Requisitos Funcionais:**

#### FR-19: Visualização da fila de análise

Professor/Admin pode visualizar todas as Sugestões com status *pendente*.

**Consequências (testáveis):**
- Fila mostra título, descrição e autor de cada Sugestão pendente.

#### FR-20: Aprovação de sugestão

Professor/Admin pode aprovar uma Sugestão, o que abre a tela de criação de Evento pré-preenchida com título e descrição da Sugestão. Realiza UJ-5.

**Consequências (testáveis):**
- Aprovar uma Sugestão **não** publica um Evento automaticamente — o Professor/Admin ainda precisa completar campos obrigatórios (ao menos data/hora e local) e confirmar a criação, conforme FR-4.
- Sugestão muda de status para *aprovada* e sai da Fila de Análise assim que aprovada, independentemente de o Evento resultante ser efetivamente publicado ou descartado nesse passo — o registro da Sugestão persiste (ver §3 Glossário), não é excluído. `[ASSUMPTION: se o professor abandonar a tela de criação pré-preenchida sem publicar, a sugestão não retorna à fila — comportamento razoável, mas não confirmado]`
- Quando o Evento é efetivamente publicado a partir de uma Sugestão aprovada, o sistema registra um vínculo entre a Sugestão e o Evento resultante — necessário para SM-C1 (§7) poder ser auditado.

#### FR-21: Rejeição de sugestão

Professor/Admin pode rejeitar uma Sugestão, removendo-a da Fila de Análise. Realiza UJ-6.

**Consequências (testáveis):**
- Rejeição não exige motivo e não gera notificação ao Aluno — decisão consciente da v1.
- Sugestão muda de status para *rejeitada* e sai da Fila de Análise — o registro persiste (ver §3 Glossário) para fins de auditoria interna (SM-C1), mas nenhuma tela de Professor/Admin ou Aluno reabre uma Sugestão já decidida: "não recuperável" refere-se à impossibilidade de reverter a decisão pela interface, não à exclusão do registro.

**Notes:** `[NOTE FOR PM]` A ausência de motivo/notificação na rejeição é decisão deliberada (ver addendum do brief), mas o risco de desconfiança e reenvio duplicado do Aluno está registrado como item a observar em §8.

### 4.7 Complementos de Cobertura (adicionados na revisão de Finalize)

**Descrição:** Estes três FRs foram adicionados após a revisão adversarial do rascunho inicial, para fechar lacunas onde a narrativa (UJs) ou uma suposição já confirmada (§8, §9) prometia um comportamento sem FR correspondente. Numerados na sequência global (FR-22 a FR-24) apesar de agrupados aqui por terem surgido juntos na revisão, não por pertencerem a uma feature nova.

**Requisitos Funcionais:**

#### FR-22: Cancelamento de inscrição pelo Professor/Admin

Professor/Admin pode cancelar a Inscrição de qualquer Aluno em um Evento, além do próprio Aluno (FR-16). Decisão tomada nesta revisão de Finalize — útil para liberar vaga de um Aluno que avisou que não vai comparecer.

**Consequências (testáveis):**
- Cancelamento pelo Professor/Admin libera a vaga imediatamente, com o mesmo efeito de FR-16.
- `[ASSUMPTION: não há exigência de notificar o Aluno desse cancelamento administrativo — mesma lógica de "sem notificação automática" de §5]`

#### FR-23: Redefinição de senha de Conta existente

Professor/Admin pode redefinir a senha de qualquer Conta existente (Aluno ou Professor/Admin). Operacionaliza a suposição confirmada em §9 de que não há self-service de recuperação de senha na v1.

**Consequências (testáveis):**
- Nova senha definida pelo Professor/Admin permite login imediato da Conta afetada.
- Sistema nunca exibe a senha atual de uma Conta em nenhuma tela — apenas permite defini-la de novo.

#### FR-24: Minhas Sugestões

Aluno pode visualizar as próprias Sugestões enviadas e o status de cada uma (pendente / aprovada / rejeitada). Realiza UJ-4 (resolução: "ele pode voltar a checar se ela virou evento publicado").

**Consequências (testáveis):**
- Lista mostra apenas Sugestões enviadas pelo próprio Aluno, nunca de outros alunos (mesma regra da NFR de FR-18).
- Status refletido é o status persistido da Sugestão (ver Cross-Cutting NFRs → Retenção de histórico).

## 5. Non-Goals (Explícito)

- Germinare Tech **não** compete com plataformas de eventos genéricas (Eventbrite, Sched) nem com ferramentas de associação de pais (SignUpGenius, Membership Toolkit) — não replica lembretes automáticos, cobrança nem listas de espera dessas ferramentas na v1.
- **Não** envia notificações automáticas por e-mail ou push — toda atualização é visível apenas dentro do app. `[NOTE FOR PM]` se notificações automáticas forem adicionadas em versão futura, o volume deve ser calibrado deliberadamente para não gerar fadiga de notificação — padrão comum observado nas ferramentas pesquisadas (addendum do brief).
- **Não** cobra ou processa pagamentos para eventos (rifas, viagens, feiras pagas).
- **Não** faz check-in ou controle de presença no dia do evento.
- **Não** sincroniza ou exporta para calendários externos (Google Calendar, iCal).
- **Não** suporta eventos recorrentes ou em série — cada Evento é criado individualmente.
- **Não** tem aprovação em múltiplos níveis para Sugestões — um único Professor/Admin aprova ou rejeita, consistente com o perfil único da v1.
- **Não** diferencia permissões entre professor e administração/coordenação — perfil Professor/Admin é único e sem hierarquia interna na v1.
- **Não** atende múltiplas escolas na v1 — é construído e operado para uma escola específica. `[NOTE FOR PM]` a arquitetura deve evitar decisões que tornem essa extensão inviável no futuro, mas isso não é um requisito funcional desta versão (tratamento técnico fica para a etapa de arquitetura).
- **Não** registra motivo de rejeição de sugestão, nem notifica o Aluno sobre o resultado da análise.
- **Não** inclui edição, desativação ou remoção de uma Conta existente — a v1 cobre criação (FR-2) e redefinição de senha (FR-23); uma Conta criada permanece ativa indefinidamente. `[NOTE FOR PM]` decisão de escopo desta revisão de Finalize, não do brief original — revisitar se a escola precisar desligar contas (ex.: aluno formado, professor que saiu).

## 6. Escopo do MVP

### 6.1 Dentro do Escopo

- Autenticação e controle de acesso por perfil (FR-1 a FR-3).
- CRUD de eventos pelo Professor/Admin, com Status Publicado/Cancelado/Encerrado (FR-4 a FR-7).
- Limite de vaga opcional por evento, com bloqueio de inscrição além da capacidade (FR-4, FR-15).
- Visualização de inscritos por evento (FR-8).
- Listagem de eventos em lista e calendário, e detalhe de evento (FR-9 a FR-11).
- Inscrição e cancelamento de inscrição pelo aluno, com prevenção de duplicidade e de inscrição em evento indisponível (FR-12 a FR-17).
- Sugestão de evento pelo aluno, com acompanhamento do status pelo próprio aluno (FR-18, FR-24).
- Fila de análise de sugestões com aprovação (pré-preenche criação) e rejeição (remove da fila, sem motivo) (FR-19 a FR-21).
- Cancelamento de inscrição pelo Professor/Admin em nome de um aluno, além do autoatendimento (FR-22).
- Redefinição de senha de uma Conta existente pelo Professor/Admin (FR-23).

### 6.2 Fora do Escopo do MVP

- Notificações automáticas por e-mail/push — reduz escopo técnico inicial; atualizações in-app substituem por ora.
- Lista de espera quando um evento lota — **decisão explicitamente adiada, não uma exclusão permanente.** `[NOTE FOR PM]` revisitar se o padrão de eventos lotados se mostrar recorrente no uso real.
- Cobrança/ticketing para eventos pagos.
- Check-in / controle de presença no dia do evento.
- Diferenciação de permissões entre professor e administração/coordenação.
- Suporte multi-escola — deferido para uma eventual v2, conforme Visão do brief.
- Registro de motivo de rejeição de sugestão, ou notificação ao aluno sobre o resultado.
- Importação em lote de contas (CSV) ou integração com sistema acadêmico externo — contas são criadas manualmente pelo Professor/Admin na v1 (FR-2).
- Auto-atendimento de "esqueci minha senha" — ver Open Question em §8.

## 7. Critérios de Sucesso

Projeto acadêmico avaliado de forma qualitativa/demonstrativa — não há meta numérica definida, coerente com o brief.

**Primário**
- **SM-1**: Fluxo funcional ponta a ponta sem erros que quebrem o caminho principal: Professor/Admin cria um evento; Aluno encontra, se inscreve e cancela a inscrição; Aluno sugere um evento e o Professor/Admin aprova (pré-preenchendo a criação de um evento, conforme FR-20) ou rejeita. Valida FR-4, FR-12, FR-16, FR-18, FR-20, FR-21.

**Secundário**
- **SM-3**: Redução de dispersão demonstrada qualitativamente — a escola-piloto consegue apontar que centralizar eventos em um só lugar é melhor do que coordenar por planilha e mensagens, mesmo sem medição quantitativa. Valida FR-9, FR-10, FR-19.

**Contra-métricas (não otimizar)**
- **SM-C1**: Volume de sugestões aprovadas sem revisão real ("carimbo automático") não deve crescer como atalho para vencer a fadiga de aprovação identificada na pesquisa de mercado registrada no `addendum.md` do brief (risco "Fadiga de aprovação") — contrabalança SM-1 e SM-3: um fluxo rápido de aprovação não pode significar curadoria de fachada.

**Critério de Entrega Acadêmica** *(fora da validação do produto — mede o processo da disciplina, não o thesis do produto)*
- **SM-2**: Entrega do processo BMAD completo — Brief, PRD, arquitetura, épicos/histórias e build concluídos dentro do cronograma da disciplina.

## 8. Questões em Aberto

1. **Lista de espera** — decisão adiada no brief: a v1 resolve isso de alguma forma leve, ou permanece completamente fora de escopo até haver evidência de necessidade real? (relacionado a §6.2)
2. **Escala esperada da fila de análise** — quantas sugestões por semana/mês são esperadas? Relevante para saber se a fadiga de aprovação (risco identificado no addendum do brief) é uma preocupação real de v1 ou algo a observar depois do lançamento.
3. **Reenvio de sugestão rejeitada** — se um Aluno reenviar a mesma ideia repetidamente após rejeição silenciosa (risco identificado no addendum), a v1 precisa de algum limite ou tratamento, ou isso fica para observação pós-lançamento?
4. **Eventos passados no calendário/lista** — Alunos devem continuar vendo Eventos com Status *Encerrado* indefinidamente, ou há um horizonte de retenção/arquivamento? (relacionado a FR-9, FR-10)
5. **Suporte e adoção** — o addendum do brief observa que ferramentas escolares tendem a falhar mais por falta de suporte/treinamento contínuo e de um "professor campeão" engajado do que por falta de funcionalidades (ver `addendum.md` deste PRD). Como a escola vai garantir esse suporte contínuo para o Germinare Tech pegar tração? Não é um requisito funcional, mas é um risco real para o Critério de Sucesso SM-3.

## 9. Índice de Suposições

- §2.3 UJ-1 — campos obrigatórios de um evento (título, data/hora, local; descrição e vaga opcionais).
- §2.3 UJ-2 — existe uma visão "Minhas Inscrições" para o aluno.
- §2.3 UJ-4 — sugestão de evento tem apenas título + descrição, sem data/local obrigatórios.
- §4.1 FR-2 (descrição) — primeira conta Professor/Admin é provisionada fora do fluxo de produto (seed/setup inicial).
- §4.2 FR-4 — campos obrigatórios de evento (mesma suposição da UJ-1).
- §4.2 FR-5 — reduzir vaga abaixo do nº de inscrições confirmadas é bloqueado; editar data/hora de um Evento Cancelado/Encerrado para o futuro não reabre o Evento (Cancelado/Encerrado são estados terminais).
- §4.2 FR-6 — cancelar evento não remove inscrições existentes, mantidas como histórico.
- §4.2 FR-7 — encerramento de evento é automático por data/hora, não uma ação manual; Status é recalculado a cada carregamento de tela, não por job em segundo plano (mecanismo real fica para a etapa de arquitetura).
- §4.3 FR-9 — alunos veem eventos em todos os Status (não só Publicado) na lista/calendário.
- §4.4 FR-17 — existência da tela "Minhas Inscrições" (mesma suposição da UJ-2).
- §4.5 FR-18 — campos da sugestão (mesma suposição da UJ-4).
- §4.5 FR-18 (NFR) — aluno só vê as próprias sugestões, não as de outros alunos.
- §4.6 FR-20 — sugestão aprovada não retorna à fila se o professor abandonar a criação do evento sem publicar.
- §4.7 FR-22 — cancelamento administrativo de inscrição não gera notificação ao Aluno, mesma lógica do non-goal de notificações.
- Recuperação de senha — redefinição é manual pelo Professor/Admin na v1 via FR-23, sem fluxo de self-service (confirmada aqui, não mantida como Questão em Aberto por já ter resposta).
- Constraints and Guardrails → Plataforma — sistema web responsivo o suficiente para uso confortável no celular, sem app nativo na v1.

*Nota: como §9 antecede as seções "Constraints and Guardrails" e "Cross-Cutting NFRs" na ordem do documento, qualquer nova suposição introduzida ali deve ser adicionada manualmente a este índice — não há varredura automática.*

## Constraints and Guardrails

**Privacy** — O sistema lida com dados de Alunos, potencialmente menores de idade. Escopo confirmado nesta sessão de PRD (não derivado do brief/addendum originais). Como NFR leve (adequado ao escopo acadêmico, sem exigir DPO/auditoria formal):
- Coleta de dados mínima: nome, e-mail e histórico de inscrições/sugestões — nada além do necessário para o fluxo descrito neste PRD.
- Acesso aos dados de um Aluno restrito por perfil (FR-3): um Aluno não acessa dados de outro Aluno; Professor/Admin acessa o necessário para gerir eventos e inscrições.
- Nenhum compartilhamento externo ou exportação de dados de Aluno na v1.

**Guardrails de extensibilidade** *(não são requisitos funcionais da v1, mas restringem decisões de modelagem na etapa de arquitetura)*
- O modelo de permissões não deve assumir que Professor/Admin permanecerá um perfil único para sempre — a separação futura entre professor e administração/coordenação (fora de escopo, §5) deve continuar factível de adicionar.
- O modelo de dados não deve assumir uma única escola de forma irreversível — suporte multi-escola é visão de produto (não requisito da v1), mas não deve ser bloqueado por decisões estruturais tomadas agora.

## Cross-Cutting NFRs

- **Confiabilidade do fluxo principal:** os caminhos descritos em UJ-1 a UJ-6 devem operar sem erros que interrompam o usuário — é o próprio Critério de Sucesso SM-1.
- **Integridade de dados:** as invariantes de FR-13 (sem inscrição duplicada ativa) e FR-15 (sem exceder vaga) devem se manter mesmo sob tentativas concorrentes — tanto de alunos diferentes disputando a última vaga quanto do mesmo aluno enviando duas requisições rapidamente (duplo clique, duas abas).
- **Retenção de histórico:** Sugestões (§4.5, §4.6) e Inscrições canceladas (FR-16) nunca são fisicamente excluídas — persistem com seu status para permitir auditoria (ex.: SM-C1) e reabertura de inscrição (FR-13).
- **Plataforma:** aplicação web, acessível por navegador em desktop e celular. `[ASSUMPTION: responsivo o suficiente para uso confortável no celular, já que Alunos tendem a acessar via smartphone — sem exigir app nativo na v1]`
- **Desempenho:** sem exigência formal de SLA dado o escopo acadêmico e de uma única escola; o sistema é dimensionado para o volume de uma escola (dezenas a poucas centenas de contas), não para escala multi-tenant.

---

*PRD elaborado no caminho rápido (fast path) a partir do Product Brief finalizado, revisado por checklist de qualidade, reconciliação com brief/addendum e revisão adversarial, e fechado com o autor em 2026-09-15. Itens `[ASSUMPTION]` (§9) e Questões em Aberto (§8) que restaram são deferimentos conscientes para as próximas etapas (UX, arquitetura, épicos/histórias), não pendências de revisão deste documento.*


## 10. Reconciliation decisions for the MVP implementation

The following decisions were confirmed by Group 3 on 2026-09-04 and supersede conflicting assumptions in earlier planning sections for this academic MVP:

- Authentication uses mock accounts and browser `localStorage`; it is not production authentication. Passwords used in the demo have a minimum length of eight characters and sanitized user objects never expose passwords.
- `ADMIN` has the same capabilities as `PROFESSOR` in v1. `VALIDAR_EVENTO` remains the single permission for approving or denying pending event requests.
- Student-created events start as `PENDENTE`; Professor/Admin-created events start as `APROVADO`; a Professor/Admin can change a pending event to `APROVADO` or `NEGADO`; cancellation produces terminal `CANCELADO`. `ENCERRADO` is deferred from the MVP.
- Event capacity is optional. Suggestions are persisted with author, status, review metadata and an optional link to the resulting event.
- Enrollments have `ATIVA` or `CANCELADA` status, preserve history, allow only one active enrollment per student/event and allow re-enrollment after cancellation.
- The visual and interaction contract is `UX-001`/`UX-002` in `docs/01-inputs/ux.md`. The application uses the mock-data/localStorage strategy from `DEC-001` and the validation commands from `DEC-009`.
