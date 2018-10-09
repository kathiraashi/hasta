import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MachinesMonthlyChartReportComponent } from './machines-monthly-chart-report.component';

describe('MachinesMonthlyChartReportComponent', () => {
  let component: MachinesMonthlyChartReportComponent;
  let fixture: ComponentFixture<MachinesMonthlyChartReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MachinesMonthlyChartReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MachinesMonthlyChartReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
