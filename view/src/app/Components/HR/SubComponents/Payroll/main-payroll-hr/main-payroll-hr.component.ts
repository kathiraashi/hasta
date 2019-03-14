import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import * as CryptoJS from 'crypto-js';

import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { PayrollService } from '../../../../../services/Hr/Payroll/payroll.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-main-payroll-hr',
  templateUrl: './main-payroll-hr.component.html',
  styleUrls: ['./main-payroll-hr.component.css']
})
export class MainPayrollHrComponent implements OnInit {

   Loader: Boolean = false;
   _List: any[] = [];
   User_Id: any;
   User_Type: any;
   bsModalRef: BsModalRef;

   constructor(
               private Toastr: ToastrService,
               public Login_Service: LoginService,
               public Service: PayrollService,
               private modalService: BsModalService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['_UserType'];
               // Get Attendance Report List
               const Data = { 'User_Id' : this.User_Id};
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Payroll_List({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._List = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
                  } else {
                     this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
                  }
               });
            }

   ngOnInit() {
   }


   DeletePayroll(_index) {
      const initialState = {
         Text: 'Payroll'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
      this.bsModalRef.content.onClose.subscribe(ResponseStatus => {
         if (ResponseStatus['Status']) {
            const Data = { Payroll_Id: this._List[_index]['_id'], Report_Id: this._List[_index]['Attendance_Report'], 'User_Id' : this.User_Id };
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Payroll_List({ 'Info': Info }).subscribe(response => {
               const ResponseData = JSON.parse(response['_body']);
               this.Loader = false;
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  this._List.splice(_index, 1);
                  this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Payroll Successfully Removed' });
               } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Payroll Delete Error!, But not Identify!' });
               }
            });
         }
      });
   }

}
