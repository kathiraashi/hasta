import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-crm-machines-edit',
  templateUrl: './crm-machines-edit.component.html',
  styleUrls: ['./crm-machines-edit.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmMachinesEditComponent implements OnInit {

  _Selects: any[] = ['PL', 'BR', 'AMC'];
  _Machine_Types: any[] =  [];
  _Controller_Types: any[] =  [];
  _Maintenance_Parts: any[] =  [];
  _Customers: any[] =  [];

  User_Type;
  If_Employee;
  Form: FormGroup;

  Loader: Boolean = true;
  _Data = {};
  Machine_Id;


  User_Id;

  constructor(
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService,
               public router: Router,
               private active_route: ActivatedRoute,
               public Login_Service: LoginService,
            ) {
               this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
               this.User_Type = this.Login_Service.LoginUser_Info()['User_Type'];
               this.If_Employee = this.Login_Service.LoginUser_Info()['Employee'];
               const Data = {'User_Id' : this.User_Id, Customers: this.If_Employee };
               if (this.User_Type === 'Employee') {
                  Data.Customers = this.If_Employee['Customers'];
               }
               this.active_route.url.subscribe((u) => {
                  this.Machine_Id = this.active_route.snapshot.params['Machine_Id'];
                  const Data_1 = { 'Machine_Id': this.Machine_Id, 'User_Id' : this.User_Id };
                  let Info_1 = CryptoJS.AES.encrypt(JSON.stringify(Data_1), 'SecretKeyIn@123');
                  Info_1 = Info_1.toString();
                  this.Crm_Service.CrmMachine_View({ 'Info': Info_1 }).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     this.Loader = false;
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Data = DecryptedData;
                        this.UpdateForm();
                        this.ControllerTypeUpdate();
                        this.MachineTypeUpdate();
                        this.CustomerUpdate();
                        this.MaintenancePartsUpdate();
                        console.log(this._Data);
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Details Getting Error!, But not Identify!' });
                     }
                  });
               });
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               // Get Machine Types List
                  this.SettingsService.Machine_Type_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Machine_Types = DecryptedData;
                        this.MachineTypeUpdate();
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Machine Types Simple List Getting Error!, But not Identify!' });
                     }
                  });
               // Get Controller Types List
                  this.SettingsService.Controller_Type_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Controller_Types = DecryptedData;
                        this.ControllerTypeUpdate();
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Controller Types Simple List Getting Error!, But not Identify!' });
                     }
                  });
               // Get Customers Simple Types List
                  this.Crm_Service.CrmCustomers_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Customers = DecryptedData;
                        this.CustomerUpdate();
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Crm Customers Simple List Getting Error!, But not Identify!' });
                     }
                  });
               // Get Maintenance Parts Simple List
                  this.SettingsService.MachineMaintenancePart_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Maintenance_Parts = DecryptedData;
                        this.MaintenancePartsUpdate();
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                     } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Controller Types Simple List Getting Error!, But not Identify!' });
                     }
                  });
            }

   ngOnInit() {
      this.Form = new FormGroup({
         Machine_Id: new FormControl('', Validators.required),
         MachineName: new FormControl('', Validators.required),
         Customer: new FormControl(null, Validators.required),
         MachineType: new FormControl(null),
         ControllerType: new FormControl(null),
         MachineModel: new FormControl(''),
         MachineMake: new FormControl(''),
         MfgSerialNo: new FormControl(''),
         MachineId: new FormControl(''),
         MfgYear: new FormControl(''),
         DateOfPlaced: new FormControl(new Date()),
         ControllerModelNo: new FormControl(''),
         Maintenance_Parts: new FormControl(null),
         User_Id: new FormControl(this.User_Id)
      });
   }
   UpdateForm() {
      this.Form.controls['Machine_Id'].setValue(this._Data['_id']);
      this.Form.controls['MachineName'].setValue(this._Data['MachineName']);
      this.Form.controls['MachineModel'].setValue(this._Data['MachineModel']);
      this.Form.controls['MachineMake'].setValue(this._Data['MachineMake']);
      this.Form.controls['MfgSerialNo'].setValue(this._Data['MfgSerialNo']);
      this.Form.controls['MachineId'].setValue(this._Data['MachineId']);
      this.Form.controls['MfgYear'].setValue(this._Data['MfgYear']);
      this.Form.controls['DateOfPlaced'].setValue(new Date(this._Data['DateOfPlaced']));
      this.Form.controls['ControllerModelNo'].setValue(this._Data['ControllerModelNo']);
   }

   MachineTypeUpdate() {
      if (this._Machine_Types.length > 0 && this._Data !== undefined && this._Data['MachineType'] !== null) {
        this.Form.controls['MachineType'].setValue(this._Data['MachineType']);
      }
   }
   ControllerTypeUpdate() {
      if (this._Controller_Types.length > 0 && this._Data !== undefined && this._Data['ControllerType'] !== null) {
        this.Form.controls['ControllerType'].setValue(this._Data['ControllerType']);
      }
   }
   CustomerUpdate() {
      if (this._Customers.length > 0 && this._Data !== undefined && this._Data['Customer'] !== null) {
        this.Form.controls['Customer'].setValue(this._Data['Customer']);
      }
   }
   MaintenancePartsUpdate() {
      if (this._Maintenance_Parts.length > 0 && this._Data !== undefined && this._Data['Maintenance_Parts'] !== null) {
        this.Form.controls['Maintenance_Parts'].setValue(this._Data['Maintenance_Parts']);
      }
   }

   NotAllow(): boolean {return false; }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachine_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Machine Details Successfully Updated' });
               this.router.navigate(['/crm_machine_list']);
            } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updated Machine Details Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
