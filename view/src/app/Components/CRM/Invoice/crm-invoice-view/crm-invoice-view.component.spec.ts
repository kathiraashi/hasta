import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmInvoiceViewComponent } from './crm-invoice-view.component';

describe('CrmInvoiceViewComponent', () => {
  let component: CrmInvoiceViewComponent;
  let fixture: ComponentFixture<CrmInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
