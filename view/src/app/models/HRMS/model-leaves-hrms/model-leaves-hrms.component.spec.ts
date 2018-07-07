import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeavesHrmsComponent } from './model-leaves-hrms.component';

describe('ModelLeavesHrmsComponent', () => {
  let component: ModelLeavesHrmsComponent;
  let fixture: ComponentFixture<ModelLeavesHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeavesHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeavesHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
