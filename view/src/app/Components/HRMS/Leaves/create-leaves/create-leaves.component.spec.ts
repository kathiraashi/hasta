import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeavesComponent } from './create-leaves.component';

describe('CreateLeavesComponent', () => {
  let component: CreateLeavesComponent;
  let fixture: ComponentFixture<CreateLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
