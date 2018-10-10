import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeaveTypeHrmsSettingsComponent } from './model-leave-type-hrms-settings.component';

describe('ModelLeaveTypeHrmsSettingsComponent', () => {
  let component: ModelLeaveTypeHrmsSettingsComponent;
  let fixture: ComponentFixture<ModelLeaveTypeHrmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeaveTypeHrmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeaveTypeHrmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
