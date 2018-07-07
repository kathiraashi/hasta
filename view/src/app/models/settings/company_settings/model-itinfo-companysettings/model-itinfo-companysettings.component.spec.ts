import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelItinfoCompanysettingsComponent } from './model-itinfo-companysettings.component';

describe('ModelItinfoCompanysettingsComponent', () => {
  let component: ModelItinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelItinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelItinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelItinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
