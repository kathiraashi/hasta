import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelLeavesViewComponent } from '../../../../models/HRMS/model-leaves-view/model-leaves-view.component';
import * as CryptoJS from 'crypto-js';

import { HrmsServiceService } from './../../../../services/Hrms/hrms-service.service';
import { ToastrService } from '../../../../services/common-services/toastr-service/toastr.service';
import { LoginService } from './../../../../services/LoginService/login.service';
@Component({
  selector: 'app-list-leaves',
  templateUrl: './list-leaves.component.html',
  styleUrls: ['./list-leaves.component.css']
})
export class ListLeavesComponent implements OnInit {

   bsModalRef: BsModalRef;
   Loader: Boolean = true;
   _List: any[] = [];
   User_Id;
   User_Type;
   constructor(   private modalService: BsModalService,
                  private Toastr: ToastrService,
                  public Login_Service: LoginService,
                  public Service: HrmsServiceService
                ) {
                     this.User_Id = this.Login_Service.LoginUser_Info()['_id'];
                     this.User_Type = this.Login_Service.LoginUser_Info()['_UserType'];
                     // Get Leaves List
                     const Data = { 'User_Id' : this.User_Id };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Service.Leaves_List({'Info': Info}).subscribe( response => {
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
   // View Leaves
   ViewLeaves(_index) {
      const initialState = {
         Type: 'View',
         Data: this._List[_index]
      };
      this.bsModalRef = this.modalService.show(ModelLeavesViewComponent, Object.assign({initialState}, { class: '' }));
   }
}
