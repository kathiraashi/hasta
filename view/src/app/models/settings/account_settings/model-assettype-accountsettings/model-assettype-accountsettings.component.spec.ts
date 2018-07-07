import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAssettypeAccountsettingsComponent } from './model-assettype-accountsettings.component';

describe('ModelAssettypeAccountsettingsComponent', () => {
  let component: ModelAssettypeAccountsettingsComponent;
  let fixture: ComponentFixture<ModelAssettypeAccountsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelAssettypeAccountsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelAssettypeAccountsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
