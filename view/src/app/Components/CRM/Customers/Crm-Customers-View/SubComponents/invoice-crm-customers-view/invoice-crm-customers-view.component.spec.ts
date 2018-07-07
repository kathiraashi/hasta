import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceCrmCustomersViewComponent } from './invoice-crm-customers-view.component';

describe('InvoiceCrmCustomersViewComponent', () => {
  let component: InvoiceCrmCustomersViewComponent;
  let fixture: ComponentFixture<InvoiceCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
