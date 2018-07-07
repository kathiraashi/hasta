import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ESIInfoCompanySettingsComponent } from './esiinfo-company-settings.component';

describe('ESIInfoCompanySettingsComponent', () => {
  let component: ESIInfoCompanySettingsComponent;
  let fixture: ComponentFixture<ESIInfoCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ESIInfoCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ESIInfoCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
