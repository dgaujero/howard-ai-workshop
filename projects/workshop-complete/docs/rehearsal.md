# Field Guide backup rehearsal

This supports the supplied presenter script. It does not replace the script or claim that a live deployment, recording, or slide deck is prepared.

## Keep the two apps distinct

- `npm start` → the minimally styled **AI Engineering Field Guide starter**, port 4200.
- `npm run start:complete` → the completed **AI Engineering Field Guide**, port 4201.
- The root starter now matches the script: working navigation, five local guide records, workflow and resource pages, and manually selectable prompts. The first guide is expanded; other guides open independently.
- The live tasks are the **shared visual theme** and **task selector with current-prompt copy behavior**. Keep live edits in the root starter (`src/` and `public/`). The completed app has its own data and implementation.
- The baseline below remains a saved view inside the completed app. Use port 4200 for the actual editable starter; the backup baseline is not a reset mechanism or an exact snapshot of that source.
- Classroom deployment supplied by the presenter: <https://howard-ai-workshop.vercel.app/>.
- On September 20, 2026, that deployment still served the default Angular welcome screen. Confirm the intended classroom starter is deployed before rehearsing against it.
- The completed backup needs its own verified public deployment before students can use it remotely. `localhost` is only for the presenter’s machine.

## Saved reference views

Start the backup, then open `http://localhost:4201/#/rehearsal`.

| Script moment                        | Saved route               | What it contains                                              |
| ------------------------------------ | ------------------------- | ------------------------------------------------------------- |
| Existing content / fallback baseline | `/#/rehearsal/baseline`   | Plain presentation of all five prepared records; no selector  |
| Shared theme / styled checkpoint     | `/#/rehearsal/styled`     | The same records using the shared reading styles; no selector |
| Selector complete                    | `/#/rehearsal/selector`   | The finished task selector and synchronized content           |
| Intentional clipboard defect         | `/#/rehearsal/copy-bug`   | A deliberately cached first prompt                            |
| Corrected example                    | `/#/rehearsal/copy-fixed` | Current-prompt copy behavior                                  |
| Completed reference                  | `/#/rehearsal/verified`   | The completed workbench ready for inspection                  |

These are labeled UI reference views in one backup build, not Git commits, independent historical code snapshots, or proof of a completed deployment. The surrounding navigation belongs to the completed backup even in the plain baseline content view.

## The clipboard demonstration

1. After implementing the live selector, open that workbench on port 4200. For rehearsal or fallback, use the completed workbench on port 4201. Select **Understand a repo**, then **Debug a bug**.
2. Copy, paste into a plain text editor, and check that it is the debugging prompt.
3. If the live implementation handles the case, say that it works. Open the explicitly labeled flawed example.
4. Repeat the same choices. The displayed prompt changes, but the attempted clipboard payload is still the first prompt.
5. Run `npm run test:copy-bug`. Expect one failed assertion comparing the received understanding prompt with the expected debugging prompt. Do not describe a setup or compilation failure as reproducing the bug.
6. Inspect the `firstPrompt` branch in `clipboard-lab.ts`. The corrected branch reads the selected guide at the time of the click.
7. Open the corrected example and repeat the identical browser sequence.
8. Run `npm run test:complete -- --watch=false`. Its corrected-example test imports the same assertion helper used by the deliberately failing example.
9. If copying is denied, show the accurate message and selectable text. The lab’s “attempted payload” is not a claim that the operating-system clipboard changed.

The normal workbench’s implementation always reads its current prompt. It does not enable a bug mode.

## Before the class

The [verification record](verification.md) captures checks completed for this implementation. Repeat the relevant browser checks at the eventual public backup URL.

- Read all five guide records and adapt any wording to your course context.
- Review [HUB-01](HUB-01.md) and rehearse the actual terminal commands.
- Confirm both dev-server commands and both production builds on this machine.
- Check starter navigation, independent guide disclosures, manual prompt selection, keyboard focus, and a narrow viewport.
- Rehearse task switching, actual paste, and denied clipboard permission in the completed backup and again after adding those features live.
- Supply the public slide-deck URL in each app’s `data/resources.ts`; both currently show “Coming soon”.
- Capture and retain the actual Howard reference screenshots you plan to attach. [Design notes](design-notes.md) give source URLs and distinguish the implemented design choices from observations.
- Deploy the backup separately and record its URL, commit, and verification date. Check student access in a signed-out browser.
- Prepare the short recording and your plain text editor. A recording has not been generated by this implementation.
- Recheck the official Codex access page on the day of the lecture. Avoid a fixed promise about plan limits.

## Deployment evidence to record after publishing

| Item                       | Value                               |
| -------------------------- | ----------------------------------- |
| Completed-backup URL       | Not deployed by this implementation |
| Commit                     | Record the exact deployed commit    |
| Deployment status          | Confirm in Vercel                   |
| Signed-out access          | Verify before sharing               |
| Selection and actual paste | Verify at the deployed URL          |

For the backup project, build `npm run build:complete` from the repository root and publish `dist/workshop-complete/browser`. Keep the classroom project’s build settings separate.
