import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LIVE_WORKSHOP_URL } from '../data/resources';

@Component({
  selector: 'app-rehearsal',
  imports: [RouterLink],
  template: ` <div class="page-shell reading-page">
    <header class="page-heading">
      <p class="eyebrow">Presenter rehearsal · Prepared reference</p>
      <h1>Keep the lesson moving.</h1>
      <p>
        Saved views for an honest fallback. Name the checkpoint when you open it, then return to
        inspecting the engineering decisions.
      </p>
    </header>
    <section class="notice">
      <h2>These are prepared views, not deployment history.</h2>
      <p>
        They live in this completed backup. They are not Git branches or evidence that the live
        agent completed a task. The clipboard bug is deliberately isolated from the normal guide.
      </p>
    </section>
    <div class="resource-grid section-space">
      @for (checkpoint of checkpoints; track checkpoint.path) {
        <a class="resource-card" [routerLink]="checkpoint.path"
          ><span class="eyebrow">{{ checkpoint.stage }}</span>
          <h2>{{ checkpoint.title }}</h2>
          <p>{{ checkpoint.description }}</p>
          <span class="text-link">Open saved view →</span></a
        >
      }
    </div>
    <section class="two-columns section-space">
      <article class="panel">
        <h2>If the live demo stalls</h2>
        <p>
          “This is taking longer than I want to spend on it live. I’m going to open the saved
          checkpoint so we can keep reviewing the workflow. This is the rehearsed version.”
        </p>
        <p>Use the time to trace the selected task, displayed content, and clipboard payload.</p>
      </article>
      <article class="panel">
        <h2>Before you share a URL</h2>
        <ul class="plain-list">
          <li>Open the exact URL while signed out.</li>
          <li>Use a publicly accessible deployment for student testing.</li>
          <li>Match the build’s commit to the change being discussed.</li>
          <li>Keep a recording and a plain text editor ready.</li>
        </ul>
        <a [href]="liveWorkshop" target="_blank" rel="noopener noreferrer" class="text-link"
          >Open the classroom site ↗</a
        >
      </article>
    </section>
    <section class="panel section-space">
      <h2>Deployment is a separate checkpoint.</h2>
      <p>
        This local backup does not prove that a deployment has completed. Build and deploy it to its
        own Vercel project, verify the URL and commit, and record that evidence in the rehearsal
        notes.
      </p>
    </section>
  </div>`,
})
export class Rehearsal {
  readonly liveWorkshop = LIVE_WORKSHOP_URL;
  readonly checkpoints = [
    {
      stage: '01 · Content baseline',
      title: 'Start with the material',
      path: '/rehearsal/baseline',
      description:
        'The five guide records in a plain content view, before a shared theme or task selector.',
    },
    {
      stage: '02 · Styled content',
      title: 'Review the visual direction',
      path: '/rehearsal/styled',
      description:
        'The same guide content with the shared reading styles. The selector is still absent in this saved view.',
    },
    {
      stage: '03 · Selector complete',
      title: 'Follow the selected task',
      path: '/rehearsal/selector',
      description:
        'A finished selector with synchronized steps, context, prompt, and verification questions.',
    },
    {
      stage: '04 · Intentional defect',
      title: 'Catch the stale copy',
      path: '/rehearsal/copy-bug',
      description:
        'A clearly labeled, deliberately flawed clipboard example for the A → B regression.',
    },
    {
      stage: '05 · Corrected example',
      title: 'Keep the same criterion',
      path: '/rehearsal/copy-fixed',
      description:
        'The corrected copy behavior, ready to compare using the same sequence and assertion.',
    },
    {
      stage: '06 · Completed reference',
      title: 'Open the finished workbench',
      path: '/rehearsal/verified',
      description:
        'The completed selector as a prepared reference. Run the local checks and verify the actual deployed environment separately.',
    },
  ];
}
