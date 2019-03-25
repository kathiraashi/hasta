import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
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

   // File_Url = 'http://159.89.163.252:4000/API/Uploads/';
   File_Url = 'http://localhost:4000/API/Uploads/';


   _Data = {};
   Loader: Boolean = true;
   @ViewChild('FileUpload') FileUpload: ElementRef;
   Today: Date = new Date();
   _EmployeeName: any[] =  [];
   _ExpensesTypes: any[] =  [];
   Form: FormGroup;
   User_Id: any;
   User_Type: any;
   IfEmployeeId: any;
   MinDate: Date = new Date();
   FormData: FormData = new FormData();
   Expenses_Id: any;
   No_Of_Documents: Number = 0;
   Previous_Documents: any[] = [];


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
                        this.UpdateFormValues();
                     } else if (response['status'] === 400 || response['status'] === 401 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
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
            this.UpdateFormValues();
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
         Expenses_Array: new FormArray([]),
         Total_Expenses: new FormControl(0, Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required)
      });

   }

   UpdateFormEmployee() {
      if (this._EmployeeName.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Employee'].setValue(this._Data['Employee']);
         if (this._Data['Stage'] === 'Stage_3') {
            this.Form.controls['Employee'].disable();
         }
      }
   }

   UpdateFormValues() {
      if (this._ExpensesTypes.length > 0 && Object.keys(this._Data).length > 0 ) {
         this.Form.controls['Expenses_Id'].setValue(this.Expenses_Id);
         this.Form.controls['Total_Expenses'].setValue(this._Data['Total_Expenses']);
         const Arr = this._Data['Expenses_Array'];
         Arr.map(obj => {
            this.Update_Expenses_Array(obj);
         });
         this.Previous_Documents = this._Data['Documents'];
      }
   }

   Update_Expenses_Array(obj) {
      const control = <FormArray>this.Form.get('Expenses_Array');
      control.push(new FormGroup({
         Date: new FormControl(obj['Date'], Validators.required),
         Amount: new FormControl(obj['Amount'], [Validators.required, Validators.pattern('^[0-9\,\.\]*$')]),
         Expenses_Type: new FormControl(obj['Expenses_Type'], Validators.required),
         Description: new FormControl(obj['Description'], Validators.required),
      }));
   }

   Amount_Change() {
      const Expenses_Array = <FormArray>this.Form.controls['Expenses_Array'];
      let Amount = 0;
      Expenses_Array.controls.map(_obj => {
         const Expenses_Group = <FormGroup>_obj;
         Amount = Amount + Number(Expenses_Group.controls['Amount'].value);
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

   Remove_Document(_index: number) {
      this.Previous_Documents.splice(_index, 1);
   }

   Submit() {
      if (this.Form.valid) {
         this.Form.addControl('Previous_Documents', new FormControl(JSON.stringify(this.Previous_Documents)));
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.FormData.set('Info', Info);
         this.Service.Expenses_Update(this.FormData).subscribe( response => {
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
         this.Form.addControl('Previous_Documents', new FormControl(JSON.stringify(this.Previous_Documents)));
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.FormData.set('Info', Info);
         this.Service.Expenses_Modify(this.FormData).subscribe( response => {
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
