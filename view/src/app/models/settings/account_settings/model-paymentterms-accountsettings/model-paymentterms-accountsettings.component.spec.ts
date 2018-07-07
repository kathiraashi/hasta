import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPaymenttermsAccountsettingsComponent } from './model-paymentterms-accountsettings.component';

describe('ModelPaymenttermsAccountsettingsComponent', () => {
  let component: ModelPaymenttermsAccountsettingsComponent;
  let fixture: ComponentFixture<ModelPaymenttermsAccountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPaymenttermsAccountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPaymenttermsAccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
