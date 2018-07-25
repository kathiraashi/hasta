import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAttendanceReportCreateComponent } from './model-attendance-report-create.component';

describe('ModelAttendanceReportCreateComponent', () => {
  let component: ModelAttendanceReportCreateComponent;
  let fixture: ComponentFixture<ModelAttendanceReportCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAttendanceReportCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAttendanceReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
