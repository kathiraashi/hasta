import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPriorityTypeCrmSettingsComponent } from './activity-priority-type-crm-settings.component';

describe('ActivityPriorityTypeCrmSettingsComponent', () => {
  let component: ActivityPriorityTypeCrmSettingsComponent;
  let fixture: ComponentFixture<ActivityPriorityTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPriorityTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPriorityTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
