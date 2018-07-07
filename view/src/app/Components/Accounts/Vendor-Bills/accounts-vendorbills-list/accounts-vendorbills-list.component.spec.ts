import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsVendorbillsListComponent } from './accounts-vendorbills-list.component';

describe('AccountsVendorbillsListComponent', () => {
  let component: AccountsVendorbillsListComponent;
  let fixture: ComponentFixture<AccountsVendorbillsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsVendorbillsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsVendorbillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
