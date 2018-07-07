import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryTypeCrmSettingsComponent } from './industry-type-crm-settings.component';

describe('IndustryTypeCrmSettingsComponent', () => {
  let component: IndustryTypeCrmSettingsComponent;
  let fixture: ComponentFixture<IndustryTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustryTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustryTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
