import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelMachineSingleChartComponent } from './model-machine-single-chart.component';

describe('ModelMachineSingleChartComponent', () => {
  let component: ModelMachineSingleChartComponent;
  let fixture: ComponentFixture<ModelMachineSingleChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelMachineSingleChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelMachineSingleChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
