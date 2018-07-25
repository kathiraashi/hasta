import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDetectionsHrsettingsComponent } from './model-detections-hrsettings.component';

describe('ModelDetectionsHrsettingsComponent', () => {
  let component: ModelDetectionsHrsettingsComponent;
  let fixture: ComponentFixture<ModelDetectionsHrsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDetectionsHrsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDetectionsHrsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
