import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsVendorListComponent } from './accounts-vendor-list.component';

describe('AccountsVendorListComponent', () => {
  let component: AccountsVendorListComponent;
  let fixture: ComponentFixture<AccountsVendorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsVendorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsVendorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
