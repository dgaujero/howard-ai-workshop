import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';
import { TASK_GUIDES } from './data/guides';
import { DEMO_PROMPTS } from './data/demo-prompts';
import { RESOURCES, LIVE_WORKSHOP_URL, REPOSITORY_URL } from './data/resources';

describe('Field Guide starter', () => {
  let fixture: ComponentFixture<App>;
  let page: HTMLElement;
  let router: Router;

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
    const guides = Array.from(page.querySelectorAll('details'));
    expect(guides.map((guide) => guide.id)).toEqual([
      'guide-understand',
      'guide-build',
      'guide-debug',
      'guide-review',
      'guide-deploy',
    ]);
    expect(guides.map((guide) => guide.open)).toEqual([true, false, false, false, false]);
  });

  it('renders every guide’s complete prepared content and exact selectable prompt', () => {
    for (const guide of TASK_GUIDES) {
      const section = page.querySelector('#guide-' + guide.id)!;
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
  });

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
    expect(page.querySelectorAll('details')).toHaveLength(5);
  });
});
