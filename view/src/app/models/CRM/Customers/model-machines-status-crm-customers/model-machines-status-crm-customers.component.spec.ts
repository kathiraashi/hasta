import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachinesStatusCrmCustomersComponent } from './model-machines-status-crm-customers.component';

describe('ModelMachinesStatusCrmCustomersComponent', () => {
  let component: ModelMachinesStatusCrmCustomersComponent;
  let fixture: ComponentFixture<ModelMachinesStatusCrmCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachinesStatusCrmCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachinesStatusCrmCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
