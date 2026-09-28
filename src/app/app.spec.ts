import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { TASK_GUIDES } from './data/guides';
import { DEMO_PROMPTS } from './data/demo-prompts';
import { RESOURCES, LIVE_WORKSHOP_URL, REPOSITORY_URL } from './data/resources';
import { vi } from 'vitest';

describe('Field Guide starter', () => {
  let fixture: ComponentFixture<App>;
  let page: HTMLElement;
  let router: Router;
  const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

  afterEach(() => {
    if (clipboardDescriptor) {
      Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
    } else {
      Reflect.deleteProperty(navigator, 'clipboard');
    }
  });

  async function selectTask(id: string): Promise<void> {
    const select = page.querySelector<HTMLSelectElement>('#engineering-task')!;
    select.value = id;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await fixture.whenStable();
  }

  function mockClipboard(writeText: ReturnType<typeof vi.fn> | undefined): void {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: writeText ? { writeText } : undefined,
    });
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
    fixture = TestBed.createComponent(App);
    router = TestBed.inject(Router);
    await router.navigateByUrl('/');
    await fixture.whenStable();
    page = fixture.nativeElement;
  });

  it('introduces the Field Guide and makes all five guides available in a fixed order', () => {
    expect(page.querySelector('h1')?.textContent).toBe('AI Engineering Field Guide');
    const footer = page.querySelector('.site-footer');
    expect(footer?.textContent).toContain('Prepared by Deion Aujero');
    expect(footer?.textContent).toContain('Howard University guest lecture');
    const choices = Array.from(page.querySelectorAll<HTMLOptionElement>('select option'));
    expect(choices.map((choice) => choice.value)).toEqual([
      '',
      'understand',
      'build',
      'debug',
      'review',
      'deploy',
    ]);
    expect(choices.slice(1).map((choice) => choice.textContent?.trim())).toEqual(
      TASK_GUIDES.map((guide) => guide.title),
    );
    expect(page.querySelector<HTMLSelectElement>('select')!.value).toBe('');
    expect(page.querySelector('label[for="engineering-task"]')?.textContent).toContain(
      'Choose your next step',
    );
    expect(page.querySelector('#task-instruction')?.textContent).toContain(
      'Choose your engineering task',
    );
    expect(page.querySelector('details')).toBeNull();
    expect(page.querySelector('.copy-prompt')).toBeNull();
  });

  it('switches every guide’s complete prepared content and exact selectable prompt together', async () => {
    for (const guide of TASK_GUIDES) {
      await selectTask(guide.id);
      expect(page.querySelectorAll('details')).toHaveLength(1);
      const section = page.querySelector('#guide-' + guide.id)!;
      expect((section as HTMLDetailsElement).open).toBe(true);
      expect(section.querySelector('summary')?.textContent).toContain(guide.title);
      expect(section.textContent).toContain(guide.summary);
      expect(section.textContent).toContain(guide.outcome);
      expect(guide.steps.length).toBeGreaterThan(0);
      expect(guide.context.length).toBeGreaterThan(0);
      expect(guide.checks.length).toBeGreaterThan(0);
      for (const step of guide.steps) {
        expect(section.querySelector('.guide-steps')?.textContent).toContain(step.title);
        expect(section.querySelector('.guide-steps')?.textContent).toContain(step.description);
      }
      expect(
        Array.from(section.querySelectorAll('.guide-context li'), (item) =>
          item.textContent?.trim(),
        ),
      ).toEqual(guide.context);
      expect(
        Array.from(section.querySelectorAll('.guide-checks li'), (item) =>
          item.textContent?.trim(),
        ),
      ).toEqual(guide.checks);
      const prompt = section.querySelector('textarea')!;
      expect(prompt.value).toBe(guide.prompt);
      expect(prompt.readOnly).toBe(true);
      expect(prompt.disabled).toBe(false);
      expect(section.querySelector('label')?.htmlFor).toBe(prompt.id);
    }
    await selectTask('');
    expect(page.querySelector('details')).toBeNull();
    expect(page.querySelector('.copy-prompt')).toBeNull();
  });

  it('copies the current prompt after switching A → B and clears previous success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    mockClipboard(writeText);
    await selectTask('understand');
    page.querySelector<HTMLButtonElement>('.copy-prompt')!.click();
    await fixture.whenStable();
    expect(writeText).toHaveBeenNthCalledWith(1, TASK_GUIDES[0].prompt);
    expect(page.querySelector('[role="status"]')?.textContent).toBe('Prompt copied.');
    await selectTask('build');
    expect(page.querySelector('[role="status"]')?.textContent).toBe('');
    page.querySelector<HTMLButtonElement>('.copy-prompt')!.click();
    await fixture.whenStable();
    expect(writeText).toHaveBeenNthCalledWith(2, TASK_GUIDES[1].prompt);
    expect(writeText).toHaveBeenCalledTimes(2);
    expect(page.querySelector('[role="status"]')?.textContent).toBe('Prompt copied.');
  });

  it('reports success only after clipboard completion and prevents duplicate pending copies', async () => {
    let finish!: () => void;
    const writeText = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    mockClipboard(writeText);
    await selectTask('debug');
    const button = page.querySelector<HTMLButtonElement>('.copy-prompt')!;
    button.click();
    await fixture.whenStable();
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('Copying');
    expect(page.querySelector('[role="status"]')?.textContent).toBe('');
    button.click();
    expect(writeText).toHaveBeenCalledTimes(1);
    finish();
    await writeText.mock.results[0].value;
    await fixture.whenStable();
    expect(button.disabled).toBe(false);
    expect(page.querySelector('[role="status"]')?.textContent).toBe('Prompt copied.');
  });

  it.each(['resolve', 'reject'])(
    'ignores an old task’s pending copy %s after switching',
    async (outcome) => {
      let finish!: () => void;
      const writeText = vi.fn(
        () =>
          new Promise<void>((resolve, reject) => {
            finish = outcome === 'resolve' ? resolve : () => reject(new Error('Denied'));
          }),
      );
      mockClipboard(writeText);
      await selectTask('understand');
      page.querySelector<HTMLButtonElement>('.copy-prompt')!.click();
      await selectTask('build');
      finish();
      await writeText.mock.results[0].value.catch(() => undefined);
      await fixture.whenStable();
      expect(writeText).toHaveBeenCalledWith(TASK_GUIDES[0].prompt);
      expect(page.querySelector<HTMLTextAreaElement>('textarea')!.value).toBe(
        TASK_GUIDES[1].prompt,
      );
      expect(page.querySelector('[role="status"]')?.textContent).toBe('');
      expect(page.querySelector<HTMLButtonElement>('.copy-prompt')!.disabled).toBe(false);
    },
  );

  it.each(['rejected', 'unavailable'])(
    'offers accurate selectable-text fallback when clipboard is %s',
    async (failure) => {
      const writeText = vi.fn().mockRejectedValue(new Error('Denied'));
      mockClipboard(failure === 'rejected' ? writeText : undefined);
      await selectTask('understand');
      await selectTask('review');
      page.querySelector<HTMLButtonElement>('.copy-prompt')!.click();
      await fixture.whenStable();
      const message = page.querySelector('[role="status"]')!.textContent;
      expect(message).toBe(
        'Couldn’t copy automatically. Select the prompt text above and use your device’s copy command.',
      );
      expect(message).not.toContain('Prompt copied.');
      const prompt = page.querySelector<HTMLTextAreaElement>('textarea')!;
      expect(prompt.value).toBe(TASK_GUIDES[3].prompt);
      expect(prompt.readOnly).toBe(true);
      expect(prompt.disabled).toBe(false);
      prompt.focus();
      prompt.select();
      expect(document.activeElement).toBe(prompt);
      expect(prompt.selectionStart).toBe(0);
      expect(prompt.selectionEnd).toBe(prompt.value.length);
      expect(page.querySelector<HTMLButtonElement>('.copy-prompt')!.disabled).toBe(false);
      if (failure === 'rejected') expect(writeText).toHaveBeenCalledWith(TASK_GUIDES[3].prompt);
      await selectTask('deploy');
      expect(page.querySelector('[role="status"]')?.textContent).toBe('');
    },
  );

  it.each([
    ['Task guides', '/', 'AI Engineering Field Guide'],
    ['The workflow', '/workflow', 'The workflow'],
    ['Resources', '/resources', 'Resources'],
    ['Demo prompts', '/prompts', 'Demo prompts'],
  ])(
    'navigates through the %s link and identifies the current page',
    async (label, path, heading) => {
      const link = Array.from(page.querySelectorAll<HTMLAnchorElement>('nav a')).find(
        (item) => item.textContent?.trim() === label,
      )!;
      link.click();
      await fixture.whenStable();
      expect(router.url).toBe(path);
      expect(page.querySelector('h1')?.textContent).toBe(heading);
      expect(page.querySelector('nav a[aria-current="page"]')?.textContent?.trim()).toBe(label);
    },
  );

  it('provides resource descriptions, access notes, classroom links, and an honest slides placeholder', async () => {
    await router.navigateByUrl('/resources');
    await fixture.whenStable();
    for (const resource of RESOURCES) {
      const item = Array.from(page.querySelectorAll('.resource-list li')).find(
        (node) => node.querySelector('a')?.getAttribute('href') === resource.href,
      )!;
      expect(item).toBeDefined();
      expect(item.textContent).toContain(resource.description);
      expect(item.textContent).toContain(resource.access);
    }
    expect(page.querySelector('main a[href="' + LIVE_WORKSHOP_URL + '"]')).not.toBeNull();
    expect(page.querySelector('main a[href="' + REPOSITORY_URL + '"]')).not.toBeNull();
    expect(page.textContent).toContain('Coming soon');
    expect(page.textContent).not.toContain('Open the slide deck');
    expect(page.textContent).toContain('dist/howard-ai-workshop/browser');
  });

  it('provides all six lecture prompts as labeled, readonly text', async () => {
    await router.navigateByUrl('/prompts');
    await fixture.whenStable();
    const prompts = Array.from(page.querySelectorAll('textarea'));
    expect(prompts).toHaveLength(6);
    expect(page.querySelector('.copy-prompt')).toBeNull();
    expect(prompts.map((prompt) => prompt.value)).toEqual(
      DEMO_PROMPTS.map((prompt) => prompt.text),
    );
    for (const prompt of prompts) {
      expect(prompt.readOnly).toBe(true);
      expect(page.querySelector('label[for="' + prompt.id + '"]')).not.toBeNull();
    }
  });

  it('recovers from an unknown page through the task-guides link', async () => {
    await router.navigateByUrl('/missing');
    await fixture.whenStable();
    expect(page.querySelector('h1')?.textContent).toBe('That page isn’t in the guide.');
    page.querySelector<HTMLAnchorElement>('main a')!.click();
    await fixture.whenStable();
    expect(router.url).toBe('/');
    expect(page.querySelectorAll('select option')).toHaveLength(6);
    expect(page.querySelector<HTMLSelectElement>('select')!.value).toBe('');
  });
});
