import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReportViewComponent } from './attendance-report-view.component';

describe('AttendanceReportViewComponent', () => {
  let component: AttendanceReportViewComponent;
  let fixture: ComponentFixture<AttendanceReportViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceReportViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceReportViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
