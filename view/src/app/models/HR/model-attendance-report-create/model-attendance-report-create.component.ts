import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
       const month = date.toLocaleString('en-us', { month: 'short' });
       const year = date.getFullYear();
       return `${month} ${year}`;
   }
}
import {MatDatepicker} from '@angular/material/datepicker';

import * as CryptoJS from 'crypto-js';

import { HrService } from './../../../services/Hr/hr.service';
import { AttendanceService } from './../../../services/Hr/Attendance/attendance.service';
import { LoginService } from './../../../services/LoginService/login.service';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';


@Component({
  selector: 'app-model-attendance-report-create',
  templateUrl: './model-attendance-report-create.component.html',
  styleUrls: ['./model-attendance-report-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
  encapsulation: ViewEncapsulation.None
})
export class ModelAttendanceReportCreateComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   User_Id: any;
   Loader: Boolean = true;
   Uploading: Boolean = false;
   Valid: Boolean = false;

   MonthFor: Date = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
   maxDate: Date = new Date();

   Employee: any;

   Employees: any[] = [];

   From: Date;
   To: Date;

   Form: FormGroup;

   constructor(public bsModalRef: BsModalRef,
               public Login_Service: LoginService,
               public Toastr: ToastrService,
               public Service: HrService,
               public Attendance_Service: AttendanceService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               const Data = {'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Employee_SimpleList({ 'Info': Info }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this.Employees = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Employees List Getting Error!, But not Identify!' });
                  }
               });
            }


   ngOnInit() {
      this.onClose = new Subject();
      this.From = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), 1);
      if (new Date().getMonth() === this.MonthFor.getMonth()) {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), new Date().getDate());
      } else {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth() + 1, 0);
      }
   }

   MonthChange() {
      this.Valid = false;
      this.From = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), 1);
      if (new Date().getMonth() === this.MonthFor.getMonth()) {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth(), new Date().getDate());
      } else {
         this.To = new Date(this.MonthFor.getFullYear(), this.MonthFor.getMonth() + 1, 0);
      }
      this.ValidateDatas();
   }

   ValidateDatas() {
      this.Valid = false;
      if (this.Employee !== undefined && this.Employee !== null && this.Employee !== '') {
         const Data = { Employee: this.Employee, Month: this.MonthFor, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Attendance_Service.Attendance_Report_Validate({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               this.Valid = true;
            } else {
               this.Valid = false;
            }
         });
      }
   }


   chosenMonthHandler(event, datepicker: MatDatepicker<any>) {
      this.MonthFor = event;
      datepicker.close();
   }

   Submit() {
      if (this.Valid) {
         this.Uploading = true;
         const Data = { Employee: this.Employee, Month: this.MonthFor, From: this.From, To: this.To, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Attendance_Service.Attendance_Report_Create({'Info': Info}).subscribe( response => {
           this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage( {  Type: 'Success',  Message: 'Attendance Report Successfully Generated' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ReceivingData.Status) {
             this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
             this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Attendance Report Not Created!, Error Not Identify!,' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
