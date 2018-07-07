import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactRoleTypeCrmSettingsComponent } from './contact-role-type-crm-settings.component';

describe('ContactRoleTypeCrmSettingsComponent', () => {
  let component: ContactRoleTypeCrmSettingsComponent;
  let fixture: ComponentFixture<ContactRoleTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactRoleTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRoleTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
