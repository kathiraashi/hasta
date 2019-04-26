import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { LoginService } from '../../../services/LoginService/login.service';
import { ToastrService } from './../../../services/common-services/toastr-service/toastr.service';
import { HrmsServiceService } from './../../../services/Hrms/hrms-service.service';

@Component({
  selector: 'app-model-expenses-approve',
  templateUrl: './model-expenses-approve.component.html',
  styleUrls: ['./model-expenses-approve.component.css']
})
export class ModelExpensesApproveComponent implements OnInit {

   File_Url = 'http://159.89.163.252:4000/API/Uploads/';
   // File_Url = 'http://localhost:4000/API/Uploads/';

   onClose: Subject<any>;

   Type: string;
   User_Id: any;
   Form: FormGroup;
   _Data: Object = {};

   constructor(   public bsModalRef: BsModalRef,
                  private Toastr: ToastrService,
                  public Service: HrmsServiceService,
                  public Login_Service: LoginService
               ) {
      this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
   }

   ngOnInit() {
      this.onClose = new Subject();

      this.Form = new FormGroup({
         Expenses_Id: new FormControl(this._Data['_id'], Validators.required),
         Expenses_Array: new FormArray([]),
         Total_Expenses: new FormControl(this._Data['Total_Expenses']),
         Total_Approved_Expenses: new FormControl(this._Data['Total_Approved_Expenses'], Validators.required),
         User_Id: new FormControl(this.User_Id, Validators.required),
         Payment_Remarks: new FormControl(this._Data['Payment_Remarks']),
      });
      this._Data['Expenses_Array'].map(obj => {
         const control = <FormArray>this.Form.get('Expenses_Array');
         control.push(new FormGroup({
            Expenses_Array_Id: new FormControl(obj['_id'], Validators.required),
            Date: new FormControl(obj['Date']),
            Amount: new FormControl(obj['Amount']),
            Approved_Amount: new FormControl(obj['Approved_Amount'], [Validators.required, Validators.pattern('^[0-9\,\.\]*$')]),
            Expenses_Type: new FormControl(obj['Expenses_Type']['Expenses_Type']),
            Description: new FormControl(obj['Description']),
            Remarks: new FormControl(obj['Remarks']),
         }));
      });
   }

   Amount_Change() {
      const Expenses_Array = <FormArray>this.Form.controls['Expenses_Array'];
      let Approved_Amount = 0;
      Expenses_Array.controls.map(_obj => {
         const Expenses_Group = <FormGroup>_obj;
         Approved_Amount = Approved_Amount + Number(Expenses_Group.controls['Approved_Amount'].value);
      });
      this.Form.controls['Total_Approved_Expenses'].setValue(Approved_Amount);
   }

   Submit() {
      if (this.Form.valid) {
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Service.Expenses_Approve({'Info': Info}).subscribe( response => {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               this.Toastr.NewToastrMessage(  { Type: 'Success', Message: 'Expenses Successfully Approved' });
               this.onClose.next({Status: true, Response: this.Form.value });
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message'] } );
               this.onClose.next({Status: false, Message: 'Bad Request Error!'});
               this.bsModalRef.hide();
         }  else {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Error Not Identify!, Approving Expenses!'} );
               this.onClose.next({Status: false, Message: 'UnExpected Error!'});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
