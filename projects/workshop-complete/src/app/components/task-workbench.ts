import { Component, computed, signal } from '@angular/core';
import { TASK_GUIDES, TaskId } from '../data/guides';
import { GuideDetail } from './guide-detail';

@Component({
  selector: 'app-task-workbench',
  imports: [GuideDetail],
  templateUrl: './task-workbench.html',
  styleUrl: './task-workbench.css',
})
export class TaskWorkbench {
  readonly guides = TASK_GUIDES;
  readonly selectedId = signal<TaskId | null>(null);
  readonly selectedGuide = computed(
    () => this.guides.find((guide) => guide.id === this.selectedId()) ?? null,
  );

  selectTask(id: TaskId): void {
    this.selectedId.set(id);
  }
  clearSelection(): void {
    this.selectedId.set(null);
  }
}
