import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeHrmsSettingsComponent } from './leave-type-hrms-settings.component';

describe('LeaveTypeHrmsSettingsComponent', () => {
  let component: LeaveTypeHrmsSettingsComponent;
  let fixture: ComponentFixture<LeaveTypeHrmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveTypeHrmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveTypeHrmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
