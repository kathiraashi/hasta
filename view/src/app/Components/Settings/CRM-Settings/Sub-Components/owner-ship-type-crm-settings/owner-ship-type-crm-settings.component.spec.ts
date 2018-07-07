import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerShipTypeCrmSettingsComponent } from './owner-ship-type-crm-settings.component';

describe('OwnerShipTypeCrmSettingsComponent', () => {
  let component: OwnerShipTypeCrmSettingsComponent;
  let fixture: ComponentFixture<OwnerShipTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerShipTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerShipTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
