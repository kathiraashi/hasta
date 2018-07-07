import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBranchCompanysettingsComponent } from './model-branch-companysettings.component';

describe('ModelBranchCompanysettingsComponent', () => {
  let component: ModelBranchCompanysettingsComponent;
  let fixture: ComponentFixture<ModelBranchCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelBranchCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBranchCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
