import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModelPayrollMasterComponent } from '../../../../../models/HR/model-payroll-master/model-payroll-master.component';

import { PayrollService } from './../../../../../services/Hr/Payroll/payroll.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../../services/LoginService/login.service';


@Component({
  selector: 'app-main-payroll-master-hr',
  templateUrl: './main-payroll-master-hr.component.html',
  styleUrls: ['./main-payroll-master-hr.component.css']
})
export class MainPayrollMasterHrComponent implements OnInit {

   bsModalRef: BsModalRef;

   Loader: Boolean = true;
   _List: any[] = [];
   User_Id;

   constructor (  private modalService: BsModalService,
                  private Service: PayrollService,
                  private Toastr: ToastrService,
                  public Login_Service: LoginService
               )  {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  // Get PayrollMaster List
                     const Data = { 'User_Id' : this.User_Id, };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.PayrollMaster_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        this.Loader = false;
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({Type: 'Error', Message: response['Message']});
                        } else if (response['status'] === 401 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                     } else {
                        this.Toastr.NewToastrMessage( {  Type: 'Error', Message: 'Some Error Occurred!, But not Identify!'  });
                        }
                     });
                  }

   ngOnInit() {
   }
   // Create PayrollMaster
      CreatePayrollMaster() {
         const initialState = {
            Type: 'Create'
         };
         this.bsModalRef = this.modalService.show(ModelPayrollMasterComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: 'modal-lg max-width-80' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
            }
         });
      }
   // Edit PayrollMaster
      EditPayrollMaster(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelPayrollMasterComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: 'modal-lg max-width-80' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
            }
         });
      }
   // View PayrollMaster
      ViewPayrollMaster(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelPayrollMasterComponent, Object.assign({initialState}, { class: 'modal-lg max-width-80' }));
      }
}
