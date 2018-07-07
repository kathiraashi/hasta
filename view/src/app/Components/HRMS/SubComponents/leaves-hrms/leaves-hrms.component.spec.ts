import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesHrmsComponent } from './leaves-hrms.component';

describe('LeavesHrmsComponent', () => {
  let component: LeavesHrmsComponent;
  let fixture: ComponentFixture<LeavesHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavesHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavesHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
