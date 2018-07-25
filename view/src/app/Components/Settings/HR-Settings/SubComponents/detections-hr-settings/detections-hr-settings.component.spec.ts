import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionsHrSettingsComponent } from './detections-hr-settings.component';

describe('DetectionsHrSettingsComponent', () => {
  let component: DetectionsHrSettingsComponent;
  let fixture: ComponentFixture<DetectionsHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionsHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionsHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
