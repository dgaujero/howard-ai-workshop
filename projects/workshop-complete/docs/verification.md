# Completed Field Guide verification

Checked September 20, 2026 (America/New_York).

This records the initial completed-backup verification, when the root app was still the assignment planner. The root app was subsequently replaced with the Field Guide starter; use the root README and [starter verification record](../../../docs/starter-verification.md) for its current behavior and checks.

## Automated checks

| Command                                  | Result                                                                                                                 |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `npm run test:complete -- --watch=false` | 18 tests passed                                                                                                        |
| `npm test -- --watch=false`              | 7 original planner tests passed                                                                                        |
| `npm run build:complete`                 | Passed; output at `dist/workshop-complete/browser`                                                                     |
| `npm run build`                          | Passed; output at `dist/howard-ai-workshop/browser`                                                                    |
| `npm run test:copy-bug`                  | One intentional assertion failure: expected the debugging prompt, received the earlier repository-understanding prompt |

The original planner's 20 source and public files were checked against a checksum manifest from before the backup work; all were preserved. Both projects use the existing dependencies.

## Browser evidence

Chrome checks ran against the development server and the final production files served with a plain local HTTP server. The production check confirmed:

- Five choices and no selection on first load; reload resets selection.
- Native Space/arrow-key selection, a visible focus ring, and keyboard skip navigation.
- Selecting Understand a repo, then Debug a bug, writes the debugging prompt to the real browser clipboard; reading the clipboard returns the displayed text.
- Denying clipboard permission produces accurate failure feedback. Select text selects the entire prompt.
- Desktop (1440px), mobile (390px), narrow (320px), and a 200%-zoom-equivalent layout (640 CSS pixels with scale factor 2) have no horizontal page overflow or clipped content. Resources were also checked at 320px.
- Navigation, saved rehearsal views, the unknown-route page, and hash-route reload work from static production output.
- The labeled flawed example copies the earlier prompt; the corrected example copies the current one.
- No browser console errors were reported. Desktop and mobile screenshots were visually inspected.

The zoom check emulates the available CSS viewport; it does not exercise Chrome's toolbar zoom control. Clipboard evidence uses a real write/read in Chrome, not a paste into a separate desktop editor. Rehearse that editor paste before class.

## Public deployment and remaining presenter preparation

The supplied classroom URL, <https://howard-ai-workshop.vercel.app/>, responded successfully. Its published bundle still contains the default Angular welcome screen, including “Congratulations! Your app is running.” It is not the completed Field Guide build verified here.

This backup has not been deployed. Its static output is ready for the separate Vercel settings in [the README](../README.md). Verify the deployed commit, signed-out access, navigation, and clipboard behavior after publishing.

The slide deck remains a “Coming soon” placeholder. Review the prepared guide wording, capture the actual reference screenshots, and prepare the recording described in [the rehearsal notes](rehearsal.md).
