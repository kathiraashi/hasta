import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';


@Component({
  selector: 'app-model-tickets-activity-create',
  templateUrl: './model-tickets-activity-create.component.html',
  styleUrls: ['./model-tickets-activity-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class ModelTicketsActivityCreateComponent implements OnInit {

  _TicketData: String;

  _Statuses: any[] = [  {Type: 'Type_1', Value: 'Opened'},
                        {Type: 'Type_2', Value: 'Problem Identified'},
                        {Type: 'Type_3', Value: 'Spare Ordered / Waiting for Spare'},
                        {Type: 'Type_4', Value: 'Spare Received'},
                        {Type: 'Type_5', Value: 'Work Started'},
                        {Type: 'Type_6', Value: 'In Progress'},
                        {Type: 'Type_7', Value: 'In Testing'},
                        {Type: 'Type_8', Value: 'Completed'},
                        {Type: 'Type_9', Value: 'Closed'} ];
  _Contacts: any[] =  [];
  _Customers: any[] = [];
  _Machines: any[] = [];

  _ShowEndDateTime: Boolean = false;

  Form: FormGroup;
  _Data: Object;
  Type: String;

  Uploading: Boolean = false;
  onClose: Subject<any>;

  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';


   constructor(
               public bsModalRef: BsModalRef,
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService
            ) {
            }

   ngOnInit() {
      this.onClose = new Subject();

      this._Customers.push(this._Data['Customer']);
      this._Machines.push(this._Data['Machine']);
      this.Form = new FormGroup({
         Ticket_Id: new FormControl({value : this._Data['TicketId'], disabled: true}, Validators.required),
         TicketId: new FormControl({value : this._Data['_id'], disabled: true}, Validators.required),
         Machine: new FormControl({value : null, disabled: true}, Validators.required),
         Customer: new FormControl({value: null, disabled: true}, Validators.required),
         Contact: new FormControl(null),
         Employee: new FormControl(null),
         StartDate: new FormControl(new Date(), Validators.required),
         StartTime: new FormControl(new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }), Validators.required),
         EndDate: new FormControl(),
         EndTime: new FormControl(null),
         Status: new FormControl(null, Validators.required),
         Description: new FormControl(''),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
      });

      setTimeout(() => {
         this.Form.controls['Machine'].setValue(this._Data['Machine']);
         this.Form.controls['Customer'].setValue(this._Data['Customer']);
      }, 500);

      const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id, Customer_Id: this._Data['Customer']['_id'] };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmCustomerContact_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Contacts = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Customer Contacts Simple List Getting Error!, But not Identify!' });
         }
      });


      if (this._Data['CurrentStatus'] && typeof this._Data['CurrentStatus'] === 'object' && Object.keys(this._Data['CurrentStatus']).length === 2) {
         if (this._Data['CurrentStatus']['Type'] === 'Type_0') {
            this._Statuses = this._Statuses.slice(0, 1);
         } else {
            this._Statuses.splice(0, 1);
         }
         if (this._Data['CurrentStatus']['Type'] === 'Type_3') {
            this._Statuses = this._Statuses.slice(2, 3);
         } else if (this._Data['CurrentStatus']['Type'] !== 'Type_4') {
            this._Statuses.splice(2, 1);
         }
         if (this._Data['CurrentStatus']['Type'] === 'Type_4') {
            this._Statuses = this._Statuses.slice(1, 4);
            this._Statuses.splice(1, 1);
         } else {
            this._Statuses.splice(2, 1);
         }
      } else {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Technical Error!' });
         this.onClose.next({Status: false});
         this.bsModalRef.hide();
      }
   }

   NotAllow(): boolean {return false; }

   ChangeStatus() {
      const Status = this.Form.controls['Status'].value;
      if (Status !== null && typeof Status === 'object' && Object.keys(Status).length === 2) {
         if (Status['Type'] === 'Type_2' || Status['Type'] === 'Type_6' || Status['Type'] === 'Type_7') {
            this._ShowEndDateTime = true;
         } else {
            this._ShowEndDateTime = false;
         }
      } else {
         this._ShowEndDateTime = false;
         this.Form.controls['EndDate'].setValue(null);
         this.Form.controls['EndTime'].setValue(null);
      }
   }

   Submit() {

      function formatDate(date) {
         const d = new Date(date);
         let month = '' + (d.getMonth() + 1);
         let day = '' + d.getDate();
         const year = d.getFullYear();
         if (month.length < 2) { month = '0' + month; }
         if (day.length < 2) { day = '0' + day; }
         return [year, month, day].join('-');
      }

      function convertTime12to24(time12h) {
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
      if (this.Form.valid && !this.Uploading) {
         const StartDate = this.Form.controls['StartDate'].value;
         const StartTime = this.Form.controls['StartTime'].value;
         this.Form.controls['StartDate'].setValue(new Date(formatDate(StartDate) + ' ' + convertTime12to24(StartTime)));
         if (this._ShowEndDateTime) {
            if (this.Form.controls['EndDate'].value !== null) {
               const EndDate = this.Form.controls['EndDate'].value;
               const EndTime = this.Form.controls['EndTime'].value;
               this.Form.controls['StartDate'].setValue(new Date(formatDate(EndDate) + ' ' + convertTime12to24(EndTime)));
            }
         }
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmTicketActivities_Create({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Activity Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Ticket Activity Getting Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
