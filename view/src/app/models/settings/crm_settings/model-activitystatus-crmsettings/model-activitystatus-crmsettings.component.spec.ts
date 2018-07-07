import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActivitystatusCrmsettingsComponent } from './model-activitystatus-crmsettings.component';

describe('ModelActivitystatusCrmsettingsComponent', () => {
  let component: ModelActivitystatusCrmsettingsComponent;
  let fixture: ComponentFixture<ModelActivitystatusCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelActivitystatusCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActivitystatusCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
