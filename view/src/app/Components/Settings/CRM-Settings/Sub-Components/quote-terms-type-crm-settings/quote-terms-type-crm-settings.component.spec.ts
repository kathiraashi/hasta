import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteTermsTypeCrmSettingsComponent } from './quote-terms-type-crm-settings.component';

describe('QuoteTermsTypeCrmSettingsComponent', () => {
  let component: QuoteTermsTypeCrmSettingsComponent;
  let fixture: ComponentFixture<QuoteTermsTypeCrmSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteTermsTypeCrmSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteTermsTypeCrmSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
