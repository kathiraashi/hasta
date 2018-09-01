import { Component, OnInit, Input } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';

import { ModelContactCrmCustomersViewComponent } from '../../../../../../models/CRM/Customers/model-contact-crm-customers-view/model-contact-crm-customers-view.component';
import { DeleteConfirmationComponent } from '../../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { LoginService } from './../../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-contact-crm-customers-view',
  templateUrl: './contact-crm-customers-view.component.html',
  styleUrls: ['./contact-crm-customers-view.component.css']
})
export class ContactCrmCustomersViewComponent implements OnInit {

   @Input() CustomerData: Object;

   User_Id;
   User_Type;

   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;

   constructor(
               private modalService: BsModalService,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
                }

   ngOnInit() {
      const Data = {Customer_Id: this.CustomerData['_id'], 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmCustomerContact_List({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Contact List Getting Error!, But not Identify!' });
         }
      });
   }

   CreateContact() {
      const initialState = {
         _Data: { Customer_Id: this.CustomerData['_id'], Type: 'Create' }
      };
      this.bsModalRef = this.modalService.show(ModelContactCrmCustomersViewComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
           this._List.splice(0, 0, response['Response']);
         }
      });
   }
   ViewContact(_index) {
      const initialState = {
         _Data: {
         Contact_Info: this._List[_index],
         Type: 'View'
         }
      };
      this.bsModalRef = this.modalService.show(ModelContactCrmCustomersViewComponent, Object.assign({initialState}, { class: 'modal-md' }));
   }
   EditContact(_index) {
      const initialState = {
         _Data: { Contact_Info: this._List[_index], Type: 'Edit' }
      };
      this.bsModalRef = this.modalService.show(ModelContactCrmCustomersViewComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
           this._List[_index] = response['Response'];
         }
      });
   }
   DeleteContact(_index) {
      const initialState = {
         Text: 'Contact'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { Contact_Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Crm_Service.CrmCustomerContact_Delete({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Loader = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List.splice(_index, 1);
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Contact Delete Error!, But not Identify!' });
               }
            });
         }
      });
   }
}
