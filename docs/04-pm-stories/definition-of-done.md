# Definition of Done

A Definition of Done global não substitui os critérios de aceitação de cada story. Ela define o padrão mínimo para considerar uma entrega concluída.

## Para uma task

- [ ] objetivo e resultado verificável foram atendidos;
- [ ] fontes e IDs realmente usados foram registrados com caminho e seção;
- [ ] fatos confirmados, decisões derivadas, desconhecidos e conflitos foram separados;
- [ ] somente o escopo definido foi alterado;
- [ ] validação indicada na task foi executada e o resultado real foi registrado;
- [ ] o diff foi revisado contra o escopo;
- [ ] falhas, limitações e decisões foram registradas;
- [ ] referências, rastreabilidade e status foram atualizados.

## Para uma story

- [ ] todos os critérios `AC-*` foram atendidos com evidência verificável;
- [ ] cada critério está ligado a uma fonte/decisão, task e teste/evidência;
- [ ] caminho principal, erros, estados vazios/loading e permissões aplicáveis foram verificados;
- [ ] não existem fontes conflitantes ou perguntas bloqueadoras sem registro;
- [ ] tasks filhas estão `done` ou canceladas com justificativa;
- [ ] testes automatizados ou manuais adequados foram executados;
- [ ] revisão de código/artefato foi realizada;
- [ ] lint, type-check e build foram executados quando existirem;
- [ ] acessibilidade e responsividade foram avaliadas quando houver UI;
- [ ] segurança, privacidade e tratamento de erro foram avaliados quando aplicáveis;
- [ ] documentação e contratos afetados foram atualizados;
- [ ] migrações são verificadas/reversíveis quando aplicáveis;
- [ ] observabilidade necessária foi definida;
- [ ] nenhum requisito, desconhecido, conflito ou risco conhecido ficou sem registro;
- [ ] matriz de rastreabilidade e status foram atualizados.

## Aplicabilidade

Marque itens não aplicáveis como `N/A — <justificativa>`. Nunca deixe um item vazio para indicar que foi ignorado.

## Evidências mínimas

A entrega deve apontar para pelo menos uma evidência adequada ao tipo de mudança:

- comando e saída real;
- teste automatizado;
- cenário manual reproduzível;
- screenshot ou gravação quando houver UI;
- log, métrica ou inspeção de contrato;
- link para revisão ou decisão aprovada.

"Funcionou", "parece correto" ou a simples existência de um arquivo não são evidências suficientes.

## Adendo para o MVP mockado

- [ ] Dados iniciais de demonstração são identificados como mockados.
- [ ] Persistência usa somente `localStorage`, conforme `DEC-001`; não há dependência de PostgreSQL/Aiven.
- [ ] O comportamento após recarregar a página foi verificado quando a Story depender de persistência.
- [ ] Nenhuma Story foi marcada `ready` enquanto houver `DEP-*` decision/hard aberta.
