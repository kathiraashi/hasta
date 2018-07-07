import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OndutyHrmsComponent } from './onduty-hrms.component';

describe('OndutyHrmsComponent', () => {
  let component: OndutyHrmsComponent;
  let fixture: ComponentFixture<OndutyHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OndutyHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OndutyHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
