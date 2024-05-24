import { TestBed } from '@angular/core/testing';

import { PasswordChangedGuard } from './password-changed.guard';

describe('PasswordChangedGuard', () => {
  let guard: PasswordChangedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordChangedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
