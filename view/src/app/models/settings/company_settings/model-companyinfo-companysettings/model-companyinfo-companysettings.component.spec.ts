import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelCompanyinfoCompanysettingsComponent } from './model-companyinfo-companysettings.component';

describe('ModelCompanyinfoCompanysettingsComponent', () => {
  let component: ModelCompanyinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelCompanyinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelCompanyinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelCompanyinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
