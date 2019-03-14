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
  selector: 'app-model-earnings-hrsettings',
  templateUrl: './model-earnings-hrsettings.component.html',
  styleUrls: ['./model-earnings-hrsettings.component.css']
})
export class ModelEarningsHrsettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Data;
   Uploading: Boolean = false;
   User_Id;
   Form: FormGroup;
   constructor (  public bsModalRef: BsModalRef,
      public Service: HrSettingsService,
      public Toastr: ToastrService,
      public Login_Service: LoginService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               }
   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Earnings
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
            Earnings_Type: new FormControl('', {
                                                validators: Validators.required,
                                                asyncValidators: [ this.Earnings_AsyncValidate.bind(this) ],
                                                updateOn: 'blur' } ),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit New Earnings
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
            Earnings_Type: new FormControl(this.Data.Earnings_Type, {validators: Validators.required,
                                                                  asyncValidators: [ this.Earnings_AsyncValidate.bind(this) ],
                                                                  updateOn: 'blur' } ),
               Earnings_Type_Id: new FormControl(this.Data._id, Validators.required),
               Modified_By: new FormControl(this.User_Id, Validators.required)
            });
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


   Earnings_AsyncValidate( control: AbstractControl ) {
      const Data = { Earnings_Type: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Earnings_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Earnings_NotAvailable: true };
         }
      }));
   }

   // Submit New Earnings
   submit() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Earnings_Create({'Info': Info}).subscribe( response => {
            this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Earnings Type Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417  && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
         }  else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Earnings!'} );
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }
   // Update New Earnings
      update() {
         if (this.Form.valid) {
         this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Earnings_Update({'Info': Info}).subscribe( response => {
            this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'Earnings Successfully Updated'} );
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417  && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
                  this.bsModalRef.hide();
               }  else if (response['status'] === 401 && !ReceivingData['Status']) {
               this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
            } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating Earnings!' });
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
