import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as CryptoJS from 'crypto-js';

import { TicketsEditComponent } from '../../../../models/CRM/Tickets/tickets-edit/tickets-edit.component';
import { DeleteConfirmationComponent } from '../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-tickets-list',
  templateUrl: './crm-tickets-list.component.html',
  styleUrls: ['./crm-tickets-list.component.css']
})
export class CrmTicketsListComponent implements OnInit {

   User_Id;
   User_Type;
   If_Employee;
   Loader: Boolean = true;

   _List: any[] = [];

   bsModalRef: BsModalRef;

   constructor(
               private modalService: BsModalService,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public router: Router,
               public Login_Service: LoginService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
               this.If_Employee = this.Login_Service.LoginUser_Info()['Employee'];
               const Data = {'User_Id' : this.User_Id, Customers: this.If_Employee };
               if (this.User_Type === 'Employee') {
                  Data.Customers = this.If_Employee['Customers'];
               }
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Crm_Service.CrmTickets_List({ 'Info': Info }).subscribe( response => {
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
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Customer Getting Error!, But not Identify!' });
                  }
               });
            }

  ngOnInit() {
  }

   EditTicket(_index) {
      const initialState = {
         Ticket_Info: this._List[_index]
      };
      this.bsModalRef = this.modalService.show(TicketsEditComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-md' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
         this._List[_index] = response['Response'];
         }
      });
   }


   DeleteTicket(_index) {
      const initialState = {
         Text: 'Ticket and Related Ticket Activities'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { Ticket_Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Crm_Service.CrmTickets_Delete({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Loader = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List.splice(_index, 1);
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Ticket Delete Error!, But not Identify!' });
               }
            });
         }
      });
   }

}
