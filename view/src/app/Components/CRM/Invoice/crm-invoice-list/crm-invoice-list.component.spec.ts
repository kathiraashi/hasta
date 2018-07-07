import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmInvoiceListComponent } from './crm-invoice-list.component';

describe('CrmInvoiceListComponent', () => {
  let component: CrmInvoiceListComponent;
  let fixture: ComponentFixture<CrmInvoiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmInvoiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmInvoiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
