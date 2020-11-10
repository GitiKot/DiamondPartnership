import { TestBed } from '@angular/core/testing';

import { SeriousnessService } from './seriousness.service';

describe('SeriousnessService', () => {
  let service: SeriousnessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeriousnessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
