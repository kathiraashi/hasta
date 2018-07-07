import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomerPaymentsListComponent } from './accounts-customer-payments-list.component';

describe('AccountsCustomerPaymentsListComponent', () => {
  let component: AccountsCustomerPaymentsListComponent;
  let fixture: ComponentFixture<AccountsCustomerPaymentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCustomerPaymentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCustomerPaymentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
