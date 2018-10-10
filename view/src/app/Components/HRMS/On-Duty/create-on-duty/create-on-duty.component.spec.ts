import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnDutyComponent } from './create-on-duty.component';

describe('CreateOnDutyComponent', () => {
  let component: CreateOnDutyComponent;
  let fixture: ComponentFixture<CreateOnDutyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOnDutyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOnDutyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
