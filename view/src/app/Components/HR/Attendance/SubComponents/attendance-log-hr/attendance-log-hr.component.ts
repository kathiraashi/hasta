import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';

import { AttendanceService } from './../../../../../services/Hr/Attendance/attendance.service';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

import { ModelAttendanceLogCreateComponent } from '../../../../../models/HR/model-attendance-log-create/model-attendance-log-create.component';

@Component({
  selector: 'app-attendance-log-hr',
  templateUrl: './attendance-log-hr.component.html',
  styleUrls: ['./attendance-log-hr.component.css']
})
export class AttendanceLogHrComponent implements OnInit {

   Loader: Boolean = false;
   _List: any[] = [];
   User_Id;
   User_Type;
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
         this.Service.Complete_Attendance_Log({'Info': Info}).subscribe( response => {
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

   CreateAttendanceLog() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelAttendanceLogCreateComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(response => {
         if (response.Status) {
            this._List.splice(0, 0, response.Response);
         }
      });
   }


  ngOnInit() {
  }

}
