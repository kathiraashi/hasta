import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHrmsComponentsComponent } from './main-hrms-components.component';

describe('MainHrmsComponentsComponent', () => {
  let component: MainHrmsComponentsComponent;
  let fixture: ComponentFixture<MainHrmsComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHrmsComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHrmsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
