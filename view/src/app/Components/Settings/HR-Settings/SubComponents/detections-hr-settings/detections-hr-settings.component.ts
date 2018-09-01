import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelDetectionsHrsettingsComponent } from '../../../../../models/settings/hr_settings/model-detections-hrsettings/model-detections-hrsettings.component';
import { DeleteConfirmationComponent } from '../../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

import { HrSettingsService } from './../../../../../services/settings/HrSettings/hr-settings.service';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from '../../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../../services/LoginService/login.service';

@Component({
  selector: 'app-detections-hr-settings',
  templateUrl: './detections-hr-settings.component.html',
  styleUrls: ['./detections-hr-settings.component.css']
})
export class DetectionsHrSettingsComponent implements OnInit {

   bsModalRef: BsModalRef;
   Loader: Boolean = true;
   _List: any[] = [];
   User_Id;

   constructor(   private modalService: BsModalService,
                  private Service: HrSettingsService,
                  private Toastr: ToastrService,
                  public Login_Service: LoginService
               ) {
                  this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                     // Get Detections List
                     const Data = { 'User_Id' : this.User_Id, };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Detections_List({'Info': Info}).subscribe( response => {
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
   // Create Detections
      CreateDetections() {
         const initialState = {
            Type: 'Create'
         };
         this.bsModalRef = this.modalService.show(ModelDetectionsHrsettingsComponent, Object.assign({initialState}, { class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List.splice(0, 0, response.Response);
            }
         });
      }
   // Edit Detections
      EditDetections(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDetectionsHrsettingsComponent, Object.assign({initialState}, { ignoreBackdropClick: true, class: '' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               this._List[_index] = response.Response;
            }
         });
      }
   // View Detections
      ViewDetections(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelDetectionsHrsettingsComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Detections
      DeleteDetections(_index) {
         const initialState = {
            Text: 'Detections '
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Detections_Type_Id' :  this._List[_index]._id, 'Modified_By' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Detections_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage(  {  Type: 'Warning', Message: 'Detections Successfully Deleted' } );
                  } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417 && !ResponseData['Status']) {
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
