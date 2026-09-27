import { Component } from '@angular/core';
import { GuideSection } from '../components/guide-section';
import { TASK_GUIDES } from '../data/guides';

@Component({
  selector: 'app-guides',
  imports: [GuideSection],
  template: `
    <header class="page-intro">
      <h1>AI Engineering Field Guide</h1>
      <p>Practical steps, starter prompts, and checks for your next engineering task.</p>
      <p>Browse the five guides below. Open any guide to read it; you can keep several open.</p>
    </header>
    <section aria-label="Task guides">
      @for (guide of guides; track guide.id; let first = $first) {
        <app-guide-section [guide]="guide" [initiallyOpen]="first" />
      }
    </section>
  `,
})
export class Guides {
  readonly guides = TASK_GUIDES;
}
