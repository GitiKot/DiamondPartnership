import { TestBed } from '@angular/core/testing';

import { seriousnessService } from './seriousness.service';

describe('SeriousnessService', () => {
  let service: seriousnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(seriousnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
