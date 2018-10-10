import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPermissionsViewComponent } from './model-permissions-view.component';

describe('ModelPermissionsViewComponent', () => {
  let component: ModelPermissionsViewComponent;
  let fixture: ComponentFixture<ModelPermissionsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPermissionsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPermissionsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
