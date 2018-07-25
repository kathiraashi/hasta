import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContactCrmCustomersViewComponent } from './model-contact-crm-customers-view.component';

describe('ModelContactCrmCustomersViewComponent', () => {
  let component: ModelContactCrmCustomersViewComponent;
  let fixture: ComponentFixture<ModelContactCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContactCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContactCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
