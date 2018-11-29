import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, AbstractControl, Validators } from '@angular/forms';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../../services/Crm/crm.service';
import { LoginService } from './../../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-machine-working-update',
  templateUrl: './machine-working-update.component.html',
  styleUrls: ['./machine-working-update.component.css']
})
export class MachineWorkingUpdateComponent implements OnInit {

   @Input() CustomerData: Object;


   User_Id;
   User_Type;
   Loader: Boolean = true;
   previous_btn: Boolean = true;
   next_btn: Boolean = false;
   Required_Date: Date = new Date();

   _List: any[] = [];

   bsModalRef: BsModalRef;

   AllFromGroups: FormGroup;

   constructor(
               private modalService: BsModalService,
               private Toastr: ToastrService,
               public Crm_Service: CrmService,
               public Login_Service: LoginService,
               private Form_Builder: FormBuilder,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
             }

   ngOnInit() {
      this.AllFromGroups = new FormGroup({
         FromGroups: this.Form_Builder.array([])
       });
       this.LoadApi();
   }

   LoadApi() {
      const Data = {Customer_Id: this.CustomerData['_id'], 'User_Id' : this.User_Id, Required_Date: this.Required_Date };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Crm_Service.CrmMachinesList_ForWorking({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(this._List);
            this._List.map(obj => this.FormGroup_Create(obj));
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Contact List Getting Error!, But not Identify!' });
         }
      });
   }


   NotAllow(): boolean {return false; }


   FormGroup_Create(_Data): void {
      const Show_Previous = [];
      _Data['PreviousShifts'].map(obj => {
         Show_Previous.push(obj['Start_Time'] + '-' + obj['Stop_Time']);
      });
      const control = <FormArray>this.AllFromGroups.get('FromGroups');
      const Group = new FormGroup({
                        User_Id: new FormControl(this.User_Id, Validators.required),
                        Machine_Id: new FormControl(_Data['_id'], Validators.required),
                        Machine_Name: new FormControl(_Data['MachineName'], Validators.required),
                        Show_Previous: new FormControl(Show_Previous),
                        Previous_Shifts: new FormControl(_Data['PreviousShifts']),
                        Shift_Date: new FormControl(this.Required_Date, Validators.required),
                        Start_Date: new FormControl(this.Required_Date, Validators.required),
                        Stop_Date: new FormControl(this.Required_Date, Validators.required),
                        Start_Time: new FormControl(null, Validators.required),
                        Stop_Time: new FormControl(null, Validators.required),
                        Uploading: new FormControl(false, Validators.required),
                        ShowTimePicker: new FormControl(true, Validators.required),
                        TicketIsOpen: new FormControl(_Data['Open_Ticket']),
                     }, [this.ValidateTimes]);
      control.push(Group);
   }

   ValidateTimes(Group: FormGroup) {
      if (Group && Group.controls['Start_Time'].value !== null && Group.controls['Stop_Time'].value !== null ) {
         const Required_Date = Group.controls['Shift_Date'].value;
         const Str_Date = (Required_Date.getMonth() + 1 + '/' + Required_Date.getDate() +  '/' + Required_Date.getFullYear()).toString();
         const StartDateTime = new Date( Str_Date + ' ' + Group.controls['Start_Time'].value ).valueOf();
         const StopDateTime = new Date( Str_Date + ' ' + Group.controls['Stop_Time'].value ).valueOf();
         let Return_Err = false;
         if (StartDateTime < StopDateTime) {
            Group.controls['Previous_Shifts'].value.map(obj => {
               const fromDateTime = new Date(obj['Start_Date']).valueOf();
               const ToDateTime = new Date(obj['Stop_Date']).valueOf();
               if ((StartDateTime > fromDateTime && StartDateTime < ToDateTime) ||  (StartDateTime <= fromDateTime && StopDateTime > fromDateTime)) { // (X > A && X < B) ||  (X <= A && Y > A)
                  Return_Err = true;
               }
            });
            if (Return_Err && Group.controls['Previous_Shifts'].value.length > 0) {
               return { PreviousAffect: true };
            } else {
               return null;
            }
         } else {
            return { InvalidTime: true };
         }
      } else {
         return null;
      }
   }


   GotoPrevious() {
      this.AllFromGroups.controls['FromGroups']['controls'] = [];
      this.Loader = true;
      this.Required_Date = new Date(this.Required_Date.setDate(this.Required_Date.getDate() - 1 ));
      this.next_btn = true;
      this.LoadApi();
   }
   GotoNext() {
      this.AllFromGroups.controls['FromGroups']['controls'] = [];
      this.Loader = true;
      this.Required_Date = new Date(this.Required_Date.setDate(this.Required_Date.getDate() + 1 ));
      this.LoadApi();
      const Req_Date = this.Required_Date;
      const CurrentDate = new Date(Req_Date.setHours(0, 0, 0, 0 )).getTime();
      const Today = new Date(new Date().setHours(0, 0, 0, 0 )).getTime();
      if (CurrentDate < Today ) {
         this.next_btn = true;
      } else {
         this.next_btn = false;
      }
   }

   Submit(Group: FormGroup) {
      if (Group.valid && Group.status === 'VALID') {
         const Required_Date = Group.controls['Shift_Date'].value;
         const Str_Date = (Required_Date.getMonth() + 1 + '/' + Required_Date.getDate() +  '/' + Required_Date.getFullYear()).toString();
         Group.controls['Start_Date'].setValue(new Date( Str_Date + ' ' + Group.controls['Start_Time'].value ));
         Group.controls['Stop_Date'].setValue(new Date( Str_Date + ' ' + Group.controls['Stop_Time'].value ));
         Group.controls['Uploading'].setValue(true);
         Group.controls['Start_Time'].disable();
         Group.controls['Stop_Time'].disable();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Group.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_WorkingUpdate({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            Group.controls['Uploading'].setValue(false);
            Group.controls['Start_Time'].enable();
            Group.controls['Stop_Time'].enable();
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const Prev_Arr = <any[]>Group.controls['Show_Previous'].value;
               Prev_Arr.push(Group.controls['Start_Time'].value + '-' + Group.controls['Stop_Time'].value);
               Group.controls['Show_Previous'].setValue(Prev_Arr);
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               const Prev_Data_Arr = <any[]>Group.controls['Previous_Shifts'].value;
               Prev_Data_Arr.push(DecryptedData);
               Group.controls['Previous_Shifts'].setValue(Prev_Data_Arr);
               Group.controls['Start_Time'].setValue(null);
               Group.controls['Stop_Time'].setValue(null);
               Group.updateValueAndValidity();
               Group.controls['ShowTimePicker'].setValue(false);
               setTimeout(() => {
                  Group.controls['ShowTimePicker'].setValue(true);
                  Group.updateValueAndValidity();
               }, 100);
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Shift Successfully Updated' });
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Shift Updated Error!, But not Identify!' });
            }
         });
      }
   }


}
