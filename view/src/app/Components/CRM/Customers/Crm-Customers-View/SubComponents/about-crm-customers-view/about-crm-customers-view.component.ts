import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { formatDate } from '@angular/common';
import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';
import { LoginService } from './../../../../../../services/LoginService/login.service';

import * as d3 from 'd3';
import { scaleLinear, scaleBand } from 'd3-scale';

@Component({
  selector: 'app-about-crm-customers-view',
  templateUrl: './about-crm-customers-view.component.html',
  styleUrls: ['./about-crm-customers-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AboutCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   User_Id;

   Loader: Boolean = true;

   _List: any[] = [];
   From: Date = new Date('2018-09-01');
   To: Date = new Date();

   constructor(
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }


   ngOnInit() {
       const Data = { Machine_Id: '5b9f53d04d32c82c68b4bad6', 'User_Id' : this.User_Id, From: this.From, To: this.To };
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
            DecryptedData.map(Obj => {
               Obj.ChartData.map(Obj_1 => {
                  if (Obj_1.Status === 'Up') { Obj_1.ColorCode = '#44AF5A'; }
                  if (Obj_1.Status === 'Down') { Obj_1.ColorCode = '#DD171F'; }
                  if (Obj_1.Status === 'Waiting') { Obj_1.ColorCode = '#ff9d0b'; }
                  if (Obj_1.Status === 'Idle') { Obj_1.ColorCode = '#889196'; }
               });
            });
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






   LoadChart(Data) {

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
                        .style('z-index', '10')
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
                                                         + '<p> ' + d.Date + ' </span> </p>  <span>'
                                                         + formatDate(d.ChartData[index].From, 'hh:mm a', 'en-US', '+0530')
                                                         + '</span> to <span>'
                                                         +  formatDate(d.ChartData[index].To, 'hh:mm a', 'en-US', '+0530')
                                                         + '</span> <p style="color:' + d.ChartData[index].ColorCode + ';background-color: #fff; padding: 3px 0px;"> '
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
