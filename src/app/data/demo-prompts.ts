export const DEMO_PROMPTS = [
  {
    id: 'visual-reference',
    title: '01 · Read the visual reference',
    phase: 'Understand',
    context:
      'Attach the actual reference screenshots. Keep their source URLs with your preparation notes.',
    text: 'Analyze these Howard website screenshots as visual references for our guest-lecture resource hub. Describe color roles, type hierarchy, spacing, layout and repeated patterns. Separate observations from guesses. Propose a small reusable theme. Do not edit files yet.',
  },
  {
    id: 'apply-theme',
    title: '02 · Apply the reviewed theme',
    phase: 'Implement',
    context:
      'State the class’s chosen direction first: stronger header emphasis or a spacious reading layout.',
    text: 'Apply the reviewed visual direction to this existing Angular app. Inspect its styling first. Centralize reusable theme values, reuse components, preserve guide content and links, and keep keyboard access and narrow layouts usable. Explain your changes and checks. Do not deploy yet.',
  },
  {
    id: 'plan-selector',
    title: '03 · Plan HUB-01',
    phase: 'Plan',
    context:
      'Provide the agreed acceptance criteria. Include task switching, copying the current prompt, and clipboard failure.',
    text: 'Inspect the Angular project without editing. Find the guide data, components and tests. Propose a small plan for HUB-01 using the agreed criteria. Identify uncertainty, affected files and checks.',
  },
  {
    id: 'implement-selector',
    title: '04 · Implement and test',
    phase: 'Delegate',
    context:
      'Review the plan first. Keep the task bounded to the selector and its acceptance criteria.',
    text: 'Implement this scoped plan. Preserve the reviewed theme and content. Add tests for selection changes, the current copy payload and copy-failure feedback. Run the relevant checks and the existing suite. Report what actually ran and any blockers. Do not commit or deploy yet.',
  },
  {
    id: 'regression',
    title: '05 · Preserve the failure as a test',
    phase: 'Verify',
    context:
      'Use the deliberately flawed rehearsal example only if the live implementation already handles this case.',
    text: 'Add a regression test that selects A then B and asserts the copied payload belongs to B. Show it fails on this flawed version. Fix the state handling and rerun the checks without changing the acceptance criteria.',
  },
  {
    id: 'ship',
    title: '06 · Prepare to ship',
    phase: 'Review',
    context:
      'Confirm the remote, branch, intended target environment, and the project actually being built.',
    text: 'Review the current diff and Git status. Run the agreed tests and production build. Report what passed, what was skipped, and the exact build output. Identify the intended branch and deployment target. Do not commit, push, or deploy until I authorize that step.',
  },
] as const;
