import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { TicketActivitiesEditComponent } from '../../../../models/CRM/Tickets/ticket-activities-edit/ticket-activities-edit.component';
import { ModelTicketsActivityCreateComponent } from '../../../../models/CRM/Tickets/model-tickets-activity-create/model-tickets-activity-create.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-tickets-view',
  templateUrl: './crm-tickets-view.component.html',
  styleUrls: ['./crm-tickets-view.component.css']
})
export class CrmTicketsViewComponent implements OnInit {

   User_Id;
   User_Type;

   Loader: Boolean = true;
   _Data = {};
   Ticket_Id;
   _ActivityList: any[] = [];

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService,
              private Toastr: ToastrService,
              public Crm_Service: CrmService,
              public router: Router,
              private active_route: ActivatedRoute,
              public Login_Service: LoginService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
               this.active_route.url.subscribe((u) => {
                  this.Ticket_Id = this.active_route.snapshot.params['Ticket_Id'];
                  const Data = { 'Ticket_Id': this.Ticket_Id, 'User_Id' : this.User_Id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Crm_Service.CrmTickets_View({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Data = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Data Getting Error!, But not Identify!' });
                     }
                  });
                  this.Crm_Service.CrmTicketActivities_List({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._ActivityList = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Data Getting Error!, But not Identify!' });
                     }
                  });
               });
            }

   ngOnInit() {
   }

   CreateTicketsActivity() {
      const MinDate = this._Data['TicketOpenDate'];
      const MinTime = this._Data['TicketOpenTime'];
      // if (this._ActivityList.length > 0) {
      //    MinDate = this._ActivityList[0]['StartDate'];
      //    MinTime = this._ActivityList[0]['StartTime'];
      // }
      let Contact = null;
      if (this._ActivityList.length > 0) {
         Contact = this._ActivityList[0].Contact;
      }
      let Employee = null;
      if (this._ActivityList.length > 0) {
         Employee = this._ActivityList[0].Employee;
      }
      const initialState = {
         MinDate: new Date(MinDate),
         MinTime: MinTime.toLowerCase(),
         _Contact: Contact,
         _Employee: Employee,
         _Data: this._Data,
         Type: 'Create',
         Previous_Date: new Date(MinDate),
      };
      this.bsModalRef = this.modalService.show(ModelTicketsActivityCreateComponent, Object.assign({initialState}, {ignoreBackdropClick: true,  class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
           this._ActivityList.splice(0, 0, response['Response']);
           this._Data['CurrentStatus'] = response['Response']['Status'];
         }
      });
   }
   ViewTicketsActivity() {
      const initialState = {
         Type: 'View'
      };
      this.bsModalRef = this.modalService.show(ModelTicketsActivityCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   EditTicketActivity(_index) {
      const initialState = {
         Activity_Info: this._ActivityList[_index]
      };
      this.bsModalRef = this.modalService.show(TicketActivitiesEditComponent, Object.assign({initialState}, { ignoreBackdropClick: true,  class: 'modal-md' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response['Status']) {
         this._ActivityList[_index] = response['Response'];
         }
      });
   }
   DeleteTicketsActivity(_index) {
      const initialState = {
         Text: 'Ticket Activity'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { TicketActivity_Id: this._ActivityList[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Crm_Service.CrmTicketActivities_Delete({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Loader = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._ActivityList.splice(_index, 1);
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Ticket Activity Delete Error!, But not Identify!' });
               }
            });
         }
      });
   }
}
