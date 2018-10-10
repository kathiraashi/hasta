import { TestBed, inject } from '@angular/core/testing';

import { HrmsSettingsServiceService } from './hrms-settings-service.service';

describe('HrmsSettingsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrmsSettingsServiceService]
    });
  });

  it('should be created', inject([HrmsSettingsServiceService], (service: HrmsSettingsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
