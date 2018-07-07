import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutCrmCustomersViewComponent } from './about-crm-customers-view.component';

describe('AboutCrmCustomersViewComponent', () => {
  let component: AboutCrmCustomersViewComponent;
  let fixture: ComponentFixture<AboutCrmCustomersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutCrmCustomersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutCrmCustomersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
