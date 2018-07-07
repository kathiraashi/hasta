import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelContactroleCrmsettingsComponent } from './model-contactrole-crmsettings.component';

describe('ModelContactroleCrmsettingsComponent', () => {
  let component: ModelContactroleCrmsettingsComponent;
  let fixture: ComponentFixture<ModelContactroleCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelContactroleCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelContactroleCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
