import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorPaymentsCreateComponent } from './vendor-payments-create.component';

describe('VendorPaymentsCreateComponent', () => {
  let component: VendorPaymentsCreateComponent;
  let fixture: ComponentFixture<VendorPaymentsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorPaymentsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorPaymentsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
