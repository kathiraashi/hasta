import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelDesignationHrsettingsComponent } from './model-designation-hrsettings.component';

describe('ModelDesignationHrsettingsComponent', () => {
  let component: ModelDesignationHrsettingsComponent;
  let fixture: ComponentFixture<ModelDesignationHrsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelDesignationHrsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelDesignationHrsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
