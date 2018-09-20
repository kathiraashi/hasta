import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
import { LoginService } from './../../../../services/LoginService/login.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';


@Component({
  selector: 'app-model-machine-idle',
  templateUrl: './model-machine-idle.component.html',
  styleUrls: ['./model-machine-idle.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class ModelMachineIdleComponent implements OnInit {

   _Data: Object;

   DefaultMinDate = null;
   DefaultMinTime = null;

   _MinDate: Date = null;
   _MaxDate: Date = new Date();
   _MinTime = null;
   _MaxTime = null;
   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   User_Id;

  constructor(
            public bsModalRef: BsModalRef,
            private Toastr: ToastrService,
            public SettingsService: CrmSettingsService,
            public Crm_Service: CrmService,
            public Login_Service: LoginService
         ) {
            this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
         }

   ngOnInit() {
      this.onClose = new Subject();

      if (this._Data['Type'] === 'Create' ) {
         if (this._Data['Last_Idle_Info'] !== undefined ) {
            this.DefaultMinDate = this._Data['Last_Idle_Info']['Idle_CloseDate'] || null;
            this.DefaultMinTime = this._Data['Last_Idle_Info']['Idle_CloseTime'] || null;
         }
         this.Form = new FormGroup({
            Machine_Id: new FormControl(this._Data['Machine_Id'], Validators.required),
            Idle_Date: new FormControl(new Date(), Validators.required),
            Idle_Time: new FormControl(null, Validators.required),
            Description: new FormControl(''),
            User_Id: new FormControl(this.User_Id),
         });
         if (this.formatDate(this.DefaultMinDate) === this.formatDate(new Date())) {
            this._MinTime = this.DefaultMinTime;
            this._MaxTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
         }
      }
      if (this._Data['Type'] === 'Edit' ) {
         this.DefaultMinDate = this._Data['Idle_Info']['Idle_Date'];
         this.DefaultMinTime = this._Data['Idle_Info']['Idle_Time'];
         this.Form = new FormGroup({
            IdleTime_Id: new FormControl(this._Data['Idle_Info']['_id'], Validators.required),
            Idle_Date: new FormControl({ value: null, disabled: true}, Validators.required),
            Idle_Time: new FormControl({ value: this._Data['Idle_Info']['Idle_Time'], disabled: true}, Validators.required),
            Idle_CloseDate: new FormControl(new Date(), Validators.required),
            Idle_CloseTime: new FormControl(null, Validators.required),
            Description: new FormControl(this._Data['Idle_Info']['Description']),
            User_Id: new FormControl(this.User_Id),
         });
         if (this.formatDate(this.DefaultMinDate) === this.formatDate(new Date())) {
            this._MinTime = this.DefaultMinTime;
         }
         this.Form.controls['Idle_Date'].setValue(this.formatDate(this.DefaultMinDate));
      }
      this._MinDate = this.DefaultMinDate;
      this._MaxTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
   }

   formatDate(date) {
      const d = new Date(date);
      let month = '' + (d.getMonth() + 1);
      let day = '' + d.getDate();
      const year = d.getFullYear();
      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }
      return [day, month, year].join('-');
   }

   DateChange(value) {
      if (this.formatDate(this.DefaultMinDate) === this.formatDate(value)) {
         this._MinTime = this.DefaultMinTime;
      } else {
         this._MinTime  = null;
      }
      if (this.formatDate(new Date()) === this.formatDate(value)) {
         this._MaxTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      } else {
         this._MaxTime  = null;
      }
   }

   NotAllow(): boolean {return false; }

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
            if (modifier === 'pm') { newTime[0] = parseInt(newTime[0], 10) + 12; }
            return newTime[0] + ':' + newTime[1] + ':00';
         } else {
            return '00:00:00';
         }
      }

      if (this.Form.valid) {
         this.Form.controls['Idle_Time'].setValue(this.Form.controls['Idle_Time'].value.toLowerCase());
         const Idle_Date = this.Form.controls['Idle_Date'].value;
         const Idle_Time = this.Form.controls['Idle_Time'].value;
         this.Form.controls['Idle_Date'].setValue(new Date(formatDate(Idle_Date) + ' ' + convertTime12to24(Idle_Time)));

         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_IdleTime_Create({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Machine Idle Successfully Created' });
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
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'New Machine Idle Create Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

   Update() {

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
            if (modifier === 'pm') { newTime[0] = parseInt(newTime[0], 10) + 12; }
            return newTime[0] + ':' + newTime[1] + ':00';
         } else {
            return '00:00:00';
         }
      }

      if (this.Form.valid) {
         this.Form.controls['Idle_CloseTime'].setValue(this.Form.controls['Idle_CloseTime'].value.toLowerCase());
         const Idle_CloseDate = this.Form.controls['Idle_CloseDate'].value;
         const Idle_CloseTime = this.Form.controls['Idle_CloseTime'].value;
         this.Form.controls['Idle_CloseDate'].setValue(new Date(formatDate(Idle_CloseDate) + ' ' + convertTime12to24(Idle_CloseTime)));

         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_IdleTime_Update({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Machine Idle Details Successfully Updated' });
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
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Idle Update Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }
}
