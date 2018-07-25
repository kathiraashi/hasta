import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelInvoicesCrmCustomersComponent } from './model-invoices-crm-customers.component';

describe('ModelInvoicesCrmCustomersComponent', () => {
  let component: ModelInvoicesCrmCustomersComponent;
  let fixture: ComponentFixture<ModelInvoicesCrmCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelInvoicesCrmCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelInvoicesCrmCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
