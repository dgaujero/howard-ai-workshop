# Field Guide starter verification

The assignment planner has been replaced by the minimally styled Field Guide starter. The completed backup retains its own implementation and content. This record describes the conversion checks, with the final starter browser check completed on September 27, 2026.

## Tests and production builds

| Command                                  | Result                                    |
| ---------------------------------------- | ----------------------------------------- |
| `npm test -- --watch=false`              | 9 starter tests passed                    |
| `npm run test:complete -- --watch=false` | 18 completed-backup tests passed          |
| `npm run build`                          | Passed; `dist/howard-ai-workshop/browser` |
| `npm run build:complete`                 | Passed; `dist/workshop-complete/browser`  |

Starter tests cover all five guide records and their order, complete guide content, exact readonly prompt values and labels, all four navigation links, official resource descriptions and access notes, the classroom/repository links, the slides placeholder, six demo prompts, and recovery from an unknown page.

The completed app’s source and assets matched their checksums from before this conversion. Only its documentation was updated to describe the new starter.

## Chrome checks

The starter’s production files were served by a plain local HTTP server. The browser check confirmed:

- The first guide opens initially; other guides begin collapsed.
- Enter and Space operate the native disclosures. Opening another guide leaves the first open.
- Keyboard focus is visible, skip navigation reaches the main content, and route changes move focus to the new content.
- Readonly prompt text can be focused and fully selected with the keyboard.
- All four navigation destinations work. Resources survive a hash-route reload on the static server; an unknown route offers a working return link.
- All four pages fit 390px and 320px viewports, as well as a 640 CSS-pixel viewport at scale factor 2 representing a 200% zoom layout. Expanded guide content and long prompts cause no horizontal overflow.
- Desktop and mobile screenshots were visually inspected. No browser console errors were reported.
- The running development server at `http://localhost:4200/` serves the new Field Guide starter.

The zoom check emulates the CSS viewport and scale; it does not operate Chrome’s toolbar zoom control.

The completed app on port 4201 was also checked in Chrome. Switching from Understand a repo to Debug a bug copies the currently displayed prompt to the real browser clipboard. Denied clipboard permission produces accurate feedback, keyboard selection works, and the labeled flawed/corrected examples retain their intended behavior.

## Before class

The starter intentionally leaves the shared theme and task selector/copy controls for the live work. Review the guide wording, supply the slide URL when available, and use the [rehearsal runbook](../projects/workshop-complete/docs/rehearsal.md).

These changes have not been published. After deploying the starter, verify the intended commit, signed-out access, navigation, and guide content at the public classroom URL. Repeat selector and clipboard checks after adding those features live.
