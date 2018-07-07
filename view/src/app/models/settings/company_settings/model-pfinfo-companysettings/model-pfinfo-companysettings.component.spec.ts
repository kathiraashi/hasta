import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPfinfoCompanysettingsComponent } from './model-pfinfo-companysettings.component';

describe('ModelPfinfoCompanysettingsComponent', () => {
  let component: ModelPfinfoCompanysettingsComponent;
  let fixture: ComponentFixture<ModelPfinfoCompanysettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelPfinfoCompanysettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelPfinfoCompanysettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
