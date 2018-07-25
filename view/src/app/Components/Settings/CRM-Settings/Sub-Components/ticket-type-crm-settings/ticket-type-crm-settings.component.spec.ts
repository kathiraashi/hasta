import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketTypeCrmSettingsComponent } from './ticket-type-crm-settings.component';

describe('TicketTypeCrmSettingsComponent', () => {
  let component: TicketTypeCrmSettingsComponent;
  let fixture: ComponentFixture<TicketTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
