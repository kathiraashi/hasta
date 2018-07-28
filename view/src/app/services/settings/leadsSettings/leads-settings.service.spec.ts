import { TestBed, inject } from '@angular/core/testing';

import { LeadsSettingsService } from './leads-settings.service';

describe('LeadsSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LeadsSettingsService]
    });
  });

  it('should be created', inject([LeadsSettingsService], (service: LeadsSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
