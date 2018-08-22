import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportListComponent } from './attendance-report-list.component';

describe('AttendanceReportListComponent', () => {
  let component: AttendanceReportListComponent;
  let fixture: ComponentFixture<AttendanceReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
