import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItInfoCompanySettingsComponent } from './it-info-company-settings.component';

describe('ItInfoCompanySettingsComponent', () => {
  let component: ItInfoCompanySettingsComponent;
  let fixture: ComponentFixture<ItInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
