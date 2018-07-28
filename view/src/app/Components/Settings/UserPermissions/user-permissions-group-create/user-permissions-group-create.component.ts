import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToastrService } from './../../../../services/common-services/toastr-service/toastr.service';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-user-permissions-group-create',
  templateUrl: './user-permissions-group-create.component.html',
  styleUrls: ['./user-permissions-group-create.component.css']
})
export class UserPermissionsGroupCreateComponent implements OnInit {

   _List: any[] = [];
   _Modules: any[] = [];
   _UserTypes: any[] =  [];

   ValidForm = false;

   Form: FormGroup;

  constructor(private Service: AdminService,
              private Toastr: ToastrService,
              private router: Router
            ) {
               const Data = { 'Company_Id' : '1', 'User_Id' : '2', };
                  let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                  Info = Info.toString();
                  this.Service.ModulesAndSubModules_List({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                           this._List.map(MainModule => {
                              this._Modules.push({_id: MainModule._id, Module_Name: MainModule.Module_Name, Module_Key: MainModule.Module_Key});
                              MainModule.Access_Permission = false;
                              MainModule.AllView_Permission = false;
                              MainModule.AllCreate_Permission = false;
                              MainModule.AllEdit_Permission = false;
                              MainModule.AllDelete_Permission = false;
                              MainModule.Expend = false;
                              MainModule.Sub_Modules.map(SubModule => {
                                 SubModule.View_Permission = false;
                                 SubModule.Create_Permission = false;
                                 SubModule.Edit_Permission = false;
                                 SubModule.Delete_Permission = false;
                                 return SubModule;
                              });
                              return MainModule;
                           });
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage(
                              {  Type: 'Error',
                                 Message: ResponseData['Message']
                              }
                           );
                        } else {
                           this.Toastr.NewToastrMessage(
                              {  Type: 'Error',
                                 Message: 'Error Not Identify!, Getting Modules and Sub Modules List!'
                              }
                           );
                        }
                  });
                  this.Service.UserTypes_List({'Info': Info}).subscribe( response => {
                     const ResponseData = JSON.parse(response['_body']);
                     if (response['status'] === 200 && ResponseData['Status'] ) {
                        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                        this._UserTypes = DecryptedData;
                     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: ResponseData['Message']
                           }
                        );
                     } else {
                        this.Toastr.NewToastrMessage(
                           {  Type: 'Error',
                              Message: 'Error Not Identify!, Getting Modules and Sub Modules List!'
                           }
                        );
                     }
                  });
              }

  ngOnInit() {
   this.Form = new FormGroup({
      Company_Id: new FormControl('5b3c66d01dd3ff14589602fe', Validators.required),
      Created_By: new FormControl('5b3c7268f838b31bc89e7c8c', Validators.required),
      Group_Name: new FormControl('', Validators.required),
      Group_Module: new FormControl(null, Validators.required),
      Group_UserType: new FormControl(null, Validators.required),
      Group_Description: new FormControl(''),
      Module_Access: new FormControl(),
      SubModule_Permissions: new FormControl()
   });
  }

   CreateGroupName() {
      const Module = this.Form.controls['Group_Module'].value;
      const UserType = this.Form.controls['Group_UserType'].value;
      if (typeof Module === 'object' && Module !== null && typeof UserType === 'object' && UserType !== null ) {
         const ModuleName =  Module.Module_Name;
         const UserType_Name =  UserType.User_Type;
         this.Form.controls['Group_Name'].setValue(ModuleName + '-' + UserType_Name);
      } else {
         this.Form.controls['Group_Name'].setValue('');
      }
   }
   NotAllow(): boolean { return false; }

   ModuleRightsChange() {
      this._List.map(MainModule => {
         MainModule.Sub_Modules.map(SubModule => {
            if (!MainModule.Access_Permission) {
               SubModule.View_Permission = false;
               SubModule.Create_Permission = false;
               SubModule.Edit_Permission = false;
               SubModule.Delete_Permission = false;
            }
            return SubModule;
         });
         return MainModule;
      });
   }

   AllView_Change(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (this._List[_index].AllView_Permission) {
            Obj.View_Permission = true;
         } else {
            Obj.View_Permission = false;
         }
         return Obj;
      });
   }
   Check_AllViewPermission_IsActive(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (!Obj.View_Permission) {
            this._List[_index].AllView_Permission = false;
         }
         return Obj;
      });
   }
   AllCreate_Change(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (this._List[_index].AllCreate_Permission) {
            Obj.Create_Permission = true;
         } else {
            Obj.Create_Permission = false;
         }
         return Obj;
      });
   }
   Check_AllCreatePermission_IsActive(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (!Obj.Create_Permission) {
            this._List[_index].AllCreate_Permission = false;
         }
         return Obj;
      });
   }
   AllEdit_Change(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (this._List[_index].AllEdit_Permission) {
            Obj.Edit_Permission = true;
         } else {
            Obj.Edit_Permission = false;
         }
         return Obj;
      });
   }
   Check_AllEditPermission_IsActive(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (!Obj.Edit_Permission) {
            this._List[_index].AllEdit_Permission = false;
         }
         return Obj;
      });
   }
   AllDelete_Change(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (this._List[_index].AllDelete_Permission) {
            Obj.Delete_Permission = true;
         } else {
            Obj.Delete_Permission = false;
         }
         return Obj;
      });
   }
   Check_AllDeletePermission_IsActive(_index) {
      this._List[_index].Sub_Modules.map(Obj => {
         if (!Obj.Delete_Permission) {
            this._List[_index].AllDelete_Permission = false;
         }
         return Obj;
      });
   }

  CheckFormIsValid() {
   this.ValidForm = false;
   this._List.map( Module => {
      Module.Sub_Modules.map(SubModule => {
         if (Module.Access_Permission && (SubModule.View_Permission || SubModule.Create_Permission || SubModule.Edit_Permission || SubModule.Delete_Permission)) {
            this.ValidForm = true;
         }
      });
   });
  }

  Submit() {
   this.CheckFormIsValid();
   if ( this.Form.valid && this.ValidForm) {
      const Module_Access_Arr = [];
      const SubModule_Permissions_Arr = [];
      this._List.map(MainModule => {
         Module_Access_Arr.push({
            Module_Id: MainModule._id,
            Access_Permission: MainModule.Access_Permission
         });
         MainModule.Sub_Modules.map(SubModule => {
            SubModule_Permissions_Arr.push({
               Module_Id: MainModule._id,
               SubModule_Id: SubModule._id,
               View_Permission: SubModule.View_Permission,
               Create_Permission: SubModule.Create_Permission,
               Edit_Permission: SubModule.Edit_Permission,
               Delete_Permission: SubModule.Delete_Permission,
            });
            return SubModule;
         });
         return MainModule;
      });
      this.Form.controls['Module_Access'].setValue(JSON.stringify(Module_Access_Arr));
      this.Form.controls['SubModule_Permissions'].setValue(JSON.stringify(SubModule_Permissions_Arr));
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Create_Permissions_Group({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toastr.NewToastrMessage(
               {  Type: 'Success',
                  Message: 'New User Permissions Group Created'
               }
            );
            this.router.navigate(['/User_Permissions']);
         } else if (response['status'] === 400 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage(
               {  Type: 'Error',
                  Message: 'Create User Permissions, Bad Request Error!'
               }
            );
         } else if (response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage(
               {  Type: 'Error',
                  Message: 'Create User Permissions, Query Error!'
               }
            );
         } else {
            this.Toastr.NewToastrMessage(
               {  Type: 'Error',
                  Message: 'Error Not Identify!, Creating User Permissions!'
               }
            );
         }
      });
   }
  }

}
