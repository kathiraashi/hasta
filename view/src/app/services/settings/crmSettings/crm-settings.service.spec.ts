import { TestBed, inject } from '@angular/core/testing';

import { CrmSettingsService } from './crm-settings.service';

describe('CrmSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrmSettingsService]
    });
  });

  it('should be created', inject([CrmSettingsService], (service: CrmSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
