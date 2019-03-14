import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal';

import * as CryptoJS from 'crypto-js';

import { HrSettingsService } from './../../../../services/settings/HrSettings/hr-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../services/LoginService/login.service';


@Component({
  selector: 'app-model-holiday-hrsettings',
  templateUrl: './model-holiday-hrsettings.component.html',
  styleUrls: ['./model-holiday-hrsettings.component.css']
})
export class ModelHolidayHrsettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Data;
   Uploading: Boolean = false;
   User_Id;
   Form: FormGroup;
   MinDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1, 0, 0, 0, 0);
   MaxDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 0, 0, 0, 0);
   defaultDate: Date = new Date();

   constructor (  public bsModalRef: BsModalRef,
      public Service: HrSettingsService,
      public Toastr: ToastrService,
      public Login_Service: LoginService
   ) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
   }
   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Department
      if (this.Type === 'Create') {
         this.Form = new FormGroup({
            Month: new FormControl(null, { validators: Validators.required,
                                          asyncValidators: [ this.Month_AsyncValidate.bind(this) ]} ),
            Dates: new FormControl(null),
            Created_By: new FormControl(this.User_Id, Validators.required),
         });
      }
      // If Edit New Department
      if (this.Type === 'Edit') {
         this.Form = new FormGroup({
            Month: new FormControl(null, { validators: Validators.required,
                                                               asyncValidators: [ this.Month_AsyncValidate.bind(this) ]} ),
            Dates: new FormControl(null),
            Holiday_Id: new FormControl(this.Data._id, Validators.required),
            Modified_By: new FormControl(this.User_Id, Validators.required)
         });
         console.log(this.Data);
         this.Form.controls['Month'].setValue(new Date(this.Data.Month));
         this.MinDate = new Date(this.Data.Month);
         this.defaultDate = new Date(this.Data.Month);
         this.MaxDate = new Date(this.MinDate.getFullYear(), this.MinDate.getMonth() + 1, 0);
         setTimeout(() => {
            if (this.Data.Dates !== null) {
               this.Data.Dates = this.Data.Dates.map( obj => new Date(obj) );
               this.Form.controls['Dates'].setValue(this.Data.Dates);
            } else {

            }
         }, 500);
         console.log(this.Form);
      }
   }

   MonthChanged(_event) {
      if (this.MinDate.valueOf() !== new Date(_event).valueOf()) {
         this.MinDate = _event;
         const TempDate = _event;
         this.MaxDate = new Date(TempDate.getFullYear(), TempDate.getMonth() + 1, 0);
         this.defaultDate = _event;
         this.Form.controls['Dates'].setValue([this.defaultDate]);
         this.Form.controls['Dates'].updateValueAndValidity();
         setTimeout(() => {
            this.Form.controls['Dates'].setValue(null);
            this.Form.controls['Dates'].updateValueAndValidity();
         }, 100);
      }
   }
   // onSubmit Function
   onSubmit() {
      if (this.Type === 'Create') {
         this.submit();
      }
      if (this.Type === 'Edit') {
         this.update();
      }
   }

   Month_AsyncValidate( control: AbstractControl ) {
      const Data = { Month: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Holiday_AsyncValidate({'Info': Info}).pipe(map( response => {
         if (this.Type === 'Edit' && new Date(control.value).valueOf() === new Date(this.Data.Month).valueOf()) {
            return null;
         } else {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { Month_NotAvailable: true };
            }
         }
      }));
   }


   // Submit New Department
   submit() {
      if (this.Form.valid && !this.Uploading) {
      this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Holiday_Create({'Info': Info}).subscribe( response => {
         this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Holidays Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401  && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Department!'} );
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }
   // Update New Department
   update() {
      if (this.Form.valid) {
      this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Holiday_Update({'Info': Info}).subscribe( response => {
         this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Holidays Successfully Updated'} );
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
            this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
            this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Department!' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
