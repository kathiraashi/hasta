import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainAccountSettingsComponent } from './main-account-settings.component';

describe('MainAccountSettingsComponent', () => {
  let component: MainAccountSettingsComponent;
  let fixture: ComponentFixture<MainAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
