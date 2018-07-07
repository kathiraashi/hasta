import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPipelinestatusCrmsettingsComponent } from './model-pipelinestatus-crmsettings.component';

describe('ModelPipelinestatusCrmsettingsComponent', () => {
  let component: ModelPipelinestatusCrmsettingsComponent;
  let fixture: ComponentFixture<ModelPipelinestatusCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPipelinestatusCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPipelinestatusCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
