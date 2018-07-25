import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHrComponent } from './main-hr.component';

describe('MainHrComponent', () => {
  let component: MainHrComponent;
  let fixture: ComponentFixture<MainHrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
