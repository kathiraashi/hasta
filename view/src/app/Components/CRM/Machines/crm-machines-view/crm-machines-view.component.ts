import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelTicketsCreateComponent } from '../../../../models/CRM/Machines/model-tickets-create/model-tickets-create.component';
import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-crm-machines-view',
  templateUrl: './crm-machines-view.component.html',
  styleUrls: ['./crm-machines-view.component.css']
})
export class CrmMachinesViewComponent implements OnInit {

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = true;
   _Data = {};
   Machine_Id;
   _TicketsList: any[] = [];

   bsModalRef: BsModalRef;

   constructor(
               private modalService: BsModalService,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public router: Router,
               private active_route: ActivatedRoute
            ) {
               this.active_route.url.subscribe((u) => {
                  this.Machine_Id = this.active_route.snapshot.params['Machine_Id'];
                  const Data = { 'Machine_Id': this.Machine_Id,  'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Crm_Service.CrmMachine_View({ 'Info': Info }).subscribe( response => {
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
                  this.Crm_Service.CrmMachineBasedTickets_List({ 'Info': Info }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._TicketsList = DecryptedData;
                        console.log(DecryptedData);
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

   CreateTickets() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelTicketsCreateComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
   DeleteTickets() {
      const initialState = {
         Text: 'Tickets'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }

}
