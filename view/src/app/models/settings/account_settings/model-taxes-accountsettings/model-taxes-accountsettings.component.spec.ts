import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTaxesAccountsettingsComponent } from './model-taxes-accountsettings.component';

describe('ModelTaxesAccountsettingsComponent', () => {
  let component: ModelTaxesAccountsettingsComponent;
  let fixture: ComponentFixture<ModelTaxesAccountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTaxesAccountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTaxesAccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
