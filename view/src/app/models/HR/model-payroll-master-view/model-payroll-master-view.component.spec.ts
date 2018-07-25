import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPayrollMasterViewComponent } from './model-payroll-master-view.component';

describe('ModelPayrollMasterViewComponent', () => {
  let component: ModelPayrollMasterViewComponent;
  let fixture: ComponentFixture<ModelPayrollMasterViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPayrollMasterViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPayrollMasterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
