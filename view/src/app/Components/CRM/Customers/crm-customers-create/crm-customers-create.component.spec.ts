import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmCustomersCreateComponent } from './crm-customers-create.component';

describe('CrmCustomersCreateComponent', () => {
  let component: CrmCustomersCreateComponent;
  let fixture: ComponentFixture<CrmCustomersCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrmCustomersCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrmCustomersCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
