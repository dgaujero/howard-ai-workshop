import { Component, computed, signal } from '@angular/core';
import { GuideSection } from '../components/guide-section';
import { TASK_GUIDES, TaskId } from '../data/guides';

@Component({
  selector: 'app-guides',
  imports: [GuideSection],
  template: `
    <header class="page-intro">
      <h1>AI Engineering Field Guide</h1>
      <p>Practical steps, starter prompts, and checks for your next engineering task.</p>
    </header>
    <section aria-label="Task guides">
      <div class="task-picker">
        <label for="engineering-task">Choose your next step</label>
        <p id="task-instruction">
          Choose your engineering task to see relevant steps, required context, a starter prompt,
          and verification checks.
        </p>
        <select
          id="engineering-task"
          #taskSelect
          [value]="selectedTaskId() ?? ''"
          (change)="selectTask(taskSelect.value)"
          aria-describedby="task-instruction"
        >
          <option value="">Choose a task</option>
          @for (guide of guides; track guide.id) {
            <option [value]="guide.id">{{ guide.title }}</option>
          }
        </select>
      </div>
      @for (guide of selectedGuides(); track guide.id) {
        <app-guide-section [guide]="guide" [initiallyOpen]="true" />
      }
    </section>
  `,
})
export class Guides {
  readonly guides = TASK_GUIDES;
  readonly selectedTaskId = signal<TaskId | null>(null);
  readonly selectedGuides = computed(() =>
    this.guides.filter((guide) => guide.id === this.selectedTaskId()),
  );

  selectTask(value: string): void {
    this.selectedTaskId.set(this.guides.find((guide) => guide.id === value)?.id ?? null);
  }
}
