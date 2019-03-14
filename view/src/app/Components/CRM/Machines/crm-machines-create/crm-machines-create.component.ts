import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
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

import * as CryptoJS from 'crypto-js';

import { LoginService } from './../../../../services/LoginService/login.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-crm-machines-create',
  templateUrl: './crm-machines-create.component.html',
  styleUrls: ['./crm-machines-create.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}],
})
export class CrmMachinesCreateComponent implements OnInit {

   modalRef: BsModalRef;

  _Selects: any[] = ['PL', 'BR', 'AMC'];
  _Machine_Types: any[] =  [];
  _Controller_Types: any[] =  [];
  _Maintenance_Parts: any[] =  [];
  _Customers: any[] =  [];

  User_Type;
  If_Employee;
  Form: FormGroup;


  User_Id;

  constructor(
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService,
               public router: Router,
               private modalService: BsModalService,
               public Login_Service: LoginService,
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
               // Get Machine Types List
                  this.SettingsService.Machine_Type_SimpleList({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._Machine_Types = DecryptedData;
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

   NotAllow(): boolean {return false; }

   OpenModel(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template, { class: 'modal-md', ignoreBackdropClick: true });
   }

   Submit() {
      if (this.Form.valid) {
         this.modalRef.hide();
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Crm_Service.CrmMachines_Create({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'New Machine Successfully Created' });
               this.router.navigate(['/crm_machine_list']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Machine Getting Error!, But not Identify!' });
            }
         });
      }
   }

}
