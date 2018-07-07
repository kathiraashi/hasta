import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsCustomerListComponent } from './accounts-customer-list.component';

describe('AccountsCustomerListComponent', () => {
  let component: AccountsCustomerListComponent;
  let fixture: ComponentFixture<AccountsCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
