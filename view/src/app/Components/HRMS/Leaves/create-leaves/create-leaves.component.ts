import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../../services/LoginService/login.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';

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
   User_Id;
   User_Type;
   IfEmployeeId;
   MinDate: Date = new Date();



   constructor(   private Toastr: ToastrService,
                  public hr_service: HrService,
                  public router: Router,
                  public Service: HrmsServiceService,
                  public Login_Service: LoginService,
                  public SettingService: HrmsSettingsServiceService,
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
                        } else {
                           this.Form.controls['Employee'].enable();
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
      Employee: new FormControl({value: null, disabled: true, }, Validators.required),
      Leave_Type: new FormControl(null, Validators.required),
      From_Date: new FormControl(this.Today, Validators.required),
      To_Date: new FormControl(this.Today, Validators.required),
      Purpose: new FormControl('', Validators.required),
      User_Id: new FormControl(this.User_Id, Validators.required)
   });
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
