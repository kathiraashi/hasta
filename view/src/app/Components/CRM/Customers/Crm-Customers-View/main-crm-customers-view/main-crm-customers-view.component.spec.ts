import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCrmCustomersViewComponent } from './main-crm-customers-view.component';

describe('MainCrmCustomersViewComponent', () => {
  let component: MainCrmCustomersViewComponent;
  let fixture: ComponentFixture<MainCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
