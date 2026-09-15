# Revisão Adversarial — PRD Germinare Tech

Revisão crítica focada em contradições, transições de estado não tratadas, alegações de concorrência não testáveis, FRs implícitas ausentes, scope creep e testabilidade. Os dois achados já sinalizados por outro revisor (FR-16 impede cancelamento administrativo de vaga sem declarar isso como decisão deliberada; FR-8/FR-17 "tempo real" sem mecanismo/latência) **não são repetidos aqui**.

---

## CRITICAL

### C1. SM-C1 é estruturalmente impossível de medir — dados de Sugestão não são retidos

- **Local:** §7 SM-C1, cruzado com FR-20 e FR-21.
- **Texto:** SM-C1 diz: *"Volume de sugestões aprovadas sem revisão real ('carimbo automático') não deve crescer... contrabalança SM-1 e SM-3."* FR-20 diz: *"Sugestão sai da Fila de Análise assim que aprovada, independentemente de o Evento resultante ser efetivamente publicado ou descartado nesse passo."* FR-21 diz: *"Sugestão rejeitada não é recuperável pelo Professor/Admin nem pelo Aluno após a remoção."*
- **Falha concreta:** Para medir SM-C1 (aprovação em "carimbo automático"), seria preciso auditar, ao longo do tempo, quantas Sugestões foram aprovadas, quanto tempo o professor gastou revisando, e se o Evento resultante foi de fato publicado. Mas nenhuma FR exige reter esse histórico: a Sugestão some da fila no instante do clique em "Aprovar" (FR-20) — antes mesmo de o Evento existir — e uma Sugestão rejeitada é declarada "não recuperável" (FR-21), o que sugere exclusão física do registro, não apenas remoção da visão de fila. Não existe log de auditoria, nem vínculo persistido entre Sugestão e Evento resultante. Um QA não tem como escrever um teste para SM-C1 como especificado — a contra-métrica que o próprio PRD elege como salvaguarda contra "curadoria de fachada" não tem como ser observada pelos dados que o sistema se compromete a guardar.
- **Sugestão de correção:** Adicionar uma FR explícita de retenção: Sugestões (aprovadas ou rejeitadas) permanecem como registro histórico com status persistido (`pendente` / `aprovada` / `rejeitada`) e, quando aprovada, um vínculo (mesmo que fraco, tipo "originou-se de") com o Evento criado a partir dela — sem isso, SM-C1 é uma métrica de intenção, não uma métrica testável.

### C2. Nenhuma FR sustenta a suposição de recuperação manual de senha (§8, Questão 2)

- **Local:** §8 Questão 2, §9 Índice de Suposições, cruzado com FR-1 a FR-3.
- **Texto:** `[ASSUMPTION: sim, redefinição é manual pelo Professor/Admin na v1 — sem fluxo de self-service]`.
- **Falha concreta:** Essa suposição é o único mecanismo de recuperação de acesso do sistema inteiro (não há "esqueci minha senha" self-service, por decisão explícita em §6.2). Só que **nenhuma FR concede ao Professor/Admin a capacidade de alterar/redefinir a senha de uma Conta já existente**. FR-2 cobre apenas *criação* de Conta com senha inicial; FR-3 é controle de acesso; FR-1 é login. Se um Aluno esquecer a senha, o Professor/Admin não tem, pelo texto atual do PRD, nenhuma ação funcional definida para resolver isso — a suposição descreve um comportamento do produto que não existe em nenhuma FR. Isso não é uma lacuna cosmética: sem essa capacidade, um Aluno que esquece a senha fica permanentemente trancado fora do sistema.
- **Sugestão de correção:** Adicionar uma FR (ex.: FR-2b "Redefinição de senha por Professor/Admin") com consequências testáveis análogas a FR-2 (ex.: nova senha definida permite login imediato, sessões antigas do Aluno são invalidadas ou não, etc.).

---

## HIGH

### H1. FR-7 contradiz a definição de "Encerrado" do Glossário quando o evento já está Cancelado

- **Local:** §3 Glossário ("Status do Evento") vs FR-7.
- **Texto:** Glossário: *"Encerrado (data/hora do evento já passou; fechado a nova inscrição)"* — definição baseada **apenas** na data/hora, sem menção ao status anterior. FR-7: *"Sistema muda o Status de um Evento **Publicado** para Encerrado quando sua data/hora já passou."* — a transição automática só está definida a partir de Publicado.
- **Falha concreta:** O que acontece com um Evento **Cancelado** cuja data/hora já passou? Pela definição do Glossário (que define Encerrado unicamente pela data/hora ter passado), ele "deveria" ser Encerrado. Mas FR-7 só especifica a transição partindo de Publicado, então literalmente esse evento continua com Status Cancelado para sempre, mesmo depois de "encerrado" no sentido temporal do Glossário. Isso é observável e testável: um QA não sabe se deve esperar Status=Cancelado ou Status=Encerrado para um evento cancelado cuja data já passou, porque as duas seções do próprio PRD dão respostas diferentes.
- **Sugestão de correção:** Reescrever a definição de Encerrado no Glossário para deixar explícito que a transição automática só se aplica a partir de Publicado, e declarar explicitamente que Cancelado é um estado absorvente (terminal) que a passagem do tempo não sobrescreve.

### H2. SM-1 introduz um estado "rascunho de evento" que não existe em nenhum FR ou no Glossário

- **Local:** §7 Critérios de Sucesso, SM-1.
- **Texto:** *"Aluno sugere um evento e o Professor/Admin aprova (**virando rascunho de evento**) ou rejeita."*
- **Falha concreta:** O Glossário (§3) define exatamente três Status de Evento: Publicado, Cancelado, Encerrado. Não existe "Rascunho" em lugar nenhum do modelo de dados descrito no PRD. FR-4 é explícito: *"Evento criado nasce com Status Publicado"* — ou seja, no modelo atual, um Evento **não tem** estado intermediário persistido entre "não existe" e "Publicado". FR-20 confirma isso: aprovar uma Sugestão apenas abre uma tela de criação pré-preenchida; se o professor não completar e confirmar, nada é salvo. Então "vira rascunho de evento" no critério de sucesso está descrevendo um comportamento que simplesmente não foi especificado em nenhuma FR — seja porque SM-1 pressupõe um estado de rascunho persistido que a arquitetura precisaria implementar (e que nenhuma FR pede), seja porque é um erro de vocabulário que vai confundir quem for construir e testar o critério de sucesso.
- **Sugestão de correção:** Alinhar a linguagem — trocar "virando rascunho de evento" por algo como "pré-preenchendo a criação de um evento" (linguagem de FR-20), ou, se um estado de rascunho persistido é de fato desejado, adicionar isso como FR nova e como quarto valor de Status no Glossário.

### H3. FR-18 pressupõe uma visão "minhas sugestões" para o Aluno que nenhuma FR define

- **Local:** §4.5, "Feature-specific NFRs" sob FR-18, cruzado com UJ-4 e FR-17.
- **Texto:** *"Aluno não tem visibilidade sobre outras Sugestões além das que ele mesmo enviou (evita expor ideias de colegas antes da aprovação)."* UJ-4 Resolução: *"ele pode voltar a checar se ela virou evento publicado."*
- **Falha concreta:** Essa NFR só faz sentido se existir alguma tela onde o Aluno vê **suas próprias** Sugestões — caso contrário, "não ter visibilidade sobre as sugestões dos outros" é uma frase vazia (não há visibilidade sobre sugestão nenhuma). Mas, ao contrário de FR-17 ("Minhas Inscrições"), que foi promovida a FR própria exatamente por ter sido identificada como necessária para uma jornada (UJ-2/UJ-3), aqui não existe FR equivalente "Minhas Sugestões" — nem está listada como suposição em §9. O caminho descrito em UJ-4 ("ele pode voltar a checar") fica sem suporte funcional: o Aluno teria que adivinhar, navegando a lista pública de Eventos (FR-9), se algum evento publicado corresponde à sua sugestão original — o que é frágil, já que não há vínculo Sugestão→Evento (ver C1) nem obrigação de o professor manter título/descrição da sugestão ao publicar.
- **Sugestão de correção:** Ou (a) adicionar FR explícita "Minhas Sugestões" com status visível (pendente/aprovada/rejeitada), ou (b) remover a NFR de FR-18 e reescrever UJ-4 para não prometer uma forma de "checar" que o produto não oferece.

### H4. Ambiguidade sobre re-inscrição após cancelamento (FR-13 vs. Glossário)

- **Local:** §3 Glossário ("Inscrição") vs FR-13.
- **Texto:** Glossário: *"Um Aluno tem no máximo uma Inscrição **ativa** por Evento."* FR-13: *"Sistema impede que o mesmo Aluno se inscreva **duas vezes** no mesmo Evento."*
- **Falha concreta:** O qualificador "ativa" no Glossário sugere fortemente que podem existir Inscrições **inativas** (histórico de cancelamentos) e que, depois de cancelar, o Aluno pode se inscrever de novo, criando uma nova Inscrição ativa. Mas a redação de FR-13 ("se inscrever duas vezes no mesmo Evento", sem qualificar "ativa") lida literalmente como uma proibição permanente de qualquer segunda inscrição, mesmo depois de um cancelamento válido via FR-16. Isso é uma transição de estado (Inscrito → Cancelado → Inscrito novamente) que nenhuma FR trata explicitamente, e as duas seções do PRD apontam para respostas opostas. Um caso real e comum: Lucas se inscreve, cancela por engano, tenta se inscrever de novo no mesmo evento — o sistema deve aceitar ou bloquear?
- **Sugestão de correção:** Adicionar consequência testável explícita em FR-13: *"Um Aluno pode se inscrever novamente em um Evento após cancelar uma Inscrição anterior; a prevenção de duplicidade se aplica apenas a Inscrições simultaneamente ativas."*

---

## MEDIUM

### M1. Nenhuma FR define o que acontece se um evento Cancelado/Encerrado for editado para uma data futura

- **Local:** FR-5 vs FR-7, FR-6.
- **Texto:** FR-5: *"Professor/Admin pode editar os dados de um Evento existente (**qualquer Status**)."* Nada em FR-5, FR-6 ou FR-7 descreve o Status resultante de editar a data/hora de um Evento Encerrado para o futuro, ou de "reviver" um Evento Cancelado.
- **Falha concreta:** FR-5 permite explicitamente editar eventos em qualquer Status, incluindo Cancelado e Encerrado — isso não é hipotético, é uma permissão declarada. Se um professor edita a data/hora de um Evento Encerrado para uma data futura, o Evento passa a aceitar inscrições de novo (voltando a Publicado)? Ou fica soterrado num Status Encerrado/Cancelado mesmo com data futura, contradizendo a própria definição de Encerrado do Glossário ("data/hora já passou")? Nenhuma FR resolve isso, e é uma transição de estado plausível de acontecer na prática (ex.: evento adiado).
- **Sugestão de correção:** Declarar explicitamente se a edição de data pode ou não alterar o Status calculado, e se "reabrir" um Evento Cancelado é permitido via edição ou exige uma ação distinta (ou é proibido).

### M2. Garantia de concorrência é assimétrica entre FR-13 e FR-15

- **Local:** Cross-Cutting NFRs ("Integridade de dados") vs FR-13.
- **Texto:** NFR: *"as invariantes de FR-13 (sem inscrição duplicada) e FR-15 (sem exceder vaga) devem se manter mesmo sob tentativas concorrentes (**dois alunos** inscrevendo-se na última vaga ao mesmo tempo)."*
- **Falha concreta:** O único cenário concreto de concorrência descrito é sobre FR-15 (dois alunos disputando a última vaga). Não há cenário equivalente para FR-13 — por exemplo, o **mesmo** Aluno clicando duas vezes rapidamente em "Inscrever-se", ou tendo duas abas abertas simultaneamente. Isso é uma race condition real e comum (duplo clique) que poderia violar a invariante "no máximo uma Inscrição ativa por Evento" do Glossário, mas nenhuma consequência testável de FR-13 menciona concorrência — diferente de FR-15, que menciona explicitamente. Um QA revisando FR-13 isoladamente não seria levado a testar esse caso.
- **Sugestão de correção:** Adicionar a FR-13 uma consequência testável simétrica à de FR-15: "Duas requisições de inscrição simultâneas do mesmo Aluno para o mesmo Evento resultam em no máximo uma Inscrição ativa."

### M3. Mecanismo/latência do encerramento automático (FR-7) não é especificado, e sua própria consequência é autocontraditória

- **Local:** FR-7.
- **Texto:** *"Evento com data/hora no passado e Status ainda **Publicado** nunca é exibido como disponível para nova inscrição."*
- **Falha concreta:** Se a transição de Publicado para Encerrado é verdadeiramente automática e imediata (como a primeira frase de FR-7 afirma), não deveria existir, por definição, um Evento com "data/hora no passado e Status ainda Publicado" — esse estado é a própria coisa que FR-7 diz que não pode ocorrer. A existência dessa segunda consequência sugere que, na prática, o campo Status **pode** ficar desatualizado por algum tempo (ex.: um job periódico, não recálculo em tempo real), mas FR-7 nunca declara esse mecanismo, frequência ou janela de atraso. Isso é o mesmo tipo de problema já sinalizado para FR-8/FR-17 ("tempo real" sem mecanismo), mas aplicado a uma FR diferente (a própria transição de status, não a visualização de inscritos) — vale como achado distinto porque afeta a testabilidade central da regra de negócio "Encerrado", não apenas uma tela.
- **Sugestão de correção:** Especificar se Status é um campo armazenado (atualizado por job com frequência definida — dizer qual) ou um valor computado em tempo de leitura (nesse caso, a segunda consequência de FR-7 é redundante e deve ser removida por não fazer sentido).

### M4. FR-15 mistura solução de implementação com requisito, sem definir o que conta como "simultâneo" para efeito de teste

- **Local:** FR-15.
- **Texto:** *"...mesmo em caso de duas tentativas simultâneas (**condição de corrida tratada no back-end**)."*
- **Falha concreta:** "Tratada no back-end" é uma alegação de solução, não uma consequência observável — uma FR deveria descrever o comportamento esperado (ex.: "quando N requisições concorrentes disputam a última vaga, exatamente uma é aceita e as demais são rejeitadas"), não onde a lógica mora. Além disso, nem FR-15 nem o NFR de concorrência definem o grau de concorrência que um teste deve exercitar (2 requisições? 10? 100?) nem o que conta como "simultâneo" (mesma janela de milissegundos? mesma transação de banco?). Para um projeto acadêmico sem SLA formal isso pode ser aceitável, mas do jeito que está, um QA precisa inventar esses parâmetros sozinho para escrever um teste determinístico.
- **Sugestão de correção:** Reescrever a consequência em termos observáveis (contagem final de Inscrições ativas nunca excede o limite de Vaga, independentemente de quantas requisições concorrentes chegaram) e, se possível, indicar um número mínimo de requisições concorrentes que a suíte de testes deve simular.

### M5. Título da seção 4.1 promete "Gestão de Contas", mas só há FR de criação — sem edição, desativação ou remoção

- **Local:** §4.1 (título e descrição) vs FR-1 a FR-3.
- **Texto:** Título da seção: *"Autenticação e **Gestão** de Contas"*. As três FRs da seção cobrem apenas login (FR-1), criação (FR-2) e controle de acesso (FR-3).
- **Falha concreta:** "Gestão" (management) implica um ciclo de vida — normalmente inclui editar dados de uma Conta, desativá-la ou removê-la (ex.: aluno se forma, professor sai da escola). Nenhuma dessas ações tem FR. Isso é agravado por C2 (nem reset de senha existe) — juntos, esses dois achados mostram que a seção entrega bem menos do que seu próprio título e descrição prometem, o que pode levar arquitetura/dev a assumir (incorretamente) que essas capacidades já estão fora de escopo por decisão consciente, quando na verdade parecem só ter sido esquecidas — não há menção a elas em §5 Non-Goals nem em §6.2 Fora do Escopo.
- **Sugestão de correção:** Ou adicionar FRs de edição/desativação de Conta, ou, se a omissão for deliberada (v1 nunca desativa uma Conta), declará-la explicitamente em §5/§6.2 como decisão de escopo, do mesmo jeito que outras exclusões já são tratadas.

---

## LOW

### L1. "Inscrição ilimitada" (FR-4) não é literalmente testável

- **Local:** FR-4. *"Se Vaga não for definida, o Evento aceita inscrição ilimitada."* Um QA não pode testar "ilimitado" — só pode testar até algum N finito. Recomenda-se anexar uma convenção de teste (ex.: "aceita ao menos N=1000 inscrições sem rejeitar por capacidade") para tornar a consequência falsificável na prática, sem alterar a intenção do requisito.

### L2. Ausência de escopo declarado sobre edição cruzada entre professores

- **Local:** FR-3, FR-5, FR-6. Como o perfil Professor/Admin não tem hierarquia (§3, §5), qualquer Professor/Admin pode editar ou cancelar um Evento criado por outro — isso é consistente com o design de perfil único, mas nunca é afirmado como uma consequência testável explícita em nenhuma FR (diferente de, por exemplo, FR-16, que é explícito sobre o Aluno só poder cancelar a própria Inscrição). Vale tornar isso explícito em FR-5/FR-6 para eliminar qualquer dúvida na etapa de arquitetura/QA.

### L3. FR-21 "não é recuperável" sugere exclusão física, tensionando com o modelo de estados implícito no Glossário

- **Local:** FR-21, cruzado com §3 Glossário ("Sugestão de Evento... status pendente até ser aprovada ou rejeitada"). O Glossário descreve um ciclo de vida de três estados (pendente/aprovada/rejeitada), o que sugere que o registro persiste com o novo status. FR-21 diz que a Sugestão rejeitada "não é recuperável... após a remoção", linguagem que soa como exclusão do registro, não mudança de status. Esse é o mesmo mecanismo de fundo do achado C1 (falta de retenção histórica) — citado aqui separadamente porque é, isoladamente, também uma inconsistência terminológica entre o Glossário e a FR.

---

## Resumo de cobertura

Os pontos 1–7 do briefing foram cobertos: contradições entre FRs e Glossário (H1, H4, L3), transições de estado não tratadas (M1, e a lacuna Cancelado+data-passada de H1), concorrência (M2, M4), FRs implícitas ausentes na leitura das UJs (H3, C2, M5), scope creep (nenhum novo achado relevante além dos já mapeados em §5/§6.2 — o PRD está de fato consistente aqui), e testabilidade (M3, M4, L1, além dos itens de contradição que também falham o teste de testabilidade). Os itens já sinalizados por outro revisor (FR-16 cancelamento administrativo; FR-8/FR-17 "tempo real" sem mecanismo) foram deliberadamente omitidos, exceto onde um problema **novo e distinto** do mesmo tipo aparece em outra FR (M3, sobre FR-7).
