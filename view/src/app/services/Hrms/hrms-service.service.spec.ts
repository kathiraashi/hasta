import { TestBed, inject } from '@angular/core/testing';

import { HrmsServiceService } from './hrms-service.service';

describe('HrmsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrmsServiceService]
    });
  });

  it('should be created', inject([HrmsServiceService], (service: HrmsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
