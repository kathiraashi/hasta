import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { ToastrService } from './../../../../../services/common-services/toastr-service/toastr.service';
import { CrmService } from './../../../../../services/Crm/crm.service';

@Component({
  selector: 'app-main-crm-customers-view',
  templateUrl: './main-crm-customers-view.component.html',
  styleUrls: ['./main-crm-customers-view.component.css']
})
export class MainCrmCustomersViewComponent implements OnInit {

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = true;
   Active_Tab = 'About';
   _Data;
   Customer_Id;

   constructor(
         private Toastr: ToastrService,
         public Crm_Service: CrmService,
         public router: Router,
         private active_route: ActivatedRoute,
      ) {
            this.active_route.url.subscribe((u) => {
               this.Customer_Id = this.active_route.snapshot.params['Customer_Id'];
               const Data = { 'Customer_Id': this.Customer_Id,  'Company_Id': this.Company_Id, 'User_Id' : this.User_Id };
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
            });
         }

   ngOnInit() {
   }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }
}
