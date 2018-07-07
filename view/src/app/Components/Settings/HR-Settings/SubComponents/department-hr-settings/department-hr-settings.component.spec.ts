import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentHrSettingsComponent } from './department-hr-settings.component';

describe('DepartmentHrSettingsComponent', () => {
  let component: DepartmentHrSettingsComponent;
  let fixture: ComponentFixture<DepartmentHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
