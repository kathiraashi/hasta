import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PTInfoCompanySettingsComponent } from './ptinfo-company-settings.component';

describe('PTInfoCompanySettingsComponent', () => {
  let component: PTInfoCompanySettingsComponent;
  let fixture: ComponentFixture<PTInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PTInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PTInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
