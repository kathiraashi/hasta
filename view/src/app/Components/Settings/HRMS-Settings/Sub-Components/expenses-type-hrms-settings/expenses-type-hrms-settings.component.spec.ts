import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesTypeHrmsSettingsComponent } from './expenses-type-hrms-settings.component';

describe('ExpensesTypeHrmsSettingsComponent', () => {
  let component: ExpensesTypeHrmsSettingsComponent;
  let fixture: ComponentFixture<ExpensesTypeHrmsSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesTypeHrmsSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesTypeHrmsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
