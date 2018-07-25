import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAttendanceReportHrComponent } from './main-attendance-report-hr.component';

describe('MainAttendanceReportHrComponent', () => {
  let component: MainAttendanceReportHrComponent;
  let fixture: ComponentFixture<MainAttendanceReportHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAttendanceReportHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAttendanceReportHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
