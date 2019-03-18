import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketActivitiesEditComponent } from './ticket-activities-edit.component';

describe('TicketActivitiesEditComponent', () => {
  let component: TicketActivitiesEditComponent;
  let fixture: ComponentFixture<TicketActivitiesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketActivitiesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketActivitiesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
