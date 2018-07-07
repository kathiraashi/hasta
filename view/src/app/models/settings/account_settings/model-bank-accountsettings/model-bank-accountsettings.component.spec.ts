import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBankAccountsettingsComponent } from './model-bank-accountsettings.component';

describe('ModelBankAccountsettingsComponent', () => {
  let component: ModelBankAccountsettingsComponent;
  let fixture: ComponentFixture<ModelBankAccountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBankAccountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBankAccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
