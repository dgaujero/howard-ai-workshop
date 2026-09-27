import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, withComponentInputBinding } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

describe('Field Guide navigation', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes, withComponentInputBinding())],
    }).compileComponents();
  });
  it('keeps guest-lecture attribution and provides working resource navigation', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/resources');
    await fixture.whenStable();
    const page: HTMLElement = fixture.nativeElement;
    expect(page.textContent).toContain('Deion Aujero');
    expect(page.textContent).toContain('Howard University students');
    expect(page.querySelector('nav a[aria-current="page"]')?.textContent).toBe('Resources');
    expect(page.textContent).toContain('Coming soon');
    expect(page.querySelector('a[href="https://howard-ai-workshop.vercel.app/"]')).not.toBeNull();
  });
  it('uses a clearly labeled corrected checkpoint without enabling the flawed behavior', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/rehearsal/copy-fixed');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Corrected example');
    expect(fixture.nativeElement.textContent).not.toContain('Deliberately flawed example');
  });
  it('offers recovery for unknown routes', async () => {
    const fixture = TestBed.createComponent(App);
    await TestBed.inject(Router).navigateByUrl('/missing');
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('isn’t in the guide');
  });
});
