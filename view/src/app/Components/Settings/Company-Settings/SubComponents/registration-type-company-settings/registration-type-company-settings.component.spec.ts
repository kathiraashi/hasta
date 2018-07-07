import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationTypeCompanySettingsComponent } from './registration-type-company-settings.component';

describe('RegistrationTypeCompanySettingsComponent', () => {
  let component: RegistrationTypeCompanySettingsComponent;
  let fixture: ComponentFixture<RegistrationTypeCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationTypeCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationTypeCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
