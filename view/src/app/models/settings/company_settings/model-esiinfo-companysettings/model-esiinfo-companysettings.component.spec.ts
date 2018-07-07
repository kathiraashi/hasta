import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEsiinfoCompanysettingsComponent } from './model-esiinfo-companysettings.component';

describe('ModelEsiinfoCompanysettingsComponent', () => {
  let component: ModelEsiinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelEsiinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEsiinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEsiinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
