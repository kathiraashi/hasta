import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPaymentsCreateComponent } from './customer-payments-create.component';

describe('CustomerPaymentsCreateComponent', () => {
  let component: CustomerPaymentsCreateComponent;
  let fixture: ComponentFixture<CustomerPaymentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerPaymentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPaymentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
