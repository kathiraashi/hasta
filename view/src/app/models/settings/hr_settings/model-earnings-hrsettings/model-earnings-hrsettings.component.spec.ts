import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelEarningsHrsettingsComponent } from './model-earnings-hrsettings.component';

describe('ModelEarningsHrsettingsComponent', () => {
  let component: ModelEarningsHrsettingsComponent;
  let fixture: ComponentFixture<ModelEarningsHrsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelEarningsHrsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelEarningsHrsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
