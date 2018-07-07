import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankAccountSettingsComponent } from './bank-account-settings.component';

describe('BankAccountSettingsComponent', () => {
  let component: BankAccountSettingsComponent;
  let fixture: ComponentFixture<BankAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
