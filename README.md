# AI Engineering Field Guide — lecture starter

A functional, minimally styled Angular resource site for the Howard University guest lecture. Five prepared engineering guides, working navigation, workflow notes, resources, and lecture prompts are ready before class.

The live changes are the **Howard-inspired shared theme** and the **task selector with current-prompt copy behavior**. The starter uses native, independent guide disclosures and manually selectable prompt text. The first guide is expanded initially. It does not yet have task-selection state or clipboard controls.

## Run the two apps

Run these commands from the repository root. Install dependencies with `npm ci` when setting up a fresh checkout.

| Command                                  | App / purpose                                                  |
| ---------------------------------------- | -------------------------------------------------------------- |
| `npm start`                              | Starter: <http://localhost:4200/>                              |
| `npm test -- --watch=false`              | Starter tests                                                  |
| `npm run build`                          | Starter production build                                       |
| `npm run watch`                          | Starter development build in watch mode                        |
| `npm run start:complete`                 | Completed backup: <http://localhost:4201/>                     |
| `npm run test:complete -- --watch=false` | Completed backup tests                                         |
| `npm run build:complete`                 | Completed backup production build                              |
| `npm run test:copy-bug`                  | Intentionally failing regression in the labeled backup example |

The existing Angular 21 workspace was initialized with Node.js 20.20.2 and npm 10.8.2. Both apps share the existing dependencies.

## What students can browse

- **Task guides** (`/#/`): understand a repository, plan/build a feature, investigate a bug, review generated code, and deploy. Each guide contains steps, required context, a prompt, and verification questions.
- **The workflow** (`/#/workflow`): the seven-step engineering loop, task boundaries, and responsible use.
- **Resources** (`/#/resources`): classroom and repository links, official setup references, access notes, and a clearly marked slides placeholder.
- **Demo prompts** (`/#/prompts`): six reusable prompts from the presenter’s script.

Guide disclosures work independently with the keyboard. Prompt text is readonly and can be selected and copied with the browser or operating system’s usual controls. There are no model calls, API keys, accounts, persistence, or backend services.

## Code responsibilities

| Area                   | Location / responsibility                                                                                 |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| Application shell      | `src/app/app.*`: attribution, navigation, footer, skip navigation, and route-change focus                 |
| Routes                 | `src/app/app.routes.ts`: guide, workflow, resources, prompts, and unknown-page routes                     |
| Prepared content       | `src/app/data/guides.ts`: readonly `TaskId` / `TaskGuide` types, five guide records, and engineering loop |
| Resource configuration | `src/app/data/resources.ts`: links, access notes, classroom URL, and `SLIDES_URL`                         |
| Lecture prompts        | `src/app/data/demo-prompts.ts`: six prepared prompts and their context                                    |
| Guide rendering        | `src/app/components/guide-section.ts`: a native disclosure for one guide                                  |
| Prompt rendering       | `src/app/components/prompt-text.ts`: a labeled readonly textarea and manual-copy instructions             |
| Pages                  | `src/app/pages/`: compose the local data and reusable components                                          |
| Neutral styling        | `src/styles.css` and `src/app/app.css`: readable baseline layout and accessible focus                     |

The starter owns its data files. It does not import code, styles, or data from the completed project. The duplicated prepared content intentionally allows independent live edits without changing the fallback.

## Rehearsing the live work

1. Open the starter on port 4200 and the [completed backup](projects/workshop-complete/README.md) on port 4201.
2. Review the prepared content and actual Howard reference screenshots before class.
3. Apply the agreed visual theme to the root starter.
4. Implement the selector and clipboard behavior using the [HUB-01 criteria](projects/workshop-complete/docs/HUB-01.md), adding the relevant state-change and failure tests during the demo.
5. Use the [rehearsal runbook](projects/workshop-complete/docs/rehearsal.md) for the labeled bug/fix examples and saved reference views.

The backup’s `/#/rehearsal/baseline` is a UI reference inside the completed app. It is not the editable starter, a Git checkpoint, or a reset command. The actual live implementation belongs in the root `src/` and `public/` directories.

## Verification

Starter tests cover guide identity/order, complete content, exact prompt values, readonly labels, navigation, resources, the slides placeholder, and unknown-page recovery. Run both apps’ tests and production builds before class.

Browser checks should cover keyboard navigation and disclosures, manual prompt selection, mobile width, increased browser zoom, hash-route reload, and visible focus. After implementing the selector, add and run the task-switching and clipboard checks from HUB-01.

See [the starter verification record](docs/starter-verification.md) for the checks performed during this conversion.

## Deployment

The root starter remains the default build:

- Root directory: repository root.
- Install command: `npm ci`.
- Build command: `npm run build`.
- Output directory: `dist/howard-ai-workshop/browser`.

Hash-based routes support refresh on static hosting without additional route rewrites. The completed backup keeps its separate build/output settings in its README.

Classroom URL: <https://howard-ai-workshop.vercel.app/>. Local changes do not publish this site. After an authorized deployment, verify the exact commit, signed-out access, and the current app at the public URL.

Set `SLIDES_URL` in each app’s `data/resources.ts` when the public deck is available. Until then, both apps show “Coming soon”.
