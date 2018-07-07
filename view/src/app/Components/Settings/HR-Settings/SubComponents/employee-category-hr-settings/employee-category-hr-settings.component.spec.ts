import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCategoryHrSettingsComponent } from './employee-category-hr-settings.component';

describe('EmployeeCategoryHrSettingsComponent', () => {
  let component: EmployeeCategoryHrSettingsComponent;
  let fixture: ComponentFixture<EmployeeCategoryHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCategoryHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCategoryHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
