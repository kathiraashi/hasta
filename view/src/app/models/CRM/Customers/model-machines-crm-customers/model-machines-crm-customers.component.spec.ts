import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachinesCrmCustomersComponent } from './model-machines-crm-customers.component';

describe('ModelMachinesCrmCustomersComponent', () => {
  let component: ModelMachinesCrmCustomersComponent;
  let fixture: ComponentFixture<ModelMachinesCrmCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachinesCrmCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachinesCrmCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
