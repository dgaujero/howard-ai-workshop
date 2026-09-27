import { Component, input, OnChanges, OnDestroy, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TASK_GUIDES, TaskGuide } from '../data/guides';
import { writePrompt } from '../components/clipboard';

@Component({
  selector: 'app-clipboard-lab',
  imports: [RouterLink],
  templateUrl: './clipboard-lab.html',
})
export class ClipboardLab implements OnChanges, OnDestroy {
  readonly initialMode = input<'flawed' | 'corrected'>('flawed');
  readonly mode = signal<'flawed' | 'corrected'>('flawed');
  readonly guides = TASK_GUIDES;
  readonly selected = signal<TaskGuide | null>(null);
  readonly attemptedPayload = signal('');
  readonly feedback = signal('');
  readonly copying = signal(false);
  private firstPrompt: string | null = null;
  private request = 0;

  ngOnChanges(): void {
    this.setMode(this.initialMode());
  }
  ngOnDestroy(): void {
    this.request++;
  }
  setMode(mode: 'flawed' | 'corrected'): void {
    this.mode.set(mode);
    this.reset();
  }
  reset(): void {
    this.request++;
    this.firstPrompt = null;
    this.selected.set(null);
    this.attemptedPayload.set('');
    this.feedback.set('');
    this.copying.set(false);
  }
  select(id: string): void {
    const guide = this.guides.find((item) => item.id === id) ?? null;
    this.request++;
    this.selected.set(guide);
    this.attemptedPayload.set('');
    this.feedback.set('');
    this.copying.set(false);
    if (guide && this.firstPrompt === null) this.firstPrompt = guide.prompt;
  }
  async copy(): Promise<void> {
    const guide = this.selected();
    if (!guide) return;
    // Deliberate teaching defect: retain the first selection rather than read the current one.
    // The normal workbench never uses this component or this cached value.
    const payload = this.mode() === 'flawed' ? this.firstPrompt! : guide.prompt;
    const request = ++this.request;
    this.attemptedPayload.set(payload);
    this.copying.set(true);
    this.feedback.set('Copying…');
    try {
      await writePrompt(payload);
      if (request !== this.request) return;
      this.feedback.set(
        'Clipboard write succeeded. Paste into a text editor and compare with the visible prompt.',
      );
    } catch {
      if (request !== this.request) return;
      this.feedback.set(
        'Clipboard write was blocked. Nothing was confirmed copied. Inspect the attempted payload below.',
      );
    } finally {
      if (request === this.request) this.copying.set(false);
    }
  }
}
