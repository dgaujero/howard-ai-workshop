import { Component } from '@angular/core';
import { PromptCard } from '../components/prompt-card';
import { DEMO_PROMPTS } from '../data/demo-prompts';

@Component({
  selector: 'app-demo-prompts',
  imports: [PromptCard],
  template: `<div class="page-shell reading-page">
    <header class="page-heading">
      <p class="eyebrow">The demo, in prompts</p>
      <h1>A starting point.<br />Not a substitute for context.</h1>
      <p>
        These are the prompts from the workshop. Supply your own requirements, review the plan, and
        check what actually happens.
      </p>
    </header>
    <div class="prompt-library">
      @for (prompt of prompts; track prompt.id) {
        <section>
          <div class="section-heading">
            <div>
              <p class="eyebrow">{{ prompt.phase }}</p>
              <h2>{{ prompt.title }}</h2>
            </div>
          </div>
          <p class="supporting-copy">{{ prompt.context }}</p>
          <app-prompt-card [promptId]="prompt.id" [label]="prompt.title" [text]="prompt.text" />
        </section>
      }
    </div>
  </div>`,
})
export class DemoPrompts {
  readonly prompts = DEMO_PROMPTS;
}
