import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachinetypeCrmsettingsComponent } from './model-machinetype-crmsettings.component';

describe('ModelMachinetypeCrmsettingsComponent', () => {
  let component: ModelMachinetypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelMachinetypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachinetypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachinetypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
