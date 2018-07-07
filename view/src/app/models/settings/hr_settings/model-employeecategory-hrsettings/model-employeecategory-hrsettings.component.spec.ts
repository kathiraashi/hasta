import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEmployeecategoryHrsettingsComponent } from './model-employeecategory-hrsettings.component';

describe('ModelEmployeecategoryHrsettingsComponent', () => {
  let component: ModelEmployeecategoryHrsettingsComponent;
  let fixture: ComponentFixture<ModelEmployeecategoryHrsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEmployeecategoryHrsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEmployeecategoryHrsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
