import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyInfoCompanySettingsComponent } from './company-info-company-settings.component';

describe('CompanyInfoCompanySettingsComponent', () => {
  let component: CompanyInfoCompanySettingsComponent;
  let fixture: ComponentFixture<CompanyInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
