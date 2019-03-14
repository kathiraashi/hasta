import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
import { LoginService } from './../../../../services/LoginService/login.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-model-schedule-activity-create',
  templateUrl: './model-schedule-activity-create.component.html',
  styleUrls: ['./model-schedule-activity-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class ModelScheduleActivityCreateComponent implements OnInit {

   _Data: Object;

   _Today: Date = new Date();

   onClose: Subject<any>;
   Form: FormGroup;

   Uploading: Boolean = false;

   _Schedule_Activities: any[] = [];
   _Schedule_Info: Object = {};


   User_Id;

  constructor(
            public bsModalRef: BsModalRef,
            private Toastr: ToastrService,
            public SettingsService: CrmSettingsService,
            public Crm_Service: CrmService,
            public Login_Service: LoginService
         ) {
            this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
         }

   ngOnInit() {
      this.onClose = new Subject();

      if (this._Data['Type'] === 'Create' || this._Data['Type'] === 'Edit' || this._Data['Type'] === 'ReSchedule') {
         const Data = { 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.SettingsService.MachineScheduleActivity_SimpleList({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Schedule_Activities = DecryptedData;
               if (this._Data['Type'] === 'Edit' || this._Data['Type'] === 'ReSchedule') {
                  setTimeout(() => {
                     this.Form.controls['Schedule_Activity'].setValue(this._Data['Schedule_Info']['Schedule_Activity']);
                  }, 500);
               }
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Contact Roles Simple List Getting Error!, But not Identify!' });
            }
         });
      }
      if (this._Data['Type'] === 'Create' ) {
         this.Form = new FormGroup({
            Machine_Id: new FormControl(this._Data['Machine_Id'], Validators.required),
            Schedule_Activity: new FormControl(null, { validators: Validators.required,
                                                      asyncValidators: [this.ScheduleActivity_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' }),
            Schedule_Date: new FormControl(new Date(), Validators.required),
            Description: new FormControl(''),
            User_Id: new FormControl(this.User_Id),
         });
      }
      if (this._Data['Type'] === 'Edit' ) {
         this.Form = new FormGroup({
            Schedule_Id: new FormControl(this._Data['Schedule_Info']['_id'], Validators.required),
            Schedule_Activity: new FormControl(null, { validators: Validators.required,
                                                         asyncValidators: [this.ScheduleActivity_AsyncValidate.bind(this)],
                                                         updateOn: 'blur' }),
            Schedule_Date: new FormControl(this._Data['Schedule_Info']['Schedule_Date'], Validators.required),
            Description: new FormControl(this._Data['Schedule_Info']['Description']),
            User_Id: new FormControl(this.User_Id),
         });
         if (this._Data['Schedule_Info']['Last_Activity_Id'] !== null) {
            this.Form.controls['Schedule_Activity'].disable();
         }
      }
      if (this._Data['Type'] === 'ReSchedule' ) {
         this.Form = new FormGroup({
            Schedule_Id: new FormControl(this._Data['Schedule_Info']['_id'], Validators.required),
            Machine_Id: new FormControl(this._Data['Machine_Id'], Validators.required),
            Schedule_Activity: new FormControl( { value: null, disabled: true }  , Validators.required),
            Schedule_Date: new FormControl(this._Data['Schedule_Info']['Schedule_Date'], Validators.required),
            Description: new FormControl(),
            Activity_By: new FormControl(),
            New_Schedule_Date: new FormControl(new Date(), Validators.required),
            User_Id: new FormControl(this.User_Id),
         });
      }
      if (this._Data['Type'] === 'View') {
         this._Schedule_Info = this._Data['Schedule_Info'];
      }
   }

   NotAllow(): boolean {return false; }

   ScheduleActivity_AsyncValidate( control: AbstractControl ) {
      const Data = { Schedule_Activity: control.value, User_Id: this.User_Id,  Machine_Id: this._Data['Machine_Id'] };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Crm_Service.ScheduleActivity_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            if (this._Data['Type'] === 'Edit' && control.value['_id'] === this._Data['Schedule_Info']['Schedule_Activity']['_id']) {
               return null;
            } else {
               return { scheduleActivity_NotAvailable: true};
            }
         }
      }));
   }

   onSubmit() {
      if (this._Data['Type'] === 'Create') {
         this.Submit();
      }
      if (this._Data['Type'] === 'Edit') {
         this.Update();
      }
      if (this._Data['Type'] === 'ReSchedule') {
         this.ReSchedule();
      }
   }

   Submit() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_ScheduleActivity_Create({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Schedule Successfully Created' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'New Schedule Create Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

   Update() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_ScheduleActivity_Update({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Schedule Details Successfully Updated' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Schedule Update Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

   ReSchedule() {
      if (this.Form.valid) {
         this.Uploading = true;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_ScheduleActivity_ReSchedule({ 'Info': Info }).subscribe( response => {
            this.Uploading = false;
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'ReSchedule Successfully Updated' });
               this.onClose.next({Status: true, Response: DecryptedData});
               this.bsModalRef.hide();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'ReSchedule Update Error!, But not Identify!' });
               this.onClose.next({Status: false});
               this.bsModalRef.hide();
            }
         });
      }
   }

}
