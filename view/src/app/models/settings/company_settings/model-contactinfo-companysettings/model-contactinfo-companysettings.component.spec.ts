import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContactinfoCompanysettingsComponent } from './model-contactinfo-companysettings.component';

describe('ModelContactinfoCompanysettingsComponent', () => {
  let component: ModelContactinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelContactinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContactinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContactinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
