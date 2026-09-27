import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { expectCurrentPromptAfterSwitch } from './clipboard-regression.test-helper';

describe('Corrected clipboard regression', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [provideRouter([])] }));
  it('selects A then B and copies B', async () => {
    await expectCurrentPromptAfterSwitch('corrected');
  });
});
