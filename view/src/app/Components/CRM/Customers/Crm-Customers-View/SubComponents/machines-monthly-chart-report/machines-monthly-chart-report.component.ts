import { Component, OnInit, Input, ViewEncapsulation, TemplateRef } from '@angular/core';

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';
import { LoginService } from './../../../../../../services/LoginService/login.service';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       const month = date.toLocaleString('en-us', { month: 'short' });
       const year = date.getFullYear();
       return `${month} ${year}`;
   }
}
import {MatDatepicker} from '@angular/material/datepicker';


import * as CryptoJS from 'crypto-js';

import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';

@Component({
  selector: 'app-machines-monthly-chart-report',
  templateUrl: './machines-monthly-chart-report.component.html',
  styleUrls: ['./machines-monthly-chart-report.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
  encapsulation: ViewEncapsulation.None
})
export class MachinesMonthlyChartReportComponent implements OnInit {

   @Input() CustomerData: Object;

   MonthFor: Date = new Date();
   maxDate: Date = new Date();

   User_Id;
   From: Date;
   To: Date;
   Hours;
   ShowTo: Date;
   _List: any[] = [];
   Calculated_Data: Object = {};
   Loader: Boolean = true;

   ShowChangeBtn: Boolean = false;

   constructor(   private Toastr: ToastrService,
                  public Crm_Service: CrmService,
                  public Login_Service: LoginService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               }

   ngOnInit() {
     this.ApiLoad();
   }


   ApiLoad() {
      d3.selectAll('svg').remove();
      this.ShowChangeBtn = false;
      this.From = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), 1);
      if (new Date().getMonth() === this.MonthFor.getMonth()) {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), new Date().getDate());
         this.ShowTo = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), new Date().getDate());
      } else {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth() + 1, 1);
         this.ShowTo = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth() + 1, 0);
      }

      const MS = Math.abs(this.To.valueOf() - this.From.valueOf());
      let hh = Math.floor(MS / 1000 / 60 / 60);
      let mm = Math.ceil((MS - hh * 3600000) / 1000 / 60);
      if (mm === 60) { hh = hh + 1; mm = 0; }
      this.Hours =  hh + 'hr' + (hh < 2 ? ' ' : 's ') + ('0' + mm).slice(-2) + 'min';

      const SendData = { Customer_Id: this.CustomerData['_id'], 'User_Id' : this.User_Id, From: this.From, To: this.To };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(SendData), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmCustomerBasedMachinesMonthly_ChartData({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         setTimeout(() => {
            this.Loader = false;
         }, 100);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(DecryptedData);
            this._List.map(Obj => {
               Obj.ChartData.map(Obj_1 => {
                  if (Obj_1.Type === 'Up') { Obj_1.ColorCode = '#44AF5A'; }
                  if (Obj_1.Type === 'Down') { Obj_1.ColorCode = '#DD171F'; }
                  if (Obj_1.Type === 'Waiting') { Obj_1.ColorCode = '#ff9d0b'; }
                  if (Obj_1.Type === 'Idle') { Obj_1.ColorCode = '#889196'; }
               });
            });
            this.LoadChart(this._List);
            this.Calculation(this._List);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Customer Contact List Getting Error!, But not Identify!' });
         }
      });
   }

   chosenMonthHandler(event, datepicker: MatDatepicker<any>) {
      if (this.MonthFor.getMonth() !== this.From.getMonth() - 1) {
         this.ShowChangeBtn = true;
      } else {
         this.ShowChangeBtn = false;
      }
      this.MonthFor = event;
      datepicker.close();
   }

   Calculation(Data) {
      let Total_MTBF = 0;
      let Total_MTTR = 0;
      let Total_Availability = 0;
      let Total_Waiting_MTBF = 0;
      let Total_Waiting_MTTR = 0;
      let Total_Waiting_Availability = 0;
      const No_Of_Datas = Data.length;
      Data.map( (obj, i) => {
         Total_MTBF = Total_MTBF + obj['Calculation'].MTBF;
         Total_MTTR = Total_MTTR + obj['Calculation'].MTTR;
         Total_Availability = Total_Availability + obj['Calculation'].Availability;
         Total_Waiting_MTBF = Total_Waiting_MTBF + obj['Calculation'].Waiting_MTBF;
         Total_Waiting_MTTR = Total_Waiting_MTTR + obj['Calculation'].Waiting_MTTR;
         Total_Waiting_Availability = Total_Waiting_Availability + obj['Calculation'].Waiting_Availability;
         if ( (i + 1) === No_Of_Datas) {
            Total_MTBF = Total_MTBF / No_Of_Datas;
            Total_MTTR = Total_MTTR / No_Of_Datas;
            Total_Availability = Total_Availability / No_Of_Datas;
            Total_Waiting_MTBF = Total_Waiting_MTBF / No_Of_Datas;
            Total_Waiting_MTTR = Total_Waiting_MTTR / No_Of_Datas;
            Total_Waiting_Availability = Total_Waiting_Availability / No_Of_Datas;
         }
      });
      this.Calculated_Data = {   Final_MTBF : Math.floor(Total_MTBF) + 'hr' + (Total_MTBF < 2 ? ' ' : 's ') + Math.ceil((Total_MTBF - Math.floor(Total_MTBF)) * 60) + 'min',
                                 Final_MTTR : Math.floor(Total_MTTR) + 'hr' + (Total_MTTR < 2 ? ' ' : 's ') + Math.ceil((Total_MTTR - Math.floor(Total_MTTR)) * 60) + 'min',
                                 Final_Availability : Math.floor( Total_Availability * 100 ) / 100 + '%',
                                 Final_Waiting_MTBF : Math.floor(Total_Waiting_MTBF) + 'hr' + (Total_Waiting_MTBF < 2 ? ' ' : 's ') + Math.ceil((Total_Waiting_MTBF - Math.floor(Total_Waiting_MTBF)) * 60) + 'min',
                                 Final_Waiting_MTTR : Math.floor(Total_Waiting_MTTR) + 'hr' + (Total_Waiting_MTTR < 2 ? ' ' : 's ') + Math.ceil((Total_Waiting_MTTR - Math.floor(Total_Waiting_MTTR)) * 60) + 'min',
                                 Final_Waiting_Availability : Math.floor( Total_Waiting_Availability * 100 ) / 100 + '%',
                              };
   }

   LoadChart(Data) {

      const margin = {top: 20, right: 20, bottom: 200, left: 50};
      const margin2 = {top: 380, right: 20, bottom: 100, left: 50};
      const width = 1000 - margin.left - margin.right;
      const height = 550 - margin.top - margin.bottom;
      const height2 = 550 - margin2.top - margin2.bottom;


      const svg = d3.select('#diagram')
            .append('svg')
            .attr('width', width + margin.left + margin.right )
            .attr('height', height + margin.top + margin.bottom );

      const focus = svg.append('g')
               .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      const context = svg.append('g')
                  .attr('transform', 'translate(' + margin2.left + ',' + margin2.top + ')');


      let maxHeight = d3.max(Data, function(d) { return d3.max(d.ChartData, function(e) { return e.Percentage; }); } );
            if (maxHeight === 0) {
               maxHeight = 100;
            }


      const yScale = d3.scaleLinear()
                        .domain([maxHeight, 0])
                        .range([0, height]);

      const xScale = d3.scaleBand()
                        .domain(Data.map(function(d) { return d.Machine.MachineName; }))
                        .rangeRound([0, width])
                        .padding(0.1);

      const xxxScale = d3.scaleBand()
                        .domain(d3.range(4))
                        .range([5, xScale.bandwidth() - 5]);

      const yScale2 = d3.scaleLinear()
                        .range([0, height2])
                        .domain([maxHeight, 0]);

      const xScale2 = d3.scaleBand()
                        .domain(Data.map(function(d) { return d.Machine.MachineName; }))
                        .rangeRound([0, width])
                        .padding(0.1);

      const xxxScale2 = d3.scaleBand()
                           .domain(d3.range(4))
                           .range([5, xScale2.bandwidth() - 5]);

      d3.selectAll('.ToolTipSection').remove();
      const tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'ToolTipSection')
                        .style('position', 'absolute')
                        .style('z-index', '1055')
                        .style('visibility', 'hidden')
                        .text('a simple tooltip');


      const bars1 = focus.selectAll('g')
                           .data(Data)
                           .enter()
                           .append('g')
                              .attr('class', 'RectGroup')
                              .attr('data-index', function(d, i) { return i; })
                              .attr('transform', function(d, i) { return 'translate(' + xScale(d.Machine.MachineName) + ',0)'; })
                              .selectAll('rect')
                              .data(function(d) { return d.ChartData; })
                              .enter()
                              .append('rect')
                                 .attr('class', 'Rect')
                                 .style('fill', function(d, i) { return d.ColorCode; })
                                 .attr('width', xxxScale.bandwidth())
                                 .attr('x', function(d, i) { return xxxScale(i); } )
                                 .attr('height', function(d) { return height - yScale(d.Percentage); })
                                 .attr('y', function(d) { return yScale(d.Percentage); });


      focus.selectAll('.Rect')
            .on('mouseover', function(d) { const ParentData = d3.select(this.parentNode).datum();
                                             d3.select(this).style('opacity', '0.7');
                                             return tooltip.style('visibility', 'visible').html(function(d1) {
                                                return '<h5 class="ChartTooltip">'
                                                + '<p>' + ParentData.Machine.MachineName + '</p>'
                                                + ' <p style="color:' + d.ColorCode + ';background-color: #fff; padding: 3px 5px;"> ' + d.Show_Hours + '</p>'
                                                + '<p>' + d.Percentage + '%</p>'
                                                + '</h5>';
                                             });
                                          })
            .on('mousemove', function() { return tooltip.style('top', (d3.event.pageY - 43) + 'px').style( 'left', (d3.event.pageX + 15) + 'px'); })
            .on('mouseout', function(d, i, j) {
                                                d3.select(this).style('opacity', '1');
                                                return tooltip.style('visibility', 'hidden');
                                                         });




      d3.selectAll('.RectGroup')
         .selectAll('text')
            .data(function(d) { return d.ChartData; })
            .enter()
            .append('text')
            .attr('class', 'TextPercent')
               .style('font-size', function(d) { if ( xxxScale.bandwidth() / 4 < 8 ) {
                                                      return '8';
                                                   } else {
                                                      if  (xxxScale.bandwidth() / 4 > 22) {
                                                         return '22';
                                                      } else { return xxxScale.bandwidth() / 4; }
                                                   }
                                                })
               .attr('x', function(d, i) { return xxxScale(i) + xxxScale.bandwidth() / 2; })
               .attr('y', function(d) { return yScale(d.Percentage) - 2; })
               .text(function(d) { return d.Percentage + '%'; });


      const bars2 = context.selectAll('g')
                           .data(Data)
                           .enter()
                           .append('g')
                              .attr('class', 'SubRectGroup')
                              .attr('data-index', function(d, i) { return i; })
                              .attr('transform', function(d, i) { return 'translate(' + xScale2(d.Machine.MachineName) + ',0)'; })
                              .selectAll('rect')
                              .data(function(d) { return d.ChartData; })
                              .enter()
                              .append('rect')
                                 .style('fill', function(d, i) { return d.ColorCode; })
                                 .attr('width', xxxScale2.bandwidth())
                                 .attr('x', function(d, i) { return xxxScale2(i); } )
                                 .attr('y', function(d) { return yScale2(d.Percentage); })
                                 .attr('height', function(d) { return height2 - yScale2(d.Percentage); });

      d3.selectAll('.SubRectGroup')
         .append('rect')
         .style('fill', 'rgba(160, 160, 160, 0.2)')
         .attr('transform', 'translate(5, 0)')
         .attr('width', xScale2.bandwidth() - 10)
         .attr('height', function(d) { return height2; });


      const yAxisGroup = focus.append('g')
                              .call(d3.axisLeft(yScale));

      const xAxis =  d3.axisBottom(xScale);

      const xAxisGroup =  focus.append('g')
                                 .call(xAxis)
                                 .attr('transform', 'translate(0,' + height + ')');

      const xAxis2Group = context.append('g')
                                 .call(d3.axisBottom(xScale2))
                                 .attr('class', 'axis axis-x')
                                 .attr('text-anchor', 'start')
                                 .attr('transform', 'translate(0,' + height2 + ')');

      const brush = d3.brushX()
                        .extent([[0, 0], [width, height2]])
                        .on('brush', brushed)
                        .on('end', brush_end);

      context.append('g')
               .attr('class', 'brush')
               .call(brush)
               .call(brush.move, xScale2.range());

      d3.select('.brush')
         .select('.selection')
         .style('fill-opacity', '0.5');



      function brushed() {
         if (!d3.event.sourceEvent || !d3.event.selection || (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') ) {
            return;
         } else {
            const newInput = [];
            let brushArea = d3.event.selection;
            if (brushArea === null) {
               brushArea = xScale.range();
            }
            xScale2.domain().forEach(function(d) {
               const pos = xScale2(d) + xScale2.bandwidth() / 2;
               if (pos >= brushArea[0] && pos <= brushArea[1]) {
                  newInput.push(d);
               }
            });
            xScale.domain(newInput);
            xxxScale.range([10, xScale.bandwidth() - 10]);
            bars1.attr('fill', function(d, i) {
               d3.select(this.parentNode)
                  .attr('transform', function(e) {
                     if (xScale(e.Machine.MachineName) === undefined) {
                        d3.select(this).style('display', 'none').classed('RectGroup', false);
                        return 'translate(0, 0)';
                     } else {
                        d3.select(this)
                           .style('display', 'block')
                           .classed('RectGroup', true)
                           .selectAll('.Rect')
                           .attr('x', function(f, j) { return xxxScale(j); } );
                        return 'translate(' + xScale(e.Machine.MachineName) + ',0)';
                     }
                  });
               return d.ColorCode;
            })
            .attr('width', xxxScale.bandwidth());

         d3.selectAll('.HighlightRect')
            .attr('transform', 'translate(10, 0)')
            .attr('width', xScale.bandwidth() - 20)
            .attr('height', function(d) { return height; });

            d3.selectAll('.TextPercent').remove();
            d3.selectAll('.RectGroup')
               .selectAll('text')
                  .data(function(d) { return d.ChartData; })
                  .enter().append('text')
                     .attr('class', 'TextPercent')
                     .style('font-size', function(d) { if ( xxxScale.bandwidth() / 4 < 8 ) {
                                                            return '8';
                                                         } else {
                                                            if  (xxxScale.bandwidth() / 4 > 22) {
                                                               return '22';
                                                            } else { return xxxScale.bandwidth() / 4; }
                                                         }
                                                      })
                     .attr('x', function(d, i) {  return xxxScale(i) + xxxScale.bandwidth() / 2; })
                     .attr('y', function(d) { return yScale(d.Percentage) - 2; })
                     .text(function(d) { return d.Percentage + '%'; });

            xAxisGroup.call(xAxis);
         }
      }


      function brush_end() {
         if (!d3.event.sourceEvent || !d3.event.selection || (d3.event.sourceEvent && d3.event.sourceEvent.type === 'zoom') ) {
            return;
         } else {
            const newInput = [];
            let brushArea = d3.event.selection;
            if (brushArea === null) {
               brushArea = xScale.range();
            }
            xScale2.domain().forEach(function(d) {
               const pos = xScale2(d) + xScale2.bandwidth() / 2;
               if (pos >= brushArea[0] && pos <= brushArea[1]) {
                  newInput.push(d);
               }
            });
            const increment = 0;
            const left = xScale2(newInput[0]) + 5;
            const right = xScale2(newInput[newInput.length - 1]) + xScale2.bandwidth() - 5;
            d3.select(this).transition().call(d3.event.target.move, [left, right]);
         }
      }

   }


}
