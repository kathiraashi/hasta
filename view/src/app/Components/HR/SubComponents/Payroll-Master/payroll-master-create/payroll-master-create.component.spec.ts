import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollMasterCreateComponent } from './payroll-master-create.component';

describe('PayrollMasterCreateComponent', () => {
  let component: PayrollMasterCreateComponent;
  let fixture: ComponentFixture<PayrollMasterCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollMasterCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollMasterCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
