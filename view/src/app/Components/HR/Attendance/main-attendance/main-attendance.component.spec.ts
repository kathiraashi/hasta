import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAttendanceComponent } from './main-attendance.component';

describe('MainAttendanceComponent', () => {
  let component: MainAttendanceComponent;
  let fixture: ComponentFixture<MainAttendanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAttendanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
