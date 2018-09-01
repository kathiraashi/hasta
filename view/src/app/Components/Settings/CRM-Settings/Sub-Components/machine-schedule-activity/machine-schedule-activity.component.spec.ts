import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineScheduleActivityComponent } from './machine-schedule-activity.component';

describe('MachineScheduleActivityComponent', () => {
  let component: MachineScheduleActivityComponent;
  let fixture: ComponentFixture<MachineScheduleActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineScheduleActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineScheduleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
