import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetTypeAccountSettingsComponent } from './asset-type-account-settings.component';

describe('AssetTypeAccountSettingsComponent', () => {
  let component: AssetTypeAccountSettingsComponent;
  let fixture: ComponentFixture<AssetTypeAccountSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetTypeAccountSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTypeAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
