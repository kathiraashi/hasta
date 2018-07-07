import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomerInvoiceViewComponent } from './accounts-customer-invoice-view.component';

describe('AccountsCustomerInvoiceViewComponent', () => {
  let component: AccountsCustomerInvoiceViewComponent;
  let fixture: ComponentFixture<AccountsCustomerInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCustomerInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCustomerInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
