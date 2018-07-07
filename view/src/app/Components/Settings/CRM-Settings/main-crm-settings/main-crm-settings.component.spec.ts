import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCrmSettingsComponent } from './main-crm-settings.component';

describe('MainCrmSettingsComponent', () => {
  let component: MainCrmSettingsComponent;
  let fixture: ComponentFixture<MainCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
