import { TestBed, inject } from '@angular/core/testing';

import { HrService } from './hr.service';

describe('HrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrService]
    });
  });

  it('should be created', inject([HrService], (service: HrService) => {
    expect(service).toBeTruthy();
  }));
});
