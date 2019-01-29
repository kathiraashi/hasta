import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-edit-employees',
  templateUrl: './edit-employees.component.html',
  styleUrls: ['./edit-employees.component.css']
})
export class EditEmployeesComponent implements OnInit {

   // File_Url = 'http://159.89.163.252:4000/API/Uploads/';
   File_Url = 'http://localhost:4000/API/Uploads/';

   FormData: FormData = new FormData;

   modalRef: BsModalRef;
   _MaritalStatus: any[] = ['Single', 'Married'];
   _EmployeeRoles: any[] = ['Temporary', 'Permanent'];
   _Departments: any[] =  [];
   _Designations: any[] = [];
   _Customers: any[] = [];
   _BankAccountTypes: any[] = ['Savings', 'Current'];

   Active_Tab = 'Personal';

   @ViewChild('AadharFile') AadharFile: ElementRef;
   If_AadharFile: Boolean = false;

   @ViewChild('PanCardFile') PanCardFile: ElementRef;
   If_PanCardFile: Boolean = false;

   @ViewChild('DrivingLicenseFile') DrivingLicenseFile: ElementRef;
   If_DrivingLicenseFile: Boolean = false;


   Employee_Id;
   _Data = {};
   Loader: Boolean = true;
   Form: FormGroup;

   If_Employee;
   User_Type;
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
            this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
            this.If_Employee = this.Login_Service.LoginUser_Info()['Employee'];
            const Data = {'User_Id' : this.User_Id, Customers: this.If_Employee };
            if (this.User_Type === 'Employee') {
               Data.Customers = this.If_Employee['Customers'];
            }
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.active_route.url.subscribe((u) => {
               this.Employee_Id = this.active_route.snapshot.params['Employee_Id'];
               const Data_1 = { 'Employee_Id': this.Employee_Id, 'User_Id' : this.User_Id };
               let Info_1 = CryptoJS.AES.encrypt(JSON.stringify(Data_1), 'SecretKeyIn@123');
               Info_1 = Info_1.toString();
               this.Service.Employee_View({ 'Info': Info_1 }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Data = DecryptedData;
                     console.log(DecryptedData);
                     setTimeout(() => {
                        this.UpdateFormValues();
                        this.UpdateDepartment();
                        this.UpdateCustomers();
                        this.UpdateDesignation();
                     }, 500);
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Employee Data Getting Error!, But not Identify!' });
                  }
               });
            });
             // Get Departments List
             this.SettingsService.Department_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Departments = DecryptedData;
                  this.UpdateDepartment();
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Departments Simple List Getting Error!, But not Identify!' });
               }
            });
         // Get Designations List
            this.SettingsService.Designation_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Designations = DecryptedData;
                  this.UpdateDesignation();
               } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Designations Simple List Getting Error!, But not Identify!' });
               }
            });
         // Get Customers Simple Types List
            this.Crm_Service.CrmCustomers_SimpleList({'Info': Info}).subscribe( response => {
               const ResponseData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ResponseData['Status'] ) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this._Customers = DecryptedData;
                  this.UpdateCustomers();
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
         Employee_Id: new FormControl('', Validators.required),
         EmployeeName: new FormControl('', Validators.required),
         EmployeeCode: new FormControl('', { validators: Validators.required,
                                             asyncValidators: [ this.EmployeeCode_AsyncValidate.bind(this) ],
                                             updateOn: 'blur' } ),
         Department: new FormControl(null),
         Designation: new FormControl(null),
         DateOfJoining: new FormControl(null, Validators.required),
         EmployeeRole: new FormControl(null),
         Working_Location: new FormControl(),
         Customers: new FormControl(null, Validators.required),

         EmployeeFatherName: new FormControl(''),
         DateOfBirth: new FormControl(''),
         BloodGroup: new FormControl(''),
         MaritalStatus: new FormControl(null),
         Personal_MobileNo: new FormControl('', { validators: Validators.required,
                                          asyncValidators: [ this.MobileNo_AsyncValidate.bind(this) ],
                                          updateOn: 'blur' } ),
         Official_MobileNo: new FormControl(''),
         Emergency_MobileNo: new FormControl('', Validators.required),
         Personal_Email: new FormControl(''),
         Official_Email: new FormControl(''),
         Aadhar_No: new FormControl(''),
         PanCard_No: new FormControl(''),
         DrivingLicense_No: new FormControl(''),
         OldAadharDocument: new FormControl(null),
         OldPanDocument: new FormControl(null),
         OldDrivingDocument: new FormControl(null),
         Permanent_Address: new FormControl(''),
         Temporary_Address: new FormControl(''),
         Education_Qualification: new FormControl(''),


         PF_AccountNo: new FormControl(),
         ESI_AccountNo: new FormControl(),
         Bank_Name: new FormControl(),
         Bank_AccountNo: new FormControl(),
         Bank_AccountType: new FormControl(null),
         Bank_IFSCCode: new FormControl(),
         Bank_Address: new FormControl(),
         User_Id: new FormControl(this.User_Id)
      });
   }

   UpdateFormValues() {
      this.Form.controls['Employee_Id'].setValue(this.Employee_Id);
      this.Form.controls['EmployeeName'].setValue(this._Data['EmployeeName']);
      this.Form.controls['EmployeeCode'].setValue(this._Data['EmployeeCode']);
      this.Form.controls['DateOfJoining'].setValue(new Date(this._Data['DateOfJoining']));
      this.Form.controls['EmployeeRole'].setValue(this._Data['EmployeeRole']);
      this.Form.controls['Working_Location'].setValue(this._Data['Working_Location']);
      this.Form.controls['EmployeeFatherName'].setValue(this._Data['EmployeeFatherName']);
      this.Form.controls['DateOfBirth'].setValue(new Date(this._Data['DateOfBirth']));
      this.Form.controls['BloodGroup'].setValue(this._Data['BloodGroup']);
      this.Form.controls['MaritalStatus'].setValue(this._Data['MaritalStatus']);
      this.Form.controls['Personal_MobileNo'].setValue(this._Data['Personal_MobileNo']);
      this.Form.controls['Official_MobileNo'].setValue(this._Data['Official_MobileNo']);
      this.Form.controls['Emergency_MobileNo'].setValue(this._Data['Emergency_MobileNo']);
      this.Form.controls['Personal_Email'].setValue(this._Data['Personal_Email']);
      this.Form.controls['Official_Email'].setValue(this._Data['Official_Email']);
      this.Form.controls['Aadhar_No'].setValue(this._Data['Aadhar_No']);
      this.Form.controls['PanCard_No'].setValue(this._Data['PanCard_No']);
      this.Form.controls['DrivingLicense_No'].setValue(this._Data['DrivingLicense_No']);
      this.Form.controls['OldAadharDocument'].setValue(this._Data['AadharDocument']);
      this.Form.controls['OldPanDocument'].setValue(this._Data['PanDocument']);
      this.Form.controls['OldDrivingDocument'].setValue(this._Data['DrivingDocument']);
      this.Form.controls['Permanent_Address'].setValue(this._Data['Permanent_Address']);
      this.Form.controls['Temporary_Address'].setValue(this._Data['Temporary_Address']);
      this.Form.controls['Education_Qualification'].setValue(this._Data['Education_Qualification']);
      this.Form.controls['PF_AccountNo'].setValue(this._Data['PF_AccountNo']);
      this.Form.controls['ESI_AccountNo'].setValue(this._Data['ESI_AccountNo']);
      this.Form.controls['Bank_Name'].setValue(this._Data['Bank_Name']);
      this.Form.controls['Bank_AccountNo'].setValue(this._Data['Bank_AccountNo']);
      this.Form.controls['Bank_AccountType'].setValue(this._Data['Bank_AccountType']);
      this.Form.controls['Bank_IFSCCode'].setValue(this._Data['Bank_IFSCCode']);
      this.Form.controls['Bank_Address'].setValue(this._Data['Bank_Address']);
   }

   UpdateDepartment() {
      if (this._Departments.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Department'].setValue(this._Data['Department']['_id']);
      }
   }

   UpdateDesignation() {
      if (this._Designations.length > 0  && Object.keys(this._Data).length > 0) {
         this.Form.controls['Designation'].setValue(this._Data['Designation']['_id']);
      }
   }

   UpdateCustomers() {
      if (this._Customers.length > 0  && Object.keys(this._Data).length > 0) {
         const SetCustomers = [];
         this._Data['Customers'].map(obj => { SetCustomers.push(obj._id); return obj; });
         this.Form.controls['Customers'].setValue(SetCustomers);
      }
   }

   MobileNo_AsyncValidate( control: AbstractControl ) {
      const Data = { MobileNo: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.MobileNo_AsyncValidate({'Info': Info}).pipe(map( response => {
         if (this._Data['Personal_MobileNo'] === control.value) {
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

   EmployeeCode_AsyncValidate( control: AbstractControl ) {
      const Data = { EmployeeCode: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Service.EmployeeCode_AsyncValidate({'Info': Info}).pipe(map( response => {
         if (this._Data['EmployeeCode'] === control.value) {
            return null;
         } else {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { EmployeeCode_NotAvailable: true };
            }
         }
      }));
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

   OnlyNumber(_event) {
      const pattern = /[0-9\+\-\ ]/;
      const inputChar = String.fromCharCode(_event.charCode);
      if (!pattern.test(inputChar)) {
        event.preventDefault();
      }
   }

   MaritalStatusChange(event) {
      if (event === 'Married') {
         this.Form.addControl('EmployeeWifeName', new FormControl(''));
      } else {
         this.Form.removeControl('EmployeeWifeName');
      }
   }

   NotAllow() {
     return false;
   }

   AadharFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.If_AadharFile = true ;
        const file = event.target.files[0];
        this.FormData.set('AadharDocument', file, file.name);
      } else {
         this.FormData.delete('AadharDocument');
        this.If_AadharFile = false;
      }
   }

   PanCardFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.If_PanCardFile = true ;
        const file = event.target.files[0];
        this.FormData.set('PanDocument', file, file.name);
      } else {
         this.FormData.delete('PanDocument');
        this.If_PanCardFile = false;
      }
   }

   DrivingLicenseFileChange(event) {
      if (event.target.files && event.target.files.length > 0) {
        this.If_DrivingLicenseFile = true ;
        const file = event.target.files[0];
        this.FormData.set('DrivingDocument', file, file.name);
      } else {
         this.FormData.delete('DrivingDocument');
        this.If_DrivingLicenseFile = false;
      }
   }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.FormData.set('Info', Info);
         this.Service.Employee_Update(this.FormData).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Employee Update Successfully Created' });
               this.router.navigate(['/List_Employees']);
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Update Employee Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
