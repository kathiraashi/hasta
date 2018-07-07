import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelActivitytypeCrmsettingsComponent } from './model-activitytype-crmsettings.component';

describe('ModelActivitytypeCrmsettingsComponent', () => {
  let component: ModelActivitytypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelActivitytypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelActivitytypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelActivitytypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
