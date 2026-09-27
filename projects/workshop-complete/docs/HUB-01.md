# HUB-01 — choose an engineering task

As a student, I want to choose my engineering task so I can get relevant steps, a starter prompt, context requirements, and verification questions for my project.

## Acceptance criteria

1. The initial view offers five task choices and a helpful instruction. No prompt is selected initially.
2. Selecting any task updates the steps, context, prompt, and verification questions together from that task’s record.
3. Selecting A and then B makes the copy action write **B’s exact prompt**.
4. Copy success is reported only after the browser resolves the write.
5. A missing or denied Clipboard API leaves selectable prompt text and an accurate failure message.
6. Changing the task clears old copy feedback. An earlier pending copy cannot report its result as belonging to the newly selected prompt.
7. Radio controls work with the keyboard; focus is visible; narrow layouts wrap without horizontal page overflow.
8. Refresh resets the selection. There is no saved preference, sign-in, or AI backend.

## Evidence

- `task-workbench.spec.ts`: initial state, all five records, A → B clipboard payload, feedback reset.
- `prompt-card.spec.ts`: pending/success, denial, unavailable API, manual selection, stale resolution/rejection.
- `clipboard-lab.spec.ts`: the shared A → B assertion against the corrected teaching example.
- `stale-copy.demo.ts`: the same assertion against the deliberately flawed example; run only with `npm run test:copy-bug`.
- Browser: select two tasks, paste into an editor, deny clipboard permission, use the radio group with arrow keys, narrow the window, reload, and follow navigation links.

An old green deployment, a simulated clipboard success, or a screenshot alone does not prove clipboard behavior in the deployed environment.
