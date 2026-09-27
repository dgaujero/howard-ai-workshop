import { TestBed } from '@angular/core/testing';
import { TASK_GUIDES } from '../data/guides';
import { ClipboardLab } from './clipboard-lab';

/** The identical acceptance assertion is used for the flawed and corrected versions. */
export async function expectCurrentPromptAfterSwitch(mode: 'flawed' | 'corrected') {
  const descriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  try {
    await TestBed.configureTestingModule({
      imports: [ClipboardLab],
      providers: [],
    }).compileComponents();
    const fixture = TestBed.createComponent(ClipboardLab);
    fixture.componentRef.setInput('initialMode', mode);
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    const select = page.querySelector<HTMLSelectElement>('select')!;
    for (const id of ['understand', 'debug']) {
      select.value = id;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      await fixture.whenStable();
    }
    page.querySelector<HTMLButtonElement>('.lab-copy')!.click();
    await fixture.whenStable();
    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText).toHaveBeenCalledWith(
      TASK_GUIDES.find((guide) => guide.id === 'debug')!.prompt,
    );
  } finally {
    if (descriptor) Object.defineProperty(navigator, 'clipboard', descriptor);
    else Reflect.deleteProperty(navigator, 'clipboard');
  }
}
