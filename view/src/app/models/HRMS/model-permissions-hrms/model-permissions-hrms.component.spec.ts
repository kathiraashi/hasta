import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPermissionsHrmsComponent } from './model-permissions-hrms.component';

describe('ModelPermissionsHrmsComponent', () => {
  let component: ModelPermissionsHrmsComponent;
  let fixture: ComponentFixture<ModelPermissionsHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPermissionsHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPermissionsHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
