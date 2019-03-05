import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { HrSettingsService } from './../../../services/settings/HrSettings/hr-settings.service';
import { PayrollService } from './../../../services/Hr/Payroll/payroll.service';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../services/LoginService/login.service';


@Component({
  selector: 'app-model-payroll-run',
  templateUrl: './model-payroll-run.component.html',
  styleUrls: ['./model-payroll-run.component.css']
})
export class ModelPayrollRunComponent implements OnInit {

   onClose: Subject<any>;

   Type: string;
   Data: any;
   Uploading: Boolean = false;
   User_Id: any;
   Form: FormGroup;
   _EarningsList: any[] = [];
   _DetectionsList: any[] = [];
   _MasterDetails: any;


   constructor (  public bsModalRef: BsModalRef,
      public Hr_Settings_Service: HrSettingsService,
      public Service: PayrollService,
      public Toastr: ToastrService,
      public Login_Service: LoginService
   ) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];

      const Data = { 'User_Id' : this.User_Id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Hr_Settings_Service.Earnings_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._EarningsList = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 401 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
      this.Hr_Settings_Service.Detections_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._DetectionsList = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 401 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
   }

  ngOnInit() {
      this.onClose = new Subject();
      const Data = { 'User_Id' : this.User_Id, Employee: this.Data['Employee']['_id']};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.PayrollMaster_View({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._MasterDetails = DecryptedData;
            this.Generate_Form();
         } else if (response['status'] === 400 || response['status'] === 401 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
         } else {
         this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
         }
      });
  }

   _calculation(type: any, value: any) {
      let ReturnData = 0;
      if (type === 'Rs') {
         ReturnData = value;
      }
      if (type === '%') {
         ReturnData =  (this._MasterDetails['Basic_Pay'] / 100) * value;
      }
      return ReturnData;
   }

   Generate_Form() {
      const Total_NoOf_Days = this.Data['No_Of_Days'];
      const Total_NoOf_Payable = this.Data['No_Of_Days'] - this.Data['No_Of_Absent'] - this.Data['No_Of_UnPaidLeaves'] ;
      const Total_NoOf_UnPayable = this.Data['No_Of_Days'] - (this.Data['No_Of_Days'] - this.Data['No_Of_Absent'] - this.Data['No_Of_UnPaidLeaves']) ;

      let UnPayable = false;
      if (Total_NoOf_UnPayable > 0) {
         UnPayable = true;
      }

      function Common_calculation(type: any, value: any, Basic: any) {
         let ReturnData = 0;
         if (type === 'Rs') {
            ReturnData = value;
         }
         if (type === '%') {
            ReturnData =  (Basic / 100) * value;
         }
         if (UnPayable) {
            ReturnData = Math.round((ReturnData / Total_NoOf_Days) * Total_NoOf_Payable);
         }
         return ReturnData;
      }

      const Basic_Pay = Common_calculation('Rs', this._MasterDetails['Basic_Pay'], this._MasterDetails['Basic_Pay']);
      const HRA = Common_calculation(this._MasterDetails['HRA_Type'], this._MasterDetails['HRA'], this._MasterDetails['Basic_Pay']);
      const Conveyance = Common_calculation(this._MasterDetails['Conveyance_Type'], this._MasterDetails['Conveyance'], this._MasterDetails['Basic_Pay']);
      const Medical_Reimbursement = Common_calculation(this._MasterDetails['Medical_Reimbursement_Type'], this._MasterDetails['Medical_Reimbursement'], this._MasterDetails['Basic_Pay']);
      const Food_Allowance = Common_calculation(this._MasterDetails['Food_Allowance_Type'], this._MasterDetails['Food_Allowance'], this._MasterDetails['Basic_Pay']);
      const Other_Allowance = Common_calculation(this._MasterDetails['Other_Allowance_Type'], this._MasterDetails['Other_Allowance'], this._MasterDetails['Basic_Pay']);
      const Professional_Tax = Common_calculation(this._MasterDetails['Professional_Tax_Type'], this._MasterDetails['Professional_Tax'], this._MasterDetails['Basic_Pay']);
      const Provident_Fund = Common_calculation(this._MasterDetails['Provident_Fund_Type'], this._MasterDetails['Provident_Fund'], this._MasterDetails['Basic_Pay']);
      const Employee_State_Insurance = Common_calculation(this._MasterDetails['Employee_State_Insurance_Type'], this._MasterDetails['Employee_State_Insurance'], this._MasterDetails['Basic_Pay']);
      const Medical_Insurance = Common_calculation(this._MasterDetails['Medical_Insurance_Type'], this._MasterDetails['Medical_Insurance'], this._MasterDetails['Basic_Pay']);
      const TDS = Common_calculation(this._MasterDetails['TDS_Type'], this._MasterDetails['TDS'], this._MasterDetails['Basic_Pay']);


      this.Form = new FormGroup({
         Employee: new FormControl(this.Data['Employee']['_id'], Validators.required),
         Attendance_Report: new FormControl(this.Data['_id'], Validators.required),
         Month: new FormControl(this.Data['MonthYear'], Validators.required),
         Payable_Days: new FormControl(Total_NoOf_Payable, Validators.required),
         UnPayable_Days: new FormControl(Total_NoOf_UnPayable, Validators.required),

         Basic_Pay: new FormControl(Basic_Pay, Validators.required),
         HRA: new FormControl(HRA, Validators.required),
         Conveyance: new FormControl(Conveyance, Validators.required),
         Medical_Reimbursement: new FormControl(Medical_Reimbursement, Validators.required),
         Food_Allowance: new FormControl(Food_Allowance, Validators.required),
         Other_Allowance: new FormControl(Other_Allowance, Validators.required),
         Professional_Tax: new FormControl(Professional_Tax, Validators.required),
         Provident_Fund: new FormControl(Provident_Fund, Validators.required),
         Employee_State_Insurance: new FormControl(Employee_State_Insurance, Validators.required),
         Medical_Insurance: new FormControl(Medical_Insurance, Validators.required),
         TDS: new FormControl(TDS, Validators.required),

         More_Earnings: new FormArray([]),
         More_Detections: new FormArray([]),

         Total_Earning: new FormControl(0, Validators.required),
         Total_Detection: new FormControl(0, Validators.required),

         Total_Salary: new FormControl(0, Validators.required),
         Created_By: new FormControl(this.User_Id, Validators.required),
      });
      this.calculate();
   }

   Earnings_Add() {
      const FormArr = <FormArray>this.Form.controls['More_Earnings'];
      FormArr.push(this.Earnings_Control());
   }
   Earnings_Control() {
      return new FormGroup({
         Earnings: new FormControl(null, Validators.required ),
         Amount: new FormControl(0, Validators.required )
      });
   }
   Remove_Earnings(_index: number) {
      const control = <FormArray>this.Form.controls['More_Earnings'];
      control.removeAt(_index);
      this.calculate();
   }
   Detections_Add() {
      const FormArr = <FormArray>this.Form.controls['More_Detections'];
      FormArr.push(this.Detections_Control());
   }
   Detections_Control() {
      return new FormGroup({
         Detections: new FormControl(null, Validators.required ),
         Amount: new FormControl(0, Validators.required )
      });
   }
   Remove_Detections(_index: number) {
      const control = <FormArray>this.Form.controls['More_Detections'];
      control.removeAt(_index);
      this.calculate();
   }

   calculate() {
      let Total_Earning = 0;
      let Total_Detection = 0;

      Total_Earning = Total_Earning + this.Form.controls['Basic_Pay'].value;
      Total_Earning = Total_Earning + this.Form.controls['HRA'].value;
      Total_Earning = Total_Earning + this.Form.controls['Conveyance'].value;
      Total_Earning = Total_Earning + this.Form.controls['Medical_Reimbursement'].value;
      Total_Earning = Total_Earning + this.Form.controls['Food_Allowance'].value;
      Total_Earning = Total_Earning + this.Form.controls['Other_Allowance'].value;

      Total_Detection = Total_Detection + this.Form.controls['Professional_Tax'].value;
      Total_Detection = Total_Detection + this.Form.controls['Provident_Fund'].value;
      Total_Detection = Total_Detection + this.Form.controls['Employee_State_Insurance'].value;
      Total_Detection = Total_Detection + this.Form.controls['Medical_Insurance'].value;
      Total_Detection = Total_Detection + this.Form.controls['TDS'].value;

      const FormArr = <FormArray>this.Form.controls['More_Earnings']['controls'];
      for (let index = 0; index < FormArr.length; index++) {
         Total_Earning = Total_Earning + FormArr[index]['value']['Amount'];
      }

      const FormArr_1 = <FormArray>this.Form.controls['More_Detections']['controls'];
      for (let index = 0; index < FormArr_1.length; index++) {
         Total_Detection = Total_Detection + FormArr_1[index]['value']['Amount'];
      }

      this.Form.controls['Total_Earning'].setValue(Total_Earning);
      this.Form.controls['Total_Detection'].setValue(Total_Detection);
      this.Form.controls['Total_Salary'].setValue(Total_Earning - Total_Detection);

   }

   Submit() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         const Data = this.Form.getRawValue();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Payroll_Create({'Info': Info}).subscribe( response => {
            this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Payroll Successfully Created' });
               this.onClose.next({Status: true, Message: 'Payroll Successfully Created' });
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Creating Payroll!'} );
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
