import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeCrmSettingsComponent } from './account-type-crm-settings.component';

describe('AccountTypeCrmSettingsComponent', () => {
  let component: AccountTypeCrmSettingsComponent;
  let fixture: ComponentFixture<AccountTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
