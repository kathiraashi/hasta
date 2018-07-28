import { TestBed, inject } from '@angular/core/testing';

import { HrmsSettingsService } from './hrms-settings.service';

describe('HrmsSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrmsSettingsService]
    });
  });

  it('should be created', inject([HrmsSettingsService], (service: HrmsSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
