import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ENGINEERING_LOOP } from '../data/guides';

@Component({
  selector: 'app-workflow',
  imports: [RouterLink],
  template: ` <div class="page-shell reading-page">
    <header class="page-heading">
      <p class="eyebrow">The engineering loop</p>
      <h1>A process you can repeat.</h1>
      <p>The tool can change. Your responsibility for the result stays with you.</p>
    </header>
    <div class="two-columns">
      <section aria-label="Seven steps" class="panel">
        <ol class="workflow-steps">
          @for (step of loop; track step.title; let i = $index) {
            <li>
              <span class="number">0{{ i + 1 }}</span>
              <div>
                <h2>{{ step.title }}</h2>
                <p>{{ step.detail }}</p>
              </div>
            </li>
          }
        </ol>
      </section>
      <aside class="stack">
        <section class="panel">
          <p class="eyebrow">Know what you’re delegating</p>
          <h2>Model → environment → agent → tools</h2>
          <p>
            The model interprets context. The environment connects it to instructions, files, and
            capabilities. The agent uses tools and feedback to work toward a goal.
          </p>
          <p>
            A terminal command, a browser check, and a generated explanation are different kinds of
            evidence. Ask what actually ran.
          </p>
        </section>
        <section class="panel">
          <p class="eyebrow">Better context</p>
          <h2>Give the task boundaries.</h2>
          <ul class="plain-list">
            <li>What should happen, and for whom?</li>
            <li>What existing behavior must stay intact?</li>
            <li>Which files, tools, or systems are in scope?</li>
            <li>What would prove the change is correct?</li>
          </ul>
        </section>
        <section class="notice">
          <h2>Your judgment is part of the product.</h2>
          <p>
            Follow your instructor’s AI-use rules. Keep private data and credentials out of prompts.
            Be able to explain, modify, and defend the work you submit.
          </p>
        </section>
      </aside>
    </div>
    <section class="takeaway">
      <h2>Start with a task you already have.</h2>
      <p>Choose a guide, supply the missing context, and make one small change you can verify.</p>
      <a routerLink="/" class="button">Choose a task <span aria-hidden="true">↗</span></a>
    </section>
  </div>`,
})
export class Workflow {
  readonly loop = ENGINEERING_LOOP;
}
