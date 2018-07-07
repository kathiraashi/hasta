import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCrmCustomersViewComponent } from './activity-crm-customers-view.component';

describe('ActivityCrmCustomersViewComponent', () => {
  let component: ActivityCrmCustomersViewComponent;
  let fixture: ComponentFixture<ActivityCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
