import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTicketsViewComponent } from './crm-tickets-view.component';

describe('CrmTicketsViewComponent', () => {
  let component: CrmTicketsViewComponent;
  let fixture: ComponentFixture<CrmTicketsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmTicketsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmTicketsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
