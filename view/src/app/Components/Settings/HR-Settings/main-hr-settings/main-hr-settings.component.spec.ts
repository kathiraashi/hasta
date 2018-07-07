import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHrSettingsComponent } from './main-hr-settings.component';

describe('MainHrSettingsComponent', () => {
  let component: MainHrSettingsComponent;
  let fixture: ComponentFixture<MainHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
