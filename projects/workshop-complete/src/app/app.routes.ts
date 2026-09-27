import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Task guides | AI Engineering Field Guide',
    loadComponent: () => import('./pages/home').then((m) => m.Home),
  },
  {
    path: 'workflow',
    title: 'The workflow | AI Engineering Field Guide',
    loadComponent: () => import('./pages/workflow').then((m) => m.Workflow),
  },
  {
    path: 'resources',
    title: 'Resources | AI Engineering Field Guide',
    loadComponent: () => import('./pages/resources').then((m) => m.Resources),
  },
  {
    path: 'prompts',
    title: 'Demo prompts | AI Engineering Field Guide',
    loadComponent: () => import('./pages/prompts').then((m) => m.DemoPrompts),
  },
  {
    path: 'rehearsal',
    title: 'Presenter rehearsal | Field Guide',
    loadComponent: () => import('./pages/rehearsal').then((m) => m.Rehearsal),
  },
  {
    path: 'rehearsal/copy-bug',
    title: 'Deliberately flawed copy | Field Guide',
    data: { initialMode: 'flawed' },
    loadComponent: () => import('./rehearsal/clipboard-lab').then((m) => m.ClipboardLab),
  },
  {
    path: 'rehearsal/copy-fixed',
    title: 'Corrected copy example | Field Guide',
    data: { initialMode: 'corrected' },
    loadComponent: () => import('./rehearsal/clipboard-lab').then((m) => m.ClipboardLab),
  },
  ...[
    { stage: 'baseline', title: 'Content baseline' },
    { stage: 'styled', title: 'Styled guide content' },
    { stage: 'selector', title: 'Selector complete' },
    { stage: 'verified', title: 'Completed reference' },
  ].map((checkpoint) => ({
    path: `rehearsal/${checkpoint.stage}`,
    title: `${checkpoint.title} | Field Guide`,
    data: checkpoint,
    loadComponent: () => import('./pages/checkpoint').then((m) => m.Checkpoint),
  })),
  {
    path: '**',
    title: 'Page not found | Field Guide',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
];
