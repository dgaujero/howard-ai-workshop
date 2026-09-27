import { Component, input, OnChanges, OnDestroy, signal } from '@angular/core';
import { writePrompt } from './clipboard';

@Component({
  selector: 'app-prompt-card',
  templateUrl: './prompt-card.html',
  styleUrl: './prompt-card.css',
})
export class PromptCard implements OnChanges, OnDestroy {
  readonly text = input.required<string>();
  readonly promptId = input.required<string>();
  readonly label = input('Starter prompt');
  readonly status = signal<'idle' | 'copying' | 'copied' | 'error'>('idle');
  readonly message = signal('');
  private request = 0;

  ngOnChanges(): void {
    // A completion for an older selection must not report success on the new prompt.
    this.request++;
    this.status.set('idle');
    this.message.set('');
  }

  ngOnDestroy(): void {
    this.request++;
  }

  async copy(): Promise<void> {
    const request = ++this.request;
    const text = this.text();
    const label = this.label();
    this.status.set('copying');
    this.message.set('Copying…');
    try {
      await writePrompt(text);
      if (request !== this.request) return;
      this.status.set('copied');
      this.message.set(`${label} copied. Paste it into your editor or chat.`);
    } catch {
      if (request !== this.request) return;
      this.status.set('error');
      this.message.set(
        'Copy was not allowed. Select the prompt below and use your device’s copy command.',
      );
    }
  }

  selectText(textarea: HTMLTextAreaElement): void {
    textarea.focus();
    textarea.select();
  }
}
