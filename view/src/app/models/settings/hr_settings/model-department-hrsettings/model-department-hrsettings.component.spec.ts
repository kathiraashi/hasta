import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDepartmentHrsettingsComponent } from './model-department-hrsettings.component';

describe('ModelDepartmentHrsettingsComponent', () => {
  let component: ModelDepartmentHrsettingsComponent;
  let fixture: ComponentFixture<ModelDepartmentHrsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDepartmentHrsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDepartmentHrsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
