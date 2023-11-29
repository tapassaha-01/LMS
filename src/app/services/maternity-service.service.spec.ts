import { TestBed } from '@angular/core/testing';

import { MaternityServiceService } from './maternity-service.service';

describe('MaternityServiceService', () => {
  let service: MaternityServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaternityServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
