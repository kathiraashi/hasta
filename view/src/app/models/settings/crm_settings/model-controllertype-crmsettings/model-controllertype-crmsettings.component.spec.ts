import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelControllertypeCrmsettingsComponent } from './model-controllertype-crmsettings.component';

describe('ModelControllertypeCrmsettingsComponent', () => {
  let component: ModelControllertypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelControllertypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelControllertypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelControllertypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
