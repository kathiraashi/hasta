import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModelUserCreateUserManagementComponent } from './../../../../models/settings/user_management/model-user-create-user-management/model-user-create-user-management.component';
import { ConfirmationComponent } from '../../../Common-Components/confirmation/confirmation.component';

import { AdminService } from './../../../../services/Admin/admin.service';
import { LoginService } from './../../../../services/LoginService/login.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-management-list',
  templateUrl: './user-management-list.component.html',
  styleUrls: ['./user-management-list.component.css']
})
export class UserManagementListComponent implements OnInit {

   bsModalRef: BsModalRef;

   _List: any[] = [];
   User_Id: any;
   User_Type: any;

   constructor(
               private modalService: BsModalService,
               private Service: AdminService,
               private Login_Service: LoginService,
               private Toastr: ToastrService
            ) {
               //  Get Users List
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];

               const Data = { User_Id : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Users_List({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._List = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: response['Message'] } );
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                    this.Toastr.NewToastrMessage( { Type: 'Error', Message: response['Message'] } );
                  } else {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Users List Getting Error!, Error not Identify!' } );
                  }
               });
            }

   ngOnInit() {
   }

   CreateUser() {
      const initialState = { Type: 'Create' };
      this.bsModalRef = this.modalService.show(ModelUserCreateUserManagementComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
            this._List.splice(0, 0, response['Response']);
         }
      });
   }


   User_Deactivate(_index: any) {
      const initialState = {
         Heading: 'Confirmation',
         Text: 'Are you sure?',
         Text_Line: 'You want to Deactivate this User.'
      };
      this.bsModalRef = this.modalService.show(ConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { _Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.User_Deactivate({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List[_index].Active_Status = false;
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'User Deactivate Error!, But not Identify!' });
               }
            });
         }
      });
   }

   User_Activate(_index: any) {
      const initialState = {
         Heading: 'Confirmation',
         Text: 'Are you sure?',
         Text_Line: 'You want to Activate this User.'
      };
      this.bsModalRef = this.modalService.show(ConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { _Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.User_Activate({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List[_index].Active_Status = true;
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'User Activate Error!, But not Identify!' });
               }
            });
         }
      });
   }

}
