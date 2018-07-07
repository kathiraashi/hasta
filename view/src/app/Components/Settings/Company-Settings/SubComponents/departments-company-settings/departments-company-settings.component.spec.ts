import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsCompanySettingsComponent } from './departments-company-settings.component';

describe('DepartmentsCompanySettingsComponent', () => {
  let component: DepartmentsCompanySettingsComponent;
  let fixture: ComponentFixture<DepartmentsCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
