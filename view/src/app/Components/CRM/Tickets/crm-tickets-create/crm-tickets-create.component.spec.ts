import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTicketsCreateComponent } from './crm-tickets-create.component';

describe('CrmTicketsCreateComponent', () => {
  let component: CrmTicketsCreateComponent;
  let fixture: ComponentFixture<CrmTicketsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmTicketsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmTicketsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
