import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { HrService } from './../../../../services/Hr/hr.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { AdminService  } from './../../../../services/Admin/admin.service';
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

   _UserTypes: any[] =  ['Admin', 'Employee', 'Customer'];


   _Permissions: any[] =  [];

   ShowReportsTo: Boolean = false;
   _AccessPermissions: any[] = [];
   _EmployeeList;
   User_Name_Changed: Boolean = false;
   UserNameValidated: Boolean = false;
   User_NameAvailable: Boolean = false;

   User_Id;

   Form: FormGroup;

  constructor(
               public bsModalRef: BsModalRef,
               public Login_Service: LoginService,
               public Service: AdminService,
               private Toastr: ToastrService,
               private Hr_Service: HrService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               const Data = { User_Id : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Hr_Service.EmployeeList_WithoutUserManage({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._EmployeeList = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: response['Message'] } );
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                    this.Toastr.NewToastrMessage( { Type: 'Error', Message: response['Message'] } );
                  } else {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Employee List Getting Error!, Error not Identify!' } );
                  }
               });
            }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         User_Id: new FormControl(this.User_Id ),
         User_Name: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [this.UserNameAsyncValidate.bind(this)],
                                          updateOn: 'blur' }),
         User_Password: new FormControl('', Validators.required),
         Name: new FormControl('', Validators.required ),
         Email: new FormControl('', [Validators.required, Validators.email]),
         Phone: new FormControl(''),
         User_Type: new FormControl(null, Validators.required)
      });
   }

   UserNameAsyncValidate( control: AbstractControl ) {
      const Data = { User_Id: this.User_Id, User_Name: control.value };
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

   UserType_Change(_event) {
      if (_event === 'Employee') {
         this.Form.addControl('Employee',  new FormControl(null, Validators.required) );
      } else {
       this.Form.removeControl('Employee');
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
