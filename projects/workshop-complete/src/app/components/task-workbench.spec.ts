import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskWorkbench } from './task-workbench';
import { TASK_GUIDES } from '../data/guides';

describe('TaskWorkbench', () => {
  let fixture: ComponentFixture<TaskWorkbench>;
  let page: HTMLElement;
  let originalClipboard: PropertyDescriptor | undefined;
  const writeText = vi.fn<(text: string) => Promise<void>>();
  beforeEach(async () => {
    originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    writeText.mockReset().mockResolvedValue(undefined);
    await TestBed.configureTestingModule({ imports: [TaskWorkbench] }).compileComponents();
    fixture = TestBed.createComponent(TaskWorkbench);
    await fixture.whenStable();
    page = fixture.nativeElement;
  });
  afterEach(() => {
    if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
    else Reflect.deleteProperty(navigator, 'clipboard');
  });
  async function choose(id: string) {
    const radio = page.querySelector<HTMLInputElement>(`input[value="${id}"]`)!;
    radio.checked = true;
    radio.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
  }
  it('starts unselected with a helpful instruction and no copy control', () => {
    expect(page.querySelectorAll('input[type="radio"]')).toHaveLength(5);
    expect(page.querySelector('input:checked')).toBeNull();
    expect(page.textContent).toContain('Choose a task to open your guide');
    expect(page.querySelector('textarea')).toBeNull();
    expect(page.querySelector('.copy-button')).toBeNull();
  });
  it.each(TASK_GUIDES)('updates all content together for $id', async (guide) => {
    await choose('understand');
    await choose(guide.id);
    const detail = page.querySelector('article')!;
    expect(detail.querySelector('h3')?.textContent).toBe(guide.title);
    expect(detail.querySelector('textarea')?.value).toBe(guide.prompt);
    for (const step of guide.steps) expect(detail.textContent).toContain(step.description);
    for (const context of guide.context) expect(detail.textContent).toContain(context);
    for (const check of guide.checks) expect(detail.textContent).toContain(check);
  });
  it('copies B after selecting A then B', async () => {
    await choose('understand');
    await choose('debug');
    page.querySelector<HTMLButtonElement>('.copy-button')!.click();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText).toHaveBeenCalledWith(
      TASK_GUIDES.find((guide) => guide.id === 'debug')!.prompt,
    );
  });
  it('clears feedback on switching and returns to the initial state on reset', async () => {
    await choose('understand');
    page.querySelector<HTMLButtonElement>('.copy-button')!.click();
    await fixture.whenStable();
    await choose('debug');
    expect(page.querySelector('.copy-feedback')?.textContent?.trim()).toBe('');
    page.querySelector<HTMLButtonElement>('.clear-selection')!.click();
    await fixture.whenStable();
    expect(page.querySelector('input:checked')).toBeNull();
    expect(page.querySelector('textarea')).toBeNull();
  });
});
