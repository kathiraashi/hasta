import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeTypeAccountSettingsComponent } from './income-type-account-settings.component';

describe('IncomeTypeAccountSettingsComponent', () => {
  let component: IncomeTypeAccountSettingsComponent;
  let fixture: ComponentFixture<IncomeTypeAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeTypeAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeTypeAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
