import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOnDutyComponent } from './list-on-duty.component';

describe('ListOnDutyComponent', () => {
  let component: ListOnDutyComponent;
  let fixture: ComponentFixture<ListOnDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOnDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOnDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
