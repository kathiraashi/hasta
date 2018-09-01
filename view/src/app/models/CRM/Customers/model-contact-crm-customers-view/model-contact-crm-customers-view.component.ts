import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { map } from 'rxjs/operators';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-model-contact-crm-customers-view',
  templateUrl: './model-contact-crm-customers-view.component.html',
  styleUrls: ['./model-contact-crm-customers-view.component.css']
})
export class ModelContactCrmCustomersViewComponent implements OnInit {

   _Data: Object;
   _Contact_Roles: any[] = [];
   _Titles: any[] = ['Mr', 'Ms', 'Mrs'];
   _Contact_Info: Object;

   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   User_Id;

   constructor( public bsModalRef: BsModalRef,
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }

   ngOnInit() {
      this.onClose = new Subject();

      if (this._Data['Type'] === 'Create' || this._Data['Type'] === 'Edit') {
         const Data = { 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.SettingsService.Contact_Role_SimpleList({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Contact_Roles = DecryptedData;
               setTimeout(() => {
                  this.Form.controls['ContactRole'].setValue(this._Data['Contact_Info']['ContactRole']);
               }, 500);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Contact Roles Simple List Getting Error!, But not Identify!' });
            }
         });
      }
      if (this._Data['Type'] === 'Create' ) {
         this.Form = new FormGroup({
            Title: new FormControl(null, Validators.required),
            Name: new FormControl('', Validators.required),
            Email: new FormControl(''),
            Mobile: new FormControl(''),
            ContactRole: new FormControl(null),
            JobPosition: new FormControl(''),
            Customer: new FormControl(this._Data['Customer_Id'], Validators.required),
            User_Id: new FormControl(this.User_Id),
         });
      }
      if (this._Data['Type'] === 'View') {
         this._Contact_Info = this._Data['Contact_Info'];
      }
      if (this._Data['Type'] === 'Edit') {
         this.Form = new FormGroup({
            Contact_Id: new FormControl(this._Data['Contact_Info']['_id'], Validators.required),
            Title: new FormControl(this._Data['Contact_Info']['Title'], Validators.required),
            Name: new FormControl(this._Data['Contact_Info']['Name'], Validators.required ),
            Email: new FormControl(this._Data['Contact_Info']['Email']),
            Mobile: new FormControl(this._Data['Contact_Info']['Mobile']),
            ContactRole: new FormControl(null),
            JobPosition: new FormControl(this._Data['Contact_Info']['JobPosition']),
            User_Id: new FormControl(this.User_Id),
         });
      }

   }

   onSubmit() {
      if (this._Data['Type'] === 'Create') {
         this.Submit();
      }
      if (this._Data['Type'] === 'Edit') {
         this.Update();
      }
   }

   Submit() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmCustomerContact_Create({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Machine Successfully Created' });
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
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Machine Getting Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

   Update() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmCustomerContact_Update({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Machine Details Successfully Updated' });
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
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Machine Getting Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
