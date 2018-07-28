import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelUserCreateUserManagementComponent } from './../../../../models/settings/user_management/model-user-create-user-management/model-user-create-user-management.component';
import { DeleteConfirmationComponent } from '../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { AdminService } from './../../../../services/Admin/admin.service';
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

   constructor(
               private modalService: BsModalService,
               private Service: AdminService,
               private Toastr: ToastrService
            ) {
               //  Get Industry Type List
               const Data = { 'Company_Id' : '5b3c66d01dd3ff14589602fe' };
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

   DeleteUser() {
      const initialState = { Type: 'Delete' };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
   }
}
