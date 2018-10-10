import { Component, OnInit, Input, ViewEncapsulation, TemplateRef  } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';

@Component({
  selector: 'app-model-machine-single-chart',
  templateUrl: './model-machine-single-chart.component.html',
  styleUrls: ['./model-machine-single-chart.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
  encapsulation: ViewEncapsulation.None
})
export class ModelMachineSingleChartComponent implements OnInit {


   MachineData: Object;
   onClose: Subject<any>;

   User_Id;

   Month: Date;

   Loader: Boolean = true;

   _List: any[] = [];
   From: Date;
   To: Date;
   Form: FormGroup;
   Uploading: Boolean = false;

   constructor(
               public bsModalRef: BsModalRef,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }


   ngOnInit() {
      this.onClose = new Subject();
      const Today = new Date();
      const firstDay = new Date(Today.getFullYear(), Today.getMonth(), 1);
      const lastDay = new Date(Today.getFullYear(), Today.getMonth() + 1, 0);

      this.Form = new FormGroup({
         FromDate: new FormControl( firstDay, Validators.required),
         ToDate: new FormControl( lastDay, Validators.required),
      });
      this.ApiLoad();

   }

   ApiLoad() {
      this.Uploading = true;
      const Data = { Machine_Id: this.MachineData['Machine']['_id'], 'User_Id' : this.User_Id, From: this.Form.value['FromDate'], To: this.Form.value['ToDate'] };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmSingleMachine_ChartData({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         setTimeout(() => {
            this.Loader = false;
         }, 100);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(DecryptedData);
            DecryptedData.map(Obj => {
               Obj.ChartData.map(Obj_1 => {
                  if (Obj_1.Status === 'Up') { Obj_1.ColorCode = '#44AF5A'; }
                  if (Obj_1.Status === 'Down') { Obj_1.ColorCode = '#DD171F'; }
                  if (Obj_1.Status === 'Waiting') { Obj_1.ColorCode = '#ff9d0b'; }
                  if (Obj_1.Status === 'Idle') { Obj_1.ColorCode = '#889196'; }
               });
            });
            this.Uploading = false;
            this.LoadChart(DecryptedData);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Customer Contact List Getting Error!, But not Identify!' });
         }
      });
   }


   NotAllow(): boolean {return false; }

   formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }
      return [year, month, day].join('-');
   }

   convertTime12to24(time12h) {
      time12h = time12h.toLowerCase();
      if (time12h !== null && time12h !== '') {
         const [time, modifier] = time12h.split(' ');
         const newTime = time.split(':');
         if (newTime[0] === '12') { newTime[0] = '00'; }
         if (modifier === 'pm') { newTime[0] = parseInt(newTime[0], 10) + 12; }
         return newTime[0] + ':' + newTime[1] + ':00';
      } else {
         return '00:00:00';
      }
   }


   onSubmit() {
      this.ApiLoad();
   }


   LoadChart(Data) {

      d3.selectAll('#bar-chart > *').remove();

      const height = 480;
      const width = 950;

      const x = d3.scaleBand()
                  .domain(Data.map(function(d) { return d.Date; }))
                  .rangeRound([0, width])
                  .padding(0.3)
                  .align(0.3);

      const y = d3.scaleLinear()
                  .domain([0, d3.max(Data, function(d) { return 24; })]).nice()
                  .rangeRound([height, 0]);

      d3.selectAll('.ToolTipSection').remove();
      const tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'ToolTipSection')
                        .style('position', 'absolute')
                        .style('z-index', '1055')
                        .style('visibility', 'hidden')
                        .text('a simple tooltip');

      const svg = d3.select('#bar-chart').style('Width', '1000px').style('height', '580px').style('overflow-x', 'auto');
      const g = svg.append('g').attr('transform', 'translate(40, 40)');


         g.append('g')
            .attr('class', 'axis axis--x')
            .attr('transform', 'translate(0,' + height + ')')
            .call(d3.axisBottom(x));

         g.append('g')
            .attr('class', 'axis axis--y')
            .call(d3.axisLeft(y));


            g.selectAll('.group')
               .data(Data)
               .attr('class', 'group')
               .enter().append('g')
               .each(function(d, i) {
                  d.ChartData.map( (obj, j, arr) => {
                     d3.select(this)
                        .append('rect')
                        .attr('class', 'bar')
                        .attr('data-index', j)
                        .attr('x', function(e) { return x(d.Date); })
                        .attr('width', x.bandwidth())
                        .attr('y', function (e) { return height; })
                        .attr('height', 0)
                        .transition()
                        .duration(500)
                        .delay(function (e) { return i * 50; })
                        .style('fill', function(e) { return obj.ColorCode; })
                        .attr('y', function(e) {  let sum = 0;
                                                   arr.map((obj_1, k) => {
                                                      if (k < j) { sum = sum + obj_1.Hours; }
                                                   });
                                                   return y(obj.Hours + sum);
                                                })
                        .attr('height', function(e) { return height - y(obj.Hours); });
                  });
               });

            g.selectAll('rect')
               .on('mouseover', function(d, i, j) { const index = j[i].attributes['data-index'].nodeValue;
                                                      d3.select(this).style('opacity', '0.7');
                                                      return tooltip.style('visibility', 'visible').html(function(d1) {
                                                         return '<h5 class="ChartTooltip">'
                                                         + d.Date + ' <span>' + formatDate(d.ChartData[index].From, 'hh:mm a', 'en-US', '+0530')
                                                         + '</span> to <span>'
                                                         + formatDate(d.ChartData[index].To, 'hh:mm a', 'en-US', '+0530') + ' </span>'
                                                         +  '<p style="max-width: 250px;">' + (d.ChartData[index]['Description'] === undefined ? '-' : d.ChartData[index]['Description']) + '</p>'
                                                         + ' <p style="color:' + d.ChartData[index].ColorCode + ';background-color: #fff; padding: 3px 0px;"> '
                                                         + d.ChartData[index].Show_Hours + '</p>'
                                                         + '</h5>';
                                                      });
                                                   })
               .on('mousemove', function() { return tooltip.style('top', (d3.event.pageY - 43) + 'px').style( 'left', (d3.event.pageX + 15) + 'px'); })
               .on('mouseout', function(d, i, j) { const index = j[i].attributes['data-index'].nodeValue;
                                                   d3.select(this).style('opacity', '1');
                                                   return tooltip.style('visibility', 'hidden');
                                                });
   }


}
