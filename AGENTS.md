# Repository Agent Rules

This repository must always keep implementation tracking and project publication documentation in sync with the Git state.

## Canonical Project Identity

- GitHub repository: `https://github.com/jader-germano/jpglabs-portfolio`
- Git user: `jader.germano`
- Git email: `jader.germano@tse.jus.br`

## Mandatory Start-of-Session Workflow

Before changing code, the agent must:

1. Read the current task and keep scope strict.
2. Inspect current Git state when needed.
3. Run the session tracker command:

```bash
npm run docs:session -- --title "<current task>" --summary "<what is being implemented>"
```

4. Use the generated entry in `public/docs/implementation-journal.md` as the canonical implementation log for the session.

## Mandatory Publication Workflow

Whenever work is prepared for project publication, deploy, or major delivery communication, the agent must run:

```bash
npm run docs:publish -- --title "<publication title>" --summary "<what was published>" --status "<draft|published|deployed>"
```

Then the agent must confirm that these public documents are updated:

- `public/docs/project-publication-log.md`
- `public/docs/latest-release-notes.md`

When opening a pull request, the agent must also use the repository PR template and reference the relevant journal/publication entries.

## Documentation Scope

The agent must keep these documents current:

- `public/docs/implementation-journal.md`
- `public/docs/project-publication-log.md`
- `public/docs/latest-release-notes.md`

Each relevant entry should include:

- timestamp
- Git user and repository
- current branch and current commit when available
- concise summary of the implementation or publication
- worktree snapshot when relevant
- touched files or affected areas when explicitly known
- test status when available

## Guardrails

- Do not rewrite the full history; append concise new entries.
- Do not create parallel logs in other folders unless explicitly requested.
- Keep public-facing wording professional and implementation-focused.
- If publication did not actually happen, record it as `draft` or `planned`, never as deployed.
- For any meaningful UI or layout change, prepare a Figma-first screen proposal and get validation before shipping implementation changes.
- Do not collapse or remove major public-home sections without explicit approval from Jader after the screen proposal step.
