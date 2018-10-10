import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


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
   _EmployeeName: any[] =  [];
   _Name: any[] =  [];
   User_Type;
   Form: FormGroup;
   User_Id;
   modalRef: BsModalRef;



   constructor(   private Toastr: ToastrService,
                  public hrservice: HrService,
                  public router: Router,
                  private modalService: BsModalService,
                  public Service: HrmsServiceService,
                  public Login_Service: LoginService,
                  public SettingService: HrmsSettingsServiceService,
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
                  const Data = {'User_Id' : this.User_Id};
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();

                  // Get Employee Simple List
                  this.hrservice.Employee_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._EmployeeName = DecryptedData;
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
                        this._Name = DecryptedData;
                        console.log(this._Name);
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
      Employee: new FormControl(null),
      Name: new FormControl(null),
      From_Date: new FormControl('', Validators.required),
      To_Date: new FormControl('', Validators.required),
      Purpose: new FormControl(''),
      User_Id: new FormControl(this.User_Id)
   });
  }
  NotAllow() {
   return false;
 }
  Submit() {
   if (this.Form.valid) {
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
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
