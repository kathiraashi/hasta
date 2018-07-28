import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineTypeCrmSettingsComponent } from './machine-type-crm-settings.component';

describe('MachineTypeCrmSettingsComponent', () => {
  let component: MachineTypeCrmSettingsComponent;
  let fixture: ComponentFixture<MachineTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachineTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachineTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
