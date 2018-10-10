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
import { HrmsSettingsServiceService } from './../../../../services/settings/HrmsSettings/hrms-settings-service.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { HrService } from './../../../../services/Hr/hr.service';


@Component({
  selector: 'app-edit-leaves',
  templateUrl: './edit-leaves.component.html',
  styleUrls: ['./edit-leaves.component.css']
})
export class EditLeavesComponent implements OnInit {

   _EmployeeName: any[] =  [];
   _Name: any[] =  [];
   User_Type;
   _Data = {};
   Loader: Boolean = true;
   Form: FormGroup;

   User_Id;

  constructor(private Toastr: ToastrService,
   public SettingsService: HrmsSettingsServiceService,
   public router: Router,
   public Service: HrmsServiceService,
   private active_route: ActivatedRoute,
   public Login_Service: LoginService,
   public hrservice: HrService) {

   }

  ngOnInit() {
   const Data = {'User_Id' : this.User_Id };
   let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
   Info = Info.toString();
   // Get Employees simple List
      this.hrservice.Employee_SimpleList({'Info': Info}).subscribe( response => {
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
      // Get Leave Name Simple List
      this.SettingsService.Leave_Type_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Name = DecryptedData;
            setTimeout(() => {
               this.UpdateFormLeaveName();
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
         Employee: new FormControl(null),
         Name: new FormControl(null),
         From_Date: new FormControl('', Validators.required),
         To_Date: new FormControl('', Validators.required),
         Purpose: new FormControl(''),
         User_Id: new FormControl(this.User_Id)
      });
  }

   UpdateFormValues() {
      this.Form.controls['Employee'].setValue(this._Data['Employee']);
      this.Form.controls['Name'].setValue(this._Data['Name']);
      this.Form.controls['From_Date'].setValue(this._Data['From_Date']);
      this.Form.controls['To_Date'].setValue(this._Data['To_Date']);
      this.Form.controls['Purpose'].setValue(this._Data['Purpose']);
   }

   UpdateFormEmployee() {
      if (this._EmployeeName.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['EmployeeName'].setValue(this._Data['EmployeeName']['_id']);
      }
   }
   UpdateFormLeaveName() {
      if (this._Name.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Name'].setValue(this._Data['Name']['_id']);
      }
   }
   NotAllow() {
      return false;
   }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Leaves_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Leaves Update Successfully Created' });
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
