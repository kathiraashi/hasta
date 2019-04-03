/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModelExpensesPayComponent } from './model-expenses-pay.component';

describe('ModelExpensesPayComponent', () => {
  let component: ModelExpensesPayComponent;
  let fixture: ComponentFixture<ModelExpensesPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelExpensesPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelExpensesPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
