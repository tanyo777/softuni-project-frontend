import { TestBed } from '@angular/core/testing';

import { IsntloggedGuard } from './isntlogged.guard';

describe('IsntloggedGuard', () => {
  let guard: IsntloggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(IsntloggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
