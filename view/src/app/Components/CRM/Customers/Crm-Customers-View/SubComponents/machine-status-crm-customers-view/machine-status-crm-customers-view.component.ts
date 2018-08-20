import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { formatDate } from '@angular/common';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as d3 from 'd3';

@Component({
   selector: 'app-machine-status-crm-customers-view',
   templateUrl: './machine-status-crm-customers-view.component.html',
   styleUrls: ['./machine-status-crm-customers-view.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class MachineStatusCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;


   constructor(
   private modalService: BsModalService,
   private Toastr: ToastrService,
   public Crm_Service: CrmService
   ) { }

   ngOnInit() {
   const Data = {Customer_Id: this.CustomerData['_id'],  'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
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
         DecryptedData.map(Obj => {
            if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'UP') {
               Obj.Machine.ColorBg = 'rgba(68, 175, 91, 0.48)';
               Obj.Machine.Color = 'rgba(68, 175, 91, 1)';
            }
            if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Down') {
               Obj.Machine.ColorBg = 'rgba(227, 28, 19, 0.61)';
               Obj.Machine.Color = 'rgba(227, 28, 19, 1)';
            }
            if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Waiting') {
               Obj.Machine.ColorBg = 'rgba(255, 157, 11, 0.63)';
               Obj.Machine.Color = 'rgba(255, 157, 11, 1)';
            }
            return Obj;
         });
         this._List = DecryptedData;
         console.log(DecryptedData);
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

   drawChart(_Data, _index) {
      const MachineId = '#Chart' + _index;
      const _ChartData = _Data.ChartData;

      const width = 300;
      const height = 300;
      const radius = width / 2;

      const arc = d3.arc()
                  .outerRadius(radius - 20)
                  .innerRadius(90);

      const pie = d3.pie().sort(null).value(function (d) { return d.Percentage; });

      const svg = d3.select(MachineId)
                     .append('svg')
                     .attr('width', width)
                     .attr('height', height)
                     .append('g')
                     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
      const  tooltip = d3.select('body')
                        .append('div')
                        .style('position', 'absolute')
                        .style('z-index', '10')
                        .style('visibility', 'hidden')
                        .text('a simple tooltip');

      svg.append('svg:circle')
         .attr('r', width * 0.27)
         .style('fill', '#E7E7E7')
         .style('cursor', 'pointer')
         .on('mouseover', function(d) { d3.select(this).transition().attr('r', width * 0.29); })
         .on('mouseout', function(d) { d3.select(this).transition().duration(300).attr('r', width * 0.27); })
         .on('click', function(d) { const clickedPaths = d3.selectAll('.clicked');
                                       clickedPaths.classed('clicked', false);
                                       clickedPaths.transition()
                                                   .duration(500)
                                                   .attr('d', d3.arc().innerRadius(90).outerRadius(radius - 20) );
                                       ResetCircle(); });

      svg.append('text')
         .attr('class', 'center-txt type')
         .attr('y', width * -0.1)
         .attr('text-anchor', 'middle')
         .style('font-weight', 'bold')
         .style('font-size', '13px')
         .text( function() {
            const str = _Data.Machine.MachineName;
            if (str.length > 15 ) { return str.substring(0, 15) + '...'; }  return str;
         });

      svg.append('text')
         .attr('class', 'center-txt value')
         .attr('y', width * 0)
         .attr('text-anchor', 'middle')
         .style('font-size', '13px')
         .text('Last 24hrs');

      svg.append('text')
         .attr('class', 'center-txt percentage')
         .attr('y', width * 0.1)
         .attr('text-anchor', 'middle')
         .style('font-size', '13px')
         .text('100%');

      const g = svg.selectAll('.arc')
                     .data(pie(_ChartData))
                     .enter()
                     .append('g');

      g.append('path')
         .attr('d', arc)
         .style('fill', function (d) { return d.data.ColorCode; })
         .style('cursor', 'pointer')
         .style('stroke', '#FFFFFF')
         .on('mouseover', function (d) {
               d3.select(this)
               .transition()
               .duration(300)
               .attr('d', d3.arc().innerRadius(90).outerRadius(radius - 10) );
               svg.select('.type').text(function(d1) { return d.data.Status; });
               svg.select('.value').text(function(d1) { return d.data.Hours; });
               svg.select('.percentage').text(function(d1) { return d.data.Percentage + '%'; });
               return tooltip.style('visibility', 'visible').html(function(d1) {
                  return  '<h5 class="ChartTooltip">'
                           + formatDate(d.data.From, 'dd-MM-yyyy ', 'en-US', '+0530')
                           + ' <span>' + formatDate(d.data.From, 'hh:mm a', 'en-US', '+0530') + '</span>'
                           + '<p> <span> to </span> </p>'
                           +  formatDate(d.data.To, 'dd-MM-yyyy', 'en-US', '+0530')
                           + ' <span>' + formatDate(d.data.To, 'hh:mm a', 'en-US', '+0530') + '</span>'
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
                           .attr('d', d3.arc().innerRadius(90).outerRadius(radius - 20) );
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
         const Time = ('0' + hh).slice(-2) + 'hr ' + ('0' + mm).slice(-2) + 'min';
         svg.select('.type').text('Clicked Arcs');
         svg.select('.value').text(Time);
         svg.select('.percentage').text(SumPercentage + '%');
      }
      function ResetCircle() {
         svg.select('.type').text(_Data.Machine.MachineName);
         svg.select('.value').text('Last 24hrs');
         svg.select('.percentage').text('100%');
      }
   }


}
