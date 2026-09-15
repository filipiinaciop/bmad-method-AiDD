# Reconciliação: Product Brief → PRD (Germinare Tech)

Fontes comparadas:
- Brief: `_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/brief.md`
- PRD: `_bmad-output/planning-artifacts/prds/prd-bmad-method-AiDD-2026-09-14/prd.md`
- Consultado como apoio (referenciado pelo PRD repetidas vezes como "addendum do brief"): `_bmad-output/planning-artifacts/briefs/brief-bmad-method-AiDD-2026-09-14/addendum.md`

## 1. Cobertura confirmada (brief → PRD, sem perdas)

Todos os itens abaixo do brief têm representação fiel no PRD:

- Resumo executivo, problema (4 pontos de dor) e solução → §1 Visão, §2.1 JTBD do PRD (reformulado, sem perda de substância).
- Perfis Professor/Admin e Aluno, incl. "perfil único sem hierarquia interna" → §2, §3 Glossário, §5 Non-Goals.
- Contas provisionadas pela escola / sem autocadastro → §2.2, §4.1, glossário "Conta".
- Diferencial de mercado (não compete com Eventbrite/Sched/SignUpGenius/Membership Toolkit; curadoria humana) → §1 PRD, quase verbatim.
- Critérios de sucesso (3 dimensões: processo BMAD, fluxo ponta a ponta, redução de dispersão qualitativa, sem meta numérica) → §7 SM-1/SM-2/SM-3, todos mapeados corretamente.
- Escopo "dentro" (auth+perfil, CRUD evento, status publicado/cancelado/encerrado, vaga opcional, listagem lista+calendário, detalhe, inscrição/cancelamento com validações de duplicidade e evento indisponível, visualização de inscritos, sugestão de evento, fila de análise com aprovar/rejeitar) → FR-1 a FR-21, §6.1, um-para-um.
- Escopo "fora" (notificações automáticas, lista de espera com status indefinido/decisão adiada, cobrança/ticketing, check-in, diferenciação professor/admin, multi-escola com ressalva de arquitetura, sem motivo/notificação de rejeição) → §5 Non-Goals e §6.2, incluindo corretamente a nuance de que a lista de espera é "adiada", não excluída permanentemente (mantida como Open Question §8.1).
- Visão de crescimento futuro (aprofundar fluxo na escola / generalizar para outras escolas) → referenciada em §1 e §2.2 do PRD.

## 2. Gaps / itens fracos

### 2.1 Mecanismo de criação de conta apresentado como decisão firme, mas é inferência não sustentada pelo brief
O brief diz apenas que as contas "são fornecidas previamente pela escola" — não especifica se a criação é manual dentro do próprio app pelo Professor/Admin, nem se há importação em lote. O PRD (FR-2) declara "Criação manual de conta" pelo Professor/Admin e, em seguida, no próprio corpo do FR-2 e em §6.2, afirma como **"decisão explícita da v1"** que importação em lote (CSV) e integração com sistema acadêmico externo estão fora de escopo. Isso não é uma decisão do brief — é uma suposição do redator do PRD sobre *como* a provisão de contas acontece, e deveria estar marcada como `[ASSUMPTION]` e indexada em §9 (não está). Da forma como está escrito, um leitor pode achar que o autor do brief decidiu explicitamente excluir CSV/integração, o que não ocorreu.

### 2.2 Mecanismo de login (e-mail/senha) não tagueado como suposição
FR-1 afirma "Login é feito com e-mail e senha" como fato, mas o brief nunca especifica o mecanismo de credencial. É uma inferência razoável, mas quebra a própria convenção do PRD (§0: "suposições feitas sem confirmação explícita do autor aparecem inline como `[ASSUMPTION]`") — não está tagueada nem no Índice de Suposições (§9).

### 2.3 Bloco "Privacy" em Constraints and Guardrails é conteúdo novo, não rastreável ao brief nem ao addendum
A seção "Constraints and Guardrails > Privacy" (menores de idade, coleta mínima de dados, sem compartilhamento/exportação externa) não tem base em nenhuma frase do brief.md nem do addendum.md — nenhum dos dois documentos-fonte menciona LGPD, dados de menores, ou política de exportação/compartilhamento. É uma adição prudente e plausível de um PM, mas é escopo novo não coberto pela fonte e, novamente, não está marcada `[ASSUMPTION]` nem indexada em §9 — inconsistente com a própria convenção do documento.

### 2.4 Risco de adoção do addendum não foi endereçado
O `addendum.md` (seção "Riscos identificados na pesquisa") recomenda explicitamente: *"é relevante que o PRD pense em onboarding, não só em funcionalidades"* (risco de adoção por falta de suporte/treinamento/"campeão" engajado). O PRD não menciona onboarding, treinamento, nem um papel de "campeão"/sponsor em nenhuma seção (nem em Cross-Cutting NFRs, nem em Open Questions). Como o addendum é material de apoio explicitamente citado várias vezes pelo próprio PRD (SM-C1, UJ-6, FR-21 notes, §8 Q3/Q4), essa omissão é uma inconsistência: o PRD usa o addendum seletivamente (os riscos de fadiga de aprovação e rejeição silenciosa) mas ignora o terceiro risco levantado no mesmo documento (adoção/onboarding).

### 2.5 Contra-métrica SM-C1 depende de conteúdo que não existe em brief.md
SM-C1 ("carimbo automático" / fadiga de aprovação) cita corretamente o addendum, mas nada no brief.md propriamente dito sustenta essa métrica — é derivada inteiramente do addendum. Isso não é um erro (o addendum é material do mesmo pacote de brief e o PRD é transparente ao citá-lo), mas registra-se aqui porque, se a reconciliação usar como fonte de verdade só o `brief.md` (conforme solicitado), SM-C1 tecnicamente "inventa" uma métrica sem lastro no arquivo-fonte primário — só se sustenta ao admitir o addendum como parte do brief.

## 3. Contradições diretas encontradas

Nenhuma. Não foi encontrada nenhuma inversão, enfraquecimento ou contradição de decisão de escopo do brief dentro do PRD. Todas as fronteiras de escopo (dentro/fora) do brief §Escopo aparecem corretamente refletidas em §5 (Non-Goals) e §6 (Escopo do MVP) do PRD, inclusive nuances sutis como o status "adiado, não excluído" da lista de espera.

## 4. Observação geral sobre qualidade das suposições tagueadas

As suposições explicitamente marcadas `[ASSUMPTION]` no PRD (tela "Minhas Inscrições", gatilho automático de encerramento por data/hora, bloqueio de redução de vaga abaixo de inscrições confirmadas, alunos vendo eventos cancelados/encerrados na listagem, campos mínimos de evento/sugestão, sugestão não retorna à fila se abandonada) são extensões razoáveis e coerentes com o espírito do brief — nenhuma contradiz o texto-fonte, todas estão corretamente indexadas em §9. O problema identificado nesta reconciliação é apenas com as suposições **não marcadas** (itens 2.1, 2.2 e 2.3 acima), que quebram a própria convenção de rastreabilidade que o PRD promete no §0.

## 5. Resumo executivo dos achados

- **Sem contradições de escopo.** Cobertura de FRs, Non-Goals e Success Metrics é completa e fiel ao brief.
- **3 suposições não rotuladas** (criação manual de conta + exclusão de CSV/integração externa; mecanismo de login e-mail/senha; bloco de privacidade sobre dados de menores) deveriam ganhar tag `[ASSUMPTION]` e entrada em §9, ou ser confirmadas com o autor.
- **1 risco do addendum (adoção/onboarding) foi omitido** do PRD, apesar do PRD citar seletivamente outros riscos do mesmo addendum.
- **1 métrica (SM-C1)** só se sustenta se o addendum for aceito como parte do "brief" — vale confirmar com o autor se essa é a leitura pretendida do escopo de origem.
