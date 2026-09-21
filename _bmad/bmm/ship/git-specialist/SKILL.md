---
name: git-specialist
description: Especialista em Git para organizar branches, commits, pull requests, validação, rastreabilidade e operações seguras. Use quando o usuário pedir para criar ou revisar commits, branches, PRs, merges, histórico ou estado do repositório.
---

# Git Specialist

## Objetivo

Operar o Git de forma rastreável, segura e alinhada ao trabalho do projeto. Cada unidade de trabalho deve possuir uma branch própria, um commit claro e, quando houver integração com a branch principal, um Pull Request revisável.

Esta skill registra o trabalho; ela não decide escopo de produto nem substitui o intake, as Stories, o DoD ou a validação do projeto.

## Regra de ouro

```text
Uma tarefa = uma branch = pelo menos um commit rastreável = um PR para integrar.

Commit só depois de validação e confirmação explícita do usuário.
Push, merge, aprovação e operações destrutivas nunca são silenciosos.
```

Quando o usuário solicitar explicitamente um fluxo diferente, explique o impacto e registre a exceção antes de executá-la.

## Escopo da skill

Use esta skill para:

- inspecionar status, diff, histórico, branches, tags e PRs;
- criar e nomear branches de trabalho;
- preparar e revisar staging;
- criar commits por tarefa;
- publicar uma branch quando o usuário autorizar;
- criar ou atualizar Pull Requests quando o usuário autorizar;
- verificar rastreabilidade entre Task/Story/Requirement, branch, commit e PR;
- preparar relatórios de estado e comandos para execução manual.

Não use esta skill para:

- inventar requisitos ou alterar o escopo da Story;
- considerar um commit como prova de que a implementação está correta;
- fazer push, merge, aprovação ou fechamento sem autorização explícita;
- apagar trabalho, reescrever histórico ou contornar hooks sem autorização explícita;
- armazenar credenciais, tokens ou dados sensíveis no Git.

## Estados e autorização

Classifique a operação antes de agir:

| Operação | Padrão |
|---|---|
| Leitura (`status`, `log`, `diff`, inspeção de PR) | Pode executar sem confirmação, salvo política local mais restritiva. |
| Criar/trocar branch | Executar somente após verificar working tree e escopo; pedir confirmação se houver risco de perder contexto. |
| `add`/staging | Mostrar os arquivos que entrarão e respeitar o escopo da tarefa. |
| Commit | Exige validação técnica concluída e confirmação explícita do usuário. |
| Push | Exige pedido explícito do usuário. |
| Criar PR | Exige pedido explícito ou confirmação após apresentar título, base, origem e corpo. |
| Aprovar, mergear, fechar ou reabrir PR | Exige confirmação explícita imediatamente antes da ação. |
| Rebase, reset, clean, force-push ou apagar branch | Bloqueado por padrão; exige confirmação explícita e explicação de reversibilidade/risco. |

A confirmação para editar arquivos não é automaticamente confirmação para commit. A confirmação para commit não é automaticamente confirmação para push, PR, merge ou aprovação.

## Ao ativar

1. Leia a política local aplicável, se existir: `AGENTS.md`, `CLAUDE.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.github/` e documentação de Git do projeto.
2. Leia [`docs/00-governance/bmad-reading-map.md`](../../../docs/00-governance/bmad-reading-map.md) e [`docs/00-governance/evidence-protocol.md`](../../../docs/00-governance/evidence-protocol.md) quando estiverem disponíveis.
3. Identifique o contexto da tarefa: `T###`, `S##`, `E##`, `PRD-*` ou outro ID estável. Se não houver ID, não invente um; peça ao usuário ou registre que a rastreabilidade está ausente.
4. Execute somente inspeções iniciais:

   ```text
   git branch --show-current
   git status --short
   git log -5 --oneline --decorate
   git remote -v
   ```

5. Determine a branch base sem alterar configuração. Use a branch padrão do repositório ou confirme com o usuário; não assuma `main` se o repositório indicar outra.
6. Verifique se existem alterações não relacionadas. Nunca misture o trabalho de outra tarefa no branch, commit ou PR atual.

## Branch por tarefa

Crie uma branch por unidade de trabalho, a partir da branch base atualizada quando isso for seguro:

```text
feat/<task-id>-<slug>
fix/<task-id>-<slug>
docs/<task-id>-<slug>
refactor/<task-id>-<slug>
test/<task-id>-<slug>
chore/<task-id>-<slug>
```

Exemplos:

```text
feat/T014-validar-limite-de-vagas
docs/T021-organizar-requirements
fix/T032-impedir-inscricao-duplicada
```

Regras:

- Use o ID real da Task ou Story; nunca fabrique um ID para parecer rastreável.
- Use `kebab-case`, sem espaços, acentos ou caracteres especiais.
- Não trabalhe diretamente em `main`, `master` ou outra branch protegida.
- Não troque de branch com alterações não commitadas sem confirmar o destino e o risco.
- Se a branch já tiver trabalho de outra tarefa, pare e peça orientação; não reutilize silenciosamente.
- A branch deve ter uma finalidade única. Se o escopo mudar materialmente, pare e proponha nova Task/branch.

## Um commit por tarefa

A unidade padrão é um commit por Task. O commit pode conter vários arquivos da mesma tarefa, mas não deve misturar tarefas independentes.

Antes do commit:

1. confirme a Task, Story, Epic e Requirements relacionados;
2. inspecione `git status --short`;
3. revise `git diff` e `git diff --cached`;
4. confira se os arquivos staged pertencem somente à tarefa;
5. execute `git diff --check`;
6. rode os testes, lint, type-check, build ou validação documental aplicáveis;
7. faça uma checagem de segredos e arquivos indevidos;
8. apresente ao usuário o resumo, os arquivos, a validação e o commit proposto;
9. aguarde confirmação explícita do usuário;
10. crie exatamente o commit autorizado.

Não use `git add .` ou `git add -A` por padrão. Adicione arquivos específicos. Não use `--no-verify` e não faça `--amend` para corrigir um hook; corrija o problema e crie um novo commit, salvo autorização explícita.

### Mensagem do commit

Use Conventional Commits com o ID da tarefa quando houver:

```text
<type>(<scope>): <T###> <resumo imperativo>
```

Tipos usuais: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`.

Exemplos:

```text
docs(pm): T021 organize requirements entrypoint
feat(events): T014 enforce vacancy limit
fix(registration): T032 prevent duplicate active registration
```

O corpo do commit é opcional, mas deve ser usado quando explicar a motivação ou a validação ajudar a revisão. Não coloque segredos, dados pessoais ou conteúdo irrelevante na mensagem.

## Validação obrigatória do commit

A validação precisa corresponder ao tipo de alteração:

| Alteração | Validação mínima |
|---|---|
| Código | Testes relevantes e lint/type-check/build quando disponíveis. |
| Documentação | `git diff --check`, revisão de links/estrutura e conferência do conteúdo preservado. |
| Configuração | Validação do parser, comando de carregamento ou smoke test aplicável. |
| Migração/dados | Dry-run, teste reversível ou evidência equivalente antes de aplicar. |
| Sem validação possível | Registrar `N/A` com justificativa; não declarar `done` sem confirmação. |

Relate sempre:

```text
Task/Story:
Branch:
Arquivos staged:
Commit proposto:
Validação executada:
Resultado real:
Riscos/limitações:
Confirmação necessária:
```

Depois do commit, confirme:

```text
git status --short
git log -1 --oneline --decorate
git show --stat --oneline --summary HEAD
git diff HEAD^ HEAD --check
```

O working tree deve estar limpo, salvo se o usuário tiver autorizado alterações pendentes claramente separadas.

## Pull Request por branch

Depois de o commit existir, ofereça um PR para integrar a branch à branch base. Não faça push ou crie o PR automaticamente sem autorização.

Antes de criar o PR, confirme:

- branch de origem e branch base;
- commit ou intervalo que será incluído;
- Task/Story/Epic/Requirement relacionados;
- validações executadas;
- riscos e limitações;
- arquivos gerados ou mudanças de migração;
- reviewers e labels, se definidos pelo projeto;
- se o usuário deseja publicar a branch e criar o PR agora.

Se a CLI `gh` estiver disponível, o fluxo autorizado pode usar:

```text
git push -u origin <branch>
gh pr create --base <base> --head <branch> --title "<título>" --body-file <arquivo>
```

Se `gh` não estiver disponível ou a autenticação falhar, não improvise credenciais. Mostre os comandos e o corpo do PR para execução manual.

### Corpo mínimo do PR

```markdown
## Summary
- <mudança principal>

## Traceability
- Requirement: <PRD/PB/UX/ARCH ID>
- Epic: <E##>
- Story: <S##>
- Task: <T###>

## Validation
- <comando/scenario> — <resultado real>

## Risks and follow-up
- <risco, unknown, decision or "none">

## Checklist
- [ ] Escopo da tarefa conferido
- [ ] Um commit lógico por tarefa
- [ ] `git diff --check` passou
- [ ] Testes/validações executados
- [ ] Rastreabilidade atualizada
- [ ] Sem segredos ou dados indevidos
- [ ] Pronto para revisão humana
```

Não aprove, mergeie ou feche o PR automaticamente. Essas ações alteram um recurso compartilhado e exigem confirmação imediatamente antes da execução.

## Segurança e operações proibidas por padrão

Nunca execute sem autorização explícita e avaliação de risco:

```text
git reset --hard
git clean -fd / git clean -fdx
git push --force / git push --force-with-lease
git branch -D <branch>
git rebase <branch>
git commit --amend
git checkout -- <arquivo>
gh pr merge
gh pr review --approve
gh pr close
```

Mesmo com autorização:

- explique o que será perdido ou alterado;
- confirme a branch e o alvo;
- prefira alternativas reversíveis;
- não exponha tokens, chaves ou secrets nos comandos/relatórios;
- não altere `git config` sem um pedido específico e explícito;
- preserve hooks e validações do repositório;
- não faça push direto em branch protegida;
- não force-push sem confirmação do proprietário da branch e justificativa registrada.

## Recuperação de falhas

- **Hook falhou:** leia a mensagem, corrija o problema e crie um novo commit; não ignore o hook.
- **Conflito de merge/rebase:** não resolva por preferência silenciosa; apresente os arquivos e bloqueie até orientação.
- **Working tree inesperadamente sujo:** pare, salve o estado em relatório e não faça staging amplo.
- **Branch base divergente:** mostre a divergência; não rebaseie automaticamente.
- **Push/PR falhou:** mantenha o commit local, informe a causa e ofereça o comando manual.
- **Arquivo não rastreável ou gerado:** confirme se deve entrar no commit; não inclua por conveniência.

## Saída final

```text
Git Specialist — resultado

Task/Story:
Branch:
Base:
Commit: <hash e mensagem> | não criado — motivo
PR: <URL e status> | não criado — motivo
Arquivos:
Validação:
Rastreabilidade:
Working tree:
Próximo passo autorizado:
```
