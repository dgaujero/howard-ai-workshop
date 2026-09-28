import { Component, DestroyRef, inject, input, signal } from '@angular/core';

@Component({
  selector: 'app-prompt-text',
  template: `
    <label [for]="promptId()">{{ label() }}</label>
    <textarea
      [id]="promptId()"
      [value]="text()"
      [attr.aria-describedby]="promptId() + '-help'"
      readonly
      rows="8"
      spellcheck="false"
    ></textarea>
    <p class="help-text" [id]="promptId() + '-help'">
      Select the prompt text and use your device’s copy command. Adapt it to your project.
    </p>
    @if (copyEnabled()) {
      <button class="copy-prompt" type="button" (click)="copy()" [disabled]="copying()">
        {{ copying() ? 'Copying…' : 'Copy prompt' }}
      </button>
      <p class="help-text copy-status" role="status" aria-live="polite">{{ copyMessage() }}</p>
    }
  `,
})
export class PromptText {
  readonly promptId = input.required<string>();
  readonly label = input.required<string>();
  readonly text = input.required<string>();
  readonly copyEnabled = input(false);
  readonly copying = signal(false);
  readonly copyMessage = signal('');
  private readonly destroyRef = inject(DestroyRef);

  async copy(): Promise<void> {
    if (this.copying()) return;
    const prompt = this.text();
    this.copying.set(true);
    this.copyMessage.set('');
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(prompt);
      if (!this.destroyRef.destroyed) this.copyMessage.set('Prompt copied.');
    } catch {
      if (!this.destroyRef.destroyed) {
        this.copyMessage.set(
          'Couldn’t copy automatically. Select the prompt text above and use your device’s copy command.',
        );
      }
    } finally {
      if (!this.destroyRef.destroyed) this.copying.set(false);
    }
  }
}
