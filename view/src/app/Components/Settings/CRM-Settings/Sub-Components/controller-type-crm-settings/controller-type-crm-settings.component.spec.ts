import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerTypeCrmSettingsComponent } from './controller-type-crm-settings.component';

describe('ControllerTypeCrmSettingsComponent', () => {
  let component: ControllerTypeCrmSettingsComponent;
  let fixture: ComponentFixture<ControllerTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
