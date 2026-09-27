export interface Resource {
  readonly title: string;
  readonly description: string;
  readonly href: string;
  readonly access: string;
  readonly category: 'Start here' | 'Build & ship' | 'Go further';
}

export const REPOSITORY_URL = 'https://github.com/dgaujero/howard-ai-workshop';
export const LIVE_WORKSHOP_URL = 'https://howard-ai-workshop.vercel.app/';
export const SOURCES_CHECKED = 'September 20, 2026';
// Supply the real public deck link when it is available. Never use a placeholder URL.
export const SLIDES_URL: string | null = null;

export const RESOURCES: readonly Resource[] = [
  {
    title: 'Codex in your IDE',
    description:
      'Official installation and first-chat instructions for working with Codex beside your code.',
    href: 'https://learn.chatgpt.com/docs/codex/ide',
    access: 'Documentation is public. Using Codex requires an account and available access.',
    category: 'Start here',
  },
  {
    title: 'Codex access & limits',
    description:
      'Check the current plans and usage limits before the workshop. API-key usage is billed separately from included plan usage.',
    href: 'https://learn.chatgpt.com/docs/pricing',
    access: 'Public reference. Availability and limits can change; check your account.',
    category: 'Start here',
  },
  {
    title: 'Visual Studio Code',
    description:
      'Get oriented in the editor: open a folder, find files, and use the integrated terminal.',
    href: 'https://code.visualstudio.com/docs/getstarted/overview',
    access: 'Public setup guide; VS Code is free to use.',
    category: 'Start here',
  },
  {
    title: 'GitHub: Hello World',
    description:
      'Practice repositories, branches, commits, and pull requests with GitHub’s introductory guide.',
    href: 'https://docs.github.com/en/get-started/using-github/hello-world',
    access: 'Public guide. A GitHub account is needed for the hosted exercise.',
    category: 'Build & ship',
  },
  {
    title: 'GitHub → Vercel',
    description:
      'Understand automatic deployments and how the production branch differs from previews.',
    href: 'https://vercel.com/docs/git/vercel-for-github',
    access: 'Public documentation. Connecting a project requires GitHub and Vercel accounts.',
    category: 'Build & ship',
  },
  {
    title: 'Vercel plans',
    description: 'Review the terms and limits for your project before choosing a hosting plan.',
    href: 'https://vercel.com/docs/plans',
    access:
      'Public reference. Hobby is a free option for eligible personal use; other plans and usage can cost money.',
    category: 'Build & ship',
  },
  {
    title: 'Learn Angular',
    description: 'Explore components, templates, and the framework used in this workshop.',
    href: 'https://angular.dev/tutorials/learn-angular',
    access: 'Free public learning material.',
    category: 'Go further',
  },
  {
    title: 'Cypress documentation',
    description: 'Explore the browser-testing tool discussed in the professional example.',
    href: 'https://docs.cypress.io/app/get-started/why-cypress',
    access:
      'Public documentation. The local test runner is open source; optional cloud services have separate plans.',
    category: 'Go further',
  },
  {
    title: 'The browser clipboard',
    description: 'See why copying can be blocked and why a selectable-text fallback matters.',
    href: 'https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText',
    access: 'Free public reference. Clipboard writing requires a secure context and may be denied.',
    category: 'Go further',
  },
];
