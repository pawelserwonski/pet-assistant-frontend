import { TestBed, async, inject } from '@angular/core/testing';

import { LoggedOffGuard } from './logged-off.guard';

describe('LoggedOffGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggedOffGuard]
    });
  });

  it('should ...', inject([LoggedOffGuard], (guard: LoggedOffGuard) => {
    expect(guard).toBeTruthy();
  }));
});
