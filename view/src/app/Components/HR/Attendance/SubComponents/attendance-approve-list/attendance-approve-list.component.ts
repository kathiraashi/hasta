import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import * as CryptoJS from 'crypto-js';

import { AttendanceService } from './../../../../../services/Hr/Attendance/attendance.service';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

import { ConfirmationComponent } from '../../../../Common-Components/confirmation/confirmation.component';


@Component({
  selector: 'app-attendance-approve-list',
  templateUrl: './attendance-approve-list.component.html',
  styleUrls: ['./attendance-approve-list.component.css']
})
export class AttendanceApproveListComponent implements OnInit {

   Loader: Boolean = false;
   _List: any[] = [];
   User_Id: any;
   User_Type: any;
   bsModalRef: BsModalRef;

   constructor(
      private Toastr: ToastrService,
      public Login_Service: LoginService,
      public Service: AttendanceService,
      private modalService: BsModalService
      ) {
         this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
         this.User_Type = this.Login_Service.LoginUser_Info()['_UserType'];
         // Get Attendance List
         const Data = { 'User_Id' : this.User_Id};
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Complete_Attendance_Pending_Log({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._List = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
            }
         });
      }

      Approve(_index: any) {
         const initialState = {
            Heading: 'Confirmation',
            Text: 'Are you sure?',
            Text_Line: 'You want to Approve this Attendance.'
         };
         this.bsModalRef = this.modalService.show(ConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
            if (ResponseStatus['Status']) {
               const Data = { Attendance_Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Attendance_Approve({ 'Info': Info }).subscribe(response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     this._List[_index].Attendance_Status = 'Approved';
                  } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Attendance Approve Error!, But not Identify!' });
                  }
               });
            }
         });
      }

      Reject(_index: any) {
         const initialState = {
            Heading: 'Confirmation',
            Text: 'Are you sure?',
            Text_Line: 'You want to Reject this Attendance.'
         };
         this.bsModalRef = this.modalService.show(ConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
            if (ResponseStatus['Status']) {
               const Data = { Attendance_Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Attendance_Reject({ 'Info': Info }).subscribe(response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     this._List[_index].Attendance_Status = 'Rejected';
                  } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Attendance Rejected Error!, But not Identify!' });
                  }
               });
            }
         });
      }


   ngOnInit() {
   }

}
