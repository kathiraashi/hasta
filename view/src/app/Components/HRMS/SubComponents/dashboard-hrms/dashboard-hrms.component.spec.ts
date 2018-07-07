import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHrmsComponent } from './dashboard-hrms.component';

describe('DashboardHrmsComponent', () => {
  let component: DashboardHrmsComponent;
  let fixture: ComponentFixture<DashboardHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
