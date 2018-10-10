import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeavesViewComponent } from './model-leaves-view.component';

describe('ModelLeavesViewComponent', () => {
  let component: ModelLeavesViewComponent;
  let fixture: ComponentFixture<ModelLeavesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeavesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeavesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
