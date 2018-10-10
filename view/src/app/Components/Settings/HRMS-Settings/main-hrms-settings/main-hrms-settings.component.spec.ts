import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHrmsSettingsComponent } from './main-hrms-settings.component';

describe('MainHrmsSettingsComponent', () => {
  let component: MainHrmsSettingsComponent;
  let fixture: ComponentFixture<MainHrmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHrmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHrmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
