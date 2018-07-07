import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPtinfoCompanysettingsComponent } from './model-ptinfo-companysettings.component';

describe('ModelPtinfoCompanysettingsComponent', () => {
  let component: ModelPtinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelPtinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPtinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPtinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
