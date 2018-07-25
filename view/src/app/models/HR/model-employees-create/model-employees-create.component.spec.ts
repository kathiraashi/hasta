import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEmployeesCreateComponent } from './model-employees-create.component';

describe('ModelEmployeesCreateComponent', () => {
  let component: ModelEmployeesCreateComponent;
  let fixture: ComponentFixture<ModelEmployeesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEmployeesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEmployeesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
