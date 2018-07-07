import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceHrmsComponent } from './advance-hrms.component';

describe('AdvanceHrmsComponent', () => {
  let component: AdvanceHrmsComponent;
  let fixture: ComponentFixture<AdvanceHrmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceHrmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceHrmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
