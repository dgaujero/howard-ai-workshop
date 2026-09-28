# AI Engineering Field Guide — completed backup

A fully implemented, local-data Field Guide for the Howard guest lecture. The minimally styled Field Guide starter lives in `src/`; this independent completed project lives in `projects/workshop-complete/` and shares the existing dependencies. Each app owns its content files so live changes to the starter do not change this backup.

## Run it

Run commands from the **repository root**:

```bash
npm ci
npm run start:complete
```

Open `http://localhost:4201/`. The Field Guide starter uses `npm start` on port 4200.

| Command                                  | Purpose                                           |
| ---------------------------------------- | ------------------------------------------------- |
| `npm run start:complete`                 | Run the Field Guide on port 4201                  |
| `npm run test:complete -- --watch=false` | Run the passing Field Guide suite                 |
| `npm run build:complete`                 | Build the completed Field Guide                   |
| `npm run test:copy-bug`                  | Run the intentionally failing teaching regression |
| `npm test -- --watch=false`              | Run only the Field Guide starter’s tests          |
| `npm run build`                          | Build only the Field Guide starter                |

`test:copy-bug` is intentionally separate from the normal test command. An assertion showing the debugging prompt was expected but the repository-understanding prompt was received is the intended failure. A compilation error or “no tests found” is not a successful demonstration.

## What is ready

- Five prepared guides: understand a repository, plan/build a feature, investigate a bug, review generated code, and deploy.
- A native radio-group task selector with a helpful initial state. Steps, context, prompt, and verification questions come from the same selected guide.
- A copy button that reports success only after `writeText` resolves. Denial or a missing API leaves selectable text and honest feedback. Switching tasks clears old feedback and ignores stale asynchronous completions.
- Responsive layout, native keyboard controls, visible focus, skip navigation, and route-change focus management.
- Workflow, resources, official setup references, six reusable lecture prompts, and labeled rehearsal views.
- No backend, sign-in, model calls, API keys, persistence, or additional dependencies.

## Where to make changes

| Area                                                  | Location                                  |
| ----------------------------------------------------- | ----------------------------------------- |
| The five guide records and engineering loop           | `src/app/data/guides.ts`                  |
| Resource links, classroom URL, slide-deck placeholder | `src/app/data/resources.ts`               |
| Prompts adapted from the presenter’s script           | `src/app/data/demo-prompts.ts`            |
| Selected-task state                                   | `src/app/components/task-workbench.ts`    |
| Guide rendering                                       | `src/app/components/guide-detail.*`       |
| Copy handling and user feedback                       | `src/app/components/prompt-card.*`        |
| Shared theme                                          | `src/styles.css`                          |
| Routes and saved reference views                      | `src/app/app.routes.ts`, `src/app/pages/` |
| Deliberately flawed copy example                      | `src/app/rehearsal/clipboard-lab.*`       |

Paths in this table are relative to `projects/workshop-complete/`. The student-facing workbench never uses the deliberately flawed example.

## Rehearsal and optional deployment

See [the rehearsal runbook](docs/rehearsal.md), [HUB-01 acceptance criteria](docs/HUB-01.md), and [design and source notes](docs/design-notes.md).

The [verification record](docs/verification.md) lists the passing checks, intentional failing demonstration, browser evidence, and remaining presenter preparation.

The app uses hash-based routes (for example, `/#/resources`). These work when refreshed on a static host without adding rewrite configuration to the original app.

The lecture plan keeps this backup local on port 4201. If you later choose to publish it separately, create a separate Vercel project connected to this repository:

- Root directory: repository root, not `projects/workshop-complete`.
- Install command: `npm ci`.
- Build command: `npm run build:complete`.
- Output directory: `dist/workshop-complete/browser`.
- Configure the intended production branch and check the exact deployment’s commit.

Do not replace the classroom project’s build settings to host the backup. Creating this code does not publish it. Check any future backup URL while signed out before sharing it.

The classroom site is `https://howard-ai-workshop.vercel.app/`. The slide-deck link is intentionally unset and displayed as “Coming soon”; set `SLIDES_URL` in `resources.ts` when the real public link is available.
