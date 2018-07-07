import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationInfoCompanySettingsComponent } from './registration-info-company-settings.component';

describe('RegistrationInfoCompanySettingsComponent', () => {
  let component: RegistrationInfoCompanySettingsComponent;
  let fixture: ComponentFixture<RegistrationInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
