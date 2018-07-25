import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTicketsActivityCreateComponent } from './model-tickets-activity-create.component';

describe('ModelTicketsActivityCreateComponent', () => {
  let component: ModelTicketsActivityCreateComponent;
  let fixture: ComponentFixture<ModelTicketsActivityCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTicketsActivityCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTicketsActivityCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
