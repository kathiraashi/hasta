import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxesAccountSettingsComponent } from './taxes-account-settings.component';

describe('TaxesAccountSettingsComponent', () => {
  let component: TaxesAccountSettingsComponent;
  let fixture: ComponentFixture<TaxesAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxesAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxesAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
