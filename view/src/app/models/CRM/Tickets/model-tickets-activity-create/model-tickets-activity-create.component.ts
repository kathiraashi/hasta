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

  _Statuses: any[] = [  'Opened',
                        'Problem Identified',
                        'Spare Ordered / Waiting for Spare',
                        'Spare Received',
                        'In Progress',
                        'In Testing',
                        'Completed',
                        'Closed' ];
  _Contacts: any[] =  [];
  _Customers: any[] = [];
  _Machines: any[] = [];

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
   }

   NotAllow(): boolean {return false; }

   Submit() {
      if (this.Form.valid && !this.Uploading) {
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
