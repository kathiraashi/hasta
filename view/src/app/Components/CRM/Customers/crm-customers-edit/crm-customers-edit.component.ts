import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

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
import { AdminService } from './../../../../services/Admin/admin.service';
import { CrmSettingsService } from './../../../../services/settings/crmSettings/crm-settings.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';

@Component({
  selector: 'app-crm-customers-edit',
  templateUrl: './crm-customers-edit.component.html',
  styleUrls: ['./crm-customers-edit.component.css'],
  providers: [{provide: DateAdapter, useClass: MyDateAdapter}]
})
export class CrmCustomersEditComponent implements OnInit {

  _CompanyTypes: any[] = ['PL', 'BD', 'AMC'];
  _Industry_Types: any[] =  [];
  _Ownership_Types: any[] =  [];

  AllCountry: any[];
  AllStateOfCountry: any[];
  AllCityOfState:  any[];

  ShopFloorAllCountry: any[];
  ShopFloorAllStateOfCountry: any[];
  ShopFloorAllCityOfState:  any[];

  ShopFloor_State: any;

  AddLimitField: Boolean = false;

  Form: FormGroup;

  User_Id: any;
  Customer_Id: any;
  _Data;
  Loader: Boolean = true;

  constructor(
     public Service: AdminService,
     private Toastr: ToastrService,
     public SettingsService: CrmSettingsService,
     public Crm_Service: CrmService,
     public Login_Service: LoginService,
     public router: Router,
     private active_route: ActivatedRoute,
  ) {
        this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
         const Data = { 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get Industry Type List
         this.SettingsService.Industry_Type_SimpleList({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._Industry_Types = DecryptedData;
               this.IndustryTypeUpdate();
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Industry Types Simple List Getting Error!, But not Identify!' });
            }
         });
         // Get Ownership Type List
         this.SettingsService.Ownership_Type_SimpleList({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this._Ownership_Types = DecryptedData;
              this.OwnershipTypeUpdate();
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Ownership Types Simple List Getting Error!, But not Identify!' });
           }
        });
        // Get Country List
        this.Service.Country_List({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this.AllCountry = DecryptedData;
              this.ShopFloorAllCountry = DecryptedData;
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Ownership Types Simple List Getting Error!, But not Identify!' });
           }
        });
        this.active_route.url.subscribe((u) => {
          this.Customer_Id = this.active_route.snapshot.params['Customer_Id'];
          const Data_1 = { 'Customer_Id': this.Customer_Id,  'User_Id' : this.User_Id };
          let Info_1 = CryptoJS.AES.encrypt(JSON.stringify(Data_1), 'SecretKeyIn@123');
          Info_1 = Info_1.toString();
          this.Crm_Service.CrmCustomers_View({ 'Info': Info_1 }).subscribe( response => {
             const ResponseData = JSON.parse(response['_body']);
             this.Loader = false;
             if (response['status'] === 200 && ResponseData['Status'] ) {
                const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                this._Data = DecryptedData;
                this.UpdateForm();
                this.IndustryTypeUpdate();
                this.OwnershipTypeUpdate();
             } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
             } else if (response['status'] === 401 && !ResponseData['Status']) {
                this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
             } else {
                this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Data Getting Error!, But not Identify!' });
             }
          });
        });

      }

  ngOnInit() {
    this.Form = new FormGroup({
      User_Id: new FormControl(this.User_Id),
      Customer_Id: new FormControl('', Validators.required),
      CompanyName: new FormControl('', Validators.required),
      PhoneNumber: new FormControl('', Validators.required),
      EmailAddress: new FormControl('', Validators.required),
      Website: new FormControl(''),
      NoOfEmployees: new FormControl(''),
      CompanyType: new FormControl(null, Validators.required),
      IndustryType: new FormControl(null),
      OwnershipType: new FormControl(null),
      StateCode: new FormControl(''),
      GSTNo: new FormControl(''),
      Notes: new FormControl(''),
      BillingStreet: new FormControl('', Validators.required),
      BillingArea: new FormControl('', Validators.required),
      BillingCountry: new FormControl(null, Validators.required),
      BillingState: new FormControl(null, Validators.required),
      BillingCity: new FormControl(null, Validators.required),
      BillingZipCode: new FormControl('', Validators.required),
      SameAddresses: new FormControl(false),
      ShopFloorStreet: new FormControl('', Validators.required),
      ShopFloorArea: new FormControl('', Validators.required),
      ShopFloorCountry: new FormControl(null, Validators.required),
      ShopFloorState: new FormControl(null, Validators.required),
      ShopFloorCity: new FormControl(null, Validators.required),
      ShopFloorZipCode: new FormControl('', Validators.required),
   });
  }
  UpdateForm() {
    this.Form.controls['Customer_Id'].setValue(this._Data['_id']);
    this.Form.controls['CompanyName'].setValue(this._Data['CompanyName']);
    this.Form.controls['PhoneNumber'].setValue(this._Data['PhoneNumber']);
    this.Form.controls['EmailAddress'].setValue(this._Data['EmailAddress']);
    this.Form.controls['Website'].setValue(this._Data['Website']);
    this.Form.controls['NoOfEmployees'].setValue(this._Data['NoOfEmployees']);
    this.Form.controls['CompanyType'].setValue(this._Data['CompanyType']);
    if (this._Data['CompanyType'] === 'AMC') {
      this.CompanyTypeChange();
      setTimeout(() => {
         this.Form.controls['TicketsLimit'].setValue(this._Data['TicketsLimit']);
         this.Form.controls['AMCFrom'].setValue(this._Data['AMCFrom']);
         this.Form.controls['AMCTo'].setValue(this._Data['AMCTo']);
      }, 500);
    }
    this.Form.controls['StateCode'].setValue(this._Data['StateCode']);
    this.Form.controls['GSTNo'].setValue(this._Data['GSTNo']);
    this.Form.controls['Notes'].setValue(this._Data['Notes']);

    this.Form.controls['BillingStreet'].setValue(this._Data['BillingAddress']['Street']);
    this.Form.controls['BillingArea'].setValue(this._Data['BillingAddress']['Area']);
    this.Form.controls['BillingZipCode'].setValue(this._Data['BillingAddress']['ZipCode']);
    this.Form.controls['BillingCountry'].setValue(this._Data['BillingAddress']['Country']);
    const Data = {Country_Id: this._Data['BillingAddress']['Country']['_id'], 'User_Id' : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    // Get State List
    this.Service.State_List({'Info': Info}).subscribe( response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
         const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
         const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
         this.AllStateOfCountry = DecryptedData;
         this.Form.controls['BillingState'].setValue(this._Data['BillingAddress']['State']);
         const Data_1 = {State_Id: this._Data['BillingAddress']['State']['_id'], 'User_Id' : this.User_Id };
         let Info_1 = CryptoJS.AES.encrypt(JSON.stringify(Data_1), 'SecretKeyIn@123');
         Info_1 = Info_1.toString();
         // Get City List
        this.Service.City_List({'Info': Info_1}).subscribe( response_1 => {
           const ResponseData_1 = JSON.parse(response_1['_body']);
           if (response_1['status'] === 200 && ResponseData_1['Status'] ) {
              const CryptoBytes_1  = CryptoJS.AES.decrypt(ResponseData_1['Response'], 'SecretKeyOut@123');
              const DecryptedData_1 = JSON.parse(CryptoBytes_1.toString(CryptoJS.enc.Utf8));
              this.AllCityOfState = DecryptedData_1;
              this.Form.controls['BillingCity'].setValue(this._Data['BillingAddress']['City']);
              this.Form.controls['SameAddresses'].setValue(this._Data['SameAddresses']);
              if (this._Data['SameAddresses']) {
                this.SameAddresses_Change();
              }
           } else if (response_1['status'] === 400 || response_1['status'] === 417 || response_1['status'] === 401 && !ResponseData_1['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData_1['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
           }
        });
      } else if (response['status'] === 400 || response['status'] === 417 || response['status'] === 401 && !ResponseData['Status']) {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
      } else {
         this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
      }
    });
    if (!this._Data['SameAddresses']) {
      this.Form.controls['ShopFloorStreet'].setValue(this._Data['ShopFloorAddress']['Street']);
      this.Form.controls['ShopFloorArea'].setValue(this._Data['ShopFloorAddress']['Area']);
      this.Form.controls['ShopFloorZipCode'].setValue(this._Data['ShopFloorAddress']['ZipCode']);
      this.Form.controls['ShopFloorCountry'].setValue(this._Data['ShopFloorAddress']['Country']);
      const Data_2 = {Country_Id: this._Data['ShopFloorAddress']['Country']['_id'], 'User_Id' : this.User_Id };
      let Info_2 = CryptoJS.AES.encrypt(JSON.stringify(Data_2), 'SecretKeyIn@123');
      Info_2 = Info.toString();
      // Get State List
      this.Service.State_List({'Info': Info_2}).subscribe( response_2 => {
        const ResponseData_2 = JSON.parse(response_2['_body']);
        if (response_2['status'] === 200 && ResponseData_2['Status'] ) {
          const CryptoBytes_2  = CryptoJS.AES.decrypt(ResponseData_2['Response'], 'SecretKeyOut@123');
          const DecryptedData_2 = JSON.parse(CryptoBytes_2.toString(CryptoJS.enc.Utf8));
          this.ShopFloorAllStateOfCountry = DecryptedData_2;
          this.Form.controls['ShopFloorState'].setValue(this._Data['ShopFloorAddress']['State']);
          const Data_3 = {State_Id: this._Data['ShopFloorAddress']['State']['_id'], 'User_Id' : this.User_Id };
          let Info_3 = CryptoJS.AES.encrypt(JSON.stringify(Data_3), 'SecretKeyIn@123');
          Info_3 = Info_3.toString();
          // Get City List
          this.Service.City_List({'Info': Info_3}).subscribe( response_3 => {
            const ResponseData_3 = JSON.parse(response_3['_body']);
            if (response_3['status'] === 200 && ResponseData_3['Status'] ) {
                const CryptoBytes_3  = CryptoJS.AES.decrypt(ResponseData_3['Response'], 'SecretKeyOut@123');
                const DecryptedData_3 = JSON.parse(CryptoBytes_3.toString(CryptoJS.enc.Utf8));
                this.AllCityOfState = DecryptedData_3;
                this.Form.controls['ShopFloorCity'].setValue(this._Data['ShopFloorAddress']['City']);
            } else if (response_3['status'] === 400 || response_3['status'] === 417 || response_3['status'] === 401 && !ResponseData_3['Status']) {
                this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData_3['Message'] });
            } else {
                this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
            }
          });
        } else if (response_2['status'] === 400 || response_2['status'] === 417 || response_2['status'] === 401 && !ResponseData_2['Status']) {
          this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData_2['Message'] });
        } else {
          this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
        }
      });
    }

      // ShopFloorState: new FormControl(null, Validators.required),
      // ShopFloorCity: new FormControl(null, Validators.required),
  }

  IndustryTypeUpdate() {
    if (this._Industry_Types.length > 0 && this._Data !== undefined && this._Data['IndustryType'] !== null) {
      this.Form.controls['IndustryType'].setValue(this._Data['IndustryType']);
    }
  }
  OwnershipTypeUpdate() {
    if (this._Ownership_Types.length > 0 && this._Data !== undefined &&  this._Data['OwnershipType'] !== null) {
      this.Form.controls['OwnershipType'].setValue(this._Data['OwnershipType']);
    }
  }

  NotAllow(): boolean {return false; }


  CompanyTypeChange() {
   const type = this.Form.controls['CompanyType'].value;
   if (type === 'AMC') {
      this.Form.addControl('TicketsLimit', new FormControl('', Validators.required));
      this.Form.addControl('AMCFrom', new FormControl(null, Validators.required));
      this.Form.addControl('AMCTo', new FormControl(null, Validators.required));
      this.AddLimitField = true;
   } else {
      this.Form.removeControl('TicketsLimit');
      this.Form.removeControl('AMCFrom');
      this.Form.removeControl('AMCTo');
      this.AddLimitField = false;
   }
}

  BillingCountry_Change() {
     const SelectedCountry = this.Form.controls['BillingCountry'].value;
     if (SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
        const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
        this.Service.State_List({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this.AllStateOfCountry = DecryptedData;
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
           }
        });
     }
     this.Form.controls['BillingState'].setValue(null);
     this.Form.controls['BillingCity'].setValue(null);
  }

  BillingState_Change() {
     const SelectedState = this.Form.controls['BillingState'].value;
     if ( SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
        const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
        this.Service.City_List({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this.AllCityOfState = DecryptedData;
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
           }
        });
     }
     this.Form.controls['BillingCity'].setValue(null);
  }

  ShopFloorCountry_Change() {
     const SelectedCountry = this.Form.controls['ShopFloorCountry'].value;
     if (!this.Form.controls['SameAddresses'].value && SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
        const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
        this.Service.State_List({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this.ShopFloorAllStateOfCountry = DecryptedData;
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
           }
        });
     }
     if (!this.Form.controls['SameAddresses'].value) {
        this.Form.controls['ShopFloorState'].setValue(null);
        this.Form.controls['ShopFloorCity'].setValue(null);
     }
  }

  ShopFloorState_Change() {
     const SelectedState = this.Form.controls['ShopFloorState'].value;
     if ( !this.Form.controls['SameAddresses'].value && SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
        const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
        this.Service.City_List({'Info': Info}).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
              const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
              const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
              this.ShopFloorAllCityOfState = DecryptedData;
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
           }
        });
     }
     if (!this.Form.controls['SameAddresses'].value) {
        this.Form.controls['ShopFloorCity'].setValue(null);
     }
  }

  SameAddresses_Change() {
     const Status = this.Form.controls['SameAddresses'].value;
     if (Status) {
        this.Form.controls['ShopFloorStreet'].setValue(this.Form.controls['BillingStreet'].value);
        this.Form.controls['ShopFloorArea'].setValue(this.Form.controls['BillingArea'].value);
        this.Form.controls['ShopFloorCountry'].setValue(this.Form.controls['BillingCountry'].value);
        this.ShopFloorAllStateOfCountry = this.AllStateOfCountry;
        setTimeout(() => {
           this.Form.controls['ShopFloorState'].setValue(this.Form.controls['BillingState'].value);
        }, 100);
        this.ShopFloorAllCityOfState = this.AllCityOfState;
        setTimeout(() => {
           this.Form.controls['ShopFloorCity'].setValue(this.Form.controls['BillingCity'].value);
        }, 100);
        this.Form.controls['ShopFloorZipCode'].setValue(this.Form.controls['BillingZipCode'].value);
        setTimeout(() => {
           this.Form.controls['ShopFloorStreet'].disable();
           this.Form.controls['ShopFloorArea'].disable();
           this.Form.controls['ShopFloorCountry'].disable();
           this.Form.controls['ShopFloorState'].disable();
           this.Form.controls['ShopFloorCity'].disable();
           this.Form.controls['ShopFloorZipCode'].disable();
        }, 100);
     } else {
        this.Form.controls['ShopFloorStreet'].enable();
        this.Form.controls['ShopFloorArea'].enable();
        this.Form.controls['ShopFloorCountry'].enable();
        this.Form.controls['ShopFloorState'].enable();
        this.Form.controls['ShopFloorCity'].enable();
        this.Form.controls['ShopFloorZipCode'].enable();
        this.Form.controls['ShopFloorStreet'].setValue('');
        this.Form.controls['ShopFloorArea'].setValue('');
        this.Form.controls['ShopFloorCountry'].setValue(null);
        this.Form.controls['ShopFloorState'].setValue(null);
        this.Form.controls['ShopFloorCity'].setValue(null);
        this.Form.controls['ShopFloorZipCode'].setValue('');
     }
  }

  BillingAddressAny_Changes() {
     const Status = this.Form.controls['SameAddresses'].value;
     if (Status) {
        this.Form.controls['SameAddresses'].setValue(false);
        this.Form.controls['ShopFloorStreet'].enable();
        this.Form.controls['ShopFloorArea'].enable();
        this.Form.controls['ShopFloorCountry'].enable();
        this.Form.controls['ShopFloorState'].enable();
        this.Form.controls['ShopFloorCity'].enable();
        this.Form.controls['ShopFloorZipCode'].enable();
        this.Form.controls['ShopFloorStreet'].setValue('');
        this.Form.controls['ShopFloorArea'].setValue('');
        this.Form.controls['ShopFloorCountry'].setValue(null);
        this.Form.controls['ShopFloorState'].setValue(null);
        this.Form.controls['ShopFloorCity'].setValue(null);
        this.Form.controls['ShopFloorZipCode'].setValue('');
     }
  }

  Submit() {
     if (this.Form.valid) {
        let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
        Info = Info.toString();
        this.Crm_Service.CrmCustomers_Update({ 'Info': Info }).subscribe( response => {
           const ResponseData = JSON.parse(response['_body']);
           if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toastr.NewToastrMessage({ Type: 'Success', Message: 'Customer Deatils Successfully Updated' });
              this.router.navigate(['/Crm_Customers_List']);
           } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else if (response['status'] === 401 && !ResponseData['Status']) {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
           } else {
              this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Updating Customer Getting Error!, But not Identify!' });
           }
        });
     }

  }


}
