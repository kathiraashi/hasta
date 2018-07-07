import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationHrSettingsComponent } from './designation-hr-settings.component';

describe('DesignationHrSettingsComponent', () => {
  let component: DesignationHrSettingsComponent;
  let fixture: ComponentFixture<DesignationHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
