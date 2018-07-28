import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-crm-machines-create',
  templateUrl: './crm-machines-create.component.html',
  styleUrls: ['./crm-machines-create.component.css']
})
export class CrmMachinesCreateComponent implements OnInit {

  _Selects: any[] = ['PL', 'BR', 'AMC'];
  _Machine_Types: any[] =  [];
  _Controller_Types: any[] =  [];
  _Customers: any[] =  [];

  Form: FormGroup;

  Company_Id = '5b3c66d01dd3ff14589602fe';
  User_Id = '5b530ef333fc40064c0db31e';

  constructor(
               private Toastr: ToastrService,
               public SettingsService: CrmSettingsService,
               public Crm_Service: CrmService,
               public router: Router
            ) {
               const Data = { 'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
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
         ControllerModelNo: new FormControl(''),
         Company_Id: new FormControl(this.Company_Id),
         User_Id: new FormControl(this.User_Id),
      });
   }

   Submit() {
      if (this.Form.valid) {
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
