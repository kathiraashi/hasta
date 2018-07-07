import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelOndutyHrmsComponent } from './model-onduty-hrms.component';

describe('ModelOndutyHrmsComponent', () => {
  let component: ModelOndutyHrmsComponent;
  let fixture: ComponentFixture<ModelOndutyHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelOndutyHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelOndutyHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
