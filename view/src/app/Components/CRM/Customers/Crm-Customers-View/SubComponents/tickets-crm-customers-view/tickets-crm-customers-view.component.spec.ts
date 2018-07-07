import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsCrmCustomersViewComponent } from './tickets-crm-customers-view.component';

describe('TicketsCrmCustomersViewComponent', () => {
  let component: TicketsCrmCustomersViewComponent;
  let fixture: ComponentFixture<TicketsCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketsCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketsCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
