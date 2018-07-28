import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-activitytype-crmsettings',
  templateUrl: './model-activitytype-crmsettings.component.html',
  styleUrls: ['./model-activitytype-crmsettings.component.css']
})
export class ModelActivitytypeCrmsettingsComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;
   Uploading: Boolean = false;
   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b530ef333fc40064c0db31e';

   Form: FormGroup;
   constructor ( public bsModalRef: BsModalRef,
                 public Service: CrmSettingsService,
                 public Toastr: ToastrService
               ) {}
   ngOnInit() {
      this.onClose = new Subject();

      // If Create Activity Type
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
                                        Activity_Type: new FormControl('', {
                                        validators: Validators.required,
                                        asyncValidators: [ this.ActivityType_AsyncValidate.bind(this) ],
                                        updateOn: 'blur' } ),

               Company_Id: new FormControl(this.Company_Id, Validators.required),
               Created_By: new FormControl(this.User_Id, Validators.required),
            });
         }
      // If Edit Activity Type
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Activity_Type: new FormControl(this.Data.Activity_Type, { validators: Validators.required,
                                                                           asyncValidators: [ this.ActivityType_AsyncValidate.bind(this) ],
                                                                           updateOn: 'blur' } ),
               Activity_Type_Id: new FormControl(this.Data._id, Validators.required),
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

      ActivityType_AsyncValidate( control: AbstractControl ) {
        const Data = { Activity_Type: control.value, Company_Id: this.Company_Id, User_Id: this.User_Id  };
        let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
        Info = Info.toString();
        return this.Service.ActivityType_AsyncValidate({'Info': Info}).pipe(map( response => {
           const ReceivingData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
              return null;
           } else {
              return { ActivityStatus_NotAvailable: true };
           }
        }));
     }

   // Submit Activity Type
      submit() {
         if (this.Form.valid && !this.Uploading) {
           this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Activity_Type_Create({'Info': Info}).subscribe( response => {
              this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'New Activity Type Successfully Created'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
                this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Creating Activity Type!' });
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }
   // Update New Activity Type
      update() {
         if (this.Form.valid) {
          this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Activity_Type_Update({'Info': Info}).subscribe( response => {
              this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'Activity Type Successfully Updated' });
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417  && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                this.Toastr.NewToastrMessage( {  Type: 'Error',  Message: 'Error Not Identify!, Updating Activity Type!'} );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }


}
