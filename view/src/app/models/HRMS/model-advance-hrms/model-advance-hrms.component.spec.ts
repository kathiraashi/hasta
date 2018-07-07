import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAdvanceHrmsComponent } from './model-advance-hrms.component';

describe('ModelAdvanceHrmsComponent', () => {
  let component: ModelAdvanceHrmsComponent;
  let fixture: ComponentFixture<ModelAdvanceHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAdvanceHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAdvanceHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
