import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoCompanySettingsComponent } from './contact-info-company-settings.component';

describe('ContactInfoCompanySettingsComponent', () => {
  let component: ContactInfoCompanySettingsComponent;
  let fixture: ComponentFixture<ContactInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
