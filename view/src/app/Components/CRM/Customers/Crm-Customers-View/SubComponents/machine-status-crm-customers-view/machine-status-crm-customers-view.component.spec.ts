import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineStatusCrmCustomersViewComponent } from './machine-status-crm-customers-view.component';

describe('MachineStatusCrmCustomersViewComponent', () => {
  let component: MachineStatusCrmCustomersViewComponent;
  let fixture: ComponentFixture<MachineStatusCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineStatusCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineStatusCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
