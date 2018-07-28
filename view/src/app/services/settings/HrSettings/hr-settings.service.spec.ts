import { TestBed, inject } from '@angular/core/testing';

import { HrSettingsService } from './hr-settings.service';

describe('HrSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HrSettingsService]
    });
  });

  it('should be created', inject([HrSettingsService], (service: HrSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
