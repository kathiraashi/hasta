import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomerPaymentsViewComponent } from './accounts-customer-payments-view.component';

describe('AccountsCustomerPaymentsViewComponent', () => {
  let component: AccountsCustomerPaymentsViewComponent;
  let fixture: ComponentFixture<AccountsCustomerPaymentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCustomerPaymentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCustomerPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
