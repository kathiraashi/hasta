import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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
  selector: 'app-create-expenses',
  templateUrl: './create-expenses.component.html',
  styleUrls: ['./create-expenses.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateExpensesComponent implements OnInit {

   @ViewChild('FileUpload') FileUpload: ElementRef;
   Today: Date = new Date();
   _EmployeeName: any[] =  [];
   _ExpensesTypes: any[] =  [];
   Form: FormGroup;
   User_Id: any;
   User_Type: any;
   IfEmployeeId: any;
   MinDate: Date = new Date();
   No_Of_Documents: Number = 0;
   FormData: FormData = new FormData();



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
                  if (this.User_Type !== 'Employee') {
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
                  }
                  // Get Leave Name Simple List
                  this.SettingService.Expenses_Type_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._ExpensesTypes = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Expenses Simple List Getting Error!, But not Identify!' });
                     }
                  });
               }

   ngOnInit() {
      this.Form = new FormGroup({
         Employee: new FormControl(null, Validators.required),
         Expenses_Array: new FormArray([]),
         Total_Expenses: new FormControl(0, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });
      this.Create_Expenses();
      if (this.User_Type === 'Employee') {
         const EmployeeId = this.Login_Service.LoginUser_Info()['Employee']['_id'];
         const EmployeeName = this.Login_Service.LoginUser_Info()['Employee']['EmployeeName'];
         this._EmployeeName.push({'EmployeeName': EmployeeName, '_id': EmployeeId });
         setTimeout(() => {
            if (EmployeeId !== undefined && EmployeeId !== null && EmployeeId !== '') {
               this.Form.controls['Employee'].setValue(EmployeeId);
               this.Form.controls['Employee'].disable();
            }
         }, 500);
      }
   }

   NotAllow() {
      return false;
   }
   OnlyNumber(_event) {
      const pattern = /[0-9\.\,\ ]/;
      const inputChar = String.fromCharCode(_event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
   }

   DateChange(_date) {
      this.MinDate = _date;
   }

   Amount_Change() {
      const Expenses_Array = <FormArray>this.Form.controls['Expenses_Array'];
      let Amount = 0;
      Expenses_Array.controls.map(_obj => {
         const Expenses_Group = <FormGroup>_obj;
         Amount = Amount + Expenses_Group.controls['Amount'].value;
      });
      this.Form.controls['Total_Expenses'].setValue(Amount);
   }

   fileChangeEvent(event: any) {
      if (event.target.files && event.target.files.length > 0) {
         this.FormData.delete('documents');
         for (let index = 0; index < event.target.files.length; index++) {
            const file = event.target.files[index];
            this.FormData.append('documents', file, file.name);
         }
         this.No_Of_Documents = event.target.files.length;
      } else {
         this.FileUpload.nativeElement.value = null;
         this.No_Of_Documents = 0;
         this.FormData.delete('documents');
      }
    }


   Create_Expenses() {
      const control = <FormArray>this.Form.get('Expenses_Array');
      control.push(this.NewExpensesFormGroup());
   }
   Remove_Expenses(_index: number) {
      const control = <FormArray>this.Form.controls['Expenses_Array'];
      control.removeAt(_index);
      this.Amount_Change();
   }

   NewExpensesFormGroup() {
      return new FormGroup({
               Date: new FormControl(this.Today, Validators.required),
               Amount: new FormControl(0, [Validators.required, Validators.pattern('^[0-9\,\.\]*$')]),
               Expenses_Type: new FormControl(null, Validators.required),
               Description: new FormControl('', Validators.required),
            });
   }


   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.FormData.set('Info', Info);
         this.Service.Expenses_Create(this.FormData).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Expenses Successfully Created' });
               this.router.navigate(['/Expenses_List']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Expenses Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
