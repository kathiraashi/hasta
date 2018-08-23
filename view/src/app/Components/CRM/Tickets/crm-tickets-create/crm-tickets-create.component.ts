import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
import { map } from 'rxjs/operators';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-crm-tickets-create',
  templateUrl: './crm-tickets-create.component.html',
  styleUrls: ['./crm-tickets-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmTicketsCreateComponent implements OnInit {

   _Selects: any[] = ['PL', 'BR', 'AMC'];
   _Customers: any[] =  [];
   _Machines: any[] =  [];
   _Tickets_Types: any[] =  [];


   Form: FormGroup;

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';


   constructor(
            private Toastr: ToastrService,
            public SettingsService: CrmSettingsService,
            public Crm_Service: CrmService,
            public router: Router
         ) {
            const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            // Get Customers List
            this.Crm_Service.CrmCustomers_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Customers = DecryptedData;
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Types Simple List Getting Error!, But not Identify!' });
               }
            });
            // Get Ticket Types List
            this.SettingsService.Ticket_Type_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Tickets_Types = DecryptedData;
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Types Simple List Getting Error!, But not Identify!' });
               }
            });
          }

   ngOnInit() {
      this.Form = new FormGroup({
         Customer: new FormControl(null, Validators.required),
         Machine: new FormControl({value : null, disabled: true}, Validators.required),
         TicketType: new FormControl(null, Validators.required),
         TicketOpenDate: new FormControl(new Date(), Validators.required),
         TicketOpenTime: new FormControl(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), Validators.required),
         Issue: new FormControl('', Validators.required),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
      });

   }

   NotAllow(): boolean {return false; }

   Customer_Change() {
      const Customer = this.Form.controls['Customer'].value;
      this.Form.controls['Machine'].reset();
      this.Form.controls['Machine'].setErrors(null);
      this.Form.controls['Machine'].disable();
      this._Machines = [];
      if ( Customer !== null && typeof Customer === 'object' && Object.keys(Customer).length > 0) {
         const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id, 'Customer_Id': Customer._id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmCustomerBasedMachines_SimpleList({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Form.controls['Machine'].enable();
               this._Machines = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Types Simple List Getting Error!, But not Identify!' });
            }
         });
      }
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
      if (time12h !== null && time12h !== '') {
         const [time, modifier] = time12h.split(' ');
         const newTime = time.split(':');
         if (newTime[0] === '12') { newTime[0] = '00'; }
         if (modifier === 'PM') { newTime[0] = parseInt(newTime[0], 10) + 12; }
         return newTime[0] + ':' + newTime[1] + ':00';
      } else {
         return '00:00:00';
      }
   }

   Submit() {
      if (this.Form.valid) {
         const OpenDate = this.Form.controls['TicketOpenDate'].value;
         const OpenTime = this.Form.controls['TicketOpenTime'].value;
         this.Form.controls['TicketOpenDate'].setValue(new Date(this.formatDate(OpenDate) + ' ' + this.convertTime12to24(OpenTime)));
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmTickets_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: ResponseData['Message'] });
               this.router.navigate(['/crm_ticket_list']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Ticket Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
