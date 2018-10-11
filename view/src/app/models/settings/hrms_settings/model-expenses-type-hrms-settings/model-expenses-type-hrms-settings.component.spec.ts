import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelExpensesTypeHrmsSettingsComponent } from './model-expenses-type-hrms-settings.component';

describe('ModelExpensesTypeHrmsSettingsComponent', () => {
  let component: ModelExpensesTypeHrmsSettingsComponent;
  let fixture: ComponentFixture<ModelExpensesTypeHrmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelExpensesTypeHrmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExpensesTypeHrmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
