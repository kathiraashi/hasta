import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainProductSettingsComponent } from './main-product-settings.component';

describe('MainProductSettingsComponent', () => {
  let component: MainProductSettingsComponent;
  let fixture: ComponentFixture<MainProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainProductSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainProductSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
