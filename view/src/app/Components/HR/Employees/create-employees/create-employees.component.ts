import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

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
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CreateEmployeesComponent implements OnInit {


   modalRef: BsModalRef;
   _MaritalStatus: any[] = ['Single', 'Married'];
   _Departments: any[] =  [];
   _Customers: any[] = [];

   If_Employee;
   User_Type;
   Form: FormGroup;

   User_Id;

   constructor(private Toastr: ToastrService,
         public SettingsService: HrSettingsService,
         public router: Router,
         private modalService: BsModalService,
         public Service: HrService,
         public Login_Service: LoginService,
         public Crm_Service: CrmService
      ) {
         this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
         this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
         this.If_Employee = this.Login_Service.LoginUser_Info()['Employee'];
         const Data = {'User_Id' : this.User_Id, Customers: this.If_Employee };
         if (this.User_Type === 'Employee') {
            Data.Customers = this.If_Employee['Customers'];
         }
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get Departments List
            this.SettingsService.Department_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Departments = DecryptedData;
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Departments Simple List Getting Error!, But not Identify!' });
               }
            });
         // Get Customers Simple Types List
            this.Crm_Service.CrmCustomers_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Customers = DecryptedData;
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Crm Customers Simple List Getting Error!, But not Identify!' });
               }
            });
       }

   ngOnInit() {
      this.Form = new FormGroup({
         EmployeeName: new FormControl('', Validators.required),
         EmployeeCode: new FormControl('', Validators.required),
         Department: new FormControl(null),
         JobTitle: new FormControl(''),
         MobileNo: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [ this.MobileNo_AsyncValidate.bind(this) ],
                                          updateOn: 'blur' } ),
         JoiningDate: new FormControl(),
         DateOfBirth: new FormControl(),
         MaritalStatus: new FormControl(),
         Address: new FormControl(),
         User_Id: new FormControl(this.User_Id)
      });
   }

   MobileNo_AsyncValidate( control: AbstractControl ) {
      const Data = { MobileNo: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.Employee_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { MobileNo_NotAvailable: true };
         }
      }));
   }

   onlyNumber(_event) {
      if (!isNaN(_event.key)) {
         return true;
      } else {
         return false;
      }
   }

   OpenModel(template: TemplateRef<any>) {
      this.Form.addControl('Customers', new FormControl(null, Validators.required));
      this.modalRef = this.modalService.show(template, { class: 'modal-md', ignoreBackdropClick: true });
   }

   modalRefHide() {
      this.modalRef.hide();
      this.Form.removeControl('Customers');
   }


   NotAllow() {
     return false;
   }



   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Employee_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.modalRef.hide();
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Employee Successfully Created' });
               this.router.navigate(['/List_Employees']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Employee Getting Error!, But not Identify!' });
            }
         });
      }
   }
}
