import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

@Component({
  selector: 'app-model-user-create-user-management',
  templateUrl: './model-user-create-user-management.component.html',
  styleUrls: ['./model-user-create-user-management.component.css']
})
export class ModelUserCreateUserManagementComponent implements OnInit {

   onClose: Subject<any>;

   Type: String;
   Data;

   _UserTypes: any[] =  [];

   _ReportUsers: any[] =  [];

   _Permissions: any[] =  [];

   ShowReportsTo: Boolean = false;
   _AccessPermissions: any[] = [];

   User_Name_Changed: Boolean = false;
   UserNameValidated: Boolean = false;
   User_NameAvailable: Boolean = false;

   Company_Id = '5b3c66d01dd3ff14589602fe';

   Form: FormGroup;

  constructor(
               public bsModalRef: BsModalRef,
               public Service: AdminService,
               private Toastr: ToastrService
            ) {
               const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
               this.Service.UserTypes_List({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._UserTypes = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting User Types List!'
                        }
                     );
                  }
               });
               this.Service.UserTypeBased_SimpleUsersList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._ReportUsers = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting Simple Users List User Type Based!'
                        }
                     );
                  }
               });
               this.Service.UserTypeBased_PermissionsGroup_SimpleList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Permissions = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: ResponseData['Message']
                        }
                     );
                  } else {
                     this.Toastr.NewToastrMessage(
                        {  Type: 'Error',
                           Message: 'Error Not Identify!, Getting Simple Permission Group List User Type Based!'
                        }
                     );
                  }
               });
            }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         Company_Id: new FormControl('5b3c66d01dd3ff14589602fe'),
         User_Id: new FormControl('5b3c7268f838b31bc89e7c8c'),
         User_Name: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [this.UserNameAsyncValidate.bind(this)],
                                          updateOn: 'blur' }),
         User_Password: new FormControl('', Validators.required),
         Name: new FormControl('', Validators.required ),
         Email: new FormControl('', [Validators.required, Validators.email]),
         Phone: new FormControl(''),
         User_Type: new FormControl(null, Validators.required),
         Reports_To: new FormControl(null),
         AccessPermissions_Groups: new FormControl(null, Validators.required)
      });
   }

   UserNameAsyncValidate( control: AbstractControl ) {
      const Data = { User_Name: control.value, Company_Id: this.Company_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.User_Name_Validate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { UserName_NotAvailable: true};
         }
      }));
   }

   UserType_Change() {
      const value = this.Form.controls['User_Type'].value;
      if (typeof value === 'object' && value !== null ) {
         if (value.User_Type  !== 'Sub Admin') {
               this.ShowReportsTo = true;
               this.Form.controls['Reports_To'].setValidators([Validators.required]);
               this.Form.updateValueAndValidity();
         } else {
            this.ShowReportsTo = false;
            this.Form.controls['Reports_To'].clearValidators();
            this.Form.controls['Reports_To'].setErrors(null);
            this.Form.controls['Reports_To'].reset();
         }
      } else {
         this.ShowReportsTo = false;
         this.Form.controls['Reports_To'].clearValidators();
         this.Form.controls['Reports_To'].setErrors(null);
         this.Form.controls['Reports_To'].reset();
         this.Form.controls['AccessPermissions_Groups'].reset();
         this.Form.updateValueAndValidity();
      }
   }

  submit() {
   if (this.Form.valid) {
      const Data = this.Form.value;
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.User_Create({'Info': Info}).subscribe( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status']) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.onClose.next({Status: true, Response: DecryptedData});
            this.bsModalRef.hide();
         } else if (response['status'] === 400 && !ReceivingData['Status']) {
            this.onClose.next({Status: false, Message: 'Bad Request Error!'});
            this.bsModalRef.hide();
         } else if (response['status'] === 417 && !ReceivingData['Status']) {
            this.onClose.next({Status: false, Message: 'Industry Type Query Error!'});
            this.bsModalRef.hide();
         } else {
            this.onClose.next({Status: false, Message: 'UnExpected Error!'});
            this.bsModalRef.hide();
         }
      });
   }
}

}
