import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';

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
            Basic_Pay: new FormControl(1000, [Validators.required, Validators.min(1000)]),
            HRA: new FormControl(0, Validators.required),
            HRA_Type: new FormControl('Rs', Validators.required),
            Conveyance: new FormControl(0, Validators.required),
            Conveyance_Type: new FormControl('Rs', Validators.required),
            Medical_Reimbursement: new FormControl(0, Validators.required),
            Medical_Reimbursement_Type: new FormControl('Rs', Validators.required),
            Food_Allowance: new FormControl(0, Validators.required),
            Food_Allowance_Type: new FormControl('Rs', Validators.required),
            Other_Allowance: new FormControl(0, Validators.required),
            Other_Allowance_Type: new FormControl('Rs', Validators.required),
            Professional_Tax: new FormControl(0, Validators.required),
            Professional_Tax_Type: new FormControl('Rs', Validators.required),
            Provident_Fund: new FormControl(0, Validators.required),
            Provident_Fund_Type: new FormControl('Rs', Validators.required),
            Employee_State_Insurance: new FormControl(0, Validators.required),
            Employee_State_Insurance_Type: new FormControl('Rs', Validators.required),
            Medical_Insurance: new FormControl(0, Validators.required),
            Medical_Insurance_Type: new FormControl('Rs', Validators.required),
            TDS: new FormControl(0, Validators.required),
            TDS_Type: new FormControl('Rs', Validators.required),
            Total_Payable: new FormControl({value: 1000, disabled: true}, [Validators.required, Validators.min(1000)]),
            Total_Detectable: new FormControl({value: 0, disabled: true}, [Validators.required, Validators.min(1000)]),
            Monthly_Salary: new FormControl({value: 1000, disabled: true}, [Validators.required, Validators.min(1000)]),
            Created_By: new FormControl(this.User_Id, Validators.required),
         });
      }
      // If Edit PayrollMaster
      if (this.Type === 'Edit') {
         this.Form = new FormGroup({
            Employee: new FormControl(null, Validators.required),
            PaidLeaves_inYear: new FormControl(parseFloat(this.Data.PaidLeaves_inYear), Validators.required),
            PaidLeaves_perMonth: new FormControl(parseFloat(this.Data.PaidLeaves_perMonth)),
            Basic_Pay: new FormControl(parseFloat(this.Data.Basic_Pay), [Validators.required, Validators.min(1000)]),
            HRA: new FormControl(parseFloat(this.Data.HRA), Validators.required),
            HRA_Type: new FormControl(this.Data.HRA_Type, Validators.required),
            Conveyance: new FormControl(parseFloat(this.Data.Conveyance), Validators.required),
            Conveyance_Type: new FormControl(this.Data.Conveyance_Type, Validators.required),
            Medical_Reimbursement: new FormControl(parseFloat(this.Data.Medical_Reimbursement), Validators.required),
            Medical_Reimbursement_Type: new FormControl(this.Data.Medical_Reimbursement_Type, Validators.required),
            Food_Allowance: new FormControl(parseFloat(this.Data.Food_Allowance), Validators.required),
            Food_Allowance_Type: new FormControl(this.Data.Food_Allowance_Type, Validators.required),
            Other_Allowance: new FormControl(parseFloat(this.Data.Other_Allowance), Validators.required),
            Other_Allowance_Type: new FormControl(this.Data.Other_Allowance_Type, Validators.required),
            Professional_Tax: new FormControl(parseFloat(this.Data.Professional_Tax), Validators.required),
            Professional_Tax_Type: new FormControl(this.Data.Professional_Tax_Type, Validators.required),
            Provident_Fund: new FormControl(parseFloat(this.Data.Provident_Fund), Validators.required),
            Provident_Fund_Type: new FormControl(this.Data.Provident_Fund_Type, Validators.required),
            Employee_State_Insurance: new FormControl(parseFloat(this.Data.Employee_State_Insurance), Validators.required),
            Employee_State_Insurance_Type: new FormControl(this.Data.Employee_State_Insurance_Type, Validators.required),
            Medical_Insurance: new FormControl(parseFloat(this.Data.Medical_Insurance), Validators.required),
            Medical_Insurance_Type: new FormControl(this.Data.Medical_Insurance_Type, Validators.required),
            TDS: new FormControl(parseFloat(this.Data.TDS), Validators.required),
            TDS_Type: new FormControl(this.Data.TDS_Type, Validators.required),
            Total_Payable: new FormControl({value: 0, disabled: true}, [Validators.required, Validators.min(1000)]),
            Total_Detectable: new FormControl({value: 0, disabled: true}, [Validators.required, Validators.min(1000)]),
            Monthly_Salary: new FormControl({value: 0, disabled: true}, [Validators.required, Validators.min(1000)]),
            PayrollMaster_Id: new FormControl(this.Data._id, Validators.required),
            Modified_By: new FormControl(this.User_Id, Validators.required)
         });
         this.OnChangeCalculation();
      }
   }


   OnChangeCalculation() {
         if (this.Form.controls['Basic_Pay'].status === 'VALID') {
            const Basic_Pay = this.Form.controls['Basic_Pay'].value;
            let HRA = this.Form.controls['HRA'].value;
            const HRA_Type = this.Form.controls['HRA_Type'].value;
            if (HRA === null) { HRA = 0; }
            if (HRA_Type !== 'Rs') {
               if (HRA !== 0) {
                  HRA = ( Basic_Pay / 100 ) * HRA;
               }
            }
            let Conveyance = this.Form.controls['Conveyance'].value;
            const Conveyance_Type = this.Form.controls['Conveyance_Type'].value;
            if (Conveyance === null) { Conveyance = 0; }
            if (Conveyance_Type !== 'Rs') {
               if (Conveyance !== 0) {
                  Conveyance = ( Basic_Pay / 100 ) * Conveyance;
               }
            }
            let Medical_Reimbursement = this.Form.controls['Medical_Reimbursement'].value;
            const Medical_Reimbursement_Type = this.Form.controls['Medical_Reimbursement_Type'].value;
            if (Medical_Reimbursement === null) { Medical_Reimbursement = 0; }
            if (Medical_Reimbursement_Type !== 'Rs') {
               if (Medical_Reimbursement !== 0) {
               Medical_Reimbursement = ( Basic_Pay / 100 ) * Medical_Reimbursement;
               }
            }
            let Food_Allowance = this.Form.controls['Food_Allowance'].value;
            const Food_Allowance_Type = this.Form.controls['Food_Allowance_Type'].value;
            if (Food_Allowance === null) { Food_Allowance = 0; }
            if (Food_Allowance_Type !== 'Rs') {
               if (Food_Allowance !== 0) {
                  Food_Allowance = ( Basic_Pay / 100 ) * Food_Allowance;
               }
            }
            let Other_Allowance = this.Form.controls['Other_Allowance'].value;
            const Other_Allowance_Type = this.Form.controls['Other_Allowance_Type'].value;
            if (Other_Allowance === null) { Other_Allowance = 0; }
            if (Other_Allowance_Type !== 'Rs') {
               if (Other_Allowance !== 0) {
                  Other_Allowance = ( Basic_Pay / 100 ) * Other_Allowance;
               }
            }
            let Professional_Tax = this.Form.controls['Professional_Tax'].value;
            const Professional_Tax_Type = this.Form.controls['Professional_Tax_Type'].value;
            if (Professional_Tax === null) { Professional_Tax = 0; }
            if (Professional_Tax_Type !== 'Rs') {
               if (Professional_Tax !== 0) {
                  Professional_Tax = ( Basic_Pay / 100 ) * Professional_Tax;
               }
            }
            let Provident_Fund = this.Form.controls['Provident_Fund'].value;
            const Provident_Fund_Type = this.Form.controls['Provident_Fund_Type'].value;
            if (Provident_Fund === null) { Provident_Fund = 0; }
            if (Provident_Fund_Type !== 'Rs') {
               if (Provident_Fund !== 0) {
                  Provident_Fund = ( Basic_Pay / 100 ) * Provident_Fund;
               }
            }
            let Employee_State_Insurance = this.Form.controls['Employee_State_Insurance'].value;
            const Employee_State_Insurance_Type = this.Form.controls['Employee_State_Insurance_Type'].value;
            if (Employee_State_Insurance === null) { Employee_State_Insurance = 0; }
            if (Employee_State_Insurance_Type !== 'Rs') {
               if (Employee_State_Insurance !== 0) {
                  Employee_State_Insurance = ( Basic_Pay / 100 ) * Employee_State_Insurance;
               }
            }
            let Medical_Insurance = this.Form.controls['Medical_Insurance'].value;
            const Medical_Insurance_Type = this.Form.controls['Medical_Insurance_Type'].value;
            if (Medical_Insurance === null) { Medical_Insurance = 0; }
            if (Medical_Insurance_Type !== 'Rs') {
               if (Medical_Insurance !== 0) {
                  Medical_Insurance = ( Basic_Pay / 100 ) * Medical_Insurance;
               }
            }
            let TDS = this.Form.controls['TDS'].value;
            const TDS_Type = this.Form.controls['TDS_Type'].value;
            if (TDS === null) { TDS = 0; }
            if (TDS_Type !== 'Rs') {
               if (TDS !== 0) {
                  TDS = ( Basic_Pay / 100 ) * TDS;
               }
            }
            const Total_Payable =  Basic_Pay + HRA + Conveyance + Medical_Reimbursement + Food_Allowance + Other_Allowance;
            this.Form.controls['Total_Payable'].setValue(Total_Payable);
            const Total_Detectable = Professional_Tax + Provident_Fund + Employee_State_Insurance + Medical_Insurance + TDS;
            this.Form.controls['Total_Detectable'].setValue(Total_Detectable);

            this.Form.controls['Monthly_Salary'].setValue(Total_Payable - Total_Detectable);
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
         const Data = this.Form.getRawValue();
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
         const Data = this.Form.getRawValue();
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
