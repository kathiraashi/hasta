import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTickettypeCrmsettingsComponent } from './model-tickettype-crmsettings.component';

describe('ModelTickettypeCrmsettingsComponent', () => {
  let component: ModelTickettypeCrmsettingsComponent;
  let fixture: ComponentFixture<ModelTickettypeCrmsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelTickettypeCrmsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTickettypeCrmsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
