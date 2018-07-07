import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTermsAccountSettingsComponent } from './payment-terms-account-settings.component';

describe('PaymentTermsAccountSettingsComponent', () => {
  let component: PaymentTermsAccountSettingsComponent;
  let fixture: ComponentFixture<PaymentTermsAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentTermsAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentTermsAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
