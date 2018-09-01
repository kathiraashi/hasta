import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelScheduleActivityCreateComponent } from './model-schedule-activity-create.component';

describe('ModelScheduleActivityCreateComponent', () => {
  let component: ModelScheduleActivityCreateComponent;
  let fixture: ComponentFixture<ModelScheduleActivityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelScheduleActivityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelScheduleActivityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
