import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmInvoiceCreateComponent } from './crm-invoice-create.component';

describe('CrmInvoiceCreateComponent', () => {
  let component: CrmInvoiceCreateComponent;
  let fixture: ComponentFixture<CrmInvoiceCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmInvoiceCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmInvoiceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
