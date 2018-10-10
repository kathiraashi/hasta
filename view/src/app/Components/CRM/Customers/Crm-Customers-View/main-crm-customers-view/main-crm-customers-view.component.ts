import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../services/Crm/crm.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-main-crm-customers-view',
  templateUrl: './main-crm-customers-view.component.html',
  styleUrls: ['./main-crm-customers-view.component.css']
})
export class MainCrmCustomersViewComponent implements OnInit {

   User_Id;

   Loader: Boolean = true;
   Active_Tab = 'About';
   _Data: Object = {};
   Customer_Id;
   _List: any[] = [];
   _ActivityList: any[] = [];
   From: Date = new Date(new Date().setHours(new Date().getHours() - 24));
   To: Date = new Date();

   constructor(
         private Toastr: ToastrService,
         public Crm_Service: CrmService,
         public router: Router,
         public Login_Service: LoginService,
         private active_route: ActivatedRoute,
      ) {
            this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
            this.active_route.url.subscribe((u) => {
               this.Customer_Id = this.active_route.snapshot.params['Customer_Id'];
               const Data = { 'Customer_Id': this.Customer_Id,  'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Crm_Service.CrmCustomers_View({ 'Info': Info }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._Data = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Data Getting Error!, But not Identify!' });
                  }
               });
               const DataOne = { 'Customer_Id': this.Customer_Id,  'User_Id' : this.User_Id, From: this.From, To: this.To };
               let InfoOne = CryptoJS.AES.encrypt(JSON.stringify(DataOne), 'SecretKeyIn@123');
               InfoOne = InfoOne.toString();
               this.Crm_Service.CrmCustomerBasedMachine_ChartData({ 'Info': InfoOne }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     DecryptedData.map(Obj => {
                        if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'UP') {
                           Obj.Machine.Status = 'UP';
                           Obj.Machine.Color = 'rgba(68, 175, 91, 1)';
                        }
                        if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Down') {
                           Obj.Machine.Status = 'Down';
                           Obj.Machine.Color = 'rgba(227, 28, 19, 1)';
                        }
                        if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Waiting') {
                           Obj.Machine.Status = 'Waiting for Spare';
                           Obj.Machine.Color = 'rgba(255, 157, 11, 1)';
                        }
                        if (Obj.ChartData[Obj.ChartData.length - 1].Status === 'Idle') {
                           Obj.Machine.Status = 'Idle';
                           Obj.Machine.Color = '#889196';
                        }
                        return Obj;
                     });
                     this._List = DecryptedData;
                  } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                  } else {
                     this.Toastr.NewToastrMessage({ Type: 'Error', Message: ' Customer Machine Status List Getting Error!, But not Identify!' });
                  }
               });
               this.Crm_Service.CrmCustomerBased_ActivitiesList({ 'Info': Info }).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                  this.Loader = false;
                  if (response['status'] === 200 && ResponseData['Status'] ) {
                     const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                     const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                     this._ActivityList = DecryptedData;
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
   }

   isEmptyObject(obj) {
      return (obj && (Object.keys(obj).length === 0));
    }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
