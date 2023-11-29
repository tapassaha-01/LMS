import { TestBed } from '@angular/core/testing';

import { WfhRequestService } from './wfh-request.service';

describe('WfhRequestService', () => {
  let service: WfhRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WfhRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
