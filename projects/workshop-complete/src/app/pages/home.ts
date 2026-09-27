import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskWorkbench } from '../components/task-workbench';
import { ENGINEERING_LOOP } from '../data/guides';

@Component({
  selector: 'app-home',
  imports: [RouterLink, TaskWorkbench],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly loop = ENGINEERING_LOOP;
  chooseTask(): void {
    const heading = document.getElementById('task-heading');
    heading?.focus({ preventScroll: true });
    heading?.scrollIntoView({ block: 'start' });
  }
}
