import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOndutyViewComponent } from './model-onduty-view.component';

describe('ModelOndutyViewComponent', () => {
  let component: ModelOndutyViewComponent;
  let fixture: ComponentFixture<ModelOndutyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOndutyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOndutyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
