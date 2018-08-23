import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLogHrComponent } from './attendance-log-hr.component';

describe('AttendanceLogHrComponent', () => {
  let component: AttendanceLogHrComponent;
  let fixture: ComponentFixture<AttendanceLogHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceLogHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceLogHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
