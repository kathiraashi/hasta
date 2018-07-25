import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainEmployeesHrComponent } from './main-employees-hr.component';

describe('MainEmployeesHrComponent', () => {
  let component: MainEmployeesHrComponent;
  let fixture: ComponentFixture<MainEmployeesHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainEmployeesHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainEmployeesHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
