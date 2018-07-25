import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAttendanceLogCreateComponent } from './model-attendance-log-create.component';

describe('ModelAttendanceLogCreateComponent', () => {
  let component: ModelAttendanceLogCreateComponent;
  let fixture: ComponentFixture<ModelAttendanceLogCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAttendanceLogCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAttendanceLogCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
