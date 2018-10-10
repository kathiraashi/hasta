import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeavesComponent } from './edit-leaves.component';

describe('EditLeavesComponent', () => {
  let component: EditLeavesComponent;
  let fixture: ComponentFixture<EditLeavesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLeavesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
