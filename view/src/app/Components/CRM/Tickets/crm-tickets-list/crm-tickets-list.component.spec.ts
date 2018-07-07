import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTicketsListComponent } from './crm-tickets-list.component';

describe('CrmTicketsListComponent', () => {
  let component: CrmTicketsListComponent;
  let fixture: ComponentFixture<CrmTicketsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmTicketsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
