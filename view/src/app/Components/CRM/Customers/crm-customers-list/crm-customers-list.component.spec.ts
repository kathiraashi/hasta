import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCustomersListComponent } from './crm-customers-list.component';

describe('CrmCustomersListComponent', () => {
  let component: CrmCustomersListComponent;
  let fixture: ComponentFixture<CrmCustomersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCustomersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
