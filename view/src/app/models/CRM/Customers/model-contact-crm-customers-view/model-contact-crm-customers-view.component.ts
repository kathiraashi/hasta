import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';


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

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';

   constructor( public bsModalRef: BsModalRef,
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService
            ) {

            }

   ngOnInit() {
      this.onClose = new Subject();

      if (this._Data['Type'] === 'Create') {

         const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.SettingsService.Contact_Role_SimpleList({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Contact_Roles = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Contact Roles Simple List Getting Error!, But not Identify!' });
            }
         });

         this.Form = new FormGroup({
            Title: new FormControl(null, Validators.required),
            Name: new FormControl('', Validators.required),
            Email: new FormControl(''),
            Mobile: new FormControl(''),
            ContactRole: new FormControl(null),
            JobPosition: new FormControl(''),
            Company_Id: new FormControl(this.Company_Id),
            Customer: new FormControl(this._Data['Customer_Id'], Validators.required),
            User_Id: new FormControl(this.User_Id),
         });
      }
      if (this._Data['Type'] === 'View') {
         this._Contact_Info = this._Data['Contact_Info'];
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
      console.log(this.Form);
   }

}
