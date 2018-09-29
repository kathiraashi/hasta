import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../services/Crm/crm.service';
import { LoginService } from './../../../../services/LoginService/login.service';

@Component({
  selector: 'app-crm-customers-list',
  templateUrl: './crm-customers-list.component.html',
  styleUrls: ['./crm-customers-list.component.css']
})
export class CrmCustomersListComponent implements OnInit {

  User_Id;
  User_Type;
  If_Employee;
  Loader: Boolean = true;

  _List: any[] = [];

  constructor(
         private Toastr: ToastrService,
         public Crm_Service: CrmService,
         public Login_Service: LoginService,
         public router: Router
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
         this.Crm_Service.CrmCustomers_List({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            this.Loader = false;
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this._List = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Creating Customer Getting Error!, But not Identify!' });
            }
         });
      }

  ngOnInit() {
  }

}
