import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-tickets-edit',
  templateUrl: './tickets-edit.component.html',
  styleUrls: ['./tickets-edit.component.css']
})
export class TicketsEditComponent implements OnInit {

   Ticket_Info: Object;

   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   User_Id;

   constructor( public bsModalRef: BsModalRef,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         TicketId: new FormControl(this.Ticket_Info['TicketId'], Validators.required),
         Ticket_Id: new FormControl(this.Ticket_Info['_id'], Validators.required),
         Issue: new FormControl(this.Ticket_Info['Issue'], Validators.required),
         User_Id: new FormControl(this.User_Id),
      });
   }

   Update() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmTickets_Update({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Ticket Details Successfully Updated' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Ticket Getting Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
