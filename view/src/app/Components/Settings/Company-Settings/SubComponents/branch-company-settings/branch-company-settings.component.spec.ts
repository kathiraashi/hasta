import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchCompanySettingsComponent } from './branch-company-settings.component';

describe('BranchCompanySettingsComponent', () => {
  let component: BranchCompanySettingsComponent;
  let fixture: ComponentFixture<BranchCompanySettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchCompanySettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
