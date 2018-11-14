import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../services/LoginService/login.service';
import { HrService } from './../../../services/Hr/hr.service';
import { AttendanceService } from './../../../services/Hr/Attendance/attendance.service';
import { ToastrService } from '../../../services/common-services/toastr-service/toastr.service';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-model-attendance-log-create',
  templateUrl: './model-attendance-log-create.component.html',
  styleUrls: ['./model-attendance-log-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class ModelAttendanceLogCreateComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Form: FormGroup;
   Today: Date = new Date();
   _AttendanceTypes: any[] =  ['Present', 'Week Off'];
   _EmployeeList: any[] =  [];
   User_Id;
   User_Type;
   Employee_Id;
   Attendance_Date;
   IfEmployeeId;
   Uploading: Boolean = false;

   constructor(   public bsModalRef: BsModalRef,
                  private Toastr: ToastrService,
                  public hr_service: HrService,
                  public router: Router,
                  public Login_Service: LoginService,
                  public Attendance_Service: AttendanceService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
                  if (this.User_Type !== 'Employee') {
                     const Data = {'User_Id' : this.User_Id};
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     // Get Employee Simple List
                     this.hr_service.Employee_SimpleList({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._EmployeeList = DecryptedData;
                           if (this.User_Type === 'Employee' && this.IfEmployeeId) {
                              this.Form.controls['Employee'].setValue(this.IfEmployeeId);
                           }
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                        } else if (response['status'] === 401 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                        } else {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Employee Simple List Getting Error!, But not Identify!' });
                        }
                     });
                  }
               }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         Employee: new FormControl(null, Validators.required),
         Date: new FormControl({value: null, disabled: true }, {validators: Validators.required,
                                                               asyncValidators: [ this.Date_AsyncValidate.bind(this) ], }),
         Attendance: new FormControl({value: null, disabled: true} , {validators: Validators.required,
                                                                     asyncValidators: [ this.WeekOff_AsyncValidate.bind(this) ] }),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });
      if (this.User_Type === 'Employee') {
         const EmployeeId = this.Login_Service.LoginUser_Info()['Employee']['_id'];
         const EmployeeName = this.Login_Service.LoginUser_Info()['Employee']['EmployeeName'];
         this._EmployeeList.push({'EmployeeName': EmployeeName, '_id': EmployeeId });
         setTimeout(() => {
            if (EmployeeId !== undefined && EmployeeId !== null && EmployeeId !== '') {
               this.Employee_Id = EmployeeId;
               this.Form.controls['Employee'].setValue(EmployeeId);
               this.Form.controls['Employee'].disable();
               this.Form.controls['Date'].enable();
            }
         }, 500);
      }
   }

   NotAllow() {
      return false;
   }

   EmployeeChange(_event) {
      if (_event['_id'] !== undefined && _event['_id'] !== null && _event['_id'] !== '') {
         this.Employee_Id = _event['_id'];
         this.Form.controls['Date'].enable();
         this.Form.controls['Date'].setValue(null);
      } else {
         this.Form.controls['Date'].disable();
      }
   }

   DateChange(_event) {
      if (_event !== undefined && _event !== null && _event !== '') {
         this.Form.controls['Attendance'].enable();
         this.Form.controls['Attendance'].setValue(null);
         this.Attendance_Date = _event;
      } else {
         this.Form.controls['Attendance'].disable();
      }
   }

   Date_AsyncValidate( control: AbstractControl ) {
      const Data = { Date: control.value, User_Id: this.User_Id, Employee: this.Employee_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Attendance_Service.AttendanceDate_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Date_NotAvailable: true };
         }
      }));
   }

   WeekOff_AsyncValidate( control: AbstractControl ) {
      const Data = { Data: control.value, Date: this.Attendance_Date, User_Id: this.User_Id, Employee: this.Employee_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Attendance_Service.WeekOff_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { WeekOff_NotAvailable: true };
         }
      }));
   }

   Submit() {
      if (this.Form.valid && !this.Uploading && this.Form.status === 'VALID') {
        this.Uploading = true;
         const Data = this.Form.getRawValue();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Attendance_Service.Attendance_Create({'Info': Info}).subscribe( response => {
           this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage( {  Type: 'Success',  Message: 'Attendance Successfully Registered' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ReceivingData.Status) {
             this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
             this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Attendance Not Registered!, Error Not Identify!,' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }


}
