import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityStatusTypeCrmSettingsComponent } from './activity-status-type-crm-settings.component';

describe('ActivityStatusTypeCrmSettingsComponent', () => {
  let component: ActivityStatusTypeCrmSettingsComponent;
  let fixture: ComponentFixture<ActivityStatusTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityStatusTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityStatusTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
