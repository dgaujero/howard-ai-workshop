// Opt-in teaching test. Intentionally red; excluded from the normal suite.
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { expectCurrentPromptAfterSwitch } from './clipboard-regression.test-helper';

describe('DELIBERATELY FLAWED clipboard example', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));
  it('selects A then B and copies B', async () => {
    await expectCurrentPromptAfterSwitch('flawed');
  });
});
