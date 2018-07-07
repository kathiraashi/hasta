import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentsViewComponent } from './vendor-payments-view.component';

describe('VendorPaymentsViewComponent', () => {
  let component: VendorPaymentsViewComponent;
  let fixture: ComponentFixture<VendorPaymentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
