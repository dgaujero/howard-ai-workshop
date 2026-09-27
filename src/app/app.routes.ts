import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Task guides | AI Engineering Field Guide',
    loadComponent: () => import('./pages/guides').then((m) => m.Guides),
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
    path: '**',
    title: 'Page not found | AI Engineering Field Guide',
    loadComponent: () => import('./pages/not-found').then((m) => m.NotFound),
  },
];
