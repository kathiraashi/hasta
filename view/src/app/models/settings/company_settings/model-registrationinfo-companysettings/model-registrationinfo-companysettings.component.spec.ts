import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelRegistrationinfoCompanysettingsComponent } from './model-registrationinfo-companysettings.component';

describe('ModelRegistrationinfoCompanysettingsComponent', () => {
  let component: ModelRegistrationinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelRegistrationinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelRegistrationinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelRegistrationinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
