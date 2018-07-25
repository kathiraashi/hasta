import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollViewComponent } from './payroll-view.component';

describe('PayrollViewComponent', () => {
  let component: PayrollViewComponent;
  let fixture: ComponentFixture<PayrollViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayrollViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayrollViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
