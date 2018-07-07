import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelIndustrytypeCrmsettingsComponent } from './model-industrytype-crmsettings.component';

describe('ModelIndustrytypeCrmsettingsComponent', () => {
  let component: ModelIndustrytypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelIndustrytypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelIndustrytypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelIndustrytypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
