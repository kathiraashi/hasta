import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExpensestypeHrmssettingsComponent } from './model-expensestype-hrmssettings.component';

describe('ModelExpensestypeHrmssettingsComponent', () => {
  let component: ModelExpensestypeHrmssettingsComponent;
  let fixture: ComponentFixture<ModelExpensestypeHrmssettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelExpensestypeHrmssettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExpensestypeHrmssettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
