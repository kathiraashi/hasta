import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPayrollHrComponent } from './main-payroll-hr.component';

describe('MainPayrollHrComponent', () => {
  let component: MainPayrollHrComponent;
  let fixture: ComponentFixture<MainPayrollHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPayrollHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPayrollHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
