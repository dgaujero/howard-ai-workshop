import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskWorkbench } from '../components/task-workbench';
import { TASK_GUIDES } from '../data/guides';

@Component({
  selector: 'app-checkpoint',
  imports: [RouterLink, TaskWorkbench],
  template: ` <div class="page-shell reading-page">
    <a routerLink="/rehearsal" class="text-link">← Presenter rehearsal</a>
    <header class="page-heading">
      <p class="eyebrow">Prepared reference · {{ stage() }}</p>
      <h1>{{ title() }}</h1>
      <p>This is a saved rehearsal view. It is not the result of the current live session.</p>
    </header>
    @if (stage() === 'selector' || stage() === 'verified') {
      <app-task-workbench />
    } @else {
      <section
        [class.plain-checkpoint]="stage() === 'baseline'"
        [class.styled-checkpoint]="stage() === 'styled'"
        aria-label="All five guides"
      >
        <h2>AI Engineering Field Guide</h2>
        <p>Browse the prepared content. This view has no task selector.</p>
        @for (guide of guides; track guide.id) {
          <details>
            <summary>{{ guide.title }}</summary>
            <p>{{ guide.outcome }}</p>
            <h3>Steps</h3>
            <ol>
              @for (step of guide.steps; track step.title) {
                <li>
                  <strong>{{ step.title }}</strong> — {{ step.description }}
                </li>
              }
            </ol>
            <h3>Required context</h3>
            <ul>
              @for (item of guide.context; track item) {
                <li>{{ item }}</li>
              }
            </ul>
            <label [for]="guide.id + '-reference'"><strong>Starter prompt</strong></label
            ><textarea
              [id]="guide.id + '-reference'"
              readonly
              rows="8"
              [value]="guide.prompt"
            ></textarea>
            <h3>Verification questions</h3>
            <ul>
              @for (check of guide.checks; track check) {
                <li>{{ check }}</li>
              }
            </ul>
          </details>
        }
      </section>
    }
  </div>`,
  styles: `
    .plain-checkpoint {
      background: #fff;
      color: #111;
      padding: 20px;
      font:
        16px/1.5 Arial,
        sans-serif;
      border: 1px solid #aaa;
    }
    .plain-checkpoint h2,
    .plain-checkpoint h3 {
      font-family: Arial, sans-serif;
    }
    details {
      padding: 20px 0;
      border-bottom: 1px solid var(--border);
    }
    summary {
      cursor: pointer;
      font-weight: 600;
      line-height: 1.6;
    }
    textarea {
      width: 100%;
      display: block;
      margin-top: 12px;
      padding: 15px;
      font: 13px/1.8 var(--font-mono);
    }
    li {
      margin-bottom: 10px;
    }
    .styled-checkpoint {
      max-width: 900px;
      padding: 32px;
      background: var(--paper);
      border: 1px solid var(--border);
      border-radius: var(--radius);
    }
    .styled-checkpoint summary {
      color: var(--blue);
      font: 24px/1.5 var(--font-heading);
    }
    .styled-checkpoint p,
    .styled-checkpoint li {
      color: var(--muted);
      line-height: 1.9;
    }
    @media (max-width: 500px) {
      .styled-checkpoint {
        padding: 20px;
      }
    }
  `,
})
export class Checkpoint {
  readonly stage = input('baseline');
  readonly title = input('Content baseline');
  readonly guides = TASK_GUIDES;
}
