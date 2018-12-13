import { TestBed } from '@angular/core/testing';

import { PeriodService } from './period.service';

describe('PeriodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PeriodService = TestBed.get(PeriodService);
    expect(service).toBeTruthy();
  });
});
