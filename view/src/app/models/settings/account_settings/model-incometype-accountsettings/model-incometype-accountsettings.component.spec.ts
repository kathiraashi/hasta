import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelIncometypeAccountsettingsComponent } from './model-incometype-accountsettings.component';

describe('ModelIncometypeAccountsettingsComponent', () => {
  let component: ModelIncometypeAccountsettingsComponent;
  let fixture: ComponentFixture<ModelIncometypeAccountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelIncometypeAccountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelIncometypeAccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
