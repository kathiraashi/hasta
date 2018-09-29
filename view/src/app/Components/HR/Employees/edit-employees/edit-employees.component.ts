import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

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
import { HrSettingsService } from './../../../../services/settings/HrSettings/hr-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrService } from './../../../../services/Hr/hr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {



   _MaritalStatus: any[] = ['Single', 'Married'];
   _Departments: any[] =  [];
   _Customers: any[] = [];
   Employee_Id;
   _Data = {};
   Loader: Boolean = true;
   Form: FormGroup;

   User_Id;

   constructor(private Toastr: ToastrService,
               public SettingsService: HrSettingsService,
               public router: Router,
               public Service: HrService,
               private active_route: ActivatedRoute,
               public Login_Service: LoginService,
               public Crm_Service: CrmService
         ) {
            this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            this.active_route.url.subscribe((u) => {
               this.Employee_Id = this.active_route.snapshot.params['Employee_Id'];
               const Data = { 'Employee_Id': this.Employee_Id, 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Employee_View({ 'Info': Info }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Data = DecryptedData;
                     setTimeout(() => {
                        this.UpdateFormValues();
                        this.UpdateFormDepartment();
                        this.UpdateFormCustomers();
                     }, 500);
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Employee Data Getting Error!, But not Identify!' });
                  }
               });
               this.Crm_Service.CrmCustomers_SimpleList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Customers = DecryptedData;
                     setTimeout(() => {
                        this.UpdateFormCustomers();
                     }, 500);
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Crm Customers Simple List Getting Error!, But not Identify!' });
                  }
               });
            });
         }

   ngOnInit() {
      const Data = {'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      // Get Departments List
         this.SettingsService.Department_SimpleList({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Departments = DecryptedData;
               setTimeout(() => {
                  this.UpdateFormDepartment();
               }, 500);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Departments Simple List Getting Error!, But not Identify!' });
            }
         });

      this.Form = new FormGroup({
         EmployeeName: new FormControl('', Validators.required),
         EmployeeCode: new FormControl(''),
         Department: new FormControl(null),
         JobTitle: new FormControl(''),
         MobileNo: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [ this.MobileNo_AsyncValidate.bind(this) ],
                                          updateOn: 'blur' } ),
         JoiningDate: new FormControl(),
         DateOfBirth: new FormControl(),
         MaritalStatus: new FormControl(),
         Address: new FormControl(),
         Customers: new FormControl(null, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Employee_Id: new FormControl(this.Employee_Id, Validators.required),
      });
   }

   UpdateFormValues() {
      this.Form.controls['EmployeeName'].setValue(this._Data['EmployeeName']);
      this.Form.controls['EmployeeCode'].setValue(this._Data['EmployeeCode']);
      this.Form.controls['JobTitle'].setValue(this._Data['JobTitle']);
      this.Form.controls['MobileNo'].setValue(this._Data['MobileNo']);
      this.Form.controls['JoiningDate'].setValue(this._Data['JoiningDate']);
      this.Form.controls['DateOfBirth'].setValue(this._Data['DateOfBirth']);
      this.Form.controls['MaritalStatus'].setValue(this._Data['MaritalStatus']);
      this.Form.controls['Address'].setValue(this._Data['Address']);
   }

   UpdateFormDepartment() {
      if (this._Departments.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Department'].setValue(this._Data['Department']['_id']);
      }
   }

   UpdateFormCustomers() {
      if (this._Customers.length > 0  && Object.keys(this._Data).length > 0) {
         const SetCustomers = [];
         this._Data['Customers'].map(obj => { SetCustomers.push(obj._id); return obj; });
         this.Form.controls['Customers'].setValue(SetCustomers);
      }
   }

   onlyNumber(_event) {
      if (!isNaN(_event.key)) {
         return true;
      } else {
         return false;
      }
   }

   NotAllow() {
     return false;
   }

   MobileNo_AsyncValidate( control: AbstractControl ) {
      const Data = { MobileNo: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Employee_AsyncValidate({'Info': Info}).pipe(map( response => {
         if (this._Data['MobileNo'] === control.value) {
            return null;
         } else {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { MobileNo_NotAvailable: true };
            }
         }
      }));
   }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Employee_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Employee Update Successfully Created' });
               this.router.navigate(['/List_Employees']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Employee Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
