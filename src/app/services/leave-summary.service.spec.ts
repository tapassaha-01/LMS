import { TestBed } from '@angular/core/testing';

import { LeaveSummaryService } from './leave-summary.service';

describe('LeaveSummaryService', () => {
  let service: LeaveSummaryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveSummaryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
