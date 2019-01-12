import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../../services/LoginService/login.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { AttendanceService } from './../../../../services/Hr/Attendance/attendance.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';

import {NativeDateAdapter} from '@angular/material';
import {DateAdapter} from '@angular/material/core';
import { map } from 'rxjs/operators';
export class MyDateAdapter extends NativeDateAdapter {
   format(date: Date, displayFormat: Object): string {
        const day = date.getDate();
       const month = date.getMonth() + 1;
       const year = date.getFullYear();
       return `${day}-${month}-${year}`;
   }
}

@Component({
  selector: 'app-create-leaves',
  templateUrl: './create-leaves.component.html',
  styleUrls: ['./create-leaves.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateLeavesComponent implements OnInit {

   Today: Date = new Date();
   _EmployeeName: any[] =  [];
   _LeaveTypes: any[] =  [];
   Form: FormGroup;
   User_Id: any;
   User_Type: any;
   IfEmployeeId: any;
   Employee_Id: any;
   MinDate: Date = new Date();



   constructor(   private Toastr: ToastrService,
                  public hr_service: HrService,
                  public router: Router,
                  public Service: HrmsServiceService,
                  public Login_Service: LoginService,
                  public SettingService: HrmsSettingsServiceService,
                  public Attendance_Service: AttendanceService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
                  if (this.User_Type === 'Employee') {
                     this.IfEmployeeId = this.Login_Service.LoginUser_Info()['Employee']['_id'];
                  }
                  const Data = {'User_Id' : this.User_Id};
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  // Get Employee Simple List
                  this.hr_service.Employee_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._EmployeeName = DecryptedData;
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
                  // Get Leave Name Simple List
                  this.SettingService.Leave_Type_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._LeaveTypes = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Leave Name Simple List Getting Error!, But not Identify!' });
                     }
                  });
               }

   ngOnInit() {
      this.Form = new FormGroup({
         Employee: new FormControl( null, Validators.required),
         Leave_Type: new FormControl( {value: null, disabled: true }, Validators.required),
         From_Date: new FormControl( {value: null, disabled: true }, {  validators: Validators.required,
                                                                        asyncValidators: [ this.Date_AsyncValidate.bind(this) ], }),
         To_Date: new FormControl( {value: null, disabled: true }, { validators: Validators.required,
                                                                     asyncValidators: [ this.Date_AsyncValidate.bind(this) ], }),
         Purpose: new FormControl( {value: '', disabled: true }, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });
   }

   EmployeeChange() {
      const Employee = this.Form.controls['Employee'].value;
      if (Employee !== null && Employee !== '' && Employee !== undefined) {
         this.Employee_Id = Employee;
         this.Form.controls['Leave_Type'].enable();
         this.Form.controls['Leave_Type'].setValue(null);
         this.Form.controls['From_Date'].enable();
         this.Form.controls['From_Date'].setValue(null);
         this.Form.controls['To_Date'].enable();
         this.Form.controls['To_Date'].setValue(null);
         this.Form.controls['Purpose'].enable();
         this.Form.controls['Purpose'].setValue('');
      } else {
         this.Form.controls['Leave_Type'].disable();
         this.Form.controls['Leave_Type'].setValue(null);
         this.Form.controls['From_Date'].disable();
         this.Form.controls['From_Date'].setValue(null);
         this.Form.controls['To_Date'].disable();
         this.Form.controls['To_Date'].setValue(null);
         this.Form.controls['Purpose'].disable();
         this.Form.controls['Purpose'].setValue('');
      }
   }

   Date_AsyncValidate( control: AbstractControl ) {
      const Data = { Date: control.value, User_Id: this.User_Id, Employee: this.Employee_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.LeaveDate_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Date_NotAvailable: true };
         }
      }));
   }

   NotAllow() {
      return false;
   }

   FromDateChange(_date) {
      this.Form.controls['To_Date'].setValue(_date);
      this.MinDate = _date;
   }

  Submit() {
   if (this.Form.valid) {
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Leaves_Create({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Leave Successfully Created' });
            this.router.navigate(['/List_Leaves']);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Leave Getting Error!, But not Identify!' });
         }
      });
   }
}

}
