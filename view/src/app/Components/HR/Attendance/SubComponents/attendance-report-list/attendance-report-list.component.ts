import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { ModelAttendanceReportCreateComponent } from '../../../../../models/HR/model-attendance-report-create/model-attendance-report-create.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { AttendanceService } from '../../../../../services/Hr/Attendance/attendance.service';
import { LoginService } from './../../../../../services/LoginService/login.service';



@Component({
  selector: 'app-attendance-report-list',
  templateUrl: './attendance-report-list.component.html',
  styleUrls: ['./attendance-report-list.component.css']
})
export class AttendanceReportListComponent implements OnInit {

      Loader: Boolean = false;
      _List: any[] = [];
      User_Id: any;
      User_Type: any;
      bsModalRef: BsModalRef;

      constructor(   private Toastr: ToastrService,
                     public Login_Service: LoginService,
                     public Service: AttendanceService,
                     private modalService: BsModalService
                  ) {
                     this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                     this.User_Type = this.Login_Service.LoginUser_Info()['_UserType'];
                     // Get Attendance Report List
                     const Data = { 'User_Id' : this.User_Id};
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Attendance_Report_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        this.Loader = false;
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                           console.log(DecryptedData);
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
                        } else if (response['status'] === 401 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                        } else {
                        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
                        }
                     });
                  }

   ngOnInit() {
   }
   CreateAttendanceReport() {
      const initialState = {
      Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelAttendanceReportCreateComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-lg' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            this._List.splice(0, 0, ResponseStatus.Response);
         }
      });
   }
   DeleteAttendanceReport(_index) {
      let text = 'Attendance Report';
      const data = this._List[_index];
      if (data['Payroll_Generated']) {
          text = 'Attendance Report also a Generated Payroll';
      }
      const initialState = {
         Text: text
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { Report_Id: this._List[_index]['_id'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Attendance_Report_Delete({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Loader = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List.splice(_index, 1);
                  this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Attendance Report Successfully Removed' });
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Attendance Report Delete Error!, But not Identify!' });
               }
            });
         }
      });
   }

}
