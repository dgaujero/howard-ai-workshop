export type TaskId = 'understand' | 'build' | 'debug' | 'review' | 'deploy';

export interface TaskGuide {
  readonly id: TaskId;
  readonly label: string;
  readonly title: string;
  readonly summary: string;
  readonly outcome: string;
  readonly steps: readonly { title: string; description: string }[];
  readonly context: readonly string[];
  readonly prompt: string;
  readonly checks: readonly string[];
}

// Prepared workshop content, not generated responses. This array is the single source for the selector.
export const TASK_GUIDES: readonly TaskGuide[] = [
  {
    id: 'understand',
    label: 'Understand a repo',
    title: 'Understand a repository',
    summary: 'Get your bearings before you change anything.',
    outcome: 'A map of the codebase you can check against the actual files.',
    steps: [
      {
        title: 'Start with the project’s instructions',
        description:
          'Read the README, repository guidance, package scripts, and configuration. Find how the app starts and how it is checked.',
      },
      {
        title: 'Trace one user action',
        description:
          'Follow an action from the screen through its components, state, and data source. Keep the investigation small enough to verify.',
      },
      {
        title: 'Ask for evidence',
        description:
          'Request file paths and relevant symbols. Separate what the agent found from what it inferred or could not run.',
      },
      {
        title: 'Build your own understanding',
        description:
          'Open the cited files, run the app, and explain the flow in your own words before asking for a change.',
      },
    ],
    context: [
      'Repository and its setup instructions',
      'The feature or user action you want to understand',
      'Your environment and available run/test commands',
      'Any files or systems the agent must not access',
    ],
    prompt:
      'Help me understand this repository without changing files. Identify the entry points and trace one representative user action through the relevant code. Cite file paths, distinguish findings from assumptions, and list what you could not verify. Ask me which feature to focus on if the scope is too broad.',
    checks: [
      'Do the cited files and symbols exist?',
      'Can I follow the described action through the code?',
      'Is mock data clearly distinguished from an external service?',
      'Can I explain the architecture without repeating the agent’s answer?',
    ],
  },
  {
    id: 'build',
    label: 'Plan & build a feature',
    title: 'Plan and build a feature',
    summary: 'Turn a request into a small, reviewable change.',
    outcome: 'A scoped implementation with evidence for each acceptance criterion.',
    steps: [
      {
        title: 'Make the requirement concrete',
        description:
          'Describe who needs the change, the expected behavior, and what is out of scope. Use a before-and-after example.',
      },
      {
        title: 'Resolve the important ambiguity',
        description:
          'Ask what should happen on the first visit, after a state change, and when an operation fails. Agree on acceptance criteria.',
      },
      {
        title: 'Inspect, then plan',
        description:
          'Have the agent locate the existing data, components, and tests. Review a small plan that fits the project before authorizing edits.',
      },
      {
        title: 'Implement and inspect',
        description:
          'Review the changed files, run relevant tests and the existing suite, and check the behavior in the browser.',
      },
    ],
    context: [
      'The user story and agreed acceptance criteria',
      'Existing components and the source of data',
      'Constraints, including dependencies and excluded features',
      'The project’s tests, build command, and expected output',
    ],
    prompt:
      'Inspect this project and propose a small plan for the feature below before editing. Identify the data flow, affected components, uncertainty, and checks. Follow existing patterns and keep unrelated changes out.\n\nFeature: [describe the user need]\nAcceptance criteria: [list observable behavior, including failure cases]\nConstraints: [state boundaries]\n\nAfter I review the plan, implement it, add meaningful tests, inspect the diff, and report the commands actually run and their results. Do not commit or deploy yet.',
    checks: [
      'Does each acceptance criterion have observable evidence?',
      'Does the change follow the existing architecture?',
      'Did we test a state change as well as the first render?',
      'Did the build and relevant tests actually pass?',
    ],
  },
  {
    id: 'debug',
    label: 'Debug a bug',
    title: 'Investigate a bug',
    summary: 'Find the cause, then prove the fix.',
    outcome: 'A reproduced failure, a focused fix, and a regression test.',
    steps: [
      {
        title: 'Describe the failure',
        description:
          'Write the steps, expected result, and actual result. Include relevant versions, logs, and a small example.',
      },
      {
        title: 'Reproduce before changing code',
        description:
          'Trace the data and state involved. Consider product code, tests, test data, and environment as separate possible causes.',
      },
      {
        title: 'Choose a distinguishing test',
        description:
          'Find an input or sequence that behaves differently in the broken and correct versions. Make the failure repeatable.',
      },
      {
        title: 'Fix and verify',
        description:
          'Change the smallest relevant part, rerun the regression and existing checks, then repeat the original browser action.',
      },
    ],
    context: [
      'Exact steps to reproduce, expected result, and actual result',
      'Relevant logs and errors with private values removed',
      'The failing test or the smallest reproducible input',
      'Environment details and recent relevant changes',
    ],
    prompt:
      'Investigate this bug before editing. Reproduce the reported behavior and trace the relevant state and data flow. Distinguish a product defect from a test, data, or environment problem. Explain the likely cause with file references.\n\nSteps: [reproduction steps]\nExpected: [expected result]\nActual: [actual result]\n\nAdd a regression test that fails for the reported reason, make the smallest justified fix, and rerun the regression plus relevant existing checks. Keep the acceptance criteria unchanged. Report what you verified and any remaining uncertainty.',
    checks: [
      'Did the regression fail for the intended reason before the fix?',
      'Does it pass after the fix without weakening the requirement?',
      'Did we test the sequence that originally exposed the issue?',
      'Have we repeated the behavior in the actual application?',
    ],
  },
  {
    id: 'review',
    label: 'Review generated code',
    title: 'Review generated code',
    summary: 'Read the diff. Question the assumptions.',
    outcome: 'Prioritized findings backed by code and reproducible evidence.',
    steps: [
      {
        title: 'Start from the requirement',
        description:
          'Read the agreed behavior and boundaries. A neat implementation can still solve the wrong problem.',
      },
      {
        title: 'Follow the important data',
        description:
          'Inspect where values originate, how state changes, and what side effects occur. Look for duplicated sources of truth.',
      },
      {
        title: 'Try to disprove the result',
        description:
          'Inspect what tests assert, not just whether they pass. Try empty input, state changes, failure paths, and keyboard use where relevant.',
      },
      {
        title: 'Decide with evidence',
        description:
          'Prioritize defects by impact. Separate required fixes, questions, and optional improvements before accepting the change.',
      },
    ],
    context: [
      'The diff or commit range to review',
      'Requirements, constraints, and acceptance criteria',
      'Test results and any checks that were skipped',
      'Relevant usage, accessibility, and failure scenarios',
    ],
    prompt:
      'Review this change against the supplied requirements without editing files. Prioritize correctness, regressions, maintainability, and missing tests. Trace important data and state transitions. For each finding, give the file and location, impact, and a concrete reproduction or test. Separate confirmed defects from uncertainty and optional suggestions. If you find no defects, say what you checked and what remains unverified.',
    checks: [
      'Can each finding be tied to code and an expected behavior?',
      'Were failure paths and state transitions considered?',
      'Are test gaps distinguished from confirmed product defects?',
      'Do I understand the change well enough to maintain it?',
    ],
  },
  {
    id: 'deploy',
    label: 'Deploy a change',
    title: 'Deploy and verify a change',
    summary: 'Connect the reviewed commit to the live result.',
    outcome: 'A known commit running at a URL you have actually checked.',
    steps: [
      {
        title: 'Verify locally',
        description:
          'Inspect Git status and the diff. Run the project’s tests and production build before recording the change.',
      },
      {
        title: 'Identify the destination',
        description:
          'Confirm the remote, branch, build command, output directory, and intended preview or production environment.',
      },
      {
        title: 'Follow the deployment',
        description:
          'After authorization, commit and push. Match the resulting deployment to that commit instead of relying on an older green build.',
      },
      {
        title: 'Verify where users will use it',
        description:
          'Open the deployed URL, repeat the key user actions, and check signed-out access before sharing it with the class.',
      },
    ],
    context: [
      'Repository remote, branch, and intended deployment environment',
      'The actual build command and output directory',
      'The commit to deploy and its test results',
      'Critical browser checks, access requirements, and rollback plan',
    ],
    prompt:
      'Inspect the repository and deployment configuration. Report the current branch and remote, intended target environment, build command, and output directory. Run the agreed tests and production build, inspect the diff, and report blockers. Do not commit, push, or deploy until I authorize that step.\n\nAfter authorization, record the commit and deployment URL, confirm the deployment corresponds to that commit, and verify the agreed user actions at the live URL. Distinguish successful deployment from a pending build or a local-only check.',
    checks: [
      'Did the tests and production build pass for this change?',
      'Does the deployment show the intended commit and environment?',
      'Do navigation, task switching, and copying work at the live URL?',
      'Can a signed-out student access the exact URL being shared?',
    ],
  },
];

export const ENGINEERING_LOOP = [
  {
    title: 'Understand',
    detail: 'Read the project. Trace the behavior. Name what is still unknown.',
  },
  { title: 'Plan', detail: 'Define a bounded change and the evidence that will count as success.' },
  {
    title: 'Delegate',
    detail: 'Supply requirements, context, constraints, and permission boundaries.',
  },
  {
    title: 'Inspect',
    detail: 'Read the diff and connect implementation decisions to the requirement.',
  },
  { title: 'Test', detail: 'Run a deterministic check that could expose a mistake.' },
  { title: 'Verify', detail: 'Repeat the user action in the actual environment.' },
  { title: 'Iterate', detail: 'Question an assumption, correct the cause, and rerun the checks.' },
] as const;
