import { TestBed } from '@angular/core/testing';

import { ValidateFieldService } from './validate-field.service';

describe('ValidateFieldService', () => {
  let service: ValidateFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
