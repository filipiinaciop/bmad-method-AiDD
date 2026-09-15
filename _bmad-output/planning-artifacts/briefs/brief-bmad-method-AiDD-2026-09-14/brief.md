---
title: "Product Brief: Germinare Tech"
status: final
created: 2026-09-14
updated: 2026-09-14
---

# Product Brief: Germinare Tech

## Resumo Executivo

Germinare Tech é um sistema web para gerenciar eventos escolares, pensado para substituir a combinação de planilhas e grupos de mensagens que hoje coordena a organização e inscrição em eventos de uma escola. Professores (com poderes de administração) criam, editam e cancelam eventos; alunos consultam esses eventos em lista ou calendário, se inscrevem, cancelam a inscrição e podem sugerir novos eventos. Sugestões de alunos entram em fila de análise para aprovação ou rejeição do professor (detalhes em A Solução).

O objetivo é centralizar em um único lugar o que hoje está espalhado, reduzindo o retrabalho de comunicação e dando a alunos e professores uma fonte única de verdade sobre o que está acontecendo na escola. O projeto nasce como uma etapa acadêmica (disciplina INT, 3º ano, seguindo o método BMAD), construído inicialmente para uma escola específica, mas com a estrutura pensada para poder ser adaptada a outras escolas no futuro.

## O Problema

Hoje a organização de eventos escolares — feiras, palestras, competições, atividades extracurriculares — depende de canais dispersos: mensagens em grupos de WhatsApp, avisos verbais, planilhas mantidas manualmente por professores. Isso gera consequências concretas:

- **Informação fragmentada**: um aluno pode não saber que um evento existe, ou descobrir tarde demais, porque a informação foi divulgada em um grupo do qual ele não participa ou porque ele não viu a mensagem.
- **Inscrição sem controle central**: contar interessados via mensagem ou planilha é manual, sujeito a erro, e não escala — não há uma forma simples de um professor saber, em tempo real, quantos alunos estão confirmados.
- **Ideias de alunos se perdem**: quando um aluno tem uma sugestão de evento, não existe um canal formal para isso virar algo real — a sugestão fica em uma conversa e se dilui.
- **Trabalho repetido para o professor**: cada evento novo significa recriar a comunicação do zero — novo aviso, nova planilha, novo acompanhamento manual de quem confirmou.

Nada disso é crítico isoladamente, mas o custo acumulado é tempo perdido por professores em tarefas administrativas e experiência inconsistente para os alunos.

## A Solução

Germinare Tech centraliza o ciclo de vida de um evento escolar em um único sistema web:

- **Professor/Admin** cria, edita e cancela eventos, define (opcionalmente) um limite de vagas e vê quem está inscrito em cada evento.
- **Aluno** navega os eventos disponíveis em formato de lista ou calendário, consulta os detalhes de um evento, se inscreve ou cancela sua inscrição.
- **Sugestão de evento**: qualquer aluno pode propor um evento novo. A sugestão fica pendente até um professor revisar. Se aprovada, o sistema abre a tela de criação de evento já preenchida com os dados sugeridos — o professor ainda decide os detalhes finais antes de publicar. Se rejeitada, a sugestão é removida (ver Escopo).

O foco da primeira versão é fazer esse ciclo funcionar de ponta a ponta de forma simples e confiável, não cobrir todo recurso que uma plataforma de eventos madura teria (isso é tratado explicitamente em Escopo, abaixo).

## Para Quem Isso É

**Professor/Admin** — responsável por organizar e divulgar eventos escolares. Hoje gasta tempo divulgando manualmente e controlando inscrições por fora do sistema de ensino. Quer criar um evento uma vez e ter inscrições e visibilidade centralizadas e uma forma simples de peneirar ideias de alunos sem precisar responder detalhadamente a cada uma. Nesta primeira versão, o perfil não tem hierarquia interna (ver Escopo).

**Aluno** — quer saber o que está acontecendo na escola sem depender de estar no grupo certo de mensagens, se inscrever com um clique e ter um canal real para propor algo que gostaria de ver acontecer.

Contas de professor e aluno são fornecidas previamente pela escola — o sistema não tem cadastro aberto de novos usuários, o que implica autenticação e controle de acesso por perfil desde a v1 (ver Escopo).

## O Que Torna Isso Diferente

Germinare Tech não compete em recursos com plataformas de eventos genéricas (Eventbrite, Sched) ou ferramentas de associação de pais (SignUpGenius, Membership Toolkit) — essas ferramentas têm lembretes automáticos, cobrança, listas de espera e muito mais. A diferença aqui é de ajuste: um fluxo pensado especificamente para a rotina de uma escola, com o professor no centro da curadoria — toda sugestão passa por aprovação humana antes de existir como evento. Não há sobrecarga de configurar uma ferramenta genérica para um caso de uso que ela não foi desenhada para atender. A vantagem inicial é simplicidade e ajuste ao fluxo real da escola, não um diferencial técnico ou de mercado.

## Critérios de Sucesso

Por se tratar de um projeto acadêmico que segue as etapas do método BMAD, sucesso aqui tem três dimensões:

1. **Entrega do processo BMAD** — Brief, PRD, arquitetura, épicos/histórias e build concluídos dentro do cronograma da disciplina.
2. **Fluxo funcional ponta a ponta** — um professor consegue criar um evento; um aluno consegue encontrá-lo, se inscrever e cancelar a inscrição; uma sugestão de aluno consegue ser aprovada (virando um rascunho de evento) ou rejeitada, sem erros que quebrem o fluxo.
3. **Redução de dispersão** — o sistema demonstra, mesmo que qualitativamente dentro do contexto do projeto, que centralizar eventos em um só lugar é melhor do que coordenar por planilha e mensagens.

Não há uma meta numérica definida (ex: "X% de redução de mensagens") — sucesso é avaliado de forma qualitativa/demonstrativa, coerente com o caráter acadêmico do projeto.

## Escopo

**Dentro do escopo (primeira versão):**
- Autenticação e controle de acesso por perfil (Aluno; Professor/Admin unificado)
- CRUD de eventos pelo Professor/Admin (criar, editar, cancelar)
- Status do evento: publicado, cancelado, encerrado
- Limite de vagas por evento (opcional); quando não definido, inscrição é livre (sem limite); quando definido, o sistema deve impedir inscrição além da capacidade
- Listagem de eventos em formato lista e calendário
- Detalhe de evento
- Inscrição e cancelamento de inscrição pelo aluno, com validação para impedir inscrição duplicada (mesmo aluno, mesmo evento) e para impedir inscrição em evento cancelado ou encerrado
- Visualização de inscritos por evento (Professor/Admin)
- Sugestão de evento pelo aluno
- Fila de análise de sugestões (Professor/Admin): aprovar (pré-preenche criação, não publica automaticamente) ou rejeitar (remove, sem motivo, sem notificação)

**Fora do escopo (nesta primeira versão):**
- Notificações automáticas por e-mail/push (atualizações são visíveis apenas dentro do app)
- Lista de espera quando um evento lota [status: indefinido — decisão explicitamente adiada, não uma exclusão permanente]
- Cobrança/ticketing para eventos pagos
- Check-in / controle de presença no dia do evento
- Diferenciação de permissões entre professor e administração/coordenação
- Suporte multi-escola (arquitetura deve considerar essa possibilidade futura, mas não é entregue agora)
- Registro de motivo de rejeição de sugestão, ou qualquer notificação ao aluno sobre o resultado da análise

## Visão

Se validado no contexto acadêmico, Germinare Tech tem espaço para crescer em duas direções. A primeira é aprofundar o fluxo dentro da escola original — notificações, lista de espera, papéis diferenciados, relatórios de participação. A segunda é generalizar a estrutura para atender outras escolas com necessidades semelhantes, como sugerido pela intenção original de "adaptação futura". As duas direções não são mutuamente exclusivas, mas a primeira versão deve provar o fluxo essencial antes de decidir qual delas perseguir.

---

*Este brief foi elaborado no caminho rápido (fast path) e revisado com o autor antes da finalização.*
