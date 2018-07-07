import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelQuotetermsCrmsettingsComponent } from './model-quoteterms-crmsettings.component';

describe('ModelQuotetermsCrmsettingsComponent', () => {
  let component: ModelQuotetermsCrmsettingsComponent;
  let fixture: ComponentFixture<ModelQuotetermsCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelQuotetermsCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelQuotetermsCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
