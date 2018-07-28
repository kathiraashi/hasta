import { TestBed, inject } from '@angular/core/testing';

import { PermissionsCheckService } from './permissions-check.service';

describe('PermissionsCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PermissionsCheckService]
    });
  });

  it('should be created', inject([PermissionsCheckService], (service: PermissionsCheckService) => {
    expect(service).toBeTruthy();
  }));
});
