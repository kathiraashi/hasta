import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { HrService } from './../../../services/Hr/hr.service';
import { PayrollService } from './../../../services/Hr/Payroll/payroll.service';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../services/LoginService/login.service';


@Component({
  selector: 'app-model-payroll-master',
  templateUrl: './model-payroll-master.component.html',
  styleUrls: ['./model-payroll-master.component.css']
})
export class ModelPayrollMasterComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Data;
   Uploading: Boolean = false;
   User_Id;
   Form: FormGroup;
   _EmployeeList: any[] = [];
   _Calc_Type: any[] = ['Rs', '%'];


   constructor (  public bsModalRef: BsModalRef,
      public Hr_Service: HrService,
      public Service: PayrollService,
      public Toastr: ToastrService,
      public Login_Service: LoginService
   ) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];

      const Data = { 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Hr_Service.EmployeeList_WithoutPayrollMaster({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._EmployeeList = DecryptedData;
            this.UpdateEmployee();
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }
   ngOnInit() {
      this.onClose = new Subject();

      // If Create New PayrollMaster
      if (this.Type === 'Create') {
         this.Form = new FormGroup({
            Employee: new FormControl(null, Validators.required),
            PaidLeaves_inYear: new FormControl(0, Validators.required),
            PaidLeaves_perMonth: new FormControl(0),
            Monthly_Salary: new FormControl(null, Validators.required),
            Basic_Pay: new FormControl(null, Validators.required),
            HRA: new FormControl(null, Validators.required),
            HRA_Type: new FormControl('Rs', Validators.required),
            Conveyance: new FormControl(null, Validators.required),
            Conveyance_Type: new FormControl('Rs', Validators.required),
            Medical_Reimbursement: new FormControl(null, Validators.required),
            Medical_Reimbursement_Type: new FormControl('Rs', Validators.required),
            Food_Allowance: new FormControl(null, Validators.required),
            Food_Allowance_Type: new FormControl('Rs', Validators.required),
            Other_Allowance: new FormControl(null, Validators.required),
            Other_Allowance_Type: new FormControl('Rs', Validators.required),
            Professional_Tax: new FormControl(null, Validators.required),
            Professional_Tax_Type: new FormControl('Rs', Validators.required),
            Provident_Fund: new FormControl(null, Validators.required),
            Provident_Fund_Type: new FormControl('Rs', Validators.required),
            Employee_State_Insurance: new FormControl(null, Validators.required),
            Employee_State_Insurance_Type: new FormControl('Rs', Validators.required),
            Medical_Insurance: new FormControl(null, Validators.required),
            Medical_Insurance_Type: new FormControl('Rs', Validators.required),
            TDS: new FormControl(null, Validators.required),
            TDS_Type: new FormControl('Rs', Validators.required),
            Created_By: new FormControl(this.User_Id, Validators.required),
         });
      }
      // If Edit PayrollMaster
      if (this.Type === 'Edit') {
         this.Form = new FormGroup({
            Employee: new FormControl(null, Validators.required),
            PaidLeaves_inYear: new FormControl(this.Data.PaidLeaves_inYear, Validators.required),
            PaidLeaves_perMonth: new FormControl(this.Data.PaidLeaves_perMonth),
            Monthly_Salary: new FormControl(this.Data.Monthly_Salary, Validators.required),
            Basic_Pay: new FormControl(this.Data.Basic_Pay, Validators.required),
            HRA: new FormControl(this.Data.HRA, Validators.required),
            HRA_Type: new FormControl(this.Data.HRA_Type, Validators.required),
            Conveyance: new FormControl(this.Data.Conveyance, Validators.required),
            Conveyance_Type: new FormControl(this.Data.Conveyance_Type, Validators.required),
            Medical_Reimbursement: new FormControl(this.Data.Medical_Reimbursement, Validators.required),
            Medical_Reimbursement_Type: new FormControl(this.Data.Medical_Reimbursement_Type, Validators.required),
            Food_Allowance: new FormControl(this.Data.Food_Allowance, Validators.required),
            Food_Allowance_Type: new FormControl(this.Data.Food_Allowance_Type, Validators.required),
            Other_Allowance: new FormControl(this.Data.Other_Allowance, Validators.required),
            Other_Allowance_Type: new FormControl(this.Data.Other_Allowance_Type, Validators.required),
            Professional_Tax: new FormControl(this.Data.Professional_Tax, Validators.required),
            Professional_Tax_Type: new FormControl(this.Data.Professional_Tax_Type, Validators.required),
            Provident_Fund: new FormControl(this.Data.Provident_Fund, Validators.required),
            Provident_Fund_Type: new FormControl(this.Data.Provident_Fund_Type, Validators.required),
            Employee_State_Insurance: new FormControl(this.Data.Employee_State_Insurance, Validators.required),
            Employee_State_Insurance_Type: new FormControl(this.Data.Employee_State_Insurance_Type, Validators.required),
            Medical_Insurance: new FormControl(this.Data.Medical_Insurance, Validators.required),
            Medical_Insurance_Type: new FormControl(this.Data.Medical_Insurance_Type, Validators.required),
            TDS: new FormControl(this.Data.TDS, Validators.required),
            TDS_Type: new FormControl(this.Data.TDS_Type, Validators.required),
            PayrollMaster_Id: new FormControl(this.Data._id, Validators.required),
            Modified_By: new FormControl(this.User_Id, Validators.required)
         });
      }
   }

   UpdateEmployee() {
      if (this.Type === 'Edit') {
         this._EmployeeList = [];
         this._EmployeeList.push(this.Data.Employee);
         this.Form.controls['Employee'].setValue(this.Data.Employee['_id']);
         this.Form.controls['Employee'].disable();
      }
   }
   // onSubmit Function
   onSubmit() {
      if (this.Type === 'Create') {
         this.submit();
      }
      if (this.Type === 'Edit') {
         this.update();
      }
   }

   // Submit New PayrollMaster
   submit() {
      if (this.Form.valid && !this.Uploading) {
      this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.PayrollMaster_Create({'Info': Info}).subscribe( response => {
         this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'PayrollMaster Type Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
            this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
            this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
      } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating PayrollMaster!'} );
         this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }
   // Update New PayrollMaster
   update() {
      if (this.Form.valid) {
      this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.PayrollMaster_Update({'Info': Info}).subscribe( response => {
         this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage(  {  Type: 'Success', Message: 'PayrollMaster Successfully Updated'} );
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
            this.Toastr.NewToastrMessage(  {  Type: 'Error', Message: ReceivingData['Message'] });
            this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
            this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Updating PayrollMaster!' });
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }


}
