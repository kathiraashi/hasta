import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegistrationtypeCompanysettingsComponent } from './model-registrationtype-companysettings.component';

describe('ModelRegistrationtypeCompanysettingsComponent', () => {
  let component: ModelRegistrationtypeCompanysettingsComponent;
  let fixture: ComponentFixture<ModelRegistrationtypeCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRegistrationtypeCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRegistrationtypeCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
