import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeLineStatusTypeCrmSettingsComponent } from './pipe-line-status-type-crm-settings.component';

describe('PipeLineStatusTypeCrmSettingsComponent', () => {
  let component: PipeLineStatusTypeCrmSettingsComponent;
  let fixture: ComponentFixture<PipeLineStatusTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeLineStatusTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeLineStatusTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
