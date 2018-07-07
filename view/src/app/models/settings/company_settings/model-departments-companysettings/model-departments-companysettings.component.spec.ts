import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDepartmentsCompanysettingsComponent } from './model-departments-companysettings.component';

describe('ModelDepartmentsCompanysettingsComponent', () => {
  let component: ModelDepartmentsCompanysettingsComponent;
  let fixture: ComponentFixture<ModelDepartmentsCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDepartmentsCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDepartmentsCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
