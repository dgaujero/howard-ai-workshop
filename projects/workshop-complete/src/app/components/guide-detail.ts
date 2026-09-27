import { Component, input } from '@angular/core';
import { TaskGuide } from '../data/guides';
import { PromptCard } from './prompt-card';

@Component({
  selector: 'app-guide-detail',
  imports: [PromptCard],
  templateUrl: './guide-detail.html',
  styleUrl: './guide-detail.css',
})
export class GuideDetail {
  readonly guide = input.required<TaskGuide>();
  readonly idPrefix = input('guide');
}
