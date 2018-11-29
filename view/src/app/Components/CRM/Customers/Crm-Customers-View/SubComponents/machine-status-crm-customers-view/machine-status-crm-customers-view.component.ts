import { Component, OnInit, Input, ViewEncapsulation, TemplateRef  } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

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

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';

import { ModelMachineSingleChartComponent } from './../../../../../../models/CRM/Customers/model-machine-single-chart/model-machine-single-chart.component';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { LoginService } from './../../../../../../services/LoginService/login.service';

import * as d3 from 'd3';

@Component({
   selector: 'app-machine-status-crm-customers-view',
   templateUrl: './machine-status-crm-customers-view.component.html',
   styleUrls: ['./machine-status-crm-customers-view.component.css'],
   providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
   encapsulation: ViewEncapsulation.None
})
export class MachineStatusCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   User_Id;

   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;
   Form: FormGroup;
   Uploading: Boolean = false;
   From: Date = new Date(new Date().setHours(new Date().getHours() - 24));
   To: Date = new Date();


   constructor(
            private modalService: BsModalService,
            private Toastr: ToastrService,
            public Crm_Service: CrmService,
            public Login_Service: LoginService,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }

   ngOnInit() {
      this.Form = new FormGroup({
         FromDate: new FormControl(this.From, Validators.required),
         FromTime: new FormControl(this.From.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), Validators.required ),
         ToDate: new FormControl(this.To, Validators.required),
         ToTime: new FormControl(this.To.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), Validators.required ),
      });
      this.ApiLoad();
   }


   ViewSingleChart(_index) {
      const initialState = {
         MachineData: this._List[_index]
      };
      this.bsModalRef = this.modalService.show(ModelMachineSingleChartComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: 'modal-lg max-width-85' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         d3.selectAll('.ToolTipSection').remove();
      });
    }



   ApiLoad() {
      d3.selectAll('svg > *').remove();
      const Data = { Customer_Id: this.CustomerData['_id'], 'User_Id' : this.User_Id, From: this.From, To: this.To };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmCustomerBasedMachine_ChartData({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         setTimeout(() => {
            this.Loader = false;
         }, 100);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            DecryptedData.map(Obj => {
               if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Up') {
                  Obj.Machine.Color = 'rgba(68, 175, 91, 1)';
               }
               if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Down') {
                  Obj.Machine.Color = 'rgba(227, 28, 19, 1)';
               }
               if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Waiting') {
                  Obj.Machine.Color = 'rgba(255, 157, 11, 1)';
               }
               if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Idle') {
                  Obj.Machine.Color = '#889196';
               }
               return Obj;
            });
            DecryptedData.map(Obj => {
               Obj.ChartData.map(Obj_1 => {
                  if (Obj_1.Status === 'Up') { Obj_1.ColorCode = '#44AF5A'; }
                  if (Obj_1.Status === 'Down') { Obj_1.ColorCode = '#DD171F'; }
                  if (Obj_1.Status === 'Waiting') { Obj_1.ColorCode = '#ff9d0b'; }
                  if (Obj_1.Status === 'Idle') { Obj_1.ColorCode = '#889196'; }
               });
            });
            setTimeout(() => {
               this._List.map( (Obj, index ) => {
                  this.drawChart(Obj, index);
                  return Obj;
               });
            }, 100);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Contact List Getting Error!, But not Identify!' });
         }
      });
   }

   NotAllow(): boolean {return false; }

   openModal(template: TemplateRef<any>) {
      this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});
   }


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
      this.Uploading = true;

      const FromDate = this.Form.controls['FromDate'].value;
      const FromTime = this.Form.controls['FromTime'].value;
      const ToDate = this.Form.controls['ToDate'].value;
      const ToTime = this.Form.controls['ToTime'].value;

      this.From = new Date(this.formatDate(FromDate) + ' ' + this.convertTime12to24(FromTime));
      this.To = new Date(this.formatDate(ToDate) + ' ' + this.convertTime12to24(ToTime));
      this.Uploading = false;
      this.bsModalRef.hide();
      this.ApiLoad();

   }



   drawChart(_Data, _index) {
      const MachineId = '#Chart' + _index;
      const _ChartData = _Data.ChartData;

      const diff = this.To.valueOf() - this.From.valueOf();
      let hhhh = Math.floor(diff / 1000 / 60 / 60);
      let mmmm = Math.ceil((diff - hhhh * 3600000) / 1000 / 60);
      if (mmmm === 60) { hhhh = hhhh + 1; mmmm = 0; }
      const Duration = hhhh + 'hr ' + ('0' + mmmm).slice(-2) + 'min';

      const width = 250;
      const height = 230;
      const radius = width / 2;

      const arc = d3.arc()
                  .outerRadius(radius - 15)
                  .innerRadius(85);

      const pie = d3.pie().sort(null).value(function (d) { return d.Percentage; });

      const svg = d3.select(MachineId)
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height)
                     .append('g')
                     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


      d3.selectAll('.ToolTipSectionOne' + _index).remove();
      const  tooltip = d3.select('body')
                        .append('div')
                        .attr('class', 'ToolTipSectionOne' + _index)
                        .style('position', 'absolute')
                        .style('z-index', '10')
                        .style('visibility', 'hidden')
                        .text('a simple tooltip');

      svg.append('svg:circle')
         .attr('r', width * 0.29)
         .style('fill', '#E7E7E7')
         .style('cursor', 'pointer')
         .on('mouseover', function(d) { d3.select(this).transition().attr('r', width * 0.32); })
         .on('mouseout', function(d) { d3.select(this).transition().duration(300).attr('r', width * 0.29); })
         .on('click', function(d) { const clickedPaths = d3.selectAll('.clicked');
                                       clickedPaths.classed('clicked', false);
                                       clickedPaths.transition()
                                                   .duration(500)
                                                   .attr('d', d3.arc().innerRadius(85).outerRadius(radius - 15) );
                                       ResetCircle(); });

      svg.append('text')
         .attr('class', 'center-txt type')
         .attr('y', width * -0.1)
         .attr('text-anchor', 'middle')
         .style('font-weight', 'bold')
         .style('font-size', '12px')
         .text( function() {
            const str = _Data.Machine.MachineName;
            if (str.length > 15 ) { return str.substring(0, 15) + '...'; }  return str;
         });

      svg.append('text')
         .attr('class', 'center-txt value')
         .attr('y', width * 0)
         .attr('text-anchor', 'middle')
         .style('font-size', '12px')
         .text('Total: ' + Duration);

      svg.append('text')
         .attr('class', 'center-txt percentage')
         .attr('y', width * 0.1)
         .attr('text-anchor', 'middle')
         .style('font-size', '12px')
         .text('100%');

      const g = svg.selectAll('.arc')
                     .data(pie(_ChartData))
                     .enter()
                     .append('g');

      g.append('path')
         .attr('d', arc)
         .style('fill', function (d) { return d.data.ColorCode; })
         .style('cursor', 'pointer')
         // .style('stroke', '#FFFFFF')
         .on('mouseover', function (d) {
               d3.select(this)
               .transition()
               .duration(300)
               .attr('d', d3.arc().innerRadius(85).outerRadius(radius - 10) );
               svg.select('.type').text(function(d1) { return d.data.Status; });
               svg.select('.value').text(function(d1) { return d.data.Hours; });
               svg.select('.percentage').text(function(d1) { return d.data.Percentage + '%'; });
               return tooltip.style('visibility', 'visible').html(function(d1) {
                  return  '<h5 class="ChartTooltipOne"> ('
                           + formatDate(d.data.From, 'dd-MM-yyyy ', 'en-US', '+0530')
                           + ' <span>' + formatDate(d.data.From, 'hh:mm a', 'en-US', '+0530') + ')</span>'
                           + '<span> to </span> ('
                           +  formatDate(d.data.To, 'dd-MM-yyyy', 'en-US', '+0530')
                           + ' <span>' + formatDate(d.data.To, 'hh:mm a', 'en-US', '+0530') + ')</span>'
                           + '<p style="max-width: 250px;"> <span>' + (d.data['Description'] === undefined ? '-' : d.data['Description'])  + '</span> </p>'
                           + '</h5>';
               });
         })
         .on('mousemove', function() { return tooltip.style('top', (d3.event.pageY - 30) + 'px').style( 'left', (d3.event.pageX + 20) + 'px'); })
         .on('mouseout', function (d) {
               const thisPath = d3.select(this);
               const ClickedArcsLength = d3.selectAll('.clicked')['_groups'][0].length;
               if (!thisPath.classed('clicked')) {
                  thisPath.transition()
                           .duration(300)
                           .attr('d', d3.arc().innerRadius(85).outerRadius(radius - 15) );
               }
               if ( ClickedArcsLength === 0 ) {
                  ResetCircle();
               } else {
                  ClickedArcCalculation();
               }
               return tooltip.style('visibility', 'hidden');
         })
         .on('click', function(d) {
               const thisPath = d3.select(this);
               const clicked = thisPath.classed('clicked');
               thisPath.classed('clicked', !clicked);
               const ClickedArcsLength = d3.selectAll('.clicked')['_groups'][0].length;
               if ( ClickedArcsLength === 0 ) {
                  svg.select('.type').text(function(d1) { return d.data.Status; });
                  svg.select('.value').text(function(d1) { return d.data.Hours; });
                  svg.select('.percentage').text(function(d1) { return d.data.Percentage + '%'; });
               } else {
                  ClickedArcCalculation();
               }
         });

      function ClickedArcCalculation() {
         const SumPercentage = d3.sum( d3.selectAll('.clicked').data(), function(e) { return e.data.Percentage; }).toFixed(2);
         const SumMS = d3.sum( d3.selectAll('.clicked').data(), function(e) { return e.data.MilleSeconds; });
         const hh = Math.floor(SumMS / 1000 / 60 / 60);
         const mm = Math.ceil((SumMS - hh * 3600000) / 1000 / 60);
         const Time = hh + 'hr ' + ('0' + mm).slice(-2) + 'min';
         svg.select('.type').text('Clicked Arcs');
         svg.select('.value').text(Time);
         svg.select('.percentage').text(SumPercentage + '%');
      }
      function ResetCircle() {
         svg.select('.type').text(_Data.Machine.MachineName);
         svg.select('.value').text('Total: ' + Duration);
         svg.select('.percentage').text('100%');
      }
   }





}
