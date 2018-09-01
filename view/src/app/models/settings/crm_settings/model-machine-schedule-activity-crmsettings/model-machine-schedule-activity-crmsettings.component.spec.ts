import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachineScheduleActivityCrmsettingsComponent } from './model-machine-schedule-activity-crmsettings.component';

describe('ModelMachineScheduleActivityCrmsettingsComponent', () => {
  let component: ModelMachineScheduleActivityCrmsettingsComponent;
  let fixture: ComponentFixture<ModelMachineScheduleActivityCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachineScheduleActivityCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachineScheduleActivityCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
