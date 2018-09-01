import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachineMaintenancePartCrmsettingsComponent } from './model-machine-maintenance-part-crmsettings.component';

describe('ModelMachineMaintenancePartCrmsettingsComponent', () => {
  let component: ModelMachineMaintenancePartCrmsettingsComponent;
  let fixture: ComponentFixture<ModelMachineMaintenancePartCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachineMaintenancePartCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachineMaintenancePartCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
