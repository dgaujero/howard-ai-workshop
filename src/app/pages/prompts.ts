import { Component } from '@angular/core';
import { PromptText } from '../components/prompt-text';
import { DEMO_PROMPTS } from '../data/demo-prompts';

@Component({
  selector: 'app-demo-prompts',
  imports: [PromptText],
  template: `
    <header class="page-intro">
      <h1>Demo prompts</h1>
      <p>
        Reuse the prompts from the workshop. Supply your own requirements, review the plan, and
        check what actually happens.
      </p>
    </header>
    @for (prompt of prompts; track prompt.id) {
      <section class="content-section">
        <p class="help-text">{{ prompt.phase }}</p>
        <h2>{{ prompt.title }}</h2>
        <p>{{ prompt.context }}</p>
        <app-prompt-text
          [promptId]="prompt.id"
          [label]="prompt.title + ' — prompt'"
          [text]="prompt.text"
        />
      </section>
    }
  `,
})
export class DemoPrompts {
  readonly prompts = DEMO_PROMPTS;
}
