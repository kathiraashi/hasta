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
  selector: 'app-edit-expenses',
  templateUrl: './edit-expenses.component.html',
  styleUrls: ['./edit-expenses.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class EditExpensesComponent implements OnInit {


   _Data = {};
   Loader: Boolean = true;

   Today: Date = new Date();
   _EmployeeName: any[] =  [];
   _ExpensesTypes: any[] =  [];
   Form: FormGroup;
   User_Id;
   User_Type;
   IfEmployeeId;
   MinDate: Date = new Date();

   Expenses_Id;

  constructor(private Toastr: ToastrService,
               public SettingsService: HrmsSettingsServiceService,
               public router: Router,
               public Service: HrmsServiceService,
               private active_route: ActivatedRoute,
               public Login_Service: LoginService,
               public Hr_Service: HrService
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.active_route.url.subscribe((u) => {
                  this.Expenses_Id = this.active_route.snapshot.params['Expenses_Id'];
                  const Data = {'User_Id' : this.User_Id, Expenses_Id: this.Expenses_Id };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Service.Expenses_View({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Data = DecryptedData;
                        this.Loader = false;
                        setTimeout(() => {
                           this.UpdateFormValues();
                        }, 500);
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Expenses Details Getting Error!, But not Identify!' });
                     }
                  });
               });
            }

  ngOnInit() {
   const Data = {'User_Id' : this.User_Id };
   let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
   Info = Info.toString();
   // Get Employees simple List
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
      // Get Expense Types Simple List
      this.SettingsService.Expenses_Type_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ExpensesTypes = DecryptedData;
            setTimeout(() => {
               this.UpdateFormExpensesType();
            }, 500);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Expenses Type Simple List Getting Error!, But not Identify!' });
         }
      });

      this.Form = new FormGroup({
         Expenses_Id: new FormControl(null, Validators.required),
         Employee: new FormControl(null, Validators.required),
         Expenses_Type: new FormControl(null, Validators.required),
         Applied_Date: new FormControl(null, Validators.required),
         Required_Date: new FormControl(null, Validators.required),
         Amount: new FormControl(null, Validators.required),
         Description: new FormControl(null, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });
  }

   UpdateFormValues() {
      this.Form.controls['Expenses_Id'].setValue(this.Expenses_Id);
      this.Form.controls['Employee'].setValue(this._Data['Employee']);
      this.Form.controls['Expenses_Type'].setValue(this._Data['Expenses_Type']);
      this.Form.controls['Applied_Date'].setValue(this._Data['Applied_Date']);
      this.Form.controls['Required_Date'].setValue(this._Data['Required_Date']);
      this.Form.controls['Amount'].setValue(this._Data['Amount']);
      this.Form.controls['Description'].setValue(this._Data['Description']);
   }

   UpdateFormEmployee() {
      if (this._EmployeeName.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Employee'].setValue(this._Data['Employee']);
         if (this._Data['Stage'] === 'Stage_3') {
            this.Form.controls['Employee'].disable();
         }
      }
   }
   UpdateFormExpensesType() {
      if (this._ExpensesTypes.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Expenses_Type'].setValue(this._Data['Expenses_Type']);
      }
   }
   NotAllow() {
      return false;
   }

   FromDateChange(_date) {
      this.MinDate = _date;
   }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Expenses_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Expense Successfully Update' });
               this.router.navigate(['/Expenses_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Expense Getting Error!, But not Identify!' });
            }
         });
      }
   }


   SubmitAndApprove() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Expenses_Modify({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Successfully Send To Approve Request' });
               this.router.navigate(['/Expenses_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Expense Getting Error!, But not Identify!' });
            }
         });
      }
   }


}
