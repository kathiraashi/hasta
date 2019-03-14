import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

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

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-tickets-create',
  templateUrl: './crm-tickets-create.component.html',
  styleUrls: ['./crm-tickets-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmTicketsCreateComponent implements OnInit {

   modalRef: BsModalRef;

   _Selects: any[] = ['PL', 'BR', 'AMC'];
   _Customers: any[] =  [];
   _Machines: any[] =  [];
   _Tickets_Types: any[] =  [];

   User_Type: any;
   If_Employee: any;
   Form: FormGroup;
   Uploading: Boolean = false;
   Sub_Loading: Boolean = true;
   WorkShift_Info: any;
   Availability_Info: any;

   AMCValidation: Boolean = false;
   AMCDurationError: Boolean = false;
   AMCLimitError: Boolean = false;

   User_Id: any;

   constructor(
            private modalService: BsModalService,
            private Toastr: ToastrService,
            public SettingsService: CrmSettingsService,
            public Crm_Service: CrmService,
            public router: Router,
            public Login_Service: LoginService
         ) {
            this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
            this.If_Employee = this.Login_Service.LoginUser_Info()['Employee'];
            const Data = {'User_Id' : this.User_Id, Customers: this.If_Employee };
            if (this.User_Type === 'Employee') {
               Data.Customers = this.If_Employee['Customers'];
            }
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            // Get Customers List
            this.Crm_Service.CrmCustomers_List({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Sub_Loading = false;
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
         If_Idle: new FormControl({value : null, disabled: true}, Validators.required),
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
         const Data = {'User_Id' : this.User_Id, 'Customer_Id': Customer._id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Sub_Loading = true;
         this.Crm_Service.CrmCustomerBasedMachines_SimpleList({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Sub_Loading = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Form.controls['Machine'].enable();
               this._Machines = DecryptedData;
               this.Idle_Check();
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

   Idle_Check() {
      if ( this.Form.controls['Customer'].status === 'VALID' && this.Form.controls['Machine'].status === 'VALID'
            && this.Form.controls['TicketOpenDate'].status === 'VALID' && this.Form.controls['TicketOpenTime'].status === 'VALID' ) {

         const Customer = this.Form.controls['Customer'].value;
         const Machine = this.Form.controls['Machine'].value;
         const TicketOpenDate = this.Form.controls['TicketOpenDate'].value;
         const Str_Date = (TicketOpenDate.getMonth() + 1 + '/' + TicketOpenDate.getDate() +  '/' + TicketOpenDate.getFullYear()).toString();
         const DateTime = new Date( Str_Date + ' ' + this.Form.controls['TicketOpenTime'].value);

         const _index = this._Customers.findIndex(obj => obj._id === Customer._id);
         const CustomerType = this._Customers[_index]['CompanyType'];

         if (CustomerType === 'PL') {
            this.AMCValidation = false;
            const Data = {'User_Id' : this.User_Id, 'Customer_Id': Customer._id, 'Machine_Id': Machine._id, 'DateTime': DateTime };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Sub_Loading = true;
            this.Crm_Service.CrmTickets_IdleCheck({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Sub_Loading = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Idle_Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.WorkShift_Info = DecryptedData;
                  const CryptoBytes_Avail  = CryptoJS.AES.decrypt(ResponseData['Availability_Response'], 'SecretKeyOut@123');
                  const DecryptedData_Avail = JSON.parse(CryptoBytes_Avail.toString(CryptoJS.enc.Utf8));
                  this.Availability_Info = DecryptedData_Avail;
                  if (ResponseData['Idle_Stage'] ) {
                     this.Form.controls['If_Idle'].setValue(true);
                  } else {
                     this.Form.controls['If_Idle'].setValue(false);
                  }
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Form.controls['If_Idle'].setValue(null);
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Form.controls['If_Idle'].setValue(null);
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Form.controls['If_Idle'].setValue(null);
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Idle Validate Error!, But not Identify!' });
               }
            });
         } else {
            if (CustomerType === 'AMC') {
               this.AMCValidation = true;
               const AMCFrom = new Date(this._Customers[_index]['AMCFrom']);
               const currentAMCto = new Date(this._Customers[_index]['AMCTo']);
               const AMCTo = new Date(currentAMCto.setDate(currentAMCto.getDate() + 1));
               if ( AMCFrom.valueOf() <= DateTime.valueOf() &&  DateTime.valueOf() <= AMCTo.valueOf() ) {
                  this.AMCDurationError = false;
                  const Data = {'User_Id' : this.User_Id, 'Customer_Id': Customer._id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Sub_Loading = true;
                  this.Crm_Service.CrmAMCTicketLimit_Check({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Sub_Loading = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        if (ResponseData['Availability'] ) {
                           this.AMCLimitError = false;
                        } else {
                           this.AMCLimitError = true;
                        }
                     } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'AMC Validate Error!' });
                     }
                  });
               } else {
                  this.AMCDurationError = true;
                  this.AMCLimitError = false;
               }
            }
            this.Form.controls['If_Idle'].setValue(true);
         }
      } else {
         this.Form.controls['If_Idle'].setValue(null);
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
         if (modifier === 'pm') { newTime[0] = parseInt(newTime[0], 10) + 12; }
         return newTime[0] + ':' + newTime[1] + ':00';
      } else {
         return '00:00:00';
      }
   }

   OpenModel(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, { class: 'modal-sm max-width-400', ignoreBackdropClick: true });
   }

   Submit() {
      if (this.Form.valid && this.Form.status === 'VALID') {
         this.Form.controls['TicketOpenTime'].setValue(this.Form.controls['TicketOpenTime'].value.toLowerCase());
         const OpenDate = this.Form.controls['TicketOpenDate'].value;
         const OpenTime = this.Form.controls['TicketOpenTime'].value;
         this.Form.controls['TicketOpenDate'].setValue(new Date(this.formatDate(OpenDate) + ' ' + this.convertTime12to24(OpenTime)));
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Uploading = true;
         this.Crm_Service.CrmTickets_Create({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
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
