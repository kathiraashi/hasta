import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationProductSettingsComponent } from './configuration-product-settings.component';

describe('ConfigurationProductSettingsComponent', () => {
  let component: ConfigurationProductSettingsComponent;
  let fixture: ComponentFixture<ConfigurationProductSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigurationProductSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurationProductSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
