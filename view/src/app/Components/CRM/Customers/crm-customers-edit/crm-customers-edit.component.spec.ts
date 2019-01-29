import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCustomersEditComponent } from './crm-customers-edit.component';

describe('CrmCustomersEditComponent', () => {
  let component: CrmCustomersEditComponent;
  let fixture: ComponentFixture<CrmCustomersEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCustomersEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCustomersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
