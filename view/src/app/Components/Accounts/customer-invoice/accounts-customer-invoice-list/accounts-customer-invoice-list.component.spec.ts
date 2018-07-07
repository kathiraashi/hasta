import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomerInvoiceListComponent } from './accounts-customer-invoice-list.component';

describe('AccountsCustomerInvoiceListComponent', () => {
  let component: AccountsCustomerInvoiceListComponent;
  let fixture: ComponentFixture<AccountsCustomerInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCustomerInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCustomerInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
