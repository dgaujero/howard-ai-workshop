import { TestBed } from '@angular/core/testing';
import { PromptCard } from './prompt-card';

describe('PromptCard', () => {
  let originalClipboard: PropertyDescriptor | undefined;
  const writeText = vi.fn<(text: string) => Promise<void>>();
  beforeEach(async () => {
    originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    writeText.mockReset().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({ imports: [PromptCard] }).compileComponents();
  });
  afterEach(() => {
    if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
    else Reflect.deleteProperty(navigator, 'clipboard');
  });
  async function render() {
    const fixture = TestBed.createComponent(PromptCard);
    fixture.componentRef.setInput('text', 'Prompt A');
    fixture.componentRef.setInput('promptId', 'test-prompt');
    fixture.componentRef.setInput('label', 'Guide A');
    await fixture.whenStable();
    return fixture;
  }
  it('reports success only after the clipboard write resolves', async () => {
    let resolve!: () => void;
    writeText.mockImplementation(() => new Promise<void>((done) => (resolve = done)));
    const fixture = await render();
    const copy = fixture.componentInstance.copy();
    expect(fixture.componentInstance.status()).toBe('copying');
    expect(writeText).toHaveBeenCalledWith('Prompt A');
    resolve();
    await copy;
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Guide A copied',
    );
  });
  it('keeps the text selectable and reports denied access honestly', async () => {
    writeText.mockRejectedValue(new DOMException('Denied', 'NotAllowedError'));
    const fixture = await render();
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('[role="status"]')?.textContent).toContain('Copy was not allowed');
    const textarea = element.querySelector('textarea')!;
    (element.querySelector('.select-text') as HTMLButtonElement).click();
    expect(textarea.readOnly).toBe(true);
    expect(textarea.value).toBe('Prompt A');
    expect(textarea.selectionStart).toBe(0);
    expect(textarea.selectionEnd).toBe('Prompt A'.length);
  });
  it('handles an unavailable Clipboard API', async () => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined });
    const fixture = await render();
    await fixture.componentInstance.copy();
    await fixture.whenStable();
    expect(fixture.componentInstance.status()).toBe('error');
    expect(fixture.nativeElement.querySelector('textarea').value).toBe('Prompt A');
  });
  it('clears previous success feedback when the prompt changes', async () => {
    const fixture = await render();
    await fixture.componentInstance.copy();
    fixture.componentRef.setInput('text', 'Prompt B');
    await fixture.whenStable();
    expect(fixture.componentInstance.status()).toBe('idle');
    expect(fixture.componentInstance.message()).toBe('');
  });
  it.each(['resolve', 'reject'] as const)(
    'ignores an older copy that later %ss after task switching',
    async (result) => {
      let settle!: () => void;
      writeText.mockImplementation(
        () =>
          new Promise<void>(
            (resolve, reject) =>
              (settle = () => (result === 'resolve' ? resolve() : reject(new Error('Denied')))),
          ),
      );
      const fixture = await render();
      const pending = fixture.componentInstance.copy();
      fixture.componentRef.setInput('text', 'Prompt B');
      await fixture.whenStable();
      settle();
      await pending;
      await fixture.whenStable();
      expect(fixture.componentInstance.status()).toBe('idle');
      expect(fixture.componentInstance.message()).toBe('');
      expect(fixture.nativeElement.querySelector('textarea').value).toBe('Prompt B');
    },
  );
});
