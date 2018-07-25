import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarningsHrSettingsComponent } from './earnings-hr-settings.component';

describe('EarningsHrSettingsComponent', () => {
  let component: EarningsHrSettingsComponent;
  let fixture: ComponentFixture<EarningsHrSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarningsHrSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarningsHrSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
