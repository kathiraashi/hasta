import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLeavetypeHrmssettingsComponent } from './model-leavetype-hrmssettings.component';

describe('ModelLeavetypeHrmssettingsComponent', () => {
  let component: ModelLeavetypeHrmssettingsComponent;
  let fixture: ComponentFixture<ModelLeavetypeHrmssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLeavetypeHrmssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLeavetypeHrmssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
