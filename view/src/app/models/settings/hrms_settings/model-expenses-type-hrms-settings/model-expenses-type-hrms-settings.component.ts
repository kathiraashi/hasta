import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-expenses-type-hrms-settings',
  templateUrl: './model-expenses-type-hrms-settings.component.html',
  styleUrls: ['./model-expenses-type-hrms-settings.component.css']
})
export class ModelExpensesTypeHrmsSettingsComponent implements OnInit {

 onClose: Subject<any>;

   Type: string;
   Data;

   Uploading: Boolean = false;
   Form: FormGroup;
   User_Id;

   constructor( public bsModalRef: BsModalRef,
                public Service: HrmsSettingsServiceService,
                private Toastr: ToastrService,
                public Login_Service: LoginService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Expenses Type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Expenses_Type: new FormControl( '', {  validators: Validators.required,
                                                      asyncValidators: [this.ExpensesType_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' } ),
               Created_By: new FormControl( this.User_Id, Validators.required ),
            });
         }
      // If Edit New Expenses Type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Expenses_Type: new FormControl(this.Data.Expenses_Type, { validators: Validators.required,
                                                                        asyncValidators: [this.ExpensesType_AsyncValidate.bind(this)],
                                                                        updateOn: 'blur' }),
               Expenses_Type_Id: new FormControl(this.Data._id, Validators.required),
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

      ExpensesType_AsyncValidate( control: AbstractControl ) {
         const Data = { Expenses_Type: control.value, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.ExpensesType_AsyncValidate({'Info': Info}).pipe(map( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { ExpensesType_NotAvailable: true};
            }
         }));
      }

   // Submit New Expenses Type
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Expenses_Type_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Expenses Type Successfully Created' } );
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Error Not Identify!, Creating Expenses Type!' } );
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update New Expenses Type
      update() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Expenses_Type_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( { Type: 'Success', Message: 'Expenses Type Successfully Updated' } );
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else {
                  this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Error Not Identify!, Updating Expenses Type!' });
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
