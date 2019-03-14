import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { ModelDepartmentHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-department-hrsettings/model-department-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { HrSettingsService } from './../../../../../services/settings/HrSettings/hr-settings.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-department-hr-settings',
  templateUrl: './department-hr-settings.component.html',
  styleUrls: ['./department-hr-settings.component.css']
})
export class DepartmentHrSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;

   Loader: Boolean = true;
   _List: any[] = [];
   User_Id;

   constructor (  private modalService: BsModalService,
                  private Service: HrSettingsService,
                  private Toastr: ToastrService,
                  public Login_Service: LoginService
               )  {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                  // Get Department List
                     const Data = { 'User_Id' : this.User_Id, };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Department_List({'Info': Info}).subscribe( response => {
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
   // Create Department
      CreateDepartment() {
         const initialState = {
            Type: 'Create'
         };
         this.bsModalRef = this.modalService.show(ModelDepartmentHrsettingsComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
            }
         });
      }
   // Edit Department
      EditDepartment(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDepartmentHrsettingsComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
            }
         });
      }
   // View Department
      ViewDepartment(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDepartmentHrsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Department
      DeleteDepartment(_index) {
         const initialState = {
            Text: 'Department Hr Settings'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Department_Id' :  this._List[_index]._id, 'Modified_By' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Department_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage(  {  Type: 'Warning', Message: 'Department Successfully Deleted' } );
                  } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417  && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                  } else if (response['status'] === 401 && !ResponseData['Status']) {
                  this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
               } else {
                  this.Toastr.NewToastrMessage(  {  Type: 'Error',  Message: 'Some Error Occurred!, But not Identify!'  } );
                  }
               });
            }
         });
      }
}
