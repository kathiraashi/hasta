import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPayrollMasterHrComponent } from './main-payroll-master-hr.component';

describe('MainPayrollMasterHrComponent', () => {
  let component: MainPayrollMasterHrComponent;
  let fixture: ComponentFixture<MainPayrollMasterHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPayrollMasterHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPayrollMasterHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
