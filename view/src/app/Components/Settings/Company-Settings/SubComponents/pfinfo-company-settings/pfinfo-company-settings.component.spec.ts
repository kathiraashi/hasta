import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PFInfoCompanySettingsComponent } from './pfinfo-company-settings.component';

describe('PFInfoCompanySettingsComponent', () => {
  let component: PFInfoCompanySettingsComponent;
  let fixture: ComponentFixture<PFInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PFInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PFInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
