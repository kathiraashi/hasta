import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCrmCustomersViewComponent } from './contact-crm-customers-view.component';

describe('ContactCrmCustomersViewComponent', () => {
  let component: ContactCrmCustomersViewComponent;
  let fixture: ComponentFixture<ContactCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
