import { Component, OnInit } from '@angular/core';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.css']
})
export class UserPermissionsComponent implements OnInit {

   _GroupsList: any[] = [];
   _List: any[] = [];
   SelectedGroupName;

   constructor(   private Service: AdminService,
                  private Toastr: ToastrService
               ) {
               const Data = { 'Company_Id' : '5b3c66d01dd3ff14589602fe', 'User_Id' : '5b3c7268f838b31bc89e7c8c', };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.PermissionsGroup_SimpleList({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._GroupsList = DecryptedData;
                        this._GroupsList.map(Obj => { Obj.Active = false; return Obj; });
                        if (this._GroupsList.length > 0) {
                           this.ActiveGroupChange(0);
                        }
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: ResponseData['Message']
                           }
                        );
                     } else {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: 'Error Not Identify!, Getting Permissions Group Simple List!'
                           }
                        );
                     }
               });
            }

   ngOnInit() {
   }

   ActiveGroupChange(_index) {
      if (_index >= 0) {
         this._GroupsList.map(Obj => { Obj.Active = false; return Obj; });
         this._GroupsList[_index].Active = true;
         this.SelectedGroupName = this._GroupsList[_index].Group_Name;
         const Data = { 'Company_Id' : '5b3c66d01dd3ff14589602fe', 'User_Id' : '5b3c7268f838b31bc89e7c8c', 'Group_Id': this._GroupsList[_index]._id};
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.GroupPermission_ModulesAndSubModules_List({'Info': Info}).subscribe( response => {
                  const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._List = DecryptedData;
                        this._List.map(Obj => { Obj.Expend = false; return Obj; });
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: ResponseData['Message']
                           }
                        );
                     } else {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: 'Error Not Identify!, Getting Permissions Group Complete Details!'
                           }
                        );
                     }
               });
      }
   }

}
