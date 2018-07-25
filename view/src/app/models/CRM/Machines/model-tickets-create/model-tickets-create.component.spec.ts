import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTicketsCreateComponent } from './model-tickets-create.component';

describe('ModelTicketsCreateComponent', () => {
  let component: ModelTicketsCreateComponent;
  let fixture: ComponentFixture<ModelTicketsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTicketsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTicketsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
