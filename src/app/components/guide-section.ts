import { Component, input } from '@angular/core';
import { TaskGuide } from '../data/guides';
import { PromptText } from './prompt-text';

@Component({
  selector: 'app-guide-section',
  imports: [PromptText],
  template: `
    <details [open]="initiallyOpen()" [id]="'guide-' + guide().id">
      <summary>
        <h2>{{ guide().title }}</h2>
      </summary>
      <div class="guide-content">
        <p>{{ guide().summary }}</p>
        <p><strong>What you’re working toward:</strong> {{ guide().outcome }}</p>
        <h3>Steps</h3>
        <ol class="guide-steps">
          @for (step of guide().steps; track step.title) {
            <li>
              <strong>{{ step.title }}</strong>
              <p>{{ step.description }}</p>
            </li>
          }
        </ol>
        <h3>Required context</h3>
        <ul class="guide-context">
          @for (item of guide().context; track item) {
            <li>{{ item }}</li>
          }
        </ul>
        <app-prompt-text
          [promptId]="guide().id + '-prompt'"
          [label]="guide().title + ' — starter prompt'"
          [text]="guide().prompt"
          [copyEnabled]="true"
        />
        <h3>Verification questions</h3>
        <ul class="guide-checks">
          @for (check of guide().checks; track check) {
            <li>{{ check }}</li>
          }
        </ul>
      </div>
    </details>
  `,
})
export class GuideSection {
  readonly guide = input.required<TaskGuide>();
  readonly initiallyOpen = input(false);
}
