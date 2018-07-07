import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTypeCrmSettingsComponent } from './activity-type-crm-settings.component';

describe('ActivityTypeCrmSettingsComponent', () => {
  let component: ActivityTypeCrmSettingsComponent;
  let fixture: ComponentFixture<ActivityTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
