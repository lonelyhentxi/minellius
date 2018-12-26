import { TestBed } from '@angular/core/testing';

import { CurrentService } from './current.service';

describe('CurrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentService = TestBed.get(CurrentService);
    expect(service).toBeTruthy();
  });
});
