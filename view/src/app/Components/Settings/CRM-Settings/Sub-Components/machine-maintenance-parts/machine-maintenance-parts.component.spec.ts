import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineMaintenancePartsComponent } from './machine-maintenance-parts.component';

describe('MachineMaintenancePartsComponent', () => {
  let component: MachineMaintenancePartsComponent;
  let fixture: ComponentFixture<MachineMaintenancePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineMaintenancePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineMaintenancePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
