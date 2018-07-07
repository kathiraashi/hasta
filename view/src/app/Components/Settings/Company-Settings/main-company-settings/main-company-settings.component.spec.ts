import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCompanySettingsComponent } from './main-company-settings.component';

describe('MainCompanySettingsComponent', () => {
  let component: MainCompanySettingsComponent;
  let fixture: ComponentFixture<MainCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
