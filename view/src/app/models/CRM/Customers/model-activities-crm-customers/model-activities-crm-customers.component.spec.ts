import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActivitiesCrmCustomersComponent } from './model-activities-crm-customers.component';

describe('ModelActivitiesCrmCustomersComponent', () => {
  let component: ModelActivitiesCrmCustomersComponent;
  let fixture: ComponentFixture<ModelActivitiesCrmCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelActivitiesCrmCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActivitiesCrmCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
