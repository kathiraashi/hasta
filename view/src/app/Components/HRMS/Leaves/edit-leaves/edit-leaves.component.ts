import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../../services/LoginService/login.service';
import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { HrService } from './../../../../services/Hr/hr.service';


@Component({
  selector: 'app-edit-leaves',
  templateUrl: './edit-leaves.component.html',
  styleUrls: ['./edit-leaves.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class EditLeavesComponent implements OnInit {

   _Data = {};
   Loader: Boolean = true;

   Today: Date = new Date();
   _EmployeeName: any[] =  [];
   _LeaveTypes: any[] =  [];
   Form: FormGroup;
   User_Id: any;
   Employee_Id: any;
   User_Type: any;
   IfEmployeeId: any;
   MinDate: Date = new Date();

   Leave_Id: any;

  constructor(private Toastr: ToastrService,
               public SettingsService: HrmsSettingsServiceService,
               public router: Router,
               public Service: HrmsServiceService,
               private active_route: ActivatedRoute,
               public Login_Service: LoginService,
               public Hr_Service: HrService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
               this.active_route.url.subscribe((u) => {
                  this.Leave_Id = this.active_route.snapshot.params['Leave_Id'];
                  const Data = {'User_Id' : this.User_Id, Leave_Id: this.Leave_Id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Service.Leave_View({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Data = DecryptedData;
                        this.Loader = false;
                        setTimeout(() => {
                           this.UpdateFormValues();
                           this.UpdateFormEmployee();
                           this.UpdateFormLeaveTypes();
                        }, 500);
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Leave Details Getting Error!, But not Identify!' });
                     }
                  });
               });
            }

  ngOnInit() {
   const Data = {'User_Id' : this.User_Id };
   let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
   Info = Info.toString();
   // Get Employees simple List
      if (this.User_Type === 'Employee') {
         const EmployeeId = this.Login_Service.LoginUser_Info()['Employee']['_id'];
         const EmployeeName = this.Login_Service.LoginUser_Info()['Employee']['EmployeeName'];
         this._EmployeeName.push({'EmployeeName': EmployeeName, '_id': EmployeeId });
         setTimeout(() => {
            if (EmployeeId !== undefined && EmployeeId !== null && EmployeeId !== '') {
               this.Employee_Id = EmployeeId;
               this.Form.controls['Employee'].setValue(EmployeeId);
               this.Form.controls['Employee'].disable();
            }
         }, 500);
      } else {
         this.Hr_Service.Employee_SimpleList({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._EmployeeName = DecryptedData;
               setTimeout(() => {
                  this.UpdateFormEmployee();
               }, 500);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Employees Simple List Getting Error!, But not Identify!' });
            }
         });
      }
      // Get Leave Name Simple List
      this.SettingsService.Leave_Type_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._LeaveTypes = DecryptedData;
            setTimeout(() => {
               this.UpdateFormLeaveTypes();
            }, 500);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Leave Name Simple List Getting Error!, But not Identify!' });
         }
      });

      this.Form = new FormGroup({
         Leaves_Id: new FormControl(null, Validators.required),
         Employee: new FormControl(null, Validators.required),
         Leave_Type: new FormControl(null, Validators.required),
         From_Date: new FormControl(null, Validators.required),
         To_Date: new FormControl(null, Validators.required),
         Purpose: new FormControl(null, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });
  }

   UpdateFormValues() {
      this.Form.controls['Leaves_Id'].setValue(this.Leave_Id);
      // this.Form.controls['Employee'].setValue(this._Data['Employee']);
      // this.Form.controls['Leave_Type'].setValue(this._Data['Leave_Type']);
      this.Form.controls['From_Date'].setValue(this._Data['From_Date']);
      this.Form.controls['To_Date'].setValue(this._Data['To_Date']);
      this.Form.controls['Purpose'].setValue(this._Data['Purpose']);
   }

   UpdateFormEmployee() {
      if (this.User_Type !== 'Employee' && this._EmployeeName.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Employee'].setValue(this._Data['Employee']);
         if (this._Data['Stage'] === 'Stage_3') {
            this.Form.controls['Employee'].disable();
         }
      }
   }
   UpdateFormLeaveTypes() {
      if (this._LeaveTypes.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Leave_Type'].setValue(this._Data['Leave_Type']);
      }
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
         this.Service.Leaves_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Leaves Successfully Update' });
               this.router.navigate(['/List_Leaves']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Leaves Getting Error!, But not Identify!' });
            }
         });
      }
   }


   SubmitAndApprove() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Leaves_Modify({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Successfully Send To Approve Request' });
               this.router.navigate(['/List_Leaves']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Leaves Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
